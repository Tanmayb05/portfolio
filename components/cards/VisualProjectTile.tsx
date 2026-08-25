import Link from "next/link";
import type { CSSProperties } from "react";

import { StickerBadge } from "@/components/ui/StickerBadge";
import type { Accent, Metric, Project } from "@/lib/content-types";

type VisualProjectTileProps = {
  project: Project;
};

type TileStyle = CSSProperties & {
  "--tile-accent": string;
};

const accentColor: Record<Accent, string> = {
  blue: "var(--blue)",
  purple: "var(--purple)",
  yellow: "var(--yellow)",
  green: "var(--green)",
  red: "var(--red)"
};

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trim()}...`;
}

function findScaleMetric(metrics: Metric[]) {
  return metrics.find((metric) =>
    /api|coverage|dataset|event|function|processed|scale|tool|track|zone/i.test(
      `${metric.value} ${metric.label} ${metric.context ?? ""}`
    )
  );
}

export function VisualProjectTile({ project }: VisualProjectTileProps) {
  const style: TileStyle = {
    "--tile-accent": accentColor[project.accent]
  };
  const scaleMetric = findScaleMetric(project.metrics);
  const resultMetric =
    project.metrics.find((metric) => metric !== scaleMetric) ??
    scaleMetric ??
    null;

  return (
    <Link
      aria-label={`Open ${project.name} project`}
      className="motion-focus motion-card group flex h-full min-h-[28rem] flex-col border-[3px] border-[var(--ink)] bg-[var(--white)] p-4 shadow-[var(--shadow-md)] focus-visible:outline-none"
      data-analytics-event="project_open"
      data-analytics-payload={JSON.stringify({
        slug: project.slug,
        surface: "visual_project_tile"
      })}
      href={`/projects/${project.slug}`}
      style={style}
    >
      <article className="flex h-full flex-col">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <StickerBadge tone={project.accent}>
            {project.featuredOrder
              ? `System ${String(project.featuredOrder).padStart(2, "0")}`
              : "System"}
          </StickerBadge>
          <span className="border-2 border-[var(--ink)] bg-[var(--paper)] px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-[var(--ink)]">
            {project.category}
          </span>
        </div>

        <h3 className="mt-5 text-[length:var(--text-h3)] font-black uppercase leading-none text-[var(--tile-accent)]">
          {project.name}
        </h3>
        <p className="mt-3 border-b-[3px] border-dashed border-[var(--ink)] pb-4 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
          {truncate(project.shortDescription, 132)}
        </p>

        <dl className="mt-5 grid gap-3 text-sm">
          <div>
            <dt className="font-mono text-[0.68rem] font-black uppercase text-[var(--text-muted)]">
              Problem
            </dt>
            <dd className="mt-1 leading-5 text-[var(--text-secondary)]">
              {truncate(project.problem, 118)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.68rem] font-black uppercase text-[var(--text-muted)]">
              Built
            </dt>
            <dd className="mt-1 leading-5 text-[var(--text-secondary)]">
              {truncate(project.built, 118)}
            </dd>
          </div>
        </dl>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <figure className="border-[3px] border-[var(--ink)] bg-[var(--paper)] p-3">
            <figcaption className="font-mono text-[0.66rem] font-black uppercase text-[var(--text-muted)]">
              Scale
            </figcaption>
            {scaleMetric ? (
              <>
                <strong className="mt-2 block text-lg font-black leading-tight text-[var(--ink)]">
                  {scaleMetric.value}
                </strong>
                <p className="mt-1 text-xs font-semibold leading-4 text-[var(--text-secondary)]">
                  {scaleMetric.source}
                </p>
              </>
            ) : (
              <p className="mt-2 text-xs font-semibold leading-4 text-[var(--text-muted)]">
                Not published
              </p>
            )}
          </figure>
          <figure className="border-[3px] border-[var(--ink)] bg-[var(--paper)] p-3">
            <figcaption className="font-mono text-[0.66rem] font-black uppercase text-[var(--text-muted)]">
              Result
            </figcaption>
            {resultMetric ? (
              <>
                <strong className="mt-2 block text-lg font-black leading-tight text-[var(--ink)]">
                  {resultMetric.value}
                </strong>
                <p className="mt-1 text-xs font-semibold leading-4 text-[var(--text-secondary)]">
                  {resultMetric.source}
                </p>
              </>
            ) : (
              <p className="mt-2 text-xs font-semibold leading-4 text-[var(--text-muted)]">
                Not published
              </p>
            )}
          </figure>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              className="border-2 border-[var(--ink)] bg-[var(--white)] px-2 py-1 font-mono text-[0.66rem] font-black uppercase text-[var(--ink)]"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>

        <span className="mt-auto inline-flex w-fit items-center border-[3px] border-[var(--ink)] bg-[var(--tile-accent)] px-3 py-2 font-mono text-sm font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-[2px_2px_0_var(--ink)]">
          Open project <span aria-hidden="true" className="ml-2">-&gt;</span>
        </span>
      </article>
      </Link>
  );
}
