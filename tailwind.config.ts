import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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
        accent: "var(--accent-teal)",
        muted: "var(--text-muted)"
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
        reading: "48rem"
      }
    }
  },
  plugins: []
};

export default config;
