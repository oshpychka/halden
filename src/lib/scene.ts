import { deriveWalls, glazing, type Layout } from "./plan";

export const WALL_HEIGHT = 8.5;
const SILL = 0.3;
const HEAD = 8;
const DOOR_HEAD = 7;

export type Box = {
  x: number;
  z: number;
  width: number;
  depth: number;
  bottom: number;
  top: number;
};

function box(
  horizontal: boolean,
  at: number,
  from: number,
  to: number,
  thickness: number,
  bottom: number,
  top: number,
): Box {
  const mid = (from + to) / 2;
  const length = to - from;
  return horizontal
    ? { x: mid, z: at, width: length, depth: thickness, bottom, top }
    : { x: at, z: mid, width: thickness, depth: length, bottom, top };
}

export function sceneBoxes(layout: Layout) {
  const solid: Box[] = [];
  const glass: Box[] = [];
  const panes = glazing(layout);

  for (const wall of deriveWalls(layout)) {
    const horizontal = wall.y1 === wall.y2;
    const at = horizontal ? wall.y1 : wall.x1;
    const start = horizontal ? wall.x1 : wall.y1;
    const end = horizontal ? wall.x2 : wall.y2;
    const thickness = wall.exterior ? 0.7 : 0.4;
    const openings = wall.exterior
      ? panes
          .filter((pane) =>
            horizontal
              ? pane.y1 === at && pane.y2 === at
              : pane.x1 === at && pane.x2 === at,
          )
          .map((pane) => (horizontal ? [pane.x1, pane.x2] : [pane.y1, pane.y2]))
          .map(([a, b]) => [Math.max(start, a!), Math.min(end, b!)] as const)
          .filter(([a, b]) => b > a)
          .sort((a, b) => a[0] - b[0])
      : [];

    let cursor = start;
    for (const [from, to] of openings) {
      if (from > cursor)
        solid.push(
          box(horizontal, at, cursor, from, thickness, 0, WALL_HEIGHT),
        );
      solid.push(box(horizontal, at, from, to, thickness, 0, SILL));
      solid.push(box(horizontal, at, from, to, thickness, HEAD, WALL_HEIGHT));
      glass.push(box(horizontal, at, from, to, 0.08, SILL, HEAD));
      cursor = Math.max(cursor, to);
    }
    if (end > cursor)
      solid.push(box(horizontal, at, cursor, end, thickness, 0, WALL_HEIGHT));
  }

  for (const door of layout.doors) {
    const horizontal = door.axis === "y";
    const thickness = door.id === "entry" ? 0.7 : 0.4;
    solid.push(
      box(
        horizontal,
        door.at,
        door.from,
        door.to,
        thickness,
        DOOR_HEAD,
        WALL_HEIGHT,
      ),
    );
  }

  return { solid, glass };
}
