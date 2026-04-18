"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { supportsReducedMotion } from "@/lib/animations";

const heroText = "TANMAY BHUSKUTE";

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);

  const characters = useMemo(
    () =>
      heroText.split("").map((char, idx) => ({
        key: `${char}-${idx}`,
        value: char === " " ? "\u00A0" : char
      })),
    []
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const chars = root.querySelectorAll<HTMLElement>(".hero-char");
    const subtitle = root.querySelector<HTMLElement>(".hero-subtitle");
    const actions = root.querySelector<HTMLElement>(".hero-actions");

    if (supportsReducedMotion()) {
      gsap.set([chars, subtitle, actions], { clearProps: "all", opacity: 1, y: 0 });
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

    timeline.fromTo(
      chars,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, stagger: 0.035, duration: 0.45 }
    );

    timeline.fromTo(
      subtitle,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35 },
      "-=0.18"
    );

    timeline.fromTo(
      actions,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3 },
      "-=0.15"
    );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section ref={rootRef} className="hero deck-section">
      <h1 className="hero-title deck-title" aria-label={heroText}>
        {characters.map((item) => (
          <span key={item.key} className="hero-char" aria-hidden="true">
            {item.value}
          </span>
        ))}
      </h1>

      <div className="hero-layout">
        <div className="hero-phones" aria-hidden="true">
          <article className="phone-shell">
            <div className="phone-notch" />
            <div className="phone-content phone-content-left">
              <span className="phone-pill">Systems</span>
            </div>
          </article>
          <article className="phone-shell">
            <div className="phone-notch" />
            <div className="phone-content phone-content-right">
              <span className="phone-pill">AI Builder</span>
            </div>
          </article>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Hero Section</p>
          <p className="hero-subtitle">
            Tanmay Bhuskute: Backend Engineer / AI Systems Builder. Building reliable systems,
            automation, and AI tools with focus on impact.
          </p>
          <div className="hero-actions">
            <Link className="accent-button" href="/work">
              Explore Work
            </Link>
            <Link className="ghost-button" href="/resume">
              Open Resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
