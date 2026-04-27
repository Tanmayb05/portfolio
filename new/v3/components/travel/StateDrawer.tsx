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

export function StateDrawer({ state, isOpen, onClose }: StateDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState<any[]>([]);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-white shadow-lg z-50 overflow-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {state?.stateName}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {state?.placeCount} places • {state?.tripCount} trip
                    {state?.tripCount !== 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <SearchPanel query={searchQuery} onChange={setSearchQuery} />
            </div>

            <div className="p-4 md:p-6 space-y-4">
              {filteredPlaces.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No places match your search.</p>
                </div>
              ) : (
                <>
                  {filteredPlaces.map((place) => (
                    <PlaceCard key={place.id} place={place} />
                  ))}

                  {hiddenCount > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500">
                      <p>
                        {hiddenCount} address
                        {hiddenCount !== 1 ? "es" : ""}, utility, or errand
                        {hiddenCount !== 1 ? "s" : ""} hidden for privacy
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
