import Link from "next/link";

import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { ThinkingCard } from "@/components/cards/ThinkingCard";
import { Reveal, StaggerGroup } from "@/components/motion";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SiteContainer } from "@/components/shared/SiteContainer";
import {
  getThinkingEntriesByCategory,
  thinkingEntries
} from "@/content/thinking";

const activeEntries = thinkingEntries.filter(
  (entry) => entry.status === "active" || entry.status === "draft"
);
const plannedEntries = thinkingEntries.filter(
  (entry) => entry.status === "planned"
);
const groupedEntries = getThinkingEntriesByCategory();

export default function ThinkingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Thinking"
        title="I write to make my technical reasoning visible."
        description="This is not a chronological blog dump. I organize notes around systems, evaluation, learning, research, and the operating models I use to improve."
      />

      <section className="section-gradient-thinking border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Current"
                  title="Active and draft notes"
                  description="I keep active notes close to the top so the page reflects what I am actually thinking through now."
                />
                <div className="mt-7 flex flex-wrap gap-2">
                  <TechStackBadge>
                    {`${activeEntries.length} active/draft`}
                  </TechStackBadge>
                  <TechStackBadge>
                    {`${plannedEntries.length} planned`}
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

      <section className="section-gradient-projects border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Topics"
              title="Organized by how I think"
              description="Each category gives me a different lens: breaking down systems, evaluating technical work, running a job search process, learning deliberately, and turning research into extensions."
            />
          </Reveal>

          <div className="mt-12 space-y-12">
            {groupedEntries.map(({ category, entries }, categoryIndex) => (
              <Reveal delay={categoryIndex * 80} key={category}>
                <section className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                        Category
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
                        {category}
                      </h2>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
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
                    <p className="mt-5 text-sm leading-6 text-[var(--text-muted)]">
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
            <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                Bridge
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl">
                I connect writing back to systems I build.
              </h2>
              <p className="mt-5 max-w-[70ch] text-base leading-7 text-[var(--text-secondary)]">
                The project case studies show implementation proof. These notes
                show the reasoning patterns behind my technical choices.
              </p>
              <Link
                className="motion-focus mt-7 inline-flex rounded-full border border-[var(--border-soft)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition duration-200 hover:border-[var(--accent-teal-border)] hover:bg-[var(--accent-teal-soft)]"
                href="/projects"
              >
                View projects <span aria-hidden="true" className="ml-2">-&gt;</span>
              </Link>
            </div>
          </Reveal>
        </SiteContainer>
      </section>
    </>
  );
}
