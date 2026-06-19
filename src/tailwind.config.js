/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: "#a855f7",
          pink: "#ec4899",
          cyan: "#22d3ee",
          green: "#22c55e",
          gold: "#facc15",
        },
      },
      boxShadow: {
        neon: "0 0 20px rgba(168,85,247,0.55), 0 0 40px rgba(168,85,247,0.25)",
        "neon-cyan": "0 0 20px rgba(34,211,238,0.55), 0 0 40px rgba(34,211,238,0.25)",
        "neon-gold": "0 0 20px rgba(250,204,21,0.55), 0 0 40px rgba(250,204,21,0.25)",
      },
      keyframes: {
        glow: {
          "0%,100%": { boxShadow: "0 0 12px rgba(168,85,247,0.5)" },
          "50%":     { boxShadow: "0 0 32px rgba(168,85,247,0.9)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-6px)" },
        },
        shine: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        popIn: {
          "0%":   { transform: "scale(0.7)", opacity: 0 },
          "100%": { transform: "scale(1)",   opacity: 1 },
        },
      },
      animation: {
        glow: "glow 2.5s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        shine: "shine 3s linear infinite",
        popIn: "popIn 0.4s cubic-bezier(0.17, 0.84, 0.44, 1)",
      },
    },
  },
  plugins: [],
};