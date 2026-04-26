"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/thinking", label: "Thinking" },
  { href: "/life", label: "Life" },
  { href: "/now", label: "Now" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
] as const;

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand-mark">
          TB
        </Link>

        <nav aria-label="Primary navigation" className="site-nav desktop-only">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "site-nav-link active" : "site-nav-link"}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="desktop-social desktop-only" aria-label="Social links">
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="site-nav-link">
            GitHub
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="site-nav-link"
          >
            LinkedIn
          </a>
        </div>

        <button
          type="button"
          className="mobile-menu-btn mobile-only"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={menuOpen ? "mobile-menu-overlay open" : "mobile-menu-overlay"}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="mobile-menu-nav" aria-label="Mobile navigation links">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "mobile-menu-link active" : "mobile-menu-link"}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
