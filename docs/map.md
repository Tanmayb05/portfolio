# USA Travel Map Code Outline

This document outlines the current `new/usa-travel-map-package` map implementation so it can be recreated or adapted later in Claude Code.

## Goal

Build an interactive USA travel section for a personal portfolio:

- Show a contiguous USA map with visited states highlighted.
- Exclude Alaska and Hawaii in the first version.
- Use choropleth intensity based on saved place count per state.
- Let users click a visited state to open a travel drawer/card.
- Search visited states by state name, state code, trip title, primary city, place title, or place note.
- Hide private or utility stops from the public drawer while keeping them in the source JSON.
- Keep a fallback map that does not depend on geographic map packages.

## Current Stack

- Next.js app router
- React client components
- Tailwind CSS
- `react-simple-maps` for the real geographic SVG map
- `us-atlas/states-10m.json` as local npm topojson data
- `topojson-client` dependency available through the map package
- Vitest for data/helper tests

## File Map

```txt
new/usa-travel-map-package/
  src/app/page.tsx
  src/app/globals.css
  src/components/travel/USATravelMap.tsx
  src/components/travel/USATravelTileMapFallback.tsx
  src/components/travel/StateDrawer.tsx
  src/components/travel/PlaceCard.tsx
  src/components/travel/PhotoGalleryPlaceholder.tsx
  src/data/usa_travel_places.json
  src/lib/travel.ts
  src/lib/travel.test.ts
```

The demo entry point is `src/app/page.tsx`, which imports global CSS and renders `<USATravelMap />`.

## Data Shape

The map reads from `src/data/usa_travel_places.json` through `src/lib/travel.ts`.

Important TypeScript types:

```ts
type TravelPlace = {
  title: string;
  note?: string | null;
  url?: string | null;
  tags?: string[];
  comment?: string | null;
  coordinates?: { lat: number; lng: number } | null;
};

type TravelTrip = {
  id: string;
  title: string;
  primaryCity: string;
  dateRange: { start: string; end: string };
  placeCount: number;
};

type TravelState = {
  stateCode: string;
  stateName: string;
  country: string;
  visited: boolean;
  tripIds: string[];
  trips: TravelTrip[];
  placeCount: number;
  places: TravelPlace[];
};

type TravelDataset = {
  schemaVersion: number;
  generatedAt: string;
  summary: {
    tripCount: number;
    visitedStateCount: number;
    totalPlaces: number;
    visitedStateCodes: string[];
  };
  states: Record<string, TravelState>;
};
```

`travelDataset` is the raw JSON cast to `TravelDataset`.

## Data Helpers

`src/lib/travel.ts` owns all data lookup and filtering logic. UI components should call these helpers instead of reading or filtering the JSON directly.

Core constants:

- `STATE_NAME_TO_CODE`: maps topojson state names like `"California"` to postal codes like `"CA"`.
- `EXCLUDED_STATE_CODES`: `new Set(["AK", "HI"])`.

Core helpers:

- `getVisitedStates()`: returns visited states except Alaska/Hawaii, sorted by `placeCount` descending.
- `getVisitedStateCodes()`: returns the codes from `getVisitedStates()`.
- `getStateByCode(code)`: returns a state from the dataset or `null`.
- `getMaxPlaceCount()`: max `placeCount` among visited contiguous states, used for choropleth scaling.
- `formatDateRange(dateRange)`: returns a simple display string or `"Date unavailable"`.
- `isPrivateOrUtilityPlace(place)`: checks title/note against privacy and utility regex patterns.
- `getPublicPlacesForState(state, limit = 12)`: hides private/utility places and limits results.
- `getHiddenPrivateCount(state)`: counts hidden private/utility stops.
- `getHighlightsForState(state, limit = 6)`: uses public places as highlight labels.
- `searchStates(query)`: searches visited contiguous states by state, trip, place, and note text.

## Privacy Filter

The public UI hides obvious private or low-value utility stops. The current regex list catches:

- exact-looking street addresses
- apartments, guest houses, personal stays, Airbnb
- banks and errands
- gas stations
- grocery, pharmacy, retail, and hardware stores
- rental car, airport, bus, parking, dropped pins, and coordinates

Important: the raw JSON can still contain these records. For production, review or remove sensitive records from `src/data/usa_travel_places.json`.

## Main Geographic Map

File: `src/components/travel/USATravelMap.tsx`

This is a client component.

Imports:

- React `useMemo`, `useState`
- `ComposableMap`, `Geographies`, `Geography` from `react-simple-maps`
- `us-atlas/states-10m.json`
- data helpers from `@/lib/travel`
- `StateDrawer`

Top-level derived values:

```ts
const maxPlaces = getMaxPlaceCount();
const visitedCodes = new Set(getVisitedStateCodes());
```

Local state:

- `selectedCode`: initially `"CA"`
- `drawerOpen`: initially `true`
- `hoveredStateName`: topojson state name for tooltip
- `query`: search input value

Selected state logic:

```ts
const selectedState = getStateByCode(selectedCode) ?? getStateByCode("CA");
```

Search logic:

```ts
const filteredStates = useMemo(() => searchStates(query), [query]);
```

Click handling:

```ts
function selectState(code: string) {
  if (!visitedCodes.has(code)) return;
  setSelectedCode(code);
  setDrawerOpen(true);
}
```

Hover tooltip logic:

- `hoveredStateName` comes from the topojson geography property.
- Convert it with `STATE_NAME_TO_CODE[hoveredStateName]`.
- Lookup state with `getStateByCode(hoveredCode)`.
- Tooltip says either saved place count or `"Not visited yet"`.

### Choropleth Fill

`fillForState(state, selectedCode)` returns:

- unvisited: `rgba(148, 163, 184, 0.14)`
- selected: `#facc15`
- visited intensity:
  - `> 0.75`: `#14b8a6`
  - `> 0.45`: `#2dd4bf`
  - `> 0.2`: `#5eead4`
  - else: `#99f6e4`

Intensity is:

```ts
const intensity = state.placeCount / maxPlaces;
```

### Map Rendering

The real map uses:

```tsx
<ComposableMap projection="geoAlbersUsa" className="h-[420px] w-full">
  <Geographies geography={usStatesTopo as object}>
    {({ geographies }) =>
      geographies.map((geo) => {
        const stateName = geo.properties.name as string;
        const code = STATE_NAME_TO_CODE[stateName];
        if (!code || EXCLUDED_STATE_CODES.has(code)) return null;

        const state = getStateByCode(code);
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
                fill: fillForState(state, selectedCode),
                stroke: isSelected ? "#f8fafc" : "rgba(255,255,255,0.25)",
                strokeWidth: isSelected ? 1.4 : 0.55,
                outline: "none",
                cursor: isVisited ? "pointer" : "default",
                filter: isSelected ? "drop-shadow(0px 0px 10px rgba(250,204,21,0.55))" : "none"
              },
              hover: {
                fill: isVisited ? "#facc15" : "rgba(148, 163, 184, 0.22)",
                stroke: "#f8fafc",
                strokeWidth: 1.2,
                outline: "none",
                cursor: isVisited ? "pointer" : "default"
              },
              pressed: { outline: "none" }
            }}
          />
        );
      })
    }
  </Geographies>
</ComposableMap>
```

Note: `Boolean(state)` works here because the dataset appears to contain only visited states. If the dataset is later expanded to all states, use `Boolean(state?.visited)` instead.

## Main Page Layout

`USATravelMap` renders:

1. Full-screen dark page wrapper.
2. Hero-style panel with:
   - eyebrow label
   - title: “Places I have visited across the USA.”
   - explanatory paragraph
   - three stat cards: visited states, places saved, trips
3. Map card:
   - choropleth legend
   - hover tooltip
   - geographic map
4. Lower two-column section:
   - left: search and visited-state list
   - right: selected-state preview with stats and public-content rule
5. Floating `StateDrawer` mounted at page bottom:
   - `state={selectedState}`
   - `open={drawerOpen}`
   - `onClose={() => setDrawerOpen(false)}`

## Search List

The left panel has an input bound to `query`.

For every `filteredStates` item, render a button:

- clicking calls `selectState(state.stateCode)`
- selected state uses yellow border/background
- unselected state uses subtle dark card style
- show state name, trip primary cities, and place count

If no states match, show a small empty state message.

## Selected-State Preview

The right panel shows:

- selected state name
- explanation of quick preview vs floating card
- “Open card” button that sets `drawerOpen` true
- stat cards:
  - places
  - trips
  - private stops hidden
- public-content rule text explaining that exact homes, apartments, personal stays, banks, errands, and utility stops are hidden.

## State Drawer

File: `src/components/travel/StateDrawer.tsx`

Props:

```ts
type StateDrawerProps = {
  state: TravelState | null;
  open: boolean;
  onClose: () => void;
};
```

Early return:

```ts
if (!open || !state) return null;
```

Derived data:

```ts
const publicPlaces = getPublicPlacesForState(state, 18);
const hiddenPrivateCount = getHiddenPrivateCount(state);
const highlights = getHighlightsForState(state, 8);
```

Drawer behavior:

- Fixed to the right side.
- Width: `min(460px, calc(100vw - 2rem))`.
- Height: `calc(100vh - 2rem)`.
- Dark translucent background with border, shadow, and backdrop blur.
- Internally scrollable body.

Drawer sections:

- Header:
  - state code pill
  - state name
  - sentence with place count, trip count, and hidden private/utility count
  - close button
- Three mini stats:
  - places
  - trips
  - visited date range from first trip
- Trips:
  - title
  - primary city
  - date range
  - place count
- Highlights:
  - public place titles as pills
- Google Maps Links:
  - `PlaceCard` for each public place
- Gallery placeholder:
  - `PhotoGalleryPlaceholder`

## Place Card

File: `src/components/travel/PlaceCard.tsx`

Simple anchor card:

- `href={place.url ?? "#"}`
- `target="_blank"`
- `rel="noreferrer"`
- title
- optional note
- arrow glyph
- hover style shifts border/background toward teal

## Photo Gallery Placeholder

File: `src/components/travel/PhotoGalleryPlaceholder.tsx`

Currently renders six square dashed placeholders:

```txt
{stateName} photo 1
...
{stateName} photo 6
```

This is meant to be replaced later with real portfolio/travel images.

## Tile Map Fallback

File: `src/components/travel/USATravelTileMapFallback.tsx`

Purpose: a sandbox-safe fallback when the geographic map packages or assets are not usable.

Key parts:

- Hardcoded `ALL_CONTIGUOUS_STATES` array with code, name, row, and column.
- 12-column by 6-row CSS grid.
- Each state is a positioned button.
- Alaska and Hawaii are omitted.
- Hover tooltip mirrors the geographic map tooltip.
- Color intensity mirrors choropleth logic, but with Tailwind classes.

Props:

```ts
type USATravelTileMapFallbackProps = {
  selectedCode: string | null;
  onSelect: (code: string) => void;
};
```

The fallback is currently included as a separate component, not rendered by `USATravelMap`. To use it, replace the geographic `<ComposableMap>` area with:

```tsx
<USATravelTileMapFallback selectedCode={selectedCode} onSelect={selectState} />
```

## Styling Notes

The current visual language is:

- dark navy background: `#07111f`
- slate panels and borders
- teal visited-state scale
- yellow selected/hover accent
- rounded panels and cards
- soft shadows and backdrop blur

Primary colors:

```txt
page bg: #07111f
selected/hover: #facc15
visited darkest: #14b8a6
visited mid: #2dd4bf
visited light: #5eead4
visited lightest: #99f6e4
unvisited: rgba(148, 163, 184, 0.14)
```

## Current Test Coverage

`src/lib/travel.test.ts` verifies:

- 11 visited contiguous states
- Alaska and Hawaii are excluded
- California has LA + San Diego trips and 32 places
- max choropleth place count is 47
- private/utility classifier catches address and utility examples
- public state places omit exact address stops
- hidden private/utility stops are counted
- search works by state, landmark, and note text

## Rebuild Checklist For Claude Code

1. Keep travel data in JSON and import it through a helper module.
2. Define the `TravelPlace`, `TravelTrip`, `TravelState`, and `TravelDataset` types.
3. Put all data functions in `src/lib/travel.ts`.
4. Use `STATE_NAME_TO_CODE` to connect `us-atlas` topojson names to state codes.
5. Exclude `AK` and `HI` for v1.
6. Compute `maxPlaces` from visited contiguous states.
7. Use `placeCount / maxPlaces` for choropleth intensity.
8. Default selected state to `CA`.
9. Only allow clicks on visited states.
10. On click, update `selectedCode` and open the drawer.
11. On hover, show a tooltip with state name and saved place count.
12. Render a search panel using `searchStates(query)`.
13. Render a quick selected-state preview.
14. Render the floating `StateDrawer`.
15. In the drawer, use only `getPublicPlacesForState` for public links.
16. Keep private/utility hidden count visible as disclosure.
17. Keep `USATravelTileMapFallback` available for restricted environments.
18. Add or keep tests for data counts, filtering, and search.

## Known Improvement Points

- Replace emoji/glyph UI markers with icon components if integrating into the main portfolio design system.
- If the dataset later includes all states, change `const isVisited = Boolean(state)` to `Boolean(state?.visited)`.
- Replace gallery placeholders with real optimized images.
- Consider moving the repeated `formatPlaces` helper into `src/lib/travel.ts`.
- Review raw JSON for sensitive records before publishing.
