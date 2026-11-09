import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { controlClass } from "./Field";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  invalid?: boolean;
};

export function Input({ id, invalid, className = "", ...props }: InputProps) {
  return (
    <input
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={`${id}-message`}
      className={`${controlClass(invalid)} ${className}`}
      {...props}
    />
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  invalid?: boolean;
};

export function Textarea({
  id,
  invalid,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <textarea
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={`${id}-message`}
      className={`${controlClass(invalid)} min-h-28 resize-none py-3 ${className}`}
      {...props}
    />
  );
}
