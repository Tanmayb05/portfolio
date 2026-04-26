"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeUpConfig, supportsReducedMotion } from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Reveal({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) {
      return;
    }

    if (supportsReducedMotion()) {
      gsap.set(node, { opacity: 1, y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      node,
      { opacity: fadeUpConfig.opacity, y: fadeUpConfig.y },
      {
        opacity: 1,
        y: 0,
        duration: fadeUpConfig.duration,
        ease: fadeUpConfig.ease,
        scrollTrigger: {
          trigger: node,
          start: "top 84%",
          once: true
        }
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={nodeRef} className={className}>
      {children}
    </div>
  );
}
