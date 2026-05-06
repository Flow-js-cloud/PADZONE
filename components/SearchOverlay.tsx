"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/customProducts";
import type { Product } from "@/lib/products";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) { setResults([]); return; }
    const all = getAllProducts();
    setResults(
      all.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shortName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q)
      ).slice(0, 8)
    );
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0"
            style={{ zIndex: 300, background: "rgba(2,2,9,0.85)", backdropFilter: "blur(12px)" }}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed left-4 right-4 top-20 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-xl"
            style={{ zIndex: 310 }}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border"
              style={{ background: "#0d0d1a", borderColor: "rgba(0,229,255,0.3)", boxShadow: "0 0 30px rgba(0,229,255,0.1)" }}>
              <Search size={18} className="text-cyan-DEFAULT flex-shrink-0" style={{ filter: "drop-shadow(0 0 6px #00e5ff)" }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Rechercher un tapis, anime, jeu..."
                className="flex-1 bg-transparent outline-none font-rajdhani text-white text-base placeholder:text-white/30"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-white/30 hover:text-white/60 transition-colors">
                  <X size={16} />
                </button>
              )}
              <button onClick={onClose} className="text-white/30 hover:text-white/60 transition-colors ml-1">
                <X size={18} />
              </button>
            </div>

            {/* Results */}
            <AnimatePresence>
              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 rounded-2xl border overflow-hidden"
                  style={{ background: "#0a0a14", borderColor: "#1f1f3a" }}
                >
                  {results.map(p => (
                    <Link key={p.id} href={`/produits/${p.slug}`} onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-border last:border-0">
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden flex-shrink-0"
                        style={{ background: p.gradient }}>
                        {p.images?.[0] && <Image src={p.images[0]} alt={p.shortName} fill className="object-cover" sizes="48px" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-rajdhani font-semibold text-sm text-white line-clamp-1">{p.shortName}</p>
                        <p className="text-xs font-mono text-white/40">{p.subCategory.replace(/-/g, " ")} · {p.dimensions}</p>
                      </div>
                      <span className="font-orbitron font-bold text-sm price-badge flex-shrink-0">{p.price.toFixed(2)}€</span>
                    </Link>
                  ))}
                  {query.trim().length >= 2 && (
                    <Link href={`/categories?q=${encodeURIComponent(query)}`} onClick={onClose}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-mono text-cyan-DEFAULT hover:bg-white/5 transition-colors">
                      <Search size={12} />
                      Voir tous les résultats pour "{query}"
                    </Link>
                  )}
                </motion.div>
              )}
              {query.trim().length >= 2 && results.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="mt-2 px-4 py-6 text-center rounded-2xl border"
                  style={{ background: "#0a0a14", borderColor: "#1f1f3a" }}>
                  <p className="font-mono text-sm text-white/30">Aucun résultat pour "{query}"</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick links when empty */}
            {query.trim().length < 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="mt-2 p-4 rounded-2xl border"
                style={{ background: "#0a0a14", borderColor: "#1f1f3a" }}>
                <p className="font-mono text-xs text-white/30 mb-3 tracking-widest uppercase">Recherches populaires</p>
                <div className="flex flex-wrap gap-2">
                  {["Dragon Ball Z", "Naruto", "Valorant", "RGB LED", "XXL", "One Piece"].map(t => (
                    <button key={t} onClick={() => setQuery(t)}
                      className="px-3 py-1.5 rounded-lg text-xs font-rajdhani font-medium text-white/50 hover:text-white transition-colors"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
