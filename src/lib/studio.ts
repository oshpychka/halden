import { plans } from "@/data/plans";
import type { Layout } from "./plan";
import type { Plan, Rect, Room, RoomType } from "./types";

export const GRID = 0.5;
export const MIN_SIDE = 3;

export const MODULES: {
  type: RoomType;
  label: string;
  w: number;
  h: number;
}[] = [
  { type: "living", label: "Living", w: 16, h: 15 },
  { type: "kitchen", label: "Kitchen", w: 11, h: 10 },
  { type: "dining", label: "Dining", w: 10, h: 9 },
  { type: "bedroom", label: "Bedroom", w: 12, h: 12 },
  { type: "bath", label: "Bath", w: 8, h: 8 },
  { type: "powder", label: "Powder", w: 5, h: 6 },
  { type: "den", label: "Den", w: 9, h: 9 },
  { type: "closet", label: "Closet", w: 6, h: 5 },
  { type: "laundry", label: "Laundry", w: 6, h: 4 },
  { type: "foyer", label: "Entry", w: 8, h: 6 },
];

const CODES: Record<RoomType, string> = {
  living: "lv",
  kitchen: "kt",
  dining: "dn",
  bedroom: "bd",
  bath: "ba",
  powder: "pw",
  den: "de",
  closet: "cl",
  laundry: "ld",
  foyer: "fy",
};

const TYPES = Object.fromEntries(
  Object.entries(CODES).map(([type, code]) => [code, type as RoomType]),
);

export function snap(value: number): number {
  return Math.round(value / GRID) * GRID;
}

export function fits(rect: Rect, plan: Plan): boolean {
  return (
    rect.x >= 0 &&
    rect.y >= 0 &&
    rect.w >= MIN_SIDE &&
    rect.h >= MIN_SIDE &&
    rect.x + rect.w <= plan.width &&
    rect.y + rect.h <= plan.depth
  );
}

export function collides(rect: Rect, rooms: Room[], ignore?: string): boolean {
  return rooms.some(
    (room) =>
      room.id !== ignore &&
      rect.x < room.x + room.w &&
      room.x < rect.x + rect.w &&
      rect.y < room.y + room.h &&
      room.y < rect.y + rect.h,
  );
}

export function canPlace(
  rect: Rect,
  rooms: Room[],
  plan: Plan,
  ignore?: string,
): boolean {
  return fits(rect, plan) && !collides(rect, rooms, ignore);
}

export function findSpot(
  w: number,
  h: number,
  rooms: Room[],
  plan: Plan,
): Rect | null {
  for (const [width, height] of [
    [w, h],
    [h, w],
  ] as const) {
    for (let y = 0; y + height <= plan.depth; y += GRID) {
      for (let x = 0; x + width <= plan.width; x += GRID) {
        const rect = { x, y, w: width, h: height };
        if (!collides(rect, rooms)) return rect;
      }
    }
  }
  return null;
}

export function labelRooms(rooms: Room[]): Room[] {
  const counts = new Map<RoomType, number>();
  const totals = new Map<RoomType, number>();
  for (const room of rooms)
    totals.set(room.type, (totals.get(room.type) ?? 0) + 1);
  return rooms.map((room) => {
    const index = (counts.get(room.type) ?? 0) + 1;
    counts.set(room.type, index);
    const base = MODULES.find((preset) => preset.type === room.type)!.label;
    const label = (totals.get(room.type) ?? 0) > 1 ? `${base} ${index}` : base;
    return { ...room, id: `${CODES[room.type]}${index}`, label };
  });
}

export function encodeStudio(plan: Plan, rooms: Room[]): string {
  const parts = rooms.map((room) =>
    [CODES[room.type], room.x, room.y, room.w, room.h].join("-"),
  );
  return `?p=${plan.slug}${parts.length ? `&r=${parts.join(".")}` : ""}`;
}

type Params = { get(name: string): string | null };

export function decodeStudio(
  params: Params,
): { plan: Plan; rooms: Room[] } | null {
  const plan = plans.find((item) => item.slug === params.get("p"));
  if (!plan) return null;
  const rooms: Room[] = [];
  for (const part of (params.get("r") ?? "")
    .split(".")
    .filter(Boolean)
    .slice(0, 40)) {
    const [code, ...numbers] = part.split("-");
    const type = TYPES[code ?? ""];
    const [x, y, w, h] = numbers.map(Number);
    if (
      !type ||
      numbers.length !== 4 ||
      [x, y, w, h].some((value) => !Number.isFinite(value))
    )
      continue;
    const rect = { x: snap(x!), y: snap(y!), w: snap(w!), h: snap(h!) };
    if (canPlace(rect, rooms, plan))
      rooms.push({ id: "", type, label: "", ...rect });
  }
  return { plan, rooms: labelRooms(rooms) };
}

function touchesWindow(room: Room, plan: Plan): boolean {
  return plan.windows.some((span) => {
    if (span.side === "front") {
      return room.y === 0 && room.x < span.to && room.x + room.w > span.from;
    }
    const x = span.side === "left" ? 0 : plan.width;
    const edge = span.side === "left" ? room.x : room.x + room.w;
    return edge === x && room.y < span.to && room.y + room.h > span.from;
  });
}

export function studioHints(plan: Plan, rooms: Room[]): string[] {
  const hints: string[] = [];
  for (const room of rooms) {
    if (room.type === "bedroom" && !touchesWindow(room, plan)) {
      hints.push(
        `${room.label} has no window. A bedroom needs one to count as a bedroom.`,
      );
    }
  }
  if (rooms.length && !rooms.some((room) => room.type === "bath")) {
    hints.push("There is no full bath yet.");
  }
  const used = rooms.reduce((sum, room) => sum + room.w * room.h, 0);
  const free = plan.width * plan.depth - used;
  if (rooms.length && free > plan.width * plan.depth * 0.15) {
    hints.push(
      `${Math.round(free).toLocaleString("en-US")} sq ft is not assigned to a room yet.`,
    );
  }
  return hints;
}

export function studioLayout(plan: Plan, rooms: Room[]): Layout {
  return {
    width: plan.width,
    depth: plan.depth,
    rooms: rooms.map((room) => ({ ...room, open: false })),
    doors: [],
    windows: plan.windows,
  };
}
