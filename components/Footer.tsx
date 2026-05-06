import Link from "next/link";
import { Zap, Instagram, Twitter, Youtube, Twitch } from "lucide-react";

const FOOTER_LINKS = {
  "Produits": [
    { label: "Anime", href: "/categories/anime" },
    { label: "Jeux Vidéo", href: "/categories/jeux" },
    { label: "RGB LED", href: "/categories/rgb" },
    { label: "Par Taille", href: "/categories/tailles" },
    { label: "Nouveautés", href: "/categories/nouveautes" },
    { label: "Promotions", href: "/categories/promo" },
  ],
  "Compte": [
    { label: "Connexion", href: "/connexion" },
    { label: "Inscription", href: "/inscription" },
    { label: "Mon Panier", href: "/panier" },
    { label: "Mes Commandes", href: "/compte/commandes" },
  ],
  "Légal": [
    { label: "Mentions Légales", href: "/mentions-legales" },
    { label: "CGV", href: "/cgv" },
    { label: "Confidentialité", href: "/politique-confidentialite" },
    { label: "Cookies", href: "/cookies" },
  ],
  "Support": [
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Livraison", href: "/livraison" },
    { label: "Retours", href: "/retours" },
  ],
};

const SOCIALS = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter/X" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitch, href: "#", label: "Twitch" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-24" style={{ background: "#07070f" }}>
      {/* Ticker */}
      <div
        className="border-b border-border overflow-hidden py-2"
        style={{ background: "rgba(0,229,255,0.04)" }}
      >
        <div className="flex items-center animate-marquee whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, block) => (
            <span key={block} className="flex items-center gap-8 px-8">
              {["LIVRAISON GRATUITE DÈS 50€", "QUALITÉ PREMIUM GARANTIE", "RETOURS SOUS 30 JOURS", "IMPRESSION ULTRA HD", "ANTI-DÉRAPANT RENFORCÉ"].map((t, i) => (
                <span key={i} className="font-orbitron text-xs tracking-[0.25em] text-white/30 flex items-center gap-4">
                  {t} <span className="text-cyan-DEFAULT opacity-40">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Zap size={20} className="text-cyan-DEFAULT" />
              <span className="font-orbitron font-black text-lg">
                <span style={{ color: "#00e5ff" }}>PAD</span>
                <span style={{ color: "#ff0066" }}>ZONE</span>
              </span>
            </Link>
            <p className="text-white/40 text-xs sm:text-sm font-rajdhani leading-relaxed">
              Les meilleurs tapis gaming Anime & Jeux Vidéo. Qualité premium, livraison internationale.
            </p>

            {/* Socials */}
            <div className="flex gap-3 pt-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-white/40 hover:text-cyan-DEFAULT hover:border-cyan-DEFAULT/50 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="space-y-1.5 pt-2">
              {["🔒 Paiement sécurisé SSL", "🚚 Livraison 15-30 jours", "↩️ Retour 30 jours"].map(t => (
                <p key={t} className="text-xs font-mono text-white/30">{t}</p>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-orbitron font-bold text-xs tracking-[0.2em] uppercase text-white/50 mb-4">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs sm:text-sm font-rajdhani text-white/40 hover:text-white/80 transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs font-mono text-white/40">
            © {new Date().getFullYear()} PadZone — Tous droits réservés
          </p>
          <p className="text-xs font-mono text-white/30">
            Made with ⚡ for gamers
          </p>
          <div className="flex items-center gap-2">
            {["Visa", "Mastercard", "PayPal"].map(m => (
              <span key={m} className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 text-white/30">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
