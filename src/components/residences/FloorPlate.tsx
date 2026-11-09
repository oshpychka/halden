import Link from "next/link";
import { floorUnits } from "@/lib/building";
import { formatBedrooms } from "@/lib/format";
import type { Unit, UnitStatus } from "@/lib/types";
import { planOf, unitName, unitSummary } from "@/lib/units";

const fills: Record<UnitStatus, string> = {
  available: "url(#plate-available)",
  reserved: "url(#plate-reserved)",
  sold: "url(#plate-sold)",
};

const CORRIDOR = 9;

export function FloorPlate({ floor }: { floor: number }) {
  const items = floorUnits(floor).reduce<
    { unit: Unit; left: number; width: number; depth: number }[]
  >((list, unit) => {
    const plan = planOf(unit);
    const previous = list.at(-1);
    const left = previous ? previous.left + previous.width : 0;
    return [...list, { unit, left, width: plan.width, depth: plan.depth }];
  }, []);
  const last = items.at(-1);
  const total = last ? last.left + last.width : 0;
  const depth = Math.max(...items.map((item) => item.depth));

  return (
    <svg
      viewBox={`-1 -1 ${total + 2} ${depth + CORRIDOR + 2}`}
      className="h-auto w-full"
      role="group"
      aria-label={`Floor plate of floor ${floor}`}
    >
      <defs>
        <pattern
          id="plate-available"
          width="3"
          height="3"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="3" height="3" className="fill-bay-tint" />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="3"
            className="stroke-bay"
            strokeWidth="0.5"
          />
        </pattern>
        <pattern
          id="plate-reserved"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="4" height="4" className="fill-surface" />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="4"
            className="stroke-reserved"
            strokeWidth="0.4"
          />
        </pattern>
        <pattern
          id="plate-sold"
          width="1.6"
          height="1.6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="1.6" height="1.6" className="fill-paper" />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="1.6"
            className="stroke-muted/60"
            strokeWidth="0.35"
          />
        </pattern>
      </defs>
      <rect
        x={0}
        y={depth}
        width={total}
        height={CORRIDOR}
        className="fill-paper stroke-ink"
        strokeWidth={0.3}
      />
      <text
        x={total / 2}
        y={depth + CORRIDOR / 2}
        fontSize={4}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-muted"
      >
        Corridor and elevators
      </text>
      {items.map(({ unit, left, width, depth: unitDepth }) => {
        const { bedrooms } = unitSummary(unit);
        const label = unit.floor === 20 ? unitName(unit) : unit.stack;
        return (
          <Link
            key={unit.slug}
            href={`/residences/${unit.slug}`}
            aria-label={`${unitName(unit)}, ${unit.status}`}
            className="group"
          >
            <rect
              x={left}
              y={depth - unitDepth}
              width={width}
              height={unitDepth}
              fill={fills[unit.status]}
              className="stroke-ink transition-[stroke-width] group-hover:[stroke-width:0.9] group-focus-visible:[stroke-width:0.9]"
              strokeWidth={0.4}
            />
            <text
              x={left + width / 2}
              y={depth - unitDepth / 2}
              textAnchor="middle"
              className="fill-ink"
              style={{ paintOrder: "stroke" }}
            >
              <tspan
                x={left + width / 2}
                fontSize={unit.floor === 20 ? 6.5 : 10}
                className="font-display"
              >
                {label}
              </tspan>
              <tspan x={left + width / 2} dy="1.5em" fontSize={4.6}>
                {formatBedrooms(bedrooms)}
              </tspan>
            </text>
          </Link>
        );
      })}
    </svg>
  );
}
