type CaseStudySectionProps = {
  eyebrow?: string;
  title: string;
  items: string[];
  accent?: "blue" | "purple" | "yellow" | "green" | "red";
};

const accentClassName = {
  blue: "bg-[var(--blue)] text-white",
  purple: "bg-[var(--purple)] text-white",
  yellow: "bg-[var(--yellow)] text-[var(--ink)]",
  green: "bg-[var(--green)] text-[var(--ink)]",
  red: "bg-[var(--red)] text-[var(--ink)]"
};

export function CaseStudySection({
  eyebrow,
  title,
  items,
  accent = "purple"
}: CaseStudySectionProps) {
  return (
    <section className="h-full border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
      {eyebrow ? (
        <p
          className={`mb-4 inline-flex border-2 border-[var(--ink)] px-2 py-1 font-mono text-[0.68rem] font-black uppercase shadow-[2px_2px_0_var(--ink)] ${accentClassName[accent]}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-black uppercase leading-none text-[var(--ink)]">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            className="grid grid-cols-[auto_1fr] gap-3 text-sm font-semibold leading-6 text-[var(--text-secondary)]"
            key={item}
          >
            <span
              aria-hidden="true"
              className="mt-2 h-2 w-2 border-2 border-[var(--ink)] bg-[var(--yellow)]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
