"use client";

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, Shield, Truck, Tag, Check, X, User, MapPin, Loader2, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const PROMO_CODES: Record<string, { discount: number; label: string }> = {
  "PADZONE10": { discount: 0.10, label: "-10%" },
  "WELCOME15": { discount: 0.15, label: "-15%" },
  "GAMING20":  { discount: 0.20, label: "-20%" },
  "FIRSTORDER": { discount: 0.10, label: "-10% première commande" },
};

interface ShippingForm {
  prenom: string;
  nom: string;
  email: string;
  adresse: string;
  complement: string;
  codePostal: string;
  ville: string;
  pays: string;
}

export default function PanierPage() {
  const { state, removeItem, updateQty, clearCart, total, itemCount } = useCart();
  const { user, updateUser } = useAuth();

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; label: string } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<ShippingForm>({
    prenom: "", nom: "", email: "", adresse: "",
    complement: "", codePostal: "", ville: "", pays: "France",
  });

  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        prenom: user.name ?? "",
        email: user.email ?? "",
        adresse: user.adresse ?? "",
        complement: user.complement ?? "",
        codePostal: user.codePostal ?? "",
        ville: user.ville ?? "",
        pays: user.pays ?? "France",
      }));
    }
  }, [user]);

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, ...PROMO_CODES[code] });
      setPromoError("");
    } else {
      setPromoError("Code promo invalide ou expiré.");
      setAppliedPromo(null);
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoInput("");
    setPromoError("");
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <ShoppingCart size={64} className="text-white/10 mx-auto mb-6" />
          <h1 className="font-orbitron font-black text-3xl text-white mb-4">Panier Vide</h1>
          <p className="text-white/40 font-rajdhani mb-8">Tu n'as pas encore ajouté de tapis gaming.</p>
          <Link href="/categories" className="btn-primary px-8 py-3 rounded-xl text-sm inline-flex items-center gap-2">
            Explorer le Catalogue <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    );
  }

  const shipping = total >= 50 ? 0 : 5.99;
  const promoAmount = appliedPromo ? total * appliedPromo.discount : 0;
  const totalFinal = total - promoAmount + shipping;

  const validateForm = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!form.prenom.trim()) e.prenom = "Prénom requis";
    else if (form.prenom.trim().length < 2) e.prenom = "Minimum 2 caractères";

    if (!form.nom.trim()) e.nom = "Nom requis";
    else if (form.nom.trim().length < 2) e.nom = "Minimum 2 caractères";

    if (!form.email.trim()) e.email = "Email requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Format invalide (ex : jean@gmail.com)";

    if (!form.adresse.trim()) e.adresse = "Adresse requise";
    else if (form.adresse.trim().length < 5) e.adresse = "Adresse trop courte";

    if (!form.codePostal.trim()) e.codePostal = "Code postal requis";
    else if (form.pays === "France" && !/^\d{5}$/.test(form.codePostal.trim())) e.codePostal = "5 chiffres requis (ex : 75001)";
    else if (form.pays === "Belgique" && !/^\d{4}$/.test(form.codePostal.trim())) e.codePostal = "4 chiffres requis (ex : 1000)";
    else if (form.pays === "Suisse" && !/^\d{4}$/.test(form.codePostal.trim())) e.codePostal = "4 chiffres requis (ex : 1200)";
    else if (form.pays === "Canada" && !/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(form.codePostal.trim())) e.codePostal = "Format invalide (ex : H1A 1A1)";

    if (!form.ville.trim()) e.ville = "Ville requise";
    else if (form.ville.trim().length < 2) e.ville = "Nom de ville invalide";

    return e;
  };

  const handleCommander = async () => {
    setCheckoutError("");

    const errors = validateForm();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      document.getElementById("shipping-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setFieldErrors({});

    if (user) {
      updateUser({
        adresse: form.adresse,
        complement: form.complement,
        codePostal: form.codePostal,
        ville: form.ville,
        pays: form.pays,
      });
    }

    const customer = form;

    localStorage.setItem("pz-pending-order", JSON.stringify({
      customer,
      items: state.items,
      subtotal: total,
      promoCode: appliedPromo?.code,
      discount: promoAmount,
      shipping,
      total: totalFinal,
    }));

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-PadZone-Request": "1" },
        body: JSON.stringify({
          items: state.items,
          shipping,
          customerEmail: user?.email ?? form.email,
          promoCode: appliedPromo?.code,
          discountRate: appliedPromo?.discount ?? 0,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err) {
      setLoading(false);
      localStorage.removeItem("pz-pending-order");
      setCheckoutError(err instanceof Error ? err.message : "Erreur lors du paiement.");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Checkout progress steps */}
      <div className="mb-10">
        <div className="flex items-center justify-center gap-0 mb-6">
          {[
            { step: 1, label: "Panier", active: true, done: false },
            { step: 2, label: "Livraison", active: false, done: false },
            { step: 3, label: "Paiement", active: false, done: false },
            { step: 4, label: "Confirmation", active: false, done: false },
          ].map(({ step, label, active, done }, i, arr) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-orbitron font-bold text-xs transition-all"
                  style={{
                    background: active ? "#00e5ff" : done ? "rgba(0,229,255,0.2)" : "rgba(255,255,255,0.05)",
                    color: active ? "#020209" : done ? "#00e5ff" : "rgba(255,255,255,0.3)",
                    border: active ? "none" : done ? "1px solid rgba(0,229,255,0.4)" : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: active ? "0 0 16px rgba(0,229,255,0.4)" : "none",
                  }}>
                  {done ? <Check size={14} /> : step}
                </div>
                <span className="text-[10px] font-mono whitespace-nowrap"
                  style={{ color: active ? "#00e5ff" : "rgba(255,255,255,0.3)" }}>
                  {label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className="w-12 sm:w-20 h-px mx-1 mb-4"
                  style={{ background: done ? "#00e5ff" : "rgba(255,255,255,0.1)" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-orbitron font-black text-2xl sm:text-3xl md:text-4xl text-white mb-2">
          Mon <span className="text-gradient-cyan">Panier</span>
        </h1>
        <p className="text-white/40 font-mono text-sm">{itemCount} article{itemCount > 1 ? "s" : ""}</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
        {/* Gauche — produits + coordonnées */}
        <div className="lg:col-span-2 space-y-6">

          {/* Articles */}
          <div className="space-y-4">
            {state.items.map((item, i) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-3 p-3 sm:gap-4 sm:p-5 rounded-xl border border-border bg-surface"
              >
                <div className="w-16 h-14 sm:w-24 sm:h-16 rounded-xl flex-shrink-0" style={{ background: item.product.gradient }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-rajdhani font-semibold text-white text-base leading-snug line-clamp-2">{item.product.name}</h3>
                    <button onClick={() => removeItem(item.product.id)}
                      aria-label="Supprimer"
                      className="flex-shrink-0 p-1 text-white/20 hover:text-magenta-DEFAULT transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <p className="text-xs font-mono text-white/30 mb-3">{item.product.size} · {item.product.dimensions}</p>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.product.id, item.quantity - 1)}
                        aria-label="Diminuer"
                        className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-white/5 transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center font-orbitron font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => updateQty(item.product.id, item.quantity + 1)}
                        aria-label="Augmenter"
                        className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-white/5 transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-orbitron font-bold text-base price-badge flex-shrink-0">
                      {(item.product.price * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            <button onClick={clearCart} className="text-xs font-mono text-white/20 hover:text-white/40 transition-colors">
              Vider le panier
            </button>
          </div>

          {/* Coordonnées de livraison */}
          <motion.div
            id="shipping-form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 sm:p-6 rounded-xl border border-border bg-surface"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)" }}>
                <MapPin size={15} className="text-cyan-DEFAULT" />
              </div>
              <div>
                <h2 className="font-orbitron font-bold text-base text-white">Adresse de livraison</h2>
                {user ? (
                  <p className="text-xs font-mono text-white/30 mt-0.5 flex items-center gap-1">
                    <User size={10} className="text-cyan-DEFAULT" />
                    <span className="text-cyan-DEFAULT/70">{user.email}</span>
                    {user.adresse && <span className="text-white/20"> · adresse pré-remplie</span>}
                  </p>
                ) : (
                  <p className="text-xs font-mono text-white/30 mt-0.5">
                    Ou{" "}
                    <Link href="/connexion" className="text-cyan-DEFAULT hover:underline">connecte-toi</Link>
                    {" "}pour pré-remplir ton adresse
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

              {/* Prénom */}
              <div>
                <label className="block text-xs font-mono text-white/40 mb-1.5 uppercase tracking-wider">Prénom *</label>
                <input type="text" value={form.prenom} placeholder="Jean"
                  onChange={e => { setForm(f => ({ ...f, prenom: e.target.value })); setFieldErrors(p => ({ ...p, prenom: "" })); }}
                  className="w-full px-4 py-2.5 rounded-lg bg-void border outline-none text-white font-rajdhani text-sm placeholder:text-white/20 transition-colors"
                  style={{ borderColor: fieldErrors.prenom ? "#ff0066" : "rgba(255,255,255,0.08)" }} />
                {fieldErrors.prenom && <p className="mt-1 text-xs font-mono" style={{ color: "#ff0066" }}>{fieldErrors.prenom}</p>}
              </div>

              {/* Nom */}
              <div>
                <label className="block text-xs font-mono text-white/40 mb-1.5 uppercase tracking-wider">Nom *</label>
                <input type="text" value={form.nom} placeholder="Dupont"
                  onChange={e => { setForm(f => ({ ...f, nom: e.target.value })); setFieldErrors(p => ({ ...p, nom: "" })); }}
                  className="w-full px-4 py-2.5 rounded-lg bg-void border outline-none text-white font-rajdhani text-sm placeholder:text-white/20 transition-colors"
                  style={{ borderColor: fieldErrors.nom ? "#ff0066" : "rgba(255,255,255,0.08)" }} />
                {fieldErrors.nom && <p className="mt-1 text-xs font-mono" style={{ color: "#ff0066" }}>{fieldErrors.nom}</p>}
              </div>

              {/* Email */}
              <div className="col-span-2">
                <label className="block text-xs font-mono text-white/40 mb-1.5 uppercase tracking-wider">Email *</label>
                <input type="email" value={form.email} placeholder="jean@exemple.com"
                  onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setFieldErrors(p => ({ ...p, email: "" })); }}
                  className="w-full px-4 py-2.5 rounded-lg bg-void border outline-none text-white font-rajdhani text-sm placeholder:text-white/20 transition-colors"
                  style={{ borderColor: fieldErrors.email ? "#ff0066" : "rgba(255,255,255,0.08)" }} />
                {fieldErrors.email && <p className="mt-1 text-xs font-mono" style={{ color: "#ff0066" }}>{fieldErrors.email}</p>}
              </div>

              {/* Adresse */}
              <div className="col-span-2">
                <label className="block text-xs font-mono text-white/40 mb-1.5 uppercase tracking-wider">Adresse *</label>
                <input type="text" value={form.adresse} placeholder="12 rue de la Paix"
                  onChange={e => { setForm(f => ({ ...f, adresse: e.target.value })); setFieldErrors(p => ({ ...p, adresse: "" })); }}
                  className="w-full px-4 py-2.5 rounded-lg bg-void border outline-none text-white font-rajdhani text-sm placeholder:text-white/20 transition-colors"
                  style={{ borderColor: fieldErrors.adresse ? "#ff0066" : "rgba(255,255,255,0.08)" }} />
                {fieldErrors.adresse && <p className="mt-1 text-xs font-mono" style={{ color: "#ff0066" }}>{fieldErrors.adresse}</p>}
              </div>

              {/* Complément */}
              <div className="col-span-2">
                <label className="block text-xs font-mono text-white/40 mb-1.5 uppercase tracking-wider">Complément d'adresse</label>
                <input type="text" value={form.complement} placeholder="Appartement, bâtiment… (optionnel)"
                  onChange={e => setForm(f => ({ ...f, complement: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-void border border-border focus:border-cyan-DEFAULT/60 outline-none text-white font-rajdhani text-sm placeholder:text-white/20 transition-colors" />
              </div>

              {/* Code postal */}
              <div>
                <label className="block text-xs font-mono text-white/40 mb-1.5 uppercase tracking-wider">Code postal *</label>
                <input type="text" value={form.codePostal}
                  placeholder={form.pays === "France" ? "75001" : form.pays === "Canada" ? "H1A 1A1" : "1000"}
                  onChange={e => { setForm(f => ({ ...f, codePostal: e.target.value })); setFieldErrors(p => ({ ...p, codePostal: "" })); }}
                  className="w-full px-4 py-2.5 rounded-lg bg-void border outline-none text-white font-rajdhani text-sm placeholder:text-white/20 transition-colors"
                  style={{ borderColor: fieldErrors.codePostal ? "#ff0066" : "rgba(255,255,255,0.08)" }} />
                {fieldErrors.codePostal && <p className="mt-1 text-xs font-mono" style={{ color: "#ff0066" }}>{fieldErrors.codePostal}</p>}
              </div>

              {/* Ville */}
              <div>
                <label className="block text-xs font-mono text-white/40 mb-1.5 uppercase tracking-wider">Ville *</label>
                <input type="text" value={form.ville} placeholder="Paris"
                  onChange={e => { setForm(f => ({ ...f, ville: e.target.value })); setFieldErrors(p => ({ ...p, ville: "" })); }}
                  className="w-full px-4 py-2.5 rounded-lg bg-void border outline-none text-white font-rajdhani text-sm placeholder:text-white/20 transition-colors"
                  style={{ borderColor: fieldErrors.ville ? "#ff0066" : "rgba(255,255,255,0.08)" }} />
                {fieldErrors.ville && <p className="mt-1 text-xs font-mono" style={{ color: "#ff0066" }}>{fieldErrors.ville}</p>}
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-mono text-white/40 mb-1.5 uppercase tracking-wider">Pays *</label>
                <select
                  value={form.pays}
                  onChange={e => setForm(f => ({ ...f, pays: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-void border border-border focus:border-cyan-DEFAULT/60 outline-none text-white font-rajdhani text-sm transition-colors"
                >
                  {["France", "Belgique", "Suisse", "Luxembourg", "Canada", "Autre"].map(p => (
                    <option key={p} value={p} style={{ background: "#0a0a14" }}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {!user && (
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-white/20">
                <User size={11} />
                <span>Crée un compte pour sauvegarder ton adresse et suivre tes commandes.</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Droite — récapitulatif */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="p-6 rounded-xl border border-border bg-surface space-y-5">
            <h2 className="font-orbitron font-bold text-lg text-white">Récapitulatif</h2>

            {/* Code promo */}
            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                <Tag size={11} /> Code promo
              </label>
              {appliedPromo ? (
                <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border"
                  style={{ background: "rgba(0,255,153,0.06)", borderColor: "rgba(0,255,153,0.3)" }}>
                  <div className="flex items-center gap-2">
                    <Check size={13} style={{ color: "#00ff99" }} />
                    <span className="font-mono text-sm font-bold" style={{ color: "#00ff99" }}>{appliedPromo.code}</span>
                    <span className="text-xs font-mono text-white/40">{appliedPromo.label}</span>
                  </div>
                  <button onClick={removePromo} className="text-white/30 hover:text-white/60 transition-colors">
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => { setPromoInput(e.target.value); setPromoError(""); }}
                    onKeyDown={e => e.key === "Enter" && applyPromo()}
                    placeholder="PADZONE10"
                    className="flex-1 px-3 py-2.5 rounded-lg bg-void border border-border focus:border-cyan-DEFAULT/60 outline-none text-white font-mono text-sm placeholder:text-white/15 transition-colors uppercase"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-4 py-2.5 rounded-lg text-xs font-orbitron font-bold transition-colors border border-border hover:border-cyan-DEFAULT/40 text-white/60 hover:text-white"
                  >
                    Appliquer
                  </button>
                </div>
              )}
              {promoError && (
                <p className="mt-1.5 text-xs font-mono text-magenta-DEFAULT">{promoError}</p>
              )}
            </div>

            {/* Totaux */}
            <div className="space-y-3 text-sm font-rajdhani">
              <div className="flex justify-between text-white/60">
                <span>Sous-total ({itemCount} art.)</span>
                <span className="font-mono">{total.toFixed(2)}€</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between" style={{ color: "#00ff99" }}>
                  <span>Réduction ({appliedPromo.label})</span>
                  <span className="font-mono">-{promoAmount.toFixed(2)}€</span>
                </div>
              )}

              <div className="flex justify-between text-white/60">
                <span>Livraison</span>
                <span className="font-mono" style={{ color: shipping === 0 ? "#00ff99" : undefined }}>
                  {shipping === 0 ? "GRATUITE" : `${shipping.toFixed(2)}€`}
                </span>
              </div>

              {total < 50 && (
                <div>
                  <p className="text-xs font-mono text-white/30 mb-1.5">
                    Plus {(50 - total).toFixed(2)}€ pour la livraison gratuite
                  </p>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${(total / 50) * 100}%`, background: "linear-gradient(90deg, #00e5ff, #00ff99)" }} />
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-border flex justify-between items-baseline">
                <span className="font-orbitron font-bold text-white">Total</span>
                <span className="font-orbitron font-black text-2xl price-badge">{totalFinal.toFixed(2)}€</span>
              </div>
            </div>

            {checkoutError && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono"
                style={{ background: "rgba(255,0,102,0.08)", border: "1px solid rgba(255,0,102,0.3)", color: "#ff0066" }}>
                <AlertCircle size={13} /> {checkoutError}
              </div>
            )}

            <button
              onClick={handleCommander}
              disabled={loading}
              className="w-full btn-primary py-4 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Redirection vers le paiement…</>
              ) : (
                <>Payer {totalFinal.toFixed(2)}€ <ArrowRight size={16} /></>
              )}
            </button>

            <p className="text-xs font-mono text-white/20 text-center">
              Paiement sécurisé Stripe · CB · Visa · Mastercard
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface space-y-2">
            {[
              { icon: Shield, text: "Paiement 100% sécurisé SSL" },
              { icon: Truck, text: "Livraison 15-30 jours ouvrés" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs font-mono text-white/30">
                <Icon size={12} />
                {text}
              </div>
            ))}
          </div>

          <Link href="/categories" className="block text-center text-sm font-rajdhani text-white/30 hover:text-white/50 transition-colors">
            ← Continuer mes achats
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
