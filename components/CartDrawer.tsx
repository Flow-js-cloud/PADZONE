"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Minus, Plus, Trash2, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const { state, closeDrawer, removeItem, updateQty, total, itemCount } = useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-void/80 backdrop-blur-sm"
            style={{ zIndex: 210 }}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md flex flex-col"
            style={{ zIndex: 220, background: "#0a0a14", borderLeft: "1px solid #1f1f3a" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: "#1f1f3a" }}
            >
              <div className="flex items-center gap-3">
                <ShoppingCart
                  size={20}
                  className="text-cyan-DEFAULT"
                  style={{ filter: "drop-shadow(0 0 6px #00e5ff)" }}
                />
                <h2 className="font-orbitron font-bold text-base text-white">
                  MON PANIER
                </h2>
                {itemCount > 0 && (
                  <span
                    className="px-2 py-0.5 text-xs font-orbitron font-bold rounded-full text-void"
                    style={{ background: "#00e5ff" }}
                  >
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                aria-label="Fermer le panier"
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X size={20} className="text-white/60" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence>
                {state.items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 text-center"
                  >
                    <ShoppingCart size={40} className="text-white/20 mb-4" />
                    <p className="font-orbitron text-sm text-white/50 tracking-wider">
                      TON PANIER EST VIDE
                    </p>
                    <p className="text-white/40 text-sm mt-2 font-rajdhani">
                      Ajoute des tapis épiques à ton setup
                    </p>
                    <Link
                      href="/categories"
                      onClick={closeDrawer}
                      className="mt-6 btn-primary px-6 py-2 text-sm rounded-lg"
                    >
                      Explorer
                    </Link>
                  </motion.div>
                ) : (
                  state.items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-3 p-3 rounded-xl border"
                      style={{ background: "#0d0d1a", borderColor: "#1f1f3a" }}
                    >
                      {/* Product thumbnail */}
                      <div className="relative w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden"
                        style={{ background: item.product.gradient }}>
                        {item.product.images?.[0] && (
                          <Image src={item.product.images[0]} alt={item.product.shortName}
                            fill className="object-cover" sizes="64px" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-rajdhani font-semibold text-sm text-white line-clamp-1">
                          {item.product.shortName}
                        </p>
                        <p className="text-xs font-mono text-white/30 mt-0.5">
                          {item.product.dimensions}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          {/* Qty controls */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQty(item.product.id, item.quantity - 1)}
                              aria-label="Diminuer la quantité"
                              className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-6 text-center text-sm font-mono font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.product.id, item.quantity + 1)}
                              aria-label="Augmenter la quantité"
                              className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          <span className="font-orbitron font-bold text-sm price-badge">
                            {(item.product.price * item.quantity).toFixed(2)}€
                          </span>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        aria-label={`Supprimer ${item.product.shortName} du panier`}
                        className="self-start p-1 text-white/30 hover:text-magenta-DEFAULT transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="px-6 py-4 border-t" style={{ borderColor: "#1f1f3a" }}>
                {/* Shipping notice */}
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4 text-xs font-rajdhani"
                  style={{ background: "rgba(0,255,153,0.08)", border: "1px solid rgba(0,255,153,0.2)", color: "#00ff99" }}
                >
                  <Zap size={12} />
                  {total >= 50
                    ? "Livraison GRATUITE !"
                    : `Plus ${(50 - total).toFixed(2)}€ pour la livraison gratuite`}
                </div>

                {/* Free shipping progress */}
                {total < 50 && (
                  <div className="w-full h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((total / 50) * 100, 100)}%`,
                        background: "linear-gradient(90deg, #00e5ff, #00ff99)",
                      }}
                    />
                  </div>
                )}

                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-rajdhani font-semibold text-white/60 text-base">
                    Sous-total
                  </span>
                  <span className="font-orbitron font-bold text-xl price-badge">
                    {total.toFixed(2)}€
                  </span>
                </div>

                <Link
                  href="/panier"
                  onClick={closeDrawer}
                  className="block w-full text-center btn-primary py-3.5 rounded-xl text-sm mb-2"
                >
                  Commander →
                </Link>
                <button
                  onClick={closeDrawer}
                  className="block w-full text-center py-2 text-sm font-rajdhani text-white/40 hover:text-white/60 transition-colors"
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
