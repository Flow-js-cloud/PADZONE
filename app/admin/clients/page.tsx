"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { useOrders } from "@/context/OrderContext";
import { Search, ChevronDown, ChevronUp, ShoppingBag, Euro } from "lucide-react";

const STATUS_COLOR: Record<string, string> = {
  "en-attente": "#f59e0b", expediee: "#3b82f6", livree: "#22c55e", annulee: "#ef4444",
};
const STATUS_LABEL: Record<string, string> = {
  "en-attente": "En attente", expediee: "Expédiée", livree: "Livrée", annulee: "Annulée",
};

export default function AdminClientsPage() {
  const { orders } = useOrders();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  // Agréger par email
  const clientMap = orders.reduce((acc, o) => {
    const k = o.customer.email;
    if (!acc[k]) acc[k] = {
      prenom: o.customer.prenom, nom: o.customer.nom, email: k,
      adresse: `${o.customer.adresse}, ${o.customer.codePostal} ${o.customer.ville}`,
      orders: [], total: 0,
    };
    acc[k].orders.push(o);
    acc[k].total += o.total;
    return acc;
  }, {} as Record<string, { prenom: string; nom: string; email: string; adresse: string; orders: typeof orders; total: number }>);

  const clients = Object.values(clientMap).sort((a, b) => b.total - a.total);

  const filtered = clients.filter(c => {
    const q = search.toLowerCase();
    return !q || c.email.includes(q) || `${c.prenom} ${c.nom}`.toLowerCase().includes(q);
  });

  return (
    <AdminShell title="Clients">

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Clients uniques", value: clients.length, icon: ShoppingBag, color: "#60a5fa" },
          { label: "Total commandes", value: orders.length, icon: ShoppingBag, color: "#a78bfa" },
          { label: "Revenu total", value: `${orders.filter(o => o.status !== "annulee").reduce((s, o) => s + o.total, 0).toFixed(2)}€`, icon: Euro, color: "#22c55e" },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-4 rounded-xl" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
            <p className="text-xs mb-1" style={{ color: "#475569" }}>{label}</p>
            <p className="text-2xl font-bold" style={{ color: "#e2e8f0" }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Recherche */}
      <div className="relative mb-5">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#475569" }} />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher par nom ou email…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: "#141921", border: "1px solid #1e2a3a", color: "#e2e8f0" }} />
      </div>

      {/* Liste */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-sm" style={{ color: "#475569" }}>
            {clients.length === 0 ? "Aucun client pour l'instant." : "Aucun résultat."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(c => (
            <div key={c.email} className="rounded-xl overflow-hidden" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
              <div className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-white/[0.015]"
                onClick={() => setExpanded(expanded === c.email ? null : c.email)}>
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ background: "#1e2a3a", color: "#60a5fa" }}>
                  {c.prenom[0]?.toUpperCase()}{c.nom[0]?.toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>{c.prenom} {c.nom}</p>
                  <p className="text-xs" style={{ color: "#475569" }}>{c.email}</p>
                </div>

                <div className="text-center px-4">
                  <p className="text-sm font-bold" style={{ color: "#e2e8f0" }}>{c.orders.length}</p>
                  <p className="text-xs" style={{ color: "#475569" }}>commande{c.orders.length > 1 ? "s" : ""}</p>
                </div>

                <div className="text-right px-4">
                  <p className="text-sm font-bold" style={{ color: "#22c55e" }}>{c.total.toFixed(2)}€</p>
                  <p className="text-xs" style={{ color: "#475569" }}>dépensé</p>
                </div>

                {expanded === c.email
                  ? <ChevronUp size={14} style={{ color: "#475569" }} />
                  : <ChevronDown size={14} style={{ color: "#475569" }} />}
              </div>

              {/* Historique commandes */}
              {expanded === c.email && (
                <div className="px-5 pb-5 pt-0" style={{ borderTop: "1px solid #1e2a3a" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3 mt-4" style={{ color: "#475569" }}>
                    Historique des commandes
                  </p>
                  {c.adresse.trim() !== "," && (
                    <p className="text-xs mb-4" style={{ color: "#475569" }}>📍 {c.adresse}</p>
                  )}
                  <div className="space-y-2">
                    {c.orders.map(o => (
                      <div key={o.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg"
                        style={{ background: "#0f1117" }}>
                        <div>
                          <p className="text-xs font-mono font-bold" style={{ color: "#60a5fa" }}>{o.id}</p>
                          <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                            {new Date(o.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                            {" · "}{o.items.reduce((s, i) => s + i.quantity, 0)} article{o.items.reduce((s, i) => s + i.quantity, 0) > 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold" style={{ color: "#e2e8f0" }}>{o.total.toFixed(2)}€</p>
                          <p className="text-xs font-semibold" style={{ color: STATUS_COLOR[o.status] }}>
                            {STATUS_LABEL[o.status]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
