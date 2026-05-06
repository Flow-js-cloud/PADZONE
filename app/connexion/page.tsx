"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Zap, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ConnexionPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Remplis tous les champs."); return; }
    const ok = await login(email, password);
    if (ok) router.push("/");
    else setError("Email ou mot de passe incorrect.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(0,229,255,0.08), transparent)" }} />
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <Zap size={20} className="text-cyan-DEFAULT" />
              <span className="font-orbitron font-black text-xl">
                <span style={{ color: "#00e5ff" }}>PAD</span>
                <span style={{ color: "#ff0066" }}>ZONE</span>
              </span>
            </Link>
            <h1 className="font-orbitron font-black text-2xl text-white mb-2">Connexion</h1>
            <p className="text-white/40 font-rajdhani text-sm">
              Content de te revoir, gamer.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ton@email.com"
                className="w-full px-4 py-3 rounded-xl bg-elevated border border-border focus:border-cyan-DEFAULT/60 outline-none text-white font-rajdhani placeholder:text-white/20 transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-white/40 uppercase tracking-wider">
                  Mot de passe
                </label>
                <Link href="#" className="text-xs font-mono text-cyan-DEFAULT/60 hover:text-cyan-DEFAULT transition-colors">
                  Oublié ?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-elevated border border-border focus:border-cyan-DEFAULT/60 outline-none text-white font-rajdhani placeholder:text-white/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
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
                <span className="font-mono text-xs tracking-wider">CONNEXION…</span>
              ) : (
                <>
                  <LogIn size={16} />
                  Se connecter
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="h-px bg-border" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-surface text-xs font-mono text-white/20">
              ou
            </span>
          </div>

          {/* Social login */}
          <button className="w-full py-3 rounded-xl border border-border bg-elevated hover:bg-border transition-colors text-sm font-rajdhani font-semibold text-white/60 flex items-center justify-center gap-2">
            <span>🎮</span> Continuer avec Discord
          </button>

          {/* Sign up link */}
          <p className="text-center text-sm font-rajdhani text-white/30 mt-6">
            Pas encore de compte ?{" "}
            <Link href="/inscription" className="text-cyan-DEFAULT hover:text-cyan-DEFAULT/80 font-semibold transition-colors">
              S'inscrire
            </Link>
          </p>
        </div>

        {/* Bottom hint */}
        <p className="text-center text-xs font-mono text-white/15 mt-4">
          En vous connectant vous acceptez nos{" "}
          <Link href="/cgv" className="underline hover:text-white/30">CGV</Link>
        </p>
      </motion.div>
    </div>
  );
}
