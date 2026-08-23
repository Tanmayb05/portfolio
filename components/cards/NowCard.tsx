import type { NowItem } from "@/lib/content-types";

type NowCardProps = {
  item: NowItem;
};

export function NowCard({ item }: NowCardProps) {
  return (
    <article className="motion-card border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)]">
      <h3 className="text-xl font-black uppercase leading-none text-[var(--ink)]">
        {item.label}
      </h3>
      <ul className="mt-4 space-y-3">
        {item.items.map((entry) => (
          <li className="grid grid-cols-[auto_1fr] gap-3 text-sm font-semibold leading-6 text-[var(--text-secondary)]" key={entry}>
            <span
              aria-hidden="true"
              className="mt-2 h-2 w-2 border-2 border-[var(--ink)] bg-[var(--green)]"
            />
            <span>{entry}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
