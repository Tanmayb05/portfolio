import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        bgDark: "var(--bg-dark)",
        bgSurface: "var(--bg-surface)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)"
      }
    }
  },
  plugins: []
};

export default config;
