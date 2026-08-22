type MetricBadgeProps = {
  children: string;
};

export function MetricBadge({ children }: MetricBadgeProps) {
  return (
    <span className="inline-flex rounded-full border border-[var(--accent-teal-border)] bg-[var(--accent-teal-soft)] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--accent-teal)]">
      {children}
    </span>
  );
}
