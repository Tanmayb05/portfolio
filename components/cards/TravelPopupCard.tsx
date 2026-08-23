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
      <aside className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-sm)]">
        <p className="font-mono text-xs font-black uppercase text-[var(--green)]">
          {region}
        </p>
        <h3 className="mt-3 text-xl font-black uppercase leading-none text-[var(--ink)]">
          No published trip details yet
        </h3>
        <p className="mt-3 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
          I will add places, notes, maps links, and galleries here once the
          travel source data is ready.
        </p>
      </aside>
    );
  }

  return (
    <aside className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)]">
      <p className="font-mono text-xs font-black uppercase text-[var(--green)]">
        {entry.region}
      </p>
      <h3 className="mt-3 text-xl font-black uppercase leading-none text-[var(--ink)]">
        {entry.title}
      </h3>
      <dl className="mt-5 grid gap-4 text-sm">
        <div>
          <dt className="font-mono text-xs font-black uppercase text-[var(--text-muted)]">
            Place
          </dt>
          <dd className="mt-1 font-semibold text-[var(--text-secondary)]">
            {entry.placeLabel}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs font-black uppercase text-[var(--text-muted)]">
            Time visited
          </dt>
          <dd className="mt-1 font-semibold text-[var(--text-secondary)]">
            {entry.timeVisited}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs font-black uppercase text-[var(--text-muted)]">
            Notes
          </dt>
          <dd className="mt-1 font-semibold text-[var(--text-secondary)]">
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
          className="motion-focus mt-6 inline-flex border-[3px] border-[var(--ink)] bg-[var(--green)] px-3 py-2 font-mono text-xs font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
          href={entry.googleMapsUrl}
        >
          Open Google Maps <span aria-hidden="true" className="ml-2">-&gt;</span>
        </Link>
      ) : (
        <p className="mt-6 text-sm font-semibold text-[var(--text-muted)]">
          Google Maps link will appear when I add the real URL.
        </p>
      )}
    </aside>
  );
}
