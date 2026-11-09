import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PlanCard } from "@/components/residences/PlanCard";
import { plans } from "@/data/plans";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Floor plans, studios to penthouses",
  description:
    "Eight floor plans at The Halden, Miami: studios, one, two and three bedrooms and two half-floor penthouses, 572 to 3,200 sq ft.",
  path: "/floor-plans",
});

export default function FloorPlansPage() {
  return (
    <>
      <PageHeader
        title="Floor plans"
        lead="Eight plans, from a 572 sq ft studio to the 3,200 sq ft penthouses. Every plan has layout options you can try before you reserve."
        trail={[{ name: "Floor plans", path: "/floor-plans" }]}
      />
      <Container>
        <h2 className="sr-only">All floor plans</h2>
        <div className="grid gap-6 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </div>
      </Container>
    </>
  );
}
