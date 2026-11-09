import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ResidenceFinder } from "@/components/residences/ResidenceFinder";
import { ResidenceList } from "@/components/residences/ResidenceList";
import { UnitCard } from "@/components/residences/UnitCard";
import { collections } from "@/data/collections";
import { units } from "@/data/units";
import { applyFilters, defaultFilters } from "@/lib/filters";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Residences and availability",
  description:
    "All 82 residences at The Halden in Edgewater, Miami. Filter by bedrooms, floor, view, terrace and price, and check availability floor by floor.",
  path: "/residences",
});

export default function ResidencesPage() {
  const available = units.filter((unit) => unit.status === "available").length;
  return (
    <>
      <PageHeader
        title="Residences"
        lead={`${available} of ${units.length} residences are available. Pick a floor on the building or filter the list.`}
        trail={[{ name: "Residences", path: "/residences" }]}
      />
      <Container>
        <section
          aria-labelledby="by-floor"
          className="border-t border-line pt-10"
        >
          <h2 id="by-floor" className="sr-only">
            Browse by floor
          </h2>
          <ResidenceFinder />
        </section>
        <section aria-labelledby="all-residences" className="mt-24 pt-4">
          <h2 id="all-residences" className="mb-8 font-display text-headline">
            All residences
          </h2>
          <Suspense
            fallback={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {applyFilters(units, defaultFilters)
                  .slice(0, 12)
                  .map((unit) => (
                    <UnitCard key={unit.slug} unit={unit} />
                  ))}
              </div>
            }
          >
            <ResidenceList />
          </Suspense>
        </section>
        <section
          aria-labelledby="collections"
          className="mt-24 border-t border-line pt-10"
        >
          <h2 id="collections" className="font-display text-headline">
            Collections
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
            {collections.map((collection) => (
              <li key={collection.slug}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover:decoration-ink"
                >
                  {collection.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
