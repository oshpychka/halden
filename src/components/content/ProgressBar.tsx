export function ProgressBar({ value }: { value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted">Overall progress</span>
        <span className="tabular font-display text-4xl">{value}%</span>
      </div>
      <div
        role="progressbar"
        aria-label="Overall construction progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className="mt-2 h-3 overflow-hidden rounded-full bg-line"
      >
        <div
          className="h-full rounded-full bg-bay"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
