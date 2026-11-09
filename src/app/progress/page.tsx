import { PostCard } from "@/components/content/PostCard";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProgressBar } from "@/components/content/ProgressBar";
import { site } from "@/data/site";
import { updates } from "@/data/updates";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Construction progress",
  description:
    "Construction updates from The Halden site in Edgewater, Miami: foundations, structure, facade and the road to completion in Q2 2028.",
  path: "/progress",
});

export default function ProgressPage() {
  const latest = updates[0]!;
  return (
    <>
      <PageHeader
        title="Construction progress"
        lead="Notes and photographs from the site every two months, from the seawall to topping out."
        trail={[{ name: "Progress", path: "/progress" }]}
      >
        <div className="mt-10 max-w-2xl">
          <ProgressBar value={latest.progress} />
          <p className="tabular mt-3 flex justify-between gap-4 text-sm text-muted">
            <span>Latest: {latest.milestone}</span>
            <span>Completion {site.completion}</span>
          </p>
        </div>
      </PageHeader>
      <Container>
        <h2 className="sr-only">All construction updates</h2>
        <ol className="grid gap-x-8 gap-y-14 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {updates.map((update) => (
            <li key={update.slug}>
              <PostCard
                href={`/progress/${update.slug}`}
                title={update.title}
                summary={update.summary}
                date={update.date}
                photo={update.photo}
                meta={`${update.progress}% complete`}
              />
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
