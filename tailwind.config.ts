import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
        mono: ["var(--font-share-tech)", "monospace"],
      },
      colors: {
        void: "#020209",
        base: "#07070f",
        surface: "#0d0d1a",
        elevated: "#13132a",
        border: "#1f1f3a",
        cyan: {
          DEFAULT: "#00e5ff",
          dim: "#006b7a",
          glow: "rgba(0,229,255,0.3)",
        },
        magenta: {
          DEFAULT: "#ff0066",
          dim: "#7a0030",
          glow: "rgba(255,0,102,0.3)",
        },
        neon: {
          green: "#00ff99",
          lime: "#b4ff00",
          yellow: "#fff200",
          purple: "#bf00ff",
          orange: "#ff6600",
        },
        gold: "#ffd700",
      },
      animation: {
        "rgb-spin": "rgb-spin 3s linear infinite",
        "rgb-border": "rgb-border 4s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "scanline": "scanline 3s linear infinite",
        "glitch": "glitch 4s steps(1) infinite",
        "marquee": "marquee 25s linear infinite",
        "fade-up": "fade-up 0.6s ease forwards",
        "slide-in-right": "slide-in-right 0.4s ease forwards",
      },
      keyframes: {
        "rgb-spin": {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
        "rgb-border": {
          "0%": { borderColor: "#ff0066", boxShadow: "0 0 15px #ff0066, inset 0 0 15px rgba(255,0,102,0.1)" },
          "25%": { borderColor: "#00e5ff", boxShadow: "0 0 15px #00e5ff, inset 0 0 15px rgba(0,229,255,0.1)" },
          "50%": { borderColor: "#00ff99", boxShadow: "0 0 15px #00ff99, inset 0 0 15px rgba(0,255,153,0.1)" },
          "75%": { borderColor: "#bf00ff", boxShadow: "0 0 15px #bf00ff, inset 0 0 15px rgba(191,0,255,0.1)" },
          "100%": { borderColor: "#ff0066", boxShadow: "0 0 15px #ff0066, inset 0 0 15px rgba(255,0,102,0.1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "pulse-neon": {
          "0%, 100%": { textShadow: "0 0 10px #00e5ff, 0 0 30px #00e5ff, 0 0 60px #00e5ff" },
          "50%": { textShadow: "0 0 5px #00e5ff, 0 0 15px #00e5ff" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%, 95%, 100%": { transform: "translate(0)" },
          "96%": { transform: "translate(-2px, 1px)" },
          "97%": { transform: "translate(2px, -1px)" },
          "98%": { transform: "translate(-1px, 2px)" },
          "99%": { transform: "translate(1px, 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(0,229,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.05) 1px, transparent 1px)",
        "hex-pattern": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300e5ff' fill-opacity='0.03'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L0 31.3l12.98 7.5v6.35h2v-7.5L0 33.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
