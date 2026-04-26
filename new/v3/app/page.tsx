import Link from "next/link";

import { Reveal, StaggerGroup } from "@/components/motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { siteConfig } from "@/lib/site-config";

const quickLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Thinking", href: "/thinking" },
  { label: "Experience", href: "/experience" },
  { label: "Travel", href: "/travel" },
  { label: "Contact", href: "/contact" }
];

export default function HomePage() {
  return (
    <>
      <section className="section-gradient-hero relative overflow-hidden border-b border-[var(--border-soft)] py-24 sm:py-32">
        <div aria-hidden="true" className="soft-grid absolute inset-0" />
        <SiteContainer className="relative">
          <div className="max-w-4xl">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                Portfolio system
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-balance text-5xl font-semibold leading-none text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
                A calm technical home for what I build, write, and explore.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-[70ch] text-lg leading-8 text-[var(--text-secondary)]">
                This is the foundation for {siteConfig.name}&apos;s portfolio:
                systems, engineering notes, experience, travel, and contact
                paths organized around clear thinking and technical proof.
              </p>
            </Reveal>

            <Reveal
              className="mt-9 flex flex-wrap gap-3"
              delay={240}
              duration={480}
            >
              <Link
                className="motion-focus rounded-full bg-[var(--accent-teal)] px-5 py-3 text-sm font-semibold text-[#071018] transition duration-200 hover:brightness-110"
                href="/projects"
              >
                View Projects
              </Link>
              <Link
                className="motion-focus rounded-full border border-[var(--border-soft)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition duration-200 hover:border-[var(--accent-teal-border)] hover:bg-[var(--accent-teal-soft)]"
                href="/thinking"
              >
                Explore Thinking
              </Link>
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-thinking py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Explore"
              title="Foundation links"
              description="Page content will come later. For now, these routes mark the portfolio structure defined by the site system."
            />
          </Reveal>

          <StaggerGroup
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
            staggerDelay={70}
          >
            {quickLinks.map((item) => (
              <Link
                className="motion-card motion-border-glow motion-focus block rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]"
                href={item.href}
                key={item.href}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="ml-2 text-[var(--accent-teal)]"
                >
                  -&gt;
                </span>
              </Link>
            ))}
          </StaggerGroup>
        </SiteContainer>
      </section>
    </>
  );
}
