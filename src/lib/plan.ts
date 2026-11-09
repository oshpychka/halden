import type { Door, Plan, Room, RoomType, WindowSpan } from "./types";

export type Layout = {
  width: number;
  depth: number;
  rooms: Room[];
  doors: Door[];
  windows: WindowSpan[];
};

export type Wall = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  exterior: boolean;
};

export type Glazing = { x1: number; y1: number; x2: number; y2: number };

const OPEN_TYPES: RoomType[] = ["living", "dining", "kitchen", "foyer"];

export function isOpen(room: Room): boolean {
  return room.open ?? OPEN_TYPES.includes(room.type);
}

export function compatibleOptions(plan: Plan, ids: string[]): string[] {
  const known = ids.filter((id) =>
    plan.options.some((option) => option.id === id),
  );
  return known.filter((id, index) => {
    const option = plan.options.find((item) => item.id === id);
    return known
      .slice(0, index)
      .every((earlier) => !option?.excludes?.includes(earlier));
  });
}

export function buildLayout(
  plan: Plan,
  optionIds: string[] = [],
  mirrored = false,
): Layout {
  let rooms = plan.rooms.map((room) => ({ ...room }));
  let doors = plan.doors.map((item) => ({ ...item }));

  for (const id of compatibleOptions(plan, optionIds)) {
    const option = plan.options.find((item) => item.id === id);
    if (!option) continue;
    rooms = rooms
      .filter((room) => !option.remove?.includes(room.id))
      .map((room) => ({ ...room, ...option.patch?.[room.id] }));
    rooms.push(...(option.add ?? []));
    doors = doors.filter((item) => !option.removeDoors?.includes(item.id));
    doors.push(...(option.addDoors ?? []));
  }

  const layout = {
    width: plan.width,
    depth: plan.depth,
    rooms,
    doors,
    windows: plan.windows,
  };
  return mirrored ? mirrorLayout(layout) : layout;
}

export function mirrorLayout(layout: Layout): Layout {
  const { width } = layout;
  return {
    ...layout,
    rooms: layout.rooms.map((room) => ({
      ...room,
      x: width - room.x - room.w,
    })),
    doors: layout.doors.map((item) =>
      item.axis === "x"
        ? { ...item, at: width - item.at }
        : { ...item, from: width - item.to, to: width - item.from },
    ),
    windows: layout.windows.map((span) =>
      span.side === "front"
        ? { side: "front", from: width - span.to, to: width - span.from }
        : { ...span, side: span.side === "left" ? "right" : "left" },
    ),
  };
}

export function roomAt(rooms: Room[], x: number, y: number): Room | undefined {
  return rooms.find(
    (room) =>
      x > room.x && x < room.x + room.w && y > room.y && y < room.y + room.h,
  );
}

function onDoor(
  doors: Door[],
  axis: Door["axis"],
  at: number,
  position: number,
): boolean {
  return doors.some(
    (item) =>
      item.axis === axis &&
      item.at === at &&
      position > item.from &&
      position < item.to,
  );
}

function linesFor(layout: Layout, axis: Door["axis"]): number[] {
  const values = layout.rooms.flatMap((room) =>
    axis === "x" ? [room.x, room.x + room.w] : [room.y, room.y + room.h],
  );
  return [...new Set(values)];
}

function breakpoints(layout: Layout, axis: Door["axis"], at: number): number[] {
  const values = layout.rooms.flatMap((room) =>
    axis === "x" ? [room.y, room.y + room.h] : [room.x, room.x + room.w],
  );
  for (const item of layout.doors) {
    if (item.axis === axis && item.at === at) values.push(item.from, item.to);
  }
  return [...new Set(values)].sort((a, b) => a - b);
}

export function deriveWalls(layout: Layout): Wall[] {
  const walls: Wall[] = [];
  const epsilon = 0.01;

  for (const axis of ["x", "y"] as const) {
    for (const at of linesFor(layout, axis)) {
      const points = breakpoints(layout, axis, at);
      for (let index = 0; index < points.length - 1; index += 1) {
        const from = points[index]!;
        const to = points[index + 1]!;
        const mid = (from + to) / 2;
        const before =
          axis === "x"
            ? roomAt(layout.rooms, at - epsilon, mid)
            : roomAt(layout.rooms, mid, at - epsilon);
        const after =
          axis === "x"
            ? roomAt(layout.rooms, at + epsilon, mid)
            : roomAt(layout.rooms, mid, at + epsilon);
        if ((!before && !after) || before === after) continue;
        if (before && after && isOpen(before) && isOpen(after)) continue;
        if (onDoor(layout.doors, axis, at, mid)) continue;
        const wall =
          axis === "x"
            ? { x1: at, y1: from, x2: at, y2: to, exterior: !before || !after }
            : { x1: from, y1: at, x2: to, y2: at, exterior: !before || !after };
        const last = walls.at(-1);
        const sameLine =
          axis === "x"
            ? last?.x1 === at && last.x2 === at
            : last?.y1 === at && last.y2 === at;
        if (
          last &&
          sameLine &&
          last.exterior === wall.exterior &&
          last.x2 === wall.x1 &&
          last.y2 === wall.y1
        ) {
          last.x2 = wall.x2;
          last.y2 = wall.y2;
        } else {
          walls.push(wall);
        }
      }
    }
  }
  return walls;
}

export function glazing(layout: Layout): Glazing[] {
  return layout.windows.map((span) => {
    if (span.side === "front")
      return { x1: span.from, y1: 0, x2: span.to, y2: 0 };
    const x = span.side === "left" ? 0 : layout.width;
    return { x1: x, y1: span.from, x2: x, y2: span.to };
  });
}

export function layoutStats(layout: Layout) {
  const count = (type: RoomType) =>
    layout.rooms.filter((room) => room.type === type).length;
  return {
    area: layout.rooms.reduce((sum, room) => sum + room.w * room.h, 0),
    bedrooms: count("bedroom"),
    bathrooms: count("bath") + count("powder") * 0.5,
    dens: count("den"),
  };
}
