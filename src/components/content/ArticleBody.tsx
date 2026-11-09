import { slugify } from "@/lib/content";
import type { Block } from "@/lib/types";

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex max-w-[68ch] flex-col gap-5 text-[1.0625rem] leading-[1.7]">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              id={slugify(block.text)}
              className="mt-6 scroll-mt-24 font-display text-4xl leading-tight"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "list") {
          return (
            <ul
              key={index}
              className="flex flex-col gap-2 border-l border-line pl-5"
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="my-4 rounded-2xl bg-sand/70 px-6 py-6 text-2xl leading-snug font-semibold"
            >
              {block.text}
            </blockquote>
          );
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
