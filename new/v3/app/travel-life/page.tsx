import Link from "next/link";

import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { Reveal, StaggerGroup } from "@/components/motion";
import { TravelRegionSection } from "@/components/sections/TravelRegionSection";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { travelEntries, travelRegions } from "@/content/travel";

const lifeSystems = [
  "Scheduling systems",
  "Productivity experiments",
  "Habit design",
  "Optimization frameworks"
];

const thingsTrying = [
  "New routines",
  "Learning experiments",
  "Performance optimization attempts"
];

export default function TravelLifePage() {
  return (
    <>
      <PageHeader
        eyebrow="Travel & Life"
        title="I want Travel & Life to feel like the creative map layer of this site."
        description="I am keeping this page map-first, calm, and source-faithful. The current travel notes are placeholders, so the UI shows interaction patterns without inventing trip details."
      />

      <section className="section-gradient-travel">
        <SiteContainer>
          {travelRegions.map((region) => (
            <TravelRegionSection
              entries={travelEntries.filter((entry) => entry.region === region)}
              key={region}
              region={region}
            />
          ))}
        </SiteContainer>
      </section>

      <section className="section-gradient-thinking border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Life systems"
              title="I also track the systems behind everyday life."
              description="The source notes call out scheduling, productivity, habits, experiments, journals, and daily observations as future polished snapshots."
            />
          </Reveal>

          <StaggerGroup
            className="mt-10 grid gap-5 md:grid-cols-2"
            staggerDelay={80}
          >
            <article className="motion-card motion-border-glow rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 hover:bg-[var(--surface-elevated)]">
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                Systems for life
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {lifeSystems.map((item) => (
                  <TechStackBadge key={item}>{item}</TechStackBadge>
                ))}
              </div>
            </article>

            <article className="motion-card motion-border-glow rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 hover:bg-[var(--surface-elevated)]">
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                Things I am trying
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {thingsTrying.map((item) => (
                  <TechStackBadge key={item}>{item}</TechStackBadge>
                ))}
              </div>
            </article>
          </StaggerGroup>
        </SiteContainer>
      </section>

      <section className="section-gradient-contact py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                Next
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl">
                I will add richer travel data only when the notes are real.
              </h2>
              <p className="mt-5 max-w-[70ch] text-base leading-7 text-[var(--text-secondary)]">
                The map is ready for states, provinces, places, Google Maps
                links, galleries, tags, and short reflections once I add those
                details to the source content.
              </p>
              <Link
                className="motion-focus mt-7 inline-flex rounded-full border border-[var(--border-soft)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition duration-200 hover:border-[var(--accent-teal-border)] hover:bg-[var(--accent-teal-soft)]"
                href="/thinking"
              >
                Explore thinking <span aria-hidden="true" className="ml-2">-&gt;</span>
              </Link>
            </div>
          </Reveal>
        </SiteContainer>
      </section>
    </>
  );
}
