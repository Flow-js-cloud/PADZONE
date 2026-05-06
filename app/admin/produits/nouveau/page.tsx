"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { addCustomProduct } from "@/lib/customProducts";
import { Plus, X, ChevronLeft, Check } from "lucide-react";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";

const CATEGORIES = [
  { value: "anime",       label: "Anime",       color: "#ff0066" },
  { value: "jeux",        label: "Jeux Vidéo",  color: "#00ff99" },
  { value: "rgb",         label: "RGB Gaming",  color: "#00e5ff" },
  { value: "bureautique", label: "Bureautique", color: "#c9b8f5" },
  { value: "standard",    label: "Standard",    color: "#94a3b8" },
];

const SUB_CATEGORIES: Record<string, string[]> = {
  anime:       ["dragon-ball", "naruto", "one-piece", "demon-slayer", "attack-on-titan", "jujutsu-kaisen"],
  jeux:        ["valorant", "league-of-legends", "cs2", "fortnite", "apex-legends"],
  rgb:         ["rgb-anime", "rgb-jeux", "rgb-fulldesk"],
  bureautique: ["minimaliste", "cuir", "nature", "marbre", "couleur"],
  standard:    ["tailles"],
};

const SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];

const DIMENSIONS: Record<string, string> = {
  S: "25 × 20 cm", M: "40 × 30 cm", L: "60 × 30 cm",
  XL: "80 × 30 cm", XXL: "90 × 40 cm", XXXL: "120 × 60 cm",
};

const GRADIENTS = [
  { label: "Cyan Gaming",    value: "linear-gradient(135deg, #020209 0%, #001a2e 50%, #003a5c 100%)",    preview: "#001a2e" },
  { label: "Magenta",        value: "linear-gradient(135deg, #0a0010 0%, #2a0030 50%, #4a0020 100%)",    preview: "#2a0030" },
  { label: "Neon Green",     value: "linear-gradient(135deg, #001510 0%, #003322 50%, #006633 100%)",    preview: "#003322" },
  { label: "Dragon Ball",    value: "linear-gradient(135deg, #ff6600 0%, #ffd700 50%, #cc4400 100%)",    preview: "#ffd700" },
  { label: "Naruto",         value: "linear-gradient(135deg, #ff4500 0%, #ff8c00 50%, #ffd700 100%)",    preview: "#ff8c00" },
  { label: "One Piece",      value: "linear-gradient(135deg, #fff8e1 0%, #ffd700 50%, #cc0000 100%)",    preview: "#ffd700" },
  { label: "JJK",            value: "linear-gradient(135deg, #000066 0%, #0000cc 50%, #6666ff 100%)",    preview: "#0000cc" },
  { label: "Valorant",       value: "linear-gradient(135deg, #1a0000 0%, #cc0000 50%, #ff4040 100%)",    preview: "#cc0000" },
  { label: "LoL Gold",       value: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #c89b3c 100%)",    preview: "#1e3a5f" },
  { label: "CS2 Desert",     value: "linear-gradient(135deg, #c8a870 0%, #806030 50%, #604820 100%)",    preview: "#806030" },
  { label: "RGB Spectrum",   value: "linear-gradient(135deg, #ff0066, #00e5ff, #00ff99, #bf00ff)",       preview: "#00e5ff" },
  { label: "Or",             value: "linear-gradient(135deg, #0f0a00 0%, #2a1a00 50%, #4a3000 100%)",    preview: "#2a1a00" },
  { label: "Marbre Blanc",   value: "linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 50%, #d0d0d0 100%)",   preview: "#e8e8e8" },
  { label: "Cuir Marron",    value: "linear-gradient(135deg, #3b1f0a 0%, #6b3a1f 50%, #4a2810 100%)",   preview: "#6b3a1f" },
  { label: "Nature Vert",    value: "linear-gradient(135deg, #1a2e1a 0%, #2d4a20 50%, #3d6030 100%)",   preview: "#2d4a20" },
  { label: "Pastel",         value: "linear-gradient(135deg, #ffd6e0 0%, #c9b8f5 50%, #b8e0ff 100%)",   preview: "#c9b8f5" },
  { label: "Noir Uni",       value: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)",   preview: "#1a1a1a" },
];

type FormData = {
  shortName: string;
  name: string;
  price: string;
  originalPrice: string;
  category: string;
  subCategory: string;
  size: string;
  dimensions: string;
  gradient: string;
  accentColor: string;
  description: string;
  features: string[];
  stock: string;
  isNew: boolean;
  isBestSeller: boolean;
  isRGB: boolean;
  badge: string;
  images: string[];
};

const EMPTY: FormData = {
  shortName: "", name: "", price: "", originalPrice: "",
  category: "anime", subCategory: "", size: "XL", dimensions: "80 × 30 cm",
  gradient: GRADIENTS[0].value, accentColor: "#00e5ff",
  description: "", features: [""], stock: "50",
  isNew: false, isBestSeller: false, isRGB: false, badge: "",
  images: [],
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#475569" }}>
        {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const INPUT_STYLE = { background: "#0f1117", border: "1px solid #1e2a3a", color: "#e2e8f0" };

export default function NouveauProduitPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [saved, setSaved] = useState(false);

  const set = (key: keyof FormData, value: string | boolean | string[]) =>
    setForm(f => ({ ...f, [key]: value }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.shortName.trim()) e.shortName = "Requis";
    if (!form.name.trim()) e.name = "Requis";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = "Prix invalide";
    if (!form.description.trim()) e.description = "Requis";
    if (Number(form.stock) < 0) e.stock = "Stock invalide";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addCustomProduct({
      name: form.name.trim(),
      shortName: form.shortName.trim(),
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      category: form.category as any,
      subCategory: form.subCategory || form.category,
      size: form.size as any,
      dimensions: form.dimensions,
      gradient: form.gradient,
      accentColor: form.accentColor,
      description: form.description.trim(),
      features: form.features.filter(f => f.trim()),
      stock: parseInt(form.stock) || 0,
      isNew: form.isNew,
      isBestSeller: form.isBestSeller,
      isRGB: form.isRGB,
      badge: form.badge || undefined,
      images: form.images.length ? form.images : undefined,
      rating: 4.5,
      reviews: 0,
    });
    setSaved(true);
    setTimeout(() => router.push("/admin/produits"), 1000);
  };

  return (
    <AdminShell title="Nouveau produit">
      <div className="max-w-3xl">

        <Link href="/admin/produits"
          className="inline-flex items-center gap-1.5 text-sm mb-6 hover:opacity-80 transition-opacity"
          style={{ color: "#60a5fa" }}>
          <ChevronLeft size={14} /> Retour aux produits
        </Link>

        <div className="space-y-5">

          {/* Infos de base */}
          <div className="p-6 rounded-xl space-y-4" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
            <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Informations générales</p>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Nom court (affiché)" required>
                <input value={form.shortName} onChange={e => set("shortName", e.target.value)}
                  placeholder="DBZ Goku Ultra Instinct"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ ...INPUT_STYLE, borderColor: errors.shortName ? "#ef4444" : "#1e2a3a" }} />
                {errors.shortName && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.shortName}</p>}
              </Field>

              <Field label="Nom complet" required>
                <input value={form.name} onChange={e => set("name", e.target.value)}
                  placeholder="Tapis Gaming Dragon Ball Z — Goku Ultra Instinct"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ ...INPUT_STYLE, borderColor: errors.name ? "#ef4444" : "#1e2a3a" }} />
                {errors.name && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.name}</p>}
              </Field>

              <Field label="Prix (€)" required>
                <input value={form.price} onChange={e => set("price", e.target.value)}
                  type="number" step="0.01" placeholder="29.99"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ ...INPUT_STYLE, borderColor: errors.price ? "#ef4444" : "#1e2a3a" }} />
                {errors.price && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.price}</p>}
              </Field>

              <Field label="Prix barré (€)">
                <input value={form.originalPrice} onChange={e => set("originalPrice", e.target.value)}
                  type="number" step="0.01" placeholder="39.99 (optionnel)"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={INPUT_STYLE} />
              </Field>

              <Field label="Badge">
                <input value={form.badge} onChange={e => set("badge", e.target.value)}
                  placeholder="NOUVEAU, BEST-SELLER, PROMO… (optionnel)"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={INPUT_STYLE} />
              </Field>

              <Field label="Stock" required>
                <input value={form.stock} onChange={e => set("stock", e.target.value)}
                  type="number" placeholder="50"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ ...INPUT_STYLE, borderColor: errors.stock ? "#ef4444" : "#1e2a3a" }} />
              </Field>
            </div>
          </div>

          {/* Catégorie & taille */}
          <div className="p-6 rounded-xl space-y-4" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
            <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Catégorie & taille</p>
            <div className="grid grid-cols-3 gap-4">

              <Field label="Catégorie" required>
                <select value={form.category}
                  onChange={e => { set("category", e.target.value); set("subCategory", ""); }}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={INPUT_STYLE}>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value} style={{ background: "#0f1117" }}>{c.label}</option>)}
                </select>
              </Field>

              <Field label="Sous-catégorie">
                <select value={form.subCategory} onChange={e => set("subCategory", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={INPUT_STYLE}>
                  <option value="" style={{ background: "#0f1117" }}>— Choisir —</option>
                  {(SUB_CATEGORIES[form.category] ?? []).map(s => (
                    <option key={s} value={s} style={{ background: "#0f1117" }}>{s}</option>
                  ))}
                </select>
              </Field>

              <Field label="Taille" required>
                <select value={form.size}
                  onChange={e => { set("size", e.target.value); set("dimensions", DIMENSIONS[e.target.value] ?? ""); }}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={INPUT_STYLE}>
                  {SIZES.map(s => <option key={s} value={s} style={{ background: "#0f1117" }}>{s}</option>)}
                </select>
              </Field>

              <Field label="Dimensions">
                <input value={form.dimensions} onChange={e => set("dimensions", e.target.value)}
                  placeholder="80 × 30 cm"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={INPUT_STYLE} />
              </Field>

            </div>
          </div>

          {/* Photos produit */}
          <div className="p-6 rounded-xl space-y-4" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#e2e8f0" }}>Photos du produit</p>
              <p className="text-xs font-mono mb-4" style={{ color: "#475569" }}>La première photo sera l'image principale sur le site.</p>
              <ImageUploader value={form.images} onChange={v => set("images", v)} />
            </div>
          </div>

          {/* Visuel */}
          <div className="p-6 rounded-xl space-y-4" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
            <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Visuel (dégradé de fond)</p>

            <Field label="Dégradé de couleur">
              <div className="grid grid-cols-4 gap-2 mt-1">
                {GRADIENTS.map(g => (
                  <button key={g.value} onClick={() => set("gradient", g.value)}
                    className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-all text-left"
                    style={{
                      background: form.gradient === g.value ? "#1e3a5f" : "#0f1117",
                      border: `1px solid ${form.gradient === g.value ? "#3b82f6" : "#1e2a3a"}`,
                      color: "#94a3b8",
                    }}>
                    <div className="w-6 h-6 rounded flex-shrink-0" style={{ background: g.value }} />
                    <span className="truncate">{g.label}</span>
                    {form.gradient === g.value && <Check size={10} style={{ color: "#60a5fa", marginLeft: "auto" }} />}
                  </button>
                ))}
              </div>
            </Field>

            {/* Aperçu */}
            <div>
              <p className="text-xs mb-2" style={{ color: "#475569" }}>Aperçu de la vignette</p>
              <div className="w-32 h-20 rounded-xl overflow-hidden relative" style={{ background: form.gradient, border: "1px solid #1e2a3a" }}>
                {form.images[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.images[0]} alt="" className="absolute inset-0 w-full h-full object-cover" />
                )}
              </div>
            </div>

            <Field label="Couleur d'accentuation">
              <div className="flex items-center gap-3">
                <input type="color" value={form.accentColor}
                  onChange={e => set("accentColor", e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0.5"
                  style={{ background: "#0f1117", border: "1px solid #1e2a3a" }} />
                <input value={form.accentColor} onChange={e => set("accentColor", e.target.value)}
                  placeholder="#00e5ff"
                  className="w-32 px-3 py-2 rounded-lg text-sm outline-none font-mono"
                  style={INPUT_STYLE} />
                <div className="w-6 h-6 rounded-full" style={{ background: form.accentColor, boxShadow: `0 0 8px ${form.accentColor}60` }} />
              </div>
            </Field>
          </div>

          {/* Description & features */}
          <div className="p-6 rounded-xl space-y-4" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
            <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Description</p>

            <Field label="Description" required>
              <textarea value={form.description} onChange={e => set("description", e.target.value)}
                rows={3} placeholder="Tapis gaming premium avec impression Ultra HD…"
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
                style={{ ...INPUT_STYLE, borderColor: errors.description ? "#ef4444" : "#1e2a3a" }} />
              {errors.description && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.description}</p>}
            </Field>

            <Field label="Caractéristiques">
              <div className="space-y-2">
                {form.features.map((f, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={f}
                      onChange={e => {
                        const updated = [...form.features];
                        updated[i] = e.target.value;
                        set("features", updated);
                      }}
                      placeholder={`Caractéristique ${i + 1}`}
                      className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                      style={INPUT_STYLE} />
                    <button onClick={() => set("features", form.features.filter((_, j) => j !== i))}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors flex-shrink-0"
                      style={{ border: "1px solid #1e2a3a", color: "#475569" }}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <button onClick={() => set("features", [...form.features, ""])}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors"
                  style={{ background: "#1e2a3a", color: "#64748b" }}>
                  <Plus size={12} /> Ajouter une caractéristique
                </button>
              </div>
            </Field>
          </div>

          {/* Badges */}
          <div className="p-6 rounded-xl" style={{ background: "#141921", border: "1px solid #1e2a3a" }}>
            <p className="text-sm font-semibold mb-4" style={{ color: "#e2e8f0" }}>Options</p>
            <div className="flex gap-4">
              {[
                { key: "isNew",        label: "Nouveauté",   color: "#22c55e" },
                { key: "isBestSeller", label: "Best-Seller", color: "#f59e0b" },
                { key: "isRGB",        label: "RGB LED",     color: "#00e5ff" },
              ].map(({ key, label, color }) => (
                <button key={key}
                  onClick={() => set(key as keyof FormData, !form[key as keyof FormData])}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: form[key as keyof FormData] ? `${color}15` : "#0f1117",
                    border: `1px solid ${form[key as keyof FormData] ? color : "#1e2a3a"}`,
                    color: form[key as keyof FormData] ? color : "#475569",
                  }}>
                  {form[key as keyof FormData] && <Check size={12} />}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pb-8">
            <button onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: saved ? "#16a34a" : "#2563eb", color: "#fff" }}>
              {saved ? <><Check size={14} /> Produit ajouté !</> : <><Plus size={14} /> Ajouter le produit</>}
            </button>
            <Link href="/admin/produits"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
              style={{ background: "#1e2a3a", color: "#64748b" }}>
              Annuler
            </Link>
          </div>

        </div>
      </div>
    </AdminShell>
  );
}
