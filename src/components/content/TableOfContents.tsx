import { headings } from "@/lib/content";
import type { Block } from "@/lib/types";

export function TableOfContents({ blocks }: { blocks: Block[] }) {
  const items = headings(blocks);
  if (!items.length) return null;
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="text-muted">On this page</p>
      <ol className="mt-3 flex flex-col border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="-ml-px inline-flex min-h-11 items-center border-l border-transparent pl-4 hover:border-ink"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
