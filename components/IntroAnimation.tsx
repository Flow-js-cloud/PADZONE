"use client";

import { useEffect, useState } from "react";

const LETTERS_PAD  = ["P", "A", "D"];
const LETTERS_ZONE = ["Z", "O", "N", "E"];

const PARTICLES = [
  { color: "#00e5ff", left: "8%",  top: "15%", delay: "1s",    dur: "3s"   },
  { color: "#ff0066", left: "15%", top: "75%", delay: "1.25s", dur: "2.5s" },
  { color: "#00ff99", left: "22%", top: "35%", delay: "1.5s",  dur: "3.3s" },
  { color: "#00e5ff", left: "30%", top: "55%", delay: "1.1s",  dur: "2.8s" },
  { color: "#ff0066", left: "42%", top: "20%", delay: "1.7s",  dur: "3.1s" },
  { color: "#00ff99", left: "55%", top: "80%", delay: "1.3s",  dur: "2.6s" },
  { color: "#00e5ff", left: "62%", top: "40%", delay: "1.8s",  dur: "3.4s" },
  { color: "#ff0066", left: "70%", top: "65%", delay: "1.4s",  dur: "2.9s" },
  { color: "#00ff99", left: "78%", top: "25%", delay: "1.6s",  dur: "3.2s" },
  { color: "#00e5ff", left: "85%", top: "70%", delay: "1.2s",  dur: "2.7s" },
  { color: "#ff0066", left: "92%", top: "45%", delay: "1.9s",  dur: "3.0s" },
  { color: "#00ff99", left: "48%", top: "90%", delay: "2.1s",  dur: "2.5s" },
];

const CORNERS: { pos: string; style: React.CSSProperties }[] = [
  { pos: "top-8 left-8",     style: { borderTop: "2px solid #00e5ff", borderLeft:   "2px solid #00e5ff" } },
  { pos: "top-8 right-8",    style: { borderTop: "2px solid #00e5ff", borderRight:  "2px solid #00e5ff" } },
  { pos: "bottom-8 left-8",  style: { borderBottom: "2px solid #00e5ff", borderLeft:  "2px solid #00e5ff" } },
  { pos: "bottom-8 right-8", style: { borderBottom: "2px solid #00e5ff", borderRight: "2px solid #00e5ff" } },
];

export function IntroAnimation() {
  const [visible,  setVisible]  = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("pz-intro");
    if (!seen) setVisible(true);
    const auto = setTimeout(() => doExit(), 2000);
    return () => clearTimeout(auto);
  }, []);

  const doExit = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("pz-intro", "1");
    }, 900);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-void overflow-hidden scanlines${exiting ? " intro-exit" : ""}`}
      style={{ cursor: "pointer" }}
      onClick={doExit}
    >
      {/* Grid */}
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "linear-gradient(rgba(0,229,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.08) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Corner brackets */}
      {CORNERS.map(({ pos, style }, i) => (
        <div key={i} className={`intro-anim absolute ${pos} w-12 h-12`}
          style={{ ...style, boxShadow: "0 0 10px #00e5ff",
            animation: `intro-corner 0.25s ease ${0.1 + i * 0.03}s both` }} />
      ))}

      {/* Scanline */}
      <div className="intro-anim absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,#00e5ff,#ff0066,transparent)",
          animation: "intro-scan 2s linear 0.4s both" }} />

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-8 select-none w-full px-6">

        {/* Logo letters */}
        <div className="flex items-baseline justify-center gap-0 w-full overflow-hidden">
          <div className="flex">
            {LETTERS_PAD.map((l, i) => (
              <span key={i} className="intro-anim font-orbitron font-black"
                style={{ fontSize: "clamp(1.8rem, 11vw, 9rem)", color: "#00e5ff", textShadow: "0 0 30px #00e5ff, 0 0 60px rgba(0,229,255,0.4)",
                  animation: `intro-down 0.35s cubic-bezier(0.34,1.56,0.64,1) ${0.2 + i * 0.06}s both` }}>
                {l}
              </span>
            ))}
          </div>
          <div className="flex">
            {LETTERS_ZONE.map((l, i) => (
              <span key={i} className="intro-anim font-orbitron font-black"
                style={{ fontSize: "clamp(1.8rem, 11vw, 9rem)", color: "#ff0066", textShadow: "0 0 30px #ff0066, 0 0 60px rgba(255,0,102,0.4)",
                  animation: `intro-up 0.35s cubic-bezier(0.34,1.56,0.64,1) ${0.4 + i * 0.06}s both` }}>
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* Underline */}
        <div className="w-full h-0.5 overflow-hidden">
          <div className="intro-anim h-full"
            style={{ background: "linear-gradient(90deg,#00e5ff,#ff0066)",
              animation: "intro-width 0.5s ease 0.7s both" }} />
        </div>

        {/* Tagline */}
        <p className="intro-anim font-mono text-sm md:text-base tracking-[0.4em] text-white/60 uppercase text-center w-full"
          style={{ animation: "fade-in 0.4s ease 0.9s both" }}>
          Élève ton setup. Domine la partie.
        </p>

        {/* Loader bar */}
        <div className="intro-anim w-64 h-0.5 bg-white/10 relative overflow-hidden rounded-full"
          style={{ animation: "fade-in 0.3s ease 1.0s both" }}>
          <div className="intro-anim absolute inset-y-0 left-0 rounded-full"
            style={{ background: "linear-gradient(90deg,#00e5ff,#ff0066)",
              animation: "intro-width 0.7s linear 1.1s both" }} />
        </div>

        {/* Enter button */}
        <button
          className="intro-anim mt-4 px-10 py-3 font-orbitron font-bold text-sm tracking-[0.2em] uppercase border transition-colors duration-200 hover:bg-cyan-DEFAULT/10"
          style={{ borderColor: "#00e5ff", color: "#00e5ff", boxShadow: "0 0 20px rgba(0,229,255,0.3)",
            animation: "intro-pop 0.3s ease 1.5s both, pulse-neon 2s ease-in-out 1.8s infinite" }}
          onClick={e => { e.stopPropagation(); doExit(); }}
        >
          ENTRER
        </button>

        <p className="intro-anim font-mono text-xs text-white/30"
          style={{ animation: "fade-in 0.4s ease 1.7s both" }}>
          Cliquer n'importe où pour passer
        </p>
      </div>

      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <div key={i} className="intro-anim absolute w-1 h-1 rounded-full"
          style={{ background: p.color, left: p.left, top: p.top, boxShadow: `0 0 6px ${p.color}`,
            animation: `intro-particle ${p.dur} ease ${p.delay} infinite` }} />
      ))}

      {/* Version */}
      <div className="intro-anim absolute bottom-6 right-8 font-mono text-xs text-white/20"
        style={{ animation: "fade-in 0.4s ease 2s both" }}>
        v2.0.25 // PADZONE.FR
      </div>
    </div>
  );
}
