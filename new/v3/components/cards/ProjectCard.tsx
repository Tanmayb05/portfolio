import Link from "next/link";

import { MetricBadge } from "@/components/cards/MetricBadge";
import { TechStackBadge } from "@/components/cards/TechStackBadge";
import type { Project } from "@/lib/content-types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="motion-card motion-border-glow flex h-full flex-col rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 hover:bg-[var(--surface-elevated)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-teal)]">
            {project.category}
          </p>
          <h2 className="mt-3 text-xl font-semibold leading-tight text-[var(--text-primary)]">
            {project.shortTitle}
          </h2>
        </div>
        <p className="font-mono text-xs text-[var(--text-muted)]">
          {project.date}
        </p>
      </div>

      <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
        {project.summary}
      </p>

      {project.metrics.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.metrics.map((metric) => (
            <MetricBadge key={metric}>{metric}</MetricBadge>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <TechStackBadge key={tech}>{tech}</TechStackBadge>
        ))}
      </div>

      <Link
        className="motion-focus mt-6 inline-flex text-sm font-semibold text-[var(--accent-teal)] transition duration-200 hover:text-[var(--text-primary)]"
        href={`/projects/${project.slug}`}
      >
        Open case study <span aria-hidden="true" className="ml-2">-&gt;</span>
      </Link>
    </article>
  );
}
