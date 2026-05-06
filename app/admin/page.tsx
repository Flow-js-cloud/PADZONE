"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { useOrders } from "@/context/OrderContext";
import { ShoppingBag, Euro, Users, Clock, TrendingUp, AlertTriangle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

const STATUS_COLOR: Record<string, string> = {
  "en-attente": "#f59e0b", expediee: "#3b82f6", livree: "#22c55e", annulee: "#ef4444",
};
const STATUS_LABEL: Record<string, string> = {
  "en-attente": "En attente", expediee: "Expédiée", livree: "Livrée", annulee: "Annulée",
};

function Card({ label, value, icon: Icon, color, sub }: { label: string; value: string; icon: React.ElementType; color: string; sub?: string }) {
  return (
    <div className="p-5 rounded-xl" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium" style={{ color: "#475569" }}>{label}</p>
        <Icon size={16} style={{ color }} />
      </div>
      <p className="text-2xl font-bold" style={{ color: "#e2e8f0" }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: "#475569" }}>{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const { orders } = useOrders();

  const revenue = orders.filter(o => o.status !== "annulee").reduce((s, o) => s + o.total, 0);
  const clients = new Set(orders.map(o => o.customer.email)).size;
  const pending = orders.filter(o => o.status === "en-attente").length;
  const lowStock = PRODUCTS.filter(p => p.stock <= 15);

  // Top produits
  const productStats = orders.flatMap(o => o.items).reduce((acc, item) => {
    const k = item.product.id;
    if (!acc[k]) acc[k] = { product: item.product, qty: 0 };
    acc[k].qty += item.quantity;
    return acc;
  }, {} as Record<string, { product: (typeof PRODUCTS)[0]; qty: number }>);
  const topProducts = Object.values(productStats).sort((a, b) => b.qty - a.qty).slice(0, 5);
  const maxQty = topProducts[0]?.qty ?? 1;

  // Répartition statuts
  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AdminShell title="Dashboard">

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card label="Commandes" value={orders.length.toString()} icon={ShoppingBag} color="#60a5fa" />
        <Card label="Chiffre d'affaires" value={`${revenue.toFixed(2)}€`} icon={Euro} color="#22c55e" />
        <Card label="Clients uniques" value={clients.toString()} icon={Users} color="#a78bfa" />
        <Card label="En attente" value={pending.toString()} icon={Clock} color="#f59e0b"
          sub={pending > 0 ? "À expédier" : "Tout est à jour"} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-6">

        {/* Commandes récentes */}
        <div className="lg:col-span-2 rounded-xl p-5" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Commandes récentes</p>
            <Link href="/admin/commandes" className="text-xs flex items-center gap-1 hover:opacity-80"
              style={{ color: "#60a5fa" }}>Voir tout <ChevronRight size={11} /></Link>
          </div>
          {orders.length === 0 ? (
            <p className="text-sm text-center py-10" style={{ color: "#475569" }}>Aucune commande pour l'instant.</p>
          ) : (
            <div className="space-y-2">
              {orders.slice(0, 5).map(o => (
                <div key={o.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg"
                  style={{ background: "#0f1117" }}>
                  <div>
                    <p className="text-xs font-mono font-bold" style={{ color: "#60a5fa" }}>{o.id}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
                      {o.customer.prenom} {o.customer.nom}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold" style={{ color: "#e2e8f0" }}>{o.total.toFixed(2)}€</p>
                    <span className="text-xs font-semibold" style={{ color: STATUS_COLOR[o.status] }}>
                      {STATUS_LABEL[o.status]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Répartition statuts */}
        <div className="rounded-xl p-5" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
          <p className="text-sm font-semibold mb-4" style={{ color: "#e2e8f0" }}>Statuts</p>
          {orders.length === 0 ? (
            <p className="text-xs text-center py-10" style={{ color: "#475569" }}>Aucune donnée</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(STATUS_COLOR).map(([status, color]) => {
                const count = statusCounts[status] ?? 0;
                const pct = orders.length ? (count / orders.length) * 100 : 0;
                return (
                  <div key={status}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: "#94a3b8" }}>{STATUS_LABEL[status]}</span>
                      <span style={{ color }}>{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "#1e2a3a" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">

        {/* Top produits */}
        <div className="rounded-xl p-5" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Top produits</p>
            <TrendingUp size={14} style={{ color: "#475569" }} />
          </div>
          {topProducts.length === 0 ? (
            <p className="text-xs text-center py-8" style={{ color: "#475569" }}>Aucune vente pour l'instant</p>
          ) : topProducts.map(({ product, qty }) => (
            <div key={product.id} className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-3.5 rounded flex-shrink-0" style={{ background: product.gradient }} />
                  <span className="text-xs truncate max-w-[160px]" style={{ color: "#94a3b8" }}>{product.shortName}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: "#e2e8f0" }}>{qty}</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "#1e2a3a" }}>
                <div className="h-full rounded-full" style={{ width: `${(qty / maxQty) * 100}%`, background: "linear-gradient(90deg, #2563eb, #60a5fa)" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Alertes stock */}
        <div className="rounded-xl p-5" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Alertes stock bas</p>
            <AlertTriangle size={14} style={{ color: lowStock.length > 0 ? "#f59e0b" : "#475569" }} />
          </div>
          {lowStock.length === 0 ? (
            <p className="text-xs text-center py-8" style={{ color: "#22c55e" }}>✓ Tous les stocks sont OK</p>
          ) : (
            <div className="space-y-2 max-h-52 overflow-y-auto">
              {lowStock.map(p => (
                <div key={p.id} className="flex items-center justify-between py-2 px-3 rounded-lg"
                  style={{ background: "#0f1117", border: `1px solid ${p.stock <= 5 ? "#ef444430" : "#f59e0b20"}` }}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-5 h-3.5 rounded flex-shrink-0" style={{ background: p.gradient }} />
                    <p className="text-xs truncate" style={{ color: "#94a3b8" }}>{p.shortName}</p>
                  </div>
                  <span className="text-xs font-bold flex-shrink-0 ml-2"
                    style={{ color: p.stock <= 5 ? "#ef4444" : "#f59e0b" }}>
                    {p.stock} restants
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AdminShell>
  );
}
