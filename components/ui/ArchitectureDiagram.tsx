import type { CSSProperties } from "react";

import type { Accent, Architecture } from "@/lib/content-types";

type ArchitectureDiagramProps = {
  architecture: Architecture;
  accent?: Accent;
  title?: string;
  description?: string;
  direction?: "horizontal" | "vertical" | "branching";
  compact?: boolean;
  className?: string;
};

type DiagramStyle = CSSProperties & {
  "--diagram-accent": string;
};

const accentColor: Record<Accent, string> = {
  blue: "var(--blue)",
  purple: "var(--purple)",
  yellow: "var(--yellow)",
  green: "var(--green)",
  red: "var(--red)"
};

export function ArchitectureDiagram({
  architecture,
  accent = "purple",
  title = "System architecture",
  description,
  direction = "horizontal",
  compact = false,
  className = ""
}: ArchitectureDiagramProps) {
  const incomingEdgesByTarget = new Map(
    architecture.nodes.map((node) => [
      node.id,
      architecture.edges.filter((edge) => edge.to === node.id)
    ])
  );
  const nodeById = new Map(architecture.nodes.map((node) => [node.id, node]));
  const layoutClassName =
    direction === "vertical"
      ? "grid-cols-1"
      : direction === "branching"
        ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-5";
  const style: DiagramStyle = {
    "--diagram-accent": accentColor[accent]
  };

  return (
    <figure
      className={`min-w-0 max-w-full border-[3px] border-[var(--ink)] bg-[var(--white)] p-4 shadow-[var(--shadow-md)] ${className}`}
      style={style}
    >
      <figcaption className="break-words font-mono text-[0.72rem] font-black uppercase text-[var(--ink)]">
        <span className="mr-2 inline-block border-2 border-[var(--ink)] bg-[var(--diagram-accent)] px-2 py-1 text-[var(--ink)]">
          Flow
        </span>
        {title}
      </figcaption>
      {description ? (
        <p className="mt-3 max-w-[70ch] break-words text-sm font-semibold leading-6 text-[var(--text-secondary)]">
          {description}
        </p>
      ) : null}

      <ol className={`mt-4 grid gap-3 ${layoutClassName}`}>
        {architecture.nodes.map((node, index) => {
          const incomingEdges = incomingEdgesByTarget.get(node.id) ?? [];

          return (
            <li className="relative" key={node.id}>
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className={`absolute bg-[var(--ink)] ${
                    direction === "vertical"
                      ? "-top-3 left-6 h-3 w-[3px]"
                      : "-left-3 top-8 hidden h-[3px] w-3 xl:block"
                  }`}
                />
              ) : null}
              <div
                className={`h-full border-[3px] border-[var(--ink)] bg-[var(--paper)] p-3 ${
                  compact ? "min-h-28" : "min-h-36"
                }`}
              >
                <span className="font-mono text-[0.65rem] font-black uppercase text-[var(--diagram-accent)]">
                  {node.kind ?? "node"} {String(index + 1).padStart(2, "0")}
                </span>
                <strong className="mt-2 block text-base font-black leading-tight text-[var(--ink)]">
                  {node.label}
                </strong>
                {incomingEdges.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {incomingEdges.map((edge) => (
                      <span
                        className="break-words border border-[var(--ink)] bg-[var(--white)] px-1.5 py-0.5 font-mono text-[0.62rem] font-black uppercase text-[var(--text-muted)]"
                        key={`${edge.from}-${edge.to}-${edge.label ?? "edge"}`}
                      >
                        {edge.label ?? `${edge.from} ->`}
                      </span>
                    ))}
                  </div>
                ) : null}
                {node.detail ? (
                  <p
                    className={`mt-2 break-words leading-5 text-[var(--text-secondary)] ${
                      compact ? "text-xs" : "text-sm"
                    }`}
                  >
                    {node.detail}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      {architecture.edges.length > 0 ? (
        <div className="mt-4 border-t-[3px] border-dashed border-[var(--ink)] pt-3">
          <p className="font-mono text-[0.68rem] font-black uppercase text-[var(--text-muted)]">
            Routes
          </p>
          <ul className="mt-2 grid min-w-0 gap-2 text-xs font-semibold leading-5 text-[var(--text-secondary)] sm:grid-cols-2">
            {architecture.edges.map((edge) => {
              const from = nodeById.get(edge.from)?.label ?? edge.from;
              const to = nodeById.get(edge.to)?.label ?? edge.to;

              return (
                <li
                  className="min-w-0 border-2 border-[var(--ink)] bg-[var(--paper)] px-2 py-1"
                  key={`${edge.from}-${edge.to}-${edge.label ?? "route"}`}
                >
                  <span className="break-words font-mono font-black uppercase text-[var(--ink)]">
                    {from} -&gt; {to}
                  </span>
                  {edge.label ? (
                    <span className="block break-words text-[var(--text-muted)]">
                      {edge.label}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </figure>
  );
}
