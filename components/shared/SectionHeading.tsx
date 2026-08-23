import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-reading ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow ? (
        <p className="mb-3 font-mono text-[length:var(--text-mono-label)] font-bold uppercase text-[var(--purple)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-[length:var(--text-h2)] font-black leading-none text-[var(--text-primary)]">
        {title}
      </h2>
      {description ? (
        <div className="mt-4 text-[length:var(--text-body)] leading-7 text-[var(--text-secondary)]">
          {description}
        </div>
      ) : null}
    </div>
  );
}
