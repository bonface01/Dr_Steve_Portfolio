import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        royal: "#1D4ED8",
        navy: "#0F172A",
        surface: "#F8FAFC",
        slateText: "#475569",
        institutional: "#1E3A8A",
        gold: "#B28E5E"
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        institutional: "0 18px 50px rgba(15, 23, 42, 0.12)"
      },
      backgroundImage: {
        "academic-wash":
          "linear-gradient(180deg, rgba(29, 78, 216, 0.08), rgba(255, 255, 255, 0.92)), radial-gradient(circle at top left, rgba(29, 78, 216, 0.12), transparent 34%)"
      }
    }
  },
  plugins: [typography]
};

export default config;
