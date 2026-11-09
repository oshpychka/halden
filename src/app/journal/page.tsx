import { PostCard } from "@/components/content/PostCard";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { posts } from "@/data/posts";
import { readingMinutes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Journal: buying a condo before completion",
  description:
    "Notes on buying a pre-construction condo in Miami: deposits, layouts, timelines and life in Edgewater, from The Halden team.",
  path: "/journal",
});

export default function JournalPage() {
  return (
    <>
      <PageHeader
        title="Journal"
        lead="Practical notes on buying before completion, choosing a layout and living on the bay."
        trail={[{ name: "Journal", path: "/journal" }]}
      />
      <Container>
        <h2 className="sr-only">Articles</h2>
        <div className="grid gap-x-8 gap-y-14 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              href={`/journal/${post.slug}`}
              title={post.title}
              summary={post.description}
              date={post.published}
              photo={post.cover}
              meta={`${readingMinutes(post.body)} min read`}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
