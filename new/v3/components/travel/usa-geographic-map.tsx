"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import type { TravelEntry } from "@/lib/content-types";
import {
  getVisitedStates,
  getMaxPlaceCount,
  getChoroplethColor,
  getChoroplethIntensity,
} from "@/lib/travel";

const geoUrl = "/maps/us-states-10m.json";

// FIPS code to state code mapping
const FIPS_TO_CODE: Record<string, string> = {
  "01": "AL",
  "02": "AK",
  "04": "AZ",
  "05": "AR",
  "06": "CA",
  "08": "CO",
  "09": "CT",
  "10": "DE",
  "12": "FL",
  "13": "GA",
  "15": "HI",
  "16": "ID",
  "17": "IL",
  "18": "IN",
  "19": "IA",
  "20": "KS",
  "21": "KY",
  "22": "LA",
  "23": "ME",
  "24": "MD",
  "25": "MA",
  "26": "MI",
  "27": "MN",
  "28": "MS",
  "29": "MO",
  "30": "MT",
  "31": "NE",
  "32": "NV",
  "33": "NH",
  "34": "NJ",
  "35": "NM",
  "36": "NY",
  "37": "NC",
  "38": "ND",
  "39": "OH",
  "40": "OK",
  "41": "OR",
  "42": "PA",
  "44": "RI",
  "45": "SC",
  "46": "SD",
  "47": "TN",
  "48": "TX",
  "49": "UT",
  "50": "VT",
  "51": "VA",
  "53": "WA",
  "54": "WV",
  "55": "WI",
  "56": "WY",
};

// Approximate state centroids for label positioning
const STATE_LABEL_COORDS: Record<string, [number, number]> = {
  CA: [-119.5, 37.2],
  AZ: [-111.8, 34.2],
  WA: [-120.7, 47.4],
  IL: [-89.2, 40.0],
  MI: [-85.5, 44.2],
  NY: [-75.3, 42.9],
  OH: [-82.8, 40.3],
  NJ: [-74.7, 40.1],
  PA: [-77.8, 40.9],
  TN: [-86.0, 35.8],
  GA: [-83.5, 32.7],
};

type Props = {
  entries: TravelEntry[];
  selectedCode?: string | null;
  onSelectState: (entry: TravelEntry) => void;
};

type TooltipState = {
  stateCode: string;
  stateName: string;
  placeCount: number;
  tripCount: number;
} | null;

export function USAGeographicMap({
  entries,
  selectedCode,
  onSelectState,
}: Props) {
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const visitedStates = getVisitedStates(entries);
  const maxPlaceCount = getMaxPlaceCount(entries);

  // Build a map of state codes to entries
  const stateCodeMap: Record<string, TravelEntry> = {};
  for (const state of visitedStates) {
    if (state.stateCode) {
      stateCodeMap[state.stateCode] = state;
    }
  }

  function getFill(stateCode?: string): string {
    if (!stateCode) return "#f3f4f6"; // light gray for unvisited

    const entry = stateCodeMap[stateCode];
    if (!entry || !entry.placeCount) return "#f3f4f6";

    if (stateCode === selectedCode) return "#facc15"; // yellow highlight

    const intensity = getChoroplethIntensity(entry.placeCount, maxPlaceCount);
    return getChoroplethColor(intensity);
  }

  function getStrokeColor(stateCode?: string): string {
    if (!stateCode) return "#d1d5db";
    if (stateCode === selectedCode) return "#ffffff";
    const entry = stateCodeMap[stateCode];
    return entry ? "#1f2937" : "#d1d5db";
  }

  function handleStateHover(
    stateCode: string,
    event: React.MouseEvent
  ) {
    const entry = stateCodeMap[stateCode];
    if (entry) {
      const rect = (event.currentTarget as SVGElement).getBoundingClientRect();
      setTooltip({
        stateCode,
        stateName: entry.stateName || "",
        placeCount: entry.placeCount || 0,
        tripCount: entry.tripCount || 0,
      });
      setTooltipPos({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 space-y-1">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Visited states
        </h3>
        <p className="text-xs text-[var(--text-secondary)]">
          Darker color means more places saved
        </p>
      </div>

      {/* Map Container */}
      <div className="overflow-x-auto rounded-lg border border-[var(--border-soft)] bg-[var(--surface-elevated)] backdrop-blur-xl">
        <ComposableMap
          projection="geoAlbersUsa"
          width={1000}
          height={600}
          className="w-full h-auto"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter((geo) => {
                  const fips = String(geo.id).padStart(2, "0");
                  return fips !== "02" && fips !== "15"; // exclude Alaska + Hawaii
                })
                .map((geo) => {
                  const fips = String(geo.id).padStart(2, "0");
                  const stateCode = FIPS_TO_CODE[fips];
                  const entry = stateCodeMap[stateCode];
                  const isVisited = Boolean(entry);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        if (isVisited && entry) {
                          onSelectState(entry);
                        }
                      }}
                      onMouseEnter={(event: React.MouseEvent) => {
                        handleStateHover(stateCode, event);
                      }}
                      onMouseLeave={() => {
                        setTooltip(null);
                      }}
                      style={{
                        default: {
                          fill: getFill(stateCode),
                          stroke: getStrokeColor(stateCode),
                          strokeWidth: stateCode === selectedCode ? 1.5 : 0.75,
                          outline: "none",
                          cursor: isVisited ? "pointer" : "default",
                          transition: "all 200ms ease-in-out",
                        },
                        hover: {
                          fill:
                            stateCode === selectedCode
                              ? "#facc15"
                              : isVisited
                                ? "#60a5fa"
                                : "#f3f4f6",
                          stroke: isVisited ? "#ffffff" : "#d1d5db",
                          strokeWidth: isVisited ? 1.5 : 0.75,
                          outline: "none",
                          cursor: isVisited ? "pointer" : "default",
                        },
                        pressed: {
                          fill: "#facc15",
                          stroke: "#ffffff",
                          strokeWidth: 1.5,
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
            }
          </Geographies>

          {/* State Labels */}
          {Object.entries(STATE_LABEL_COORDS).map(([code, coordinates]) => {
            const state = stateCodeMap[code];
            if (!state) return null;

            return (
              <Marker key={`label-${code}`} coordinates={coordinates}>
                <text
                  textAnchor="middle"
                  dy="0.3em"
                  className="pointer-events-none select-none font-bold text-[10px] fill-slate-950 dark:fill-white"
                  paintOrder="stroke"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="2px"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {code}
                </text>
              </Marker>
            );
          })}
        </ComposableMap>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 rounded-lg border border-[var(--border-soft)] bg-[var(--surface-elevated)] px-3 py-2 text-xs shadow-lg backdrop-blur-sm"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="font-semibold text-[var(--text-primary)]">
            {tooltip.stateName}
          </div>
          <div className="text-[var(--text-secondary)]">
            {tooltip.placeCount} place{tooltip.placeCount !== 1 ? "s" : ""} •{" "}
            {tooltip.tripCount} trip{tooltip.tripCount !== 1 ? "s" : ""}
          </div>
          <div className="mt-1 text-[var(--text-muted)]">
            Click to explore
          </div>
        </div>
      )}
    </div>
  );
}
