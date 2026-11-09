import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { amenities } from "@/data/building";
import { SectionHeading } from "./SectionHeading";

export function Amenities() {
  return (
    <Container className="py-20">
      <section aria-labelledby="amenities-heading">
        <SectionHeading
          id="amenities-heading"
          title="The building"
          lead="Twenty floors on a quiet street that ends at the water. Shared spaces sit on the first three levels, so every floor above is residences only."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-7 lg:aspect-auto">
            <Image
              src="/images/rooftop-pool.webp"
              alt="Infinity pool at dusk with a pink sky over the water"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <dl className="grid gap-3 lg:col-span-5">
            {amenities.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl bg-surface p-4 shadow-card"
              >
                <dt className="flex items-baseline justify-between gap-4">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-muted">{item.level}</span>
                </dt>
                <dd className="mt-1 text-sm text-muted">{item.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </Container>
  );
}
