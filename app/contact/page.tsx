import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { PinnedContactSection } from "@/components/contact/PinnedContactSection";
import { targetRoles } from "@/lib/content";

export default function ContactPage() {
  return (
    <>
      <PinnedContactSection />

      <section className="section-gradient-thinking py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Say Hi"
              title="Roles I'm shamelessly hunting for."
            />
          </Reveal>

          <Reveal className="mt-8" delay={120}>
            <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-card)] p-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {targetRoles.map((role) => (
                  <TechStackBadge key={role}>{role}</TechStackBadge>
                ))}
              </div>
            </div>
          </Reveal>
        </SiteContainer>
      </section>
    </>
  );
}
