"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, User, Menu, X, ChevronDown, Zap, LogOut, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  {
    label: "RGB Gaming",
    href: "/categories/rgb",
    accent: "#00e5ff",
    children: [
      { label: "RGB Anime", href: "/categories/rgb/rgb-anime", accent: "#00e5ff" },
      { label: "RGB Jeux", href: "/categories/rgb/rgb-jeux", accent: "#00e5ff" },
      { label: "RGB Full Desk", href: "/categories/rgb/rgb-fulldesk", accent: "#00e5ff" },
    ],
  },
  {
    label: "Anime",
    href: "/categories/anime",
    accent: "#ff0066",
    children: [
      { label: "Dragon Ball Z", href: "/categories/anime/dragon-ball", accent: "#ff9900" },
      { label: "Naruto", href: "/categories/anime/naruto", accent: "#ff4500" },
      { label: "One Piece", href: "/categories/anime/one-piece", accent: "#ffd700" },
      { label: "Demon Slayer", href: "/categories/anime/demon-slayer", accent: "#00aaff" },
      { label: "Attack on Titan", href: "/categories/anime/attack-on-titan", accent: "#8b7355" },
      { label: "Jujutsu Kaisen", href: "/categories/anime/jujutsu-kaisen", accent: "#6666ff" },
    ],
  },
  {
    label: "Jeux Vidéo",
    href: "/categories/jeux",
    accent: "#00ff99",
    children: [
      { label: "Valorant", href: "/categories/jeux/valorant", accent: "#ff4040" },
      { label: "League of Legends", href: "/categories/jeux/league-of-legends", accent: "#c89b3c" },
      { label: "CS2", href: "/categories/jeux/cs2", accent: "#f0a000" },
      { label: "Fortnite", href: "/categories/jeux/fortnite", accent: "#9933ff" },
      { label: "Apex Legends", href: "/categories/jeux/apex-legends", accent: "#ff6600" },
    ],
  },
  {
    label: "Bureautique",
    href: "/categories/bureautique",
    accent: "#c9b8f5",
    children: [
      { label: "Minimaliste", href: "/categories/bureautique/minimaliste", accent: "#ffffff" },
      { label: "Effet Cuir", href: "/categories/bureautique/cuir", accent: "#c8883a" },
      { label: "Nature", href: "/categories/bureautique/nature", accent: "#6abf5e" },
      { label: "Marbre", href: "/categories/bureautique/marbre", accent: "#aaaaaa" },
      { label: "Couleurs & Dégradés", href: "/categories/bureautique/couleur", accent: "#c9b8f5" },
    ],
  },
  {
    label: "Par Taille",
    href: "/categories/tailles",
    accent: "#ffd700",
    children: [
      { label: "S — 25×20 cm", href: "/categories/tailles/s", accent: "#ffd700" },
      { label: "M — 40×30 cm", href: "/categories/tailles/m", accent: "#ffd700" },
      { label: "L — 60×30 cm", href: "/categories/tailles/l", accent: "#ffd700" },
      { label: "XL — 80×30 cm", href: "/categories/tailles/xl", accent: "#ffd700" },
      { label: "XXL — 90×40 cm", href: "/categories/tailles/xxl", accent: "#ffd700" },
      { label: "XXXL — 120×60 cm", href: "/categories/tailles/xxxl", accent: "#ffd700" },
    ],
  },
];

interface NavbarProps {
  onSearchOpen?: () => void;
}

export function Navbar({ onSearchOpen }: NavbarProps) {
  const { itemCount, openDrawer } = useCart();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMobileSection = (label: string) => {
    setOpenMobileSection(prev => prev === label ? null : label);
  };

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          scrolled ? "glass border-b border-border" : "bg-transparent"
        }`}
        style={{ zIndex: 200 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Zap size={22} className="text-cyan-DEFAULT" style={{ filter: "drop-shadow(0 0 6px #00e5ff)" }} />
              <span className="font-orbitron font-black text-xl">
                <span className="text-cyan-DEFAULT" style={{ textShadow: "0 0 10px #00e5ff" }}>PAD</span>
                <span className="text-magenta-DEFAULT" style={{ textShadow: "0 0 10px #ff0066" }}>ZONE</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="relative"
                  onMouseEnter={() => openMenu(link.label)}
                  onMouseLeave={closeMenu}>
                  <Link href={link.href}
                    className="flex items-center gap-1 px-4 py-2 font-rajdhani font-semibold text-sm tracking-wider uppercase transition-colors duration-150"
                    style={{ color: link.accent, opacity: openDropdown === link.label ? 1 : 0.7 }}>
                    {link.label}
                    <ChevronDown size={13} style={{ opacity: 0.6 }} />
                  </Link>

                  {openDropdown === link.label && (
                    <div
                      className="absolute top-full left-0 mt-1 w-52 glass border border-border rounded-lg overflow-hidden animate-slide-down"
                      onMouseEnter={() => openMenu(link.label)}
                      onMouseLeave={closeMenu}
                    >
                      {link.children?.map((child) => (
                        <Link key={child.href} href={child.href}
                          className="flex items-center px-4 py-2.5 text-sm font-rajdhani font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors"
                          style={{ borderLeft: `2px solid ${child.accent}` }}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button onClick={onSearchOpen} aria-label="Rechercher"
                className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <Search size={18} className="text-white/60" />
              </button>

              <button onClick={openDrawer} aria-label="Ouvrir le panier"
                className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
                <ShoppingCart size={20} className="text-white/80" />
                {itemCount > 0 && (
                  <span key={itemCount}
                    className="cart-count absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-orbitron font-bold text-white flex items-center justify-center animate-scale-in">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>

              {user ? (
                <>
                  <Link href="/compte" aria-label="Mon compte"
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <User size={20} className="text-cyan-DEFAULT" />
                  </Link>
                  <button onClick={logout} aria-label="Se déconnecter"
                    className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-rajdhani text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors">
                    <LogOut size={13} />
                    <span>Déconnexion</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/connexion" aria-label="Se connecter"
                    className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <User size={20} className="text-white/60" />
                  </Link>
                  <div className="hidden lg:flex items-center gap-2">
                    <Link href="/connexion"
                      className="px-3 py-1.5 text-xs font-orbitron font-semibold tracking-wider uppercase text-white/60 hover:text-white transition-colors">
                      Connexion
                    </Link>
                    <Link href="/inscription" className="btn-primary px-4 py-1.5 text-xs rounded-lg">
                      S'inscrire
                    </Link>
                  </div>
                </>
              )}

              <button
                onClick={() => { setMobileOpen(v => !v); setOpenMobileSection(null); }}
                aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={mobileOpen}
                className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu — CSS only, no framer-motion */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed top-16 left-0 right-0 bottom-0 flex flex-col border-t border-border overflow-hidden animate-slide-down"
          style={{ zIndex: 190, background: "rgba(7,7,15,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
        >
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => {
                const isOpen = openMobileSection === link.label;
                return (
                  <div key={link.label} className="rounded-xl overflow-hidden border border-transparent"
                    style={{ borderColor: isOpen ? `${link.accent}30` : "transparent" }}>

                    <button
                      onClick={() => toggleMobileSection(link.label)}
                      className="w-full flex items-center justify-between px-4 py-3.5 font-rajdhani font-bold text-base tracking-wider uppercase transition-colors"
                      style={{ color: link.accent, background: isOpen ? `${link.accent}08` : "transparent" }}>
                      <span>{link.label}</span>
                      <ChevronDown size={16} style={{
                        opacity: 0.7,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease"
                      }} />
                    </button>

                    {/* Accordion via CSS grid */}
                    <div className={`accordion-grid${isOpen ? " open" : ""}`}>
                      <div>
                        <Link href={link.href} onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between px-4 py-2.5 text-sm font-rajdhani font-semibold transition-colors"
                          style={{ color: link.accent, background: `${link.accent}06`, borderLeft: `3px solid ${link.accent}` }}>
                          Voir tout — {link.label}
                        </Link>
                        {link.children?.map((child) => (
                          <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}
                            className="flex items-center px-5 py-2.5 text-sm font-rajdhani text-white/55 hover:text-white hover:bg-white/5 transition-colors"
                            style={{ borderLeft: `2px solid ${child.accent}35` }}>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-shrink-0 px-4 py-4 border-t border-border flex gap-3"
            style={{ background: "rgba(2,2,9,0.95)" }}>
            <Link href="/connexion" onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-2.5 btn-ghost text-sm rounded-xl font-rajdhani font-semibold">
              Connexion
            </Link>
            <Link href="/inscription" onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-2.5 btn-primary text-sm rounded-xl font-rajdhani font-semibold">
              S'inscrire
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
