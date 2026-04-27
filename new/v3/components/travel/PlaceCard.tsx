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
      className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 truncate">
            {place.title}
          </h3>
          {place.note && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {place.note}
            </p>
          )}
        </div>
        <svg
          className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 mt-0.5"
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
