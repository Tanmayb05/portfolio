"use client";

import { useMemo, useState } from "react";
import type { TravelEntry } from "@/lib/content-types";
import {
  getVisitedStates,
  getMaxPlaceCount,
  getChoroplethColor,
  getChoroplethIntensity,
} from "@/lib/travel";
import { ChoroplethLegend } from "@/components/travel/ChoroplethLegend";
import { StateDrawer } from "@/components/travel/StateDrawer";

// Static state coordinates (approximate map centers for state labels)
const STATE_CENTERS: Record<string, [number, number]> = {
  "Alabama": [32.8, 86.8],
  "Alaska": [64.2, 152.2],
  "Arizona": [33.7, 111.4],
  "Arkansas": [34.9, 92.3],
  "California": [36.1, 119.7],
  "Colorado": [39.0, 105.3],
  "Connecticut": [41.6, 72.7],
  "Delaware": [39.0, 75.5],
  "Florida": [27.7, 81.8],
  "Georgia": [33.0, 83.6],
  "Hawaii": [21.0, 157.5],
  "Idaho": [44.2, 114.7],
  "Illinois": [40.3, 88.9],
  "Indiana": [39.8, 86.2],
  "Iowa": [42.0, 93.2],
  "Kansas": [38.5, 97.6],
  "Kentucky": [37.6, 84.6],
  "Louisiana": [31.1, 91.8],
  "Maine": [44.7, 69.3],
  "Maryland": [39.0, 76.8],
  "Massachusetts": [42.2, 71.8],
  "Michigan": [43.3, 84.5],
  "Minnesota": [45.7, 93.9],
  "Mississippi": [32.7, 89.6],
  "Missouri": [38.4, 92.2],
  "Montana": [47.0, 109.6],
  "Nebraska": [41.5, 99.9],
  "Nevada": [38.8, 117.0],
  "New Hampshire": [43.4, 71.5],
  "New Jersey": [40.2, 74.5],
  "New Mexico": [34.8, 106.2],
  "New York": [42.1, 74.9],
  "North Carolina": [35.6, 79.8],
  "North Dakota": [47.5, 99.8],
  "Ohio": [40.4, 82.7],
  "Oklahoma": [35.5, 97.5],
  "Oregon": [44.5, 122.0],
  "Pennsylvania": [40.5, 77.2],
  "Rhode Island": [41.7, 71.5],
  "South Carolina": [34.0, 81.1],
  "South Dakota": [44.3, 99.4],
  "Tennessee": [35.7, 86.6],
  "Texas": [31.9, 99.9],
  "Utah": [39.3, 111.7],
  "Vermont": [43.9, 72.5],
  "Virginia": [37.7, 78.2],
  "Washington": [47.7, 120.7],
  "West Virginia": [38.5, 82.1],
  "Wisconsin": [44.3, 89.6],
  "Wyoming": [42.9, 107.3],
};

interface USATravelMapProps {
  entries: TravelEntry[];
}

export function USATravelMap({ entries }: USATravelMapProps) {
  const [selectedState, setSelectedState] = useState<TravelEntry | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const visitedStates = useMemo(
    () => getVisitedStates(entries),
    [entries]
  );

  const maxPlaceCount = useMemo(
    () => getMaxPlaceCount(entries),
    [entries]
  );

  const stateEntryMap = useMemo(() => {
    const map: Record<string, TravelEntry> = {};
    for (const state of visitedStates) {
      if (state.stateName) {
        map[state.stateName] = state;
      }
    }
    return map;
  }, [visitedStates]);

  const getStateColor = (stateName: string): string => {
    const state = stateEntryMap[stateName];
    if (!state || !state.placeCount) return "#f0f0f0";
    const intensity = getChoroplethIntensity(state.placeCount, maxPlaceCount);
    return getChoroplethColor(intensity);
  };

  return (
    <div className="w-full space-y-6">
      <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden min-h-96">
        <svg
          viewBox="0 -50 1000 630"
          className="w-full h-auto"
          style={{ maxHeight: "500px" }}
        >
          {/* Simple state grid visualization as fallback */}
          <g>
            {visitedStates.map((state, idx) => {
              const col = idx % 4;
              const row = Math.floor(idx / 4);
              const x = col * 250 + 50;
              const y = row * 150 + 50;
              const color = getStateColor(state.stateName || "");
              const isHovered = hoveredState === state.stateName;

              return (
                <g key={state.stateCode}>
                  <rect
                    x={x}
                    y={y}
                    width="220"
                    height="120"
                    fill={color}
                    stroke={isHovered ? "#1a5f7a" : "#d0d0d0"}
                    strokeWidth={isHovered ? 2 : 1}
                    rx="8"
                    className={
                      "transition-all duration-200 " +
                      (stateEntryMap[state.stateName || ""]
                        ? "cursor-pointer hover:shadow-lg"
                        : "")
                    }
                    style={{
                      filter: isHovered
                        ? "drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
                        : "none",
                    }}
                    onClick={() => setSelectedState(state)}
                    onMouseEnter={() => setHoveredState(state.stateName || null)}
                    onMouseLeave={() => setHoveredState(null)}
                  />
                  <text
                    x={x + 110}
                    y={y + 50}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-semibold"
                    fill="#1f2937"
                    pointerEvents="none"
                  >
                    {state.stateName}
                  </text>
                  <text
                    x={x + 110}
                    y={y + 75}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs"
                    fill="#6b7280"
                    pointerEvents="none"
                  >
                    {state.placeCount} places
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <ChoroplethLegend maxPlaceCount={maxPlaceCount} />

      <StateDrawer
        state={selectedState}
        isOpen={!!selectedState}
        onClose={() => setSelectedState(null)}
      />
    </div>
  );
}
