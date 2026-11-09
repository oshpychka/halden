import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Photo } from "@/lib/types";

type PostCardProps = {
  href: string;
  title: string;
  summary: string;
  date: string;
  photo: Photo;
  meta?: string;
};

export function PostCard({
  href,
  title,
  summary,
  date,
  photo,
  meta,
}: PostCardProps) {
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-surface">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-drawn group-hover:scale-[1.03]"
        />
      </div>
      <p className="tabular mt-4 text-sm text-muted">
        <time dateTime={date}>{formatDate(date)}</time>
        {meta && <span>, {meta}</span>}
      </p>
      <h3 className="mt-2 font-display text-3xl leading-tight">
        <Link href={href} className="after:absolute after:inset-0">
          {title}
        </Link>
      </h3>
      <p className="mt-2 text-muted">{summary}</p>
    </article>
  );
}
