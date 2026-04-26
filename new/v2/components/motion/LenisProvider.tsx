"use client";

import { useEffect } from "react";
import { supportsReducedMotion } from "@/lib/animations";
import { createLenis } from "@/lib/lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (supportsReducedMotion()) {
      return;
    }

    const lenis = createLenis();
    let rafId = 0;

    const frame = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(frame);
    };

    rafId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
