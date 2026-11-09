import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

type ChoiceTileProps = {
  selected: boolean;
  onClick: () => void;
  title: string;
  note?: ReactNode;
  role?: "radio" | "checkbox";
  className?: string;
};

export function ChoiceTile({
  selected,
  onClick,
  title,
  note,
  role = "radio",
  className = "",
}: ChoiceTileProps) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onClick}
      className={`relative flex min-h-16 flex-col items-start justify-center rounded-2xl border-2 bg-surface px-4 py-3 text-left transition-all duration-200 ease-drawn ${selected ? "border-bay shadow-card" : "border-transparent shadow-card hover:border-bay/40"} ${className}`}
    >
      <span className="font-bold">{title}</span>
      {note && <span className="mt-0.5 text-sm text-muted">{note}</span>}
      {selected && (
        <span className="absolute top-2.5 right-2.5 grid size-6 place-items-center rounded-full bg-bay text-white">
          <Icon name="check" size={14} />
        </span>
      )}
    </button>
  );
}
