import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { SiteContainer } from "@/components/shared/SiteContainer";

export function Footer() {
  return (
    <footer className="border-t-[3px] border-[var(--ink)] bg-[var(--footer-background)]">
      <SiteContainer className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="w-fit border-2 border-[var(--ink)] bg-[var(--white)] px-2 py-1 font-mono text-sm font-black uppercase text-[var(--text-primary)] shadow-[2px_2px_0_var(--ink)]">
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-reading text-sm leading-6 text-[var(--text-muted)]">
            A living portfolio for systems, notes, technical proof, and personal
            exploration.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-4">
          {siteConfig.navItems.map((item) => (
            <Link
              className="motion-focus border-2 border-[var(--ink)] bg-[var(--white)] px-2 py-1 font-mono text-xs font-black uppercase text-[var(--ink)] shadow-[2px_2px_0_var(--ink)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SiteContainer>
    </footer>
  );
}
