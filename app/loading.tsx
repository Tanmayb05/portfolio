import { SiteContainer } from "@/components/shared/SiteContainer";
import { StickerBadge } from "@/components/ui/StickerBadge";

export default function Loading() {
  return (
    <section className="section-gradient-hero min-h-[60vh] border-b-[3px] border-[var(--ink)] py-[var(--space-section-mobile)] sm:py-[var(--space-section-desktop)]">
      <SiteContainer size="reading">
        <div
          aria-live="polite"
          aria-busy="true"
          className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-6 shadow-[var(--shadow-md)] sm:p-8"
        >
          <StickerBadge tone="yellow">Loading</StickerBadge>
          <h1 className="mt-5 text-[length:var(--text-h2)] font-black uppercase leading-none text-[var(--ink)]">
            Booting Portfolio OS.
          </h1>
          <div className="mt-7 grid gap-3">
            {[0, 1, 2].map((item) => (
              <div
                aria-hidden="true"
                className="h-5 border-[3px] border-[var(--ink)] bg-[var(--paper)]"
                key={item}
              >
                <div
                  className="h-full bg-[var(--yellow)]"
                  style={{ width: `${42 + item * 18}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
