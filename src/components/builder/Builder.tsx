"use client";

import { useRef, useState } from "react";
import { getPlan } from "@/data/plans";
import {
  builderQuery,
  CUSTOM_STEPS,
  GUIDED_STEPS,
  parseBuilder,
  startRooms,
  type BuilderState,
  type Mode,
} from "@/lib/builder";
import { defaultConfiguration } from "@/lib/config";
import { getUnit, planOf } from "@/lib/units";
import { ArrangeStep } from "./ArrangeStep";
import { CustomizeStep } from "./CustomizeStep";
import { CustomSummaryStep } from "./CustomSummaryStep";
import { ModeSwitch } from "./ModeSwitch";
import { NeedsStep } from "./NeedsStep";
import { PickStep } from "./PickStep";
import { ShellStep } from "./ShellStep";
import { StepNav } from "./StepNav";
import { StepProgress } from "./StepProgress";
import { STEP_TEXT } from "./steps";
import { SummaryStep } from "./SummaryStep";

export function Builder({ search }: { search: string }) {
  const [state, setState] = useState(() =>
    parseBuilder(new URLSearchParams(search)),
  );
  const top = useRef<HTMLDivElement>(null);
  const unit = state.unit ? getUnit(state.unit) : undefined;
  const plan = unit ? planOf(unit) : undefined;
  const shell = getPlan(state.shell)!;
  const guided = state.mode === "guided";
  const steps = guided ? GUIDED_STEPS : CUSTOM_STEPS;
  const text = STEP_TEXT[state.mode][state.step - 1]!;
  const needsUnit = guided && state.step >= 2 && !unit;

  function save(next: BuilderState, scroll = false) {
    setState(next);
    window.history.replaceState(null, "", `/build${builderQuery(next)}`);
    if (scroll)
      top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const goTo = (step: number) => save({ ...state, step }, true);
  const reachable = (step: number) =>
    step <= state.step || !guided || step === 2 || Boolean(unit);

  function switchMode(mode: Mode) {
    if (mode !== state.mode) save({ ...state, mode, step: 1 });
  }

  function startCustom() {
    if (!plan) return;
    save(
      {
        ...state,
        mode: "custom",
        step: 2,
        shell: plan.slug,
        rooms: startRooms(plan),
      },
      true,
    );
  }

  return (
    <div ref={top} className="scroll-mt-20">
      <div className="grid gap-6 rounded-3xl bg-surface p-4 shadow-card sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-headline">Design your home</h1>
          <p className="text-sm text-muted">
            Step {state.step} of {steps.length}
          </p>
        </div>
        <ModeSwitch value={state.mode} onChange={switchMode} />
        <StepProgress
          steps={steps}
          current={state.step}
          onJump={goTo}
          reachable={reachable}
        />
      </div>

      <div className="mt-10 mb-8">
        <h2 className="text-3xl">{text.title}</h2>
        <p className="mt-2 max-w-2xl text-lg text-muted">{text.hint}</p>
      </div>

      {guided && state.step === 1 && (
        <NeedsStep
          needs={state.needs}
          onChange={(needs) =>
            save({ ...state, needs, unit: null, config: defaultConfiguration })
          }
        />
      )}
      {guided && state.step === 2 && (
        <PickStep
          needs={state.needs}
          selected={state.unit}
          onSelect={(slug) =>
            save({
              ...state,
              unit: slug,
              config: slug === state.unit ? state.config : defaultConfiguration,
            })
          }
        />
      )}
      {guided && state.step === 3 && unit && plan && (
        <CustomizeStep
          unit={unit}
          plan={plan}
          config={state.config}
          onChange={(config) => save({ ...state, config })}
          onCustom={startCustom}
        />
      )}
      {guided && state.step === 4 && unit && plan && (
        <SummaryStep unit={unit} plan={plan} config={state.config} />
      )}
      {!guided && state.step === 1 && (
        <ShellStep
          shell={state.shell}
          empty={state.rooms.length === 0}
          onChoose={(id, rooms) => save({ ...state, shell: id, rooms })}
        />
      )}
      {!guided && state.step === 2 && (
        <ArrangeStep
          plan={shell}
          rooms={state.rooms}
          onRooms={(rooms) => save({ ...state, rooms })}
        />
      )}
      {!guided && state.step === 3 && (
        <CustomSummaryStep plan={shell} rooms={state.rooms} />
      )}

      <StepNav
        step={state.step}
        total={steps.length}
        onBack={() => goTo(state.step - 1)}
        onNext={() => goTo(state.step + 1)}
        nextDisabled={needsUnit}
        disabledHint="Select a residence to continue"
        nextLabel={steps[state.step]}
      />
    </div>
  );
}
