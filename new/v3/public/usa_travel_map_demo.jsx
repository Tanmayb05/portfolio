import React, { useMemo, useState } from "react";

/*
  USA Travel Map Demo - sandbox-safe version

  Why this version exists:
  - The first version used lucide-react icons and a remote us-atlas CDN map.
  - In this sandbox, those external fetches can fail during build.
  - This rewrite uses no external packages or remote map assets.

  Real portfolio version:
  - Keep this data model and drawer behavior.
  - Replace the tile map with react-simple-maps using a locally stored file such as:
    /public/maps/us-states-10m.json
*/

const ALL_CONTIGUOUS_STATES = [
  { code: "WA", name: "Washington", row: 0, col: 1 },
  { code: "MT", name: "Montana", row: 0, col: 2 },
  { code: "ND", name: "North Dakota", row: 0, col: 3 },
  { code: "MN", name: "Minnesota", row: 0, col: 4 },
  { code: "WI", name: "Wisconsin", row: 0, col: 5 },
  { code: "MI", name: "Michigan", row: 0, col: 6 },
  { code: "ME", name: "Maine", row: 0, col: 10 },

  { code: "OR", name: "Oregon", row: 1, col: 1 },
  { code: "ID", name: "Idaho", row: 1, col: 2 },
  { code: "SD", name: "South Dakota", row: 1, col: 3 },
  { code: "IA", name: "Iowa", row: 1, col: 4 },
  { code: "IL", name: "Illinois", row: 1, col: 5 },
  { code: "IN", name: "Indiana", row: 1, col: 6 },
  { code: "OH", name: "Ohio", row: 1, col: 7 },
  { code: "PA", name: "Pennsylvania", row: 1, col: 8 },
  { code: "NY", name: "New York", row: 1, col: 9 },
  { code: "VT", name: "Vermont", row: 1, col: 10 },
  { code: "NH", name: "New Hampshire", row: 1, col: 11 },

  { code: "CA", name: "California", row: 2, col: 0 },
  { code: "NV", name: "Nevada", row: 2, col: 1 },
  { code: "UT", name: "Utah", row: 2, col: 2 },
  { code: "WY", name: "Wyoming", row: 2, col: 3 },
  { code: "NE", name: "Nebraska", row: 2, col: 4 },
  { code: "MO", name: "Missouri", row: 2, col: 5 },
  { code: "KY", name: "Kentucky", row: 2, col: 6 },
  { code: "WV", name: "West Virginia", row: 2, col: 7 },
  { code: "VA", name: "Virginia", row: 2, col: 8 },
  { code: "MD", name: "Maryland", row: 2, col: 9 },
  { code: "DE", name: "Delaware", row: 2, col: 10 },
  { code: "MA", name: "Massachusetts", row: 2, col: 11 },

  { code: "AZ", name: "Arizona", row: 3, col: 1 },
  { code: "CO", name: "Colorado", row: 3, col: 2 },
  { code: "KS", name: "Kansas", row: 3, col: 3 },
  { code: "AR", name: "Arkansas", row: 3, col: 4 },
  { code: "TN", name: "Tennessee", row: 3, col: 5 },
  { code: "NC", name: "North Carolina", row: 3, col: 6 },
  { code: "SC", name: "South Carolina", row: 3, col: 7 },
  { code: "DC", name: "Washington DC", row: 3, col: 9 },
  { code: "RI", name: "Rhode Island", row: 3, col: 10 },
  { code: "CT", name: "Connecticut", row: 3, col: 11 },

  { code: "NM", name: "New Mexico", row: 4, col: 1 },
  { code: "OK", name: "Oklahoma", row: 4, col: 2 },
  { code: "LA", name: "Louisiana", row: 4, col: 3 },
  { code: "MS", name: "Mississippi", row: 4, col: 4 },
  { code: "AL", name: "Alabama", row: 4, col: 5 },
  { code: "GA", name: "Georgia", row: 4, col: 6 },
  { code: "NJ", name: "New Jersey", row: 4, col: 9 },

  { code: "TX", name: "Texas", row: 5, col: 2 },
  { code: "FL", name: "Florida", row: 5, col: 7 }
];

const travelData = {
  AZ: {
    stateCode: "AZ",
    stateName: "Arizona",
    placeCount: 26,
    hiddenPrivateCount: 11,
    dateRange: "Jul 2025",
    trips: [{ title: "Arizona Trip", primaryCity: "Phoenix / Sedona / Arizona", date: "Jul 2025", placeCount: 26 }],
    highlights: ["Horseshoe Bend", "Lower Antelope Canyon", "Bell Rock Sedona Loop", "Hayden Butte", "Tempe Beach Park"],
    places: [
      { title: "Horseshoe Bend", note: "2025 07 27 Horseshoe Bend", url: "https://www.google.com/maps/place/Horseshoe+Bend/data=!4m2!3m1!1s0x87346c8d22566b09:0x45637089634f1702" },
      { title: "Dixie's Lower Antelope Canyon Tours", note: "2025 07 27 Antelope Tour", url: "https://www.google.com/maps/place/Dixie's+Lower+Antelope+Canyon+Tours/data=!4m2!3m1!1s0x8734139684856e1f:0x2170c2722ad9e485" },
      { title: "Bell Rock Sedona Loop", note: "2025 07 26 Bell Rock Trek", url: "https://www.google.com/maps/place/Bell+Rock+Sedona+Loop/data=!4m2!3m1!1s0x872da5e25211782b:0x87a7e4c0009a0402" },
      { title: "Hayden Butte", note: "2025 07 23 Hike", url: "https://www.google.com/maps/place/Hayden+Butte/data=!4m2!3m1!1s0x872b09276cadb395:0xf1eb20cb92b5c44c" },
      { title: "Tempe Beach Park", note: "2025 07 23 Walk", url: "https://www.google.com/maps/place/Tempe+Beach+Park/data=!4m2!3m1!1s0x872b0928b5ef73dd:0x517c07d2081b1dd" }
    ]
  },
  CA: {
    stateCode: "CA",
    stateName: "California",
    placeCount: 32,
    hiddenPrivateCount: 16,
    dateRange: "Jul 2025",
    trips: [
      { title: "Los Angeles Trip", primaryCity: "Los Angeles", date: "Jul 17, 2025", placeCount: 20 },
      { title: "San Diego Trip", primaryCity: "San Diego", date: "Jul 20, 2025", placeCount: 12 }
    ],
    highlights: ["Santa Monica Pier", "Point Dume", "Griffith Observatory", "La Jolla Sea Lion Cove", "Coast Walk Trail"],
    places: [
      { title: "Santa Monica Pier", note: "Los Angeles", url: "https://www.google.com/maps/place/Santa+Monica+Pier/data=!4m2!3m1!1s0x80c2a4d74d5ea79b:0xcd9a111aced18f4d" },
      { title: "Point Dume", note: "Los Angeles coast", url: "https://www.google.com/maps/place/Point+Dume/data=!4m2!3m1!1s0x80e8190422d9cdef:0xade9c79f838d48d7" },
      { title: "Griffith Observatory", note: "Come early to find a parking spot. LA view.", url: "https://www.google.com/maps/place/Griffith+Observatory/data=!4m2!3m1!1s0x80c2bf61e9d408cb:0x73ff07b1c2d6dadc" },
      { title: "La Jolla Sea lion cove", note: "San Diego", url: "https://www.google.com/maps/place/La+Jolla+Sea+lion+cove/data=!4m2!3m1!1s0x80dc030025131e31:0x19eb677079f13cf" },
      { title: "Coast Walk Trail", note: "Went on a trail", url: "https://www.google.com/maps/place/Coast+Walk+Trail/data=!4m2!3m1!1s0x80dc03fd7830a4e5:0x59df38f1bd0f1c3f" }
    ]
  },
  GA: {
    stateCode: "GA",
    stateName: "Georgia",
    placeCount: 8,
    hiddenPrivateCount: 5,
    dateRange: "Mar 16, 2025",
    trips: [{ title: "Atlanta Trip", primaryCity: "Atlanta", date: "Mar 16, 2025", placeCount: 8 }],
    highlights: ["World of Coca-Cola", "SkyView Atlanta", "Georgia Tech", "Mercedes-Benz Stadium"],
    places: [
      { title: "World of Coca-Cola", note: "2025 03 16 Coca Cola", url: "https://www.google.com/maps/place/World+of+Coca-Cola/data=!4m2!3m1!1s0x88f5047eecc828f3:0x4401b29a011fa7c9" },
      { title: "SkyView Atlanta", note: "2025 03 16 Ferris Wheel", url: "https://www.google.com/maps/place/SkyView+Atlanta/data=!4m2!3m1!1s0x88f5047f594128dd:0x3b7ad19a06579bcc" },
      { title: "Georgia Institute of Technology", note: "2025 03 16 Georgia Tech", url: "https://www.google.com/maps/place/Georgia+Institute+of+Technology/data=!4m2!3m1!1s0x88f5048aebc34fe3:0xb52ad03e3ad8c50f" }
    ]
  },
  IL: {
    stateCode: "IL",
    stateName: "Illinois",
    placeCount: 47,
    hiddenPrivateCount: 23,
    dateRange: "May 2025",
    trips: [{ title: "Chicago + Michigan Trip", primaryCity: "Chicago / Michigan", date: "May 2025", placeCount: 47 }],
    highlights: ["Cloud Gate", "Navy Pier", "Wendella Tours & Cruises", "Starbucks Reserve Roastery", "Mr. Beef"],
    places: [
      { title: "Cloud Gate", note: "2025 05 24 Bean", url: "https://www.google.com/maps/place/Cloud+Gate/data=!4m2!3m1!1s0x880e2ca687332bf5:0x64d3fefce3a4a51" },
      { title: "Navy Pier", note: "2025 05 24 Fireworks", url: "https://www.google.com/maps/place/Navy+Pier/data=!4m2!3m1!1s0x880e2b4d91f12edb:0xd0acdb96b088a4dc" },
      { title: "Wendella Tours & Cruises", note: "2025 05 24 Cruise", url: "https://www.google.com/maps/place/Wendella+Tours+%26+Cruises/data=!4m2!3m1!1s0x880e2caebdbae43b:0x94ac35ee21e943c" },
      { title: "Starbucks Reserve Roastery", note: "2025 05 25 Starbucks Reservatory", url: "https://www.google.com/maps/place/Starbucks+Reserve+Roastery/data=!4m2!3m1!1s0x880e2d35347bc2d7:0xc65e03cf5d97331e" },
      { title: "Mr. Beef", note: "2025 05 25 The Bear Mr Beef", url: "https://www.google.com/maps/place/Mr.+Beef/data=!4m2!3m1!1s0x880e2cb5475ad0bf:0x4917adc43c6303c2" }
    ]
  },
  MI: {
    stateCode: "MI",
    stateName: "Michigan",
    placeCount: 47,
    hiddenPrivateCount: 23,
    dateRange: "May 2025",
    trips: [{ title: "Chicago + Michigan Trip", primaryCity: "Chicago / Michigan", date: "May 2025", placeCount: 47 }],
    highlights: ["Mackinac Island", "Arch Rock", "Pictured Rocks Cruises", "Munising Falls", "Kitch-iti-kipi"],
    places: [
      { title: "Arch Rock", note: "2025 05 27 Bike Ride Point 1", url: "https://www.google.com/maps/place/Arch+Rock/data=!4m2!3m1!1s0x4d35f1f6acd9cba5:0xb4fac0ca487e667d" },
      { title: "British Landing", note: "2025 05 27 Bike Ride Point 3", url: "https://www.google.com/maps/place/British+Landing/data=!4m2!3m1!1s0x4d35f113b5aaf8e5:0xed423959aaa40198" },
      { title: "Pictured Rocks Cruises", note: "2025 05 26 Pictured Rocks Cruise", url: "https://www.google.com/maps/place/Pictured+Rocks+Cruises,+LLC./data=!4m2!3m1!1s0x41aa08b98acb05e9:0xf125ee623420085f" },
      { title: "Munising Falls Visitor Center", note: "2025 05 26 Munising Falls", url: "https://www.google.com/maps/place/Munising+Falls+Visitor+Center/data=!4m2!3m1!1s0x4d4e8cfd2fb45c13:0x1bd4515e83086034" },
      { title: "Kitch-iti-kipi", note: "2025 06 26", url: "https://www.google.com/maps/place/Kitch-iti-kipi/data=!4m2!3m1!1s0x4d4c19e475b4fc33:0x6bdc192aabd3705e" }
    ]
  },
  NJ: {
    stateCode: "NJ",
    stateName: "New Jersey",
    placeCount: 29,
    hiddenPrivateCount: 15,
    dateRange: "Aug 2024 - Jan 2025",
    trips: [{ title: "Rutgers / New Jersey Trip", primaryCity: "New Brunswick / Rutgers", date: "Aug 2024 - Jan 2025", placeCount: 29 }],
    highlights: ["Rutgers", "Long Branch Beach", "Bell Works", "Riverside Gardens Park"],
    places: [
      { title: "Rutgers Cinema", note: "2025 11 21 Cinema", url: "https://www.google.com/maps/place/Rutgers+Cinema/data=!4m2!3m1!1s0x89c3c796de9bad83:0x5baedf6dd43db42a" },
      { title: "Long Branch Beach", note: "2024 08 11 HK Beach Walk", url: "https://www.google.com/maps/place/Long+Branch+Beach/data=!4m2!3m1!1s0x89c2252098797463:0x10dc81d9a23158da" },
      { title: "Bell Works", note: "2024 08 09 HK Evening Walk Bell Works", url: "https://www.google.com/maps/place/Bell+Works/data=!4m2!3m1!1s0x89c2325e255385d1:0x7f2a68b5d5d7da2d" },
      { title: "Riverside Gardens Park", note: "2024 12 25 Red Bank", url: "https://www.google.com/maps/place/Riverside+Gardens+Park/data=!4m2!3m1!1s0x89c2304849233cb9:0x2374edb03cedf94d" }
    ]
  },
  NY: {
    stateCode: "NY",
    stateName: "New York",
    placeCount: 38,
    hiddenPrivateCount: 15,
    dateRange: "Dec 2024 - Jan 2025",
    trips: [{ title: "New York Trip", primaryCity: "New York City", date: "Dec 2024", placeCount: 38 }],
    highlights: ["Central Park", "Brooklyn Bridge", "Times Square", "SUMMIT One Vanderbilt", "Oculus World Trade Center"],
    places: [
      { title: "Central Park", note: null, url: "https://www.google.com/maps/place/Central+Park/data=!4m2!3m1!1s0x89c2589a018531e3:0xb9df1f7387a94119" },
      { title: "Brooklyn Bridge", note: "2024 12 31", url: "https://www.google.com/maps/place/Brooklyn+Bridge/data=!4m2!3m1!1s0x89c25a2343ce7b2b:0x2526ddba7abd465c" },
      { title: "Times Square", note: "2024 12 21", url: "https://www.google.com/maps/place/Times+Square/data=!4m2!3m1!1s0x89c25855c6480299:0x55194ec5a1ae072e" },
      { title: "SUMMIT One Vanderbilt", note: null, url: "https://www.google.com/maps/place/SUMMIT+One+Vanderbilt/data=!4m2!3m1!1s0x89c259ee2035b277:0x5e86025852d8fe6e" },
      { title: "Oculus World Trade Center", note: null, url: "https://www.google.com/maps/place/Oculus+World+Trade+Center/data=!4m2!3m1!1s0x89c25b3ec115fee1:0x3379bef08da10ec1" }
    ]
  },
  OH: {
    stateCode: "OH",
    stateName: "Ohio",
    placeCount: 32,
    hiddenPrivateCount: 12,
    dateRange: "2024 - 2026",
    trips: [{ title: "Cincinnati Places", primaryCity: "Cincinnati", date: "2024 - 2026", placeCount: 32 }],
    highlights: ["Devou Park", "Skyline Chili", "Esquire Theatre", "Ludlow Garage", "Full Throttle Adrenaline Park"],
    places: [
      { title: "Devou Park", note: "2024 12 11 Devou Park", url: "https://www.google.com/maps/place/Devou+Park/data=!4m2!3m1!1s0x8841b6dccbaa6797:0xb1a700d54d752681" },
      { title: "Skyline Chili", note: "2024 12 11 Skyline Chili", url: "https://www.google.com/maps/place/Skyline+Chili/data=!4m2!3m1!1s0x8841b15b07d76117:0x4dbfe35d2edc7b24" },
      { title: "Esquire Theatre", note: "Theatre", url: "https://www.google.com/maps/place/Esquire+Theatre/data=!4m2!3m1!1s0x8841b38710a8e819:0xe9c792b44e4057a2" },
      { title: "Ludlow Garage", note: "2024 09 27 Whitfield Ludlow Garage", url: "https://www.google.com/maps/place/Ludlow+Garage/data=!4m2!3m1!1s0x8841b3876bc214d7:0xc7211c327a507cd8" }
    ]
  },
  PA: {
    stateCode: "PA",
    stateName: "Pennsylvania",
    placeCount: 5,
    hiddenPrivateCount: 0,
    dateRange: "Aug 10, 2024",
    trips: [{ title: "Philadelphia Trip", primaryCity: "Philadelphia", date: "Aug 10, 2024", placeCount: 5 }],
    highlights: ["Rittenhouse Square", "Philadelphia City Hall", "Rittenhouse Farmers' Market", "Kiddo"],
    places: [
      { title: "Rittenhouse Square", note: "2024 08 10 HK City Walk Park", url: "https://www.google.com/maps/place/Rittenhouse+Square/data=!4m2!3m1!1s0x89c6c63a1dab0121:0x15ad49109c3af7a1" },
      { title: "Philadelphia City Hall", note: "2024 08 10 HK Philly City Walk", url: "https://www.google.com/maps/place/Philadelphia+City+Hall/data=!4m2!3m1!1s0x89c6a1a0d0bbbfc9:0x9b6b64e3977584e5" },
      { title: "Kiddo", note: "2024 08 10 HK Brunch", url: "https://www.google.com/maps/place/Kiddo/data=!4m2!3m1!1s0x89c6c7db2b61941f:0x8a45426b1104eff0" }
    ]
  },
  TN: {
    stateCode: "TN",
    stateName: "Tennessee",
    placeCount: 7,
    hiddenPrivateCount: 2,
    dateRange: "Mar 2025",
    trips: [{ title: "Smoky Mountains Spring Break", primaryCity: "Smoky Mountains", date: "Mar 2025", placeCount: 7 }],
    highlights: ["Cades Cove", "Cades Cove Scenic Loop", "The Sinks", "The Townsend Wye"],
    places: [
      { title: "The Sinks", note: "2025 03 15 Smoky Sinks Waterfall", url: "https://www.google.com/maps/place/The+Sinks/data=!4m2!3m1!1s0x885eabf1739650bd:0x1e895d4332bb7178" },
      { title: "The Townsend Wye", note: "2025 03 15 Smoky Townsend Wye", url: "https://www.google.com/maps/place/The+Townsend+Wye/data=!4m2!3m1!1s0x885eaecdc0feb227:0x2a3a6057d7dcd861" },
      { title: "Cades Cove", note: "2025 03 15 Smoky Cades Cove 2", url: "https://www.google.com/maps/place/Cades+Cove/data=!4m2!3m1!1s0x885ea4af548a3245:0x16570a58305f1492" },
      { title: "Cades Cove Scenic Loop", note: "2025 03 15 Smoky Cades Cove", url: "https://www.google.com/maps/place/Cades+Cove+Scenic+Loop/data=!4m2!3m1!1s0x885ea568b96c84bf:0x136ca337faf9d544" }
    ]
  },
  WA: {
    stateCode: "WA",
    stateName: "Washington",
    placeCount: 39,
    hiddenPrivateCount: 22,
    dateRange: "Jul 2025",
    trips: [{ title: "Seattle Trip", primaryCity: "Seattle", date: "Jul 2025", placeCount: 39 }],
    highlights: ["Artist Point", "Golden Gardens Beach", "Picture Lake Viewpoint", "Starbucks Reserve Roastery", "Microsoft East Campus Plaza"],
    places: [
      { title: "Artist Point", note: null, url: "https://www.google.com/maps/place/Artist+Point/data=!4m2!3m1!1s0x8096ec36a6c8ce33:0x167733863952c99b" },
      { title: "Golden Gardens Beach", note: "2025 07 11 Kinjal Surprise Party", url: "https://www.google.com/maps/place/Golden+Gardens+Beach/data=!4m2!3m1!1s0x549017c7ae2d9273:0x5e08236d4601c27d" },
      { title: "Picture Lake Viewpoint", note: "2025 07 12 Picture Lake", url: "https://www.google.com/maps/place/Picture+Lake+Viewpoint/data=!4m2!3m1!1s0x5484f78eb79302dd:0xe5f86ef14d1dac96" },
      { title: "Starbucks Reserve Roastery", note: "2025 07 14 Starbucks", url: "https://www.google.com/maps/place/Starbucks+Reserve+Roastery/data=!4m2!3m1!1s0x54906acdccf44db1:0x6da0c1f2d7a6736e" },
      { title: "Microsoft East Campus Plaza", note: "2025 07 09 Microsoft Campus", url: "https://www.google.com/maps/place/Microsoft+East+Campus+Plaza/data=!4m2!3m1!1s0x54906d35cea59a49:0xe925f837ae094e8f" }
    ]
  }
};

const maxPlaces = Math.max(...Object.values(travelData).map((state) => state.placeCount));

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Travel map test failed: ${message}`);
  }
}

function runDataTests() {
  assert(Object.keys(travelData).length === 11, "expected 11 visited states");
  assert(travelData.CA.trips.length === 2, "California should include LA and San Diego trips");
  assert(travelData.PA.placeCount === 5, "Pennsylvania place count should stay 5");
  assert(!ALL_CONTIGUOUS_STATES.some((state) => state.code === "AK" || state.code === "HI"), "Alaska and Hawaii should be excluded");
  assert(maxPlaces === 47, "max place count should be 47 for choropleth scale");
  return true;
}

const testsPassed = runDataTests();

function icon(symbol) {
  return <span aria-hidden="true" className="inline-block leading-none">{symbol}</span>;
}

function formatPlaces(count) {
  return count === 1 ? "1 place" : `${count} places`;
}

function fillClassForState(code, selectedCode) {
  const data = travelData[code];
  if (!data) return "border-slate-700/60 bg-slate-800/35 text-slate-500";
  if (selectedCode === code) return "border-yellow-200 bg-yellow-300 text-slate-950 shadow-lg shadow-yellow-300/20";

  const intensity = data.placeCount / maxPlaces;
  if (intensity > 0.75) return "border-teal-200/70 bg-teal-400 text-slate-950";
  if (intensity > 0.45) return "border-teal-200/60 bg-teal-300 text-slate-950";
  if (intensity > 0.2) return "border-teal-100/50 bg-teal-200 text-slate-950";
  return "border-teal-50/50 bg-teal-100 text-slate-950";
}

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-xl shadow-black/10 backdrop-blur">
      <div className="text-2xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">{label}</div>
      {sub ? <div className="mt-2 text-sm text-slate-300">{sub}</div> : null}
    </div>
  );
}

function StateTileMap({ selectedCode, onSelect }) {
  const [hoveredCode, setHoveredCode] = useState(null);
  const hoveredState = hoveredCode ? ALL_CONTIGUOUS_STATES.find((state) => state.code === hoveredCode) : null;
  const hoveredTravel = hoveredCode ? travelData[hoveredCode] : null;

  return (
    <div className="relative overflow-hidden rounded-[1.25rem] bg-slate-950/80 p-4">
      {hoveredState ? (
        <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-3 shadow-xl">
          <div className="text-sm font-semibold text-white">{hoveredState.name}</div>
          <div className="text-xs text-slate-400">
            {hoveredTravel ? `${hoveredTravel.placeCount} saved places` : "Not visited yet"}
          </div>
        </div>
      ) : null}

      <div
        className="grid min-h-[420px] w-full gap-2"
        style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gridTemplateRows: "repeat(6, minmax(54px, 1fr))" }}
        aria-label="Contiguous USA visited states tile map"
      >
        {ALL_CONTIGUOUS_STATES.map((state) => {
          const data = travelData[state.code];
          const isVisited = Boolean(data);
          const label = data ? `${state.name}, ${data.placeCount} saved places` : `${state.name}, not visited yet`;

          return (
            <button
              key={state.code}
              type="button"
              aria-label={label}
              disabled={!isVisited}
              onMouseEnter={() => setHoveredCode(state.code)}
              onMouseLeave={() => setHoveredCode(null)}
              onFocus={() => setHoveredCode(state.code)}
              onBlur={() => setHoveredCode(null)}
              onClick={() => isVisited && onSelect(state.code)}
              className={`relative rounded-xl border px-2 py-2 text-left text-xs font-semibold transition duration-200 ${fillClassForState(state.code, selectedCode)} ${isVisited ? "hover:-translate-y-1 hover:scale-[1.03]" : "cursor-not-allowed opacity-55"}`}
              style={{ gridColumn: state.col + 1, gridRow: state.row + 1 }}
            >
              <span className="block text-sm">{state.code}</span>
              {data ? <span className="mt-1 block text-[10px] font-medium opacity-80">{data.placeCount}</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StateDrawer({ state, open, onClose }) {
  if (!open || !state) return null;

  return (
    <aside className="fixed right-4 top-4 z-50 h-[calc(100vh-2rem)] w-[min(440px,calc(100vw-2rem))] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/10 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-200 ring-1 ring-teal-300/20">
                {icon("📍")} {state.stateCode}
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-white">{state.stateName}</h2>
              <p className="mt-2 text-sm text-slate-400">
                {formatPlaces(state.placeCount)} across {state.trips.length} trip{state.trips.length > 1 ? "s" : ""}. Public page hides {state.hiddenPrivateCount} private or utility stops.
              </p>
            </div>
            <button onClick={onClose} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/10">
              Close
            </button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <div className="text-lg font-semibold text-white">{state.placeCount}</div>
              <div className="text-[11px] uppercase tracking-widest text-slate-500">Places</div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <div className="text-lg font-semibold text-white">{state.trips.length}</div>
              <div className="text-[11px] uppercase tracking-widest text-slate-500">Trips</div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <div className="text-lg font-semibold text-white">{state.dateRange}</div>
              <div className="text-[11px] uppercase tracking-widest text-slate-500">Visited</div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              {icon("🗓️")} Trips
            </h3>
            <div className="space-y-3">
              {state.trips.map((trip) => (
                <div key={trip.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="font-medium text-white">{trip.title}</div>
                  <div className="mt-1 text-sm text-slate-400">{trip.primaryCity}</div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>{trip.date}</span>
                    <span>{formatPlaces(trip.placeCount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Highlights</h3>
            <div className="flex flex-wrap gap-2">
              {state.highlights.map((item) => (
                <span key={item} className="rounded-full bg-teal-300/10 px-3 py-1.5 text-sm text-teal-100 ring-1 ring-teal-200/15">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Google Maps Links</h3>
            <div className="space-y-3">
              {state.places.map((place) => (
                <a
                  key={place.title + place.url}
                  href={place.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-teal-300/30 hover:bg-teal-300/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium text-white group-hover:text-teal-100">{place.title}</div>
                      {place.note ? <div className="mt-1 text-sm text-slate-400">{place.note}</div> : null}
                    </div>
                    <span className="mt-1 shrink-0 text-slate-500 group-hover:text-teal-200">↗</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              {icon("🖼️")} Gallery placeholder
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-3 text-center text-[11px] text-slate-500">
                  Add photo {n}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}

export default function USATravelMapDemo() {
  const [selectedCode, setSelectedCode] = useState("CA");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [query, setQuery] = useState("");

  const selectedState = travelData[selectedCode] || travelData.CA;

  const filteredStates = useMemo(() => {
    const q = query.trim().toLowerCase();
    const states = Object.values(travelData);

    if (!q) {
      return states.sort((a, b) => b.placeCount - a.placeCount);
    }

    return states
      .filter((state) =>
        state.stateName.toLowerCase().includes(q) ||
        state.stateCode.toLowerCase().includes(q) ||
        state.highlights.some((highlight) => highlight.toLowerCase().includes(q)) ||
        state.places.some((place) => place.title.toLowerCase().includes(q))
      )
      .sort((a, b) => b.placeCount - a.placeCount);
  }, [query]);

  function selectState(code) {
    setSelectedCode(code);
    setDrawerOpen(true);
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-slate-100">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.22),transparent_36%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(2,6,23,0.98))] p-5 shadow-2xl shadow-black/30 md:p-8">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300">
                {icon("✈️")} USA travel map demo
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Places I have visited across the USA.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
                Click a highlighted state to open a travel card with trips, places, notes, Google Maps links, and a future photo gallery. Alaska and Hawaii are intentionally excluded for this first version.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <StatCard label="Visited states" value="11" sub="Contiguous USA" />
                <StatCard label="Places saved" value="263" sub="From Maps exports" />
                <StatCard label="Trips" value="11" sub="Grouped by state" />
              </div>

              <div className="mt-4 rounded-2xl border border-emerald-300/15 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
                Tests passed: {testsPassed ? "data shape, excluded states, and choropleth scale are valid" : "not run"}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-white">Choropleth intensity</div>
                  <div className="text-xs text-slate-500">Darker = more saved places</div>
                </div>
                <div className="flex gap-1">
                  {["bg-teal-100", "bg-teal-200", "bg-teal-300", "bg-teal-400", "bg-yellow-300"].map((className) => (
                    <span key={className} className={`h-3 w-7 rounded-full ${className}`} />
                  ))}
                </div>
              </div>
              <StateTileMap selectedCode={selectedCode} onSelect={selectState} />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search state or place..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-teal-300/40"
              />
            </div>
            <div className="mt-4 space-y-2">
              {filteredStates.length > 0 ? (
                filteredStates.map((state) => (
                  <button
                    key={state.stateCode}
                    onClick={() => selectState(state.stateCode)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${selectedCode === state.stateCode ? "border-yellow-300/50 bg-yellow-300/10" : "border-white/10 bg-white/[0.025] hover:bg-white/[0.06]"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-medium text-white">{state.stateName}</div>
                        <div className="mt-1 text-sm text-slate-500">{state.dateRange}</div>
                      </div>
                      <div className="rounded-full bg-teal-300/10 px-3 py-1 text-sm text-teal-100">{state.placeCount}</div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm text-slate-400">
                  No states or places matched your search.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <div className="mb-2 text-sm uppercase tracking-[0.25em] text-slate-500">Selected state</div>
                <h2 className="text-4xl font-semibold tracking-tight text-white">{selectedState.stateName}</h2>
                <p className="mt-3 max-w-2xl text-slate-400">
                  This inline panel is the quick preview. The floating drawer is the richer popup-card version for your final site.
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(true)}
                className="rounded-full bg-teal-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
              >
                Open card
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <StatCard label="places" value={selectedState.placeCount} />
              <StatCard label="trips" value={selectedState.trips.length} />
              <StatCard label="private stops hidden" value={selectedState.hiddenPrivateCount} />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-300">
                {icon("🛡️")} Public-content rule
              </div>
              <p className="text-sm leading-6 text-slate-400">
                For the public page, hide exact homes, apartments, personal stays, banks, routine errands, and utility stops. Keep scenic places, campuses, landmarks, food spots, museums, parks, and story-worthy memories.
              </p>
            </div>
          </div>
        </section>
      </div>

      <StateDrawer state={selectedState} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  );
}
