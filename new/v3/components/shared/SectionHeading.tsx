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
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <div className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
          {description}
        </div>
      ) : null}
    </div>
  );
}
