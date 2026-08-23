type ContactLinkCardProps = {
  description: string;
  href: string;
  label: string;
  title: string;
  priority?: "primary" | "secondary";
};

const iconByLabel: Record<string, string> = {
  Email: "@",
  LinkedIn: "in",
  Resume: "CV",
  GitHub: "GH"
};

const eventByLabel: Record<string, string> = {
  Email: "email_click",
  LinkedIn: "linkedin_click",
  Resume: "resume_download",
  GitHub: "github_click"
};

export function ContactLinkCard({
  description,
  href,
  label,
  title,
  priority = "secondary"
}: ContactLinkCardProps) {
  const isPrimary = priority === "primary";

  return (
    <a
      className={`motion-focus motion-card group flex h-full min-h-[13rem] flex-col border-[3px] border-[var(--ink)] p-5 shadow-[var(--shadow-md)] ${
        isPrimary
          ? "bg-[var(--red)] text-[var(--ink)]"
          : "bg-[var(--white)] text-[var(--ink)]"
      }`}
      data-analytics-event={eventByLabel[label]}
      data-analytics-payload={JSON.stringify({ surface: "contact_card" })}
      href={href}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`grid h-12 w-12 place-items-center border-[3px] border-[var(--ink)] font-mono text-lg font-black ${
            isPrimary ? "bg-[var(--white)] text-[var(--ink)]" : "bg-[var(--yellow)]"
          }`}
          aria-hidden="true"
        >
          {iconByLabel[label] ?? "->"}
        </span>
        <span className="font-mono text-2xl font-black transition group-hover:translate-x-1 group-hover:-translate-y-1">
          -&gt;
        </span>
      </div>
      <p className="mt-5 font-mono text-xs font-black uppercase opacity-80">
        {label}
      </p>
      <h2 className="mt-2 break-words text-xl font-black uppercase leading-none">
        {title}
      </h2>
      <p className="mt-auto pt-4 text-[0.78rem] font-semibold leading-5 opacity-85">
        {description}
      </p>
    </a>
  );
}
