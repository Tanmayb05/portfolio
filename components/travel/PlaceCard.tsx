"use client";

import type { TravelPlace } from "@/lib/content-types";

interface PlaceCardProps {
  place: TravelPlace;
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <a
      href={place.url}
      target="_blank"
      rel="noopener noreferrer"
      className="motion-focus block border-[3px] border-[var(--ink)] bg-[var(--white)] p-4 shadow-[var(--shadow-sm)] transition group hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="truncate text-sm font-black uppercase text-[var(--ink)]">
            {place.title}
          </h3>
          {place.note && (
            <p className="mt-1 line-clamp-2 text-xs font-semibold text-[var(--text-muted)]">
              {place.note}
            </p>
          )}
        </div>
        <svg
          className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--green)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </div>
    </a>
  );
}
