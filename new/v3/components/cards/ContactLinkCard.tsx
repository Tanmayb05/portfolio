import Link from "next/link";

type ContactLinkCardProps = {
  description: string;
  href: string;
  label: string;
  title: string;
};

export function ContactLinkCard({
  description,
  href,
  label,
  title
}: ContactLinkCardProps) {
  return (
    <Link
      className="motion-card motion-border-glow motion-focus block rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 hover:bg-[var(--surface-elevated)]"
      href={href}
    >
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-teal)]">
        {label}
      </p>
      <h2 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
        {description}
      </p>
      <span className="mt-5 inline-flex text-sm font-semibold text-[var(--accent-teal)]">
        Open <span aria-hidden="true" className="ml-2">-&gt;</span>
      </span>
    </Link>
  );
}
