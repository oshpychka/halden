"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Unit } from "@/lib/types";
import { UnitCard } from "./UnitCard";

const PAGE = 12;

export function ResultsGrid({ units }: { units: Unit[] }) {
  const [limit, setLimit] = useState(PAGE);
  const shown = units.slice(0, limit);
  const rest = units.length - shown.length;
  return (
    <>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((unit) => (
          <UnitCard key={unit.slug} unit={unit} />
        ))}
      </div>
      {rest > 0 && (
        <Button
          variant="secondary"
          className="mt-10 w-full sm:w-auto"
          onClick={() => setLimit(limit + PAGE)}
        >
          Show {Math.min(PAGE, rest)} more of {rest}
        </Button>
      )}
    </>
  );
}
