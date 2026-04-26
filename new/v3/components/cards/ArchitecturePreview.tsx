import type { Project } from "@/lib/content-types";

type ArchitecturePreviewProps = {
  project: Project;
};

const architectureSteps: Record<string, string[]> = {
  spendora: ["Expense data", "RAG tools", "LLM insight"],
  "news-headline-classification": ["400K+ headlines", "Preprocessing", "LSTM model"],
  "media-recommender": ["Media signals", "Multi-algorithm ranking", "Recommendations"],
  soundscape: ["Music API", "Room cache", "Playback services"]
};

export function ArchitecturePreview({ project }: ArchitecturePreviewProps) {
  const steps = architectureSteps[project.slug] ?? [
    "Input",
    "System layer",
    "Output"
  ];

  return (
    <div className="rounded-lg border border-[var(--border-soft)] bg-[rgba(255,255,255,0.025)] p-3">
      <div className="grid gap-2 sm:grid-cols-3">
        {steps.map((step, index) => (
          <div className="relative" key={step}>
            <div className="rounded-md border border-[var(--border-soft)] bg-[var(--surface-card)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">
              {step}
            </div>
            {index < steps.length - 1 ? (
              <div
                aria-hidden="true"
                className="absolute left-full top-1/2 z-10 hidden h-px w-2 -translate-y-1/2 bg-[var(--accent-teal-border)] sm:block"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
