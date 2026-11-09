import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PlanSvg } from "@/components/plan/PlanSvg";
import { plans } from "@/data/plans";
import { formatArea, formatBedrooms, formatCompactPrice } from "@/lib/format";
import { buildLayout } from "@/lib/plan";
import { planFacts } from "@/lib/plans";
import { SectionHeading } from "./SectionHeading";

export function PlanTypes() {
  return (
    <Container className="py-20">
      <section aria-labelledby="plans-heading">
        <SectionHeading
          id="plans-heading"
          title="Eight plans, each with options"
          lead="From a studio with an 18-foot window to half-floor penthouses. Every plan has two or three layout changes you can try on its drawing."
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {plans.map((plan) => {
            const facts = planFacts(plan);
            return (
              <li
                key={plan.slug}
                className="group relative rounded-2xl bg-surface px-4 shadow-card transition-shadow hover:shadow-lift"
              >
                <div className="grid grid-cols-[4.5rem_1fr] items-center gap-4 py-4 sm:grid-cols-[6rem_1fr_auto] sm:gap-6">
                  <PlanSvg
                    layout={buildLayout(plan)}
                    title={`Plan of ${plan.name}`}
                    detailed={false}
                    className="transition-opacity group-hover:opacity-70"
                  />
                  <div>
                    <h3 className="font-display text-3xl leading-tight">
                      <Link
                        href={`/floor-plans/${plan.slug}`}
                        className="after:absolute after:inset-0"
                      >
                        {plan.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted">{plan.summary}</p>
                  </div>
                  <p className="tabular col-start-2 flex gap-x-5 text-sm sm:col-start-auto sm:flex-col sm:items-end sm:gap-1">
                    <span>
                      {formatBedrooms(facts.bedrooms)}, {formatArea(facts.area)}
                    </span>
                    <span className="text-muted">
                      {facts.fromPrice
                        ? `From ${formatCompactPrice(facts.fromPrice)}`
                        : "Sold out"}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </Container>
  );
}
