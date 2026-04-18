import Link from "next/link";
import { getThinkingEntries } from "@/lib/mdx";

export async function ThinkingSnapshot() {
  const posts = (await getThinkingEntries()).slice(0, 3);
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
            <p className="thinking-tag">{post.tag ?? "Thinking"}</p>
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
