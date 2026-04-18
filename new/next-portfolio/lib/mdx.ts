import { promises as fs } from "node:fs";
import path from "node:path";

export type ContentMeta = {
  slug: string;
  title: string;
  summary: string;
  date?: string;
  tag?: string;
  tags: string[];
};

export type ContentEntry = ContentMeta & {
  content: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; content: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) {
    return { frontmatter: {}, content: raw.trim() };
  }

  const frontmatterBlock = match[1];
  const frontmatter: Record<string, string> = {};

  for (const line of frontmatterBlock.split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    frontmatter[key] = value;
  }

  return {
    frontmatter,
    content: raw.slice(match[0].length).trim()
  };
}

function parseTags(rawTags?: string): string[] {
  if (!rawTags) {
    return [];
  }

  return rawTags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function toMeta(slug: string, frontmatter: Record<string, string>): ContentMeta {
  return {
    slug,
    title: frontmatter.title ?? slug.replace(/-/g, " "),
    summary: frontmatter.summary ?? "No summary provided.",
    date: frontmatter.date,
    tag: frontmatter.tag,
    tags: parseTags(frontmatter.tags)
  };
}

function byNewestDate(left: ContentMeta, right: ContentMeta): number {
  const leftMs = left.date ? Date.parse(left.date) : 0;
  const rightMs = right.date ? Date.parse(right.date) : 0;
  return rightMs - leftMs;
}

export async function getContentEntries(directory: string): Promise<ContentMeta[]> {
  const targetDir = path.join(CONTENT_ROOT, directory);

  try {
    const fileNames = await fs.readdir(targetDir);
    const entries = await Promise.all(
      fileNames
        .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.(md|mdx)$/, "");
          const filePath = path.join(targetDir, fileName);
          const raw = await fs.readFile(filePath, "utf8");
          const { frontmatter } = parseFrontmatter(raw);
          return toMeta(slug, frontmatter);
        })
    );

    return entries.sort(byNewestDate);
  } catch {
    return [];
  }
}

export async function getContentEntryBySlug(
  directory: string,
  slug: string
): Promise<ContentEntry | null> {
  const targetDir = path.join(CONTENT_ROOT, directory);
  const fileCandidates = [path.join(targetDir, `${slug}.mdx`), path.join(targetDir, `${slug}.md`)];

  for (const filePath of fileCandidates) {
    try {
      const raw = await fs.readFile(filePath, "utf8");
      const { frontmatter, content } = parseFrontmatter(raw);
      return { ...toMeta(slug, frontmatter), content };
    } catch {
      continue;
    }
  }

  return null;
}

export async function getThinkingEntries(): Promise<ContentMeta[]> {
  return getContentEntries("thinking");
}

export async function getThinkingEntryBySlug(slug: string): Promise<ContentEntry | null> {
  return getContentEntryBySlug("thinking", slug);
}

export async function getWorkEntries(): Promise<ContentMeta[]> {
  return getContentEntries("work");
}
