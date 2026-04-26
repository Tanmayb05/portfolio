import Link from "next/link";

import { FeaturedProjectCard } from "@/components/cards/FeaturedProjectCard";
import { MetricBadge } from "@/components/cards/MetricBadge";
import { NowCard } from "@/components/cards/NowCard";
import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { ThinkingCard } from "@/components/cards/ThinkingCard";
import { Reveal, StaggerGroup } from "@/components/motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SiteContainer } from "@/components/shared/SiteContainer";
import {
  contactLinks,
  featuredProjects,
  nowItems,
  resume,
  resumeDownload,
  targetRoles,
  thinkingEntries,
  travelEntries,
  travelRegions
} from "@/lib/content";

const thinkingPreview = thinkingEntries.slice(0, 4);
const experiencePreview = resume.work_experience.slice(0, 2);
const coreWins = [
  "Reduced upgrade downtime by 50%",
  "Delivered 44 production upgrades in 4 months",
  "Improved deployment effectiveness by 40%"
];
const heroTags = ["Backend systems", "AI systems", "DevOps automation"];

export default function HomePage() {
  return (
    <>
      <section className="section-gradient-hero relative overflow-hidden border-b border-[var(--border-soft)] py-24 sm:py-32">
        <div aria-hidden="true" className="soft-grid absolute inset-0" />
        <SiteContainer className="relative">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
            <div className="max-w-4xl">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                  Portfolio system
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 text-balance text-5xl font-semibold leading-none text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
                  I build systems, automate workflows, and document how I think.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-7 max-w-[70ch] text-lg leading-8 text-[var(--text-secondary)]">
                  I&apos;m Tanmay Bhuskute. I work across backend engineering,
                  DevOps automation, data systems, and applied AI. I use this
                  site to connect what I build, what I&apos;m learning, and how I
                  reason through technical problems.
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

            <Reveal delay={260}>
              <aside className="motion-border-glow rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                  Current signal
                </p>
                <div className="mt-5 space-y-4">
                  {coreWins.map((win) => (
                    <div
                      className="rounded-md border border-[var(--border-soft)] bg-[var(--surface-elevated)] p-4"
                      key={win}
                    >
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {win}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {heroTags.map((tag) => (
                    <TechStackBadge key={tag}>{tag}</TechStackBadge>
                  ))}
                </div>
              </aside>
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-projects border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Proof"
                title="Featured Systems"
                description="I use projects to show technical decisions, constraints, and measurable outcomes instead of treating them like static portfolio tiles."
              />
            </Reveal>
            <Reveal delay={120}>
              <Link
                className="motion-focus inline-flex text-sm font-semibold text-[var(--accent-teal)] transition duration-200 hover:text-[var(--text-primary)]"
                href="/projects"
              >
                View all projects <span aria-hidden="true" className="ml-2">-&gt;</span>
              </Link>
            </Reveal>
          </div>

          <StaggerGroup
            className="mt-10 grid gap-5 lg:grid-cols-3"
            staggerDelay={90}
          >
            {featuredProjects.map((project) => (
              <FeaturedProjectCard key={project.slug} project={project} />
            ))}
          </StaggerGroup>
        </SiteContainer>
      </section>

      <section className="section-gradient-thinking border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Thinking"
                  title="How I reason through systems"
                  description="I'm turning technical breakdowns, evaluation notes, and career systems into structured writing."
                />
                <Link
                  className="motion-focus mt-7 inline-flex text-sm font-semibold text-[var(--accent-teal)] transition duration-200 hover:text-[var(--text-primary)]"
                  href="/thinking"
                >
                  Explore notes <span aria-hidden="true" className="ml-2">-&gt;</span>
                </Link>
              </div>
            </Reveal>

            <StaggerGroup className="grid gap-4 sm:grid-cols-2" staggerDelay={80}>
              {thinkingPreview.map((entry) => (
                <ThinkingCard entry={entry} key={entry.slug} />
              ))}
            </StaggerGroup>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-experience border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow="Experience"
                title="I ship production changes with automation and ownership."
                description="I've worked on AWS workflows, deployment automation, infrastructure validation, and production upgrades across Siemens and government engineering work."
              />
            </Reveal>

            <div className="space-y-4">
              {experiencePreview.map((role, index) => (
                <Reveal delay={index * 80} key={`${role.company}-${role.title}`}>
                  <article className="motion-card motion-border-glow rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 hover:bg-[var(--surface-elevated)]">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                          {role.title}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                          {role.company}
                        </p>
                      </div>
                      <p className="font-mono text-xs text-[var(--text-muted)]">
                        {role.start_date} - {role.end_date}
                      </p>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {role.achievements.slice(0, 3).map((achievement) => (
                        <li
                          className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]"
                          key={achievement}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-teal)]"
                          />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}

              <Reveal delay={180}>
                <div className="flex flex-wrap gap-3">
                  <Link
                    className="motion-focus rounded-full border border-[var(--border-soft)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition duration-200 hover:border-[var(--accent-teal-border)] hover:bg-[var(--accent-teal-soft)]"
                    href="/experience"
                  >
                    View experience
                  </Link>
                  <Link
                    className="motion-focus rounded-full border border-[var(--border-soft)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition duration-200 hover:border-[var(--accent-teal-border)] hover:bg-[var(--accent-teal-soft)]"
                    href={resumeDownload.href}
                  >
                    {resumeDownload.label}
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-travel border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Travel"
                  title="I'm adding a map-first layer for life outside the code."
                  description="Travel will become the most visual part of the site, but it still needs to feel native to the same calm technical system."
                />
                <div className="mt-7 flex flex-wrap gap-2">
                  {travelRegions.map((region) => (
                    <MetricBadge key={region}>{region}</MetricBadge>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="motion-card motion-border-glow rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 hover:bg-[var(--surface-elevated)]">
                <div className="grid gap-3 sm:grid-cols-3">
                  {travelEntries.map((entry) => (
                    <div
                      className="rounded-md border border-[var(--border-soft)] bg-[var(--surface-elevated)] p-4"
                      key={entry.slug}
                    >
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent-teal)]">
                        {entry.region}
                      </p>
                      <h3 className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
                        {entry.title}
                      </h3>
                      <p className="mt-2 text-xs text-[var(--text-muted)]">
                        {entry.notes[0]}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  className="motion-focus mt-5 inline-flex text-sm font-semibold text-[var(--accent-teal)] transition duration-200 hover:text-[var(--text-primary)]"
                  href="/travel"
                >
                  Open travel map <span aria-hidden="true" className="ml-2">-&gt;</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-thinking border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Currently"
              title="I'm treating the portfolio as a living system."
              description="These snapshots capture what I'm learning, improving, and systematizing right now."
            />
          </Reveal>

          <StaggerGroup
            className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            staggerDelay={80}
          >
            {nowItems.slice(0, 5).map((item) => (
              <NowCard item={item} key={item.label} />
            ))}
          </StaggerGroup>
        </SiteContainer>
      </section>

      <section className="section-gradient-contact py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                    Soft CTA
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl">
                    I&apos;m looking for roles where I can build reliable systems and keep learning fast.
                  </h2>
                  <p className="mt-5 max-w-[70ch] text-base leading-7 text-[var(--text-secondary)]">
                    I&apos;m actively applying for Summer / Fall 2026 roles across
                    backend, distributed systems, AI systems, DevOps, data, and
                    ML.
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2">
                    {targetRoles.slice(0, 4).map((role) => (
                      <TechStackBadge key={role}>{role}</TechStackBadge>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      className="motion-focus rounded-full bg-[var(--accent-teal)] px-5 py-3 text-sm font-semibold text-[#071018] transition duration-200 hover:brightness-110"
                      href="/contact"
                    >
                      Contact me
                    </Link>
                    <Link
                      className="motion-focus rounded-full border border-[var(--border-soft)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition duration-200 hover:border-[var(--accent-teal-border)] hover:bg-[var(--accent-teal-soft)]"
                      href={contactLinks.email}
                    >
                      Email directly
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </SiteContainer>
      </section>
    </>
  );
}
