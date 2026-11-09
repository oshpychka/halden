import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type StepNavProps = {
  step: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
  nextDisabled: boolean;
  disabledHint: string;
  nextLabel?: string;
};

export function StepNav({
  step,
  total,
  onBack,
  onNext,
  nextDisabled,
  disabledHint,
  nextLabel,
}: StepNavProps) {
  return (
    <div className="sticky bottom-0 z-30 -mx-4 mt-10 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-2xl sm:border sm:px-4 print:hidden">
      <div className="flex items-center justify-between gap-3">
        {step > 1 ? (
          <Button variant="secondary" onClick={onBack}>
            <Icon name="back" size={18} />
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < total && (
          <div className="flex items-center gap-3">
            {nextDisabled && (
              <span className="text-sm text-muted max-sm:hidden">
                {disabledHint}
              </span>
            )}
            <Button
              variant="accent"
              size="lg"
              onClick={onNext}
              disabled={nextDisabled}
            >
              <span>
                Next
                {nextLabel && (
                  <span className="max-sm:hidden">: {nextLabel}</span>
                )}
              </span>
              <Icon name="arrow" size={18} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
