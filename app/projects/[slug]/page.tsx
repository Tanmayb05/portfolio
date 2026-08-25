import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CaseStudySection } from "@/components/cards/CaseStudySection";
import { MetricBadge } from "@/components/cards/MetricBadge";
import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { Reveal, StaggerGroup } from "@/components/motion";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { BrutalButton } from "@/components/ui/BrutalButton";
import { StickerBadge } from "@/components/ui/StickerBadge";
import { getProjectBySlug, projects } from "@/content/projects";
import type { Accent, Project } from "@/lib/content-types";
import { createPageMetadata } from "@/lib/metadata";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

type CaseStudyBlock = {
  eyebrow: string;
  title: string;
  items: string[];
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
    ...createPageMetadata({
      title: `${project.shortTitle} Case Study`,
      description: project.summary,
      path: `/projects/${project.slug}`,
      imagePath: `/projects/${project.slug}/opengraph-image`,
      type: "article"
    })
  };
}

function resultItems(project: Project) {
  if (project.metrics.length === 0) {
    return [
      "No headline result metric is published yet; this page keeps unsupported claims out of the story."
    ];
  }

  return project.metrics.map((metric) =>
    [metric.value, metric.label, metric.context, metric.source]
      .filter(Boolean)
      .join(" - ")
  );
}

function linkItems(project: Project) {
  const links = [
    project.github ? `GitHub: ${project.github}` : null,
    project.demo ? `Demo: ${project.demo}` : null,
    `Source docs: ${project.source.join(", ")}`
  ].filter(Boolean);

  return links as string[];
}

function caseStudyBlocks(project: Project): CaseStudyBlock[] {
  return [
    {
      eyebrow: "01",
      title: "TL;DR",
      items: [
        project.summary,
        project.outcome
          ? `Best published result: ${project.outcome}`
          : "Result metrics are not published yet."
      ]
    },
    {
      eyebrow: "02",
      title: "Problem",
      items: [project.problem]
    },
    {
      eyebrow: "03",
      title: "My Role",
      items: [
        project.ownership.model,
        ...project.ownership.exactOwnership,
        `Before: ${project.ownership.whatExistedBefore}`,
        `Personally designed: ${project.ownership.personallyDesigned.join("; ")}`,
        `Others owned: ${project.ownership.collaboratorsOwned}`
      ]
    },
    {
      eyebrow: "04",
      title: "Constraints",
      items: [project.context]
    },
    {
      eyebrow: "06",
      title: "Key Technical Decisions",
      items: project.decisions
    },
    {
      eyebrow: "07",
      title: "Implementation",
      items: project.implementation
    },
    {
      eyebrow: "08",
      title: "What Broke / What Didn't Work",
      items: project.failureNotes
    },
    {
      eyebrow: "09",
      title: "Results",
      items: resultItems(project)
    },
    {
      eyebrow: "10",
      title: "What I'd Change Now",
      items: project.nextImprovements
    },
    {
      eyebrow: "11",
      title: "Stack",
      items: project.techStack
    },
    {
      eyebrow: "12",
      title: "Links",
      items: linkItems(project)
    }
  ];
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const blocks = caseStudyBlocks(project);
  const openingBlocks = blocks.slice(0, 4);
  const detailBlocks = blocks.slice(4);
  const accent = project.accent as Accent;

  return (
    <>
      <section className="section-gradient-projects border-b-[3px] border-[var(--ink)] py-16 sm:py-20">
        <SiteContainer size="reading">
          <Reveal>
            <Link
              className="motion-focus inline-flex border-[3px] border-[var(--ink)] bg-[var(--white)] px-3 py-2 font-mono text-xs font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
              href="/projects"
            >
              <span aria-hidden="true" className="mr-2">
                &lt;-
              </span>
              Back to projects
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 border-[3px] border-[var(--ink)] bg-[var(--paper)] p-5 shadow-[var(--shadow-md)] sm:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <StickerBadge tone={project.accent}>
                  Level 1 Case Study
                </StickerBadge>
                <span className="font-mono text-xs font-black uppercase text-[var(--text-muted)]">
                  {project.category} / {project.date}
                </span>
              </div>
              <h1 className="mt-6 min-w-0 text-balance text-[length:var(--text-h1)] font-black uppercase leading-[0.95] text-[var(--ink)]">
                {project.title}
              </h1>
              <p className="mt-6 max-w-[70ch] border-t-[3px] border-[var(--ink)] pt-5 text-[length:var(--text-body-lg)] font-semibold leading-8 text-[var(--text-secondary)]">
                {project.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.metrics.length > 0 ? (
                  project.metrics.map((metric) => (
                    <MetricBadge key={`${metric.value}-${metric.label}`}>
                      {metric.value}
                    </MetricBadge>
                  ))
                ) : (
                  <TechStackBadge>No published metric yet</TechStackBadge>
                )}
              </div>
            </div>
          </Reveal>
        </SiteContainer>
      </section>

      <section className="section-gradient-hero border-b-[3px] border-[var(--ink)] py-16 sm:py-20">
        <SiteContainer>
          <StaggerGroup
            className="grid gap-5 lg:grid-cols-2"
            staggerDelay={70}
          >
            {openingBlocks.map((block) => (
              <CaseStudySection
                accent={accent}
                eyebrow={block.eyebrow}
                items={block.items}
                key={`${block.eyebrow}-${block.title}`}
                title={block.title}
              />
            ))}
          </StaggerGroup>
        </SiteContainer>
      </section>

      <section className="section-gradient-projects border-b-[3px] border-[var(--ink)] py-16 sm:py-20">
        <SiteContainer>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <CaseStudySection
                accent={accent}
                eyebrow="05"
                items={project.architectureSummary}
                title="Architecture"
              />
            </Reveal>
            <Reveal delay={120}>
              <ArchitectureDiagram
                accent={accent}
                architecture={project.architecture}
                description={project.built}
                direction="branching"
                title={`${project.shortTitle} system flow`}
              />
            </Reveal>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-thinking border-b-[3px] border-[var(--ink)] py-16 sm:py-20">
        <SiteContainer>
          <StaggerGroup
            className="grid gap-5 lg:grid-cols-2"
            staggerDelay={70}
          >
            {detailBlocks.map((block) => (
              <CaseStudySection
                accent={accent}
                eyebrow={block.eyebrow}
                items={block.items}
                key={`${block.eyebrow}-${block.title}`}
                title={block.title}
              />
            ))}
          </StaggerGroup>
        </SiteContainer>
      </section>

      <section className="section-gradient-contact py-16 sm:py-20">
        <SiteContainer size="reading">
          <Reveal>
            <div className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-6 shadow-[var(--shadow-md)] sm:p-8">
              <StickerBadge tone={project.accent}>Deep dive prompts</StickerBadge>
              <h2 className="mt-5 text-3xl font-black uppercase leading-none text-[var(--ink)]">
                Ask me about the trade-offs.
              </h2>
              <ul className="mt-5 space-y-3">
                {project.askMeAbout.map((prompt) => (
                  <li
                    className="grid grid-cols-[auto_1fr] gap-3 text-sm font-semibold leading-6 text-[var(--text-secondary)]"
                    key={prompt}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 border-2 border-[var(--ink)] bg-[var(--red)]"
                    />
                    <span>{prompt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <BrutalButton
                  href="/contact"
                  analyticsEvent="case_study_depth"
                  analyticsPayload={{ slug: project.slug, surface: "deep_dive_prompts" }}
                >
                  Contact me
                </BrutalButton>
                <BrutalButton href="/projects" variant="outline">
                  More projects
                </BrutalButton>
                {project.github ? (
                  <BrutalButton
                    href={project.github}
                    variant="outline"
                    analyticsEvent="github_click"
                    analyticsPayload={{ slug: project.slug, surface: "case_study_links" }}
                  >
                    GitHub
                  </BrutalButton>
                ) : null}
                {project.demo ? (
                  <BrutalButton
                    href={project.demo}
                    variant="outline"
                    analyticsEvent="demo_click"
                    analyticsPayload={{ slug: project.slug, surface: "case_study_links" }}
                  >
                    Demo
                  </BrutalButton>
                ) : null}
              </div>
            </div>
          </Reveal>
        </SiteContainer>
      </section>
    </>
  );
}
