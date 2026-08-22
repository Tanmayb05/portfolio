import Link from "next/link";

import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { Reveal, StaggerGroup } from "@/components/motion";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ResumeDownload } from "@/components/sections/ResumeDownload";
import { SkillGroup } from "@/components/sections/SkillGroup";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { resume } from "@/lib/content";

const skillGroups = [
  {
    title: "Languages",
    skills: resume.technical_skills.programming
  },
  {
    title: "Frontend and backend",
    skills: resume.technical_skills.frameworks
  },
  {
    title: "Cloud, DevOps, and tools",
    skills: resume.technical_skills.developer_tools
  },
  {
    title: "AI, ML, and data libraries",
    skills: resume.technical_skills.libraries
  }
];

const impactMetrics = [
  "50% downtime reduction",
  "44 production upgrades",
  "40% deployment effectiveness improvement",
  "200% code coverage improvement",
  "30% AWS provisioning time reduction",
  "95% infra misconfiguration catch rate"
];

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="I turn infrastructure, automation, and engineering ownership into shipped outcomes."
        description="I keep this page scannable by showing the timeline, impact, and skills that support the full resume instead of duplicating every resume bullet."
      />

      <section className="section-gradient-experience border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Resume"
                  title="I keep the full version one click away."
                  description="The page gives a focused view of my work. The resume has the complete recruiter-facing detail."
                />
                <div className="mt-7 flex flex-wrap gap-3">
                  <ResumeDownload />
                  <Link
                    className="motion-focus rounded-full border border-[var(--border-soft)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition duration-200 hover:border-[var(--accent-teal-border)] hover:bg-[var(--accent-teal-soft)]"
                    href="/contact"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 sm:p-6">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                  Impact snapshot
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {impactMetrics.map((metric) => (
                    <TechStackBadge key={metric}>{metric}</TechStackBadge>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-thinking border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Timeline"
              title="Work experience"
              description="I focus the timeline on what I shipped, automated, improved, and validated."
            />
          </Reveal>

          <div className="mt-10">
            <ExperienceTimeline roles={resume.work_experience} />
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-projects border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Skills"
              title="Compact technical map"
              description="I keep skills supportive: grouped, scan-friendly, and tied to the work instead of shown as fake proficiency meters."
            />
          </Reveal>

          <StaggerGroup
            className="mt-10 grid gap-5 md:grid-cols-2"
            staggerDelay={80}
          >
            {skillGroups.map((group) => (
              <SkillGroup
                key={group.title}
                skills={group.skills}
                title={group.title}
              />
            ))}
          </StaggerGroup>
        </SiteContainer>
      </section>

      <section className="section-gradient-experience border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Education"
              title="Academic foundation"
              description="I keep education concise and course-focused."
            />
          </Reveal>

          <StaggerGroup
            className="mt-10 grid gap-5 md:grid-cols-2"
            staggerDelay={80}
          >
            {resume.education.map((education) => (
              <article
                className="motion-card motion-border-glow rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 hover:bg-[var(--surface-elevated)] sm:p-6"
                key={`${education.institution}-${education.degree}`}
              >
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-teal)]">
                  {education.start_date} - {education.end_date}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-tight text-[var(--text-primary)]">
                  {education.degree}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {education.institution}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {education.coursework.map((course) => (
                    <TechStackBadge key={course}>{course}</TechStackBadge>
                  ))}
                </div>
              </article>
            ))}
          </StaggerGroup>
        </SiteContainer>
      </section>

      <section className="section-gradient-contact py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                    Next
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl">
                    I connect experience back to project proof.
                  </h2>
                  <p className="mt-5 max-w-[70ch] text-base leading-7 text-[var(--text-secondary)]">
                    The project pages show how I apply this experience to
                    systems, AI work, automation, and product-facing builds.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    className="motion-focus rounded-full bg-[var(--accent-teal)] px-5 py-3 text-sm font-semibold text-[#071018] transition duration-200 hover:brightness-110"
                    href="/projects"
                  >
                    View projects
                  </Link>
                  <ResumeDownload />
                </div>
              </div>
            </div>
          </Reveal>
        </SiteContainer>
      </section>
    </>
  );
}
