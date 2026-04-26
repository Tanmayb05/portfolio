import Link from "next/link";

import { ContactLinkCard } from "@/components/cards/ContactLinkCard";
import { TechStackBadge } from "@/components/cards/TechStackBadge";
import { Reveal, StaggerGroup } from "@/components/motion";
import { ResumeDownload } from "@/components/sections/ResumeDownload";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { contactLinks, resume, targetRoles } from "@/lib/content";

const contactMethods = [
  {
    label: "Email",
    title: resume.contact.email,
    description: "Send me a direct note.",
    href: contactLinks.email
  },
  {
    label: "LinkedIn",
    title: resume.contact.linkedin,
    description: "Connect with me professionally.",
    href: contactLinks.linkedin
  },
  {
    label: "GitHub",
    title: resume.contact.github,
    description: "Browse my code and project work.",
    href: contactLinks.github
  }
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Reach me directly."
        description="I keep this page simple. Email is the fastest path, and the links below point to the places I keep active."
      />

      <section className="section-gradient-contact border-b border-[var(--border-soft)] py-20 sm:py-24">
        <SiteContainer>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Links"
                  title="Use the channel that fits."
                  description="I am open to backend, software, DevOps, data, and AI/ML engineering conversations."
                />
                <div className="mt-7 flex flex-wrap gap-3">
                  <ResumeDownload />
                  <Link
                    className="motion-focus rounded-full border border-[var(--border-soft)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition duration-200 hover:border-[var(--accent-teal-border)] hover:bg-[var(--accent-teal-soft)]"
                    href="/experience"
                  >
                    View experience
                  </Link>
                </div>
              </div>
            </Reveal>

            <StaggerGroup className="grid gap-4" staggerDelay={80}>
              {contactMethods.map((method) => (
                <ContactLinkCard
                  description={method.description}
                  href={method.href}
                  key={method.label}
                  label={method.label}
                  title={method.title}
                />
              ))}
            </StaggerGroup>
          </div>
        </SiteContainer>
      </section>

      <section className="section-gradient-thinking py-20 sm:py-24">
        <SiteContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Open to"
              title="Roles I am targeting"
              description="I am actively applying for Summer / Fall 2026 roles and keeping the target surface clear."
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
