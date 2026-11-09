import { getUpdate, updates } from "@/data/updates";
import { facadeDrawing } from "@/lib/og-drawings";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Construction update from The Halden";

export function generateStaticParams() {
  return updates.map((update) => ({ slug: update.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const update = getUpdate((await params).slug)!;
  return ogImage({
    eyebrow: `Construction, ${update.progress}% complete`,
    title: update.title,
    subtitle: update.milestone,
    drawing: facadeDrawing(
      Math.max(4, Math.round((update.progress / 100) * 20)),
    ),
    tall: true,
  });
}
