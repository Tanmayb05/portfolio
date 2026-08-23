import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { AnalyticsEventName, AnalyticsPayload } from "@/lib/analytics";

type BrutalButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline" | "ghost";
  analyticsEvent?: AnalyticsEventName;
  analyticsPayload?: AnalyticsPayload;
};

const variantClassName = {
  solid: "bg-[var(--yellow)] text-[var(--ink)]",
  outline: "bg-[var(--white)] text-[var(--ink)]",
  ghost: "bg-transparent text-[var(--ink)] shadow-none"
};

const baseClassName =
  "motion-focus inline-flex min-h-11 items-center justify-center border-[3px] border-[var(--ink)] px-4 py-2 font-mono text-sm font-black uppercase transition disabled:cursor-not-allowed disabled:opacity-50";

export function BrutalButton({
  children,
  className = "",
  href,
  variant = "solid",
  disabled,
  analyticsEvent,
  analyticsPayload,
  ...props
}: BrutalButtonProps) {
  const classes = `${baseClassName} ${variantClassName[variant]} ${
    variant === "ghost" ? "" : "shadow-[var(--shadow-sm)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none"
  } ${className}`;
  const analyticsProps = analyticsEvent
    ? {
        "data-analytics-event": analyticsEvent,
        "data-analytics-payload": analyticsPayload
          ? JSON.stringify(analyticsPayload)
          : undefined
      }
    : {};

  if (href && !disabled) {
    return (
      <Link className={classes} href={href} {...analyticsProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      type="button"
      {...analyticsProps}
      {...props}
    >
      {children}
    </button>
  );
}
