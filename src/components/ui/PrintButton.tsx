"use client";

import { Icon } from "./Icon";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      aria-label="Print this residence"
      className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-surface hover:border-ink/40"
    >
      <Icon name="print" />
    </button>
  );
}
