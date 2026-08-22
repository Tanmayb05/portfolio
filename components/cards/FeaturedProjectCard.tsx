import Link from "next/link";

import { ArchitecturePreview } from "@/components/cards/ArchitecturePreview";
import { MetricBadge } from "@/components/cards/MetricBadge";
import { TechStackBadge } from "@/components/cards/TechStackBadge";
import type { Project } from "@/lib/content-types";

type FeaturedProjectCardProps = {
  project: Project;
};

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <article className="motion-card motion-border-glow flex h-full flex-col rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 hover:bg-[var(--surface-elevated)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-teal)]">
            {project.category}
          </p>
          <h3 className="mt-3 text-xl font-semibold leading-tight text-[var(--text-primary)]">
            {project.shortTitle}
          </h3>
        </div>
        <p className="font-mono text-xs text-[var(--text-muted)]">
          {project.date}
        </p>
      </div>

      <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
        {project.summary}
      </p>

      <div className="mt-5">
        <ArchitecturePreview project={project} />
      </div>

      {project.metrics.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.metrics.slice(0, 2).map((metric) => (
            <MetricBadge key={metric}>{metric}</MetricBadge>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.slice(0, 4).map((tech) => (
          <TechStackBadge key={tech}>{tech}</TechStackBadge>
        ))}
      </div>

      <Link
        className="motion-focus mt-6 inline-flex text-sm font-semibold text-[var(--accent-teal)] transition duration-200 hover:text-[var(--text-primary)]"
        href={`/projects/${project.slug}`}
      >
        View case study <span aria-hidden="true" className="ml-2">-&gt;</span>
      </Link>
    </article>
  );
}
