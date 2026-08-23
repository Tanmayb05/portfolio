type MetricBadgeProps = {
  children: string;
};

export function MetricBadge({ children }: MetricBadgeProps) {
  return (
    <span className="inline-block max-w-full whitespace-normal break-words border-2 border-[var(--ink)] bg-[var(--yellow)] px-2.5 py-1 font-mono text-[0.68rem] font-black uppercase text-[var(--ink)] shadow-[2px_2px_0_var(--ink)]">
      {children}
    </span>
  );
}
