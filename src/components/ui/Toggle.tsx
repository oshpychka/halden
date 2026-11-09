type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  aside?: string;
  disabled?: boolean;
  disabledReason?: string;
};

export function Toggle({
  checked,
  onChange,
  label,
  description,
  aside,
  disabled,
  disabledReason,
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="group flex w-full items-start gap-4 py-3 text-left disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span
        className={`relative mt-0.5 h-6 w-10 shrink-0 rounded-full border transition-colors duration-200 ease-drawn ${checked ? "border-bay bg-bay" : "border-line bg-surface group-hover:border-ink/60"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-[1.125rem] rounded-full transition-transform duration-200 ease-drawn ${checked ? "translate-x-4 bg-white" : "bg-ink/50"}`}
        />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-baseline justify-between gap-3 font-medium">
          {label}
          {aside && (
            <span className="tabular shrink-0 text-sm font-normal text-muted">
              {aside}
            </span>
          )}
        </span>
        {description && (
          <span className="text-sm text-muted">{description}</span>
        )}
        {disabled && disabledReason && (
          <span className="text-sm text-reserved">{disabledReason}</span>
        )}
      </span>
    </button>
  );
}
