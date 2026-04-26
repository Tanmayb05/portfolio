import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="site-footer-links">
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
            linkedin.com/in/tanmay-bhuskute
          </a>
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
            github.com/Tanmayb05
          </a>
        </div>
        <p className="site-footer-tagline">Let&apos;s build something useful.</p>
      </div>
    </footer>
  );
}
