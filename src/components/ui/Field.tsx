import type { ReactNode } from "react";

type FieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-baseline justify-between gap-3 text-sm font-medium"
      >
        {label}
        {optional && (
          <span className="text-xs font-normal text-muted">Optional</span>
        )}
      </label>
      {children}
      <p
        id={`${id}-message`}
        className={`min-h-5 text-sm ${error ? "text-error" : "text-muted"}`}
        aria-live="polite"
      >
        {error ?? hint ?? ""}
      </p>
    </div>
  );
}

export function controlClass(invalid?: boolean) {
  return `w-full min-h-12 rounded-xl border bg-surface px-4 text-base text-ink placeholder:text-muted/70 transition-colors duration-200 ease-drawn hover:border-ink/40 focus-visible:border-bay ${invalid ? "border-error" : "border-line"}`;
}
