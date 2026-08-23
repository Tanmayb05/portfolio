import type { Metadata } from "next";
import Link from "next/link";

import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { Reveal, StaggerGroup } from "@/components/motion";
import { TravelRegionSection } from "@/components/sections/TravelRegionSection";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { travelEntries, travelRegions } from "@/content/travel";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Travel & Life",
  description:
    "Map-first travel notes and life systems that add visual context outside the engineering work.",
  path: "/travel-life"
});

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
        accent="green"
        eyebrow="Life, Offline"
        intensity={2}
        title="Map-first, source-faithful."
        description="Travel notes, life systems, and visual context without inventing details."
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

      <section className="section-gradient-thinking border-b-[3px] border-[var(--ink)] py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
              <SectionHeading
                eyebrow="Life systems"
                title="I also track the systems behind everyday life."
                description="Habits, routines, experiments, and daily operating systems."
              />
          </Reveal>

          <StaggerGroup
            className="mt-10 grid gap-5 md:grid-cols-2"
            staggerDelay={80}
          >
            <article className="motion-card border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)]">
              <h3 className="text-2xl font-black uppercase leading-none text-[var(--ink)]">
                Systems for life
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {lifeSystems.map((item) => (
                  <TechStackBadge key={item}>{item}</TechStackBadge>
                ))}
              </div>
            </article>

            <article className="motion-card border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)]">
              <h3 className="text-2xl font-black uppercase leading-none text-[var(--ink)]">
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
            <div className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-6 shadow-[var(--shadow-md)] sm:p-8">
              <p className="font-mono text-xs font-black uppercase text-[var(--green)]">
                Next
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-none text-[var(--ink)] sm:text-4xl">
                Richer travel data comes from real notes.
              </h2>
              <p className="mt-5 max-w-[70ch] text-base font-semibold leading-7 text-[var(--text-secondary)]">
                The map is ready for states, provinces, places, Google Maps
                links, galleries, tags, and short reflections once I add those
                details to the source content.
              </p>
              <Link
                className="motion-focus mt-7 inline-flex border-[3px] border-[var(--ink)] bg-[var(--green)] px-4 py-3 font-mono text-sm font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
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
