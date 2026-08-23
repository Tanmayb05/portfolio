import type { Metadata } from "next";

import "@/app/globals.css";
import { AnalyticsEventBridge } from "@/components/shared/AnalyticsEventBridge";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { SiteProgressBar } from "@/components/shared/SiteProgressBar";
import { absoluteUrl, createPageMetadata, personJsonLd } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: "Portfolio OS",
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "portfolio",
  keywords: [
    "Tanmay Bhuskute",
    "software engineer",
    "cloud infrastructure",
    "backend systems",
    "AI systems",
    "portfolio"
  ],
  ...createPageMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/"
  }),
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-icon"
  },
  manifest: absoluteUrl("/manifest.webmanifest")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AnalyticsEventBridge />
        <SiteProgressBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
