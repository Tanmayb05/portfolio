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
    title: `${entry.title} | Thinking`,
    description: entry.summary
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
      <section className="section-gradient-hero border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer size="reading">
          <Reveal>
            <Link
              className="motion-focus inline-flex text-sm font-semibold text-[var(--accent-teal)] transition duration-200 hover:text-[var(--text-primary)]"
              href="/thinking"
            >
              <span aria-hidden="true" className="mr-2">&lt;-</span> Back to thinking
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                  {entry.category}
                </span>
                <span className="rounded-full border border-[var(--border-soft)] px-2.5 py-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  {entry.status}
                </span>
              </div>
              <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
                {entry.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
                {entry.summary}
              </p>
            </div>
          </Reveal>
        </SiteContainer>
      </section>

      <section className="section-gradient-thinking border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer size="reading">
          <Reveal>
            <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 sm:p-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                Note status
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">
                I am keeping this as a structured snapshot.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
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
