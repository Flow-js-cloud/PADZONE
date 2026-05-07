"use client";

import { Shield, Truck, RotateCcw, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import { IntroAnimation } from "@/components/IntroAnimation";
import { ProductCard } from "@/components/ProductCard";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { getAllProducts } from "@/lib/customProducts";
import { PRODUCTS } from "@/lib/products";
import { useState, useEffect } from "react";
import type { Product } from "@/lib/products";

const HERO_BG   = "/products/rgb-xl-setup.webp";
const HERO_MEDIA = "/products/rgb-xl-closeup.webp";

const TRUST = [
  { icon: Shield, label: "Paiement sécurisé", desc: "SSL 256-bit" },
  { icon: Truck, label: "Livraison internationale", desc: "15-30 jours ouvrés" },
  { icon: RotateCcw, label: "Retours 30 jours", desc: "Sans justification" },
  { icon: Award, label: "Qualité premium", desc: "Impression HD garantie" },
];

export default function HomePage() {
  const [newProducts, setNewProducts] = useState<Product[]>(
    () => PRODUCTS.filter(p => p.isNew).slice(0, 4)
  );

  useEffect(() => {
    setNewProducts(getAllProducts().filter(p => p.isNew).slice(0, 4));
  }, []);

  return (
    <>
      <IntroAnimation />

      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={HERO_MEDIA}
        bgImageSrc={HERO_BG}
        title="ÉLÈVE TON SETUP"
        date="PadZone"
        scrollToExpand="↓ Scroll pour explorer"
        textBlend
      >
        {/* ── COLLECTIONS ─────────────────────────────────────────────────── */}
        <section className="mb-24 overflow-hidden">
          {/* Titre oversized en fond */}
          <div className="relative mb-10">
            <p
              className="font-orbitron font-black select-none pointer-events-none absolute -top-6 left-0 text-[clamp(4rem,12vw,9rem)] leading-none text-white/[0.03] whitespace-nowrap"
            >
              COLLECTIONS
            </p>
            <div className="relative">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-DEFAULT mb-3">// Nos collections</p>
              <h2 className="font-orbitron font-black text-4xl text-white">
                Choisis ton <span className="text-gradient-rgb">univers</span>
              </h2>
            </div>
          </div>

          {/* Grid asymétrique */}
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[460px]">

            {/* RGB — grande carte gauche */}
            <div className="col-span-2 h-52 md:row-span-2 md:col-span-1 md:h-full animate-fade-up">
              <Link href="/categories/rgb" className="group relative flex h-full rounded-2xl overflow-hidden border border-cyan-DEFAULT/20 hover:border-cyan-DEFAULT/60 transition-all duration-500">
                <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #020209 0%, #001428 50%, #002a40 100%)" }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(0,229,255,0.15), transparent 70%)" }} />
                {["#ff0066","#00e5ff","#00ff99","#bf00ff","#ff9900","#ffd700"].map((c, i) => (
                  <div key={i} className="absolute w-3 h-3 rounded-full animate-pulse"
                    style={{ background: c, filter: `blur(1px) drop-shadow(0 0 8px ${c})`,
                      top: `${12 + i * 13}%`, right: `${10 + (i % 3) * 10}%`,
                      animationDelay: `${i * 0.4}s` }} />
                ))}
                <div className="relative z-10 flex flex-col justify-end p-4 md:p-7">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase mb-1 md:mb-2" style={{ color: "#00e5ff" }}>LED · 16.8M couleurs</span>
                  <h3 className="font-orbitron font-black text-2xl md:text-3xl text-white mb-1 md:mb-2 leading-tight">
                    RGB Gaming
                  </h3>
                  <p className="text-white/40 text-xs md:text-sm font-rajdhani hidden md:block mb-5">Illumine ton bureau avec 7 effets lumineux synchronisés.</p>
                  <span className="inline-flex items-center gap-2 text-sm font-orbitron font-bold text-cyan-DEFAULT group-hover:gap-3 transition-all">
                    Explorer <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            </div>

            {/* Anime */}
            <div className="h-40 md:h-full animate-fade-up delay-100">
              <Link href="/categories/anime" className="group relative flex h-full rounded-2xl overflow-hidden border border-magenta-DEFAULT/20 hover:border-magenta-DEFAULT/60 transition-all duration-500">
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a0010 0%, #2a0030 60%, #4a0020 100%)" }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,0,102,0.12), transparent 70%)" }} />
                <div className="relative z-10 flex flex-col justify-end p-3 md:p-6">
                  <div className="hidden md:flex gap-1.5 mb-3 flex-wrap">
                    {["DBZ","Naruto","One Piece","JJK"].map(t => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-orbitron font-black text-xl md:text-2xl text-white mb-1">Anime</h3>
                  <span className="text-xs font-rajdhani text-magenta-DEFAULT flex items-center gap-1 group-hover:gap-2 transition-all">
                    Voir la collection <ChevronRight size={11} />
                  </span>
                </div>
              </Link>
            </div>

            {/* Jeux Vidéo */}
            <div className="h-40 md:h-full animate-fade-up delay-150">
              <Link href="/categories/jeux" className="group relative flex h-full rounded-2xl overflow-hidden border border-neon-green/20 hover:border-neon-green/60 transition-all duration-500">
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #001510 0%, #002820 60%, #004030 100%)" }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,255,153,0.1), transparent 70%)" }} />
                <div className="relative z-10 flex flex-col justify-end p-3 md:p-6">
                  <div className="hidden md:flex gap-1.5 mb-3 flex-wrap">
                    {["Valorant","LoL","CS2","Apex"].map(t => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-orbitron font-black text-xl md:text-2xl text-white mb-1">Jeux Vidéo</h3>
                  <span className="text-xs font-rajdhani text-neon-green flex items-center gap-1 group-hover:gap-2 transition-all">
                    Voir la collection <ChevronRight size={11} />
                  </span>
                </div>
              </Link>
            </div>

            {/* Bureautique */}
            <div className="h-40 md:h-full animate-fade-up delay-200">
              <Link href="/categories/bureautique" className="group relative flex h-full rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/40 transition-all duration-500">
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0e0e14 0%, #16101e 50%, #1a1228 100%)" }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(201,184,245,0.1), transparent 70%)" }} />
                <div className="relative z-10 flex flex-col justify-end p-3 md:p-6">
                  <div className="hidden md:flex gap-1.5 mb-3 flex-wrap">
                    {["Marbre","Cuir","Nature"].map(t => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-orbitron font-black text-lg md:text-2xl text-white mb-1 leading-tight">Bureautique</h3>
                  <span className="text-xs font-rajdhani flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: "#c9b8f5" }}>
                    Voir la collection <ChevronRight size={11} />
                  </span>
                </div>
              </Link>
            </div>

            {/* Par Taille */}
            <div className="h-40 md:h-full animate-fade-up delay-250">
              <Link href="/categories/tailles" className="group relative flex h-full rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/60 transition-all duration-500">
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a0800 0%, #1a1200 50%, #2a1e00 100%)" }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,215,0,0.08), transparent 70%)" }} />
                <div className="relative z-10 flex flex-col justify-end p-3 md:p-6">
                  <div className="hidden md:flex items-end gap-1 mb-3">
                    {[14, 20, 28, 36, 44, 52].map((h, i) => (
                      <div key={i} className="w-3 rounded-t"
                        style={{ height: `${h}px`, background: `rgba(255,215,0,${0.2 + i * 0.1})`, border: "1px solid rgba(255,215,0,0.25)" }} />
                    ))}
                  </div>
                  <h3 className="font-orbitron font-black text-xl md:text-2xl text-white mb-1">Par Taille</h3>
                  <span className="text-xs font-rajdhani text-gold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Trouver ma taille <ChevronRight size={11} />
                  </span>
                </div>
              </Link>
            </div>

          </div>
        </section>

        {/* ── DERNIÈRES SORTIES ────────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="flex items-end justify-between mb-10">
            <div className="animate-fade-up">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-magenta-DEFAULT mb-3">// Nouveautés</p>
              <h2 className="font-orbitron font-black text-4xl text-white">
                Dernières <span className="text-gradient-rgb">Sorties</span>
              </h2>
            </div>
            <Link href="/categories/nouveautes" className="hidden sm:flex items-center gap-2 text-sm font-orbitron font-semibold text-white/40 hover:text-cyan-DEFAULT transition-colors">
              Tout voir <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>

        {/* ── TRUST ───────────────────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST.map(({ icon: Icon, label, desc }, i) => (
              <div key={label}
                className={`flex flex-col items-center text-center p-4 sm:p-6 rounded-xl border border-border bg-surface animate-fade-up delay-${i * 100}`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)" }}>
                  <Icon size={22} className="text-cyan-DEFAULT" />
                </div>
                <h3 className="font-orbitron font-bold text-xs text-white mb-1 tracking-wide">{label}</h3>
                <p className="text-xs font-mono text-white/50">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEWSLETTER ──────────────────────────────────────────────────── */}
        <section>
          <div
            className="relative overflow-hidden rounded-2xl p-6 sm:p-10 md:p-12 text-center border border-border animate-fade-up"
            style={{ background: "linear-gradient(135deg, #0a0a14, #131326)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #00e5ff, transparent)" }} />
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-DEFAULT mb-4">// Newsletter</p>
            <h2 className="font-orbitron font-black text-3xl text-white mb-3">Reste dans la Zone</h2>
            <p className="text-white/40 font-rajdhani mb-8 max-w-md mx-auto">
              Nouveautés, promos exclusives, drops limités. -10% sur ta première commande.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="ton@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-surface border border-border focus:border-cyan-DEFAULT/60 outline-none text-white font-rajdhani text-sm placeholder:text-white/20 transition-colors"
              />
              <button type="submit" className="btn-primary px-6 py-3 rounded-xl text-sm whitespace-nowrap">
                S'inscrire
              </button>
            </form>
            <p className="mt-4 text-xs font-mono text-white/40">Pas de spam. Désinscription en 1 clic.</p>
          </div>
        </section>
      </ScrollExpandMedia>
    </>
  );
}
