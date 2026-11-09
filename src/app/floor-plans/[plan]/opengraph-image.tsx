import { getPlan, plans } from "@/data/plans";
import { formatArea } from "@/lib/format";
import { planDrawing } from "@/lib/og-drawings";
import { ogImage, ogSize } from "@/lib/og";
import { buildLayout } from "@/lib/plan";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Floor plan at The Halden";

export function generateStaticParams() {
  return plans.map((plan) => ({ plan: plan.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ plan: string }>;
}) {
  const plan = getPlan((await params).plan)!;
  return ogImage({
    eyebrow: "Floor plan",
    title: plan.name,
    subtitle: `${plan.summary}, ${formatArea(plan.width * plan.depth)}`,
    drawing: planDrawing(buildLayout(plan), plan.balcony),
  });
}
