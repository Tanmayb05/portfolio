"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { BrutalButton } from "@/components/ui/BrutalButton";
import { StickerBadge } from "@/components/ui/StickerBadge";
import { Reveal } from "@/components/motion";
import { SiteContainer } from "@/components/shared/SiteContainer";

const REVEAL_MS = 900;

export function MaraudersGate() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const errorTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => clearTimeout(errorTimeout.current);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("/api/marauders-unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: value })
    });

    if (!response.ok) {
      setError(true);
      clearTimeout(errorTimeout.current);
      errorTimeout.current = setTimeout(() => setError(false), 1600);
      return;
    }

    setError(false);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      router.refresh();
      return;
    }

    setRevealing(true);
    setTimeout(() => router.refresh(), REVEAL_MS);
  }

  return (
    <section className="section-gradient-thinking relative overflow-hidden border-b-[3px] border-[var(--ink)] py-20 sm:py-24">
      <SiteContainer size="reading">
        <Reveal>
          <div className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-6 shadow-[var(--shadow-md)] sm:p-8">
            <StickerBadge tone="yellow">Restricted Parchment</StickerBadge>
            <h2 className="mt-4 text-[length:var(--text-h3)] font-black uppercase leading-none text-[var(--ink)]">
              I solemnly swear.
            </h2>
            <p className="mt-4 max-w-[52ch] text-sm font-semibold leading-6 text-[var(--text-secondary)]">
              These notes are half-formed and honest. Speak the passphrase to
              unfold the map.
            </p>

            <form
              className="mt-7 flex flex-col gap-3 sm:flex-row"
              onSubmit={handleSubmit}
            >
              <label className="sr-only" htmlFor="marauders-password">
                Passphrase
              </label>
              <input
                autoComplete="off"
                className="min-h-11 flex-1 border-[3px] border-[var(--ink)] bg-[var(--paper)] px-3 py-2 font-mono text-sm font-semibold text-[var(--ink)] shadow-[var(--shadow-sm)] outline-none placeholder:text-[var(--text-muted)] motion-focus"
                id="marauders-password"
                name="password"
                onChange={(event) => setValue(event.target.value)}
                placeholder="speak the passphrase..."
                type="text"
                value={value}
              />
              <BrutalButton type="submit">Unlock</BrutalButton>
            </form>

            <p
              aria-live="polite"
              className={`mt-3 font-mono text-xs font-black uppercase transition-opacity ${
                error ? "opacity-100 text-[var(--red)]" : "opacity-0"
              }`}
            >
              Nothing happens. Try again.
            </p>
          </div>
        </Reveal>
      </SiteContainer>

      {revealing ? (
        <div aria-hidden="true" className="marauders-ink-reveal" />
      ) : null}
    </section>
  );
}
