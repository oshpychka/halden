import Link from "next/link";
import { PlanSvg } from "@/components/plan/PlanSvg";
import { StatusChip } from "@/components/ui/Chip";
import { SaveButton } from "./SaveButton";
import {
  formatArea,
  formatBathrooms,
  formatBedrooms,
  formatPrice,
} from "@/lib/format";
import { buildLayout } from "@/lib/plan";
import type { Unit } from "@/lib/types";
import {
  planOf,
  unitName,
  unitSummary,
  unitTerrace,
  viewLabel,
} from "@/lib/units";

export function UnitCard({ unit }: { unit: Unit }) {
  const plan = planOf(unit);
  const summary = unitSummary(unit);
  const name = unitName(unit);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface shadow-card transition-shadow duration-200 ease-drawn hover:shadow-lift">
      <div className="bg-paper/60 p-4">
        <PlanSvg
          layout={buildLayout(plan, [], unit.mirrored)}
          title={`Plan of ${name}`}
          terrace={unitTerrace(unit, plan)}
          detailed={false}
          className="aspect-[4/3]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl leading-tight">
            <Link
              href={`/residences/${unit.slug}`}
              className="after:absolute after:inset-0"
            >
              {name}
            </Link>
          </h3>
          <div className="flex items-center gap-2">
            <StatusChip status={unit.status} />
            <SaveButton slug={unit.slug} name={name} compact />
          </div>
        </div>
        <p className="text-sm text-muted">
          {plan.name}, floor {unit.floor}, {viewLabel(unit.view).toLowerCase()}{" "}
          view
        </p>
        <p className="tabular mt-auto flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <span>{formatBedrooms(summary.bedrooms)}</span>
          <span>{formatBathrooms(summary.bathrooms)}</span>
          <span>{formatArea(summary.area)}</span>
        </p>
        <p className="tabular text-lg font-medium">
          {unit.status === "sold" ? "Sold" : formatPrice(unit.price)}
        </p>
      </div>
    </article>
  );
}
