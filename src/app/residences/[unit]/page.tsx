import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RequestButton } from "@/components/forms/RequestButton";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PlanSvg } from "@/components/plan/PlanSvg";
import { SaveButton } from "@/components/residences/SaveButton";
import { UnitCard } from "@/components/residences/UnitCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { StatusChip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { planPhotos } from "@/data/plan-photos";
import { units } from "@/data/units";
import {
  formatArea,
  formatBathrooms,
  formatBedrooms,
  formatPrice,
} from "@/lib/format";
import { buildLayout } from "@/lib/plan";
import { residenceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import type { Unit } from "@/lib/types";
import {
  getUnit,
  planOf,
  unitName,
  unitSummary,
  unitTerrace,
  viewLabel,
} from "@/lib/units";

type Props = { params: Promise<{ unit: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return units.map((unit) => ({ unit: unit.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const unit = getUnit((await params).unit);
  if (!unit) return {};
  const plan = planOf(unit);
  const { area, bedrooms, bathrooms } = unitSummary(unit);
  return pageMetadata({
    title: `${unitName(unit)}, ${plan.name}`,
    description: `${unitName(unit)} at The Halden, Miami: ${formatBedrooms(bedrooms).toLowerCase()}, ${bathrooms} bath, ${area.toLocaleString("en-US")} sq ft on floor ${unit.floor}. Adjust the layout and see the price.`,
    path: `/residences/${unit.slug}`,
    image: `/residences/${unit.slug}/opengraph-image`,
  });
}

function similarTo(unit: Unit): Unit[] {
  return units
    .filter(
      (other) =>
        other.slug !== unit.slug &&
        other.plan === unit.plan &&
        other.status !== "sold",
    )
    .sort(
      (a, b) => Math.abs(a.floor - unit.floor) - Math.abs(b.floor - unit.floor),
    )
    .slice(0, 3);
}

export default async function ResidencePage({ params }: Props) {
  const unit = getUnit((await params).unit);
  if (!unit) notFound();
  const plan = planOf(unit);
  const name = unitName(unit);
  const summary = unitSummary(unit);
  const similar = similarTo(unit);
  const photo = planPhotos[plan.slug]!;
  const facts = [
    ["Floor", String(unit.floor)],
    ["Bedrooms", formatBedrooms(summary.bedrooms)],
    ["Bathrooms", formatBathrooms(summary.bathrooms)],
    ["Interior", formatArea(summary.area)],
    ["Terrace", summary.terrace ? formatArea(summary.terrace) : "None"],
    ["View", viewLabel(unit.view)],
  ];
  const customize = `/build?mode=guided&step=3&unit=${unit.slug}`;

  return (
    <>
      <JsonLd data={residenceSchema(unit)} />
      <PageHeader
        title={name}
        lead={
          <>
            <Link
              href={`/floor-plans/${plan.slug}`}
              className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              {plan.name}
            </Link>
            . {plan.summary}.
          </>
        }
        trail={[
          { name: "Residences", path: "/residences" },
          { name, path: `/residences/${unit.slug}` },
        ]}
      />
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <figure className="rounded-3xl bg-surface p-4 shadow-card sm:p-8 lg:col-span-7">
            <PlanSvg
              layout={buildLayout(plan, [], unit.mirrored)}
              title={`Floor plan of ${name}`}
              terrace={unitTerrace(unit, plan)}
            />
            <figcaption className="mt-3 text-sm text-muted">
              Standard layout. Bay side at the top.
            </figcaption>
          </figure>
          <div className="self-start lg:sticky lg:top-24 lg:col-span-5">
            <div className="grid gap-5 rounded-3xl bg-surface p-4 shadow-card sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <StatusChip status={unit.status} />
                <SaveButton slug={unit.slug} name={name} compact />
              </div>
              <div>
                <p className="text-sm text-muted">
                  {unit.status === "sold" ? "Last price" : "Price from"}
                </p>
                <p className="tabular text-4xl font-bold tracking-tight">
                  {formatPrice(unit.price)}
                </p>
              </div>
              <dl className="tabular grid grid-cols-2 gap-2 sm:grid-cols-3">
                {facts.map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-paper px-3 py-2">
                    <dt className="text-xs text-muted">{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              <ButtonLink
                href={customize}
                variant="accent"
                size="lg"
                className="w-full max-sm:px-4"
              >
                <Icon name="sparkle" size={20} />
                Customize this residence
              </ButtonLink>
              <p className="-mt-2 text-center text-sm text-muted">
                Try layout options, finishes, 3D and sunlight
              </p>
              {unit.status !== "sold" && (
                <RequestButton
                  title={`Request ${name}`}
                  residence={unit.slug}
                  variant="secondary"
                  className="w-full"
                >
                  Request a presentation
                </RequestButton>
              )}
            </div>
          </div>
        </div>

        <section
          aria-labelledby="change-heading"
          className="mt-20 grid gap-8 lg:grid-cols-12"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-5">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-7">
            <h2 id="change-heading" className="text-headline">
              What you can change
            </h2>
            <p className="mt-3 text-lg text-muted">{plan.description}</p>
            <ul className="mt-6 grid gap-3">
              {plan.options.map((option) => (
                <li
                  key={option.id}
                  className="flex items-start gap-3 rounded-2xl bg-surface p-4 shadow-card"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-bay-tint text-bay">
                    <Icon name="check" size={16} />
                  </span>
                  <span>
                    <span className="block font-semibold">{option.label}</span>
                    <span className="text-sm text-muted">
                      {option.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <ButtonLink href={customize} variant="primary" className="mt-6">
              Try these options on the plan
              <Icon name="arrow" size={18} />
            </ButtonLink>
          </div>
        </section>

        {similar.length > 0 && (
          <section className="mt-20" aria-labelledby="similar-heading">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="similar-heading" className="text-headline">
                The same plan on other floors
              </h2>
              <Link
                href={`/floor-plans/${plan.slug}`}
                className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-bay"
              >
                All {plan.name} residences
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item) => (
                <UnitCard key={item.slug} unit={item} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
