import { getPost, posts } from "@/data/posts";
import { facadeDrawing } from "@/lib/og-drawings";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "An article from The Halden journal";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug)!;
  return ogImage({
    eyebrow: "Journal",
    title: post.title,
    subtitle: post.author.name,
    drawing: facadeDrawing(),
    tall: true,
  });
}
