import { units } from "@/data/units";
import { buildLayout, layoutStats } from "./plan";
import type { Plan } from "./types";

export function planUnits(plan: Plan) {
  return units.filter((unit) => unit.plan === plan.slug);
}

export function planFacts(plan: Plan) {
  const list = planUnits(plan);
  const open = list.filter((unit) => unit.status !== "sold");
  const prices = open.map((unit) => unit.price);
  return {
    ...layoutStats(buildLayout(plan)),
    total: list.length,
    available: list.filter((unit) => unit.status === "available").length,
    fromPrice: prices.length ? Math.min(...prices) : null,
    floors: [
      Math.min(...list.map((unit) => unit.floor)),
      Math.max(...list.map((unit) => unit.floor)),
    ] as const,
  };
}
