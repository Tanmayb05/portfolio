import Link from "next/link";

import { FeaturedProjectCard } from "@/components/cards/FeaturedProjectCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Reveal, StaggerGroup } from "@/components/motion";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { featuredProjects, projectCategories, projects } from "@/content/projects";

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="I build projects as systems, not static demos."
        description="I use this page to document the problem, architecture, technical decisions, tradeoffs, and measurable outcomes behind my strongest work."
      />

      <section className="section-gradient-projects border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Featured"
                title="Featured Systems"
                description="These projects best represent my current technical direction across AI systems, deep learning, and recommendation systems."
              />
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-wrap gap-2">
                {projectCategories.map((category) => (
                  <span
                    className="rounded-full border border-[var(--border-soft)] bg-[var(--surface-card)] px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]"
                    key={category}
                  >
                    {category}
                  </span>
                ))}
              </div>
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
          <Reveal>
            <SectionHeading
              eyebrow="All Projects"
              title="Case study library"
              description="Each page starts with verified source facts and leaves deeper notes marked as planned where I have not published details yet."
            />
          </Reveal>

          <StaggerGroup
            className="mt-10 grid gap-5 md:grid-cols-2"
            staggerDelay={80}
          >
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
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
                I connect project proof with how I think.
              </h2>
              <p className="mt-5 max-w-[70ch] text-base leading-7 text-[var(--text-secondary)]">
                The Thinking page expands the reasoning patterns behind these
                systems: evaluation, system design, ML rigor, and structured
                learning.
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
