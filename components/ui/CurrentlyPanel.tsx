import { StickerBadge } from "@/components/ui/StickerBadge";

type CurrentlyPanelProps = {
  title?: string;
  items: string[];
  status?: string;
  className?: string;
};

export function CurrentlyPanel({
  title = "Currently",
  items,
  status = "Building",
  className = ""
}: CurrentlyPanelProps) {
  return (
    <aside
      className={`min-w-0 border-[3px] border-[var(--ink)] bg-[var(--white)] p-4 shadow-[var(--shadow-md)] sm:p-5 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-mono text-sm font-black uppercase text-[var(--ink)]">
          {title}
        </h2>
        <StickerBadge
          className="max-w-full whitespace-normal leading-tight"
          tone="yellow"
        >
          {status}
        </StickerBadge>
      </div>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            className="flex gap-3 text-sm font-semibold leading-6 text-[var(--text-secondary)]"
            key={item}
          >
            <span
              aria-hidden="true"
              className="mt-2 h-3 w-3 shrink-0 border-2 border-[var(--ink)] bg-[var(--green)]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
