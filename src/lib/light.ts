import { glazing, roomAt, type Layout } from "./plan";
import { facesSun, type SunPosition } from "./sun";
import type { Rect } from "./types";

const WINDOW_HEAD = 9;
const MAX_REACH = 40;

export type LightPatch = { points: string; clip: Rect };

export function lightPatches(layout: Layout, sun: SunPosition): LightPatch[] {
  if (sun.altitude <= 2) return [];
  const az = (sun.azimuth * Math.PI) / 180;
  const reach = Math.min(
    MAX_REACH,
    WINDOW_HEAD / Math.tan((sun.altitude * Math.PI) / 180),
  );
  const dx = Math.cos(az) * reach;
  const dy = Math.sin(az) * reach;
  const panes = glazing(layout);

  return layout.windows.flatMap((span, index) => {
    if (!facesSun(span.side, sun)) return [];
    const pane = panes[index]!;
    const inward =
      span.side === "front"
        ? [0, 0.1]
        : span.side === "left"
          ? [0.1, 0]
          : [-0.1, 0];
    const mx = (pane.x1 + pane.x2) / 2 + inward[0]!;
    const my = (pane.y1 + pane.y2) / 2 + inward[1]!;
    const room = roomAt(layout.rooms, mx, my);
    if (!room) return [];
    const points = [
      [pane.x1, pane.y1],
      [pane.x2, pane.y2],
      [pane.x2 + dx, pane.y2 + dy],
      [pane.x1 + dx, pane.y1 + dy],
    ]
      .map(([x, y]) => `${x!.toFixed(2)},${y!.toFixed(2)}`)
      .join(" ");
    return [{ points, clip: { x: room.x, y: room.y, w: room.w, h: room.h } }];
  });
}
