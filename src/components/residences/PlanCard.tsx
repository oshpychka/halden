import Link from "next/link";
import { PlanSvg } from "@/components/plan/PlanSvg";
import {
  formatArea,
  formatBathrooms,
  formatBedrooms,
  formatCompactPrice,
} from "@/lib/format";
import { buildLayout } from "@/lib/plan";
import { planFacts } from "@/lib/plans";
import type { Plan } from "@/lib/types";

export function PlanCard({ plan }: { plan: Plan }) {
  const facts = planFacts(plan);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface shadow-card transition-shadow duration-200 ease-drawn hover:shadow-lift">
      <div className="bg-paper/60 p-5">
        <PlanSvg
          layout={buildLayout(plan)}
          title={`Plan of ${plan.name}`}
          terrace={plan.balcony}
          detailed={false}
          className="aspect-[4/3]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-3xl leading-tight">
          <Link
            href={`/floor-plans/${plan.slug}`}
            className="after:absolute after:inset-0"
          >
            {plan.name}
          </Link>
        </h3>
        <p className="text-muted">{plan.summary}</p>
        <p className="tabular mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3 text-sm">
          <span>{formatBedrooms(facts.bedrooms)}</span>
          <span>{formatBathrooms(facts.bathrooms)}</span>
          <span>{formatArea(facts.area)}</span>
        </p>
        <p className="tabular flex justify-between gap-4 border-t border-line pt-3 text-sm">
          <span>
            {facts.fromPrice
              ? `From ${formatCompactPrice(facts.fromPrice)}`
              : "Sold out"}
          </span>
          <span className="text-muted">
            {facts.available} of {facts.total} available
          </span>
        </p>
      </div>
    </article>
  );
}
