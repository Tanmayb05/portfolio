import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CaseStudySection } from "@/components/cards/CaseStudySection";
import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { Reveal } from "@/components/motion";
import { SiteContainer } from "@/components/shared/SiteContainer";
import {
  getThinkingEntryBySlug,
  thinkingEntries
} from "@/content/thinking";
import { createPageMetadata } from "@/lib/metadata";

type ThinkingDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return thinkingEntries.map((entry) => ({
    slug: entry.slug
  }));
}

export function generateMetadata({
  params
}: ThinkingDetailPageProps): Metadata {
  const entry = getThinkingEntryBySlug(params.slug);

  if (!entry) {
    return {};
  }

  return {
    ...createPageMetadata({
      title: entry.title,
      description: entry.summary,
      path: `/thinking/${entry.slug}`,
      type: "article"
    })
  };
}

export default function ThinkingDetailPage({
  params
}: ThinkingDetailPageProps) {
  const entry = getThinkingEntryBySlug(params.slug);

  if (!entry) {
    notFound();
  }

  return (
    <>
      <section className="section-gradient-hero border-b-[3px] border-[var(--ink)] py-16 sm:py-20">
        <SiteContainer size="reading">
          <Reveal>
            <Link
              className="motion-focus inline-flex border-[3px] border-[var(--ink)] bg-[var(--white)] px-3 py-2 font-mono text-xs font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
              href="/thinking"
            >
              <span aria-hidden="true" className="mr-2">&lt;-</span> Back to thinking
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="border-2 border-[var(--ink)] bg-[var(--yellow)] px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-[var(--ink)]">
                  {entry.category}
                </span>
                <span className="border-2 border-[var(--ink)] bg-[var(--white)] px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-[var(--ink)]">
                  {entry.status}
                </span>
              </div>
              <h1 className="mt-5 text-balance text-[length:var(--text-h1)] font-black uppercase leading-[0.95] text-[var(--ink)]">
                {entry.title}
              </h1>
              <p className="mt-6 border-t-[3px] border-[var(--ink)] pt-5 text-lg font-semibold leading-8 text-[var(--text-secondary)]">
                {entry.summary}
              </p>
            </div>
          </Reveal>
        </SiteContainer>
      </section>

      <section className="section-gradient-thinking border-b-[3px] border-[var(--ink)] py-16 sm:py-20">
        <SiteContainer size="reading">
          <Reveal>
            <div className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
              <p className="font-mono text-xs font-black uppercase text-[var(--ink)]">
                Note status
              </p>
              <h2 className="mt-4 text-2xl font-black uppercase leading-none text-[var(--ink)]">
                I am keeping this as a structured snapshot.
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-[var(--text-secondary)]">
                This page captures the verified direction of the note without
                pretending the full essay is already written.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <TechStackBadge key={tag}>{tag}</TechStackBadge>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-6 space-y-6">
            <Reveal delay={80}>
              <CaseStudySection
                title="What this note will cover"
                items={entry.focusPoints}
              />
            </Reveal>

            <Reveal delay={160}>
              <CaseStudySection
                title="Source references"
                items={entry.source.map((source) => source)}
              />
            </Reveal>
          </div>
        </SiteContainer>
      </section>
    </>
  );
}
