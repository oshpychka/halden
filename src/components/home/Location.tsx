import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "./SectionHeading";

const distances = [
  { place: "Margaret Pace Park", time: "4 min", mode: "walk" },
  { place: "Design District", time: "8 min", mode: "drive" },
  { place: "Wynwood", time: "9 min", mode: "drive" },
  { place: "Brickell", time: "10 min", mode: "drive" },
  { place: "Miami Beach", time: "15 min", mode: "drive" },
  { place: "Miami International Airport", time: "20 min", mode: "drive" },
];

export function Location() {
  return (
    <section aria-labelledby="location-heading" className="py-20">
      <Container>
        <SectionHeading
          id="location-heading"
          title="Edgewater, on the water"
          lead="The narrow strip between Biscayne Boulevard and the bay, north of downtown. Residential, walkable, and ten minutes from almost everything."
        />
      </Container>
      <Container className="mt-10">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl sm:aspect-[21/9]">
          <Image
            src="/images/bay-skyline.webp"
            alt="Downtown Miami towers along the water under a blue sky"
            fill
            sizes="(min-width: 1320px) 1256px, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
      <Container>
        <div className="grid gap-8 pt-10 lg:grid-cols-12">
          <ul className="tabular grid gap-x-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-3">
            {distances.map((item) => (
              <li
                key={item.place}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3"
              >
                <span>{item.place}</span>
                <span className="whitespace-nowrap text-muted">
                  {item.time} {item.mode}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted lg:col-span-3">
            Times outside rush hour.{" "}
            <Link
              href="/journal/edgewater-block-by-block"
              className="text-ink underline underline-offset-4 hover:text-bay"
            >
              Edgewater, block by block
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
