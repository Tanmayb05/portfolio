type TechStackBadgeProps = {
  children: string;
};

export function TechStackBadge({ children }: TechStackBadgeProps) {
  return (
    <span className="inline-flex rounded-full border border-[var(--border-soft)] bg-[var(--surface-elevated)] px-2.5 py-1 text-xs text-[var(--text-secondary)]">
      {children}
    </span>
  );
}
