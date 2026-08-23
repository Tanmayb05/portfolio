import type { Metric } from "@/lib/content-types";

type MetricBlockProps = {
  metric: Metric;
  accent?: "blue" | "purple" | "yellow" | "green" | "red";
  className?: string;
};

const accentClassName = {
  blue: "bg-[#edf2ff]",
  purple: "bg-[#f5ecff]",
  yellow: "bg-[#fff8d5]",
  green: "bg-[#eaffef]",
  red: "bg-[#ffe8e8]"
};

const valueClassName = {
  blue: "text-[var(--blue)]",
  purple: "text-[var(--purple)]",
  yellow: "text-[var(--ink)]",
  green: "text-[var(--ink)]",
  red: "text-[var(--red)]"
};

export function MetricBlock({
  metric,
  accent = "purple",
  className = ""
}: MetricBlockProps) {
  return (
    <figure
      className={`border-[3px] border-[var(--ink)] p-4 shadow-[var(--shadow-md)] ${accentClassName[accent]} ${className}`}
    >
      <strong className={`block text-[4rem] font-black leading-none sm:text-[4.5rem] xl:text-[4.25rem] ${valueClassName[accent]}`}>
        {metric.value}
      </strong>
      <figcaption className="mt-3 text-base font-black leading-tight text-[var(--ink)]">
        {metric.label}
      </figcaption>
      {metric.context || metric.source ? (
        <p className="mt-2 font-mono text-[0.72rem] leading-5 text-[var(--text-muted)]">
          {[metric.context, metric.source].filter(Boolean).join(" / ")}
        </p>
      ) : null}
    </figure>
  );
}
