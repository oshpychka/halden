"use client";

import type { ReactNode } from "react";
import { Toggle } from "@/components/ui/Toggle";
import {
  BUDGETS,
  emptyNeeds,
  matchUnits,
  PENTHOUSE,
  type Needs,
} from "@/lib/builder";
import { formatCompactPrice } from "@/lib/format";
import type { View } from "@/lib/types";
import { ChoiceTile } from "./ChoiceTile";

const bedroomChoices = [
  { value: 0, title: "Studio" },
  { value: 1, title: "1 bedroom" },
  { value: 2, title: "2 bedrooms" },
  { value: 3, title: "3 bedrooms" },
  { value: PENTHOUSE, title: "Penthouse" },
].map((choice) => {
  const prices = matchUnits({ ...emptyNeeds, beds: choice.value }).units.map(
    (unit) => unit.price,
  );
  return { ...choice, note: `from ${formatCompactPrice(Math.min(...prices))}` };
});

const viewChoices: { value: View | "any"; title: string }[] = [
  { value: "any", title: "Any view" },
  { value: "bay", title: "Bay" },
  { value: "bay-park", title: "Bay and park" },
  { value: "bay-skyline", title: "Bay and skyline" },
];

function Question({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="grid gap-3">
      <legend className="mb-3 text-lg font-bold">{title}</legend>
      {children}
    </fieldset>
  );
}

export function NeedsStep({
  needs,
  onChange,
}: {
  needs: Needs;
  onChange: (needs: Needs) => void;
}) {
  const set = (patch: Partial<Needs>) => onChange({ ...needs, ...patch });
  const { units, relaxed } = matchUnits(needs);

  return (
    <div className="grid gap-10">
      <Question title="How many bedrooms?">
        <div
          role="radiogroup"
          className="grid grid-cols-2 gap-3 sm:grid-cols-5"
        >
          {bedroomChoices.map((choice) => (
            <ChoiceTile
              key={choice.value}
              selected={needs.beds === choice.value}
              onClick={() =>
                set({ beds: needs.beds === choice.value ? null : choice.value })
              }
              title={choice.title}
              note={choice.note}
            />
          ))}
        </div>
      </Question>
      <Question title="What is your budget?">
        <div
          role="radiogroup"
          className="grid grid-cols-2 gap-3 sm:grid-cols-5"
        >
          {BUDGETS.map((budget) => (
            <ChoiceTile
              key={budget}
              selected={needs.budget === budget}
              onClick={() => set({ budget })}
              title={
                budget ? `Up to ${formatCompactPrice(budget)}` : "Any budget"
              }
            />
          ))}
        </div>
      </Question>
      <Question title="Which view do you prefer?">
        <div
          role="radiogroup"
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {viewChoices.map((choice) => (
            <ChoiceTile
              key={choice.value}
              selected={needs.view === choice.value}
              onClick={() => set({ view: choice.value })}
              title={choice.title}
            />
          ))}
        </div>
      </Question>
      <div className="rounded-2xl bg-surface px-4 shadow-card">
        <Toggle
          checked={needs.terrace}
          onChange={(terrace) => set({ terrace })}
          label="I want a terrace"
          description="Every residence from floor 10 up and every corner residence has one."
        />
      </div>
      <p
        aria-live="polite"
        className="rounded-2xl bg-bay-tint px-5 py-4 font-medium text-bay"
      >
        {relaxed
          ? `Nothing matches every choice. Next we show ${units.length} close options.`
          : `${units.length} ${units.length === 1 ? "residence matches" : "residences match"} your choices.`}
      </p>
    </div>
  );
}
