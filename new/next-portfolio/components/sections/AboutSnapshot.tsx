import Link from "next/link";

export function AboutSnapshot() {
  return (
    <section className="deck-section about-impact">
      <h2 className="deck-title">About &amp; Impact</h2>

      <div className="about-impact-grid">
        <article className="about-impact-card about-impact-visual">
          <div className="about-portrait" />
        </article>

        <article className="about-impact-card">
          <h3>About Me</h3>
          <p>
            MS Computer Science student focused on backend, distributed systems, DevOps, and AI.
          </p>
          <Link href="/about" className="inline-link">
            Read more →
          </Link>
        </article>

        <article className="about-impact-card">
          <h3>Production Impact</h3>
          <p>44 upgrades in 4 months with zero downtime on critical workflows.</p>
          <h3>System Efficiency</h3>
          <p>50% downtime reduction through deployment and reliability engineering.</p>
        </article>
      </div>
    </section>
  );
}
