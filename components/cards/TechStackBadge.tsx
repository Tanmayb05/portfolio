type TechStackBadgeProps = {
  children: string;
};

export function TechStackBadge({ children }: TechStackBadgeProps) {
  return (
    <span className="inline-block max-w-full whitespace-normal break-words border-2 border-[var(--ink)] bg-[var(--white)] px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-[var(--ink)]">
      {children}
    </span>
  );
}
