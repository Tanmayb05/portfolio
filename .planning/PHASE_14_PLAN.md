# Phase 14: Travel & Life Real Data Integration

**Goal:** Upgrade Travel & Life from placeholder map UI to real interactive content with USA choropleth map, state details, and public/private place filtering.

**Acceptance Criteria:**
- Travel cards no longer depend on generic TBD placeholders
- Choropleth map displays real USA travel data with 11 visited states highlighted
- Clicking visited states opens detail drawer with real places, dates, and Google Maps links
- Private/utility places are filtered from public view but tracked
- Search works by state, trip, place, and note text
- Page remains polished and uncluttered

---

## Current State

**Data:** `new/v3/public/usa_travel_places.json` contains:
- 11 visited states (AZ, CA, GA, IL, MI, NJ, NY, OH, PA, TN, WA)
- 11 trips total
- 263 places across all states
- Structured with state → trip → place hierarchy
- Google Maps links verified
- Private/utility stop filtering rules already defined

**Current UI:**
- Placeholder map with 3 hardcoded USA entries (Seattle, LA, San Diego)
- `TravelEntry` type supports only: slug, title, region, status, placeLabel, timeVisited, tags, notes, mapPosition
- Two-column layout: map on left, detail card on right
- No interactive state selection on map
- No search functionality
- No drawer/modal for expanded details

**Components:**
- `TravelMap.tsx` - uses percentage-based positioning pins (not geographic)
- `TravelPopupCard.tsx` - shows selected entry details
- `TravelRegionSection.tsx` - wraps the map section
- `travel.ts` - content file with placeholder entries

---

## Architecture Decision: Choropleth vs. Tile Map

**Recommendation: react-simple-maps + TopoJSON**

Why:
- True geographic visualization (users recognize real map shapes)
- Better UX for state-level interaction
- Lightweight and fits portfolio aesthetic
- Choropleth intensity scaling works well for place count visualization
- Easy hover/click/search integration

Alternative considered: SVG-based tile grid (fallback for restricted environments)

---

## Implementation Plan

### Phase 14.1: Type System & Data Layer (2 hours)

#### 14.1.1 Enhance TravelEntry Type
File: `lib/content-types.ts`

Add fields to `TravelEntry`:
```ts
export type TravelEntry = {
  slug: string;
  title: string;
  region: TravelRegion;
  status: "real" | "placeholder";
  
  // Geographic
  stateCode: string;  // new
  stateName: string;  // new
  
  // Content
  placeLabel: string;
  timeVisited: string;
  notes: string[];
  tags: string[];
  
  // Statistics
  placeCount: number;  // new - total places in state
  tripCount: number;   // new - trips in this state
  hiddenPlaceCount?: number;  // new - private/utility stops hidden
  
  // UI
  mapPosition?: {  // remove this - use geographic map instead
    x: number;
    y: number;
  };
  googleMapsUrl?: string;
  
  source: SourceDocument[];
};
```

Rationale:
- `stateCode` + `stateName` enable choropleth map lookup
- Place/trip counts used for choropleth intensity and stats display
- Remove `mapPosition` - not needed for real geographic map
- Keep `googleMapsUrl` for direct state links if useful

#### 14.1.2 Create Travel Data Helpers
File: `lib/travel.ts` (new)

Implement data layer functions:
```ts
// Constants
export const STATE_NAME_TO_CODE: Record<string, string> = {
  "California": "CA",
  "Arizona": "AZ",
  // ... all 50 states
};

export const EXCLUDED_STATE_CODES = new Set(["AK", "HI"]);

// Data access
export function getVisitedStates(): TravelEntry[] {
  // Return visited contiguous states sorted by placeCount desc
}

export function getMaxPlaceCount(): number {
  // Max placeCount among visited states - for choropleth scaling
}

export function searchStates(query: string): TravelEntry[] {
  // Search by state name, code, trip name, place name, or note text
}

export function getStateByCode(code: string): TravelEntry | null {
  // Lookup state by postal code
}

export function isPrivateOrUtilityPlace(place): boolean {
  // Regex check: addresses, apartments, banks, gas stations, etc.
}

export function getPublicPlacesForState(state, limit = 12): Place[] {
  // Return places excluding private/utility, capped at limit
}

export function getHiddenPrivateCount(state): number {
  // Count filtered private/utility stops
}

export function formatDateRange(dateRange): string {
  // Format trip dates for display
}
```

Rationale:
- Centralize all data logic away from UI components
- Reusable helpers for search, filtering, scaling
- Makes testing straightforward

#### 14.1.3 Extract Real Travel Data
File: `content/travel.ts` (update)

Map `usa_travel_places.json` structure to `TravelEntry[]`:

Algorithm:
1. For each state in summary:
   - Extract stateCode from visitedStateCodes
   - Sum placeCount across all trips
   - Count tripCount
   - Count hidden places using privacy filter
   - Create TravelEntry with real data
2. Sort by placeCount descending
3. Save to travelEntries array

Example output for California:
```ts
{
  slug: "california",
  title: "California",
  region: "USA",
  status: "real",
  stateCode: "CA",
  stateName: "California",
  placeLabel: "California",
  timeVisited: "Multiple trips",
  notes: ["Los Angeles trip", "San Diego trip", "..."],
  tags: ["Urban", "Beach", "West Coast"],
  placeCount: 47,
  tripCount: 2,
  hiddenPlaceCount: 8,
  source: ["usa_travel_places.json"]
}
```

---

### Phase 14.2: Choropleth Map Component (3 hours)

#### 14.2.1 Install Dependencies
```bash
npm install react-simple-maps topojson-client
npm install -D @types/topojson-client
```

Verify `us-atlas` available for TopoJSON states geometry.

#### 14.2.2 Create USATravelMap Component
File: `components/sections/USATravelMap.tsx` (new)

Structure:
```tsx
"use client";

import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { usStatesTopo } from "us-atlas/states-10m.json";

import { StateDrawer } from "@/components/travel/StateDrawer";
import { SearchPanel } from "@/components/travel/SearchPanel";
import { ChoroplethLegend } from "@/components/travel/ChoroplethLegend";
import { getVisitedStates, getStateByCode, searchStates } from "@/lib/travel";

type USATravelMapProps = {
  entries: TravelEntry[];
};

export function USATravelMap({ entries }: USATravelMapProps) {
  const [selectedCode, setSelectedCode] = useState("CA");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [hoveredStateName, setHoveredStateName] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const visitedCodes = useMemo(
    () => new Set(entries.map((e) => e.stateCode)),
    [entries]
  );

  const maxPlaces = useMemo(() => {
    return Math.max(...entries.map((e) => e.placeCount), 1);
  }, [entries]);

  const selectedState = useMemo(
    () => entries.find((e) => e.stateCode === selectedCode) ?? entries[0],
    [entries, selectedCode]
  );

  const filteredStates = useMemo(
    () => searchStates(query, entries),
    [query, entries]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-start">
      {/* Map and legend */}
      <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-6">
        <ChoroplethLegend />
        <ComposableMap projection="geoAlbersUsa" className="h-[420px] w-full">
          <Geographies geography={usStatesTopo as object}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.name as string;
                const code = STATE_NAME_TO_CODE[stateName];
                if (!code || EXCLUDED_STATE_CODES.has(code)) return null;

                const state = entries.find((e) => e.stateCode === code);
                const isVisited = Boolean(state);
                const isSelected = selectedCode === code;

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
                          ? getChoropelethColor(state.placeCount / maxPlaces)
                          : "rgba(148, 163, 184, 0.14)",
                        stroke: isSelected ? "#f8fafc" : "rgba(255,255,255,0.25)",
                        strokeWidth: isSelected ? 1.4 : 0.55,
                        cursor: isVisited ? "pointer" : "default",
                        filter: isSelected ? "drop-shadow(0px 0px 10px rgba(250,204,21,0.55))" : "none"
                      },
                      hover: {
                        fill: isVisited ? "#facc15" : "rgba(148, 163, 184, 0.22)",
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
        {hoveredStateName && (
          <div className="mt-4 text-sm text-[var(--text-secondary)]">
            {hoveredStateName}: {visitedCodes.has(STATE_NAME_TO_CODE[hoveredStateName]) ? "Visited" : "Not visited"}
          </div>
        )}
      </div>

      {/* Right panel: search + selected state preview */}
      <div className="space-y-6">
        <SearchPanel
          states={filteredStates}
          query={query}
          selectedCode={selectedCode}
          onQueryChange={setQuery}
          onSelectState={selectState}
        />

        <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {selectedState.title}
          </h3>
          <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
            <div>Places: <strong>{selectedState.placeCount}</strong></div>
            <div>Trips: <strong>{selectedState.tripCount}</strong></div>
            {selectedState.hiddenPlaceCount > 0 && (
              <div>Hidden stops: <strong>{selectedState.hiddenPlaceCount}</strong></div>
            )}
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="motion-focus mt-6 rounded-lg border border-[var(--border-soft)] bg-[var(--accent-teal-soft)] px-4 py-2 text-sm font-semibold text-[var(--accent-teal)] transition hover:bg-[var(--accent-teal)]"
          >
            Open full details →
          </button>
        </div>
      </div>

      {/* State drawer */}
      <StateDrawer
        state={selectedState}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

function selectState(code: string) {
  setSelectedCode(code);
  setDrawerOpen(true);
}

function getChoropelethColor(intensity: number) {
  if (intensity > 0.75) return "#14b8a6";
  if (intensity > 0.45) return "#2dd4bf";
  if (intensity > 0.2) return "#5eead4";
  return "#99f6e4";
}
```

Rationale:
- Uses real geographic map with proper state shapes
- Hover shows state name and visited status
- Click opens drawer with full details
- Choropleth intensity based on place count
- Selected state highlighted with yellow glow
- Right panel shows quick preview + search

#### 14.2.3 Choropleth Legend Component
File: `components/travel/ChoroplethLegend.tsx` (new)

Shows color scale:
- Lightest: 1-5 places
- Light: 6-15 places
- Medium: 16-35 places
- Dark: 36+ places

#### 14.2.4 Replace TravelMap in TravelRegionSection
File: `components/sections/TravelRegionSection.tsx` (update)

For USA region: render `USATravelMap` instead of `TravelMap`
For India/China: keep placeholder `TravelMap` until data exists

---

### Phase 14.3: Search & Filter Panel (1.5 hours)

#### 14.3.1 Search Panel Component
File: `components/travel/SearchPanel.tsx` (new)

Features:
- Text input bound to `query` state
- Real-time search across all states
- Render list of matching states
- Selected state highlighted with teal border
- Show state name, trip count, and place count
- "No results" message if query matches nothing

Search logic in `searchStates()`:
- Match state name, state code
- Match trip names from state's trips
- Match place names from public places
- Match notes/descriptions
- Case-insensitive

---

### Phase 14.4: State Drawer Component (2 hours)

#### 14.4.1 StateDrawer Component
File: `components/travel/StateDrawer.tsx` (new)

Structure:
```tsx
Header:
  - State code pill (CA)
  - State name (California)
  - Summary: "{placeCount} places across {tripCount} trips"
  - Close button

Body (scrollable):
  - Mini stats: places, trips, date range
  - Trips section:
    - Each trip as a card
    - Trip name, primary city, date, place count
  - Highlights:
    - Public place titles as pills (first 8)
  - Places section:
    - PlaceCard for each public place (up to 18)
    - Optional: Filter tabs (All, Favorites, By trip)
  - Gallery placeholder:
    - 6 square dashed placeholders for images
  - Hidden count note:
    - "X private/utility stops are hidden from view"
```

Styling:
- Fixed to right side
- Width: min(460px, calc(100vw - 2rem))
- Height: calc(100vh - 2rem)
- Dark translucent background with blur
- Smooth slide-in animation

#### 14.4.2 PlaceCard Component
File: `components/travel/PlaceCard.tsx` (new)

Render each place as:
```tsx
<a href={place.url} target="_blank">
  <div className="rounded-lg border border-[var(--border-soft)] p-4 hover:border-[var(--accent-teal)] transition">
    <h4 className="font-semibold text-[var(--text-primary)]">{place.title}</h4>
    {place.note && <p className="mt-1 text-sm text-[var(--text-secondary)]">{place.note}</p>}
    <div className="mt-2 text-xs text-[var(--accent-teal)]">Open Maps →</div>
  </div>
</a>
```

---

### Phase 14.5: Data Migration (1 hour)

#### 14.5.1 Transform travel.ts
File: `content/travel.ts` (complete rewrite)

Algorithm:
```ts
import travelDataset from "@/public/usa_travel_places.json";

export const travelEntries: TravelEntry[] = [
  // For each state in travelDataset.states:
  {
    slug: "california",
    title: "California",
    region: "USA",
    status: "real",
    stateCode: "CA",
    stateName: "California",
    placeLabel: "California",
    timeVisited: "May 2024 - July 2025",  // derive from trip dates
    notes: [
      "Los Angeles: 28 places",
      "San Diego: 19 places",
      "San Francisco: 15 places"
    ],
    tags: ["Urban", "Beach", "Tech"],
    placeCount: 62,
    tripCount: 3,
    hiddenPlaceCount: 8,
    source: ["usa_travel_places.json"]
  },
  // ... repeat for all 11 states
];
```

---

### Phase 14.6: Styling & Refinement (1 hour)

#### 14.6.1 Tailwind Classes
Ensure all components use:
- `bg-[var(--surface-card)]`
- `border-[var(--border-soft)]`
- `text-[var(--text-primary/secondary)]`
- `text-[var(--accent-teal)]`
- Rounded corners: `rounded-lg`
- Shadows: subtle shadows from design system

#### 14.6.2 Dark Mode
All components should work in dark theme (default).

#### 14.6.3 Responsive Behavior
- Desktop: two-column layout with drawer
- Tablet: drawer as bottom sheet or modal
- Mobile: full-screen drawer, map above

---

### Phase 14.7: Testing & Verification (1 hour)

#### 14.7.1 Acceptance Tests
- [ ] Map renders without errors
- [ ] All 11 visited states appear highlighted
- [ ] Hover shows state name and count
- [ ] Click opens drawer smoothly
- [ ] Search filters states correctly
- [ ] Drawer shows correct state details
- [ ] Public places display without private stops
- [ ] Google Maps links work
- [ ] Hidden count matches filtered places
- [ ] No console errors or warnings

#### 14.7.2 Visual Regression
- [ ] Map colors correct at different intensities
- [ ] Drawer width responsive
- [ ] Text doesn't overflow
- [ ] Interactive states smooth

---

## Dependencies

```json
{
  "dependencies": {
    "react-simple-maps": "^3.0.0",
    "topojson-client": "^3.1.0",
    "us-atlas": "^3.0.0"
  },
  "devDependencies": {
    "@types/topojson-client": "^3.1.0"
  }
}
```

---

## File Summary

| File | Type | Purpose |
|------|------|---------|
| `lib/content-types.ts` | update | Enhance TravelEntry with stateCode, placeCount, etc. |
| `lib/travel.ts` | new | Data helpers (search, filter, scaling, lookup) |
| `content/travel.ts` | rewrite | Extract real data from JSON |
| `components/sections/USATravelMap.tsx` | new | Main choropleth + drawer component |
| `components/travel/SearchPanel.tsx` | new | Search and state list |
| `components/travel/StateDrawer.tsx` | new | Detail drawer with places |
| `components/travel/PlaceCard.tsx` | new | Individual place link card |
| `components/travel/ChoroplethLegend.tsx` | new | Color scale legend |
| `components/sections/TravelRegionSection.tsx` | update | Route to USATravelMap for USA region |

---

## Timeline

- Phase 14.1 (Types + Data): 2h
- Phase 14.2 (Choropleth Map): 3h
- Phase 14.3 (Search): 1.5h
- Phase 14.4 (Drawer): 2h
- Phase 14.5 (Data Migration): 1h
- Phase 14.6 (Styling): 1h
- Phase 14.7 (Testing): 1h
- **Total: ~11.5 hours**

---

## Known Risks

1. **TopoJSON parsing:** Verify us-atlas geometry loads correctly
2. **Performance:** 263 places might be slow if all rendered; use virtualization if needed
3. **Privacy:** Verify regex catches all sensitive patterns before publishing
4. **Mobile:** Drawer as full-screen modal works but may need layout tweaks

---

## Future Improvements (not in scope)

1. Photo galleries: replace placeholders with real images
2. India/China maps: build similar structure once data exists
3. Timeline view: group trips by year vertically
4. Animated route: show path between states chronologically
5. Favorites: mark and filter favorite places
6. Reflection notes: add "what stood out" or "memories" field
7. Wishlist mode: toggle visited vs. want-to-visit
8. Export: allow PDF or print-friendly view

---

## Acceptance Criteria Mapping

✅ **"Travel cards no longer depend on generic TBD"**
  → `travel.ts` has real state data extracted from JSON

✅ **"Map hover/click states correspond to real places"**
  → USATravelMap uses real state codes and geographic positions
  → Click opens drawer with actual place titles and Maps links

✅ **"The page stays polished and uncluttered"**
  → Drawer separates detail view from overview
  → Search reduces visual noise
  → Private places hidden by default
