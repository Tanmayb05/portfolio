import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArchitecturePreview } from "@/components/cards/ArchitecturePreview";
import { CaseStudySection } from "@/components/cards/CaseStudySection";
import { MetricBadge } from "@/components/cards/MetricBadge";
import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { Reveal } from "@/components/motion";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { getProjectBySlug, projects } from "@/content/projects";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.shortTitle} | Projects`,
    description: project.summary
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="section-gradient-hero border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <Link
              className="motion-focus inline-flex text-sm font-semibold text-[var(--accent-teal)] transition duration-200 hover:text-[var(--text-primary)]"
              href="/projects"
            >
              <span aria-hidden="true" className="mr-2">&lt;-</span> Back to projects
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <Reveal>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                  {project.category} / {project.date}
                </p>
                <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
                <p className="mt-6 max-w-[70ch] text-lg leading-8 text-[var(--text-secondary)]">
                  {project.summary}
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <aside className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                  Evidence
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.metrics.length > 0 ? (
                    project.metrics.map((metric) => (
                      <MetricBadge key={metric}>{metric}</MetricBadge>
                    ))
                  ) : (
                    <span className="text-sm text-[var(--text-muted)]">
                      Metrics are not published yet.
                    </span>
                  )}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <TechStackBadge key={tech}>{tech}</TechStackBadge>
                  ))}
                </div>
              </aside>
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-projects border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                  Architecture
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl">
                  I treat the system shape as part of the proof.
                </h2>
                <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                  This preview stays intentionally minimal until the full
                  diagrams are published.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ArchitecturePreview project={project} />
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-thinking border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal>
              <CaseStudySection title="Problem" items={[project.problem]} />
            </Reveal>
            <Reveal delay={80}>
              <CaseStudySection title="Context" items={[project.context]} />
            </Reveal>
            <Reveal delay={120}>
              <CaseStudySection
                title="Architecture"
                items={project.architecture}
              />
            </Reveal>
            <Reveal delay={160}>
              <CaseStudySection
                title="Core technical decisions"
                items={project.decisions}
              />
            </Reveal>
            <Reveal delay={200}>
              <CaseStudySection title="Tradeoffs" items={project.tradeoffs} />
            </Reveal>
            <Reveal delay={240}>
              <CaseStudySection
                title="What I would improve next"
                items={project.nextImprovements}
              />
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-contact py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                Sources
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--text-primary)]">
                I keep project claims tied to the source docs.
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.source.map((source) => (
                  <span
                    className="rounded-full border border-[var(--border-soft)] bg-[var(--surface-elevated)] px-3 py-1 font-mono text-xs text-[var(--text-muted)]"
                    key={source}
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </SiteContainer>
      </section>
    </>
  );
}
