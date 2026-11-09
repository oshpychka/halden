"use client";

import { useState, type KeyboardEvent, type PointerEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  availabilityLabel,
  floorLabel,
  PODIUM_FLOORS,
  TOP_FLOOR,
} from "@/lib/building";
import type { FacadeMode } from "@/lib/facade";
import { FacadeCells } from "./FacadeCells";
import { FacadeDrawing, FLOOR_HEIGHT, floorTop, GROUND } from "./FacadeDrawing";

type FacadeProps = {
  floor: number;
  mode: FacadeMode;
  onSelect: (floor: number) => void;
};

const MIN_FLOOR = PODIUM_FLOORS + 1;

function clampFloor(value: number): number {
  return Math.min(TOP_FLOOR, Math.max(MIN_FLOOR, value));
}

export function Facade({ floor, mode, onSelect }: FacadeProps) {
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? floor;

  function floorFromPointer(
    event: PointerEvent<HTMLDivElement>,
  ): number | null {
    const box = event.currentTarget.getBoundingClientRect();
    const y = ((event.clientY - box.top) / box.height) * 100;
    const value = Math.ceil((GROUND - y) / FLOOR_HEIGHT);
    return value >= MIN_FLOOR && value <= TOP_FLOOR ? value : null;
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const steps: Record<string, number> = {
      ArrowUp: 1,
      ArrowRight: 1,
      ArrowDown: -1,
      ArrowLeft: -1,
      PageUp: 4,
      PageDown: -4,
    };
    if (event.key === "Home") onSelect(MIN_FLOOR);
    else if (event.key === "End") onSelect(TOP_FLOOR);
    else if (steps[event.key]) onSelect(clampFloor(floor + steps[event.key]!));
    else return;
    event.preventDefault();
  }

  const rowStyle = (value: number) => ({
    top: `${floorTop(value)}%`,
    height: `${FLOOR_HEIGHT}%`,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[1fr_7.5rem] sm:grid-cols-[1fr_9rem]">
        <div
          role="slider"
          tabIndex={0}
          aria-label="Choose a floor"
          aria-orientation="vertical"
          aria-valuemin={MIN_FLOOR}
          aria-valuemax={TOP_FLOOR}
          aria-valuenow={floor}
          aria-valuetext={`${floorLabel(floor)}, ${availabilityLabel(floor)}`}
          onKeyDown={onKeyDown}
          onPointerMove={(event) =>
            event.pointerType === "mouse" && setHover(floorFromPointer(event))
          }
          onPointerLeave={() => setHover(null)}
          onPointerUp={(event) => {
            const value = floorFromPointer(event);
            if (value) onSelect(value);
          }}
          className="relative h-[26rem] cursor-pointer touch-manipulation sm:h-[34rem] lg:h-[38rem]"
        >
          <FacadeDrawing />
          {mode !== "floors" && <FacadeCells mode={mode} />}
          <div
            aria-hidden="true"
            className={`absolute inset-x-[6%] border-y-2 border-bay transition-[top] duration-200 ease-drawn ${mode === "floors" ? "bg-bay-tint/60 bg-[repeating-linear-gradient(45deg,var(--color-bay)_0_1px,transparent_1px_6px)]" : ""}`}
            style={rowStyle(shown)}
          />
          {hover !== null && hover !== floor && (
            <div
              aria-hidden="true"
              className="absolute inset-x-[6%] border-y border-ink/40"
              style={rowStyle(floor)}
            />
          )}
        </div>
        <div aria-hidden="true" className="relative">
          <div
            className="absolute inset-x-0 flex -translate-y-1/2 items-center gap-2 transition-[top] duration-200 ease-drawn"
            style={{ top: `${floorTop(shown) + FLOOR_HEIGHT / 2}%` }}
          >
            <span className="h-px w-4 shrink-0 bg-ink sm:w-6" />
            <span className="flex flex-col leading-tight">
              <span className="tabular text-sm font-medium whitespace-nowrap">
                {floorLabel(shown)}
              </span>
              <span className="tabular text-xs whitespace-nowrap text-muted">
                {availabilityLabel(shown)}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onSelect(clampFloor(floor - 1))}
          disabled={floor === MIN_FLOOR}
          aria-label="Floor below"
          className="grid size-11 place-items-center rounded-full border border-line bg-surface hover:border-ink/40 disabled:opacity-40"
        >
          <Icon name="minus" />
        </button>
        <p className="tabular min-w-36 text-center text-sm" aria-live="polite">
          {floorLabel(floor)}
        </p>
        <button
          type="button"
          onClick={() => onSelect(clampFloor(floor + 1))}
          disabled={floor === TOP_FLOOR}
          aria-label="Floor above"
          className="grid size-11 place-items-center rounded-full border border-line bg-surface hover:border-ink/40 disabled:opacity-40"
        >
          <Icon name="plus" />
        </button>
      </div>
    </div>
  );
}
