"use client";

import { useState } from "react";
import { Segmented } from "@/components/ui/Segmented";
import type { FacadeMode } from "@/lib/facade";
import { Facade } from "./Facade";
import { FacadeLegend } from "./FacadeLegend";
import { FloorPanel } from "./FloorPanel";

const modes: { value: FacadeMode; label: string }[] = [
  { value: "floors", label: "Floors" },
  { value: "status", label: "Status" },
  { value: "price", label: "Price" },
  { value: "view", label: "View" },
];

export function ResidenceFinder({
  initialFloor = 14,
}: {
  initialFloor?: number;
}) {
  const [floor, setFloor] = useState(initialFloor);
  const [mode, setMode] = useState<FacadeMode>("floors");
  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-8 lg:gap-12">
      <div className="flex flex-col gap-4">
        <Segmented
          label="Show on the building"
          value={mode}
          options={modes}
          onChange={setMode}
          className="w-full"
        />
        <Facade floor={floor} mode={mode} onSelect={setFloor} />
        <p className="text-xs text-muted">East elevation, seen from the bay.</p>
        <FacadeLegend mode={mode} />
      </div>
      <FloorPanel floor={floor} />
    </div>
  );
}
