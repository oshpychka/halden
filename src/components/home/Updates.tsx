import Image from "next/image";
import Link from "next/link";
import { PostCard } from "@/components/content/PostCard";
import { ProgressBar } from "@/components/content/ProgressBar";
import { Container } from "@/components/layout/Container";
import { posts } from "@/data/posts";
import { updates } from "@/data/updates";
import { formatDate } from "@/lib/format";
import { SectionHeading } from "./SectionHeading";

export function Updates() {
  const latest = updates[0]!;
  return (
    <Container className="py-20">
      <section aria-labelledby="updates-heading">
        <SectionHeading
          id="updates-heading"
          title="On site and in the journal"
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <article className="group relative grid gap-6 rounded-3xl bg-surface p-5 shadow-card sm:grid-cols-2 lg:col-span-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={latest.photo.src}
                alt={latest.photo.alt}
                fill
                sizes="(min-width: 640px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="tabular text-sm text-muted">
                Construction update,{" "}
                <time dateTime={latest.date}>{formatDate(latest.date)}</time>
              </p>
              <h3 className="font-display text-4xl leading-tight">
                <Link
                  href={`/progress/${latest.slug}`}
                  className="after:absolute after:inset-0"
                >
                  {latest.title}
                </Link>
              </h3>
              <p className="text-muted">{latest.summary}</p>
              <div className="mt-auto pt-4">
                <ProgressBar value={latest.progress} />
              </div>
            </div>
          </article>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <PostCard
              key={post.slug}
              href={`/journal/${post.slug}`}
              title={post.title}
              summary={post.description}
              date={post.published}
              photo={post.cover}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
