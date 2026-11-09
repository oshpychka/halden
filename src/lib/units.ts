import { getFinish } from "@/data/finishes";
import { getPlan } from "@/data/plans";
import { units } from "@/data/units";
import { buildLayout, compatibleOptions, layoutStats } from "./plan";
import type { Plan, Rect, Unit } from "./types";

export function getUnit(slug: string): Unit | undefined {
  return units.find((unit) => unit.slug === slug);
}

export function planOf(unit: Unit): Plan {
  const plan = getPlan(unit.plan);
  if (!plan) throw new Error(`Unknown plan ${unit.plan}`);
  return plan;
}

export function unitName(unit: Unit): string {
  return unit.floor === 20
    ? `Penthouse ${unit.stack.slice(2)}`
    : `Residence ${unit.floor}${unit.stack}`;
}

export function unitTerrace(unit: Unit, plan: Plan): Rect | undefined {
  if (!unit.balcony) return undefined;
  const { balcony } = plan;
  return unit.mirrored
    ? { ...balcony, x: plan.width - balcony.x - balcony.w }
    : balcony;
}

export type Configuration = { options: string[]; finish: string };

export function configuredPrice(unit: Unit, config: Configuration): number {
  const plan = planOf(unit);
  const options = compatibleOptions(plan, config.options);
  const optionTotal = plan.options
    .filter((option) => options.includes(option.id))
    .reduce((sum, option) => sum + option.price, 0);
  const area = plan.width * plan.depth;
  return (
    unit.price + optionTotal + getFinish(config.finish).pricePerSqft * area
  );
}

export function unitSummary(
  unit: Unit,
  config: Configuration = { options: [], finish: "shell" },
) {
  const plan = planOf(unit);
  const stats = layoutStats(buildLayout(plan, config.options, unit.mirrored));
  return {
    ...stats,
    terrace: unit.balcony ? plan.balcony.w * plan.balcony.h : 0,
    price: configuredPrice(unit, config),
    pricePerSqft: Math.round(unit.price / stats.area),
  };
}

const viewLabels: Record<Unit["view"], string> = {
  bay: "Bay",
  "bay-park": "Bay and park",
  "bay-skyline": "Bay and skyline",
};

export function viewLabel(view: Unit["view"]): string {
  return viewLabels[view];
}
