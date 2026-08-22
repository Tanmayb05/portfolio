import type { HTMLAttributes, ReactNode } from "react";

type SiteContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: "reading" | "default" | "wide";
};

const sizeClassName = {
  reading: "max-w-reading",
  default: "max-w-6xl",
  wide: "max-w-7xl"
};

export function SiteContainer({
  children,
  className = "",
  size = "default",
  ...props
}: SiteContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-6 lg:px-8 ${sizeClassName[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
