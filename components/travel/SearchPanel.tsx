"use client";

interface SearchPanelProps {
  query: string;
  onChange: (query: string) => void;
}

export function SearchPanel({ query, onChange }: SearchPanelProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search places..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {query && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
