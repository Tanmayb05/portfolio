import type { Metadata } from "next";
import Link from "next/link";

import { ProjectCard } from "@/components/cards/ProjectCard";
import { VisualProjectTile } from "@/components/cards/VisualProjectTile";
import { Reveal, StaggerGroup } from "@/components/motion";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { featuredProjects, projectCategories, projects } from "@/content/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description:
    "Case studies for AI systems, data platforms, cloud automation, and product-facing software.",
  path: "/projects"
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        accent="blue"
        eyebrow="Things I Built"
        intensity={2}
        title="Systems, proof, trade-offs."
        description="Scan the cards. Open a case study when you want the engineering story."
      />

      <section className="section-gradient-projects border-b-[3px] border-[var(--ink)] py-20 sm:py-24">
        <SiteContainer>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Featured"
                title="Featured Systems"
                description="The strongest current proof across AI systems, data platforms, and product-facing software."
              />
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-wrap gap-2">
                {projectCategories.map((category) => (
                  <span
                    className="border-2 border-[var(--ink)] bg-[var(--white)] px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-[var(--ink)]"
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
              <VisualProjectTile key={project.slug} project={project} />
            ))}
          </StaggerGroup>
        </SiteContainer>
      </section>

      <section className="section-gradient-thinking border-b-[3px] border-[var(--ink)] py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="All Projects"
              title="Case study library"
              description="Each page keeps source-backed claims up front and deeper detail behind the click."
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
            <div className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-6 shadow-[var(--shadow-md)] sm:p-8">
              <p className="font-mono text-xs font-black uppercase text-[var(--blue)]">
                Next
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-none text-[var(--ink)] sm:text-4xl">
                Want the reasoning layer?
              </h2>
              <p className="mt-5 max-w-[70ch] text-base font-semibold leading-7 text-[var(--text-secondary)]">
                Thinking notes show how I evaluate systems, learning loops, and
                technical decisions.
              </p>
              <Link
                className="motion-focus mt-7 inline-flex border-[3px] border-[var(--ink)] bg-[var(--blue)] px-4 py-3 font-mono text-sm font-black uppercase text-white shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
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
