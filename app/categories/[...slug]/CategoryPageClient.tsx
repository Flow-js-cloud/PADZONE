"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, ANIME_CATEGORIES, GAME_CATEGORIES, SIZE_CATEGORIES, BUREAU_CATEGORIES } from "@/lib/products";
import { getAllProducts } from "@/lib/customProducts";
import type { Product } from "@/lib/products";

export function getPageMeta(slug: string[], allProducts: Product[]): { title: string; subtitle: string; color: string; products: Product[] } {
  const [type, sub] = slug;

  if (type === "rgb" && sub) {
    const labels: Record<string, string> = { "rgb-anime": "RGB Anime", "rgb-jeux": "RGB Jeux Vidéo", "rgb-fulldesk": "RGB Full Desk" };
    return { title: `Tapis ${labels[sub] ?? sub}`, subtitle: "LED 16.8M couleurs — Illumine ton setup", color: "#00e5ff", products: allProducts.filter(p => p.subCategory === sub) };
  }
  if (type === "rgb" || type === "rgb-gaming") {
    return { title: "Tapis RGB Gaming", subtitle: "LED 16.8M couleurs — Illumine ton setup", color: "#00e5ff", products: allProducts.filter(p => p.category === "rgb") };
  }
  if (type === "anime" && sub) {
    const cat = ANIME_CATEGORIES.find(c => c.slug === sub);
    return { title: `Tapis Gaming ${cat?.name ?? sub}`, subtitle: `Collection ${cat?.name ?? sub} — Designs exclusifs`, color: cat?.color ?? "#ff0066", products: allProducts.filter(p => p.subCategory === sub) };
  }
  if (type === "anime") {
    return { title: "Tapis Gaming Anime", subtitle: "Dragon Ball Z, Naruto, One Piece, Demon Slayer…", color: "#ff0066", products: allProducts.filter(p => p.category === "anime") };
  }
  if (type === "jeux" && sub) {
    const cat = GAME_CATEGORIES.find(c => c.slug === sub);
    return { title: `Tapis Gaming ${cat?.name ?? sub}`, subtitle: `Collection ${cat?.name ?? sub} — Designs officiels`, color: cat?.color ?? "#00ff99", products: allProducts.filter(p => p.subCategory === sub) };
  }
  if (type === "jeux") {
    return { title: "Tapis Gaming Jeux Vidéo", subtitle: "Valorant, League of Legends, CS2, Fortnite…", color: "#00ff99", products: allProducts.filter(p => p.category === "jeux") };
  }
  if (type === "tailles" && sub) {
    const size = SIZE_CATEGORIES.find(s => s.slug === sub);
    return { title: `Tapis ${size?.label ?? sub.toUpperCase()}`, subtitle: size ? `Format ${size.dimensions} — ${size.desc}` : "", color: "#ffd700", products: allProducts.filter(p => p.size === sub.toUpperCase()) };
  }
  if (type === "tailles") {
    return { title: "Tapis par Taille", subtitle: "S · M · L · XL · XXL · XXXL Full Desk", color: "#ffd700", products: allProducts };
  }
  if (type === "bureautique" && sub) {
    const cat = BUREAU_CATEGORIES.find(c => c.slug === sub);
    return { title: `Tapis Bureautique ${cat?.name ?? sub}`, subtitle: `Collection ${cat?.name ?? sub} — Pour votre espace de travail`, color: cat?.color ?? "#ffffff", products: allProducts.filter(p => p.subCategory === sub) };
  }
  if (type === "bureautique") {
    return { title: "Tapis Bureautique", subtitle: "Minimaliste, cuir, nature, marbre — pour votre bureau", color: "#c9b8f5", products: allProducts.filter(p => p.category === "bureautique") };
  }
  if (type === "best-sellers") {
    return { title: "Best-Sellers", subtitle: "Les plus populaires du moment", color: "#ff0066", products: allProducts.filter(p => p.isBestSeller) };
  }
  if (type === "nouveautes") {
    return { title: "Nouveautés", subtitle: "Les derniers arrivages", color: "#00e5ff", products: allProducts.filter(p => p.isNew) };
  }
  if (type === "promo") {
    return { title: "Promotions", subtitle: "Jusqu'à -30% sur une sélection", color: "#00ff99", products: allProducts.filter(p => p.originalPrice) };
  }
  return { title: "Tous les Produits", subtitle: "Toute la collection PadZone", color: "#00e5ff", products: allProducts };
}

const SORT_OPTIONS = [
  { label: "Popularité",      value: "popular"    },
  { label: "Prix croissant",  value: "price-asc"  },
  { label: "Prix décroissant",value: "price-desc" },
  { label: "Nouveautés",      value: "new"        },
  { label: "Meilleures notes",value: "rating"     },
];

export function CategoryPageClient({ slug }: { slug: string[] }) {
  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS);
  useEffect(() => { setAllProducts(getAllProducts()); }, []);
  const meta = getPageMeta(slug, allProducts);
  const [sort, setSort] = useState("popular");
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);

  const PRICE_RANGES: { label: string; value: string; min: number; max: number }[] = [
    { label: "< 15€",    value: "lt15",  min: 0,  max: 14.99 },
    { label: "15 – 25€", value: "15-25", min: 15, max: 24.99 },
    { label: "25 – 40€", value: "25-40", min: 25, max: 39.99 },
    { label: "> 40€",    value: "gt40",  min: 40, max: Infinity },
  ];

  let products = [...meta.products];
  if (sizeFilter) products = products.filter(p => p.size === sizeFilter);
  if (priceRange) {
    const range = PRICE_RANGES.find(r => r.value === priceRange);
    if (range) products = products.filter(p => p.price >= range.min && p.price <= range.max);
  }
  if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
  if (sort === "rating") products.sort((a, b) => b.rating - a.rating);
  if (sort === "new") products = products.filter(p => p.isNew).concat(products.filter(p => !p.isNew));

  const SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="relative py-16 mb-12 overflow-hidden" style={{ background: "linear-gradient(180deg, #07070f, #020209)" }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 100% at 50% 0%, ${meta.color}12, transparent)` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-xs font-mono text-white/30 mb-6">
            <Link href="/" className="hover:text-white/60">Accueil</Link>
            <ChevronRight size={12} />
            <Link href="/categories" className="hover:text-white/60">Catégories</Link>
            {slug.map((s, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight size={12} />
                <span className="text-white/60 capitalize">{s.replace(/-/g, " ")}</span>
              </span>
            ))}
          </nav>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3">
            {meta.title}
          </motion.h1>
          <p className="text-white/40 font-rajdhani text-base">{meta.subtitle}</p>
          <div className="mt-4 h-0.5 w-24" style={{ background: `linear-gradient(90deg, ${meta.color}, transparent)` }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 mb-8 p-4 rounded-xl border border-border bg-surface">
          {/* Size filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Filter size={13} className="text-white/30" />
              <span className="text-xs font-mono text-white/30 w-14">TAILLE</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SIZES.map(s => (
                <button key={s} onClick={() => setSizeFilter(sizeFilter === s ? null : s)}
                  className="px-2.5 py-1 rounded text-xs font-orbitron font-bold transition-all duration-150 border"
                  style={{ background: sizeFilter === s ? meta.color : "transparent", borderColor: sizeFilter === s ? meta.color : "#1f1f3a", color: sizeFilter === s ? "#020209" : "#ffffff60" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Price filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <SlidersHorizontal size={13} className="text-white/30" />
              <span className="text-xs font-mono text-white/30 w-14">PRIX</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PRICE_RANGES.map(r => (
                <button key={r.value} onClick={() => setPriceRange(priceRange === r.value ? null : r.value)}
                  className="px-2.5 py-1 rounded text-xs font-mono font-bold transition-all duration-150 border"
                  style={{ background: priceRange === r.value ? meta.color : "transparent", borderColor: priceRange === r.value ? meta.color : "#1f1f3a", color: priceRange === r.value ? "#020209" : "#ffffff60" }}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Sort + count */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-white/30 w-14 flex-shrink-0">TRI</span>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="flex-1 bg-surface border border-border rounded px-3 py-1.5 text-xs font-mono text-white/60 outline-none focus:border-cyan-DEFAULT/50">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <span className="text-xs font-mono text-white/30 flex-shrink-0">{products.length} produit{products.length > 1 ? "s" : ""}</span>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-orbitron text-white/20 text-lg">Aucun produit trouvé</p>
            <Link href="/categories" className="mt-6 inline-block btn-ghost px-6 py-2 text-sm rounded-lg">Voir tout le catalogue</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
