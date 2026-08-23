import type { HTMLAttributes, ReactNode } from "react";

type SectionBandProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  tone?: "paper" | "blue" | "purple" | "yellow" | "green" | "red" | "white";
};

const toneClassName = {
  paper: "bg-[var(--paper)]",
  blue: "bg-[#edf2ff]",
  purple: "bg-[#f5ecff]",
  yellow: "bg-[#fff8d5]",
  green: "bg-[#eaffef]",
  red: "bg-[#ffe8e8]",
  white: "bg-[var(--white)]"
};

export function SectionBand({
  children,
  className = "",
  tone = "paper",
  ...props
}: SectionBandProps) {
  return (
    <section
      className={`border-b-[3px] border-[var(--ink)] py-[var(--space-section-mobile)] sm:py-[var(--space-section-desktop)] ${toneClassName[tone]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
