"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { useShortlist } from "@/hooks/useShortlist";

export function ShortlistLink() {
  const { list } = useShortlist();
  if (!list.length) return null;
  return (
    <Link
      href="/compare"
      aria-label={`Saved residences, ${list.length}`}
      className="tabular inline-flex min-h-11 items-center gap-1.5 px-2 text-sm hover:text-bay"
    >
      <Icon name="heart" size={18} className="fill-bay text-bay" />
      {list.length}
    </Link>
  );
}
