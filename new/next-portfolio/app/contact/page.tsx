import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  return (
    <section className="page container contact-page deck-section">
      <h1 className="deck-title">Contact</h1>

      <section className="surface contact-card-list">
        <a href={`mailto:${siteConfig.email}`} className="contact-line">
          {siteConfig.email}
        </a>
        <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="contact-line">
          linkedin.com/in/tanmay-bhuskute
        </a>
        <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="contact-line">
          github.com/Tanmayb05
        </a>
      </section>

      <section className="surface">
        <h2>Let&apos;s build something useful.</h2>
        <ContactForm />
      </section>
    </section>
  );
}
