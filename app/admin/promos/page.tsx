"use client";

import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAllProducts } from "@/lib/customProducts";
import {
  getProductPromos, setProductPromo, toggleProductPromo, removeProductPromo,
  type ProductPromo,
} from "@/lib/customProducts";
import type { Product } from "@/lib/products";
import {
  Plus, Trash2, Copy, Check, ToggleLeft, ToggleRight,
  Tag, Percent, Search,
} from "lucide-react";

/* ── CODES PROMO ──────────────────────────────────────────────── */
interface PromoCode {
  code: string; discount: number; label: string; active: boolean;
  uses: number; createdAt: string;
}
const DEFAULT_CODES: PromoCode[] = [
  { code: "PADZONE10",  discount: 10, label: "-10%",                   active: true, uses: 0, createdAt: new Date().toISOString() },
  { code: "WELCOME15",  discount: 15, label: "-15%",                   active: true, uses: 0, createdAt: new Date().toISOString() },
  { code: "GAMING20",   discount: 20, label: "-20%",                   active: true, uses: 0, createdAt: new Date().toISOString() },
  { code: "FIRSTORDER", discount: 10, label: "-10% première commande", active: true, uses: 0, createdAt: new Date().toISOString() },
];

function CodesPromoTab() {
  const [codes,    setCodes]    = useState<PromoCode[]>([]);
  const [copied,   setCopied]   = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form,     setForm]     = useState({ code: "", discount: "", label: "" });
  const [formErr,  setFormErr]  = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("pz-promos");
    setCodes(saved ? JSON.parse(saved) : DEFAULT_CODES);
  }, []);

  const persist = (updated: PromoCode[]) => {
    setCodes(updated);
    localStorage.setItem("pz-promos", JSON.stringify(updated));
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  const addCode = () => {
    if (!form.code.trim()) return setFormErr("Le code est requis.");
    const pct = parseInt(form.discount);
    if (isNaN(pct) || pct < 1 || pct > 100) return setFormErr("Réduction entre 1 et 100%.");
    if (codes.find(c => c.code === form.code.toUpperCase())) return setFormErr("Ce code existe déjà.");
    persist([...codes, {
      code: form.code.toUpperCase().trim(), discount: pct,
      label: form.label || `-${pct}%`, active: true, uses: 0,
      createdAt: new Date().toISOString(),
    }]);
    setForm({ code: "", discount: "", label: "" });
    setShowForm(false); setFormErr("");
  };

  const IS = { background: "#0f1117", border: "1px solid #1e2a3a", color: "#e2e8f0" };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total codes",  value: codes.length },
          { label: "Actifs",       value: codes.filter(c => c.active).length,  color: "#22c55e" },
          { label: "Inactifs",     value: codes.filter(c => !c.active).length, color: "#ef4444" },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-4 rounded-xl" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
            <p className="text-xs mb-1" style={{ color: "#475569" }}>{label}</p>
            <p className="text-2xl font-bold" style={{ color: color ?? "#e2e8f0" }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm" style={{ color: "#64748b" }}>{codes.length} code{codes.length !== 1 ? "s" : ""}</p>
        <button onClick={() => setShowForm(s => !s)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ background: "#2563eb", color: "#fff" }}>
          <Plus size={14} /> Nouveau code
        </button>
      </div>

      {showForm && (
        <div className="p-5 rounded-xl mb-4" style={{ background: "#141921", border: "1px solid #3b82f640" }}>
          <p className="text-sm font-semibold mb-4" style={{ color: "#e2e8f0" }}>Créer un code promo</p>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "#475569" }}>Code *</label>
              <input value={form.code} onChange={e => { setForm(f => ({ ...f, code: e.target.value.toUpperCase() })); setFormErr(""); }}
                placeholder="SUMMER25" className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={IS} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "#475569" }}>Réduction % *</label>
              <input value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))}
                placeholder="20" type="number" min="1" max="100"
                className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={IS} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "#475569" }}>Description</label>
              <input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                placeholder="-20% été" className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={IS} />
            </div>
          </div>
          {formErr && <p className="text-xs mb-2" style={{ color: "#ef4444" }}>{formErr}</p>}
          <div className="flex gap-2">
            <button onClick={addCode} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: "#2563eb", color: "#fff" }}>Créer</button>
            <button onClick={() => { setShowForm(false); setFormErr(""); }} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: "#1e2a3a", color: "#64748b" }}>Annuler</button>
          </div>
        </div>
      )}

      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1e2a3a" }}>
        <div className="grid text-xs font-semibold uppercase tracking-wider px-5 py-3"
          style={{ background: "#141921", color: "#475569", gridTemplateColumns: "1fr 100px 1fr 80px 80px 60px" }}>
          <span>Code</span><span>Réduction</span><span>Description</span><span>Utilisations</span><span>Statut</span><span></span>
        </div>
        {codes.length === 0
          ? <div className="text-center py-10" style={{ background: "#0f1117" }}><p className="text-sm" style={{ color: "#475569" }}>Aucun code promo.</p></div>
          : codes.map((c, i) => (
            <div key={c.code} className="grid items-center px-5 py-3.5 text-sm"
              style={{ gridTemplateColumns: "1fr 100px 1fr 80px 80px 60px", borderTop: i === 0 ? "none" : "1px solid #1e2a3a",
                background: i % 2 === 0 ? "#0f1117" : "#141921", opacity: c.active ? 1 : 0.5 }}>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold" style={{ color: "#60a5fa" }}>{c.code}</span>
                <button onClick={() => copyCode(c.code)}>
                  {copied === c.code ? <Check size={12} style={{ color: "#22c55e" }} /> : <Copy size={12} style={{ color: "#475569" }} />}
                </button>
              </div>
              <span className="font-bold" style={{ color: "#22c55e" }}>-{c.discount}%</span>
              <span className="text-xs" style={{ color: "#64748b" }}>{c.label}</span>
              <span className="text-xs" style={{ color: "#94a3b8" }}>{c.uses}</span>
              <button onClick={() => persist(codes.map(x => x.code === c.code ? { ...x, active: !x.active } : x))}
                className="flex items-center gap-1 text-xs">
                {c.active
                  ? <><ToggleRight size={18} style={{ color: "#22c55e" }} /><span style={{ color: "#22c55e" }}>Actif</span></>
                  : <><ToggleLeft size={18} style={{ color: "#475569" }} /><span style={{ color: "#475569" }}>Inactif</span></>}
              </button>
              <button onClick={() => persist(codes.filter(x => x.code !== c.code))}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/10" style={{ color: "#475569" }}>
                <Trash2 size={13} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

/* ── PROMOS PRODUITS ──────────────────────────────────────────── */
function PromosProduitsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [promos,   setPromos]   = useState<Record<string, ProductPromo>>({});
  const [search,   setSearch]   = useState("");
  const [editing,  setEditing]  = useState<{ id: string; value: string } | null>(null);
  const [err,      setErr]      = useState("");

  useEffect(() => {
    setProducts(getAllProducts());
    setPromos(getProductPromos());
  }, []);

  const refresh = () => setPromos(getProductPromos());

  const handleSet = (id: string) => {
    const val = parseFloat(editing?.value ?? "");
    const product = products.find(p => p.id === id);
    if (!product) return;
    if (isNaN(val) || val <= 0) return setErr("Prix invalide.");
    if (val >= product.price) return setErr("Le prix promo doit être inférieur au prix normal.");
    setProductPromo(id, val);
    setEditing(null);
    setErr("");
    refresh();
  };

  const filtered = products.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.shortName.toLowerCase().includes(search.toLowerCase())
  );

  const activePromos = Object.entries(promos).filter(([, v]) => v.active).length;
  const IS = { background: "#0f1117", border: "1px solid #1e2a3a", color: "#e2e8f0" };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
          <p className="text-xs mb-1" style={{ color: "#475569" }}>Promos actives</p>
          <p className="text-2xl font-bold" style={{ color: "#22c55e" }}>{activePromos}</p>
        </div>
        <div className="p-4 rounded-xl" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
          <p className="text-xs mb-1" style={{ color: "#475569" }}>Produits en promo</p>
          <p className="text-2xl font-bold" style={{ color: "#f59e0b" }}>{Object.keys(promos).length}</p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#475569" }} />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un produit…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: "#141921", border: "1px solid #1e2a3a", color: "#e2e8f0" }} />
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1e2a3a" }}>
        <div className="grid text-xs font-semibold uppercase tracking-wider px-5 py-3"
          style={{ background: "#141921", color: "#475569", gridTemplateColumns: "2fr 90px 120px 90px 80px 80px" }}>
          <span>Produit</span><span>Prix normal</span><span>Prix promo</span><span>Réduction</span><span>Statut</span><span>Actions</span>
        </div>
        {filtered.map((p, i) => {
          const promo = promos[p.id];
          const isEditing = editing?.id === p.id;
          const discount = promo ? Math.round((1 - promo.promoPrice / p.price) * 100) : null;

          return (
            <div key={p.id} className="grid items-center px-5 py-3 text-sm"
              style={{ gridTemplateColumns: "2fr 90px 120px 90px 80px 80px",
                borderTop: i === 0 ? "none" : "1px solid #1e2a3a",
                background: i % 2 === 0 ? "#0f1117" : "#141921" }}>

              {/* Nom */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg flex-shrink-0 overflow-hidden"
                  style={{ background: p.gradient, border: "1px solid #1e2a3a" }}>
                  {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: "#e2e8f0" }}>{p.shortName}</p>
                  <p className="text-xs" style={{ color: "#475569" }}>{p.size}</p>
                </div>
              </div>

              {/* Prix normal */}
              <span className="font-mono text-xs font-bold" style={{ color: "#e2e8f0" }}>{p.price.toFixed(2)}€</span>

              {/* Prix promo */}
              <div>
                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <input autoFocus value={editing.value}
                      onChange={e => { setEditing({ id: p.id, value: e.target.value }); setErr(""); }}
                      onKeyDown={e => e.key === "Enter" ? handleSet(p.id) : e.key === "Escape" && setEditing(null)}
                      placeholder="0.00"
                      className="w-20 px-2 py-1 rounded text-xs outline-none"
                      style={{ background: "#1e2a3a", border: `1px solid ${err ? "#ef4444" : "#3b82f6"}`, color: "#e2e8f0" }} />
                    <button onClick={() => handleSet(p.id)}><Check size={12} style={{ color: "#22c55e" }} /></button>
                  </div>
                ) : promo ? (
                  <span className="font-mono text-xs font-bold" style={{ color: "#f59e0b" }}>{promo.promoPrice.toFixed(2)}€</span>
                ) : (
                  <button onClick={() => { setEditing({ id: p.id, value: "" }); setErr(""); }}
                    className="text-xs font-mono px-2 py-1 rounded transition-colors hover:bg-white/5"
                    style={{ color: "#475569", border: "1px dashed #1e2a3a" }}>
                    + Ajouter
                  </button>
                )}
              </div>

              {/* Réduction */}
              <span className="text-xs font-bold" style={{ color: discount ? "#22c55e" : "#334155" }}>
                {discount ? `-${discount}%` : "—"}
              </span>

              {/* Statut */}
              {promo ? (
                <button onClick={() => { toggleProductPromo(p.id); refresh(); }}
                  className="flex items-center gap-1 text-xs">
                  {promo.active
                    ? <><ToggleRight size={18} style={{ color: "#22c55e" }} /><span style={{ color: "#22c55e" }}>Actif</span></>
                    : <><ToggleLeft size={18} style={{ color: "#475569" }} /><span style={{ color: "#475569" }}>Inactif</span></>}
                </button>
              ) : <span className="text-xs" style={{ color: "#334155" }}>—</span>}

              {/* Actions */}
              <div className="flex gap-1">
                {promo && (
                  <>
                    <button onClick={() => { setEditing({ id: p.id, value: promo.promoPrice.toString() }); setErr(""); }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-blue-500/10"
                      style={{ color: "#475569" }} title="Modifier le prix">
                      <Percent size={12} />
                    </button>
                    <button onClick={() => { removeProductPromo(p.id); refresh(); }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/10"
                      style={{ color: "#475569" }} title="Supprimer la promo">
                      <Trash2 size={12} />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {err && <p className="text-xs mt-2 font-mono" style={{ color: "#ef4444" }}>{err}</p>}
    </div>
  );
}

/* ── PAGE PRINCIPALE ──────────────────────────────────────────── */
export default function AdminPromosPage() {
  const [tab, setTab] = useState<"codes" | "produits">("produits");

  return (
    <AdminShell title="Promotions">
      {/* Onglets */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "produits", icon: Tag,     label: "Promos produits" },
          { key: "codes",    icon: Percent, label: "Codes promo"     },
        ].map(({ key, icon: Icon, label }) => (
          <button key={key} onClick={() => setTab(key as typeof tab)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: tab === key ? "#2563eb" : "#141921",
              border: `1px solid ${tab === key ? "#2563eb" : "#1e2a3a"}`,
              color: tab === key ? "#fff" : "#64748b",
            }}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {tab === "produits" ? <PromosProduitsTab /> : <CodesPromoTab />}
    </AdminShell>
  );
}
