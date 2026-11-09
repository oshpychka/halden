import { describe, expect, it } from "vitest";
import { plans } from "@/data/plans";
import {
  buildLayout,
  deriveWalls,
  isOpen,
  layoutStats,
  roomAt,
  type Layout,
} from "./plan";
import type { Door, Plan, Room } from "./types";

function optionSets(plan: Plan): string[][] {
  const ids = plan.options.map((option) => option.id);
  return ids.reduce<string[][]>(
    (sets, id) => [...sets, ...sets.map((set) => [...set, id])],
    [[]],
  );
}

function overlaps(a: Room, b: Room): boolean {
  return (
    a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h
  );
}

function doorSides(
  layout: Layout,
  item: Door,
): [Room | undefined, Room | undefined] {
  const mid = (item.from + item.to) / 2;
  const e = 0.01;
  return item.axis === "x"
    ? [
        roomAt(layout.rooms, item.at - e, mid),
        roomAt(layout.rooms, item.at + e, mid),
      ]
    : [
        roomAt(layout.rooms, mid, item.at - e),
        roomAt(layout.rooms, mid, item.at + e),
      ];
}

function sharesEdge(a: Room, b: Room): boolean {
  const vertical =
    (a.x + a.w === b.x || b.x + b.w === a.x) &&
    Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) > 0;
  const horizontal =
    (a.y + a.h === b.y || b.y + b.h === a.y) &&
    Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) > 0;
  return vertical || horizontal;
}

function reachable(layout: Layout): Set<string> {
  const entry = layout.doors.find((item) => item.id === "entry");
  const start = entry ? doorSides(layout, entry).find(Boolean) : undefined;
  const seen = new Set<string>(start ? [start.id] : []);
  const queue = start ? [start] : [];
  while (queue.length) {
    const current = queue.shift()!;
    const neighbours = layout.rooms.filter((other) => {
      if (seen.has(other.id) || !sharesEdge(current, other)) return false;
      if (isOpen(current) && isOpen(other)) return true;
      return layout.doors.some((item) => {
        const sides = doorSides(layout, item);
        return sides.includes(current) && sides.includes(other);
      });
    });
    for (const room of neighbours) {
      seen.add(room.id);
      queue.push(room);
    }
  }
  return seen;
}

describe.each(plans)("$name", (plan) => {
  it.each(optionSets(plan))("tiles the envelope with options %j", (...ids) => {
    const layout = buildLayout(plan, ids);
    for (const room of layout.rooms) {
      expect(room.x).toBeGreaterThanOrEqual(0);
      expect(room.y).toBeGreaterThanOrEqual(0);
      expect(room.x + room.w).toBeLessThanOrEqual(plan.width);
      expect(room.y + room.h).toBeLessThanOrEqual(plan.depth);
    }
    layout.rooms.forEach((a, index) =>
      layout.rooms
        .slice(index + 1)
        .forEach((b) =>
          expect(overlaps(a, b), `${a.id} / ${b.id}`).toBe(false),
        ),
    );
    expect(layoutStats(layout).area).toBe(plan.width * plan.depth);
  });

  it.each(optionSets(plan))(
    "has valid doors and reachable rooms with options %j",
    (...ids) => {
      const layout = buildLayout(plan, ids);
      for (const item of layout.doors) {
        const [before, after] = doorSides(layout, item);
        if (item.id === "entry") {
          expect(Boolean(before) !== Boolean(after), item.id).toBe(true);
        } else {
          expect(before && after && before !== after, item.id).toBe(true);
          expect(isOpen(before!) && isOpen(after!), item.id).toBe(false);
        }
      }
      const seen = reachable(layout);
      expect(
        layout.rooms
          .filter((room) => !seen.has(room.id))
          .map((room) => room.id),
      ).toEqual([]);
    },
  );

  it("keeps windows on exterior walls and the mirrored layout consistent", () => {
    const mirrored = buildLayout(plan, [], true);
    expect(layoutStats(mirrored).area).toBe(plan.width * plan.depth);
    const walls = deriveWalls(buildLayout(plan));
    expect(walls.some((wall) => wall.exterior)).toBe(true);
    for (const span of plan.windows) {
      const limit = span.side === "front" ? plan.width : plan.depth;
      expect(span.from).toBeGreaterThanOrEqual(0);
      expect(span.to).toBeLessThanOrEqual(limit);
    }
  });
});
