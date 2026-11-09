import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PlanSvg } from "@/components/plan/PlanSvg";
import { UnitCard } from "@/components/residences/UnitCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPlan, plans } from "@/data/plans";
import {
  formatArea,
  formatBathrooms,
  formatBedrooms,
  formatCompactPrice,
  formatPrice,
} from "@/lib/format";
import { buildLayout } from "@/lib/plan";
import { planFacts, planUnits } from "@/lib/plans";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { unitName } from "@/lib/units";

type Props = { params: Promise<{ plan: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return plans.map((plan) => ({ plan: plan.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const plan = getPlan((await params).plan);
  if (!plan) return {};
  return pageMetadata({
    title: `${plan.name} floor plan`,
    description: `${plan.name} at The Halden, Miami. ${plan.summary}, ${(plan.width * plan.depth).toLocaleString("en-US")} sq ft. See the plan, layout options and available residences.`,
    path: `/floor-plans/${plan.slug}`,
    image: `/floor-plans/${plan.slug}/opengraph-image`,
  });
}

export default async function PlanPage({ params }: Props) {
  const plan = getPlan((await params).plan);
  if (!plan) notFound();
  const facts = planFacts(plan);
  const list = planUnits(plan).filter((unit) => unit.status !== "sold");
  const rows = [
    ["Bedrooms", formatBedrooms(facts.bedrooms)],
    ["Bathrooms", formatBathrooms(facts.bathrooms)],
    ["Interior", formatArea(facts.area)],
    [
      "Floors",
      facts.floors[0] === facts.floors[1]
        ? String(facts.floors[0])
        : `${facts.floors[0]} to ${facts.floors[1]}`,
    ],
    ["Available", `${facts.available} of ${facts.total}`],
    [
      "From",
      facts.fromPrice ? formatCompactPrice(facts.fromPrice) : "Sold out",
    ],
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${plan.name} residences`,
          itemListElement: list.map((unit, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: unitName(unit),
            url: absoluteUrl(`/residences/${unit.slug}`),
          })),
        }}
      />
      <PageHeader
        title={plan.name}
        lead={plan.description}
        trail={[
          { name: "Floor plans", path: "/floor-plans" },
          { name: plan.name, path: `/floor-plans/${plan.slug}` },
        ]}
      />
      <Container>
        <dl className="tabular grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-6">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="border-r border-b border-line px-4 py-3"
            >
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="mt-0.5 whitespace-nowrap">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <figure className="rounded-3xl bg-surface p-3 shadow-card sm:p-6 lg:col-span-7">
            <PlanSvg
              layout={buildLayout(plan)}
              title={`Floor plan of ${plan.name}`}
              terrace={plan.balcony}
            />
            <figcaption className="mt-3 text-sm text-muted">
              Typical layout. Corner residences in the A stack are mirrored, and
              terraces depend on the floor.
            </figcaption>
          </figure>
          <section aria-labelledby="options-heading" className="lg:col-span-5">
            <h2 id="options-heading" className="font-display text-headline">
              Layout options
            </h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {plan.options.map((option) => (
                <li key={option.id} className="py-4">
                  <p className="flex items-baseline justify-between gap-4 font-medium">
                    {option.label}
                    <span className="tabular shrink-0 text-sm font-normal text-muted">
                      {option.price
                        ? `+${formatPrice(option.price)}`
                        : "No charge"}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {option.description}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              Open any residence below to switch options on its plan and see the
              price change.
            </p>
          </section>
        </div>
        <section aria-labelledby="units-heading" className="mt-20">
          <h2 id="units-heading" className="font-display text-headline">
            {plan.name} residences
          </h2>
          {list.length ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((unit) => (
                <UnitCard key={unit.slug} unit={unit} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-muted">
              All residences of this plan are sold.
            </p>
          )}
        </section>
      </Container>
    </>
  );
}
