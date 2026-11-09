import { units } from "@/data/units";
import { formatArea, formatBedrooms, formatCompactPrice } from "@/lib/format";
import { planDrawing } from "@/lib/og-drawings";
import { ogImage, ogSize } from "@/lib/og";
import { buildLayout } from "@/lib/plan";
import {
  getUnit,
  planOf,
  unitName,
  unitSummary,
  unitTerrace,
} from "@/lib/units";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Floor plan of a residence at The Halden";

export function generateStaticParams() {
  return units.map((unit) => ({ unit: unit.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const unit = getUnit((await params).unit)!;
  const plan = planOf(unit);
  const summary = unitSummary(unit);
  return ogImage({
    eyebrow: `${plan.name}, floor ${unit.floor}`,
    title: unitName(unit),
    subtitle: `${formatBedrooms(summary.bedrooms)}, ${formatArea(summary.area)}${unit.status === "sold" ? "" : `, from ${formatCompactPrice(unit.price)}`}`,
    drawing: planDrawing(
      buildLayout(plan, [], unit.mirrored),
      unitTerrace(unit, plan),
    ),
  });
}
