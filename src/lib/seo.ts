import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
  image?: string;
};

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  noindex,
  type = "website",
  image = "/opengraph-image",
}: PageMeta): Metadata {
  const suffix = ` | ${site.name}`;
  const full = title.length + suffix.length > 60 ? title : `${title}${suffix}`;
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: path,
      type,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
