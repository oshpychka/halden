import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy notice and how data is handled",
  description:
    "How The Halden website handles the information you enter: what is kept in your browser, what is not collected and how to reach us.",
  path: "/privacy",
});

const sections = [
  {
    heading: "What this website collects",
    body: [
      "Nothing that identifies you. The website does not use cookies, analytics or advertising trackers, and it does not load scripts from other companies.",
      "When you send a presentation request, the details you enter are not transmitted or stored by this website. To talk to the sales team, call the sales gallery.",
    ],
  },
  {
    heading: "What stays in your browser",
    body: [
      "Residences you save to compare are kept in your browser's local storage on your own device. They are never sent anywhere. Clearing your browser data removes them.",
      "Layout configurations live in the page address. When you share a link, the configuration travels with it and nothing else.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about this notice can be directed to the sales gallery at ${site.gallery.street}, Miami.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy notice"
        lead="Last updated November 2, 2026."
        trail={[{ name: "Privacy", path: "/privacy" }]}
      />
      <Container>
        <div className="max-w-2xl space-y-10 border-t border-line pt-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-3xl">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
