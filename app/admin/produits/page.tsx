"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { PRODUCTS } from "@/lib/products";
import type { Product } from "@/lib/products";
import { getAllProducts, deleteProduct, setProductOverride } from "@/lib/customProducts";
import { Search, Edit2, Check, X, AlertTriangle, Star, Zap, Plus, Trash2, Pencil } from "lucide-react";

const CATEGORY_LABEL: Record<string, string> = {
  anime: "Anime", jeux: "Jeux Vidéo", rgb: "RGB", standard: "Standard", bureautique: "Bureautique",
};
const CATEGORY_COLOR: Record<string, string> = {
  anime: "#ff0066", jeux: "#00ff99", rgb: "#00e5ff", standard: "#94a3b8", bureautique: "#c9b8f5",
};

export default function AdminProduitsPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [editing, setEditing] = useState<{ id: string; field: "price" | "stock"; value: string } | null>(null);

  useEffect(() => { setProducts(getAllProducts()); }, []);

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    return (catFilter === "all" || p.category === catFilter) &&
      (!q || p.name.toLowerCase().includes(q) || p.shortName.toLowerCase().includes(q));
  });

  const saveEdit = () => {
    if (!editing) return;
    const val = parseFloat(editing.value);
    if (!isNaN(val) && val >= 0) {
      const data = editing.field === "price" ? { price: val } : { stock: Math.floor(val) };
      setProductOverride(editing.id, data);
      setProducts(getAllProducts());
    }
    setEditing(null);
  };

  const toggleBadge = (id: string, field: "isNew" | "isBestSeller") => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: !p[field] } : p));
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setProducts(getAllProducts());
  };

  return (
    <AdminShell title="Produits">

      {/* Barre */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#475569" }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un produit…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: "#141921", border: "1px solid #1e2a3a", color: "#e2e8f0" }} />
        </div>
        <Link href="/admin/produits/nouveau"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          style={{ background: "#2563eb", color: "#fff" }}>
          <Plus size={14} /> Nouveau produit
        </Link>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className="px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
              style={{
                background: catFilter === c ? (c === "all" ? "#2563eb" : `${CATEGORY_COLOR[c]}20`) : "#141921",
                border: `1px solid ${catFilter === c ? (c === "all" ? "#2563eb" : CATEGORY_COLOR[c]) : "#1e2a3a"}`,
                color: catFilter === c ? (c === "all" ? "#fff" : CATEGORY_COLOR[c]) : "#64748b",
              }}>
              {c === "all" ? "Tous" : CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total produits", value: products.length },
          { label: "Stock bas (≤15)", value: products.filter(p => p.stock <= 15).length, warn: true },
          { label: "Nouveautés", value: products.filter(p => p.isNew).length },
          { label: "Best-Sellers", value: products.filter(p => p.isBestSeller).length },
        ].map(({ label, value, warn }) => (
          <div key={label} className="px-4 py-3 rounded-xl" style={{ background: "#141921", border: `1px solid ${warn && value > 0 ? "#f59e0b40" : "#1e2a3a"}` }}>
            <p className="text-xs mb-1" style={{ color: "#475569" }}>{label}</p>
            <p className="text-xl font-bold" style={{ color: warn && value > 0 ? "#f59e0b" : "#e2e8f0" }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1e2a3a" }}>
        <div className="grid text-xs font-semibold uppercase tracking-wider px-4 py-3"
          style={{ background: "#141921", color: "#475569", gridTemplateColumns: "2fr 1fr 1fr 1fr 80px 100px" }}>
          <span>Produit</span><span>Catégorie</span><span>Prix</span><span>Stock</span><span>Badges</span><span>Actions</span>
        </div>

        {filtered.map((p, i) => {
          const isEditingPrice = editing?.id === p.id && editing.field === "price";
          const isEditingStock = editing?.id === p.id && editing.field === "stock";
          return (
            <div key={p.id} className="grid items-center px-4 py-3 text-sm transition-colors hover:bg-white/[0.015]"
              style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 80px 100px", borderTop: i === 0 ? "none" : "1px solid #1e2a3a", background: i % 2 === 0 ? "#0f1117" : "#141921" }}>

              {/* Nom */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden"
                  style={{ background: p.gradient, border: "1px solid #1e2a3a" }}>
                  {p.images?.[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: "#e2e8f0" }}>{p.shortName}</p>
                  <p className="text-xs" style={{ color: "#475569" }}>{p.size} · {p.dimensions}</p>
                </div>
              </div>

              {/* Catégorie */}
              <span className="text-xs font-semibold" style={{ color: CATEGORY_COLOR[p.category] ?? "#94a3b8" }}>
                {CATEGORY_LABEL[p.category]}
              </span>

              {/* Prix */}
              <div>
                {isEditingPrice ? (
                  <div className="flex items-center gap-1">
                    <input autoFocus value={editing!.value}
                      onChange={e => setEditing({ ...editing!, value: e.target.value })}
                      onKeyDown={e => e.key === "Enter" ? saveEdit() : e.key === "Escape" && setEditing(null)}
                      className="w-20 px-2 py-1 rounded text-xs outline-none"
                      style={{ background: "#1e2a3a", border: "1px solid #3b82f6", color: "#e2e8f0" }} />
                    <button onClick={saveEdit}><Check size={12} style={{ color: "#22c55e" }} /></button>
                    <button onClick={() => setEditing(null)}><X size={12} style={{ color: "#ef4444" }} /></button>
                  </div>
                ) : (
                  <button onClick={() => setEditing({ id: p.id, field: "price", value: p.price.toString() })}
                    className="flex items-center gap-1 group">
                    <span className="text-xs font-bold" style={{ color: "#e2e8f0" }}>{p.price.toFixed(2)}€</span>
                    <Edit2 size={10} className="opacity-0 group-hover:opacity-100" style={{ color: "#60a5fa" }} />
                  </button>
                )}
              </div>

              {/* Stock */}
              <div>
                {isEditingStock ? (
                  <div className="flex items-center gap-1">
                    <input autoFocus value={editing!.value}
                      onChange={e => setEditing({ ...editing!, value: e.target.value })}
                      onKeyDown={e => e.key === "Enter" ? saveEdit() : e.key === "Escape" && setEditing(null)}
                      className="w-16 px-2 py-1 rounded text-xs outline-none"
                      style={{ background: "#1e2a3a", border: "1px solid #3b82f6", color: "#e2e8f0" }} />
                    <button onClick={saveEdit}><Check size={12} style={{ color: "#22c55e" }} /></button>
                    <button onClick={() => setEditing(null)}><X size={12} style={{ color: "#ef4444" }} /></button>
                  </div>
                ) : (
                  <button onClick={() => setEditing({ id: p.id, field: "stock", value: p.stock.toString() })}
                    className="flex items-center gap-1 group">
                    <span className="text-xs font-bold" style={{ color: p.stock <= 5 ? "#ef4444" : p.stock <= 15 ? "#f59e0b" : "#e2e8f0" }}>
                      {p.stock}
                    </span>
                    {p.stock <= 15 && <AlertTriangle size={10} style={{ color: p.stock <= 5 ? "#ef4444" : "#f59e0b" }} />}
                    <Edit2 size={10} className="opacity-0 group-hover:opacity-100" style={{ color: "#60a5fa" }} />
                  </button>
                )}
              </div>

              {/* Badges */}
              <div className="flex items-center gap-1.5">
                <button onClick={() => toggleBadge(p.id, "isNew")} title="Nouveauté"
                  className="w-6 h-6 rounded flex items-center justify-center transition-colors"
                  style={{ background: p.isNew ? "#22c55e20" : "#1e2a3a", border: `1px solid ${p.isNew ? "#22c55e50" : "transparent"}` }}>
                  <Zap size={10} style={{ color: p.isNew ? "#22c55e" : "#475569" }} />
                </button>
                <button onClick={() => toggleBadge(p.id, "isBestSeller")} title="Best-seller"
                  className="w-6 h-6 rounded flex items-center justify-center transition-colors"
                  style={{ background: p.isBestSeller ? "#f59e0b20" : "#1e2a3a", border: `1px solid ${p.isBestSeller ? "#f59e0b50" : "transparent"}` }}>
                  <Star size={10} style={{ color: p.isBestSeller ? "#f59e0b" : "#475569" }} />
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                {p.isRGB && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                    style={{ background: "#00e5ff15", color: "#00e5ff", border: "1px solid #00e5ff30" }}>RGB</span>
                )}
                <Link href={`/admin/produits/modifier/${p.id}`} title="Modifier"
                  className="w-6 h-6 rounded flex items-center justify-center transition-colors hover:bg-blue-500/10"
                  style={{ color: "#475569" }}>
                  <Pencil size={11} />
                </Link>
                <button onClick={() => handleDelete(p.id)} title="Supprimer"
                  className="w-6 h-6 rounded flex items-center justify-center transition-colors hover:bg-red-500/10"
                  style={{ color: "#475569" }}>
                  <Trash2 size={11} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      <p className="text-xs mt-3" style={{ color: "#475569" }}>
        Cliquez sur un prix ou un stock pour le modifier en ligne. Utilisez le stylo pour une édition complète.
      </p>
    </AdminShell>
  );
}
