import Link from "next/link";

import type { ThinkingEntry } from "@/lib/content-types";

type ThinkingCardProps = {
  entry: ThinkingEntry;
};

export function ThinkingCard({ entry }: ThinkingCardProps) {
  return (
    <Link
      className="motion-card motion-border-glow motion-focus block rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 hover:bg-[var(--surface-elevated)]"
      href={`/thinking/${entry.slug}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-teal)]">
          {entry.category}
        </span>
        <span className="rounded-full border border-[var(--border-soft)] px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.1em] text-[var(--text-muted)]">
          {entry.status}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-tight text-[var(--text-primary)]">
        {entry.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
        {entry.summary}
      </p>
    </Link>
  );
}
