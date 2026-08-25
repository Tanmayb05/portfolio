import Link from "next/link";

import { MetricBadge } from "@/components/cards/MetricBadge";
import { TechStackBadge } from "@/components/cards/TechStackBadge";
import type { Project } from "@/lib/content-types";

type FeaturedProjectCardProps = {
  project: Project;
};

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <article className="motion-card flex h-full flex-col border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-black uppercase text-[var(--blue)]">
            {project.category}
          </p>
          <h3 className="mt-3 text-2xl font-black uppercase leading-none text-[var(--ink)]">
            {project.shortTitle}
          </h3>
        </div>
        <p className="border-2 border-[var(--ink)] bg-[var(--paper)] px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-[var(--ink)]">
          {project.date}
        </p>
      </div>

      <p className="mt-4 border-t-[3px] border-dashed border-[var(--ink)] pt-4 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
        {project.shortDescription}
      </p>

      {project.metrics.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.metrics.slice(0, 2).map((metric) => (
            <MetricBadge key={`${metric.value}-${metric.label}`}>
              {metric.value}
            </MetricBadge>
          ))}
        </div>
      ) : null}

      <div className="mt-auto">
        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <TechStackBadge key={tech}>{tech}</TechStackBadge>
          ))}
        </div>

        <Link
          className="motion-focus mt-6 inline-flex w-fit border-[3px] border-[var(--ink)] bg-[var(--blue)] px-3 py-2 font-mono text-xs font-black uppercase text-white shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
          href={`/projects/${project.slug}`}
        >
          View project <span aria-hidden="true" className="ml-2">-&gt;</span>
        </Link>
      </div>
    </article>
  );
}
