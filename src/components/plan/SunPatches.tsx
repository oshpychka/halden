"use client";

import { useId } from "react";
import { lightPatches } from "@/lib/light";
import type { Layout } from "@/lib/plan";
import type { SunPosition } from "@/lib/sun";

export function SunPatches({
  layout,
  sun,
}: {
  layout: Layout;
  sun: SunPosition;
}) {
  const id = useId();
  const patches = lightPatches(layout, sun);
  return (
    <g aria-hidden="true">
      <defs>
        {patches.map((patch, index) => (
          <clipPath key={index} id={`${id}-${index}`}>
            <rect
              x={patch.clip.x}
              y={patch.clip.y}
              width={patch.clip.w}
              height={patch.clip.h}
            />
          </clipPath>
        ))}
      </defs>
      {patches.map((patch, index) => (
        <polygon
          key={index}
          points={patch.points}
          clipPath={`url(#${id}-${index})`}
          className="fill-sun/45"
        />
      ))}
    </g>
  );
}
