import type { Project } from "@/lib/content-types";

type ArchitecturePreviewProps = {
  project: Project;
};

export function ArchitecturePreview({ project }: ArchitecturePreviewProps) {
  const steps = project.architecture.nodes.filter((node) =>
    ["input", "process", "output"].includes(node.kind ?? "")
  );

  return (
    <div className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-3 shadow-[var(--shadow-sm)]">
      <div className="grid gap-2 sm:grid-cols-3">
        {steps.map((step, index) => (
          <div className="relative" key={step.id}>
            <div className="border-2 border-[var(--ink)] bg-[var(--paper)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)]">
              <span className="block font-mono text-[0.65rem] font-black uppercase text-[var(--ink)]">
                {step.label}
              </span>
              <span className="mt-1 block line-clamp-2">{step.detail}</span>
            </div>
            {index < steps.length - 1 ? (
              <div
                aria-hidden="true"
                className="absolute left-full top-1/2 z-10 hidden h-[3px] w-2 -translate-y-1/2 bg-[var(--ink)] sm:block"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
