import { units } from "@/data/units";
import { elevationColumn, priceBand, type FacadeMode } from "@/lib/facade";
import type { Unit, UnitStatus, View } from "@/lib/types";
import { FLOOR_HEIGHT, floorTop, LEFT, RIGHT } from "./FacadeDrawing";

const hatch = (color: string, gap: number, angle = 45) =>
  `repeating-linear-gradient(${angle}deg, var(--color-${color}) 0 1px, transparent 1px ${gap}px)`;

const flat = (color: string) => `linear-gradient(${color}, ${color})`;

export const statusFill: Record<UnitStatus, string> = {
  available: `${hatch("bay", 5)}, ${flat("var(--color-bay-tint)")}`,
  reserved: hatch("reserved", 7),
  sold: hatch("muted", 3),
};

export const viewFill: Record<View, string> = {
  bay: flat("var(--color-bay-tint)"),
  "bay-park": hatch("bay", 5, 90),
  "bay-skyline": hatch("bay", 5, 0),
};

const STRENGTH = [12, 35, 60, 88];

export function priceFill(band: number): string {
  return flat(
    `color-mix(in srgb, var(--color-bay) ${STRENGTH[band]}%, transparent)`,
  );
}

function cellFill(mode: Exclude<FacadeMode, "floors">, unit: Unit): string {
  if (mode === "status") return statusFill[unit.status];
  if (mode === "view") return viewFill[unit.view];
  return priceFill(priceBand(unit));
}

export function FacadeCells({ mode }: { mode: Exclude<FacadeMode, "floors"> }) {
  const span = RIGHT - LEFT;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {units.map((unit) => {
        const { index, count } = elevationColumn(unit);
        const width = span / count;
        return (
          <div
            key={unit.slug}
            className="absolute"
            style={{
              left: `${LEFT + index * width + width * 0.06}%`,
              width: `${width * 0.88}%`,
              top: `${floorTop(unit.floor) + FLOOR_HEIGHT * 0.12}%`,
              height: `${FLOOR_HEIGHT * 0.78}%`,
              backgroundImage: cellFill(mode, unit),
            }}
          />
        );
      })}
    </div>
  );
}
