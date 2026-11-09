import { BuilderLoader } from "@/components/builder/BuilderLoader";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Design your home at The Halden",
  description:
    "Choose a residence and adjust its layout step by step, or draw your own layout. See the plan, 3D view, sunlight and price as you go.",
  path: "/build",
});

export default function BuildPage() {
  return (
    <Container className="pt-6 sm:pt-10">
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Design your home", path: "/build" },
        ])}
      />
      <BuilderLoader />
    </Container>
  );
}
