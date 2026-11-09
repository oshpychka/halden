"use client";

import { FinishPicker } from "@/components/plan/FinishPicker";
import { OptionList } from "@/components/plan/OptionList";
import { PlanStage } from "@/components/plan/PlanStage";
import { Icon } from "@/components/ui/Icon";
import { getFinish } from "@/data/finishes";
import { buildLayout } from "@/lib/plan";
import type { Plan, Unit } from "@/lib/types";
import { unitName, unitTerrace, type Configuration } from "@/lib/units";
import { PriceBreakdown } from "./PriceBreakdown";

type CustomizeStepProps = {
  unit: Unit;
  plan: Plan;
  config: Configuration;
  onChange: (config: Configuration) => void;
  onCustom: () => void;
};

function changedRooms(plan: Plan, options: string[]): string[] {
  return plan.options
    .filter((option) => options.includes(option.id))
    .flatMap((option) => [
      ...Object.keys(option.patch ?? {}),
      ...(option.add ?? []).map((room) => room.id),
    ]);
}

export function CustomizeStep({
  unit,
  plan,
  config,
  onChange,
  onCustom,
}: CustomizeStepProps) {
  const toggle = (id: string, on: boolean) =>
    onChange({
      ...config,
      options: on
        ? [...config.options, id]
        : config.options.filter((item) => item !== id),
    });

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="self-start lg:sticky lg:top-20 lg:col-span-7">
        <PlanStage
          layout={buildLayout(plan, config.options, unit.mirrored)}
          title={`Floor plan of ${unitName(unit)}, ${plan.name}`}
          finish={getFinish(config.finish)}
          terrace={unitTerrace(unit, plan)}
          highlight={changedRooms(plan, config.options)}
        />
        <p className="mt-3 flex items-center gap-2 text-sm text-muted">
          <span
            aria-hidden="true"
            className="size-3 rounded-sm bg-bay-tint ring-1 ring-bay"
          />
          Rooms changed by your options. Bay side at the top.
        </p>
      </div>
      <div className="flex flex-col gap-6 lg:col-span-5">
        <PriceBreakdown unit={unit} plan={plan} config={config} />
        <section className="rounded-2xl bg-surface p-5 shadow-card">
          <h3 className="text-lg">Layout options</h3>
          <p className="mb-2 text-sm text-muted">
            Switch an option and watch the plan change.
          </p>
          <OptionList plan={plan} selected={config.options} onToggle={toggle} />
        </section>
        <section className="rounded-2xl bg-surface p-5 shadow-card">
          <h3 className="mb-3 text-lg">Finish package</h3>
          <FinishPicker
            value={config.finish}
            area={plan.width * plan.depth}
            onChange={(finish) => onChange({ ...config, finish })}
          />
        </section>
        <button
          type="button"
          onClick={onCustom}
          className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-bay/40 p-4 text-left hover:border-bay"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-bay-tint text-bay">
            <Icon name="plan" />
          </span>
          <span>
            <span className="block font-bold">Want a different layout?</span>
            <span className="text-sm text-muted">
              Move the walls yourself, starting from this {plan.name} plan.
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
