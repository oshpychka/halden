import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { faq } from "@/data/building";
import { SectionHeading } from "./SectionHeading";

export function Faq() {
  return (
    <Container className="py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <section aria-labelledby="faq-heading">
        <SectionHeading id="faq-heading" title="Questions buyers ask" />
        <div className="mt-10 grid max-w-3xl gap-3">
          {faq.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl bg-surface px-5 shadow-card"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.question}
                <Icon
                  name="plus"
                  className="shrink-0 transition-transform duration-200 ease-drawn group-open:rotate-45"
                />
              </summary>
              <p className="max-w-[60ch] pb-6 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </Container>
  );
}
