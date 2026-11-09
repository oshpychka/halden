import { statusLabel } from "@/components/ui/Chip";
import { priceBands, type FacadeMode } from "@/lib/facade";
import type { UnitStatus, View } from "@/lib/types";
import { viewLabel } from "@/lib/units";
import { priceFill, statusFill, viewFill } from "./FacadeCells";

const statuses: UnitStatus[] = ["available", "reserved", "sold"];
const views: View[] = ["bay", "bay-park", "bay-skyline"];

function legendItems(mode: Exclude<FacadeMode, "floors">) {
  if (mode === "status") {
    return statuses.map((status) => ({
      label: statusLabel(status),
      fill: statusFill[status],
    }));
  }
  if (mode === "view") {
    return views.map((view) => ({
      label: viewLabel(view),
      fill: viewFill[view],
    }));
  }
  return priceBands().map((band, index) => ({
    label: `$${band.from.toLocaleString("en-US")}`,
    fill: priceFill(index),
  }));
}

export function FacadeLegend({ mode }: { mode: FacadeMode }) {
  if (mode === "floors") return null;
  return (
    <div className="tabular text-xs text-muted">
      {mode === "price" && <p className="mb-1">Price per sq ft, from</p>}
      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        {legendItems(mode).map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="size-4 shrink-0 rounded border border-line"
              style={{ backgroundImage: item.fill }}
            />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
