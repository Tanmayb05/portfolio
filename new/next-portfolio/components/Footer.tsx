import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <p className="site-footer-tagline">LET&apos;S BUILD SOMETHING.</p>
        <p className="site-footer-mail">
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
        <p className="site-footer-meta">Built by {siteConfig.name}</p>
      </div>
    </footer>
  );
}
