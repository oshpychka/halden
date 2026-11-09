import { getFinish } from "@/data/finishes";
import { formatPrice } from "@/lib/format";
import type { Plan, Unit } from "@/lib/types";
import { configuredPrice, type Configuration } from "@/lib/units";

type PriceBreakdownProps = {
  unit: Unit;
  plan: Plan;
  config: Configuration;
};

export function PriceBreakdown({ unit, plan, config }: PriceBreakdownProps) {
  const area = plan.width * plan.depth;
  const finish = getFinish(config.finish);
  const finishCost = finish.pricePerSqft * area;
  const total = configuredPrice(unit, config);
  const rows = [
    ["Residence", unit.price],
    ["Layout options", total - unit.price - finishCost],
    [`${finish.label} finish`, finishCost],
  ] as const;

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-card">
      <p className="text-sm text-muted">Your price</p>
      <p
        className="tabular mt-1 text-4xl font-bold tracking-tight"
        aria-live="polite"
      >
        {formatPrice(total)}
      </p>
      <dl className="tabular mt-4 grid gap-1.5 border-t border-line pt-4 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-muted">{label}</dt>
            <dd>{formatPrice(value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
