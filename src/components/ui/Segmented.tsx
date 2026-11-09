type SegmentedProps<T extends string> = {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  className?: string;
};

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  className = "",
}: SegmentedProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`inline-flex rounded-full border border-line bg-surface p-1 ${className}`}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={`min-h-10 flex-1 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ease-drawn ${active ? "bg-bay text-white" : "text-ink hover:bg-paper"}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
