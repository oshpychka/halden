import { getPlan } from "@/data/plans";
import { units } from "@/data/units";
import {
  configurationQuery,
  defaultConfiguration,
  parseConfiguration,
} from "./config";
import { decodeStudio, encodeStudio, labelRooms, studioLayout } from "./studio";
import type { Plan, Room, Unit, View } from "./types";
import { getUnit, planOf, unitSummary, type Configuration } from "./units";

export type Mode = "guided" | "custom";

export type Needs = {
  beds: number | null;
  budget: number;
  view: View | "any";
  terrace: boolean;
};

export type BuilderState = {
  mode: Mode;
  step: number;
  needs: Needs;
  unit: string | null;
  config: Configuration;
  shell: string;
  rooms: Room[];
};

export const GUIDED_STEPS = [
  "Your needs",
  "Pick a residence",
  "Make it yours",
  "Summary",
];
export const CUSTOM_STEPS = ["Pick a size", "Arrange the rooms", "Summary"];

export const PENTHOUSE = 4;

export const SHELLS = [
  {
    id: "the-mooring",
    label: "Compact",
    note: "784 sq ft, room for one bedroom",
  },
  {
    id: "the-causeway",
    label: "Medium",
    note: "1,240 sq ft, two bedrooms fit well",
  },
  { id: "the-key", label: "Large", note: "1,728 sq ft, corner with two views" },
  {
    id: "the-penthouse",
    label: "Penthouse",
    note: "3,200 sq ft on the top floor",
  },
];

export const BUDGETS = [0, 1_000_000, 1_500_000, 2_000_000, 3_000_000];

export const emptyNeeds: Needs = {
  beds: null,
  budget: 0,
  view: "any",
  terrace: false,
};

type Params = { get(name: string): string | null };

function shellPlan(slug: string | null): Plan {
  return getPlan(slug ?? "") ?? getPlan("the-causeway")!;
}

export function startRooms(plan: Plan): Room[] {
  return labelRooms(plan.rooms.map((room) => ({ ...room })));
}

export function studioShell(plan: Plan) {
  return studioLayout(plan, []);
}

export function parseBuilder(params: Params): BuilderState {
  const mode: Mode = params.get("mode") === "custom" ? "custom" : "guided";
  const max = mode === "guided" ? GUIDED_STEPS.length : CUSTOM_STEPS.length;
  const step = Math.min(
    max,
    Math.max(1, Number.parseInt(params.get("step") ?? "1", 10) || 1),
  );
  const beds = Number.parseInt(params.get("beds") ?? "", 10);
  const view = params.get("view");
  const unit = getUnit(params.get("unit") ?? "");
  const studio = params.get("p") ? decodeStudio(params) : null;
  const shell = studio?.plan ?? shellPlan(params.get("p"));
  return {
    mode,
    step,
    needs: {
      beds:
        Number.isInteger(beds) && beds >= 0 && beds <= PENTHOUSE ? beds : null,
      budget: BUDGETS.includes(Number(params.get("budget")))
        ? Number(params.get("budget"))
        : 0,
      view:
        view === "bay" || view === "bay-park" || view === "bay-skyline"
          ? view
          : "any",
      terrace: params.get("terrace") === "1",
    },
    unit: unit?.slug ?? null,
    config: unit
      ? parseConfiguration(params, planOf(unit))
      : defaultConfiguration,
    shell: shell.slug,
    rooms:
      studio && params.get("r") !== null ? studio.rooms : startRooms(shell),
  };
}

export function builderQuery(state: BuilderState): string {
  const parts = [`mode=${state.mode}`, `step=${state.step}`];
  if (state.mode === "guided") {
    const { needs } = state;
    if (needs.beds !== null) parts.push(`beds=${needs.beds}`);
    if (needs.budget) parts.push(`budget=${needs.budget}`);
    if (needs.view !== "any") parts.push(`view=${needs.view}`);
    if (needs.terrace) parts.push("terrace=1");
    if (state.unit) {
      parts.push(`unit=${state.unit}`);
      const config = configurationQuery(state.config).slice(1);
      if (config) parts.push(config);
    }
  } else {
    parts.push(encodeStudio(shellPlan(state.shell), state.rooms).slice(1));
  }
  return `?${parts.join("&")}`;
}

export function matchesNeeds(unit: Unit, needs: Needs, strict = true): boolean {
  if (unit.status === "sold") return false;
  const { bedrooms } = unitSummary(unit);
  const penthouse = unit.plan === "the-penthouse";
  if (needs.beds === PENTHOUSE && !penthouse) return false;
  if (needs.beds !== null && needs.beds !== PENTHOUSE) {
    if (penthouse) return false;
    if (needs.beds === 3 ? bedrooms < 3 : bedrooms !== needs.beds) return false;
  }
  if (!strict) return true;
  if (needs.budget && unit.price > needs.budget) return false;
  if (needs.view !== "any" && unit.view !== needs.view) return false;
  if (needs.terrace && !unit.balcony) return false;
  return true;
}

export function matchUnits(needs: Needs): { units: Unit[]; relaxed: boolean } {
  const order = (a: Unit, b: Unit) =>
    Number(a.status !== "available") - Number(b.status !== "available") ||
    b.floor - a.floor;
  const strict = units.filter((unit) => matchesNeeds(unit, needs)).sort(order);
  if (strict.length) return { units: strict, relaxed: false };
  return {
    units: units.filter((unit) => matchesNeeds(unit, needs, false)).sort(order),
    relaxed: true,
  };
}
