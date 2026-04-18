import Link from "next/link";
import { getThinkingEntries } from "@/lib/mdx";

export default async function ThinkingPage() {
  const entries = await getThinkingEntries();

  return (
    <section className="page container thinking-page">
      <h1>Thinking</h1>
      <p>
        Writing on backend systems, production engineering, interview preparation, and research-driven
        experimentation.
      </p>

      <section className="thinking-grid">
        {entries.map((entry) => (
          <article key={entry.slug} className="thinking-card">
            <p className="thinking-tag">{entry.tag ?? "Thinking"}</p>
            <h2>{entry.title}</h2>
            <p>{entry.summary}</p>
            <p className="meta-label">{entry.date ?? "Undated"}</p>
            <Link href={`/thinking/${entry.slug}`} className="inline-link">
              Read →
            </Link>
          </article>
        ))}
      </section>
    </section>
  );
}
