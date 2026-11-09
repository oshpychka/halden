"use client";

import { Icon, type IconName } from "@/components/ui/Icon";
import type { Mode } from "@/lib/builder";

const modes: { value: Mode; title: string; text: string; icon: IconName }[] = [
  {
    value: "guided",
    title: "Choose a residence",
    text: "Pick from our plans, then adjust it step by step",
    icon: "bed",
  },
  {
    value: "custom",
    title: "Design my own layout",
    text: "Start from an empty shell and place the rooms yourself",
    icon: "plan",
  },
];

type ModeSwitchProps = {
  value: Mode;
  onChange: (mode: Mode) => void;
};

export function ModeSwitch({ value, onChange }: ModeSwitchProps) {
  return (
    <div
      role="radiogroup"
      aria-label="How do you want to start?"
      className="grid grid-cols-2 gap-1.5 rounded-2xl bg-paper p-1.5"
    >
      {modes.map((mode) => {
        const active = mode.value === value;
        return (
          <button
            key={mode.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(mode.value)}
            className={`flex items-start gap-3 rounded-xl p-3 text-left transition-all duration-200 ease-drawn sm:p-4 ${active ? "bg-bay text-white shadow-card" : "text-ink hover:bg-surface"}`}
          >
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-full max-sm:hidden ${active ? "bg-white/20" : "bg-bay-tint text-bay"}`}
            >
              <Icon name={mode.icon} size={18} />
            </span>
            <span className="flex flex-col">
              <span className="text-sm leading-snug font-bold sm:text-base">
                {mode.title}
              </span>
              <span
                className={`mt-0.5 text-xs leading-snug max-sm:hidden sm:text-sm ${active ? "text-white" : "text-muted"}`}
              >
                {mode.text}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
