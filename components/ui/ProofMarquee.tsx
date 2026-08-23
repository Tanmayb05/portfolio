import type { Metric } from "@/lib/content-types";

type ProofMarqueeProps = {
  metrics: Metric[];
  label?: string;
};

export function ProofMarquee({ metrics, label = "Proof" }: ProofMarqueeProps) {
  const repeatedMetrics = [...metrics, ...metrics];

  return (
    <div className="overflow-hidden border-y-[3px] border-[var(--ink)] bg-[var(--yellow)] py-3 text-[var(--ink)]">
      <div className="marquee-track gap-8" aria-label={label}>
        {repeatedMetrics.map((metric, index) => (
          <span
            className="flex items-baseline gap-3 whitespace-nowrap font-mono uppercase"
            key={`${metric.value}-${metric.label}-${index}`}
          >
            <strong className="text-2xl font-black">{metric.value}</strong>
            <span className="text-xs font-black">{metric.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
