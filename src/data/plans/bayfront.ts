import type { Plan } from "@/lib/types";
import { door, room } from "./room";

export const bayfront: Plan = {
  slug: "the-bayfront",
  name: "The Bayfront",
  summary: "Upper corner three bedroom with a wide terrace",
  description:
    "The north corner on floors 16 to 19. A 24-foot living room opens to a terrace that runs the full width of the residence, with Margaret Pace Park and the bay below.",
  width: 52,
  depth: 38,
  rooms: [
    room("bedroom-2", "bedroom", "Bedroom 2", 0, 0, 12, 15),
    room("living", "living", "Living", 12, 0, 24, 15),
    room("primary", "bedroom", "Primary bedroom", 36, 0, 16, 15),
    room("bath-2", "bath", "Bath 2", 0, 15, 8, 10),
    room("laundry", "laundry", "Laundry", 0, 25, 8, 6),
    room("storage", "closet", "Storage", 0, 31, 8, 7),
    room("closet-2", "closet", "Closet", 8, 15, 4, 5),
    room("hall", "foyer", "Hall", 8, 20, 4, 18),
    room("kitchen", "kitchen", "Kitchen", 12, 15, 20, 12),
    room("foyer", "foyer", "Gallery", 12, 27, 20, 11),
    room("hall-2", "foyer", "Hall", 32, 15, 4, 23),
    room("primary-bath", "bath", "Primary bath", 36, 15, 9, 9),
    room("primary-closet", "closet", "Walk-in closet", 45, 15, 7, 9),
    room("bath-3", "bath", "Bath 3", 36, 24, 4, 6),
    room("hall-3", "foyer", "Hall", 36, 30, 4, 8),
    room("bedroom-3", "bedroom", "Bedroom 3", 40, 24, 12, 14),
  ],
  doors: [
    door("entry", "y", 38, 20, 23),
    door("bedroom-2", "x", 12, 11.5, 14),
    door("primary", "x", 36, 11.5, 14),
    door("closet-2", "y", 15, 8.75, 11.25),
    door("bath-2", "x", 8, 21, 23.5),
    door("laundry", "x", 8, 26, 28.5),
    door("storage", "x", 8, 33, 35.5),
    door("primary-bath", "y", 15, 38, 40.5),
    door("primary-closet", "y", 15, 47, 49.5),
    door("bath-3", "x", 36, 25, 27.5),
    door("bedroom-3", "x", 40, 32, 34.5),
  ],
  windows: [
    { side: "front", from: 2, to: 10 },
    { side: "front", from: 14, to: 34 },
    { side: "front", from: 38, to: 50 },
    { side: "right", from: 3, to: 12 },
    { side: "right", from: 26, to: 36 },
  ],
  balcony: { x: 0, y: -8, w: 52, h: 8 },
  options: [
    {
      id: "wet-bar",
      label: "Wet bar in the gallery",
      description:
        "A wet bar with wine storage along the gallery wall opposite the kitchen.",
      price: 11000,
      patch: { foyer: { label: "Gallery and bar" } },
    },
    {
      id: "double-vanity",
      label: "Double vanity bath",
      description:
        "The primary bath widens for a double vanity. The closet gets narrower.",
      price: 16000,
      patch: {
        "primary-bath": { w: 10 },
        "primary-closet": { x: 46, w: 6 },
      },
    },
    {
      id: "enclosed-kitchen",
      label: "Enclosed kitchen",
      description: "A wall and door separate the kitchen from the living room.",
      price: 7800,
      patch: { kitchen: { open: false } },
      addDoors: [door("kitchen", "y", 27, 20, 23)],
    },
  ],
  basePrice: 2390000,
};
