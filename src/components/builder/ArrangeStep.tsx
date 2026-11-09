"use client";

import { useState } from "react";
import { SceneView } from "@/components/scene/SceneView";
import { RoomControls } from "@/components/studio/RoomControls";
import { StudioCanvas } from "@/components/studio/StudioCanvas";
import { StudioSummary } from "@/components/studio/StudioSummary";
import { Icon } from "@/components/ui/Icon";
import { Segmented } from "@/components/ui/Segmented";
import { useToast } from "@/components/ui/Toast";
import { getFinish } from "@/data/finishes";
import {
  canPlace,
  findSpot,
  labelRooms,
  MODULES,
  studioLayout,
} from "@/lib/studio";
import type { Plan, Rect, Room } from "@/lib/types";

type ArrangeStepProps = {
  plan: Plan;
  rooms: Room[];
  onRooms: (rooms: Room[]) => void;
};

export function ArrangeStep({ plan, rooms, onRooms }: ArrangeStepProps) {
  const toast = useToast();
  const [draft, setDraft] = useState<Room[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState<"plan" | "3d">("plan");
  const shown = draft ?? rooms;
  const active = shown.find((room) => room.id === selected);

  function commit(next: Room[]) {
    const labelled = labelRooms(next);
    const keep = next.findIndex((room) => room.id === selected);
    setDraft(null);
    setSelected(keep >= 0 ? labelled[keep]!.id : null);
    onRooms(labelled);
  }

  function add(type: Room["type"]) {
    const preset = MODULES.find((item) => item.type === type)!;
    const spot = findSpot(preset.w, preset.h, rooms, plan);
    if (!spot) {
      toast(
        `No free ${preset.w} by ${preset.h} ft space. Make another room smaller first.`,
      );
      return;
    }
    const labelled = labelRooms([
      ...rooms,
      { id: "", label: "", type, ...spot },
    ]);
    setSelected(labelled.at(-1)!.id);
    onRooms(labelled);
  }

  function resize(id: string, next: Rect) {
    if (!canPlace(next, rooms, plan, id)) {
      toast("That size would overlap another room or the outer wall.");
      return;
    }
    commit(rooms.map((room) => (room.id === id ? { ...room, ...next } : room)));
  }

  function rotate(id: string) {
    const room = rooms.find((item) => item.id === id)!;
    resize(id, { x: room.x, y: room.y, w: room.h, h: room.w });
  }

  function remove(id: string) {
    setSelected(null);
    commit(rooms.filter((room) => room.id !== id));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="flex flex-col gap-4 lg:col-span-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Segmented
            label="View"
            value={view}
            options={[
              { value: "plan", label: "Plan" },
              { value: "3d", label: "3D" },
            ]}
            onChange={setView}
          />
          <p className="text-sm text-muted">
            {plan.width}′ × {plan.depth}′, bay side at the top
          </p>
        </div>
        <div className="rounded-2xl bg-surface p-2 shadow-card sm:p-4">
          {view === "plan" ? (
            <StudioCanvas
              plan={plan}
              rooms={shown}
              selected={selected}
              onSelect={setSelected}
              onChange={setDraft}
              onCommit={commit}
              onRemove={remove}
              onRotate={rotate}
            />
          ) : (
            <SceneView
              layout={studioLayout(plan, shown)}
              finish={getFinish("shell")}
            />
          )}
        </div>
        {active ? (
          <RoomControls
            room={active}
            onResize={(next) => resize(active.id, next)}
            onRotate={() => rotate(active.id)}
            onRemove={() => remove(active.id)}
          />
        ) : (
          <p className="flex items-start gap-3 rounded-2xl bg-bay-tint p-4 text-sm text-ink">
            <Icon name="sparkle" className="mt-0.5 shrink-0 text-bay" />
            Tap a room to select it, then drag it or use the buttons to resize
            and rotate. Add new rooms from the list. On a keyboard: Tab to a
            room, arrows move it, Shift and arrows resize, R rotates.
          </p>
        )}
      </div>
      <div className="flex flex-col gap-6 lg:col-span-4">
        <section className="rounded-2xl bg-surface p-5 shadow-card">
          <h3 className="text-lg">Add a room</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {MODULES.map((preset) => (
              <button
                key={preset.type}
                type="button"
                onClick={() => add(preset.type)}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-paper px-4 text-sm font-medium hover:border-bay hover:text-bay"
              >
                <Icon name="plus" size={16} />
                {preset.label}
              </button>
            ))}
          </div>
        </section>
        <section className="rounded-2xl bg-surface p-5 shadow-card">
          <h3 className="mb-3 text-lg">Your layout</h3>
          <StudioSummary plan={plan} rooms={shown} />
        </section>
      </div>
    </div>
  );
}
