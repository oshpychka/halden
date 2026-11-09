"use client";

import type { ReactNode } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Segmented } from "@/components/ui/Segmented";
import { Select } from "@/components/ui/Select";
import { ToggleChip } from "@/components/ui/ToggleChip";
import { FLOOR_MAX, FLOOR_MIN, type Filters } from "@/lib/filters";
import type { UnitStatus, View } from "@/lib/types";
import { viewLabel } from "@/lib/units";

type ResidenceFiltersProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

const bedroomOptions = [
  { value: 0, label: "Studio" },
  { value: 1, label: "1 bed" },
  { value: 2, label: "2 bed" },
  { value: 3, label: "3+ bed" },
];

const bathOptions = [
  { value: "0", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
];

const views: View[] = ["bay", "bay-park", "bay-skyline"];
const statuses: UnitStatus[] = ["available", "reserved", "sold"];

const floors = Array.from({ length: FLOOR_MAX - FLOOR_MIN + 1 }, (_, index) => {
  const value = String(FLOOR_MIN + index);
  return {
    value,
    label: value === String(FLOOR_MAX) ? "20 (penthouses)" : value,
  };
});

const prices = [
  { value: "0", label: "Any price" },
  { value: "1000000", label: "Up to $1M" },
  { value: "1500000", label: "Up to $1.5M" },
  { value: "2000000", label: "Up to $2M" },
  { value: "3000000", label: "Up to $3M" },
];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      {children}
    </fieldset>
  );
}

export function ResidenceFilters({ filters, onChange }: ResidenceFiltersProps) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <div className="grid gap-6">
      <Group label="Bedrooms">
        <div className="flex flex-wrap gap-2">
          {bedroomOptions.map((option) => (
            <ToggleChip
              key={option.value}
              pressed={filters.bedrooms.includes(option.value)}
              onClick={() =>
                set({ bedrooms: toggle(filters.bedrooms, option.value) })
              }
            >
              {option.label}
            </ToggleChip>
          ))}
        </div>
      </Group>
      <Group label="Bathrooms">
        <Segmented
          label="Bathrooms"
          value={String(filters.bathrooms)}
          options={bathOptions}
          onChange={(value) => set({ bathrooms: Number(value) })}
          className="w-full"
        />
      </Group>
      <Group label="View">
        <div className="flex flex-wrap gap-2">
          {views.map((view) => (
            <ToggleChip
              key={view}
              pressed={filters.views.includes(view)}
              onClick={() => set({ views: toggle(filters.views, view) })}
            >
              {viewLabel(view)}
            </ToggleChip>
          ))}
        </div>
      </Group>
      <Group label="Floors">
        <div className="grid grid-cols-2 gap-3">
          <Select
            id="floor-min"
            label="From floor"
            value={String(filters.floorMin)}
            options={floors}
            onChange={(value) =>
              set({
                floorMin: Number(value),
                floorMax: Math.max(Number(value), filters.floorMax),
              })
            }
          />
          <Select
            id="floor-max"
            label="To floor"
            value={String(filters.floorMax)}
            options={floors}
            onChange={(value) =>
              set({
                floorMax: Number(value),
                floorMin: Math.min(Number(value), filters.floorMin),
              })
            }
          />
        </div>
      </Group>
      <Group label="Price">
        <Select
          id="price-max"
          label="Maximum price"
          value={String(filters.priceMax)}
          options={prices}
          onChange={(value) => set({ priceMax: Number(value) })}
        />
      </Group>
      <Checkbox
        label="With a terrace"
        checked={filters.balcony}
        onChange={(event) => set({ balcony: event.target.checked })}
      />
      <Group label="Status">
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <ToggleChip
              key={status}
              pressed={filters.status.includes(status)}
              onClick={() => set({ status: toggle(filters.status, status) })}
            >
              {status[0]!.toUpperCase() + status.slice(1)}
            </ToggleChip>
          ))}
        </div>
      </Group>
    </div>
  );
}
