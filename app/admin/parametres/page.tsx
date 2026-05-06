"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Check, Eye, EyeOff } from "lucide-react";

export default function AdminParametresPage() {
  const [saved, setSaved] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [store, setStore] = useState({
    name: "PadZone",
    email: "contact@padzone.fr",
    phone: "",
    address: "",
    freeShippingThreshold: "50",
    shippingCost: "5.99",
  });
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState("");

  const saveStore = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const changePw = () => {
    if (pw.current !== "padzone2024") return setPwMsg("Mot de passe actuel incorrect.");
    if (pw.next.length < 6) return setPwMsg("Nouveau mot de passe trop court (min 6 caractères).");
    if (pw.next !== pw.confirm) return setPwMsg("Les mots de passe ne correspondent pas.");
    setPwMsg("Mot de passe changé ✓ (redémarre pour appliquer)");
    setPw({ current: "", next: "", confirm: "" });
  };

  return (
    <AdminShell title="Paramètres">

      <div className="max-w-2xl space-y-6">

        {/* Infos boutique */}
        <div className="p-6 rounded-xl" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
          <p className="text-sm font-semibold mb-5" style={{ color: "#e2e8f0" }}>Informations boutique</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: "name",    label: "Nom de la boutique",  placeholder: "PadZone",             span: 1 },
              { key: "email",   label: "Email de contact",    placeholder: "contact@padzone.fr",  span: 1 },
              { key: "phone",   label: "Téléphone",           placeholder: "+33 6 00 00 00 00",   span: 1 },
              { key: "address", label: "Adresse",             placeholder: "12 rue de la Paix…",  span: 1 },
            ].map(({ key, label, placeholder, span }) => (
              <div key={key} className={span === 2 ? "col-span-2" : ""}>
                <label className="block text-xs mb-1.5" style={{ color: "#475569" }}>{label}</label>
                <input value={store[key as keyof typeof store]}
                  onChange={e => setStore(s => ({ ...s, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: "#0f1117", border: "1px solid #1e2a3a", color: "#e2e8f0" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Livraison */}
        <div className="p-6 rounded-xl" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
          <p className="text-sm font-semibold mb-5" style={{ color: "#e2e8f0" }}>Livraison</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "#475569" }}>Seuil livraison gratuite (€)</label>
              <input value={store.freeShippingThreshold}
                onChange={e => setStore(s => ({ ...s, freeShippingThreshold: e.target.value }))}
                type="number" placeholder="50"
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ background: "#0f1117", border: "1px solid #1e2a3a", color: "#e2e8f0" }} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "#475569" }}>Frais de livraison (€)</label>
              <input value={store.shippingCost}
                onChange={e => setStore(s => ({ ...s, shippingCost: e.target.value }))}
                type="number" step="0.01" placeholder="5.99"
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ background: "#0f1117", border: "1px solid #1e2a3a", color: "#e2e8f0" }} />
            </div>
          </div>
        </div>

        <button onClick={saveStore}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{ background: saved ? "#16a34a" : "#2563eb", color: "#fff" }}>
          {saved ? <><Check size={14} /> Sauvegardé</> : "Sauvegarder les modifications"}
        </button>

        {/* Sécurité */}
        <div className="p-6 rounded-xl" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
          <p className="text-sm font-semibold mb-5" style={{ color: "#e2e8f0" }}>Sécurité</p>
          <div className="space-y-3">
            {[
              { key: "current", label: "Mot de passe actuel", placeholder: "••••••••" },
              { key: "next",    label: "Nouveau mot de passe", placeholder: "Min. 6 caractères" },
              { key: "confirm", label: "Confirmer",            placeholder: "Répéter le mot de passe" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-xs mb-1.5" style={{ color: "#475569" }}>{label}</label>
                <div className="relative">
                  <input type={showPw ? "text" : "password"}
                    value={pw[key as keyof typeof pw]}
                    onChange={e => setPw(p => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-3 py-2.5 pr-10 rounded-lg text-sm outline-none"
                    style={{ background: "#0f1117", border: "1px solid #1e2a3a", color: "#e2e8f0" }} />
                  <button onClick={() => setShowPw(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#475569" }}>
                    {showPw ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>
            ))}
            {pwMsg && (
              <p className="text-xs" style={{ color: pwMsg.includes("✓") ? "#22c55e" : "#ef4444" }}>{pwMsg}</p>
            )}
            <button onClick={changePw}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold mt-1"
              style={{ background: "#1e2a3a", color: "#94a3b8" }}>
              Changer le mot de passe
            </button>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
