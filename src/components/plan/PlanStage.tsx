"use client";

import { useState } from "react";
import { SceneView } from "@/components/scene/SceneView";
import { Icon } from "@/components/ui/Icon";
import { Segmented } from "@/components/ui/Segmented";
import type { Layout } from "@/lib/plan";
import { miamiTime, solarPosition } from "@/lib/sun";
import type { Finish, Rect } from "@/lib/types";
import { PlanSvg } from "./PlanSvg";
import { SUN_DATES, SunControls } from "./SunControls";
import { SunPatches } from "./SunPatches";

type PlanStageProps = {
  layout: Layout;
  title: string;
  finish: Finish;
  terrace?: Rect;
  highlight?: string[];
};

export function PlanStage({
  layout,
  title,
  finish,
  terrace,
  highlight,
}: PlanStageProps) {
  const [view, setView] = useState<"plan" | "3d">("plan");
  const [sunOn, setSunOn] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [date, setDate] = useState(SUN_DATES[2]!.value);
  const [minutes, setMinutes] = useState(9 * 60);
  const sun = solarPosition(miamiTime(date, minutes));
  const sides = layout.windows.map((span) => span.side);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Segmented
          label="View"
          value={view}
          options={[
            { value: "plan", label: "Plan" },
            { value: "3d", label: "3D" },
          ]}
          onChange={setView}
        />
        <div className="flex gap-2">
          {view === "plan" && (
            <button
              type="button"
              aria-pressed={zoom}
              onClick={() => setZoom(!zoom)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium sm:hidden ${zoom ? "border-bay bg-bay text-white" : "border-line bg-surface"}`}
            >
              <Icon name={zoom ? "minus" : "plus"} size={18} />
              Zoom
            </button>
          )}
          <button
            type="button"
            aria-pressed={sunOn}
            onClick={() => setSunOn(!sunOn)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${sunOn ? "border-bay bg-bay text-white" : "border-line bg-surface hover:border-ink"}`}
          >
            <Icon name="sun" size={18} />
            Sunlight
          </button>
        </div>
      </div>
      <div
        className={`rounded-2xl bg-surface p-3 shadow-card sm:p-6 ${zoom && view === "plan" ? "overflow-x-auto max-sm:overscroll-x-contain" : ""}`}
      >
        {view === "plan" ? (
          <PlanSvg
            className={zoom ? "max-sm:w-[220%] max-sm:max-w-none" : ""}
            layout={layout}
            title={title}
            terrace={terrace}
            highlight={highlight}
            overlay={
              sunOn ? <SunPatches layout={layout} sun={sun} /> : undefined
            }
          />
        ) : (
          <SceneView
            layout={layout}
            finish={finish}
            terrace={terrace}
            sun={sunOn ? sun : undefined}
          />
        )}
      </div>
      {sunOn && (
        <SunControls
          date={date}
          minutes={minutes}
          sun={sun}
          sides={sides}
          onDate={setDate}
          onMinutes={setMinutes}
        />
      )}
    </div>
  );
}
