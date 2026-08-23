import type { HTMLAttributes, ReactNode } from "react";

type BrutalCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  accent?: "blue" | "purple" | "yellow" | "green" | "red";
  interactive?: boolean;
  selected?: boolean;
};

const accentClassName = {
  blue: "border-t-[var(--blue)]",
  purple: "border-t-[var(--purple)]",
  yellow: "border-t-[var(--yellow)]",
  green: "border-t-[var(--green)]",
  red: "border-t-[var(--red)]"
};

export function BrutalCard({
  children,
  className = "",
  accent = "blue",
  interactive = false,
  selected = false,
  ...props
}: BrutalCardProps) {
  return (
    <div
      className={`border-[3px] border-[var(--ink)] border-t-[10px] bg-[var(--surface-card)] p-5 shadow-[var(--shadow-md)] ${accentClassName[accent]} ${
        interactive ? "motion-card cursor-pointer" : ""
      } ${selected ? "bg-[var(--yellow)]" : ""} ${className}`}
      data-selected={selected || undefined}
      {...props}
    >
      {children}
    </div>
  );
}
