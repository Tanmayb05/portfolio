import type { HTMLAttributes, ReactNode } from "react";

type SiteContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: "reading" | "default" | "wide";
};

const sizeClassName = {
  reading: "var(--reading-max)",
  default: "var(--content-max)",
  wide: "var(--page-max)"
};

export function SiteContainer({
  children,
  className = "",
  size = "default",
  style,
  ...props
}: SiteContainerProps) {
  return (
    <div
      className={`mx-auto box-border w-full px-[var(--gutter-mobile)] sm:px-[var(--gutter-tablet)] lg:px-[var(--gutter-desktop)] ${className}`}
      style={{
        maxWidth: `min(${sizeClassName[size]}, 100vw)`,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
