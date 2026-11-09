import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buyingSteps } from "@/data/building";
import { SectionHeading } from "./SectionHeading";

export function BuyingProcess() {
  return (
    <Container className="py-20">
      <section aria-labelledby="process-heading">
        <SectionHeading
          id="process-heading"
          title="From a saved layout to the keys"
          lead={
            <>
              Five steps and four payments. The deposits are held in escrow
              until closing.{" "}
              <Link
                href="/journal/how-deposits-work-before-completion"
                className="text-ink underline underline-offset-4 hover:text-bay"
              >
                How deposits work
              </Link>
            </>
          }
        />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {buyingSteps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl bg-surface p-5 shadow-card"
            >
              <span className="tabular grid size-10 place-items-center rounded-full bg-bay-tint text-lg font-bold text-bay">
                {index + 1}
              </span>
              <h3 className="mt-4 font-medium">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
}
