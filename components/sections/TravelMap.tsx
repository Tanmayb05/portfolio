"use client";

import { useMemo, useState } from "react";

import { TravelPopupCard } from "@/components/cards/TravelPopupCard";
import type { TravelEntry, TravelRegion } from "@/lib/content-types";

type TravelMapProps = {
  entries: TravelEntry[];
  region: TravelRegion;
};

const regionLabels: Record<TravelRegion, string> = {
  USA: "United States",
  India: "India",
  China: "China"
};

export function TravelMap({ entries, region }: TravelMapProps) {
  const [selectedSlug, setSelectedSlug] = useState(entries[0]?.slug);
  const selectedEntry = useMemo(
    () => entries.find((entry) => entry.slug === selectedSlug) ?? entries[0],
    [entries, selectedSlug]
  );

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
      <div className="relative min-h-[22rem] overflow-hidden border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)]">
        <div aria-hidden="true" className="soft-grid absolute inset-0 opacity-70" />
        <div
          aria-hidden="true"
          className="absolute inset-6 border-[3px] border-dashed border-[var(--ink)] bg-[var(--paper)]"
        />
        <div
          aria-hidden="true"
          className="absolute left-[18%] top-[20%] h-24 w-32 border-[3px] border-[var(--ink)] bg-[var(--green)]"
        />
        <div
          aria-hidden="true"
          className="absolute right-[18%] top-[28%] h-28 w-36 border-[3px] border-[var(--ink)] bg-[var(--yellow)]"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[15%] left-[34%] h-20 w-44 border-[3px] border-[var(--ink)] bg-[var(--blue)]"
        />

        <div className="relative z-10">
          <p className="font-mono text-xs font-black uppercase text-[var(--green)]">
            Map layer
          </p>
          <h3 className="mt-3 text-2xl font-black uppercase leading-none text-[var(--ink)]">
            {regionLabels[region]}
          </h3>
          <p className="mt-2 max-w-[58ch] text-sm font-semibold leading-6 text-[var(--text-secondary)]">
            I am using this as a native map placeholder until I add real
            state/province data and map links.
          </p>
        </div>

        {entries.length > 0 && entries.some(e => e.mapPosition) ? (
          <div className="absolute inset-0 z-20">
            {entries.map((entry) => {
              if (!entry.mapPosition) return null;
              const isSelected = selectedEntry?.slug === entry.slug;

              return (
                <button
                  aria-label={`Show ${entry.title}`}
                  className={`motion-focus absolute h-5 w-5 border-[3px] border-[var(--ink)] transition duration-200 hover:scale-110 ${
                    isSelected
                      ? "bg-[var(--green)] shadow-[var(--shadow-sm)]"
                      : "bg-[var(--white)]"
                  }`}
                  key={entry.slug}
                  style={{
                    left: `${entry.mapPosition.x}%`,
                    top: `${entry.mapPosition.y}%`
                  }}
                  type="button"
                  onClick={() => setSelectedSlug(entry.slug)}
                >
                  <span className="absolute left-1/2 top-7 w-max -translate-x-1/2 border-2 border-[var(--ink)] bg-[var(--white)] px-2 py-1 text-xs font-semibold text-[var(--text-secondary)] opacity-0 transition duration-200 hover:opacity-100">
                    {entry.placeLabel}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="absolute inset-x-6 bottom-6 z-20 border-[3px] border-[var(--ink)] bg-[var(--paper)] p-4">
            <p className="text-sm font-semibold text-[var(--text-muted)]">
              I have not added highlighted places for this region yet.
            </p>
          </div>
        )}
      </div>

      <TravelPopupCard entry={selectedEntry} region={region} />
    </div>
  );
}
