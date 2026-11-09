"use client";

import { useMemo } from "react";
import { Segmented } from "@/components/ui/Segmented";
import { formatHours } from "@/lib/format";
import { directSunMinutes, type SunPosition } from "@/lib/sun";
import type { WindowSpan } from "@/lib/types";

export const SUN_DATES = [
  { value: "2028-03-20", label: "Mar 20" },
  { value: "2028-06-21", label: "Jun 21" },
  { value: "2028-09-22", label: "Sep 22" },
  { value: "2028-12-21", label: "Dec 21" },
];

function clock(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = String(minutes % 60).padStart(2, "0");
  const suffix = hours >= 12 ? "pm" : "am";
  return `${((hours + 11) % 12) + 1}:${rest} ${suffix}`;
}

type SunControlsProps = {
  date: string;
  minutes: number;
  sun: SunPosition;
  sides: WindowSpan["side"][];
  onDate: (date: string) => void;
  onMinutes: (minutes: number) => void;
};

export function SunControls({
  date,
  minutes,
  sun,
  sides,
  onDate,
  onMinutes,
}: SunControlsProps) {
  const total = useMemo(() => directSunMinutes(sides, date), [sides, date]);
  const up = sun.altitude > 0;

  return (
    <div className="grid gap-4 rounded-2xl bg-surface p-4 shadow-card">
      <Segmented
        label="Date"
        value={date}
        options={SUN_DATES}
        onChange={onDate}
        className="w-full"
      />
      <div className="flex flex-col gap-2">
        <label
          htmlFor="sun-time"
          className="flex items-baseline justify-between text-sm"
        >
          <span className="font-medium">Time of day</span>
          <span className="tabular">{clock(minutes)}</span>
        </label>
        <input
          id="sun-time"
          type="range"
          min={300}
          max={1260}
          step={15}
          value={minutes}
          aria-valuetext={clock(minutes)}
          onChange={(event) => onMinutes(Number(event.target.value))}
          className="h-11 w-full cursor-pointer accent-bay"
        />
      </div>
      <p className="tabular text-sm text-muted" aria-live="polite">
        {up
          ? `Sun ${Math.round(sun.altitude)}° above the horizon, bearing ${Math.round(sun.azimuth)}°.`
          : "The sun is below the horizon."}{" "}
        Direct sun through the windows on this date:{" "}
        <span className="text-ink">{formatHours(total)}</span>.
      </p>
    </div>
  );
}
