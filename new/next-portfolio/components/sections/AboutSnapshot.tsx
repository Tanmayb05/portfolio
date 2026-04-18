import Link from "next/link";

export function AboutSnapshot() {
  return (
    <section className="surface about-snapshot">
      <div>
        <p className="eyebrow">About Snapshot</p>
        <p className="quote">&ldquo;I build systems that scale, ship, and survive.&rdquo;</p>
        <p className="signature">- Tanmay</p>
      </div>
      <div>
        <p>
          I design systems where reliability is a feature, not a post-release fix. My focus is backend,
          distributed systems, and applied AI where architecture decisions directly affect delivery speed.
        </p>
        <Link href="/about" className="inline-link">
          Read more →
        </Link>
      </div>
    </section>
  );
}
