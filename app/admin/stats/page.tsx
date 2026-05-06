"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { useOrders } from "@/context/OrderContext";
import { PRODUCTS } from "@/lib/products";

const CATEGORY_LABEL: Record<string, string> = {
  anime: "Anime", jeux: "Jeux Vidéo", rgb: "RGB", standard: "Standard", bureautique: "Bureautique",
};
const CATEGORY_COLOR: Record<string, string> = {
  anime: "#ff0066", jeux: "#00ff99", rgb: "#00e5ff", standard: "#94a3b8", bureautique: "#c9b8f5",
};

export default function AdminStatsPage() {
  const { orders } = useOrders();

  const validOrders = orders.filter(o => o.status !== "annulee");
  const revenue = validOrders.reduce((s, o) => s + o.total, 0);
  const avgOrder = validOrders.length ? revenue / validOrders.length : 0;

  // Revenus par catégorie
  const catRevenue = orders.flatMap(o => o.items).reduce((acc, item) => {
    const cat = item.product.category;
    acc[cat] = (acc[cat] ?? 0) + item.product.price * item.quantity;
    return acc;
  }, {} as Record<string, number>);
  const maxCatRevenue = Math.max(...Object.values(catRevenue), 1);

  // Produits les plus vendus
  const productStats = orders.flatMap(o => o.items).reduce((acc, item) => {
    const k = item.product.id;
    if (!acc[k]) acc[k] = { product: item.product, qty: 0, revenue: 0 };
    acc[k].qty += item.quantity;
    acc[k].revenue += item.product.price * item.quantity;
    return acc;
  }, {} as Record<string, { product: (typeof PRODUCTS)[0]; qty: number; revenue: number }>);
  const topProducts = Object.values(productStats).sort((a, b) => b.revenue - a.revenue).slice(0, 8);
  const maxRevProduct = topProducts[0]?.revenue ?? 1;

  // Commandes par jour (7 derniers jours)
  const last7: { date: string; count: number; revenue: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" });
    const dayOrders = orders.filter(o => new Date(o.date).toDateString() === d.toDateString());
    last7.push({
      date: dateStr,
      count: dayOrders.length,
      revenue: dayOrders.reduce((s, o) => s + o.total, 0),
    });
  }
  const maxDayRevenue = Math.max(...last7.map(d => d.revenue), 1);

  // Taux de conversion statuts
  const total = orders.length;
  const statusPct = {
    livree: total ? (orders.filter(o => o.status === "livree").length / total) * 100 : 0,
    annulee: total ? (orders.filter(o => o.status === "annulee").length / total) * 100 : 0,
  };

  return (
    <AdminShell title="Statistiques">

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Revenu total", value: `${revenue.toFixed(2)}€`, color: "#22c55e" },
          { label: "Commandes valides", value: validOrders.length.toString(), color: "#60a5fa" },
          { label: "Panier moyen", value: `${avgOrder.toFixed(2)}€`, color: "#a78bfa" },
          { label: "Taux de livraison", value: `${statusPct.livree.toFixed(0)}%`, color: "#f59e0b" },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-5 rounded-xl" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
            <p className="text-xs mb-2" style={{ color: "#475569" }}>{label}</p>
            <p className="text-2xl font-bold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">

        {/* Graphe 7 jours */}
        <div className="p-5 rounded-xl" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
          <p className="text-sm font-semibold mb-5" style={{ color: "#e2e8f0" }}>Revenus — 7 derniers jours</p>
          <div className="flex items-end gap-2 h-36">
            {last7.map(({ date, revenue: rev, count }) => (
              <div key={date} className="flex-1 flex flex-col items-center gap-1">
                <p className="text-xs font-bold" style={{ color: "#60a5fa", visibility: rev > 0 ? "visible" : "hidden" }}>
                  {rev.toFixed(0)}€
                </p>
                <div className="w-full rounded-t transition-all"
                  style={{ height: `${Math.max((rev / maxDayRevenue) * 100, rev > 0 ? 4 : 0)}px`, background: rev > 0 ? "linear-gradient(180deg, #3b82f6, #1d4ed8)" : "#1e2a3a" }} />
                <p className="text-[10px] text-center" style={{ color: "#475569" }}>{date}</p>
                {count > 0 && <p className="text-[10px]" style={{ color: "#64748b" }}>{count} cmd</p>}
              </div>
            ))}
          </div>
          {orders.length === 0 && (
            <p className="text-xs text-center mt-4" style={{ color: "#475569" }}>Aucune donnée disponible</p>
          )}
        </div>

        {/* Revenus par catégorie */}
        <div className="p-5 rounded-xl" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
          <p className="text-sm font-semibold mb-5" style={{ color: "#e2e8f0" }}>Revenus par catégorie</p>
          {Object.keys(catRevenue).length === 0 ? (
            <p className="text-xs text-center py-10" style={{ color: "#475569" }}>Aucune donnée</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(catRevenue).sort((a, b) => b[1] - a[1]).map(([cat, rev]) => (
                <div key={cat}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: CATEGORY_COLOR[cat] ?? "#94a3b8" }}>{CATEGORY_LABEL[cat] ?? cat}</span>
                    <span className="font-bold" style={{ color: "#e2e8f0" }}>{rev.toFixed(2)}€</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "#1e2a3a" }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${(rev / maxCatRevenue) * 100}%`, background: CATEGORY_COLOR[cat] ?? "#94a3b8" }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Top produits par revenu */}
      <div className="p-5 rounded-xl" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
        <p className="text-sm font-semibold mb-5" style={{ color: "#e2e8f0" }}>Top produits par chiffre d'affaires</p>
        {topProducts.length === 0 ? (
          <p className="text-xs text-center py-10" style={{ color: "#475569" }}>Aucune vente pour l'instant</p>
        ) : (
          <div className="space-y-3">
            {topProducts.map(({ product, qty, revenue: rev }, i) => (
              <div key={product.id} className="flex items-center gap-4">
                <span className="text-xs font-mono w-5 text-right flex-shrink-0" style={{ color: i < 3 ? "#f59e0b" : "#475569" }}>
                  {i + 1}
                </span>
                <div className="w-8 h-5 rounded flex-shrink-0" style={{ background: product.gradient }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs truncate" style={{ color: "#94a3b8" }}>{product.shortName}</span>
                    <div className="flex gap-3 flex-shrink-0 ml-2">
                      <span className="text-xs" style={{ color: "#475569" }}>{qty} vendus</span>
                      <span className="text-xs font-bold" style={{ color: "#e2e8f0" }}>{rev.toFixed(2)}€</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "#1e2a3a" }}>
                    <div className="h-full rounded-full"
                      style={{ width: `${(rev / maxRevProduct) * 100}%`, background: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : i === 2 ? "#c8883a" : "#1e40af" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </AdminShell>
  );
}
