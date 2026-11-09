import { finishes } from "@/data/finishes";
import { formatPrice } from "@/lib/format";

type FinishPickerProps = {
  value: string;
  area: number;
  onChange: (id: string) => void;
};

export function FinishPicker({ value, area, onChange }: FinishPickerProps) {
  return (
    <div role="radiogroup" aria-label="Finish package" className="grid gap-2">
      {finishes.map((finish) => {
        const active = finish.id === value;
        return (
          <button
            key={finish.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(finish.id)}
            className={`flex items-start gap-3 rounded-xl border-2 p-3 text-left transition-colors duration-200 ease-drawn ${active ? "border-bay bg-surface shadow-card" : "border-transparent bg-paper hover:border-bay/40"}`}
          >
            <span
              aria-hidden="true"
              className="mt-0.5 flex shrink-0 overflow-hidden rounded-lg border border-line"
            >
              {[finish.floor, finish.cabinetry, finish.stone].map((color) => (
                <span
                  key={color}
                  className="block h-8 w-3"
                  style={{ background: color }}
                />
              ))}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="flex items-baseline justify-between gap-3 font-medium">
                {finish.label}
                <span className="tabular shrink-0 text-sm font-normal text-muted">
                  {finish.pricePerSqft
                    ? `+${formatPrice(finish.pricePerSqft * area)}`
                    : "Included"}
                </span>
              </span>
              <span className="text-sm text-muted">{finish.description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
