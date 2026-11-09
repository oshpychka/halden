import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { UnitCard } from "@/components/residences/UnitCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { collections, getCollection } from "@/data/collections";
import { collectionUnits } from "@/lib/collections";
import { formatCompactPrice } from "@/lib/format";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { unitName } from "@/lib/units";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = getCollection((await params).slug);
  if (!collection) return {};
  return pageMetadata({
    title: collection.title,
    description: collection.description,
    path: `/collections/${collection.slug}`,
    image: `/collections/${collection.slug}/opengraph-image`,
  });
}

export default async function CollectionPage({ params }: Props) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();
  const all = collectionUnits(collection.filter);
  const open = all.filter((unit) => unit.status !== "sold");
  const available = all.filter((unit) => unit.status === "available").length;
  const fromPrice = open.length
    ? Math.min(...open.map((unit) => unit.price))
    : null;
  const others = collections.filter((item) => item.slug !== collection.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: collection.title,
          itemListElement: open.map((unit, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: unitName(unit),
            url: absoluteUrl(`/residences/${unit.slug}`),
          })),
        }}
      />
      <PageHeader
        title={collection.heading}
        lead={collection.intro[0]}
        trail={[
          { name: "Residences", path: "/residences" },
          { name: collection.title, path: `/collections/${collection.slug}` },
        ]}
      >
        <p className="mt-4 max-w-2xl text-lg text-muted">
          {collection.intro[1]}
        </p>
        <p className="tabular mt-6 text-sm">
          {available} available of {all.length}
          {fromPrice && <>, from {formatCompactPrice(fromPrice)}</>}
        </p>
      </PageHeader>
      <Container>
        <h2 className="sr-only">Residences in this collection</h2>
        {open.length ? (
          <div className="grid gap-6 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {open.map((unit) => (
              <UnitCard key={unit.slug} unit={unit} />
            ))}
          </div>
        ) : (
          <p className="border-t border-line pt-10 text-muted">
            Every residence in this collection is sold.{" "}
            <Link href="/residences" className="underline underline-offset-4">
              See all residences
            </Link>
            .
          </p>
        )}
        <nav
          aria-labelledby="more-collections"
          className="mt-20 border-t border-line pt-10"
        >
          <h2 id="more-collections" className="font-display text-headline">
            More collections
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/collections/${item.slug}`}
                  className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover:decoration-ink"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </>
  );
}
