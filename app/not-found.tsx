import Link from "next/link";

import { SiteContainer } from "@/components/shared/SiteContainer";
import { StickerBadge } from "@/components/ui/StickerBadge";

export default function NotFound() {
  return (
    <section className="section-gradient-contact min-h-[70vh] border-b-[3px] border-[var(--ink)] py-[var(--space-section-mobile)] sm:py-[var(--space-section-desktop)]">
      <SiteContainer size="reading">
        <div className="border-[3px] border-[var(--ink)] bg-[var(--paper)] p-6 shadow-[var(--shadow-md)] sm:p-8">
          <StickerBadge tone="red">404</StickerBadge>
          <h1 className="mt-5 text-[length:var(--text-h1)] font-black uppercase leading-[0.9] text-[var(--ink)]">
            System not found.
          </h1>
          <p className="mt-6 border-t-[3px] border-[var(--ink)] pt-5 text-base font-semibold leading-7 text-[var(--text-secondary)]">
            The route does not exist in this portfolio OS. Return to the base
            system or scan the active sections.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              className="motion-focus inline-flex min-h-11 items-center justify-center border-[3px] border-[var(--ink)] bg-[var(--red)] px-4 py-2 font-mono text-sm font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
              href="/"
            >
              &lt;- Return to base
            </Link>
            <Link
              className="motion-focus inline-flex min-h-11 items-center justify-center border-[3px] border-[var(--ink)] bg-[var(--white)] px-4 py-2 font-mono text-sm font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
              href="/projects"
            >
              View systems
            </Link>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
