import { Container } from "@/components/layout/Container";
import { PlanSvg } from "@/components/plan/PlanSvg";
import { SunPatches } from "@/components/plan/SunPatches";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getPlan } from "@/data/plans";
import { buildLayout } from "@/lib/plan";
import { SectionHeading } from "./SectionHeading";

const plan = getPlan("the-point")!;

const steps = [
  {
    title: "Pick a residence",
    text: "Tell us how many bedrooms, your budget and the view you want. We show the residences that fit.",
    layout: buildLayout(plan),
    highlight: [] as string[],
    sun: false,
  },
  {
    title: "Make it yours",
    text: "Turn the study into a bedroom, widen the bath, close the kitchen. The plan and the price change right away.",
    layout: buildLayout(plan, ["third-bedroom", "double-vanity"]),
    highlight: ["study", "primary-closet", "primary-bath"],
    sun: false,
  },
  {
    title: "See it in light and 3D",
    text: "Check where the morning sun falls on any day of the year, walk around the plan in 3D, then save or share it.",
    layout: buildLayout(plan, ["third-bedroom", "double-vanity"]),
    highlight: [] as string[],
    sun: true,
  },
];

export function HowItWorks() {
  return (
    <Container className="py-20">
      <section aria-labelledby="how-heading">
        <SectionHeading
          id="how-heading"
          title="How it works"
          lead="Three steps from a floor plan on screen to the residence you want."
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col rounded-3xl bg-surface p-5 shadow-card"
            >
              <div className="rounded-2xl bg-paper p-3">
                <PlanSvg
                  layout={step.layout}
                  title={`${step.title}, example plan`}
                  highlight={step.highlight}
                  detailed={false}
                  overlay={
                    step.sun ? (
                      <SunPatches
                        layout={step.layout}
                        sun={{ azimuth: 105, altitude: 28 }}
                      />
                    ) : undefined
                  }
                  className="aspect-[4/3]"
                />
              </div>
              <p className="mt-5 flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-bay text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-xl font-bold">{step.title}</span>
              </p>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/build" variant="accent" size="lg">
            Start with a residence
            <Icon name="arrow" size={20} />
          </ButtonLink>
          <ButtonLink href="/build?mode=custom" variant="secondary" size="lg">
            Design my own layout
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
