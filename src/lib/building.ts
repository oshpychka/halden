import { units } from "@/data/units";
import type { Unit } from "./types";

export const TOP_FLOOR = 20;
export const PODIUM_FLOORS = 3;

export function floorUnits(floor: number): Unit[] {
  return units.filter((unit) => unit.floor === floor);
}

export function availableOn(floor: number): number {
  return floorUnits(floor).filter((unit) => unit.status === "available").length;
}

export function floorLabel(floor: number): string {
  return floor === TOP_FLOOR ? "Penthouse level" : `Floor ${floor}`;
}

export function availabilityLabel(floor: number): string {
  const count = availableOn(floor);
  const total = floorUnits(floor).length;
  if (count === 0) return "None available";
  return `${count} of ${total} available`;
}
