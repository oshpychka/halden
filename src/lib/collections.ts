import type { CollectionFilter } from "@/data/collections";
import { units } from "@/data/units";
import type { Unit } from "./types";
import { unitSummary } from "./units";

export function matchesCollection(
  unit: Unit,
  filter: CollectionFilter,
): boolean {
  const { bedrooms } = unitSummary(unit);
  if (filter.bedrooms !== undefined && bedrooms !== filter.bedrooms)
    return false;
  if (filter.minBedrooms !== undefined && bedrooms < filter.minBedrooms)
    return false;
  if (filter.balcony !== undefined && unit.balcony !== filter.balcony)
    return false;
  if (filter.views && !filter.views.includes(unit.view)) return false;
  if (filter.minFloor !== undefined && unit.floor < filter.minFloor)
    return false;
  if (filter.maxPrice !== undefined && unit.price >= filter.maxPrice)
    return false;
  if (filter.stacks && !filter.stacks.includes(unit.stack)) return false;
  if (filter.plans && !filter.plans.includes(unit.plan)) return false;
  return true;
}

export function collectionUnits(filter: CollectionFilter): Unit[] {
  return units.filter((unit) => matchesCollection(unit, filter));
}
