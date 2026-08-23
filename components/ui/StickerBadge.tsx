import type { HTMLAttributes, ReactNode } from "react";

type StickerBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: "white" | "yellow" | "blue" | "green" | "purple" | "red";
};

const toneClassName = {
  white: "bg-[var(--white)]",
  yellow: "bg-[var(--yellow)]",
  blue: "bg-[var(--blue)] text-white",
  green: "bg-[var(--green)]",
  purple: "bg-[var(--purple)] text-white",
  red: "bg-[var(--red)]"
};

export function StickerBadge({
  children,
  className = "",
  tone = "white",
  ...props
}: StickerBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center border-2 border-[var(--ink)] px-2 py-1 font-mono text-[0.7rem] font-black uppercase leading-none text-[var(--ink)] shadow-[2px_2px_0_var(--ink)] ${toneClassName[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
