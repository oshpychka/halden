import type { ReactNode } from "react";

type ToggleChipProps = {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function ToggleChip({ pressed, onClick, children }: ToggleChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`min-h-11 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ease-drawn ${pressed ? "border-bay bg-bay text-white" : "border-line bg-surface hover:border-ink/60"}`}
    >
      {children}
    </button>
  );
}
