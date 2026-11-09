"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Select } from "@/components/ui/Select";
import { units } from "@/data/units";
import {
  applyFilters,
  defaultFilters,
  filtersQuery,
  parseFilters,
  type Filters,
  type Sort,
} from "@/lib/filters";
import { ResidenceFilters } from "./ResidenceFilters";
import { ResultsGrid } from "./ResultsGrid";

const sorts: { value: Sort; label: string }[] = [
  { value: "floor", label: "Floor, low to high" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "area", label: "Largest first" },
];

export function ResidenceList() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [panelOpen, setPanelOpen] = useState(false);
  const filters = parseFilters(params);
  const results = applyFilters(units, filters);
  const active = filtersQuery({ ...filters, sort: "floor" }) !== "";

  function update(next: Filters) {
    router.push(`${pathname}${filtersQuery(next)}`, { scroll: false });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <button
          type="button"
          aria-expanded={panelOpen}
          aria-controls="residence-filters"
          onClick={() => setPanelOpen(!panelOpen)}
          className="flex min-h-12 w-full items-center justify-between rounded-full border border-line bg-surface px-5 font-semibold lg:hidden"
        >
          Filters
          <Icon name="chevron" className={panelOpen ? "rotate-180" : ""} />
        </button>
        <div
          id="residence-filters"
          className={`${panelOpen ? "block" : "hidden"} mt-6 lg:sticky lg:top-24 lg:mt-0 lg:block`}
        >
          <ResidenceFilters filters={filters} onChange={update} />
          {active && (
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => update(defaultFilters)}
            >
              Reset filters
            </Button>
          )}
        </div>
      </div>
      <div className="lg:col-span-9">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <p className="tabular" aria-live="polite">
            {results.length === 1
              ? "1 residence"
              : `${results.length} residences`}
          </p>
          <div className="w-full sm:w-64">
            <Select
              id="sort"
              label="Sort residences"
              value={filters.sort}
              options={sorts}
              onChange={(value) => update({ ...filters, sort: value as Sort })}
            />
          </div>
        </div>
        {results.length ? (
          <ResultsGrid key={filtersQuery(filters)} units={results} />
        ) : (
          <div className="mt-8 flex flex-col items-start gap-4 rounded-3xl bg-surface p-8 shadow-card">
            <p className="font-display text-3xl">
              No residences match these filters.
            </p>
            <p className="text-muted">
              Try a wider floor range or include reserved residences. New
              residences are released as the structure rises.
            </p>
            <Button variant="secondary" onClick={() => update(defaultFilters)}>
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
