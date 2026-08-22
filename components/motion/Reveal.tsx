"use client";

import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState
} from "react";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
};

type RevealStyle = CSSProperties & {
  "--reveal-delay"?: string;
  "--reveal-duration"?: string;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 520,
  once = true,
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once]);

  const revealStyle: RevealStyle = {
    ...style,
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration}ms`
  };

  return (
    <div
      className={`motion-reveal ${className}`}
      data-visible={isVisible}
      ref={ref}
      style={revealStyle}
      {...props}
    >
      {children}
    </div>
  );
}
