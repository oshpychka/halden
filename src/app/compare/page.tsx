import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CompareTable } from "@/components/residences/CompareTable";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Compare residences",
  description:
    "Compare up to three saved residences at The Halden side by side: plans, sizes, options, sunlight and prices.",
  path: "/compare",
  noindex: true,
});

export default function ComparePage() {
  return (
    <>
      <PageHeader
        title="Compare"
        lead="Your saved residences with their layouts, side by side."
        trail={[{ name: "Compare", path: "/compare" }]}
      />
      <Container>
        <div className="border-t border-line pt-10">
          <CompareTable />
        </div>
      </Container>
    </>
  );
}
