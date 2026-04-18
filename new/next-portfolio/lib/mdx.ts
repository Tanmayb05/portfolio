export type ContentMeta = {
  slug: string;
  title: string;
  summary: string;
  date?: string;
};

export async function getWorkEntries(): Promise<ContentMeta[]> {
  // TODO: wire this to MDX file parsing in Week 2.
  return [];
}
