"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { controlClass } from "./Field";
import { Icon } from "./Icon";

type SelectProps = {
  id: string;
  name?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  label?: string;
};

export function Select({
  id,
  name,
  value,
  options,
  onChange,
  placeholder = "Select",
  invalid,
  label,
}: SelectProps) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  function openList() {
    setActive(
      Math.max(
        0,
        options.findIndex((option) => option.value === value),
      ),
    );
    setOpen(true);
  }

  function choose(index: number) {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
  }

  function onKeyDown(event: KeyboardEvent) {
    const last = options.length - 1;
    const moves: Record<string, () => void> = {
      ArrowDown: () =>
        open ? setActive((index) => Math.min(last, index + 1)) : openList(),
      ArrowUp: () =>
        open ? setActive((index) => Math.max(0, index - 1)) : openList(),
      Home: () => setActive(0),
      End: () => setActive(last),
      Enter: () => (open ? choose(active) : openList()),
      " ": () => (open ? choose(active) : openList()),
      Escape: () => setOpen(false),
    };
    const move = moves[event.key];
    if (move) {
      event.preventDefault();
      move();
    }
  }

  return (
    <div ref={root} className="relative">
      {name && <input type="hidden" name={name} value={value} />}
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={invalid || undefined}
        aria-label={label}
        aria-describedby={label ? undefined : `${id}-message`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`${controlClass(invalid)} flex items-center justify-between gap-3 text-left`}
      >
        <span className={`truncate ${selected ? "" : "text-muted/70"}`}>
          {selected?.label ?? placeholder}
        </span>
        <Icon
          name="chevron"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-64 overflow-auto rounded-xl border border-line bg-surface py-1 shadow-lift"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={option.value === value}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
              onPointerEnter={() => setActive(index)}
              className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 px-4 ${index === active ? "bg-bay-tint/60" : ""}`}
            >
              {option.label}
              {option.value === value && (
                <Icon name="check" size={18} className="text-bay" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
