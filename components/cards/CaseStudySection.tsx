type CaseStudySectionProps = {
  title: string;
  items: string[];
};

export function CaseStudySection({ title, items }: CaseStudySectionProps) {
  return (
    <section className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 sm:p-6">
      <h2 className="text-xl font-semibold text-[var(--text-primary)]">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]"
            key={item}
          >
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-teal)]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
