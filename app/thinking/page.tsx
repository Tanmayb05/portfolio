import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";

import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { ThinkingCard } from "@/components/cards/ThinkingCard";
import { Reveal, StaggerGroup } from "@/components/motion";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { MaraudersGate } from "@/components/thinking/MaraudersGate";
import {
  getThinkingEntriesByCategory,
  thinkingEntries
} from "@/content/thinking";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Thinking",
  description:
    "Compact notes on systems, evaluation, learning loops, career systems, and research.",
  path: "/thinking"
});

const activeEntries = thinkingEntries.filter(
  (entry) => entry.status === "active" || entry.status === "draft"
);
const plannedEntries = thinkingEntries.filter(
  (entry) => entry.status === "planned"
);
const groupedEntries = getThinkingEntriesByCategory();

export default function ThinkingPage() {
  const isUnlocked = cookies().get("marauders-unlocked")?.value === "true";

  return (
    <>
      <PageHeader
        accent="yellow"
        eyebrow="Brain Dump"
        intensity={2}
        title="Notes from the build."
        description="Compact notes on systems, evaluation, learning loops, and research."
      />

      {!isUnlocked ? (
        <MaraudersGate />
      ) : (
        <>
      <section className="section-gradient-thinking border-b-[3px] border-[var(--ink)] py-20 sm:py-24">
        <SiteContainer>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Current"
                  title="Active drafts"
                  description="Fresh notes stay compact here; full reading lives behind the click."
                />
                <div className="mt-7 flex flex-wrap gap-2">
                  <TechStackBadge>
                    {`${activeEntries.length} mid-crisis`}
                  </TechStackBadge>
                  <TechStackBadge>
                    {`${plannedEntries.length} someday, maybe`}
                  </TechStackBadge>
                </div>
              </div>
            </Reveal>

            <StaggerGroup className="grid gap-4" staggerDelay={80}>
              {activeEntries.map((entry) => (
                <ThinkingCard entry={entry} key={entry.slug} />
              ))}
            </StaggerGroup>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-projects border-b-[3px] border-[var(--ink)] py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Topics"
              title="Organized by how I think"
              description="Different lenses for technical decisions, research, job search systems, and learning."
            />
          </Reveal>

          <div className="mt-12 space-y-12">
            {groupedEntries.map(({ category, entries }, categoryIndex) => (
              <Reveal delay={categoryIndex * 80} key={category}>
                <section className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)] sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="font-mono text-xs font-black uppercase text-[var(--ink)]">
                        Category
                      </p>
                      <h2 className="mt-2 text-2xl font-black uppercase leading-none text-[var(--ink)]">
                        {category}
                      </h2>
                    </div>
                    <span className="border-2 border-[var(--ink)] bg-[var(--yellow)] px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-[var(--ink)]">
                      {entries.length} notes
                    </span>
                  </div>

                  {entries.length > 0 ? (
                    <StaggerGroup
                      className="mt-6 grid gap-4 md:grid-cols-2"
                      staggerDelay={60}
                    >
                      {entries.map((entry) => (
                        <ThinkingCard entry={entry} key={entry.slug} />
                      ))}
                    </StaggerGroup>
                  ) : (
                    <p className="mt-5 text-sm font-semibold leading-6 text-[var(--text-muted)]">
                      I have not published a note in this category yet.
                    </p>
                  )}
                </section>
              </Reveal>
            ))}
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-contact py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <div className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-6 shadow-[var(--shadow-md)] sm:p-8">
              <p className="font-mono text-xs font-black uppercase text-[var(--ink)]">
                Bridge
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-none text-[var(--ink)] sm:text-4xl">
                Writing connects back to systems.
              </h2>
              <p className="mt-5 max-w-[70ch] text-base font-semibold leading-7 text-[var(--text-secondary)]">
                The project case studies show implementation proof. These notes
                show the reasoning patterns behind my technical choices.
              </p>
              <Link
                className="motion-focus mt-7 inline-flex border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-4 py-3 font-mono text-sm font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
                href="/projects"
              >
                View projects <span aria-hidden="true" className="ml-2">-&gt;</span>
              </Link>
            </div>
          </Reveal>
        </SiteContainer>
      </section>
        </>
      )}
    </>
  );
}
