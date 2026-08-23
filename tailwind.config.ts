import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background-1)",
        foreground: "var(--text-primary)",
        surface: "var(--surface-card)",
        elevated: "var(--surface-elevated)",
        border: "var(--border)",
        accent: "var(--purple)",
        muted: "var(--text-muted)",
        ink: "var(--ink)",
        paper: "var(--paper)",
        yellow: "var(--yellow)",
        red: "var(--red)",
        blue: "var(--blue)",
        green: "var(--green)",
        purple: "var(--purple)"
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "Segoe UI",
          "sans-serif"
        ],
        mono: ["JetBrains Mono", "SF Mono", "Consolas", "monospace"]
      },
      maxWidth: {
        page: "var(--page-max)",
        content: "var(--content-max)",
        reading: "var(--reading-max)"
      },
      boxShadow: {
        brutalSm: "var(--shadow-sm)",
        brutalMd: "var(--shadow-md)"
      },
      borderWidth: {
        brutal: "3px"
      }
    }
  },
  plugins: []
};

export default config;
