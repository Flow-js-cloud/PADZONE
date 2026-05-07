"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star, Zap, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const wished = has(product.id);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const delayMs = index * 60;

  return (
    <div
      className="group relative animate-fade-up"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div
        className={`relative rounded-xl overflow-hidden border border-border bg-surface transition-all duration-300 group-hover:border-cyan-DEFAULT/50 group-hover:-translate-y-1 ${
          product.isRGB ? "animate-rgb-border" : ""
        }`}
        style={
          product.isRGB
            ? { animation: "rgb-border 4s linear infinite" }
            : undefined
        }
      >
        {/* Product image area */}
        <Link href={`/produits/${product.slug}`}>
          <div
            className="relative h-48 overflow-hidden"
            style={{ background: product.gradient, opacity: product.stock === 0 ? 0.6 : 1 }}
          >
            {/* Real photo if available */}
            {product.images?.[0] && (
              <Image
                src={product.images[0]}
                alt={product.shortName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-void/20" />

            {/* Hors stock overlay */}
            {product.stock === 0 && (
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(2,2,9,0.55)", backdropFilter: "blur(2px)" }}>
                <span className="font-orbitron font-black text-sm tracking-widest px-4 py-2 rounded-lg"
                  style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.5)", color: "#ef4444" }}>
                  HORS STOCK
                </span>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badge && (
                <span
                  className="px-2.5 py-0.5 text-xs font-orbitron font-bold tracking-wider rounded"
                  style={{
                    background: product.isRGB
                      ? "linear-gradient(90deg, #ff0066, #00e5ff)"
                      : "linear-gradient(135deg, #ff0066, #cc0044)",
                    color: "#fff",
                    boxShadow: "0 0 10px rgba(255,0,102,0.5)",
                  }}
                >
                  {product.badge}
                </span>
              )}
              {product.isNew && !product.badge && (
                <span className="px-2.5 py-0.5 text-xs font-orbitron font-bold tracking-wider rounded bg-cyan-DEFAULT/20 text-cyan-DEFAULT border border-cyan-DEFAULT/30">
                  NOUVEAU
                </span>
              )}
              {discount && (
                <span className="px-2.5 py-0.5 text-xs font-orbitron font-bold rounded bg-neon-green/20 text-neon-green border border-neon-green/30">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Wishlist + RGB icons */}
            <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
              <button
                onClick={(e) => { e.preventDefault(); toggle(product.id); }}
                aria-label={wished ? "Retirer des favoris" : "Ajouter aux favoris"}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: wished ? "rgba(255,0,102,0.15)" : "rgba(2,2,9,0.6)",
                  border: `1px solid ${wished ? "rgba(255,0,102,0.5)" : "rgba(255,255,255,0.1)"}`,
                  backdropFilter: "blur(8px)",
                }}
              >
                <Heart
                  size={13}
                  className="transition-all duration-200"
                  style={{ color: wished ? "#ff0066" : "rgba(255,255,255,0.5)", fill: wished ? "#ff0066" : "none" }}
                />
              </button>
              {product.isRGB && (
                <Zap
                  size={18}
                  className="animate-rgb-spin"
                  style={{ color: "#00e5ff", filter: "drop-shadow(0 0 6px #00e5ff)" }}
                />
              )}
            </div>

            {/* Size tag */}
            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded font-orbitron text-xs font-bold bg-void/70 text-white/80 border border-white/10">
              {product.size}
            </div>

            {/* Quick add overlay — masqué si hors stock */}
            {product.stock > 0 && (
              <div className="absolute inset-0 flex items-end justify-center pb-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-full px-3">
                  <button
                    onClick={(e) => { e.preventDefault(); addItem(product); }}
                    className="w-full py-2 flex items-center justify-center gap-2 font-orbitron font-bold text-xs tracking-wider uppercase rounded-lg transition-all"
                    style={{
                      background: "rgba(0,229,255,0.9)",
                      color: "#020209",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <ShoppingCart size={14} />
                    Ajouter au panier
                  </button>
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Product info */}
        <div className="p-4">
          {/* Category badge */}
          <div className="flex items-center justify-between gap-1 mb-2">
            <span
              className="text-[10px] font-mono tracking-wider uppercase truncate"
              style={{ color: product.accentColor, opacity: 0.8 }}
            >
              {product.subCategory.replace(/-/g, " ")}
            </span>
            <span className="text-[10px] text-white/30 font-mono flex-shrink-0">{product.dimensions}</span>
          </div>

          {/* Name */}
          <Link href={`/produits/${product.slug}`}>
            <h3 className="font-rajdhani font-semibold text-white text-base leading-snug hover:text-cyan-DEFAULT transition-colors line-clamp-2 mb-3">
              {product.shortName}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-white/20"}
                />
              ))}
            </div>
            <span className="text-xs text-white/40 font-mono">
              {product.rating} ({product.reviews.toLocaleString("fr-FR")})
            </span>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-orbitron font-bold text-lg price-badge" style={{ opacity: product.stock === 0 ? 0.4 : 1 }}>
                {product.price.toFixed(2)}€
              </span>
              {product.originalPrice && (
                <span className="text-xs text-white/30 line-through font-mono">
                  {product.originalPrice.toFixed(2)}€
                </span>
              )}
            </div>
            {product.stock === 0 ? (
              <span className="text-xs font-orbitron font-bold px-2 py-1 rounded-lg"
                style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}>
                HORS STOCK
              </span>
            ) : (
              <button
                onClick={() => addItem(product)}
                aria-label={`Ajouter ${product.shortName} au panier`}
                className="p-2 rounded-lg border border-cyan-DEFAULT/30 text-cyan-DEFAULT hover:bg-cyan-DEFAULT/10 hover:border-cyan-DEFAULT transition-all duration-200 group/btn"
              >
                <ShoppingCart size={16} className="group-hover/btn:scale-110 transition-transform" />
              </button>
            )}
          </div>

          {/* Stock warning */}
          {product.stock > 0 && product.stock <= 15 && (
            <p className="mt-2 text-xs font-mono text-magenta-DEFAULT/70">
              ⚠ Plus que {product.stock} en stock
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
