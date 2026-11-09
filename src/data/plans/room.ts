import type { Door, Room, RoomType } from "@/lib/types";

export function room(
  id: string,
  type: RoomType,
  label: string,
  x: number,
  y: number,
  w: number,
  h: number,
  open?: boolean,
): Room {
  return open === undefined
    ? { id, type, label, x, y, w, h }
    : { id, type, label, x, y, w, h, open };
}

export function door(
  id: string,
  axis: Door["axis"],
  at: number,
  from: number,
  to: number,
): Door {
  return { id, axis, at, from, to };
}
