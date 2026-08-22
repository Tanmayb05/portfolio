import type { NowItem } from "@/lib/content-types";

type NowCardProps = {
  item: NowItem;
};

export function NowCard({ item }: NowCardProps) {
  return (
    <article className="motion-card motion-border-glow rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 hover:bg-[var(--surface-elevated)]">
      <h3 className="text-base font-semibold text-[var(--text-primary)]">
        {item.label}
      </h3>
      <ul className="mt-4 space-y-3">
        {item.items.map((entry) => (
          <li className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]" key={entry}>
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-teal)]"
            />
            <span>{entry}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
