import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  type?: "website" | "article";
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteConfig.url}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  imagePath = "/opengraph-image",
  type = "website"
}: PageMetadataInput): Metadata {
  const fullTitle =
    title === siteConfig.name ? siteConfig.title : `${title} | ${siteConfig.name}`;
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(imagePath);

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} social preview`
        }
      ],
      locale: "en_US",
      type
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl]
    }
  };
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: "Software Engineer",
  sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
  knowsAbout: [
    "Cloud infrastructure",
    "Backend systems",
    "AI systems",
    "Distributed systems",
    "DevOps"
  ]
};
