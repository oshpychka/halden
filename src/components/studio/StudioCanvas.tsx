"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { formatFeet } from "@/lib/format";
import { glazing } from "@/lib/plan";
import { canPlace, GRID, snap, studioLayout } from "@/lib/studio";
import type { Plan, Rect, Room } from "@/lib/types";

type Drag = {
  id: string;
  mode: "move" | "resize";
  startX: number;
  startY: number;
  origin: Rect;
};

type StudioCanvasProps = {
  plan: Plan;
  rooms: Room[];
  selected: string | null;
  onSelect: (id: string | null) => void;
  onChange: (rooms: Room[]) => void;
  onCommit: (rooms: Room[]) => void;
  onRemove: (id: string) => void;
  onRotate: (id: string) => void;
};

export function StudioCanvas({
  plan,
  rooms,
  selected,
  onSelect,
  onChange,
  onCommit,
  onRemove,
  onRotate,
}: StudioCanvasProps) {
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<Drag | null>(null);
  const panes = glazing(studioLayout(plan, []));
  const text = Math.max(0.85, plan.width / 46);

  function toPlan(event: PointerEvent): { x: number; y: number } {
    const matrix = svg.current?.getScreenCTM();
    if (!matrix) return { x: 0, y: 0 };
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
      matrix.inverse(),
    );
    return { x: point.x, y: point.y };
  }

  function apply(id: string, next: Rect): boolean {
    if (!canPlace(next, rooms, plan, id)) return false;
    onChange(
      rooms.map((room) => (room.id === id ? { ...room, ...next } : room)),
    );
    return true;
  }

  function start(event: PointerEvent, room: Room, mode: Drag["mode"]) {
    event.stopPropagation();
    onSelect(room.id);
    const point = toPlan(event);
    drag.current = {
      id: room.id,
      mode,
      startX: point.x,
      startY: point.y,
      origin: { x: room.x, y: room.y, w: room.w, h: room.h },
    };
    svg.current?.setPointerCapture(event.pointerId);
  }

  function move(event: PointerEvent) {
    const state = drag.current;
    if (!state) return;
    const point = toPlan(event);
    const dx = snap(point.x - state.startX);
    const dy = snap(point.y - state.startY);
    const { origin } = state;
    const candidates: Rect[] =
      state.mode === "move"
        ? [
            { ...origin, x: origin.x + dx, y: origin.y + dy },
            { ...origin, x: origin.x + dx },
            { ...origin, y: origin.y + dy },
          ]
        : [
            { ...origin, w: origin.w + dx, h: origin.h + dy },
            { ...origin, w: origin.w + dx },
            { ...origin, h: origin.h + dy },
          ];
    candidates.some((rect) => apply(state.id, rect));
  }

  function end() {
    if (!drag.current) return;
    drag.current = null;
    onCommit(rooms);
  }

  function onKeyDown(event: KeyboardEvent, room: Room) {
    const step = event.altKey ? GRID * 4 : GRID;
    const arrows: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const delta = arrows[event.key];
    if (delta) {
      event.preventDefault();
      const next = event.shiftKey
        ? { x: room.x, y: room.y, w: room.w + delta[0], h: room.h + delta[1] }
        : { x: room.x + delta[0], y: room.y + delta[1], w: room.w, h: room.h };
      if (canPlace(next, rooms, plan, room.id)) {
        const updated = rooms.map((item) =>
          item.id === room.id ? { ...item, ...next } : item,
        );
        onChange(updated);
        onCommit(updated);
      }
    } else if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      onRemove(room.id);
    } else if (event.key.toLowerCase() === "r") {
      event.preventDefault();
      onRotate(room.id);
    }
  }

  const gridLines = [
    ...Array.from({ length: plan.width - 1 }, (_, index) => ({
      x1: index + 1,
      y1: 0,
      x2: index + 1,
      y2: plan.depth,
      major: (index + 1) % 5 === 0,
    })),
    ...Array.from({ length: plan.depth - 1 }, (_, index) => ({
      x1: 0,
      y1: index + 1,
      x2: plan.width,
      y2: index + 1,
      major: (index + 1) % 5 === 0,
    })),
  ];

  return (
    <svg
      ref={svg}
      viewBox={`-1.5 -1.5 ${plan.width + 3} ${plan.depth + 3}`}
      className="h-auto w-full touch-none select-none"
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
      onPointerDown={() => onSelect(null)}
      role="group"
      aria-label={`Plan studio shell, ${plan.width} by ${plan.depth} feet. Select a room and use the arrow keys to move it, Shift and arrows to resize, R to rotate.`}
    >
      <rect
        x={0}
        y={0}
        width={plan.width}
        height={plan.depth}
        className="fill-surface"
      />
      {gridLines.map(({ major, ...line }, index) => (
        <line
          key={index}
          {...line}
          className={major ? "stroke-line" : "stroke-line/40"}
          strokeWidth={0.06}
        />
      ))}
      <rect
        x={0}
        y={0}
        width={plan.width}
        height={plan.depth}
        fill="none"
        className="stroke-ink"
        strokeWidth={0.6}
      />
      {panes.map((pane, index) => (
        <line key={index} {...pane} className="stroke-bay" strokeWidth={0.6} />
      ))}
      {rooms.map((room) => {
        const active = room.id === selected;
        const cx = room.x + room.w / 2;
        const cy = room.y + room.h / 2;
        return (
          <g
            key={room.id}
            role="button"
            tabIndex={0}
            aria-pressed={active}
            aria-label={`${room.label}, ${room.w} by ${room.h} feet`}
            onPointerDown={(event) => start(event, room, "move")}
            onFocus={() => onSelect(room.id)}
            onKeyDown={(event) => onKeyDown(event, room)}
            className="cursor-grab outline-none active:cursor-grabbing"
          >
            <rect
              x={room.x}
              y={room.y}
              width={room.w}
              height={room.h}
              className={
                active ? "fill-bay-tint stroke-bay" : "fill-paper stroke-ink"
              }
              strokeWidth={active ? 0.3 : 0.2}
            />
            <text
              x={cx}
              y={cy}
              fontSize={text}
              textAnchor="middle"
              className="pointer-events-none fill-ink"
            >
              <tspan x={cx} dy="-0.15em">
                {room.w * room.h >= 30 ? room.label : ""}
              </tspan>
              <tspan
                x={cx}
                dy="1.25em"
                fontSize={text * 0.78}
                className="fill-muted"
              >
                {formatFeet(room.w)} × {formatFeet(room.h)}
              </tspan>
            </text>
            {active && (
              <rect
                x={room.x + room.w - 1.4}
                y={room.y + room.h - 1.4}
                width={1.4}
                height={1.4}
                className="cursor-nwse-resize fill-bay"
                onPointerDown={(event) => start(event, room, "resize")}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
