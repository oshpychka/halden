import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/content/ArticleBody";
import { PostCard } from "@/components/content/PostCard";
import { ReadingProgress } from "@/components/content/ReadingProgress";
import { TableOfContents } from "@/components/content/TableOfContents";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPost, posts } from "@/data/posts";
import { site } from "@/data/site";
import { readingMinutes } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import type { Post } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/journal/${post.slug}`,
    image: `/journal/${post.slug}/opengraph-image`,
    type: "article",
  });
}

function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.cover.src),
    datePublished: post.published,
    dateModified: post.updated,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: absoluteUrl(`/journal/${post.slug}`),
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <ReadingProgress target="article" />
      <PageHeader
        title={post.title}
        lead={post.description}
        trail={[
          { name: "Journal", path: "/journal" },
          { name: post.title, path: `/journal/${post.slug}` },
        ]}
      >
        <p className="tabular mt-6 text-sm text-muted">
          {post.author.name}, {post.author.role}.{" "}
          <time dateTime={post.published}>{formatDate(post.published)}</time>
          {post.updated !== post.published && (
            <>
              , updated{" "}
              <time dateTime={post.updated}>{formatDate(post.updated)}</time>
            </>
          )}
          . {readingMinutes(post.body)} min read.
        </p>
      </PageHeader>
      <Container>
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl sm:aspect-[21/9]">
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            priority
            sizes="(min-width: 1320px) 1256px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <TableOfContents blocks={post.body} />
            </div>
          </div>
          <article id="article" className="lg:col-span-8 lg:col-start-5">
            <ArticleBody blocks={post.body} />
          </article>
        </div>
        <section
          aria-labelledby="related-heading"
          className="mt-24 border-t border-line pt-10"
        >
          <h2 id="related-heading" className="font-display text-headline">
            Keep reading
          </h2>
          <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <PostCard
                key={item.slug}
                href={`/journal/${item.slug}`}
                title={item.title}
                summary={item.description}
                date={item.published}
                photo={item.cover}
              />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
