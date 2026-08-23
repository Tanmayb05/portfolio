import { ContactLinkCard } from "@/components/cards/ContactLinkCard";
import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { StickerBadge } from "@/components/ui/StickerBadge";
import {
  contactLinks,
  resume,
  resumeDownload,
  targetRoles
} from "@/lib/content";

const contactMethods = [
  {
    label: "Email",
    title: "Email me",
    description: resume.contact.email,
    href: contactLinks.email,
    priority: "primary" as const
  },
  {
    label: "LinkedIn",
    title: "LinkedIn",
    description: resume.contact.linkedin,
    href: contactLinks.linkedin
  },
  {
    label: "Resume",
    title: "Resume",
    description: "One-click PDF for recruiters.",
    href: resumeDownload.href
  }
];

export function PinnedContactSection() {
  return (
    <section className="section-gradient-contact border-b-[3px] border-[var(--ink)] py-[var(--space-section-mobile)] sm:py-[var(--space-section-desktop)]">
      <SiteContainer size="wide">
        <div className="grid gap-8 border-[3px] border-[var(--ink)] bg-[var(--paper)] p-5 shadow-[var(--shadow-md)] sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <StickerBadge tone="red">Available for</StickerBadge>
            <h1 className="mt-5 text-[length:var(--text-h1)] font-black uppercase leading-[0.92] text-[var(--ink)]">
              Software engineering.
              <br />
              Cloud / backend / AI systems.
            </h1>
            <p className="mt-6 max-w-[42rem] border-t-[3px] border-[var(--ink)] pt-4 text-[length:var(--text-body-lg)] font-semibold leading-8 text-[var(--text-secondary)]">
              Cincinnati, OH. Actively searching for New Grad roles or
              Internships.
              Expected M.S. Computer Science graduation: December 2026.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {targetRoles.slice(0, 4).map((role) => (
                <TechStackBadge key={role}>{role}</TechStackBadge>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {contactMethods.map((method) => (
              <ContactLinkCard
                description={method.description}
                href={method.href}
                key={method.label}
                label={method.label}
                priority={method.priority}
                title={method.title}
              />
            ))}
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
