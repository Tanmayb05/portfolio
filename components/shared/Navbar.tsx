"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/site-config";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--nav-background)] backdrop-blur-xl">
      <SiteContainer className="flex h-16 items-center justify-between">
        <Link
          className="motion-focus rounded-sm text-sm font-semibold tracking-normal text-[var(--text-primary)] transition duration-200 hover:text-[var(--accent-teal)]"
          href="/"
        >
          {siteConfig.name}
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {siteConfig.navItems.map((item) => (
            <Link
              className={`motion-focus rounded-full px-3 py-2 text-sm text-[var(--text-secondary)] transition duration-200 hover:bg-[var(--accent-teal-soft)] hover:text-[var(--text-primary)] ${
                isActive(item.href) ? "motion-active" : ""
              }`}
              data-active={isActive(item.href)}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            className="motion-focus hidden rounded-full border border-[var(--border-soft)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] transition duration-200 hover:border-[var(--accent-teal-border)] hover:text-[var(--text-primary)] sm:inline-flex"
            href="/experience"
          >
            Resume
          </Link>
          <button
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="motion-focus inline-flex h-9 items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-card)] px-3 text-xs font-medium text-[var(--text-secondary)] transition duration-200 hover:border-[var(--accent-teal-border)] hover:text-[var(--text-primary)] md:hidden"
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            Menu
          </button>
          <ThemeToggle />
        </div>
      </SiteContainer>

      {isMenuOpen ? (
        <div className="border-t border-[var(--border-soft)] bg-[var(--nav-background)] backdrop-blur-xl md:hidden">
          <SiteContainer className="py-3">
            <nav aria-label="Mobile navigation" className="grid gap-1">
              {siteConfig.navItems.map((item) => (
                <Link
                  className={`motion-focus rounded-lg px-3 py-3 text-sm text-[var(--text-secondary)] transition duration-200 hover:bg-[var(--accent-teal-soft)] hover:text-[var(--text-primary)] ${
                    isActive(item.href) ? "motion-active" : ""
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                className="motion-focus rounded-lg px-3 py-3 text-sm text-[var(--text-secondary)] transition duration-200 hover:bg-[var(--accent-teal-soft)] hover:text-[var(--text-primary)]"
                href="/experience"
              >
                Resume
              </Link>
            </nav>
          </SiteContainer>
        </div>
      ) : null}
    </header>
  );
}
