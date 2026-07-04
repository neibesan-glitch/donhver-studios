import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Donhver Studios — dark éditorial, accent orange
        ink: "#0b0b0c", // fond principal
        surf: "#131315", // surface / cartes / marquee
        line: "rgba(255,255,255,.11)", // bordures
        paper: "#f4f2ea", // texte principal (encre crème)
        cream: "#cfc9bc", // texte secondaire
        mute: "#8b897f", // texte tertiaire
        accent: "#e2542a", // orange (CTA, points, chiffres)
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        display: ["var(--font-anton)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        kicker: ".16em",
        eyebrow: ".22em",
      },
      animation: {
        "marquee": "marquee 34s linear infinite",
        "pulse-dot": "pulseDot 1.8s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".25" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
