import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { site } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

export function Architecture() {
  return (
    <Container className="py-20">
      <section aria-labelledby="architecture-heading">
        <SectionHeading
          id="architecture-heading"
          title="Every residence faces the bay"
          lead={`${site.architect} moved the core and corridor to the west side of the floor. All five residences on each floor look east over the water, and the corners add a second view.`}
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <figure className="rounded-3xl bg-sand/70 p-8 lg:col-span-7">
            <blockquote className="text-2xl leading-snug font-semibold sm:text-3xl">
              We drew the floor plates before the facade. A plan that works
              makes the elevation simple.
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted">
              Tomas Lindqvist, Partner, {site.architect}
            </figcaption>
          </figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-5">
            <Image
              src="/images/interior-living.webp"
              alt="Bright living room with white sofas and tall windows"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <dl className="tabular mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4 lg:ml-[calc(2/12*100%)]">
          <div>
            <dt className="text-sm text-muted">Developer</dt>
            <dd className="mt-1">{site.developer}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Architect</dt>
            <dd className="mt-1">{site.architect}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Residences</dt>
            <dd className="mt-1">82 on 17 floors</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Ceiling height</dt>
            <dd className="mt-1">10 ft, 12 ft on level 20</dd>
          </div>
        </dl>
      </section>
    </Container>
  );
}
