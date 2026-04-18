import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { PageTransition } from "@/components/motion/PageTransition";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.siteUrl,
    siteName: `${siteConfig.name} Portfolio`
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Nav />
          <main id="main-content">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
