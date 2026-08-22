"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.localStorage.getItem("theme") === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <button
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="motion-focus inline-flex h-9 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-card)] px-3 text-xs font-medium text-[var(--text-secondary)] transition duration-200 hover:border-[var(--accent-teal-border)] hover:text-[var(--text-primary)]"
      type="button"
      onClick={toggleTheme}
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full bg-[var(--accent-teal)] shadow-[0_0_18px_var(--accent-teal-soft)]"
      />
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}
