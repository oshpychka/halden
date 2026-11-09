import type { InputHTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
  invalid?: boolean;
};

export function Checkbox({
  label,
  invalid,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <label
      className={`group flex min-h-11 cursor-pointer items-start gap-3 text-sm ${className}`}
    >
      <span className="relative mt-0.5 flex size-5 shrink-0">
        <input
          type="checkbox"
          aria-invalid={invalid || undefined}
          className={`peer size-5 cursor-pointer appearance-none rounded-md border bg-surface transition-colors checked:border-bay checked:bg-bay ${invalid ? "border-error" : "border-line group-hover:border-ink/60"}`}
          {...props}
        />
        <Icon
          name="check"
          size={16}
          className="pointer-events-none absolute inset-0.5 text-paper opacity-0 peer-checked:opacity-100"
        />
      </span>
      <span className="leading-snug">{label}</span>
    </label>
  );
}
