"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supportsReducedMotion } from "@/lib/animations";
import { projects } from "@/lib/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) {
      return;
    }

    if (supportsReducedMotion()) {
      gsap.set(track, { clearProps: "transform" });
      return;
    }

    const travel = Math.max(0, track.scrollWidth - section.clientWidth);
    if (travel <= 0) {
      return;
    }

    const tween = gsap.to(track, {
      x: -travel,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${travel}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="work-horizontal" aria-label="Horizontal project gallery">
      <div className="section-head">
        <h2>Work Snapshot</h2>
        <Link href="/work" className="inline-link">
          See all projects →
        </Link>
      </div>

      <div ref={trackRef} className="horizontal-track">
        {projects.map((project) => (
          <article key={project.slug} className="horizontal-card">
            <p className="project-meta">
              {project.year} · {project.category}
            </p>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="tag-row">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/work/${project.slug}`} className="inline-link">
              View →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
