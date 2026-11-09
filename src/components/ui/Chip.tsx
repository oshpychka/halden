import type { UnitStatus } from "@/lib/types";

const labels: Record<UnitStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
};

const swatches: Record<UnitStatus, string> = {
  available:
    "border-bay bg-[repeating-linear-gradient(45deg,var(--color-bay)_0_1px,transparent_1px_4px)]",
  reserved:
    "border-reserved bg-[repeating-linear-gradient(45deg,var(--color-reserved)_0_1px,transparent_1px_6px)]",
  sold: "border-muted bg-[repeating-linear-gradient(45deg,var(--color-muted)_0_1px,transparent_1px_2.5px)]",
};

export function StatusChip({ status }: { status: UnitStatus }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm whitespace-nowrap">
      <span
        aria-hidden="true"
        className={`size-3 border ${swatches[status]}`}
      />
      {labels[status]}
    </span>
  );
}

export function statusLabel(status: UnitStatus) {
  return labels[status];
}
