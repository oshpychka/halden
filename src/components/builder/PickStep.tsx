"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { PlanSvg } from "@/components/plan/PlanSvg";
import { StatusChip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { matchUnits, type Needs } from "@/lib/builder";
import {
  formatArea,
  formatBathrooms,
  formatBedrooms,
  formatCompactPrice,
} from "@/lib/format";
import { buildLayout } from "@/lib/plan";
import {
  getUnit,
  planOf,
  unitName,
  unitSummary,
  unitTerrace,
  viewLabel,
} from "@/lib/units";
import { MiniFacade } from "./MiniFacade";

type PickStepProps = {
  needs: Needs;
  selected: string | null;
  onSelect: (slug: string) => void;
};

export function PickStep({ needs, selected, onSelect }: PickStepProps) {
  const { units, relaxed } = matchUnits(needs);
  const [limit, setLimit] = useState(9);
  const shown = units.slice(
    0,
    Math.max(limit, units.findIndex((unit) => unit.slug === selected) + 1),
  );
  const chosen = selected ? getUnit(selected) : undefined;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <div className="grid gap-4">
        {relaxed && (
          <p className="rounded-2xl bg-sand px-5 py-4 text-sm">
            No residence matches every choice, so these are the closest ones
            with the bedrooms you asked for. Go back to change the budget or
            view.
          </p>
        )}
        <div
          role="radiogroup"
          aria-label="Matching residences"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {shown.map((unit) => {
            const plan = planOf(unit);
            const summary = unitSummary(unit);
            const active = unit.slug === selected;
            return (
              <button
                key={unit.slug}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onSelect(unit.slug)}
                className={`relative flex flex-col overflow-hidden rounded-2xl border-2 bg-surface text-left shadow-card transition-all duration-200 ease-drawn ${active ? "border-bay" : "border-transparent hover:border-bay/40"}`}
              >
                <span className="block bg-paper/60 p-3">
                  <PlanSvg
                    layout={buildLayout(plan, [], unit.mirrored)}
                    title={`Plan of ${unitName(unit)}`}
                    terrace={unitTerrace(unit, plan)}
                    detailed={false}
                    className="aspect-[4/3]"
                  />
                </span>
                <span className="flex flex-col gap-1 p-4">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-lg font-bold">{unitName(unit)}</span>
                    <StatusChip status={unit.status} />
                  </span>
                  <span className="text-sm text-muted">
                    {plan.name}, floor {unit.floor},{" "}
                    {viewLabel(unit.view).toLowerCase()} view
                  </span>
                  <span className="tabular mt-2 flex items-baseline justify-between gap-2 text-sm">
                    <span>
                      {formatBedrooms(summary.bedrooms)},{" "}
                      {formatBathrooms(summary.bathrooms)},{" "}
                      {formatArea(summary.area)}
                    </span>
                    <span className="text-base font-bold">
                      {formatCompactPrice(unit.price)}
                    </span>
                  </span>
                </span>
                {active && (
                  <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-bay text-white shadow-card">
                    <Icon name="check" size={18} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {shown.length < units.length && (
          <Button
            variant="secondary"
            onClick={() => setLimit(limit + 9)}
            className="justify-self-start"
          >
            Show {Math.min(9, units.length - shown.length)} more of{" "}
            {units.length - shown.length}
          </Button>
        )}
      </div>
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl bg-surface p-4 shadow-card">
          <p className="text-sm font-bold">Where it is</p>
          <p className="mb-3 text-sm text-muted">
            {chosen
              ? `${unitName(chosen)}, floor ${chosen.floor}`
              : "Select a residence to see it on the building."}
          </p>
          <MiniFacade selected={selected} />
          <p className="mt-2 text-xs text-muted">Seen from the bay.</p>
        </div>
      </div>
    </div>
  );
}
