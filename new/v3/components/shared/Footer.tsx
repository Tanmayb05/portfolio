import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { SiteContainer } from "@/components/shared/SiteContainer";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-soft)] bg-[var(--footer-background)]">
      <SiteContainer className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
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
              className="text-sm text-[var(--text-muted)] transition duration-200 hover:text-[var(--accent-teal)]"
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
