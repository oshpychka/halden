import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/content/ArticleBody";
import { ProgressBar } from "@/components/content/ProgressBar";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { getUpdate, updates } from "@/data/updates";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return updates.map((update) => ({ slug: update.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const update = getUpdate((await params).slug);
  if (!update) return {};
  return pageMetadata({
    title: update.title,
    description: update.summary,
    path: `/progress/${update.slug}`,
    image: `/progress/${update.slug}/opengraph-image`,
    type: "article",
  });
}

export default async function UpdatePage({ params }: Props) {
  const update = getUpdate((await params).slug);
  if (!update) notFound();
  const index = updates.indexOf(update);
  const newer = updates[index - 1];
  const older = updates[index + 1];

  return (
    <>
      <PageHeader
        title={update.title}
        lead={update.summary}
        trail={[
          { name: "Progress", path: "/progress" },
          { name: update.milestone, path: `/progress/${update.slug}` },
        ]}
      >
        <p className="tabular mt-6 text-sm text-muted">
          <time dateTime={update.date}>{formatDate(update.date)}</time>
        </p>
      </PageHeader>
      <Container>
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl sm:aspect-[21/9]">
          <Image
            src={update.photo.src}
            alt={update.photo.alt}
            fill
            priority
            sizes="(min-width: 1320px) 1256px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <ProgressBar value={update.progress} />
          </div>
          <article className="lg:col-span-8 lg:col-start-5">
            <ArticleBody blocks={update.body} />
          </article>
        </div>
        <nav
          aria-label="More updates"
          className="mt-20 grid gap-4 border-t border-line pt-6 sm:grid-cols-2"
        >
          {older ? (
            <Link
              href={`/progress/${older.slug}`}
              className="flex min-h-11 flex-col hover:text-bay"
            >
              <span className="text-sm text-muted">Earlier</span>
              {older.title}
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              href={`/progress/${newer.slug}`}
              className="flex min-h-11 flex-col hover:text-bay sm:text-right"
            >
              <span className="text-sm text-muted">Later</span>
              {newer.title}
            </Link>
          )}
        </nav>
      </Container>
    </>
  );
}
