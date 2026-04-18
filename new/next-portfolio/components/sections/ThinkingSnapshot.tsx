import Link from "next/link";

const posts = [
  {
    slug: "high-signal-technical-evaluation",
    tag: "Blog",
    title: "How I Evaluate Technical Projects",
    summary: "My framework for separating depth from presentation polish during reviews."
  },
  {
    slug: "distributed-logging-systems-breakdown",
    tag: "System Design",
    title: "Distributed Logging Systems",
    summary: "Design constraints, ingestion tradeoffs, and what I would extend in production."
  },
  {
    slug: "llm-screen-analysis-notes",
    tag: "Research",
    title: "LLM-Based Screen Recording Analysis",
    summary: "Early notes on extracting reproducible bug narratives from UI recordings."
  }
] as const;

export function ThinkingSnapshot() {
  return (
    <section>
      <div className="section-head">
        <h2>Thinking Snapshot</h2>
        <Link href="/thinking" className="inline-link">
          See all posts →
        </Link>
      </div>

      <div className="thinking-grid">
        {posts.map((post) => (
          <article key={post.slug} className="thinking-card">
            <p className="thinking-tag">{post.tag}</p>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <Link href={`/thinking/${post.slug}`} className="inline-link">
              Read →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
