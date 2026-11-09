"use client";

import { RequestButton } from "@/components/forms/RequestButton";
import { PlanSvg } from "@/components/plan/PlanSvg";
import { StudioSummary } from "@/components/studio/StudioSummary";
import { PrintButton } from "@/components/ui/PrintButton";
import { ShareButton } from "@/components/ui/ShareButton";
import { SHELLS } from "@/lib/builder";
import { layoutStats } from "@/lib/plan";
import { studioLayout } from "@/lib/studio";
import type { Plan, Room } from "@/lib/types";

export function CustomSummaryStep({
  plan,
  rooms,
}: {
  plan: Plan;
  rooms: Room[];
}) {
  const layout = studioLayout(plan, rooms);
  const stats = layoutStats(layout);
  const size = SHELLS.find((item) => item.id === plan.slug)?.label ?? plan.name;
  const description = `${size} shell, ${stats.bedrooms} bedrooms, ${stats.bathrooms} baths, own layout`;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="rounded-2xl bg-surface p-4 shadow-card sm:p-6 lg:col-span-7">
        <PlanSvg layout={layout} title="Your layout" />
      </div>
      <div className="flex flex-col gap-5 lg:col-span-5">
        <div>
          <p className="text-sm text-muted">{size} shell</p>
          <h3 className="text-3xl">Your own layout</h3>
          <p className="mt-2 text-muted">
            Our architects turn this sketch into a buildable plan with doors,
            plumbing and finishes, and price it for you.
          </p>
        </div>
        <div className="rounded-2xl bg-surface p-5 shadow-card">
          <StudioSummary plan={plan} rooms={rooms} />
        </div>
        <div className="flex flex-col gap-3 print:hidden">
          <RequestButton
            title="Discuss your layout"
            configuration={description}
            variant="accent"
            className="min-h-14"
          >
            Send this layout to an architect
          </RequestButton>
          <div className="flex gap-3">
            <ShareButton title="My layout at The Halden" className="flex-1" />
            <PrintButton />
          </div>
        </div>
      </div>
    </div>
  );
}
