import type { Metadata } from "next";

import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { PinnedContactSection } from "@/components/contact/PinnedContactSection";
import { targetRoles } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Email Tanmay Bhuskute for software engineering, cloud, backend, and AI systems roles.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <PinnedContactSection />

      <section className="section-gradient-thinking py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Say Hi"
              title="Role targets"
              description="Email first, LinkedIn second, resume third."
            />
          </Reveal>

          <Reveal className="mt-8" delay={120}>
            <div className="border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--shadow-md)] sm:p-6">
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
