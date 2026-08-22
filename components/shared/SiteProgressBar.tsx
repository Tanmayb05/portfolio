"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SEGMENTS = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/thinking", label: "Thinking" },
  { href: "/travel-life", label: "Travel & Life" },
  { href: "/contact", label: "Contact" }
] as const;

function segmentIndexForPath(pathname: string) {
  const index = SEGMENTS.findIndex((segment) =>
    segment.href === "/"
      ? pathname === "/"
      : pathname === segment.href || pathname.startsWith(`${segment.href}/`)
  );
  return index === -1 ? 0 : index;
}

export function SiteProgressBar() {
  const pathname = usePathname();
  const currentIndex = segmentIndexForPath(pathname);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function updateScrollProgress() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] flex h-1 gap-px bg-[var(--border-soft)]"
    >
      {SEGMENTS.map((segment, index) => {
        const fill =
          index < currentIndex ? 100 : index === currentIndex ? scrollProgress : 0;

        return (
          <div
            className="relative flex-1 overflow-hidden bg-[var(--surface-elevated)]"
            key={segment.href}
          >
            <div
              className="h-full bg-[var(--accent-teal)] transition-[width] duration-150 ease-out"
              style={{ width: `${fill}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
