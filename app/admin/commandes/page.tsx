"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Truck, CheckCircle, XCircle, Clock, ChevronDown, Search } from "lucide-react";
import { useOrders, type Order, type OrderStatus } from "@/context/OrderContext";
import { AdminShell } from "@/components/admin/AdminShell";

/* ── Config statuts ────────────────────────────────────────────── */
const STATUS: Record<OrderStatus, { label: string; color: string; bg: string; border: string; icon: React.ElementType }> = {
  "en-attente": { label: "En attente",  color: "#f59e0b", bg: "#fef3c710", border: "#f59e0b30", icon: Clock        },
  "expediee":   { label: "Expédiée",    color: "#3b82f6", bg: "#eff6ff10", border: "#3b82f630", icon: Truck        },
  "livree":     { label: "Livrée",      color: "#22c55e", bg: "#f0fdf410", border: "#22c55e30", icon: CheckCircle  },
  "annulee":    { label: "Annulée",     color: "#ef4444", bg: "#fef2f210", border: "#ef444430", icon: XCircle      },
};
const ALL_STATUSES = Object.keys(STATUS) as OrderStatus[];

/* ── Composants ────────────────────────────────────────────────── */
function Badge({ status }: { status: OrderStatus }) {
  const s = STATUS[status];
  const Icon = s.icon;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
      <Icon size={11} /> {s.label}
    </span>
  );
}

function StatusMenu({ order, onUpdate }: { order: Order; onUpdate: (id: string, s: OrderStatus) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onClick={e => e.stopPropagation()}>
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors"
        style={{ background: "#1e2433", color: "#94a3b8" }}>
        Modifier <ChevronDown size={11} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 top-full mt-1 w-40 rounded-xl overflow-hidden z-30 shadow-2xl"
            style={{ background: "#1a2030", border: "1px solid #2d3748" }}>
            {ALL_STATUSES.map(s => {
              const cfg = STATUS[s];
              const Icon = cfg.icon;
              return (
                <button key={s} onClick={() => { onUpdate(order.id, s); setOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium hover:bg-white/5 transition-colors text-left"
                  style={{ color: s === order.status ? cfg.color : "#64748b" }}>
                  <Icon size={12} style={{ color: cfg.color }} />
                  {cfg.label}
                  {s === order.status && <span className="ml-auto opacity-60">✓</span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OrderRow({ order, onUpdate }: { order: Order; onUpdate: (id: string, s: OrderStatus) => void }) {
  const [open, setOpen] = useState(false);
  const d = new Date(order.date);

  return (
    <div className="rounded-xl overflow-hidden transition-colors" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
      <div className="flex flex-wrap items-center gap-4 px-5 py-4 cursor-pointer hover:bg-white/[0.015]"
        onClick={() => setOpen(o => !o)}>

        <div className="w-32 flex-shrink-0">
          <p className="text-sm font-mono font-bold" style={{ color: "#60a5fa" }}>{order.id}</p>
          <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
            {d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })} · {d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>

        <div className="flex-1 min-w-[160px]">
          <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>
            {order.customer.prenom} {order.customer.nom}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{order.customer.email}</p>
        </div>

        <div className="text-center w-16">
          <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>{order.items.reduce((s, i) => s + i.quantity, 0)}</p>
          <p className="text-xs" style={{ color: "#475569" }}>art.</p>
        </div>

        <div className="text-right w-20">
          <p className="text-sm font-bold" style={{ color: "#e2e8f0" }}>{order.total.toFixed(2)}€</p>
        </div>

        <Badge status={order.status} />
        <StatusMenu order={order} onUpdate={onUpdate} />

        <ChevronDown size={14} style={{ color: "#475569", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", marginLeft: "auto" }} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            className="overflow-hidden" style={{ borderTop: "1px solid #1e2a3a" }}>
            <div className="p-5 grid md:grid-cols-2 gap-6">

              {/* Adresse */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#475569" }}>Livraison</p>
                <div className="space-y-1 text-sm" style={{ color: "#94a3b8" }}>
                  <p className="font-semibold" style={{ color: "#e2e8f0" }}>{order.customer.prenom} {order.customer.nom}</p>
                  <p>{order.customer.adresse}{order.customer.complement ? `, ${order.customer.complement}` : ""}</p>
                  <p>{order.customer.codePostal} {order.customer.ville}, {order.customer.pays}</p>
                  <p className="text-xs mt-1" style={{ color: "#475569" }}>{order.customer.email}</p>
                </div>
              </div>

              {/* Articles */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#475569" }}>Articles</p>
                <div className="space-y-2">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="w-9 h-6 rounded flex-shrink-0" style={{ background: item.product.gradient }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: "#e2e8f0" }}>{item.product.shortName}</p>
                        <p className="text-xs" style={{ color: "#475569" }}>{item.product.size} · {item.product.dimensions}</p>
                      </div>
                      <p className="text-xs" style={{ color: "#64748b" }}>×{item.quantity}</p>
                      <p className="text-xs font-bold" style={{ color: "#94a3b8" }}>{(item.product.price * item.quantity).toFixed(2)}€</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 space-y-1 text-xs" style={{ borderTop: "1px solid #1e2a3a" }}>
                  <div className="flex justify-between" style={{ color: "#475569" }}>
                    <span>Sous-total</span><span>{order.subtotal.toFixed(2)}€</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between" style={{ color: "#22c55e" }}>
                      <span>Réduction {order.promoCode && `(${order.promoCode})`}</span>
                      <span>-{order.discount.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between" style={{ color: "#475569" }}>
                    <span>Livraison</span>
                    <span style={{ color: order.shipping === 0 ? "#22c55e" : undefined }}>
                      {order.shipping === 0 ? "Gratuite" : `${order.shipping.toFixed(2)}€`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold pt-1" style={{ borderTop: "1px solid #1e2a3a", color: "#e2e8f0" }}>
                    <span>Total</span><span>{order.total.toFixed(2)}€</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Page principale ───────────────────────────────────────────── */
export default function AdminCommandesPage() {
  const { orders, updateStatus } = useOrders();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    const match = !q || o.id.toLowerCase().includes(q) ||
      o.customer.email.toLowerCase().includes(q) ||
      `${o.customer.prenom} ${o.customer.nom}`.toLowerCase().includes(q);
    return match && (filterStatus === "all" || o.status === filterStatus);
  });

  return (
    <AdminShell title="Commandes">

      {/* Filtres statuts */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setFilterStatus("all")}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          style={{ background: filterStatus === "all" ? "#2563eb" : "#1e2a3a", color: filterStatus === "all" ? "#fff" : "#64748b" }}>
          Tous ({orders.length})
        </button>
        {ALL_STATUSES.map(s => {
          const cfg = STATUS[s];
          const count = orders.filter(o => o.status === s).length;
          return (
            <button key={s} onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              style={{
                background: filterStatus === s ? cfg.bg : "#1e2a3a",
                border: `1px solid ${filterStatus === s ? cfg.border : "transparent"}`,
                color: filterStatus === s ? cfg.color : "#64748b",
              }}>
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Recherche */}
      <div className="relative mb-5">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#475569" }} />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher par nom, email ou n° commande…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: "#141921", border: "1px solid #1e2a3a", color: "#e2e8f0" }} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Package size={40} className="mx-auto mb-4" style={{ color: "#1e2a3a" }} />
          <p className="text-sm" style={{ color: "#475569" }}>
            {orders.length === 0 ? "Aucune commande pour l'instant." : "Aucun résultat."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(o => <OrderRow key={o.id} order={o} onUpdate={updateStatus} />)}
        </div>
      )}

    </AdminShell>
  );
}
