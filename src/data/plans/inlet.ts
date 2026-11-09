import type { Plan } from "@/lib/types";
import { door, room } from "./room";

export const inlet: Plan = {
  slug: "the-inlet",
  name: "The Inlet",
  summary: "Studio with a full-width bay window",
  description:
    "A studio planned around one long window. The kitchen and bath sit at the back, so the whole front of the residence stays open to the water. An optional partition turns the far end into a sleeping alcove.",
  width: 22,
  depth: 26,
  rooms: [
    room("living", "living", "Living and sleeping", 0, 0, 22, 15),
    room("bath", "bath", "Bath", 0, 15, 8, 11),
    room("closet", "closet", "Closet", 8, 15, 4, 6),
    room("kitchen", "kitchen", "Kitchen", 12, 15, 10, 6),
    room("foyer", "foyer", "Entry", 8, 21, 14, 5),
  ],
  doors: [
    door("entry", "y", 26, 16, 19),
    door("bath", "x", 8, 22, 24.5),
    door("closet", "y", 15, 8.75, 11.25),
  ],
  windows: [{ side: "front", from: 2, to: 20 }],
  balcony: { x: 0, y: -6, w: 14, h: 6 },
  options: [
    {
      id: "alcove",
      label: "Sleeping alcove",
      description:
        "A partition with a wide opening separates the bed from the living area.",
      price: 12500,
      patch: { living: { w: 13, label: "Living" } },
      add: [room("alcove", "den", "Sleeping alcove", 13, 0, 9, 15)],
      addDoors: [door("alcove", "x", 13, 10, 14)],
    },
  ],
  basePrice: 585000,
};
