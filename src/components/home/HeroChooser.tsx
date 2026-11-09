"use client";

import { useState } from "react";
import { ModeSwitch } from "@/components/builder/ModeSwitch";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ToggleChip } from "@/components/ui/ToggleChip";
import { PENTHOUSE, SHELLS, type Mode } from "@/lib/builder";

const bedrooms = [
  { value: 0, label: "Studio" },
  { value: 1, label: "1 bed" },
  { value: 2, label: "2 beds" },
  { value: 3, label: "3 beds" },
  { value: PENTHOUSE, label: "Penthouse" },
];

export function HeroChooser() {
  const [mode, setMode] = useState<Mode>("guided");
  const [beds, setBeds] = useState<number | null>(2);
  const [shell, setShell] = useState(SHELLS[1]!.id);

  const href =
    mode === "guided"
      ? `/build?mode=guided&step=${beds === null ? 1 : 2}${beds === null ? "" : `&beds=${beds}`}`
      : `/build?mode=custom&step=2&p=${shell}`;

  return (
    <div className="grid gap-5 rounded-3xl bg-surface p-4 shadow-lift sm:p-6">
      <p className="text-lg font-bold">How do you want to start?</p>
      <ModeSwitch value={mode} onChange={setMode} />
      {mode === "guided" ? (
        <fieldset>
          <legend className="mb-3 text-sm font-semibold">
            How many bedrooms?
          </legend>
          <div className="flex flex-wrap gap-2">
            {bedrooms.map((item) => (
              <ToggleChip
                key={item.value}
                pressed={beds === item.value}
                onClick={() => setBeds(beds === item.value ? null : item.value)}
              >
                {item.label}
              </ToggleChip>
            ))}
          </div>
        </fieldset>
      ) : (
        <fieldset>
          <legend className="mb-3 text-sm font-semibold">How big?</legend>
          <div className="flex flex-wrap gap-2">
            {SHELLS.map((item) => (
              <ToggleChip
                key={item.id}
                pressed={shell === item.id}
                onClick={() => setShell(item.id)}
              >
                {item.label}
              </ToggleChip>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted">
            {SHELLS.find((item) => item.id === shell)?.note}
          </p>
        </fieldset>
      )}
      <ButtonLink href={href} variant="accent" size="lg" className="w-full">
        {mode === "guided" ? "Show my residences" : "Start designing"}
        <Icon name="arrow" size={20} />
      </ButtonLink>
    </div>
  );
}
