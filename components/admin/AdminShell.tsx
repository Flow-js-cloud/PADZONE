"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, ShoppingBag, Package, Users,
  Tag, BarChart2, Settings, LogOut, Zap,
} from "lucide-react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";

const NAV = [
  { href: "/admin",          icon: LayoutDashboard, label: "Dashboard"     },
  { href: "/admin/commandes", icon: ShoppingBag,    label: "Commandes"     },
  { href: "/admin/produits",  icon: Package,         label: "Produits"      },
  { href: "/admin/clients",   icon: Users,           label: "Clients"       },
  { href: "/admin/promos",    icon: Tag,             label: "Codes Promo"   },
  { href: "/admin/stats",     icon: BarChart2,       label: "Statistiques"  },
  { href: "/admin/parametres",icon: Settings,        label: "Paramètres"    },
];

export function AdminShell({ children, title }: { children: React.ReactNode; title: string }) {
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    setAuthed(localStorage.getItem("pz-admin") === "1");
  }, []);

  const login = () => {
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem("pz-admin", "1");
      setAuthed(true);
    } else {
      setErr(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("pz-admin");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f1117" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm p-8 rounded-2xl" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#1e2a3a" }}>
              <Zap size={18} style={{ color: "#60a5fa" }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "#e2e8f0" }}>PadZone Admin</p>
              <p className="text-xs" style={{ color: "#475569" }}>Panneau de gestion</p>
            </div>
          </div>
          <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#475569" }}>
            Mot de passe
          </label>
          <input type="password" value={pw}
            onChange={e => { setPw(e.target.value); setErr(false); }}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="••••••••" autoFocus
            className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-1"
            style={{ background: "#0f1117", border: `1px solid ${err ? "#ef4444" : "#1e2a3a"}`, color: "#e2e8f0" }}
          />
          {err && <p className="text-xs mb-3" style={{ color: "#ef4444" }}>Mot de passe incorrect.</p>}
          {!err && <div className="mb-3" />}
          <button onClick={login} className="w-full py-3 rounded-xl text-sm font-semibold"
            style={{ background: "#2563eb", color: "#fff" }}>
            Accéder au panneau
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#0f1117", fontFamily: "system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-56 flex flex-col z-20"
        style={{ background: "#141921", borderRight: "1px solid #1e2a3a" }}>
        {/* Logo */}
        <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: "1px solid #1e2a3a" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#1e2a3a" }}>
            <Zap size={15} style={{ color: "#60a5fa" }} />
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: "#e2e8f0" }}>PadZone</p>
            <p className="text-xs" style={{ color: "#475569" }}>Admin</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link key={href} href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: active ? "#1e2a3a" : "transparent",
                  color: active ? "#e2e8f0" : "#64748b",
                }}>
                <Icon size={15} style={{ color: active ? "#60a5fa" : "#475569" }} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3" style={{ borderTop: "1px solid #1e2a3a" }}>
          <Link href="/" target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors mb-1 hover:bg-white/5"
            style={{ color: "#475569" }}>
            <Zap size={13} />
            Voir le site
          </Link>
          <button onClick={logout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs w-full transition-colors hover:bg-white/5"
            style={{ color: "#475569" }}>
            <LogOut size={13} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-56 flex-1 p-8 min-h-screen">
        <div className="mb-7">
          <h1 className="text-2xl font-bold" style={{ color: "#e2e8f0" }}>{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
