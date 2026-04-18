import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { AboutSnapshot } from "@/components/sections/AboutSnapshot";
import { Hero } from "@/components/sections/Hero";
import { HorizontalGallery } from "@/components/sections/HorizontalGallery";
import { StatsBar } from "@/components/sections/StatsBar";
import { TechGrid } from "@/components/sections/TechGrid";
import { ThinkingSnapshot } from "@/components/sections/ThinkingSnapshot";

export default function HomePage() {
  return (
    <section className="page container home-stack">
      <Hero />

      <Reveal>
        <AboutSnapshot />
      </Reveal>

      <Reveal>
        <StatsBar />
      </Reveal>

      <HorizontalGallery />

      <Reveal>
        <TechGrid />
      </Reveal>

      <Reveal>
        <ThinkingSnapshot />
      </Reveal>

      <Reveal>
        <section className="surface now-teaser deck-section">
          <p className="eyebrow">Current Focus</p>
          <h2>Applying for Summer / Fall 2026 roles. Focusing on System Design, DSA, and project building.</h2>
          <Link href="/now" className="inline-link">
            See full /now →
          </Link>
        </section>
      </Reveal>
    </section>
  );
}
