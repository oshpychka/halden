"use client";

import { PlanSvg } from "@/components/plan/PlanSvg";
import { Icon } from "@/components/ui/Icon";
import { getPlan } from "@/data/plans";
import { SHELLS, startRooms, studioShell } from "@/lib/builder";
import type { Room } from "@/lib/types";

type ShellStepProps = {
  shell: string;
  empty: boolean;
  onChoose: (shell: string, rooms: Room[]) => void;
};

export function ShellStep({ shell, empty, onChoose }: ShellStepProps) {
  return (
    <div className="grid gap-8">
      <div
        role="radiogroup"
        aria-label="Size of the residence"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {SHELLS.map((item) => {
          const plan = getPlan(item.id)!;
          const active = item.id === shell;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChoose(item.id, empty ? [] : startRooms(plan))}
              className={`relative flex flex-col overflow-hidden rounded-2xl border-2 bg-surface text-left shadow-card transition-all duration-200 ease-drawn ${active ? "border-bay" : "border-transparent hover:border-bay/40"}`}
            >
              <span className="block bg-paper/60 p-4">
                <PlanSvg
                  layout={studioShell(plan)}
                  title={`${item.label} shell`}
                  detailed={false}
                  className="aspect-[4/3]"
                />
              </span>
              <span className="p-4">
                <span className="block text-lg font-bold">{item.label}</span>
                <span className="text-sm text-muted">{item.note}</span>
              </span>
              {active && (
                <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-bay text-white shadow-card">
                  <Icon name="check" size={18} />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <fieldset className="grid gap-3">
        <legend className="mb-3 text-lg font-bold">
          How do you want to start?
        </legend>
        <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
          {[
            {
              value: false,
              title: "With our layout",
              note: "Rooms are already placed. Move them or replace them.",
            },
            {
              value: true,
              title: "With an empty shell",
              note: "Only the outer walls and windows. Add every room yourself.",
            },
          ].map((option) => (
            <button
              key={option.title}
              type="button"
              role="radio"
              aria-checked={empty === option.value}
              onClick={() =>
                onChoose(shell, option.value ? [] : startRooms(getPlan(shell)!))
              }
              className={`rounded-2xl border-2 bg-surface p-4 text-left shadow-card ${empty === option.value ? "border-bay" : "border-transparent hover:border-bay/40"}`}
            >
              <span className="block font-bold">{option.title}</span>
              <span className="text-sm text-muted">{option.note}</span>
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
