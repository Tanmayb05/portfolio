import { notFound } from "next/navigation";
import { getThinkingEntries, getThinkingEntryBySlug } from "@/lib/mdx";

function renderMarkdownLines(content: string): JSX.Element[] {
  const lines = content.split("\n").map((line) => line.trim());
  const blocks: JSX.Element[] = [];
  const paragraphBuffer: string[] = [];
  const listBuffer: string[] = [];

  function flushParagraph() {
    if (!paragraphBuffer.length) {
      return;
    }

    blocks.push(<p key={`p-${blocks.length}`}>{paragraphBuffer.join(" ")}</p>);
    paragraphBuffer.length = 0;
  }

  function flushList() {
    if (!listBuffer.length) {
      return;
    }

    blocks.push(
      <ul key={`ul-${blocks.length}`}>
        {listBuffer.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
    listBuffer.length = 0;
  }

  for (const line of lines) {
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push(<h2 key={`h2-${blocks.length}`}>{line.replace(/^##\s+/, "")}</h2>);
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      listBuffer.push(line.replace(/^- /, ""));
      continue;
    }

    flushList();
    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}

export async function generateStaticParams() {
  const entries = await getThinkingEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export default async function ThinkingDetailPage({ params }: { params: { slug: string } }) {
  const entry = await getThinkingEntryBySlug(params.slug);
  if (!entry) {
    notFound();
  }

  return (
    <section className="page container thinking-detail-page">
      <p className="thinking-tag">{entry.tag ?? "Thinking"}</p>
      <h1>{entry.title}</h1>
      <p>{entry.summary}</p>
      <p className="now-updated">{entry.date ?? "Undated"}</p>
      <section className="surface thinking-richtext">{renderMarkdownLines(entry.content)}</section>
    </section>
  );
}
