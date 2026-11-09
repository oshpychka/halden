import { Toggle } from "@/components/ui/Toggle";
import { formatPrice } from "@/lib/format";
import type { Plan } from "@/lib/types";

type OptionListProps = {
  plan: Plan;
  selected: string[];
  onToggle: (id: string, on: boolean) => void;
};

export function OptionList({ plan, selected, onToggle }: OptionListProps) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {plan.options.map((option) => {
        const blocker = plan.options.find(
          (other) =>
            selected.includes(other.id) && other.excludes?.includes(option.id),
        );
        return (
          <li key={option.id}>
            <Toggle
              checked={selected.includes(option.id)}
              onChange={(on) => onToggle(option.id, on)}
              label={option.label}
              description={option.description}
              aside={
                option.price ? `+${formatPrice(option.price)}` : "No charge"
              }
              disabled={Boolean(blocker)}
              disabledReason={
                blocker
                  ? `Not available with ${blocker.label.toLowerCase()}.`
                  : undefined
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
