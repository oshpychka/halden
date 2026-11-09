import type { MetadataRoute } from "next";
import { collections } from "@/data/collections";
import { plans } from "@/data/plans";
import { posts } from "@/data/posts";
import { site } from "@/data/site";
import { units } from "@/data/units";
import { updates } from "@/data/updates";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(site.updated);
  const paths = [
    "/",
    "/residences",
    "/floor-plans",
    "/build",
    "/progress",
    "/journal",
    "/privacy",
    ...units.map((unit) => `/residences/${unit.slug}`),
    ...plans.map((plan) => `/floor-plans/${plan.slug}`),
    ...collections.map((collection) => `/collections/${collection.slug}`),
  ];
  return [
    ...paths.map((path) => ({ url: absoluteUrl(path), lastModified: updated })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/journal/${post.slug}`),
      lastModified: new Date(post.updated),
    })),
    ...updates.map((update) => ({
      url: absoluteUrl(`/progress/${update.slug}`),
      lastModified: new Date(update.date),
    })),
  ];
}
