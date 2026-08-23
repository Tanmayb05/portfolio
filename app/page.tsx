import type { Metadata } from "next";
import Link from "next/link";

import { MetricBadge } from "@/components/cards/MetricBadge";
import { NowCard } from "@/components/cards/NowCard";
import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { ThinkingCard } from "@/components/cards/ThinkingCard";
import { VisualProjectTile } from "@/components/cards/VisualProjectTile";
import { Reveal, StaggerGroup } from "@/components/motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { BrutalButton } from "@/components/ui/BrutalButton";
import { CurrentlyPanel } from "@/components/ui/CurrentlyPanel";
import { MetricBlock } from "@/components/ui/MetricBlock";
import { RecruiterMode } from "@/components/ui/RecruiterMode";
import { StickerBadge } from "@/components/ui/StickerBadge";
import { SystemBuilder } from "@/components/home/SystemBuilder";
import { createPageMetadata } from "@/lib/metadata";
import {
  contactLinks,
  featuredProjects,
  nowItems,
  resume,
  resumeDownload,
  selectedImpactMetrics,
  targetRoles,
  thinkingEntries,
  travelEntries,
  travelRegions
} from "@/lib/content";

export const metadata: Metadata = createPageMetadata({
  title: "Tanmay Bhuskute",
  description:
    "Software engineer building cloud infrastructure, AI systems, and reliable software.",
  path: "/"
});

const thinkingPreview = thinkingEntries.slice(0, 4);
const experiencePreview = resume.work_experience.slice(0, 2);
const currentFocus =
  nowItems.find((item) => item.label === "Current focus")?.items ??
  nowItems[0]?.items ??
  [];
const recruiterMetrics = selectedImpactMetrics.slice(0, 4);
const heroBadges = [
  resume.education[0]?.degree ?? "M.S. Computer Science",
  "Cloud / Backend / AI Systems",
  targetRoles[0],
  "Currently building"
];

export default function HomePage() {
  return (
    <>
      <section className="section-gradient-hero relative overflow-hidden border-b-[3px] border-[var(--ink)] py-10 sm:py-14">
        <div aria-hidden="true" className="soft-grid absolute inset-0" />
        <SiteContainer className="relative" size="wide">
          <div className="border-[3px] border-[var(--ink)] bg-[var(--paper)] p-3 shadow-[var(--shadow-md)] sm:p-6 lg:p-8">
            <div className="grid min-w-0 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="min-w-0">
                <Reveal>
                  <div className="flex flex-wrap items-center gap-3">
                    <StickerBadge tone="white">Hello, I&apos;m</StickerBadge>
                    <span className="font-mono text-xs font-black uppercase text-[var(--purple)]">
                      Portfolio OS / v4
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <h1 className="mt-5 text-[2.1rem] font-black uppercase leading-[0.82] tracking-normal text-[var(--ink)] min-[360px]:text-[2.35rem] min-[420px]:text-[3.1rem] sm:text-[5.75rem] lg:text-[7.25rem] xl:text-[8rem]">
                    <span className="block whitespace-nowrap">Tanmay</span>
                    <span className="block whitespace-nowrap">Bhuskute</span>
                  </h1>
                </Reveal>
                <Reveal delay={140}>
                  <p className="mt-6 max-w-[44rem] border-t-[3px] border-[var(--ink)] pt-4 text-[length:var(--text-body-lg)] font-semibold leading-8 text-[var(--text-primary)]">
                    Software engineer building cloud infrastructure, AI systems,
                    and reliable software.
                  </p>
                </Reveal>
                <Reveal
                  className="mt-6 flex flex-wrap gap-3"
                  delay={200}
                  duration={480}
                >
                  {heroBadges.map((badge, index) => (
                    <StickerBadge
                      key={badge}
                      tone={index === heroBadges.length - 1 ? "yellow" : "white"}
                    >
                      {badge}
                    </StickerBadge>
                  ))}
                </Reveal>
                <Reveal
                  className="mt-7 flex flex-wrap gap-3"
                  delay={260}
                  duration={480}
                >
                  <BrutalButton href="/projects">View systems</BrutalButton>
                  <BrutalButton href="/thinking" variant="outline">
                    Read notes
                  </BrutalButton>
                </Reveal>
              </div>

              <Reveal>
                <div className="grid min-w-0 gap-5">
                  <RecruiterMode
                    emailHref={contactLinks.email}
                    focus="Backend, distributed systems, AI systems, DevOps, and data roles."
                    linkedinHref={contactLinks.linkedin}
                    metrics={recruiterMetrics}
                    name={resume.name}
                    resumeHref={resumeDownload.href}
                    role="Software Engineer"
                  />
                  <CurrentlyPanel
                    items={currentFocus.slice(0, 4)}
                    status="Open to New Grad / Internship roles"
                    title="Currently"
                  />
                </div>
              </Reveal>
            </div>
            <div
              aria-hidden="true"
              className="mt-8 h-3 border-t-[3px] border-dashed border-[var(--ink)]"
            />
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-hero border-b-[3px] border-[var(--ink)] py-14 sm:py-16">
        <SiteContainer size="wide">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.55fr] lg:items-stretch">
            <Reveal>
              <div className="flex h-full flex-col justify-between border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <StickerBadge tone="purple">01</StickerBadge>
                    <p className="font-mono text-xs font-black uppercase text-[var(--text-muted)]">
                      Selected Impact
                    </p>
                  </div>
                  <h2 className="mt-5 text-[length:var(--text-h2)] font-black uppercase leading-none text-[var(--ink)]">
                    Proof before biography.
                  </h2>
                </div>
                <p className="mt-6 max-w-[38rem] border-t-[3px] border-[var(--ink)] pt-4 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
                  Sourced metrics from production engineering, cloud automation,
                  and AI systems research. Each number has one primary home here
                  so the rest of the page can stay focused.
                </p>
              </div>
            </Reveal>

            <StaggerGroup
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
              staggerDelay={70}
            >
              {selectedImpactMetrics.map((metric) => (
                <MetricBlock
                  accent="purple"
                  className="min-h-[15rem]"
                  key={metric.id}
                  metric={metric}
                />
              ))}
            </StaggerGroup>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-projects border-b-[3px] border-[var(--ink)] py-14 sm:py-16">
        <SiteContainer size="wide">
          <div className="border-[3px] border-[var(--ink)] bg-[var(--paper)] p-4 shadow-[var(--shadow-md)] sm:p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <Reveal>
                <div className="flex flex-wrap items-end gap-3">
                  <StickerBadge tone="purple">02</StickerBadge>
                  <div>
                    <p className="font-mono text-xs font-black uppercase text-[var(--text-muted)]">
                      Featured Systems
                    </p>
                    <h2 className="mt-2 text-[length:var(--text-h2)] font-black uppercase leading-none text-[var(--ink)]">
                      Things worth clicking.
                    </h2>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <Link
                  className="motion-focus inline-flex border-[3px] border-[var(--ink)] bg-[var(--white)] px-3 py-2 font-mono text-xs font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
                  href="/projects"
                >
                  View all projects <span aria-hidden="true" className="ml-2">-&gt;</span>
                </Link>
              </Reveal>
            </div>

            <StaggerGroup
              className="mt-8 grid gap-5 lg:grid-cols-3"
              staggerDelay={90}
            >
              {featuredProjects.map((project) => (
                <VisualProjectTile key={project.slug} project={project} />
              ))}
            </StaggerGroup>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-hero border-b-[3px] border-[var(--ink)] py-14 sm:py-16">
        <SiteContainer size="wide">
          <Reveal>
            <SystemBuilder />
          </Reveal>
        </SiteContainer>
      </section>

      <section className="section-gradient-thinking border-b-[3px] border-[var(--ink)] py-20 sm:py-24">
        <SiteContainer>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Notes From The Build"
                title="Short notes. Deeper clicks."
                description="Systems, evaluation, learning, and research notes."
              />
            </Reveal>
            <Reveal delay={120}>
              <Link
                className="motion-focus inline-flex border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-3 py-2 font-mono text-xs font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
                href="/thinking"
              >
                Explore notes <span aria-hidden="true" className="ml-2">-&gt;</span>
              </Link>
            </Reveal>
          </div>

          <StaggerGroup
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={80}
          >
            {thinkingPreview.map((entry) => (
              <ThinkingCard entry={entry} key={entry.slug} />
            ))}
          </StaggerGroup>
        </SiteContainer>
      </section>

      <section className="section-gradient-experience border-b-[3px] border-[var(--ink)] py-20 sm:py-24">
        <SiteContainer>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow="War Stories"
                title="Production and research snapshots."
                description="Role, outcome, and one reason to click."
              />
            </Reveal>

            <div className="space-y-4">
              {experiencePreview.map((role, index) => (
                <Reveal delay={index * 80} key={`${role.company}-${role.title}`}>
                  <article className="motion-card border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)]">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                          <h3 className="text-xl font-black uppercase leading-none text-[var(--ink)]">
                            {role.title}
                          </h3>
                        <p className="mt-2 text-sm font-semibold text-[var(--text-secondary)]">
                          {role.company}
                        </p>
                      </div>
                      <p className="border-2 border-[var(--ink)] bg-[var(--paper)] px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-[var(--ink)]">
                        {role.start_date} - {role.end_date}
                      </p>
                    </div>
                    <ul className="mt-5 space-y-3 border-t-[3px] border-dashed border-[var(--ink)] pt-5">
                      {role.achievements.slice(0, 1).map((achievement) => (
                        <li
                          className="grid grid-cols-[auto_1fr] gap-3 text-sm font-semibold leading-6 text-[var(--text-secondary)]"
                          key={achievement}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-2 w-2 border-2 border-[var(--ink)] bg-[var(--purple)]"
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
                    className="motion-focus inline-flex border-[3px] border-[var(--ink)] bg-[var(--purple)] px-4 py-2 font-mono text-xs font-black uppercase text-white shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
                    href="/experience"
                  >
                    View experience
                  </Link>
                  <Link
                    className="motion-focus inline-flex border-[3px] border-[var(--ink)] bg-[var(--white)] px-4 py-2 font-mono text-xs font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
                    data-analytics-event="resume_download"
                    data-analytics-payload={JSON.stringify({ surface: "home_experience" })}
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

      <section className="section-gradient-travel border-b-[3px] border-[var(--ink)] py-20 sm:py-24">
        <SiteContainer>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Life Offline"
                  title="Map-first breather."
                  description="Travel notes and life systems, source-faithful."
                />
                <div className="mt-7 flex flex-wrap gap-2">
                  {travelRegions.map((region) => (
                    <MetricBadge key={region}>{region}</MetricBadge>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="motion-card border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)]">
                <div className="grid gap-3 sm:grid-cols-3">
                  {travelEntries.map((entry) => (
                    <div
                      className="border-[3px] border-[var(--ink)] bg-[var(--paper)] p-4"
                      key={entry.slug}
                    >
                      <p className="font-mono text-xs font-black uppercase text-[var(--green)]">
                        {entry.region}
                      </p>
                      <h3 className="mt-3 text-sm font-black uppercase leading-none text-[var(--ink)]">
                        {entry.title}
                      </h3>
                      <p className="mt-2 text-xs font-semibold leading-5 text-[var(--text-muted)]">
                        {entry.notes[0]}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  className="motion-focus mt-5 inline-flex border-[3px] border-[var(--ink)] bg-[var(--green)] px-3 py-2 font-mono text-xs font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
                  href="/travel-life"
                >
                  Open Travel & Life <span aria-hidden="true" className="ml-2">-&gt;</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-thinking border-b-[3px] border-[var(--ink)] py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
              <SectionHeading
                eyebrow="Currently"
                title="What I'm experimenting with."
                description="Current signals only. Longer context stays off the homepage."
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
            <div className="border-[3px] border-[var(--ink)] bg-[var(--paper)] p-6 shadow-[var(--shadow-md)] sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
                <div>
                  <p className="font-mono text-xs font-black uppercase text-[var(--red)]">
                    Available for
                  </p>
                  <h2 className="mt-4 text-3xl font-black uppercase leading-none text-[var(--ink)] sm:text-5xl">
                    Software Engineering
                    <br />
                    Cloud / Backend / AI Systems
                  </h2>
                  <p className="mt-5 max-w-[70ch] border-t-[3px] border-[var(--ink)] pt-4 text-base font-semibold leading-7 text-[var(--text-secondary)]">
                    Cincinnati, OH. Actively applying for New Grad roles or
                    Internships.
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
                      className="motion-focus inline-flex border-[3px] border-[var(--ink)] bg-[var(--red)] px-4 py-3 font-mono text-sm font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
                      data-analytics-event="email_click"
                      data-analytics-payload={JSON.stringify({ surface: "home_contact" })}
                      href={contactLinks.email}
                    >
                      Email me
                    </Link>
                    <Link
                      className="motion-focus inline-flex border-[3px] border-[var(--ink)] bg-[var(--white)] px-4 py-3 font-mono text-sm font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
                      data-analytics-event="linkedin_click"
                      data-analytics-payload={JSON.stringify({ surface: "home_contact" })}
                      href={contactLinks.linkedin}
                    >
                      LinkedIn
                    </Link>
                    <Link
                      className="motion-focus inline-flex border-[3px] border-[var(--ink)] bg-[var(--white)] px-4 py-3 font-mono text-sm font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
                      data-analytics-event="resume_download"
                      data-analytics-payload={JSON.stringify({ surface: "home_contact" })}
                      href={resumeDownload.href}
                    >
                      Resume
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
