import Link from "next/link";
import { StatusChip } from "@/components/ui/Chip";
import { availabilityLabel, floorLabel, floorUnits } from "@/lib/building";
import { formatArea, formatBedrooms, formatCompactPrice } from "@/lib/format";
import { planOf, unitName, unitSummary } from "@/lib/units";
import { FloorPlate } from "./FloorPlate";

export function FloorPanel({ floor }: { floor: number }) {
  const units = floorUnits(floor);
  return (
    <section
      aria-labelledby="floor-panel-heading"
      aria-live="polite"
      className="flex flex-col gap-5"
    >
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
        <h2 id="floor-panel-heading" className="font-display text-4xl">
          {floorLabel(floor)}
        </h2>
        <p className="tabular text-sm text-muted">{availabilityLabel(floor)}</p>
      </div>
      <figure>
        <FloorPlate floor={floor} />
        <figcaption className="mt-2 text-xs text-muted">
          Plan view, bay side at the top.
        </figcaption>
      </figure>
      <ul className="divide-y divide-line border-y border-line">
        {units.map((unit) => {
          const summary = unitSummary(unit);
          return (
            <li key={unit.slug}>
              <Link
                href={`/residences/${unit.slug}`}
                className="grid min-h-14 grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-3 hover:bg-surface"
              >
                <span className="font-medium">{unitName(unit)}</span>
                <span className="tabular text-right">
                  {unit.status === "sold" ? "" : formatCompactPrice(unit.price)}
                </span>
                <span className="tabular text-sm text-muted">
                  {planOf(unit).name},{" "}
                  {formatBedrooms(summary.bedrooms).toLowerCase()},{" "}
                  {formatArea(summary.area)}
                </span>
                <StatusChip status={unit.status} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
