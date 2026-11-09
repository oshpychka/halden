import { palette } from "./palette";
import { deriveWalls, glazing, type Layout } from "./plan";
import type { Rect } from "./types";

function dataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function planDrawing(layout: Layout, terrace?: Rect): string {
  const top = terrace ? -terrace.h - 1 : -1;
  const lines = deriveWalls(layout)
    .map(
      (wall) =>
        `<line x1="${wall.x1}" y1="${wall.y1}" x2="${wall.x2}" y2="${wall.y2}" stroke="${palette.ink}" stroke-width="${wall.exterior ? 0.8 : 0.45}" stroke-linecap="square"/>`,
    )
    .join("");
  const panes = glazing(layout)
    .map(
      (pane) =>
        `<line x1="${pane.x1}" y1="${pane.y1}" x2="${pane.x2}" y2="${pane.y2}" stroke="${palette.bay}" stroke-width="0.8"/>`,
    )
    .join("");
  const deck = terrace
    ? `<rect x="${terrace.x}" y="${terrace.y}" width="${terrace.w}" height="${terrace.h}" fill="${palette.bayTint}" stroke="${palette.ink}" stroke-width="0.15" stroke-dasharray="0.6 0.4"/>`
    : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 ${top} ${layout.width + 2} ${layout.depth - top + 1}"><rect x="0" y="0" width="${layout.width}" height="${layout.depth}" fill="${palette.surface}"/>${deck}${lines}${panes}</svg>`;
  return dataUri(svg);
}

export function facadeDrawing(highlight?: number): string {
  const floors = 20;
  const height = 4;
  const rows = Array.from({ length: floors }, (_, index) => {
    const floor = index + 1;
    const y = 90 - floor * height;
    const bays = floor === 20 ? 2 : floor > 3 ? 5 : 0;
    const width = 40 / Math.max(1, bays);
    const fill =
      floor === highlight
        ? `<rect x="10" y="${y}" width="40" height="${height}" fill="${palette.bayTint}" stroke="${palette.bay}" stroke-width="0.4"/>`
        : "";
    const windows = Array.from(
      { length: bays },
      (__, bay) =>
        `<rect x="${10 + bay * width + width * 0.1}" y="${y + 0.7}" width="${width * 0.8}" height="${height - 1.4}" fill="none" stroke="${palette.ink}" stroke-width="0.15"/>`,
    ).join("");
    return `${fill}<line x1="10" y1="${y}" x2="50" y2="${y}" stroke="${palette.ink}" stroke-width="0.2"/>${windows}`;
  }).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 92"><rect x="10" y="10" width="40" height="80" fill="${palette.surface}" stroke="${palette.ink}" stroke-width="0.4"/>${rows}<path d="M14 10 V6 H46 V10" fill="none" stroke="${palette.ink}" stroke-width="0.3"/><line x1="0" y1="90" x2="60" y2="90" stroke="${palette.ink}" stroke-width="0.5"/></svg>`;
  return dataUri(svg);
}
