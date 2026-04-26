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
      <div className="relative min-h-[22rem] overflow-hidden rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5">
        <div aria-hidden="true" className="soft-grid absolute inset-0 opacity-70" />
        <div
          aria-hidden="true"
          className="absolute inset-6 rounded-[2rem] border border-[var(--border-soft)] bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))]"
        />
        <div
          aria-hidden="true"
          className="absolute left-[18%] top-[20%] h-36 w-44 rounded-[48%_52%_48%_52%] border border-[var(--border-soft)] bg-[rgba(255,255,255,0.035)]"
        />
        <div
          aria-hidden="true"
          className="absolute right-[18%] top-[28%] h-40 w-48 rounded-[54%_46%_56%_44%] border border-[var(--border-soft)] bg-[rgba(255,255,255,0.03)]"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[15%] left-[34%] h-32 w-56 rounded-[50%_42%_58%_50%] border border-[var(--border-soft)] bg-[rgba(255,255,255,0.026)]"
        />

        <div className="relative z-10">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
            Map layer
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">
            {regionLabels[region]}
          </h3>
          <p className="mt-2 max-w-[58ch] text-sm leading-6 text-[var(--text-secondary)]">
            I am using this as a native map placeholder until I add real
            state/province data and map links.
          </p>
        </div>

        {entries.length > 0 ? (
          <div className="absolute inset-0 z-20">
            {entries.map((entry) => {
              const isSelected = selectedEntry?.slug === entry.slug;

              return (
                <button
                  aria-label={`Show ${entry.title}`}
                  className={`motion-focus absolute h-5 w-5 rounded-full border transition duration-200 hover:scale-110 ${
                    isSelected
                      ? "border-[var(--accent-teal)] bg-[var(--accent-teal)] shadow-[0_0_28px_var(--accent-teal-soft)]"
                      : "border-[var(--accent-teal-border)] bg-[var(--accent-teal-soft)]"
                  }`}
                  key={entry.slug}
                  style={{
                    left: `${entry.mapPosition.x}%`,
                    top: `${entry.mapPosition.y}%`
                  }}
                  type="button"
                  onClick={() => setSelectedSlug(entry.slug)}
                >
                  <span className="absolute left-1/2 top-7 w-max -translate-x-1/2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-elevated)] px-2 py-1 text-xs text-[var(--text-secondary)] opacity-0 transition duration-200 hover:opacity-100">
                    {entry.placeLabel}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="absolute inset-x-6 bottom-6 z-20 rounded-lg border border-[var(--border-soft)] bg-[var(--surface-elevated)] p-4">
            <p className="text-sm text-[var(--text-muted)]">
              I have not added highlighted places for this region yet.
            </p>
          </div>
        )}
      </div>

      <TravelPopupCard entry={selectedEntry} region={region} />
    </div>
  );
}
