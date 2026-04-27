"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TravelEntry } from "@/lib/content-types";
import { getPublicPlacesForState, getHiddenPrivateCount, formatDateRange } from "@/lib/travel";
import { SearchPanel } from "@/components/travel/SearchPanel";
import { PlaceCard } from "@/components/travel/PlaceCard";

interface StateDrawerProps {
  state: TravelEntry | null;
  isOpen: boolean;
  onClose: () => void;
}

type DrawerTab = "overview" | "trips" | "highlights" | "photos";

export function StateDrawer({ state, isOpen, onClose }: StateDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<DrawerTab>("overview");

  useEffect(() => {
    if (!state) {
      setFilteredPlaces([]);
      return;
    }

    const publicPlaces = getPublicPlacesForState(state);
    if (!searchQuery) {
      setFilteredPlaces(publicPlaces);
      return;
    }

    const q = searchQuery.toLowerCase();
    setFilteredPlaces(
      publicPlaces.filter(
        (place) =>
          place.title.toLowerCase().includes(q) ||
          (place.note && place.note.toLowerCase().includes(q))
      )
    );
  }, [state, searchQuery]);

  const hiddenCount = state ? getHiddenPrivateCount(state) : 0;

  const getStateHighlights = (s: TravelEntry): string[] => {
    if (!s.trips || s.trips.length === 0) return [];
    const highlights: string[] = [];
    for (const trip of s.trips) {
      if (trip.places.length > 0) {
        const topPlaces = trip.places.slice(0, 5);
        highlights.push(...topPlaces.map((p) => p.title));
      }
    }
    return highlights.slice(0, 5);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />
          <motion.div
            initial={{ x: "100%", y: "100%" }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: "100%", y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 md:bottom-auto md:top-0 w-full md:w-96 h-full md:h-auto bg-[var(--surface-elevated)] backdrop-blur-lg shadow-2xl z-50 overflow-hidden flex flex-col md:rounded-lg md:m-4 md:max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex-shrink-0 sticky top-0 bg-[var(--surface-elevated)] border-b border-[var(--border-soft)] p-4 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                    {state?.stateName}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {state?.placeCount} places • {state?.tripCount} trip
                    {state?.tripCount !== 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] text-2xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 border-b border-[var(--border-soft)]">
                {(["overview", "trips", "highlights", "photos"] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? "border-[var(--accent)] text-[var(--accent)]"
                          : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <SearchPanel query={searchQuery} onChange={setSearchQuery} />
                  {filteredPlaces.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-[var(--text-muted)]">
                        No places match your search.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredPlaces.map((place) => (
                        <PlaceCard key={place.id} place={place} />
                      ))}
                      {hiddenCount > 0 && (
                        <div className="mt-6 pt-6 border-t border-[var(--border-soft)] text-xs text-[var(--text-muted)]">
                          <p>
                            {hiddenCount} address
                            {hiddenCount !== 1 ? "es" : ""}, utility, or errand
                            {hiddenCount !== 1 ? "s" : ""} hidden for privacy
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "trips" && (
                <div className="space-y-4">
                  {state?.trips && state.trips.length > 0 ? (
                    state.trips.map((trip) => (
                      <div
                        key={trip.id}
                        className="p-3 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-soft)]"
                      >
                        <h3 className="font-semibold text-[var(--text-primary)] text-sm">
                          {trip.title}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">
                          {trip.primaryCity}
                        </p>
                        {trip.dateRange && (
                          <p className="text-xs text-[var(--text-muted)] mt-1">
                            {formatDateRange(trip.dateRange)}
                          </p>
                        )}
                        <p className="text-xs text-[var(--text-secondary)] mt-2">
                          {trip.places.length} place
                          {trip.places.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[var(--text-muted)] text-sm">
                      No trips recorded.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "highlights" && (
                <div className="space-y-3">
                  <p className="text-xs text-[var(--text-secondary)]">
                    Top places from your trips
                  </p>
                  {getStateHighlights(state!).length > 0 ? (
                    <ul className="space-y-2">
                      {getStateHighlights(state!).map((highlight, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-[var(--text-primary)] flex items-start gap-2"
                        >
                          <span className="text-[var(--accent)] font-semibold">
                            •
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[var(--text-muted)] text-sm">
                      No highlights available.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "photos" && (
                <div className="space-y-4">
                  <div className="text-center py-8 px-4 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-soft)] border-dashed">
                    <p className="text-[var(--text-muted)] text-sm">
                      📸 Photos coming soon
                    </p>
                    <p className="text-[var(--text-secondary)] text-xs mt-1">
                      Photo gallery will be available soon
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
