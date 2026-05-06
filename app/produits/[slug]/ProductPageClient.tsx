"use client";

import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star, ChevronRight, Zap, Shield, Truck, RotateCcw, Check, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { PRODUCTS } from "@/lib/products";
import { getAllProducts } from "@/lib/customProducts";
import { REVIEWS, type Review } from "@/lib/reviews";
import { getUserReviews } from "@/lib/userReviews";
import { ReviewForm } from "@/components/ReviewForm";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";

export function ProductPageClient({ slug }: { slug: string }) {
  const [allProducts, setAllProducts] = useState(PRODUCTS);
  useEffect(() => { setAllProducts(getAllProducts()); }, []);
  const product = allProducts.find(p => p.slug === slug);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  useEffect(() => {
    if (product) setUserReviews(getUserReviews(product.id));
  }, [product?.id]);

  // Social proof: simulated live viewers count
  const [viewers, setViewers] = useState(() => Math.floor(Math.random() * 12) + 4);
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(v => Math.max(3, v + (Math.random() > 0.5 ? 1 : -1)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center">
        <p className="font-orbitron text-white/30 text-xl mb-6">Produit introuvable</p>
        <Link href="/categories" className="btn-primary px-8 py-3 rounded-xl text-sm">
          Voir le catalogue
        </Link>
      </div>
    );
  }

  const staticRevs = REVIEWS[product.id] ?? [];
  const allRevs    = [...userReviews, ...staticRevs];
  const avgRating  = allRevs.length
    ? Math.round((allRevs.reduce((s, r) => s + r.rating, 0) / allRevs.length) * 10) / 10
    : null;

  const related = allProducts.filter(p => p.subCategory === product.subCategory && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const wished = product ? has(product.id) : false;

  return (
    <div className="min-h-screen pt-24 pb-28 lg:pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="flex items-center gap-2 text-xs font-mono text-white/30">
          <Link href="/" className="hover:text-white/60">Accueil</Link>
          <ChevronRight size={12} />
          <Link href="/categories" className="hover:text-white/60">Catégories</Link>
          <ChevronRight size={12} />
          <Link href={`/categories/${product.category}`} className="hover:text-white/60 capitalize">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-white/60 truncate max-w-[200px]">{product.shortName}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 mb-20">
          {/* Product visual */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div
              className="relative rounded-2xl overflow-hidden aspect-video"
              style={{
                background: product.gradient,
                border: product.isRGB ? undefined : "1px solid #1f1f3a",
                animation: product.isRGB ? "rgb-border 4s linear infinite" : undefined,
              }}
            >
              {product.images?.[activeImg] && (
                <Image src={product.images[activeImg]} alt={product.shortName} fill className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw" priority />
              )}
              <div className="absolute inset-0 bg-void/20" />
              <div className="absolute top-5 left-5 flex flex-col gap-2">
                {product.badge && (
                  <span className="px-3 py-1 text-xs font-orbitron font-bold rounded"
                    style={{ background: "#ff0066", color: "#fff", boxShadow: "0 0 15px rgba(255,0,102,0.5)" }}>
                    {product.badge}
                  </span>
                )}
                {discount && (
                  <span className="px-3 py-1 text-xs font-orbitron font-bold rounded bg-neon-green/20 text-neon-green border border-neon-green/30">
                    -{discount}%
                  </span>
                )}
              </div>
              <div className="absolute bottom-5 right-5 px-3 py-1 rounded-lg font-orbitron font-bold text-sm bg-void/70 text-white border border-white/10">
                {product.size} · {product.dimensions}
              </div>
              {product.isRGB && (
                <div className="absolute top-5 right-5">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-void/70">
                    <Zap size={14} className="animate-rgb-spin text-cyan-DEFAULT" />
                    <span className="text-xs font-mono text-cyan-DEFAULT">RGB LED</span>
                  </div>
                </div>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    aria-label={`Vue ${i + 1} de ${product.shortName}`}
                    aria-pressed={activeImg === i}
                    className="relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-150"
                    style={{ borderColor: activeImg === i ? "#00e5ff" : "#1f1f3a", boxShadow: activeImg === i ? "0 0 10px rgba(0,229,255,0.4)" : "none" }}>
                    <Image src={img} alt={`Vue ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              {product.features.map(f => (
                <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-white/50 border border-border bg-surface">
                  <Check size={10} className="text-neon-green" />
                  {f}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col gap-6">
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: product.accentColor }}>
              {product.category} · {product.subCategory.replace(/-/g, " ")}
            </span>
            <h1 className="font-orbitron font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              {avgRating !== null ? (
                <>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < Math.floor(avgRating) ? "fill-gold text-gold" : "text-white/20"} />
                    ))}
                  </div>
                  <span className="font-mono text-sm text-white/50">{avgRating} — {allRevs.length} avis</span>
                </>
              ) : (
                <span className="font-mono text-sm text-white/30">Pas encore d'avis</span>
              )}
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-orbitron font-black text-4xl price-badge">{product.price.toFixed(2)}€</span>
              {product.originalPrice && (
                <span className="text-lg text-white/30 line-through font-mono">{product.originalPrice.toFixed(2)}€</span>
              )}
              {discount && (
                <span className="px-2 py-0.5 text-sm font-orbitron font-bold rounded bg-neon-green/15 text-neon-green">
                  Économise {(product.originalPrice! - product.price).toFixed(2)}€
                </span>
              )}
            </div>
            <p className="text-white/70 font-rajdhani text-base leading-relaxed">{product.description}</p>
            <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl border"
              style={{ background: "rgba(0,229,255,0.04)", borderColor: "rgba(0,229,255,0.15)" }}>
              <div className="text-center">
                <p className="font-orbitron font-bold text-lg text-cyan-DEFAULT">{product.size}</p>
                <p className="text-xs font-mono text-white/30">Format</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="font-orbitron font-bold text-base text-white">{product.dimensions}</p>
                <p className="text-xs font-mono text-white/30">Dimensions</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="font-orbitron font-bold text-base text-white">3–5mm</p>
                <p className="text-xs font-mono text-white/30">Épaisseur</p>
              </div>
            </div>
            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[9px] font-bold"
                    style={{ borderColor: "#020209", background: ["#00e5ff20","#ff006620","#00ff9920"][i], color: ["#00e5ff","#ff0066","#00ff99"][i] }}>
                    {["G","K","A"][i]}
                  </div>
                ))}
              </div>
              <motion.p
                key={viewers}
                initial={{ opacity: 0.6 }} animate={{ opacity: 1 }}
                className="text-xs font-mono text-white/50"
              >
                <span className="text-neon-green font-bold">{viewers} personnes</span> regardent ce produit
              </motion.p>
            </div>

            {product.stock === 0 ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-orbitron font-bold tracking-wider"
                style={{ background: "rgba(239,68,68,0.08)", borderLeft: "3px solid #ef4444", color: "#ef4444" }}>
                HORS STOCK — Ce produit n'est plus disponible
              </div>
            ) : product.stock <= 15 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-rajdhani"
                style={{ background: "rgba(255,0,102,0.08)", borderLeft: "3px solid #ff0066", color: "#ff0066" }}>
                ⚠️ Seulement {product.stock} exemplaires en stock !
              </div>
            )}
            <motion.button
              onClick={product.stock > 0 ? handleAddToCart : undefined}
              whileTap={product.stock > 0 ? { scale: 0.97 } : undefined}
              disabled={product.stock === 0}
              className="relative overflow-hidden w-full py-4 rounded-xl font-orbitron font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-300"
              style={product.stock === 0 ? {
                background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.08)", cursor: "not-allowed",
              } : {
                background: added ? "linear-gradient(135deg, #00ff99, #00cc77)" : "linear-gradient(135deg, #00e5ff, #0088aa)",
                color: "#020209",
                boxShadow: added ? "0 0 30px rgba(0,255,153,0.4)" : "0 0 30px rgba(0,229,255,0.3)",
              }}
            >
              {product.stock === 0 ? (
                <><ShoppingCart size={18} />Indisponible</>
              ) : added ? (
                <><Check size={18} />Ajouté au panier !</>
              ) : (
                <><ShoppingCart size={18} />Ajouter au panier — {product.price.toFixed(2)}€</>
              )}
            </motion.button>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Shield, text: "Paiement sécurisé" },
                { icon: Truck, text: "Livraison 15-30j" },
                { icon: RotateCcw, text: "Retour 30j" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1 p-2 sm:p-3 rounded-lg border border-border bg-surface text-center">
                  <Icon size={13} className="text-white/30" />
                  <p className="text-[10px] sm:text-xs font-mono text-white/30 leading-tight">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Avis clients */}
        <section className="mb-16">
          <div className="flex items-end gap-4 mb-8">
            <h2 className="font-orbitron font-black text-2xl text-white">
              Avis <span className="text-gradient-cyan">Clients</span>
            </h2>
            {avgRating !== null && (
              <div className="flex items-center gap-2 mb-0.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.round(avgRating) ? "fill-gold text-gold" : "text-white/20"} />
                  ))}
                </div>
                <span className="font-mono text-sm text-white/50">{avgRating} · {allRevs.length} avis</span>
              </div>
            )}
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              {allRevs.length === 0 && (
                <p className="text-sm font-mono text-white/30 py-6">Aucun avis pour l'instant. Sois le premier !</p>
              )}
              {allRevs.map((review, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="p-5 rounded-xl border border-border bg-surface">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-sm text-white">{review.name}</p>
                      <p className="text-xs font-mono text-white/30 mt-0.5">{review.date}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} size={12} className={s < review.rating ? "fill-gold text-gold" : "text-white/20"} />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                          style={{ background: "rgba(0,255,153,0.08)", color: "#00ff99", border: "1px solid rgba(0,255,153,0.2)" }}>
                          ✓ Achat vérifié
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-white/60 font-rajdhani leading-relaxed">{review.text}</p>
                </motion.div>
              ))}
            </div>
            <div className="p-6 rounded-xl border border-border bg-surface h-fit">
              <p className="font-orbitron font-bold text-base text-white mb-5">Laisser un avis</p>
              <ReviewForm productId={product.id} onSubmitted={r => setUserReviews(prev => [r, ...prev])} />
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section>
            <h2 className="font-orbitron font-black text-2xl text-white mb-8">
              Produits <span className="text-gradient-cyan">Similaires</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>

      {/* Sticky CTA — mobile only, via portal pour éviter le bug iOS fixed */}
      {typeof window !== "undefined" && createPortal(
        <div
          className="lg:hidden"
          style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            zIndex: 9998, background: "#0a0a14",
            borderTop: "1px solid #1f1f3a",
            padding: "12px 16px",
            display: "flex", alignItems: "center", gap: "12px",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="font-rajdhani font-semibold text-sm text-white line-clamp-1">{product.shortName}</p>
            <p className="font-orbitron font-bold text-base price-badge">{product.price.toFixed(2)}€</p>
          </div>
          <button
            onClick={() => toggle(product.id)}
            aria-label={wished ? "Retirer des favoris" : "Ajouter aux favoris"}
            style={{
              flexShrink: 0, width: 44, height: 44, borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: wished ? "rgba(255,0,102,0.1)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${wished ? "rgba(255,0,102,0.4)" : "rgba(255,255,255,0.1)"}`,
            }}
          >
            <Heart size={18} style={{ color: wished ? "#ff0066" : "rgba(255,255,255,0.5)", fill: wished ? "#ff0066" : "none" }} />
          </button>
          <motion.button
            onClick={product.stock > 0 ? handleAddToCart : undefined}
            disabled={product.stock === 0}
            whileTap={product.stock > 0 ? { scale: 0.97 } : undefined}
            style={{
              flexShrink: 0, display: "flex", alignItems: "center", gap: 8,
              padding: "12px 20px", borderRadius: 12,
              fontFamily: "var(--font-orbitron)", fontWeight: 700,
              fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
              ...(product.stock === 0 ? {
                background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.08)", cursor: "not-allowed",
              } : {
                background: added ? "linear-gradient(135deg, #00ff99, #00cc77)" : "linear-gradient(135deg, #00e5ff, #0088aa)",
                color: "#020209",
                boxShadow: added ? "0 0 20px rgba(0,255,153,0.4)" : "0 0 20px rgba(0,229,255,0.3)",
              }),
            }}
          >
            {product.stock === 0 ? <><ShoppingCart size={15} />Indispo</>
              : added ? <><Check size={15} />Ajouté !</>
              : <><ShoppingCart size={15} />Ajouter</>}
          </motion.button>
        </div>,
        document.body
      )}
    </div>
  );
}
