"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS_PAD = ["P", "A", "D"];
const LETTERS_ZONE = ["Z", "O", "N", "E"];

export function IntroAnimation() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const seen = sessionStorage.getItem("pz-intro");
    if (!seen) setVisible(true);

    const auto = setTimeout(() => handleEnter(), 2000);
    return () => clearTimeout(auto);
  }, []);

  const handleEnter = () => {
    setPhase("exit");
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("pz-intro", "1");
    }, 900);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-void overflow-hidden scanlines"
          style={{ cursor: "pointer" }}
          onClick={handleEnter}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,229,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.08) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Corner brackets */}
          {["top-8 left-8", "top-8 right-8", "bottom-8 left-8", "bottom-8 right-8"].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-12 h-12`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.03, duration: 0.25 }}
              style={{
                borderTop: i < 2 ? "2px solid #00e5ff" : "none",
                borderBottom: i >= 2 ? "2px solid #00e5ff" : "none",
                borderLeft: i % 2 === 0 ? "2px solid #00e5ff" : "none",
                borderRight: i % 2 === 1 ? "2px solid #00e5ff" : "none",
                boxShadow: "0 0 10px #00e5ff",
              }}
            />
          ))}

          {/* Horizontal scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #00e5ff, #ff0066, transparent)" }}
            initial={{ top: "-2px", opacity: 0 }}
            animate={{ top: "100vh", opacity: [0, 1, 1, 0] }}
            transition={{ delay: 0.4, duration: 2, ease: "linear" }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-8 select-none">
            {/* Logo */}
            <div className="flex items-baseline gap-0">
              {/* PAD */}
              <div className="flex">
                {LETTERS_PAD.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="font-orbitron font-black text-7xl md:text-9xl"
                    style={{ color: "#00e5ff", textShadow: "0 0 30px #00e5ff, 0 0 60px rgba(0,229,255,0.4)" }}
                    initial={{ opacity: 0, y: -80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              {/* ZONE */}
              <div className="flex">
                {LETTERS_ZONE.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="font-orbitron font-black text-7xl md:text-9xl"
                    style={{ color: "#ff0066", textShadow: "0 0 30px #ff0066, 0 0 60px rgba(255,0,102,0.4)" }}
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Underline */}
            <motion.div
              className="h-0.5 w-0"
              style={{ background: "linear-gradient(90deg, #00e5ff, #ff0066)" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
            />

            {/* Tagline */}
            <motion.p
              className="font-mono text-sm md:text-base tracking-[0.4em] text-white/60 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              Élève ton setup. Domine la partie.
            </motion.p>

            {/* Loader bar */}
            <motion.div
              className="w-64 h-0.5 bg-white/10 relative overflow-hidden rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: "linear-gradient(90deg, #00e5ff, #ff0066)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.1, duration: 0.7, ease: "linear" }}
              />
            </motion.div>

            {/* Enter button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              className="mt-4 px-10 py-3 font-orbitron font-bold text-sm tracking-[0.2em] uppercase border border-cyan-DEFAULT text-cyan-DEFAULT hover:bg-cyan-DEFAULT/10 transition-all duration-200"
              style={{
                borderColor: "#00e5ff",
                color: "#00e5ff",
                boxShadow: "0 0 20px rgba(0,229,255,0.3)",
                animation: "pulse-neon 2s ease-in-out infinite",
              }}
              onClick={(e) => { e.stopPropagation(); handleEnter(); }}
            >
              ENTRER
            </motion.button>

            <motion.p
              className="font-mono text-xs text-white/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              Cliquer n'importe où pour passer
            </motion.p>
          </div>

          {/* RGB particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: i % 3 === 0 ? "#00e5ff" : i % 3 === 1 ? "#ff0066" : "#00ff99",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 6px ${i % 3 === 0 ? "#00e5ff" : i % 3 === 1 ? "#ff0066" : "#00ff99"}`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -30 - Math.random() * 50],
              }}
              transition={{
                delay: 1 + Math.random() * 3,
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}

          {/* Version tag */}
          <motion.div
            className="absolute bottom-6 right-8 font-mono text-xs text-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            v2.0.25 // PADZONE.FR
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
