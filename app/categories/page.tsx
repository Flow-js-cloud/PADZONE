"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import { ANIME_CATEGORIES, GAME_CATEGORIES, SIZE_CATEGORIES } from "@/lib/products";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-DEFAULT mb-3">
          // Catalogue
        </p>
        <h1 className="font-orbitron font-black text-5xl text-white mb-4">
          Toutes les <span className="text-gradient-rgb">Catégories</span>
        </h1>
        <p className="text-white/40 font-rajdhani text-lg max-w-xl">
          Anime, Jeux Vidéo, RGB LED, par taille — trouve le tapis parfait pour ton setup.
        </p>
      </motion.div>

      {/* RGB */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Zap size={18} className="text-cyan-DEFAULT" style={{ filter: "drop-shadow(0 0 6px #00e5ff)" }} />
          <h2 className="font-orbitron font-bold text-xl text-white tracking-wider">RGB Gaming</h2>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(0,229,255,0.3), transparent)" }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { slug: "rgb", label: "Tous les RGB", sub: "LED 16.8M couleurs", color: "#00e5ff" },
            { slug: "rgb-anime", label: "RGB Anime", sub: "DBZ · Naruto · One Piece", color: "#ff0066" },
            { slug: "rgb-fulldesk", label: "RGB Full Desk", sub: "120 × 60 cm", color: "#00ff99" },
          ].map(({ slug, label, sub, color }, i) => (
            <motion.div key={slug} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link href={`/categories/${slug}`}
                className="group flex items-center justify-between p-5 rounded-xl border border-border hover:border-cyan-DEFAULT/50 bg-surface hover:bg-elevated transition-all duration-200"
              >
                <div>
                  <h3 className="font-orbitron font-bold text-sm text-white group-hover:text-cyan-DEFAULT transition-colors">{label}</h3>
                  <p className="text-xs font-mono text-white/30 mt-1">{sub}</p>
                </div>
                <ChevronRight size={16} style={{ color }} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Anime */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-lg">⚡</span>
          <h2 className="font-orbitron font-bold text-xl text-white tracking-wider">Anime</h2>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,0,102,0.3), transparent)" }} />
          <Link href="/categories/anime" className="text-xs font-mono text-white/30 hover:text-magenta-DEFAULT transition-colors">
            Tout voir
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {ANIME_CATEGORIES.map(({ slug, name, color, count }, i) => (
            <motion.div key={slug} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link href={`/categories/anime/${slug}`}
                className="group block p-4 rounded-xl border border-border bg-surface hover:bg-elevated transition-all duration-200 text-center"
                style={{ "--c": color } as React.CSSProperties}
              >
                <div
                  className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center font-orbitron font-black text-xs"
                  style={{ background: `${color}18`, border: `1px solid ${color}40`, color }}
                >
                  {slug.slice(0, 2).toUpperCase()}
                </div>
                <p className="font-orbitron font-bold text-xs text-white group-hover:text-current transition-colors">{name}</p>
                <p className="text-xs font-mono text-white/25 mt-1">{count} produits</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Jeux */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-lg">🎮</span>
          <h2 className="font-orbitron font-bold text-xl text-white tracking-wider">Jeux Vidéo</h2>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(0,255,153,0.3), transparent)" }} />
          <Link href="/categories/jeux" className="text-xs font-mono text-white/30 hover:text-neon-green transition-colors">
            Tout voir
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {GAME_CATEGORIES.map(({ slug, name, color, count }, i) => (
            <motion.div key={slug} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link href={`/categories/jeux/${slug}`}
                className="group block p-4 rounded-xl border border-border bg-surface hover:bg-elevated transition-all duration-200 text-center"
              >
                <div
                  className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center font-orbitron font-black text-xs"
                  style={{ background: `${color}18`, border: `1px solid ${color}40`, color }}
                >
                  {slug.slice(0, 2).toUpperCase()}
                </div>
                <p className="font-orbitron font-bold text-xs text-white group-hover:transition-colors">{name}</p>
                <p className="text-xs font-mono text-white/25 mt-1">{count} produits</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tailles */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-lg">📐</span>
          <h2 className="font-orbitron font-bold text-xl text-white tracking-wider">Par Taille</h2>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,215,0,0.3), transparent)" }} />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {SIZE_CATEGORIES.map(({ slug, label, dimensions, icon, desc }, i) => (
            <motion.div key={slug} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link href={`/categories/tailles/${slug}`}
                className="group flex flex-col items-center p-4 rounded-xl border border-border bg-surface hover:border-gold/50 hover:bg-elevated transition-all duration-200 text-center"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-orbitron font-black text-xs mb-2"
                  style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)", color: "#ffd700" }}
                >
                  {icon}
                </div>
                <p className="font-orbitron font-bold text-xs text-white">{label}</p>
                <p className="text-xs font-mono text-white/30 mt-0.5">{dimensions}</p>
                <p className="text-xs text-white/20 mt-1">{desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
