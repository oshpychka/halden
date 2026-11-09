import type { Unit, UnitStatus, View } from "./types";
import { unitSummary } from "./units";

export type Sort = "floor" | "price-asc" | "price-desc" | "area";

export type Filters = {
  bedrooms: number[];
  bathrooms: number;
  balcony: boolean;
  views: View[];
  floorMin: number;
  floorMax: number;
  priceMax: number;
  status: UnitStatus[];
  sort: Sort;
};

export const FLOOR_MIN = 4;
export const FLOOR_MAX = 20;

export const defaultFilters: Filters = {
  bedrooms: [],
  bathrooms: 0,
  balcony: false,
  views: [],
  floorMin: FLOOR_MIN,
  floorMax: FLOOR_MAX,
  priceMax: 0,
  status: ["available", "reserved"],
  sort: "floor",
};

type Params = { get(name: string): string | null };

const VIEWS: View[] = ["bay", "bay-park", "bay-skyline"];
const STATUSES: UnitStatus[] = ["available", "reserved", "sold"];
const SORTS: Sort[] = ["floor", "price-asc", "price-desc", "area"];

function list(value: string | null): string[] {
  return (value ?? "").split(",").filter(Boolean);
}

function clampInt(
  value: string | null,
  fallback: number,
  min: number,
  max: number,
): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed)
    ? Math.min(max, Math.max(min, parsed))
    : fallback;
}

function isView(value: string): value is View {
  return VIEWS.includes(value as View);
}

function isStatus(value: string): value is UnitStatus {
  return STATUSES.includes(value as UnitStatus);
}

export function parseFilters(params: Params): Filters {
  const sort = params.get("sort") as Sort;
  const floorMin = clampInt(
    params.get("floor-min"),
    FLOOR_MIN,
    FLOOR_MIN,
    FLOOR_MAX,
  );
  const status = params.get("status");
  return {
    bedrooms: list(params.get("beds"))
      .map(Number)
      .filter((value) => [0, 1, 2, 3].includes(value)),
    bathrooms: clampInt(params.get("baths"), 0, 0, 3),
    balcony: params.get("terrace") === "1",
    views: list(params.get("view")).filter(isView),
    floorMin,
    floorMax: clampInt(params.get("floor-max"), FLOOR_MAX, floorMin, FLOOR_MAX),
    priceMax: clampInt(params.get("price-max"), 0, 0, 20_000_000),
    status:
      status === null ? defaultFilters.status : list(status).filter(isStatus),
    sort: SORTS.includes(sort) ? sort : "floor",
  };
}

export function filtersQuery(filters: Filters): string {
  const parts: string[] = [];
  const add = (key: string, value: string) => parts.push(`${key}=${value}`);
  if (filters.bedrooms.length)
    add("beds", [...filters.bedrooms].sort().join(","));
  if (filters.bathrooms) add("baths", String(filters.bathrooms));
  if (filters.balcony) add("terrace", "1");
  if (filters.views.length) add("view", filters.views.join(","));
  if (filters.floorMin !== FLOOR_MIN)
    add("floor-min", String(filters.floorMin));
  if (filters.floorMax !== FLOOR_MAX)
    add("floor-max", String(filters.floorMax));
  if (filters.priceMax) add("price-max", String(filters.priceMax));
  if (filters.status.join() !== defaultFilters.status.join()) {
    add("status", filters.status.join(","));
  }
  if (filters.sort !== "floor") add("sort", filters.sort);
  return parts.length ? `?${parts.join("&")}` : "";
}

export function applyFilters(units: Unit[], filters: Filters): Unit[] {
  const rows = units
    .map((unit) => ({ unit, summary: unitSummary(unit) }))
    .filter(({ unit, summary }) => {
      const beds = Math.min(3, summary.bedrooms);
      if (filters.bedrooms.length && !filters.bedrooms.includes(beds))
        return false;
      if (summary.bathrooms < filters.bathrooms) return false;
      if (filters.balcony && !unit.balcony) return false;
      if (filters.views.length && !filters.views.includes(unit.view))
        return false;
      if (unit.floor < filters.floorMin || unit.floor > filters.floorMax)
        return false;
      if (filters.priceMax && unit.price > filters.priceMax) return false;
      return filters.status.includes(unit.status);
    });
  type Row = (typeof rows)[number];
  const sorters: Record<Sort, (a: Row, b: Row) => number> = {
    floor: (a, b) =>
      a.unit.floor - b.unit.floor || a.unit.stack.localeCompare(b.unit.stack),
    "price-asc": (a, b) => a.unit.price - b.unit.price,
    "price-desc": (a, b) => b.unit.price - a.unit.price,
    area: (a, b) => b.summary.area - a.summary.area,
  };
  return rows.sort(sorters[filters.sort]).map(({ unit }) => unit);
}
