import { units } from "@/data/units";
import { elevationColumn } from "@/lib/facade";

const FLOOR = 4;
const WIDTH = 60;
const TOP = 6;
const FLOORS = 17;

export function MiniFacade({ selected }: { selected: string | null }) {
  const height = TOP + FLOORS * FLOOR + 10;
  return (
    <svg
      viewBox={`0 0 ${WIDTH + 8} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Position of the selected residence on the building"
    >
      <rect
        x={4}
        y={TOP}
        width={WIDTH}
        height={FLOORS * FLOOR + 10}
        rx={2}
        className="fill-surface stroke-line"
        strokeWidth={0.6}
      />
      {units.map((unit) => {
        const { index, count } = elevationColumn(unit);
        const cell = WIDTH / count;
        const y = TOP + (20 - unit.floor) * FLOOR;
        const active = unit.slug === selected;
        return (
          <rect
            key={unit.slug}
            x={4 + index * cell + 1}
            y={y + 0.8}
            width={cell - 2}
            height={FLOOR - 1.6}
            rx={0.6}
            className={
              active
                ? "fill-bay"
                : unit.status === "sold"
                  ? "fill-line"
                  : "fill-bay-tint"
            }
          />
        );
      })}
      <rect
        x={4 + WIDTH * 0.4}
        y={TOP + FLOORS * FLOOR + 3}
        width={WIDTH * 0.2}
        height={7}
        className="fill-line"
      />
    </svg>
  );
}
