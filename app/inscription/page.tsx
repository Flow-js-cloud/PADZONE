"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Zap, UserPlus, Check, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function InscriptionPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [cgv, setCgv] = useState(false);
  const [error, setError] = useState("");

  const [adresse, setAdresse] = useState("");
  const [complement, setComplement] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [pays, setPays] = useState("France");

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ["", "#ff0066", "#ffd700", "#00ff99"];
  const strengthLabels = ["", "Faible", "Moyen", "Fort"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) { setError("Remplis tous les champs."); return; }
    if (password !== confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    if (password.length < 6) { setError("Le mot de passe doit faire au moins 6 caractères."); return; }
    if (!cgv) { setError("Tu dois accepter les CGV."); return; }
    if (!adresse.trim()) { setError("L'adresse de livraison est requise."); return; }
    if (!codePostal.trim()) { setError("Le code postal est requis."); return; }
    if (!ville.trim()) { setError("La ville est requise."); return; }
    const ok = await register(name, email, password, { adresse, complement, codePostal, ville, pays });
    if (ok) router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(255,0,102,0.06), transparent)" }} />
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,0,102,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,102,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-8 md:p-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <Zap size={20} className="text-cyan-DEFAULT" />
              <span className="font-orbitron font-black text-xl">
                <span style={{ color: "#00e5ff" }}>PAD</span>
                <span style={{ color: "#ff0066" }}>ZONE</span>
              </span>
            </Link>
            <h1 className="font-orbitron font-black text-2xl text-white mb-2">Créer un compte</h1>
            <p className="text-white/40 font-rajdhani text-sm">
              Rejoins +15 000 gamers dans la PadZone.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Pseudo / Nom", type: "text", val: name, set: setName, placeholder: "GameMaster42" },
              { label: "Email", type: "email", val: email, set: setEmail, placeholder: "ton@email.com" },
            ].map(({ label, type, val, set, placeholder }) => (
              <div key={label}>
                <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">{label}</label>
                <input
                  type={type}
                  value={val}
                  onChange={e => set(e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 rounded-xl bg-elevated border border-border focus:border-cyan-DEFAULT/60 outline-none text-white font-rajdhani placeholder:text-white/20 transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-elevated border border-border focus:border-cyan-DEFAULT/60 outline-none text-white font-rajdhani placeholder:text-white/20 transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map(lvl => (
                      <div key={lvl} className="flex-1 h-1 rounded-full transition-all" style={{ background: lvl <= passwordStrength ? strengthColors[passwordStrength] : "#1f1f3a" }} />
                    ))}
                  </div>
                  <span className="text-xs font-mono" style={{ color: strengthColors[passwordStrength] }}>
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">Confirmer</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-elevated border focus:border-cyan-DEFAULT/60 outline-none text-white font-rajdhani placeholder:text-white/20 transition-colors"
                style={{ borderColor: confirm && confirm !== password ? "#ff0066" : "#1f1f3a" }}
              />
            </div>

            {/* Adresse de livraison */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={13} className="text-cyan-DEFAULT" />
                <span className="text-xs font-mono text-white/50 uppercase tracking-wider">Adresse de livraison</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">Adresse *</label>
                  <input
                    type="text"
                    value={adresse}
                    onChange={e => setAdresse(e.target.value)}
                    placeholder="12 rue de la Paix"
                    className="w-full px-4 py-3 rounded-xl bg-elevated border border-border focus:border-cyan-DEFAULT/60 outline-none text-white font-rajdhani placeholder:text-white/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">Complément <span className="normal-case text-white/20">(optionnel)</span></label>
                  <input
                    type="text"
                    value={complement}
                    onChange={e => setComplement(e.target.value)}
                    placeholder="Appartement, bâtiment…"
                    className="w-full px-4 py-3 rounded-xl bg-elevated border border-border focus:border-cyan-DEFAULT/60 outline-none text-white font-rajdhani placeholder:text-white/20 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">Code postal *</label>
                    <input
                      type="text"
                      value={codePostal}
                      onChange={e => setCodePostal(e.target.value)}
                      placeholder="75001"
                      className="w-full px-4 py-3 rounded-xl bg-elevated border border-border focus:border-cyan-DEFAULT/60 outline-none text-white font-rajdhani placeholder:text-white/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">Ville *</label>
                    <input
                      type="text"
                      value={ville}
                      onChange={e => setVille(e.target.value)}
                      placeholder="Paris"
                      className="w-full px-4 py-3 rounded-xl bg-elevated border border-border focus:border-cyan-DEFAULT/60 outline-none text-white font-rajdhani placeholder:text-white/20 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">Pays *</label>
                  <select
                    value={pays}
                    onChange={e => setPays(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-elevated border border-border focus:border-cyan-DEFAULT/60 outline-none text-white font-rajdhani transition-colors"
                  >
                    {["France", "Belgique", "Suisse", "Luxembourg", "Canada", "Autre"].map(p => (
                      <option key={p} value={p} style={{ background: "#0a0a14" }}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-1">
              {[
                { val: newsletter, set: setNewsletter, text: "Recevoir les offres exclusives et nouveautés (-10% dès l'inscription)" },
                { val: cgv, set: setCgv, text: <span>J'accepte les <Link href="/cgv" className="text-cyan-DEFAULT underline">CGV</Link> et la <Link href="/politique-confidentialite" className="text-cyan-DEFAULT underline">Politique de confidentialité</Link></span> },
              ].map(({ val, set, text }, i) => (
                <label key={i} className="flex items-start gap-3 cursor-pointer">
                  <div
                    onClick={() => set(!val)}
                    className="mt-0.5 w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-all"
                    style={{
                      background: val ? "#00e5ff" : "transparent",
                      borderColor: val ? "#00e5ff" : "#1f1f3a",
                    }}
                  >
                    {val && <Check size={10} className="text-void" strokeWidth={3} />}
                  </div>
                  <span className="text-xs text-white/40 font-rajdhani leading-snug">{text}</span>
                </label>
              ))}
            </div>

            {error && (
              <p className="text-xs font-mono text-magenta-DEFAULT px-4 py-2 rounded-lg bg-magenta-DEFAULT/10 border border-magenta-DEFAULT/20">
                ⚠ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="font-mono text-xs tracking-wider">CRÉATION…</span>
              ) : (
                <>
                  <UserPlus size={16} />
                  Créer mon compte
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm font-rajdhani text-white/30 mt-6">
            Déjà un compte ?{" "}
            <Link href="/connexion" className="text-cyan-DEFAULT hover:text-cyan-DEFAULT/80 font-semibold">
              Se connecter
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
