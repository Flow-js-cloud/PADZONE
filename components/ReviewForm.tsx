"use client";

import { useState, useEffect } from "react";
import { Star, Send, Check } from "lucide-react";
import { addUserReview, hasAlreadyReviewed } from "@/lib/userReviews";
import type { Review } from "@/lib/reviews";

type Props = {
  productId: string;
  onSubmitted: (review: Review) => void;
};

export function ReviewForm({ productId, onSubmitted }: Props) {
  const [rating,   setRating]   = useState(0);
  const [hover,    setHover]    = useState(0);
  const [name,     setName]     = useState("");
  const [text,     setText]     = useState("");
  const [done,     setDone]     = useState(false);
  const [errors,   setErrors]   = useState<string[]>([]);
  const [blocked,  setBlocked]  = useState(false);

  useEffect(() => {
    setBlocked(hasAlreadyReviewed(productId));
  }, [productId]);

  const handleSubmit = () => {
    const e: string[] = [];
    if (rating === 0) e.push("Choisis une note (étoiles)");
    if (!name.trim()) e.push("Entre ton prénom");
    if (text.trim().length < 10) e.push("Ton avis doit faire au moins 10 caractères");
    setErrors(e);
    if (e.length) return;

    const now = new Date();
    const review: Review = {
      name: name.trim(),
      rating,
      text: text.trim(),
      date: now.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }),
      verified: false,
    };
    addUserReview(productId, review);
    onSubmitted(review);
    setDone(true);
  };

  if (done || blocked) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,255,153,0.1)", border: "1px solid rgba(0,255,153,0.3)" }}>
          <Check size={26} style={{ color: "#00ff99" }} />
        </div>
        <p className="font-orbitron font-bold text-white">
          {blocked ? "Avis déjà soumis" : "Merci pour ton avis !"}
        </p>
        <p className="text-sm font-mono text-white/40">
          {blocked
            ? "Tu as déjà laissé un avis sur ce produit."
            : "Il est maintenant visible sur cette page."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* Étoiles */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#475569" }}>
          Ta note <span style={{ color: "#ef4444" }}>*</span>
        </p>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-110">
              <Star size={28}
                className={(hover || rating) >= n ? "fill-gold text-gold" : "text-white/20"}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-xs font-mono self-center" style={{ color: "#ffd700" }}>
              {["", "Décevant", "Passable", "Bien", "Très bien", "Excellent !"][rating]}
            </span>
          )}
        </div>
      </div>

      {/* Prénom */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#475569" }}>
          Ton prénom <span style={{ color: "#ef4444" }}>*</span>
        </p>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Lucas"
          maxLength={40}
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: "#0f1117", border: "1px solid #1e2a3a", color: "#e2e8f0" }}
        />
      </div>

      {/* Texte */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#475569" }}>
          Ton avis <span style={{ color: "#ef4444" }}>*</span>
        </p>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Partage ton expérience avec ce produit…"
          rows={4}
          maxLength={600}
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
          style={{ background: "#0f1117", border: "1px solid #1e2a3a", color: "#e2e8f0" }}
        />
        <p className="text-right text-xs font-mono mt-1" style={{ color: "#334155" }}>{text.length}/600</p>
      </div>

      {/* Erreurs */}
      {errors.length > 0 && (
        <ul className="space-y-1">
          {errors.map(e => (
            <li key={e} className="text-xs font-mono" style={{ color: "#ef4444" }}>· {e}</li>
          ))}
        </ul>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-orbitron font-bold transition-all"
        style={{ background: "linear-gradient(135deg, #00e5ff, #0088aa)", color: "#020209" }}>
        <Send size={14} />
        Publier mon avis
      </button>
    </div>
  );
}
