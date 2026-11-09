import { deriveWalls, glazing, type Layout } from "@/lib/plan";
import { formatFeet } from "@/lib/format";
import type { ReactNode } from "react";
import type { Rect } from "@/lib/types";
import { DimensionLine } from "./DimensionLine";
import { DoorSwing } from "./DoorSwing";

type PlanSvgProps = {
  layout: Layout;
  title: string;
  terrace?: Rect;
  highlight?: string[];
  detailed?: boolean;
  overlay?: ReactNode;
  className?: string;
};

export function PlanSvg({
  layout,
  title,
  terrace,
  highlight = [],
  detailed = true,
  overlay,
  className = "",
}: PlanSvgProps) {
  const { width, depth } = layout;
  const walls = deriveWalls(layout);
  const windows = glazing(layout);
  const margin = detailed ? Math.max(4, width / 12) : 1.5;
  const top = (terrace ? -terrace.h : 0) - margin;
  const text = Math.max(0.85, width / 48);
  const viewBox = `${-margin} ${top} ${width + margin * 2} ${depth - top + margin}`;

  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={title}
      className={`h-auto w-full ${className}`}
    >
      {terrace && (
        <g>
          <rect
            x={terrace.x}
            y={terrace.y}
            width={terrace.w}
            height={terrace.h}
            className="fill-bay-tint/50 stroke-ink"
            strokeWidth={0.12}
            strokeDasharray="0.6 0.4"
          />
          {detailed && (
            <text
              x={terrace.x + terrace.w / 2}
              y={terrace.y + terrace.h / 2}
              fontSize={text}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted"
            >
              Terrace
            </text>
          )}
        </g>
      )}
      {layout.rooms.map((room) => (
        <rect
          key={room.id}
          x={room.x}
          y={room.y}
          width={room.w}
          height={room.h}
          className={
            highlight.includes(room.id) ? "fill-bay-tint" : "fill-surface"
          }
        />
      ))}
      {overlay}
      {walls.map((wall, index) => (
        <line
          key={index}
          x1={wall.x1}
          y1={wall.y1}
          x2={wall.x2}
          y2={wall.y2}
          className="stroke-ink"
          strokeWidth={wall.exterior ? 0.7 : 0.4}
          strokeLinecap="square"
        />
      ))}
      {windows.map((pane, index) => (
        <g key={index}>
          <line {...pane} className="stroke-surface" strokeWidth={0.8} />
          <line
            {...pane}
            className="stroke-ink"
            strokeWidth={0.7}
            strokeDasharray="0.08 0.54"
          />
          <line {...pane} className="stroke-bay" strokeWidth={0.1} />
        </g>
      ))}
      {detailed &&
        layout.doors.map((item) => <DoorSwing key={item.id} door={item} />)}
      {detailed &&
        layout.rooms.map((room) => {
          const small = room.w * room.h < 60 || room.w < 6;
          const cx = room.x + room.w / 2;
          const cy = room.y + room.h / 2;
          return (
            <text
              key={room.id}
              x={cx}
              y={cy}
              fontSize={small ? text * 0.75 : text}
              textAnchor="middle"
              className="fill-ink"
            >
              <tspan x={cx} dy={small ? "0.3em" : "-0.2em"}>
                {small && room.w < 5 ? "" : room.label}
              </tspan>
              {!small && (
                <tspan
                  x={cx}
                  dy="1.3em"
                  fontSize={text * 0.78}
                  className="fill-muted"
                >
                  {formatFeet(room.w)} × {formatFeet(room.h)}
                </tspan>
              )}
            </text>
          );
        })}
      {detailed && (
        <>
          <DimensionLine
            x1={0}
            y1={top + margin * 0.45}
            x2={width}
            y2={top + margin * 0.45}
            label={formatFeet(width)}
            size={text}
          />
          <DimensionLine
            x1={width + margin * 0.55}
            y1={0}
            x2={width + margin * 0.55}
            y2={depth}
            label={formatFeet(depth)}
            size={text}
          />
        </>
      )}
      {detailed && (
        <g className="fill-muted stroke-muted" strokeWidth={0.1}>
          <path
            d={`M ${-margin * 0.2} ${depth} h ${-margin * 0.5} m ${margin * 0.18} ${-margin * 0.12} l ${-margin * 0.18} ${margin * 0.12} l ${margin * 0.18} ${margin * 0.12}`}
            fill="none"
          />
          <text
            x={-margin * 0.45}
            y={depth - margin * 0.25}
            fontSize={text * 0.85}
            textAnchor="middle"
            className="stroke-none"
          >
            N
          </text>
        </g>
      )}
    </svg>
  );
}
