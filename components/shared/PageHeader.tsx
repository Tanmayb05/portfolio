import type { ReactNode } from "react";

import { SiteContainer } from "@/components/shared/SiteContainer";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  accent?: "blue" | "purple" | "yellow" | "green" | "red";
  intensity?: 1 | 2 | 3;
};

const accentClassName = {
  blue: "bg-[#edf2ff] text-[var(--blue)]",
  purple: "bg-[#f5ecff] text-[var(--purple)]",
  yellow: "bg-[#fff8d5] text-[var(--ink)]",
  green: "bg-[#eaffef] text-[var(--ink)]",
  red: "bg-[#ffe8e8] text-[var(--red)]"
};

const intensityClassName = {
  1: "py-16 sm:py-20",
  2: "py-[var(--space-section-mobile)] sm:py-24",
  3: "py-[var(--space-section-mobile)] sm:py-[var(--space-section-desktop)]"
};

export function PageHeader({
  eyebrow,
  title,
  description,
  accent = "purple",
  intensity = 2
}: PageHeaderProps) {
  return (
    <section
      className={`border-b-[3px] border-[var(--ink)] ${accentClassName[accent]} ${intensityClassName[intensity]}`}
    >
      <SiteContainer size="reading">
        {eyebrow ? (
          <p className="mb-5 w-fit border-2 border-[var(--ink)] bg-[var(--white)] px-2 py-1 font-mono text-[length:var(--text-mono-label)] font-black uppercase text-[var(--ink)] shadow-[2px_2px_0_var(--ink)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-balance text-[length:var(--text-h1)] font-black leading-[0.95] text-[var(--text-primary)]">
          {title}
        </h1>
        {description ? (
          <div className="mt-6 max-w-[70ch] text-[length:var(--text-body-lg)] leading-8 text-[var(--text-secondary)]">
            {description}
          </div>
        ) : null}
      </SiteContainer>
    </section>
  );
}
