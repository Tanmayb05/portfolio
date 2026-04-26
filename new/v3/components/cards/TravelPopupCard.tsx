import Link from "next/link";

import { TechStackBadge } from "@/components/cards/TechStackBadge";
import type { TravelEntry } from "@/lib/content-types";

type TravelPopupCardProps = {
  entry?: TravelEntry;
  region: string;
};

export function TravelPopupCard({ entry, region }: TravelPopupCardProps) {
  if (!entry) {
    return (
      <aside className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
          {region}
        </p>
        <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
          No published trip details yet
        </h3>
        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
          I will add places, notes, maps links, and galleries here once the
          travel source data is ready.
        </p>
      </aside>
    );
  }

  return (
    <aside className="rounded-lg border border-[var(--accent-teal-border)] bg-[var(--surface-card)] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.18)]">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
        {entry.region}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
        {entry.title}
      </h3>
      <dl className="mt-5 grid gap-4 text-sm">
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Place
          </dt>
          <dd className="mt-1 text-[var(--text-secondary)]">
            {entry.placeLabel}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Time visited
          </dt>
          <dd className="mt-1 text-[var(--text-secondary)]">
            {entry.timeVisited}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Notes
          </dt>
          <dd className="mt-1 text-[var(--text-secondary)]">
            {entry.notes.join(", ")}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <TechStackBadge key={tag}>{tag}</TechStackBadge>
        ))}
      </div>

      {entry.googleMapsUrl ? (
        <Link
          className="motion-focus mt-6 inline-flex text-sm font-semibold text-[var(--accent-teal)] transition duration-200 hover:text-[var(--text-primary)]"
          href={entry.googleMapsUrl}
        >
          Open Google Maps <span aria-hidden="true" className="ml-2">-&gt;</span>
        </Link>
      ) : (
        <p className="mt-6 text-sm text-[var(--text-muted)]">
          Google Maps link will appear when I add the real URL.
        </p>
      )}
    </aside>
  );
}
