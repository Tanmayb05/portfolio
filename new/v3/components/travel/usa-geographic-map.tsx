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
  CODE_TO_STATE_NAME,
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

// Approximate state centroids for label positioning (all contiguous states)
const STATE_LABEL_COORDS: Record<string, [number, number]> = {
  AL: [-86.8, 32.8],
  AR: [-92.4, 34.8],
  AZ: [-111.8, 34.2],
  CA: [-119.5, 37.2],
  CO: [-105.5, 39.0],
  CT: [-72.7, 41.6],
  DE: [-75.5, 39.0],
  FL: [-82.5, 28.2],
  GA: [-83.5, 32.7],
  IA: [-93.5, 42.1],
  ID: [-114.5, 44.3],
  IL: [-89.2, 40.0],
  IN: [-86.2, 39.9],
  KS: [-98.2, 38.5],
  KY: [-84.8, 37.7],
  LA: [-91.9, 30.9],
  MA: [-71.8, 42.2],
  MD: [-76.7, 39.0],
  ME: [-69.0, 45.2],
  MI: [-85.5, 44.2],
  MN: [-94.6, 46.0],
  MO: [-92.5, 38.5],
  MS: [-89.7, 32.7],
  MT: [-110.0, 46.9],
  NC: [-79.0, 35.5],
  ND: [-100.5, 47.5],
  NE: [-99.7, 41.5],
  NH: [-71.6, 43.7],
  NJ: [-74.7, 40.1],
  NM: [-106.1, 34.5],
  NV: [-117.0, 39.4],
  NY: [-75.3, 42.9],
  OH: [-82.8, 40.3],
  OK: [-97.5, 35.6],
  OR: [-120.6, 44.0],
  PA: [-77.8, 40.9],
  RI: [-71.5, 41.7],
  SC: [-81.0, 33.8],
  SD: [-100.0, 44.5],
  TN: [-86.0, 35.8],
  TX: [-99.3, 31.2],
  UT: [-111.8, 39.3],
  VA: [-78.8, 37.6],
  VT: [-72.7, 44.0],
  WA: [-120.7, 47.4],
  WI: [-89.8, 44.7],
  WV: [-80.7, 38.6],
  WY: [-107.5, 43.0],
};

// Route structure for future use (disabled by default)
interface Route {
  id: string;
  title: string;
  coordinates: Array<[number, number]>;
  enabled: boolean;
}

const ROUTES: Route[] = [
  {
    id: "cincinnati-chicago-michigan",
    title: "Cincinnati → Chicago → Michigan",
    coordinates: [
      [-84.512, 39.103],
      [-87.6298, 41.8781],
      [-85.6024, 44.3148],
    ],
    enabled: false,
  },
];

type VisualizationMode = "places" | "trips" | "timeline" | "wishlist";

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
  isVisited: boolean;
} | null;

export function USAGeographicMap({
  entries,
  selectedCode,
  onSelectState,
}: Props) {
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState<VisualizationMode>("places");
  const [showRoutes, setShowRoutes] = useState(false);

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
    const stateName = CODE_TO_STATE_NAME[stateCode] || stateCode;
    const isVisited = Boolean(entry);

    const rect = (event.currentTarget as SVGElement).getBoundingClientRect();
    setTooltip({
      stateCode,
      stateName,
      placeCount: entry?.placeCount || 0,
      tripCount: entry?.tripCount || 0,
      isVisited,
    });
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  }

  function getTotalStats() {
    const states = visitedStates.length;
    const places = visitedStates.reduce((sum, s) => sum + (s.placeCount || 0), 0);
    const trips = visitedStates.reduce((sum, s) => sum + (s.tripCount || 0), 0);
    const topState = visitedStates[0]?.stateName || "N/A";
    return { states, places, trips, topState };
  }

  function getLegendLabel(intensity: string): string {
    const labels: Record<string, Record<string, string>> = {
      places: {
        "very-light": "1–12 places",
        "light": "13–24 places",
        "medium": "25–36 places",
        "dark": "37+ places",
      },
      trips: {
        "very-light": "1 trip",
        "light": "2–3 trips",
        "medium": "4–5 trips",
        "dark": "6+ trips",
      },
      timeline: {
        "very-light": "Older visits",
        "light": "Past year",
        "medium": "Recent",
        "dark": "Very recent",
      },
      wishlist: {
        "very-light": "Wishlist",
        "light": "Wishlist",
        "medium": "Wishlist",
        "dark": "Visited",
      },
    };
    return labels[mode]?.[intensity] || intensity;
  }

  const stats = getTotalStats();

  return (
    <div className="w-full">
      {/* Travel Stats Strip */}
      <div className="mb-4 p-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-soft)]">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[var(--text-primary)]">
              {stats.states}
            </span>
            <span className="text-[var(--text-secondary)]">
              state{stats.states !== 1 ? "s" : ""}
            </span>
          </div>
          <span className="text-[var(--text-muted)]">•</span>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[var(--text-primary)]">
              {stats.places}
            </span>
            <span className="text-[var(--text-secondary)]">
              place{stats.places !== 1 ? "s" : ""}
            </span>
          </div>
          <span className="text-[var(--text-muted)]">•</span>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[var(--text-primary)]">
              {stats.trips}
            </span>
            <span className="text-[var(--text-secondary)]">
              trip{stats.trips !== 1 ? "s" : ""}
            </span>
          </div>
          <span className="text-[var(--text-muted)]">•</span>
          <div className="flex items-center gap-1">
            <span className="text-[var(--text-secondary)]">Top:</span>
            <span className="font-semibold text-[var(--text-primary)]">
              {stats.topState}
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-4 space-y-1">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Visited states
        </h3>
        <p className="text-xs text-[var(--text-secondary)]">
          Darker color means more places saved
        </p>
      </div>

      {/* Visualization Mode Toggles */}
      <div className="mb-4 flex flex-wrap gap-2">
        {(["places", "trips", "timeline", "wishlist"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              mode === m
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-tertiary)]"
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
        <button
          onClick={() => setShowRoutes(!showRoutes)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            showRoutes
              ? "bg-amber-600 text-white"
              : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-tertiary)]"
          }`}
        >
          Routes
        </button>
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

          {/* State Labels - All contiguous states */}
          {Object.entries(STATE_LABEL_COORDS).map(([code, coordinates]) => {
            const isVisited = Boolean(stateCodeMap[code]);

            return (
              <Marker key={`label-${code}`} coordinates={coordinates}>
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none font-bold drop-shadow-sm"
                  style={{
                    fontSize: isVisited ? "10px" : "8px",
                    fill: isVisited
                      ? "rgb(15, 23, 42)"
                      : "rgb(148, 163, 184)",
                    paintOrder: "stroke",
                  }}
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth="1.5px"
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

      {/* Enhanced Legend */}
      <div className="mt-6 p-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-soft)]">
        <div className="text-xs font-semibold text-[var(--text-primary)] mb-2">
          Legend
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              "very-light",
              "light",
              "medium",
              "dark",
            ] as const
          ).map((intensity) => (
            <div key={intensity} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded border border-gray-300"
                style={{
                  backgroundColor:
                    intensity === "very-light"
                      ? "#e8f4f8"
                      : intensity === "light"
                        ? "#a8d8e8"
                        : intensity === "medium"
                          ? "#5cb8d8"
                          : "#2a7fa8",
                }}
              />
              <span className="text-[var(--text-secondary)]">
                {getLegendLabel(intensity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-lg"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="font-semibold text-gray-900">
            {tooltip.stateName}
          </div>
          {tooltip.isVisited ? (
            <>
              <div className="text-gray-600">
                {tooltip.placeCount} place{tooltip.placeCount !== 1 ? "s" : ""} •{" "}
                {tooltip.tripCount} trip{tooltip.tripCount !== 1 ? "s" : ""}
              </div>
              <div className="mt-1 text-gray-500">
                Click to explore
              </div>
            </>
          ) : (
            <div className="text-gray-500">
              Not visited yet
            </div>
          )}
        </div>
      )}
    </div>
  );
}
