import type { Post } from "@/lib/types";
import { deposits } from "./deposits";
import { eastLight } from "./east-light";
import { edgewater } from "./edgewater";
import { finishesCompared } from "./finishes";
import { floorPlans } from "./floor-plans";
import { layoutOptions } from "./layout-options";

export const posts: Post[] = [
  deposits,
  floorPlans,
  layoutOptions,
  eastLight,
  edgewater,
  finishesCompared,
].sort((a, b) => b.published.localeCompare(a.published));

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
