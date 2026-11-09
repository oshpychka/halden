type DimensionLineProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  size: number;
};

export function DimensionLine({
  x1,
  y1,
  x2,
  y2,
  label,
  size,
}: DimensionLineProps) {
  const vertical = x1 === x2;
  const tick = size * 0.45;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g className="stroke-muted" strokeWidth={0.08}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {[
        [x1, y1],
        [x2, y2],
      ].map(([x, y]) => (
        <line
          key={`${x}-${y}`}
          x1={x! - tick}
          y1={y! + tick}
          x2={x! + tick}
          y2={y! - tick}
        />
      ))}
      <text
        x={mx}
        y={my}
        fontSize={size * 0.85}
        textAnchor="middle"
        dy={vertical ? "0.35em" : "-0.5em"}
        transform={vertical ? `rotate(90 ${mx} ${my})` : undefined}
        className="fill-muted stroke-none"
        style={{ paintOrder: "stroke" }}
      >
        {label}
      </text>
    </g>
  );
}
