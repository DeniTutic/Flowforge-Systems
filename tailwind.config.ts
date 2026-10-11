import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ember: single brand accent. `DEFAULT` passes WCAG AA on paper/white (5.2:1),
        // `bright` is for glows, gradients and hover surfaces only — never body text.
        primary: {
          DEFAULT: "#C2410C",
          dark: "#9A3412",
          bright: "#EA580C",
          light: "#FB923C",
        },
        ink: {
          DEFAULT: "#0B0F14",
          soft: "#151B23",
          card: "#1A212B",
        },
        paper: {
          DEFAULT: "#F7F6F3",
          soft: "#FFFFFF",
          muted: "#EFEDE8",
        },
        steel: {
          DEFAULT: "#5F6673",
          dark: "#9AA3B2",
        },
        // Legacy aliases still used across components
        text: {
          DEFAULT: "#0B0F14",
          light: "#5F6673",
        },
      },
      borderColor: {
        line: "rgb(11 15 20 / 0.08)",
        "line-dark": "rgb(255 255 255 / 0.10)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        body: ["1.0625rem", { lineHeight: "1.65" }],
      },
      letterSpacing: {
        display: "-0.03em",
        heading: "-0.02em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "underline-in": {
          "0%": { transform: "scaleX(0.35)", opacity: "0.5" },
          "100%": { transform: "scaleX(1)", opacity: "1" },
        },
      },
      animation: {
        "underline-in": "underline-in 0.22s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
