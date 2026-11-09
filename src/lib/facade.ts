import { units } from "@/data/units";
import type { Unit } from "./types";
import { unitSummary } from "./units";

export type FacadeMode = "floors" | "status" | "price" | "view";

export const ELEVATION_ORDER = ["E", "D", "C", "B", "A"];
export const PENTHOUSE_ORDER = ["PH2", "PH1"];

export function elevationColumn(unit: Unit): { index: number; count: number } {
  if (unit.floor === 20) {
    return { index: PENTHOUSE_ORDER.indexOf(unit.stack), count: 2 };
  }
  return { index: ELEVATION_ORDER.indexOf(unit.stack), count: 5 };
}

const sorted = units
  .map((unit) => unitSummary(unit).pricePerSqft)
  .sort((a, b) => a - b);
const STEPS = 4;
const edges = Array.from(
  { length: STEPS + 1 },
  (_, index) =>
    sorted[
      Math.min(sorted.length - 1, Math.floor((index * sorted.length) / STEPS))
    ]!,
);

export function priceBand(unit: Unit): number {
  const value = unitSummary(unit).pricePerSqft;
  const band = edges.findIndex((edge, index) => index > 0 && value < edge) - 1;
  return band < 0 ? STEPS - 1 : band;
}

export function priceBands(): { from: number; to: number }[] {
  return Array.from({ length: STEPS }, (_, index) => ({
    from: edges[index]!,
    to: edges[index + 1]!,
  }));
}
