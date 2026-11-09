import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { site } from "@/data/site";
import { units } from "@/data/units";
import { HeroChooser } from "./HeroChooser";

export function Hero() {
  const available = units.filter((unit) => unit.status === "available").length;
  return (
    <Container className="pt-4 sm:pt-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink">
        <Image
          src="/images/bay-causeway.webp"
          alt="Biscayne Bay with a causeway and the Miami skyline beyond"
          fill
          priority
          fetchPriority="high"
          sizes="(min-width: 1320px) 1256px, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink/30 lg:bg-gradient-to-r lg:from-ink/85 lg:via-ink/55 lg:to-ink/10"
        />
        <div className="relative grid gap-8 px-5 py-10 sm:px-10 sm:py-14 lg:min-h-[620px] lg:grid-cols-12 lg:items-center lg:px-14">
          <div className="text-white lg:col-span-6">
            <p className="rise inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
              Edgewater, Miami. Completion {site.completion}
            </p>
            <h1 className="rise mt-5 text-display text-white">
              Design your home on Biscayne Bay
            </h1>
            <p className="rise-late mt-5 max-w-md text-lg text-white/85">
              Choose a residence and change its layout, or draw your own. You
              see the plan, the 3D view and the price as you go. {available}{" "}
              residences are still available.
            </p>
          </div>
          <div className="rise-late lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
            <HeroChooser />
          </div>
        </div>
      </div>
    </Container>
  );
}
