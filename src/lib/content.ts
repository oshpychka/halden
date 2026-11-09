import type { Block } from "./types";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function headings(blocks: Block[]) {
  return blocks
    .filter((block) => block.type === "h2")
    .map((block) => ({ id: slugify(block.text), text: block.text }));
}

export function readingMinutes(blocks: Block[]): number {
  const words = blocks
    .map((block) => ("items" in block ? block.items.join(" ") : block.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}
