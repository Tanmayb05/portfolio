import type { ReactNode } from "react";

import { SiteContainer } from "@/components/shared/SiteContainer";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="section-gradient-hero border-b border-[var(--border-soft)] py-24 sm:py-28">
      <SiteContainer size="reading">
        {eyebrow ? (
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-balance text-4xl font-semibold leading-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <div className="mt-6 max-w-[70ch] text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            {description}
          </div>
        ) : null}
      </SiteContainer>
    </section>
  );
}
