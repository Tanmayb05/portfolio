import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  return (
    <section className="page container contact-page">
      <h1>Contact</h1>

      <p>
        Open to backend, distributed systems, and applied AI engineering opportunities for Summer/Fall
        2026.
      </p>

      <section className="surface contact-cards">
        <a href={`mailto:${siteConfig.email}`} className="contact-card">
          <p className="eyebrow">Email</p>
          <p>{siteConfig.email}</p>
        </a>
        <a
          href={siteConfig.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
        >
          <p className="eyebrow">GitHub</p>
          <p>github.com/Tanmayb05</p>
        </a>
        <a
          href={siteConfig.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
        >
          <p className="eyebrow">LinkedIn</p>
          <p>linkedin.com/in/tanmay-bhuskute</p>
        </a>
      </section>

      <section className="surface">
        <h2>Send a Message</h2>
        <p>
          This opens your email app with a pre-filled draft so we can keep communication direct and
          lightweight.
        </p>
        <ContactForm />
      </section>
    </section>
  );
}
