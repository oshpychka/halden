import { Icon } from "@/components/ui/Icon";

type StepProgressProps = {
  steps: string[];
  current: number;
  onJump: (step: number) => void;
  reachable: (step: number) => boolean;
};

export function StepProgress({
  steps,
  current,
  onJump,
  reachable,
}: StepProgressProps) {
  return (
    <ol className="flex items-center gap-2" aria-label="Steps">
      {steps.map((label, index) => {
        const step = index + 1;
        const done = step < current;
        const active = step === current;
        return (
          <li key={label} className="flex min-w-0 flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => onJump(step)}
              disabled={!reachable(step)}
              aria-current={active ? "step" : undefined}
              className="flex min-h-11 min-w-0 items-center gap-2 rounded-full pr-2 text-left disabled:cursor-default"
            >
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors ${active ? "bg-bay text-white" : done ? "bg-bay-tint text-bay" : "bg-surface text-muted ring-1 ring-line"}`}
              >
                {done ? <Icon name="check" size={16} /> : step}
              </span>
              <span
                className={`truncate text-sm font-medium max-md:sr-only ${active ? "text-ink" : "text-muted"}`}
              >
                {label}
              </span>
            </button>
            {step < steps.length && (
              <span
                aria-hidden="true"
                className={`h-0.5 min-w-3 flex-1 rounded-full ${done ? "bg-bay" : "bg-line"}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
