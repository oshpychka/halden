import { describe, expect, it } from "vitest";
import { getPlan } from "@/data/plans";
import {
  canPlace,
  decodeStudio,
  encodeStudio,
  findSpot,
  labelRooms,
  studioHints,
} from "./studio";
import type { Room } from "./types";

const plan = getPlan("the-causeway")!;

function room(
  type: Room["type"],
  x: number,
  y: number,
  w: number,
  h: number,
): Room {
  return { id: "", label: "", type, x, y, w, h };
}

describe("studio placement", () => {
  const rooms = labelRooms([room("living", 0, 0, 16, 15)]);

  it("rejects overlaps, rooms outside the shell and slivers", () => {
    expect(canPlace({ x: 10, y: 5, w: 8, h: 8 }, rooms, plan)).toBe(false);
    expect(canPlace({ x: 16, y: 0, w: 8, h: 8 }, rooms, plan)).toBe(true);
    expect(canPlace({ x: 36, y: 0, w: 8, h: 8 }, rooms, plan)).toBe(false);
    expect(canPlace({ x: 20, y: 20, w: 2, h: 8 }, rooms, plan)).toBe(false);
    expect(
      canPlace({ x: 2, y: 2, w: 8, h: 8 }, rooms, plan, rooms[0]!.id),
    ).toBe(true);
  });

  it("finds the first free spot and rotates when needed", () => {
    expect(findSpot(8, 8, rooms, plan)).toEqual({ x: 16, y: 0, w: 8, h: 8 });
    const full = [room("living", 0, 0, 40, 28)];
    expect(findSpot(3, 6, full, plan)).toEqual({ x: 0, y: 28, w: 6, h: 3 });
    expect(findSpot(10, 10, full, plan)).toBeNull();
  });

  it("numbers repeated rooms", () => {
    const labelled = labelRooms([
      room("bedroom", 0, 0, 12, 12),
      room("bedroom", 12, 0, 12, 12),
      room("bath", 0, 12, 8, 8),
    ]);
    expect(labelled.map((item) => item.label)).toEqual([
      "Bedroom 1",
      "Bedroom 2",
      "Bath",
    ]);
    expect(new Set(labelled.map((item) => item.id)).size).toBe(3);
  });
});

describe("studio url", () => {
  it("round-trips rooms and drops invalid ones", () => {
    const rooms = labelRooms([
      room("living", 0, 0, 16, 15),
      room("bath", 16, 0, 8, 8.5),
    ]);
    const query = encodeStudio(plan, rooms);
    expect(query).toBe("?p=the-causeway&r=lv-0-0-16-15.ba-16-0-8-8.5");
    const decoded = decodeStudio(
      new URLSearchParams(
        `${query.slice(1)}.zz-1-1-5-5.bd-5-5-10-10.bd-40-0-12-12.bd-x-0-1-1`,
      ),
    );
    expect(decoded?.rooms.map((item) => item.type)).toEqual(["living", "bath"]);
    expect(decodeStudio(new URLSearchParams("p=nowhere"))).toBeNull();
  });
});

describe("studio hints", () => {
  it("flags windowless bedrooms, missing baths and unassigned area", () => {
    const rooms = labelRooms([room("bedroom", 0, 20, 12, 11)]);
    const hints = studioHints(plan, rooms);
    expect(hints).toHaveLength(3);
    expect(hints[0]).toContain("Bedroom has no window");
    const good = labelRooms([
      room("bedroom", 0, 0, 12, 15),
      room("bath", 12, 0, 8, 8),
    ]);
    expect(
      studioHints(plan, good).some((hint) => hint.includes("window")),
    ).toBe(false);
  });
});
