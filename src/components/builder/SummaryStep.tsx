"use client";

import { RequestButton } from "@/components/forms/RequestButton";
import { DepositPlanner } from "@/components/plan/DepositPlanner";
import { PlanSvg } from "@/components/plan/PlanSvg";
import { SaveButton } from "@/components/residences/SaveButton";
import { PrintButton } from "@/components/ui/PrintButton";
import { ShareButton } from "@/components/ui/ShareButton";
import { configurationQuery, describeConfiguration } from "@/lib/config";
import { formatArea, formatBathrooms, formatBedrooms } from "@/lib/format";
import { buildLayout } from "@/lib/plan";
import type { Plan, Unit } from "@/lib/types";
import {
  configuredPrice,
  unitName,
  unitSummary,
  unitTerrace,
  viewLabel,
  type Configuration,
} from "@/lib/units";
import { PriceBreakdown } from "./PriceBreakdown";

type SummaryStepProps = { unit: Unit; plan: Plan; config: Configuration };

export function SummaryStep({ unit, plan, config }: SummaryStepProps) {
  const name = unitName(unit);
  const summary = unitSummary(unit, config);
  const facts = [
    ["Floor", String(unit.floor)],
    ["Bedrooms", formatBedrooms(summary.bedrooms)],
    ["Bathrooms", formatBathrooms(summary.bathrooms)],
    ["Interior", formatArea(summary.area)],
    ["View", viewLabel(unit.view)],
    ["Terrace", summary.terrace ? formatArea(summary.terrace) : "None"],
  ];

  return (
    <div className="grid gap-10">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="rounded-2xl bg-surface p-4 shadow-card sm:p-6 lg:col-span-7">
          <PlanSvg
            layout={buildLayout(plan, config.options, unit.mirrored)}
            title={`Your plan of ${name}`}
            terrace={unitTerrace(unit, plan)}
          />
        </div>
        <div className="flex flex-col gap-5 lg:col-span-5">
          <div>
            <p className="text-sm text-muted">{plan.name}</p>
            <h3 className="text-3xl">{name}</h3>
            <p className="mt-2 text-muted">
              {describeConfiguration(plan, config)}
            </p>
          </div>
          <dl className="tabular grid grid-cols-2 gap-2 sm:grid-cols-3">
            {facts.map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl bg-surface px-3 py-2 shadow-card"
              >
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="font-semibold whitespace-nowrap">{value}</dd>
              </div>
            ))}
          </dl>
          <PriceBreakdown unit={unit} plan={plan} config={config} />
          <div className="flex flex-col gap-3 print:hidden">
            {unit.status === "sold" ? (
              <p className="rounded-2xl bg-sand p-4 text-sm">
                This residence is sold. Go back one step to pick another
                residence with the same plan.
              </p>
            ) : (
              <RequestButton
                title={`Request ${name}`}
                residence={unit.slug}
                configuration={describeConfiguration(plan, config)}
                variant="accent"
                className="min-h-14"
              >
                Request this residence
              </RequestButton>
            )}
            <div className="flex gap-3">
              <SaveButton
                slug={unit.slug}
                name={name}
                query={configurationQuery(config)}
              />
              <ShareButton title={`${name} at The Halden`} className="flex-1" />
              <PrintButton />
            </div>
          </div>
        </div>
      </div>
      <section className="rounded-2xl bg-surface p-5 shadow-card sm:p-8">
        <h3 className="text-2xl">Deposit schedule</h3>
        <p className="mt-1 mb-6 text-muted">
          Three 10% deposits before completion and 70% at closing, held in
          escrow.
        </p>
        <DepositPlanner unit={unit} price={configuredPrice(unit, config)} />
      </section>
    </div>
  );
}
