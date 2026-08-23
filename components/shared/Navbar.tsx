"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/site-config";
import { SiteContainer } from "@/components/shared/SiteContainer";

const accentClassName = {
  blue: "data-[active=true]:bg-[var(--blue)] data-[active=true]:text-white",
  purple: "data-[active=true]:bg-[var(--purple)] data-[active=true]:text-white",
  yellow: "data-[active=true]:bg-[var(--yellow)] data-[active=true]:text-[var(--ink)]",
  green: "data-[active=true]:bg-[var(--green)] data-[active=true]:text-[var(--ink)]",
  red: "data-[active=true]:bg-[var(--red)] data-[active=true]:text-[var(--ink)]"
} as const;

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
    <header className="sticky top-1 z-50 border-b-[3px] border-[var(--ink)] bg-[var(--nav-background)]">
      <SiteContainer className="flex min-h-[5.25rem] items-center justify-between gap-4 py-3">
        <Link
          className="motion-focus group flex min-h-14 items-center border-[3px] border-[var(--ink)] bg-[var(--white)] pr-4 text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
          href="/"
        >
          <span className="grid h-14 w-14 place-items-center border-r-[3px] border-[var(--ink)] bg-[var(--purple)] font-mono text-xl font-black text-white">
            TB
          </span>
          <span className="ml-3 flex flex-col leading-none">
            <span className="font-mono text-[0.66rem] font-black uppercase text-[var(--text-muted)]">
              System
            </span>
            <span className="mt-1 text-sm font-black uppercase">
              Tanmay
              <br />
              Bhuskute
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden flex-1 items-stretch justify-end gap-2 xl:flex"
        >
          {siteConfig.navItems.map((item, index) => (
            <Link
              className={`motion-focus flex min-h-14 min-w-[8.75rem] items-center gap-3 border-[3px] border-[var(--ink)] bg-[var(--white)] px-3 py-2 text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)] ${accentClassName[item.accent]}`}
              data-active={isActive(item.href)}
              href={item.href}
              key={item.href}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center border-2 border-[var(--ink)] bg-[var(--white)] font-mono text-sm font-black text-[var(--ink)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-black uppercase leading-none">
                  {item.label}
                </span>
                <span className="mt-1 block truncate font-mono text-[0.68rem] font-bold leading-none">
                  {item.realName}
                </span>
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            className="motion-focus hidden min-h-11 items-center border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-3 font-mono text-xs font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)] sm:inline-flex"
            data-analytics-event="resume_download"
            data-analytics-payload={JSON.stringify({ surface: "navbar" })}
            href="/resume.pdf"
          >
            Resume
          </Link>
          <button
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="motion-focus inline-flex min-h-11 items-center border-[3px] border-[var(--ink)] bg-[var(--white)] px-3 font-mono text-xs font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)] xl:hidden"
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
          <span
            aria-label="Paper Mode is the active v4 theme"
            className="hidden border-2 border-[var(--ink)] bg-[var(--yellow)] px-2 py-1 font-mono text-[0.65rem] font-black uppercase text-[var(--ink)] shadow-[2px_2px_0_var(--ink)] sm:inline-flex"
          >
            Paper
          </span>
        </div>
      </SiteContainer>

      {isMenuOpen ? (
        <div className="border-t-[3px] border-[var(--ink)] bg-[var(--paper)] xl:hidden">
          <SiteContainer className="py-4">
            <nav aria-label="Mobile navigation" className="grid gap-3">
              {siteConfig.navItems.map((item, index) => (
                <Link
                  className={`motion-focus flex min-h-[4.5rem] items-center gap-3 border-[3px] border-[var(--ink)] bg-[var(--white)] px-3 py-3 text-[var(--ink)] shadow-[var(--shadow-sm)] ${accentClassName[item.accent]}`}
                  data-active={isActive(item.href)}
                  href={item.href}
                  key={item.href}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-[var(--ink)] bg-[var(--white)] font-mono text-sm font-black text-[var(--ink)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-base font-black uppercase leading-none">
                      {item.label}
                    </span>
                    <span className="mt-2 block font-mono text-xs font-bold uppercase leading-none">
                      {item.realName}
                    </span>
                  </span>
                </Link>
              ))}
              <Link
                className="motion-focus flex min-h-[4.5rem] items-center justify-center border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-3 py-3 font-mono text-sm font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)]"
                data-analytics-event="resume_download"
                data-analytics-payload={JSON.stringify({ surface: "mobile_nav" })}
                href="/resume.pdf"
              >
                Resume / One click
              </Link>
            </nav>
          </SiteContainer>
        </div>
      ) : null}
    </header>
  );
}
