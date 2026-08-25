import type { Metadata } from "next";

import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { Reveal, StaggerGroup } from "@/components/motion";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ResumeDownload } from "@/components/sections/ResumeDownload";
import { SkillGroup } from "@/components/sections/SkillGroup";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { BrutalButton } from "@/components/ui/BrutalButton";
import { resume } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Experience",
  description:
    "Production ownership, research proof, technical skills, and resume-ready experience snapshots.",
  path: "/experience"
});

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
        accent="purple"
        eyebrow="War Stories"
        intensity={2}
        title="Production ownership, research proof."
        description="Timeline first. Resume depth stays one click away."
      />

      <section className="section-gradient-experience border-b-[3px] border-[var(--ink)] py-20 sm:py-24">
        <SiteContainer>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Resume"
                  title="I keep the full version one click away."
                  description="This page shows role snapshots, outcomes, and tools. The PDF carries the complete recruiter version."
                />
                <div className="mt-7 flex flex-wrap gap-3">
                  <ResumeDownload />
                  <BrutalButton href="/contact" variant="outline">
                    Contact
                  </BrutalButton>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)] sm:p-6">
                <p className="font-mono text-xs font-black uppercase text-[var(--purple)]">
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

      <section className="section-gradient-thinking border-b-[3px] border-[var(--ink)] py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Timeline"
              title="Work experience"
              description="What shipped, what changed, and what was measured."
            />
          </Reveal>

          <div className="mt-10">
            <ExperienceTimeline roles={resume.work_experience} />
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-projects border-b-[3px] border-[var(--ink)] py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Skills"
              title="Compact technical map"
              description="Grouped tools, no fake proficiency meters."
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

      <section className="section-gradient-experience border-b-[3px] border-[var(--ink)] py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Education"
              title="Academic foundation"
              description="Concise, course-focused, and connected to current AI systems work."
            />
          </Reveal>

          <StaggerGroup
            className="mt-10 grid gap-5 md:grid-cols-2"
            staggerDelay={80}
          >
            {resume.education.map((education) => (
              <article
                className="motion-card flex h-full flex-col border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)] sm:p-6"
                key={`${education.institution}-${education.degree}`}
              >
                <p className="font-mono text-xs font-black uppercase text-[var(--purple)]">
                  {education.start_date} - {education.end_date}
                </p>
                <h3 className="mt-3 text-2xl font-black uppercase leading-none text-[var(--ink)]">
                  {education.degree}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
                  {education.institution}
                </p>
                {education.gpa ? (
                  <p className="mt-2 font-mono text-xs font-black uppercase text-[var(--purple)]">
                    GPA {education.gpa}
                  </p>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-2">
                  {education.coursework.map((course) => (
                    <TechStackBadge key={course}>{course}</TechStackBadge>
                  ))}
                </div>
                {education.activities.length > 0 ? (
                  <p className="mt-4 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
                    {education.activities.join(", ")}
                  </p>
                ) : null}
              </article>
            ))}
          </StaggerGroup>
        </SiteContainer>
      </section>

      <section className="section-gradient-contact py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <div className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-6 shadow-[var(--shadow-md)] sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
                <div>
                  <p className="font-mono text-xs font-black uppercase text-[var(--purple)]">
                    Next
                  </p>
                  <h2 className="mt-4 text-3xl font-black uppercase leading-none text-[var(--ink)] sm:text-4xl">
                    Experience connects to projects.
                  </h2>
                  <p className="mt-5 max-w-[70ch] text-base font-semibold leading-7 text-[var(--text-secondary)]">
                    Project pages show the architecture, implementation, and
                    trade-offs behind the same systems work.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <BrutalButton href="/projects">
                    View projects
                  </BrutalButton>
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
