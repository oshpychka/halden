import { PODIUM_FLOORS, TOP_FLOOR } from "@/lib/building";

export const GROUND = 97;
export const ROOF = 9;
export const FLOOR_HEIGHT = (GROUND - ROOF) / TOP_FLOOR;
export const LEFT = 6;
export const RIGHT = 94;

export function floorTop(floor: number): number {
  return GROUND - floor * FLOOR_HEIGHT;
}

const BAYS = 5;
const bayWidth = (RIGHT - LEFT) / BAYS;

function Bays({ floor }: { floor: number }) {
  const top = floorTop(floor);
  const count = floor === TOP_FLOOR ? 2 : BAYS;
  const width = (RIGHT - LEFT) / count;
  return (
    <>
      {Array.from({ length: count }, (_, index) => {
        const x = LEFT + index * width;
        return (
          <g key={index}>
            <rect
              x={x + width * 0.08}
              y={top + FLOOR_HEIGHT * 0.18}
              width={width * 0.84}
              height={FLOOR_HEIGHT * 0.7}
            />
            <line
              x1={x + width / 2}
              y1={top + FLOOR_HEIGHT * 0.18}
              x2={x + width / 2}
              y2={top + FLOOR_HEIGHT * 0.88}
              className="stroke-line"
            />
          </g>
        );
      })}
    </>
  );
}

export function FacadeDrawing() {
  const residential = Array.from(
    { length: TOP_FLOOR - PODIUM_FLOORS },
    (_, index) => index + PODIUM_FLOORS + 1,
  );
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="facade-draw absolute inset-0 h-full w-full fill-none stroke-ink"
    >
      <g strokeWidth={1}>
        <rect x={LEFT} y={ROOF} width={RIGHT - LEFT} height={GROUND - ROOF} />
        <path
          d={`M ${LEFT + 6} ${ROOF} V ${ROOF - 5} H ${RIGHT - 6} V ${ROOF} M ${LEFT + 18} ${ROOF - 5} V ${ROOF - 7} H ${RIGHT - 30} V ${ROOF - 5}`}
        />
        <line x1={0} y1={GROUND} x2={100} y2={GROUND} strokeWidth={1.5} />
        {Array.from({ length: TOP_FLOOR - 1 }, (_, index) => {
          const y = floorTop(index + 1);
          return <line key={index} x1={LEFT} y1={y} x2={RIGHT} y2={y} />;
        })}
        {residential.map((floor) => (
          <g key={floor} className="stroke-ink/70" strokeWidth={0.75}>
            <Bays floor={floor} />
          </g>
        ))}
        {Array.from({ length: BAYS - 1 }, (_, index) => {
          const x = LEFT + (index + 1) * bayWidth;
          return (
            <line
              key={index}
              x1={x}
              y1={floorTop(TOP_FLOOR - 1)}
              x2={x}
              y2={floorTop(PODIUM_FLOORS)}
            />
          );
        })}
        {[0.25, 0.5, 0.75].map((share) => (
          <line
            key={share}
            x1={LEFT + (RIGHT - LEFT) * share}
            y1={floorTop(PODIUM_FLOORS)}
            x2={LEFT + (RIGHT - LEFT) * share}
            y2={GROUND}
            className="stroke-ink/60"
          />
        ))}
        <rect
          x={LEFT + (RIGHT - LEFT) * 0.42}
          y={GROUND - FLOOR_HEIGHT * 1.6}
          width={(RIGHT - LEFT) * 0.16}
          height={FLOOR_HEIGHT * 1.6}
        />
      </g>
    </svg>
  );
}
