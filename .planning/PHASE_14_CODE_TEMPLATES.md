# Phase 14 Code Templates & Examples

Quick reference for implementation with actual code patterns.

## 1. Enhanced TravelEntry Type

**File:** `lib/content-types.ts`

```ts
export type TravelEntry = {
  // Identity
  slug: string;
  title: string;
  region: TravelRegion;
  status: "real" | "placeholder";
  
  // Geographic (new)
  stateCode: string;
  stateName: string;
  
  // Content
  placeLabel: string;
  timeVisited: string;
  notes: string[];
  tags: string[];
  
  // Statistics (new)
  placeCount: number;
  tripCount: number;
  hiddenPlaceCount?: number;
  
  // UI (remove mapPosition)
  googleMapsUrl?: string;
  
  // Source
  source: SourceDocument[];
};
```

## 2. Data Helpers Module

**File:** `lib/travel.ts` (new)

```ts
import travelDataset from "@/public/usa_travel_places.json";
import type { TravelEntry } from "@/lib/content-types";

// Constants
export const STATE_NAME_TO_CODE: Record<string, string> = {
  "Alabama": "AL",
  "Alaska": "AK",
  "Arizona": "AZ",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "Florida": "FL",
  "Georgia": "GA",
  "Hawaii": "HI",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Pennsylvania": "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY"
};

export const EXCLUDED_STATE_CODES = new Set(["AK", "HI"]);

// Privacy filter patterns
const PRIVATE_PATTERNS = [
  /\b\d+\s+\w+\s+(St|Ave|Blvd|Road|Lane|Drive|Pl|Ct|Dr|Rd|Street|Avenue)\b/i,
  /apartment|apt|guest house|airbnb|personal stay|home|house|condo|hostel/i,
  /bank|credit union|atm|errand|pharmacy|cvs|walgreens/i,
  /gas station|filling station|pump|fuel|petrol/i,
  /grocery|safeway|whole foods|trader|retail|hardware|home depot|lowes/i,
  /rental car|avis|hertz|budget|enterprise|airport|terminal|gate|parking|dropped pin|coordinates/i
];

export function isPrivateOrUtilityPlace(place: {
  title?: string;
  note?: string;
}): boolean {
  const text = `${place.title} ${place.note}`.toLowerCase();
  return PRIVATE_PATTERNS.some(pattern => pattern.test(text));
}

export function getVisitedStates(entries: TravelEntry[]): TravelEntry[] {
  return entries
    .filter(e => e.region === "USA" && !EXCLUDED_STATE_CODES.has(e.stateCode))
    .sort((a, b) => b.placeCount - a.placeCount);
}

export function getVisitedStateCodes(entries: TravelEntry[]): string[] {
  return getVisitedStates(entries).map(e => e.stateCode);
}

export function getStateByCode(
  code: string,
  entries: TravelEntry[]
): TravelEntry | null {
  return entries.find(e => e.stateCode === code) ?? null;
}

export function getMaxPlaceCount(entries: TravelEntry[]): number {
  const visited = getVisitedStates(entries);
  return visited.length > 0
    ? Math.max(...visited.map(s => s.placeCount))
    : 1;
}

export function searchStates(
  query: string,
  entries: TravelEntry[]
): TravelEntry[] {
  if (!query.trim()) return getVisitedStates(entries);
  
  const q = query.toLowerCase();
  
  return getVisitedStates(entries).filter(state => {
    // Exact state code match (highest priority)
    if (state.stateCode.toLowerCase() === q) return true;
    
    // State name match
    if (state.stateName.toLowerCase().includes(q)) return true;
    if (state.title.toLowerCase().includes(q)) return true;
    
    // Notes match (places, cities, trips)
    if (state.notes.some(note => note.toLowerCase().includes(q))) return true;
    
    return false;
  });
}

export function formatDateRange(dateRange: {
  start: string;
  end: string;
}): string {
  if (!dateRange.start || !dateRange.end) return "Date unavailable";
  
  const start = new Date(dateRange.start);
  const end = new Date(dateRange.end);
  
  const formatMonth = (d: Date) => d.toLocaleDateString("en-US", { month: "short" });
  const formatYear = (d: Date) => d.getFullYear();
  
  const startMonth = formatMonth(start);
  const startYear = formatYear(start);
  const endMonth = formatMonth(end);
  const endYear = formatYear(end);
  
  if (startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${startYear}`;
  }
  
  return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
}

export function getPublicPlacesForState(
  state: TravelEntry,
  places: any[], // from usa_travel_places.json
  limit: number = 18
): any[] {
  return places
    .filter(place => !isPrivateOrUtilityPlace(place))
    .slice(0, limit);
}

export function getHiddenPrivateCount(
  state: TravelEntry,
  places: any[]
): number {
  return places.filter(place => isPrivateOrUtilityPlace(place)).length;
}
```

## 3. Data Extraction Pattern

**File:** `content/travel.ts` (rewrite)

```ts
import type { TravelEntry } from "@/lib/content-types";
import travelDataset from "@/public/usa_travel_places.json";

// Helper to extract state data
function extractStateEntry(
  stateCode: string,
  stateData: any // from usa_travel_places.json
): TravelEntry {
  // Get trip details
  const trips = stateData.trips || [];
  
  // Build notes from trips grouped by primary city
  const notesByCity = new Map<string, { count: number; tripCount: number }>();
  trips.forEach((trip: any) => {
    const city = trip.primaryCity || stateCode;
    const current = notesByCity.get(city) || { count: 0, tripCount: 0 };
    current.count += trip.placeCount || 0;
    current.tripCount += 1;
    notesByCity.set(city, current);
  });
  
  const notes = Array.from(notesByCity.entries()).map(
    ([city, data]) => `${city}: ${data.count} places, ${data.tripCount} trip${data.tripCount > 1 ? "s" : ""}`
  );
  
  // Get date range from all trips
  let minDate = new Date();
  let maxDate = new Date();
  
  trips.forEach((trip: any) => {
    if (trip.dateRange?.start) {
      const start = new Date(trip.dateRange.start);
      if (start < minDate) minDate = start;
    }
    if (trip.dateRange?.end) {
      const end = new Date(trip.dateRange.end);
      if (end > maxDate) maxDate = end;
    }
  });
  
  // Format date range
  const timeVisited =
    minDate === maxDate
      ? minDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : `${minDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })} - ${maxDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`;
  
  // Count hidden places
  const PRIVATE_PATTERNS = [
    /\d+\s+\w+\s+(St|Ave|Blvd|Road|Lane|Drive)/i,
    /apartment|apt|guest house|airbnb|personal stay/i,
    /bank|errand|pharmacy/i,
    /gas station|parking|airport/i,
    /grocery|retail|hardware/i
  ];
  
  let hiddenCount = 0;
  (stateData.places || []).forEach((place: any) => {
    const text = `${place.title} ${place.note}`.toLowerCase();
    if (PRIVATE_PATTERNS.some(p => p.test(text))) {
      hiddenCount++;
    }
  });
  
  return {
    slug: stateData.stateName.toLowerCase().replace(/\s+/g, "-"),
    title: stateData.stateName,
    region: "USA",
    status: "real",
    stateCode,
    stateName: stateData.stateName,
    placeLabel: stateData.stateName,
    timeVisited,
    notes,
    tags: [], // TODO: derive from place types
    placeCount: stateData.placeCount || 0,
    tripCount: trips.length,
    hiddenPlaceCount: hiddenCount,
    source: ["usa_travel_places.json"]
  };
}

// Build travelEntries from dataset
export const travelEntries: TravelEntry[] = Object.entries(
  travelDataset.states as Record<string, any>
)
  .map(([code, stateData]) => extractStateEntry(code, stateData))
  .sort((a, b) => b.placeCount - a.placeCount);

export const travelRegions = ["USA", "India", "China"] as const;
```

## 4. USATravelMap Component Skeleton

**File:** `components/sections/USATravelMap.tsx` (new)

```tsx
"use client";

import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import usStatesTopo from "us-atlas/states-10m.json";

import { StateDrawer } from "@/components/travel/StateDrawer";
import { SearchPanel } from "@/components/travel/SearchPanel";
import { ChoroplethLegend } from "@/components/travel/ChoroplethLegend";
import { travelEntries } from "@/content/travel";
import {
  STATE_NAME_TO_CODE,
  EXCLUDED_STATE_CODES,
  getMaxPlaceCount,
  searchStates,
  getStateByCode
} from "@/lib/travel";
import type { TravelEntry } from "@/lib/content-types";

type USATravelMapProps = {
  entries?: TravelEntry[];
};

export function USATravelMap({
  entries = travelEntries
}: USATravelMapProps) {
  const [selectedCode, setSelectedCode] = useState("CA");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [hoveredStateName, setHoveredStateName] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const visitedCodes = useMemo(
    () => new Set(entries.map(e => e.stateCode)),
    [entries]
  );

  const maxPlaces = useMemo(
    () => getMaxPlaceCount(entries),
    [entries]
  );

  const selectedState = useMemo(
    () => getStateByCode(selectedCode, entries) ?? entries[0],
    [entries, selectedCode]
  );

  const filteredStates = useMemo(
    () => searchStates(query, entries),
    [query, entries]
  );

  const selectState = (code: string) => {
    if (!visitedCodes.has(code)) return;
    setSelectedCode(code);
    setDrawerOpen(true);
  };

  const getChoropelethColor = (intensity: number) => {
    if (intensity > 0.75) return "#14b8a6";   // darkest
    if (intensity > 0.45) return "#2dd4bf";   // medium
    if (intensity > 0.2) return "#5eead4";    // light
    return "#99f6e4";                         // lightest
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-start">
        {/* Map Section */}
        <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-6">
          <ChoroplethLegend />
          <ComposableMap
            projection="geoAlbersUsa"
            className="h-[420px] w-full"
          >
            <Geographies geography={usStatesTopo as object}>
              {({ geographies }) =>
                geographies.map((geo: any) => {
                  const stateName = geo.properties.name as string;
                  const code = STATE_NAME_TO_CODE[stateName];
                  
                  if (!code || EXCLUDED_STATE_CODES.has(code)) return null;

                  const state = entries.find(e => e.stateCode === code);
                  const isVisited = Boolean(state);
                  const isSelected = selectedCode === code;
                  const intensity = state
                    ? state.placeCount / maxPlaces
                    : 0;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredStateName(stateName)}
                      onMouseLeave={() => setHoveredStateName(null)}
                      onClick={() => isVisited && selectState(code)}
                      style={{
                        default: {
                          fill: isVisited
                            ? getChoropelethColor(intensity)
                            : "rgba(148, 163, 184, 0.14)",
                          stroke: isSelected
                            ? "#f8fafc"
                            : "rgba(255,255,255,0.25)",
                          strokeWidth: isSelected ? 1.4 : 0.55,
                          outline: "none",
                          cursor: isVisited ? "pointer" : "default",
                          filter: isSelected
                            ? "drop-shadow(0px 0px 10px rgba(250,204,21,0.55))"
                            : "none",
                          transition: "all 0.2s ease"
                        },
                        hover: {
                          fill: isVisited
                            ? "#facc15"
                            : "rgba(148, 163, 184, 0.22)",
                          stroke: "#f8fafc",
                          strokeWidth: 1.2,
                          cursor: isVisited ? "pointer" : "default"
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
          
          {/* Hover Tooltip */}
          {hoveredStateName && (
            <div className="mt-4 text-sm text-[var(--text-secondary)]">
              <strong>{hoveredStateName}</strong> -{" "}
              {visitedCodes.has(STATE_NAME_TO_CODE[hoveredStateName])
                ? `${entries.find(e => e.stateName === hoveredStateName)?.placeCount} places`
                : "Not visited"}
            </div>
          )}
        </div>

        {/* Right Panel: Search + Preview */}
        <div className="space-y-6">
          <SearchPanel
            states={filteredStates}
            query={query}
            selectedCode={selectedCode}
            onQueryChange={setQuery}
            onSelectState={selectState}
          />

          {selectedState && (
            <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {selectedState.title}
              </h3>
              <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                <div>
                  <span className="font-semibold text-[var(--text-primary)]">
                    {selectedState.placeCount}
                  </span>{" "}
                  places
                </div>
                <div>
                  <span className="font-semibold text-[var(--text-primary)]">
                    {selectedState.tripCount}
                  </span>{" "}
                  trip{selectedState.tripCount > 1 ? "s" : ""}
                </div>
                {selectedState.hiddenPlaceCount ? (
                  <div className="text-xs text-[var(--text-muted)]">
                    {selectedState.hiddenPlaceCount} private stops hidden
                  </div>
                ) : null}
              </div>
              <button
                onClick={() => setDrawerOpen(true)}
                className="motion-focus mt-6 rounded-lg border border-[var(--border-soft)] bg-[var(--accent-teal-soft)] px-4 py-2 text-sm font-semibold text-[var(--accent-teal)] transition hover:bg-[var(--accent-teal)]"
              >
                Open details →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* State Drawer */}
      <StateDrawer
        state={selectedState}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        allPlaces={[]} // TODO: pass from dataset
      />
    </div>
  );
}
```

## 5. SearchPanel Component Skeleton

**File:** `components/travel/SearchPanel.tsx` (new)

```tsx
"use client";

import { Input } from "@/components/ui/input";
import type { TravelEntry } from "@/lib/content-types";

type SearchPanelProps = {
  states: TravelEntry[];
  query: string;
  selectedCode: string;
  onQueryChange: (query: string) => void;
  onSelectState: (code: string) => void;
};

export function SearchPanel({
  states,
  query,
  selectedCode,
  onQueryChange,
  onSelectState
}: SearchPanelProps) {
  return (
    <div className="space-y-4 rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-6">
      <div>
        <label className="block text-sm font-semibold text-[var(--text-primary)]">
          Search states
        </label>
        <Input
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          placeholder="Search states or places..."
          className="mt-2"
        />
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {states.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">No states match your search.</p>
        ) : (
          states.map(state => (
            <button
              key={state.stateCode}
              onClick={() => onSelectState(state.stateCode)}
              className={`w-full rounded-lg border p-3 text-left transition ${
                selectedCode === state.stateCode
                  ? "border-[var(--accent-teal)] bg-[var(--accent-teal-soft)]"
                  : "border-[var(--border-soft)] hover:bg-[var(--surface-elevated)]"
              }`}
            >
              <div className="font-semibold text-[var(--text-primary)]">
                {state.title}
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                {state.placeCount} places • {state.tripCount} trip{state.tripCount > 1 ? "s" : ""}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
```

## 6. ChoroplethLegend Component

**File:** `components/travel/ChoroplethLegend.tsx` (new)

```tsx
export function ChoroplethLegend() {
  const scales = [
    { color: "#99f6e4", label: "1–4 places" },
    { color: "#5eead4", label: "5–19 places" },
    { color: "#2dd4bf", label: "20–35 places" },
    { color: "#14b8a6", label: "36+ places" }
  ];

  return (
    <div className="mb-4 flex gap-4 text-xs">
      {scales.map(scale => (
        <div key={scale.label} className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded"
            style={{ backgroundColor: scale.color }}
          />
          <span className="text-[var(--text-secondary)]">{scale.label}</span>
        </div>
      ))}
    </div>
  );
}
```

---

## Key Implementation Notes

1. **Regex patterns:** Keep simple, test on real data before committing
2. **Date parsing:** Handle all trip dateRange formats gracefully
3. **Search debounce:** Add 300ms debounce to prevent excessive re-renders
4. **Drawer animation:** Use CSS transitions for smooth slide-in/out
5. **Mobile:** Render drawer as bottom sheet on small screens (media query)
6. **Performance:** React.memo PlaceCard to avoid re-renders
7. **Error handling:** Graceful fallbacks for missing data
8. **Accessibility:** Keyboard navigation + ARIA labels
