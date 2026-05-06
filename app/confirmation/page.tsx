"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight, Loader2, XCircle } from "lucide-react";
import { useOrders } from "@/context/OrderContext";
import { useCart } from "@/context/CartContext";

function ConfirmationContent() {
  const params      = useSearchParams();
  const sessionId   = params.get("session_id");
  const directId    = params.get("id");

  const { createOrder } = useOrders();
  const { clearCart }   = useCart();

  const processed = useRef(false);
  const [orderId,  setOrderId]  = useState(directId ?? "");
  const [loading,  setLoading]  = useState(!!sessionId && !directId);
  const [error,    setError]    = useState("");

  useEffect(() => {
    if (!sessionId || processed.current) return;
    processed.current = true;

    (async () => {
      try {
        const res  = await fetch(`/api/checkout/session?id=${sessionId}`);
        const data = await res.json();

        if (data.error) throw new Error(data.error);
        if (data.status !== "paid") throw new Error("Paiement non confirmé.");

        const raw = localStorage.getItem("pz-pending-order");
        if (raw) {
          const pending = JSON.parse(raw);
          const order   = createOrder(pending);
          setOrderId(order.id);
          localStorage.removeItem("pz-pending-order");
          clearCart();
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur de confirmation.");
      } finally {
        setLoading(false);
      }
    })();
  }, [sessionId, createOrder, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
        <Loader2 size={40} className="animate-spin mb-6" style={{ color: "#00e5ff" }} />
        <p className="font-mono text-sm text-white/40">Confirmation du paiement…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
        <XCircle size={48} className="mb-6" style={{ color: "#ff0066" }} />
        <h1 className="font-orbitron font-black text-2xl text-white mb-3">Paiement non confirmé</h1>
        <p className="text-white/40 font-mono text-sm mb-8">{error}</p>
        <Link href="/panier" className="btn-primary px-8 py-3 rounded-xl text-sm">
          Retour au panier
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="max-w-md w-full"
      >
        <div className="relative mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,255,153,0.08)", border: "1px solid rgba(0,255,153,0.3)" }}>
            <CheckCircle size={44} style={{ color: "#00ff99", filter: "drop-shadow(0 0 12px #00ff99)" }} />
          </div>
          <div className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(0,255,153,0.06), transparent 70%)" }} />
        </div>

        <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#00ff99" }}>
          // Paiement accepté
        </p>
        <h1 className="font-orbitron font-black text-4xl text-white mb-4">
          Merci pour ta commande !
        </h1>
        <p className="text-white/50 font-rajdhani text-lg mb-3">
          Ton tapis est en préparation. Livraison estimée sous 15-30 jours ouvrés. Tu recevras un email de confirmation.
        </p>

        {orderId && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-8"
            style={{ background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.2)" }}>
            <Package size={13} className="text-cyan-DEFAULT" />
            <span className="font-mono text-sm text-white/60">N° commande : </span>
            <span className="font-mono text-sm font-bold text-cyan-DEFAULT">{orderId}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
          <Link href="/categories" className="btn-primary px-8 py-3 rounded-xl text-sm inline-flex items-center justify-center gap-2">
            Continuer mes achats <ArrowRight size={14} />
          </Link>
          <Link href="/" className="btn-ghost px-8 py-3 rounded-xl text-sm">
            Retour à l'accueil
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
