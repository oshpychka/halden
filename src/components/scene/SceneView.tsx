"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/Icon";
import type { PlanSceneProps } from "./PlanScene";

const PlanScene = dynamic(() => import("./PlanScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center text-sm text-muted">
      <span className="animate-pulse">Building the model</span>
    </div>
  ),
});

function hasWebgl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const noop = () => () => {};

export function SceneView(props: PlanSceneProps) {
  const supported = useSyncExternalStore(noop, hasWebgl, () => true);
  const [version, setVersion] = useState(0);

  if (!supported) {
    return (
      <div className="grid aspect-[4/3] place-items-center rounded-2xl bg-paper p-6 text-center text-muted">
        3D needs WebGL, which this browser has turned off. The plan view shows
        the same layout.
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] touch-none overflow-hidden">
      <PlanScene key={version} {...props} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-3">
        <p className="rounded-full bg-paper/90 px-3 py-1 text-xs text-muted">
          Drag to turn, pinch or scroll to zoom
        </p>
        <button
          type="button"
          onClick={() => setVersion(version + 1)}
          className="pointer-events-auto inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium shadow-card hover:border-ink/40"
        >
          <Icon name="rotate" size={18} />
          Reset view
        </button>
      </div>
    </div>
  );
}
