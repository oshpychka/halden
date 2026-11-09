import { collections, getCollection } from "@/data/collections";
import { facadeDrawing } from "@/lib/og-drawings";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "A collection of residences at The Halden";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const collection = getCollection((await params).slug)!;
  return ogImage({
    eyebrow: "Residences",
    title: collection.heading,
    subtitle: "The Halden, Edgewater, Miami",
    drawing: facadeDrawing(),
    tall: true,
  });
}
