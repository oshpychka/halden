import type { Plan } from "@/lib/types";
import { door, room } from "./room";

export const mooring: Plan = {
  slug: "the-mooring",
  name: "The Mooring",
  summary: "One bedroom with a dining nook",
  description:
    "A one-bedroom residence where the living room and bedroom share the bay frontage. The dining nook sits between the kitchen and the bedroom, and can be closed off as a small home office.",
  width: 28,
  depth: 28,
  rooms: [
    room("living", "living", "Living", 0, 0, 16, 15),
    room("bedroom", "bedroom", "Bedroom", 16, 0, 12, 15),
    room("kitchen", "kitchen", "Kitchen", 0, 15, 11, 8),
    room("dining", "dining", "Dining", 11, 15, 9, 8),
    room("closet", "closet", "Walk-in closet", 20, 15, 8, 6),
    room("bath", "bath", "Bath", 20, 21, 8, 7),
    room("foyer", "foyer", "Entry", 0, 23, 20, 5),
  ],
  doors: [
    door("entry", "y", 28, 3, 6),
    door("bedroom", "y", 15, 16.5, 19),
    door("closet", "y", 15, 22, 24.5),
    door("bath", "x", 20, 24, 26.5),
  ],
  windows: [
    { side: "front", from: 1, to: 15 },
    { side: "front", from: 18, to: 26 },
  ],
  balcony: { x: 0, y: -6, w: 20, h: 6 },
  options: [
    {
      id: "office",
      label: "Home office",
      description:
        "The dining nook becomes a closed office with a door to the entry.",
      price: 9500,
      patch: { dining: { type: "den", label: "Office", open: false } },
      addDoors: [door("office", "y", 23, 13, 15.5)],
    },
    {
      id: "spa-bath",
      label: "Spa bath",
      description:
        "A larger bath with a double vanity and walk-in shower. The closet becomes a reach-in.",
      price: 18000,
      patch: {
        closet: { h: 4, label: "Closet" },
        bath: { y: 19, h: 9, label: "Spa bath" },
      },
    },
  ],
  basePrice: 795000,
};
