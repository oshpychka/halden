"use client";

import Link from "next/link";
import { useState } from "react";
import { PlanSvg } from "@/components/plan/PlanSvg";
import { ButtonLink } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { statusLabel } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { useShortlist } from "@/hooks/useShortlist";
import { describeConfiguration, parseConfiguration } from "@/lib/config";
import {
  formatArea,
  formatBathrooms,
  formatBedrooms,
  formatHours,
  formatPrice,
} from "@/lib/format";
import { buildLayout } from "@/lib/plan";
import { toggleSaved } from "@/lib/shortlist";
import { directSunMinutes } from "@/lib/sun";
import {
  getUnit,
  planOf,
  unitName,
  unitSummary,
  unitTerrace,
  viewLabel,
} from "@/lib/units";

const MAX = 3;

export function CompareTable() {
  const { list, save } = useShortlist();
  const [picked, setPicked] = useState<string[] | null>(null);
  const chosen = (picked ?? list.map((item) => item.slug))
    .filter((slug) => list.some((item) => item.slug === slug))
    .slice(0, MAX);

  if (!list.length) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-3xl bg-surface p-8 shadow-card">
        <p className="font-display text-3xl">Nothing saved yet.</p>
        <p className="max-w-prose text-muted">
          Use the heart on a residence card, or Save on a residence page, to
          keep a layout here. Saved residences stay in this browser only.
        </p>
        <ButtonLink href="/residences">Browse residences</ButtonLink>
      </div>
    );
  }

  const columns = chosen.map((slug) => {
    const saved = list.find((item) => item.slug === slug)!;
    const unit = getUnit(slug)!;
    const plan = planOf(unit);
    const config = parseConfiguration(new URLSearchParams(saved.query), plan);
    const layout = buildLayout(plan, config.options, unit.mirrored);
    return {
      saved,
      unit,
      plan,
      config,
      layout,
      summary: unitSummary(unit, config),
    };
  });

  const rows: [string, (column: (typeof columns)[number]) => string][] = [
    ["Plan", ({ plan }) => plan.name],
    ["Status", ({ unit }) => statusLabel(unit.status)],
    ["Floor", ({ unit }) => String(unit.floor)],
    ["Bedrooms", ({ summary }) => formatBedrooms(summary.bedrooms)],
    ["Bathrooms", ({ summary }) => formatBathrooms(summary.bathrooms)],
    ["Interior", ({ summary }) => formatArea(summary.area)],
    [
      "Terrace",
      ({ summary }) => (summary.terrace ? formatArea(summary.terrace) : "None"),
    ],
    ["View", ({ unit }) => viewLabel(unit.view)],
    [
      "Configuration",
      ({ plan, config }) => describeConfiguration(plan, config),
    ],
    [
      "Direct sun, December 21",
      ({ layout }) =>
        formatHours(
          directSunMinutes(
            layout.windows.map((span) => span.side),
            "2028-12-21",
          ),
        ),
    ],
    ["Price as configured", ({ summary }) => formatPrice(summary.price)],
  ];

  function toggle(slug: string, on: boolean) {
    const next = on
      ? [...chosen, slug]
      : chosen.filter((item) => item !== slug);
    setPicked(next);
  }

  return (
    <div className="flex flex-col gap-10">
      {list.length > MAX && (
        <fieldset>
          <legend className="text-sm text-muted">
            Choose up to {MAX} to compare
          </legend>
          <div className="mt-2 flex flex-wrap gap-x-6">
            {list.map((item) => {
              const unit = getUnit(item.slug)!;
              const checked = chosen.includes(item.slug);
              return (
                <Checkbox
                  key={item.slug}
                  label={unitName(unit)}
                  checked={checked}
                  disabled={!checked && chosen.length >= MAX}
                  onChange={(event) => toggle(item.slug, event.target.checked)}
                />
              );
            })}
          </div>
        </fieldset>
      )}
      <div className="overflow-x-auto">
        <table className="tabular w-full min-w-[40rem] table-fixed border-collapse text-left text-sm">
          <caption className="sr-only">Saved residences side by side</caption>
          <thead>
            <tr>
              <td className="w-36 border-b border-line" />
              {columns.map(({ unit, plan, layout, saved }) => (
                <th
                  key={unit.slug}
                  scope="col"
                  className="border-b border-line p-3 align-top font-normal"
                >
                  <PlanSvg
                    layout={layout}
                    title={`Plan of ${unitName(unit)}`}
                    terrace={unitTerrace(unit, plan)}
                    detailed={false}
                    className="aspect-[4/3]"
                  />
                  <div className="mt-3 flex items-start justify-between gap-2">
                    <Link
                      href={`/build?mode=guided&step=3&unit=${unit.slug}${saved.query.replace("?", "&")}`}
                      className="font-display text-2xl leading-tight hover:text-bay"
                    >
                      {unitName(unit)}
                    </Link>
                    <button
                      type="button"
                      onClick={() => save(toggleSaved(list, saved))}
                      aria-label={`Remove ${unitName(unit)}`}
                      className="-mt-2 -mr-2 grid size-11 shrink-0 place-items-center hover:text-bay"
                    >
                      <Icon name="close" size={18} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label}>
                <th
                  scope="row"
                  className="border-b border-line py-3 pr-3 font-normal text-muted"
                >
                  {label}
                </th>
                {columns.map((column) => (
                  <td
                    key={column.unit.slug}
                    className="border-b border-line p-3 align-top"
                  >
                    {value(column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
