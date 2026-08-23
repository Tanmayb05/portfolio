"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section-gradient-contact min-h-[70vh] border-b-[3px] border-[var(--ink)] py-[var(--space-section-mobile)] sm:py-[var(--space-section-desktop)]">
      <div className="mx-auto w-full max-w-[var(--reading-max)] px-[var(--gutter-mobile)] sm:px-[var(--gutter-tablet)] lg:px-[var(--gutter-desktop)]">
        <div className="border-[3px] border-[var(--ink)] bg-[var(--paper)] p-6 shadow-[var(--shadow-md)] sm:p-8">
          <span className="inline-flex border-2 border-[var(--ink)] bg-[var(--red)] px-2 py-1 font-mono text-[0.68rem] font-black uppercase text-[var(--ink)]">
            Runtime fault
          </span>
          <h1 className="mt-5 text-[length:var(--text-h1)] font-black uppercase leading-[0.9] text-[var(--ink)]">
            System interrupted.
          </h1>
          <p className="mt-6 border-t-[3px] border-[var(--ink)] pt-5 text-base font-semibold leading-7 text-[var(--text-secondary)]">
            The page failed while rendering. Try the route again or return to
            the base system.
          </p>
          {error.digest ? (
            <p className="mt-4 font-mono text-xs font-black uppercase text-[var(--text-muted)]">
              Digest: {error.digest}
            </p>
          ) : null}
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              className="motion-focus inline-flex min-h-11 items-center justify-center border-[3px] border-[var(--ink)] bg-[var(--red)] px-4 py-2 font-mono text-sm font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
              type="button"
              onClick={reset}
            >
              Retry route
            </button>
            <a
              className="motion-focus inline-flex min-h-11 items-center justify-center border-[3px] border-[var(--ink)] bg-[var(--white)] px-4 py-2 font-mono text-sm font-black uppercase text-[var(--ink)] shadow-[var(--shadow-sm)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_var(--ink)]"
              href="/"
            >
              &lt;- Return to base
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
