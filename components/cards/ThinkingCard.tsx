import Link from "next/link";

import type { ThinkingEntry } from "@/lib/content-types";

type ThinkingCardProps = {
  entry: ThinkingEntry;
};

export function ThinkingCard({ entry }: ThinkingCardProps) {
  return (
    <Link
      className="motion-card motion-focus block h-full border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)]"
      href={`/thinking/${entry.slug}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="border-2 border-[var(--ink)] bg-[var(--yellow)] px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-[var(--ink)]">
          {entry.category}
        </span>
        <span className="border-2 border-[var(--ink)] bg-[var(--paper)] px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-[var(--ink)]">
          {entry.status}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-black uppercase leading-none text-[var(--ink)]">
        {entry.title}
      </h3>
      <p className="mt-4 border-t-[3px] border-dashed border-[var(--ink)] pt-4 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
        {entry.summary}
      </p>
    </Link>
  );
}
