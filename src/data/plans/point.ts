import type { Plan } from "@/lib/types";
import { door, room } from "./room";

export const point: Plan = {
  slug: "the-point",
  name: "The Point",
  summary: "Corner two bedroom with a study",
  description:
    "A corner residence with windows on two sides. The primary suite wraps the corner, and the study behind it has its own side window, so it can be finished as a third bedroom.",
  width: 42,
  depth: 33,
  rooms: [
    room("bedroom-2", "bedroom", "Bedroom 2", 0, 0, 12, 15),
    room("living", "living", "Living", 12, 0, 17, 15),
    room("primary", "bedroom", "Primary bedroom", 29, 0, 13, 15),
    room("bath-2", "bath", "Bath 2", 0, 15, 8, 10),
    room("laundry", "laundry", "Laundry", 0, 25, 8, 8),
    room("closet-2", "closet", "Closet", 8, 15, 4, 5),
    room("hall", "foyer", "Hall", 8, 20, 4, 13),
    room("kitchen", "kitchen", "Kitchen", 12, 15, 12, 11),
    room("pantry", "closet", "Pantry", 24, 15, 5, 6),
    room("coat", "closet", "Coats", 24, 21, 5, 5),
    room("foyer", "foyer", "Entry", 12, 26, 17, 7),
    room("primary-closet", "closet", "Walk-in closet", 29, 15, 6, 9),
    room("primary-bath", "bath", "Primary bath", 35, 15, 7, 9),
    room("study", "den", "Study", 29, 24, 13, 9),
  ],
  doors: [
    door("entry", "y", 33, 17, 20),
    door("bedroom-2", "x", 12, 11.5, 14),
    door("primary", "x", 29, 11.5, 14),
    door("closet-2", "y", 15, 8.75, 11.25),
    door("bath-2", "x", 8, 21, 23.5),
    door("laundry", "x", 8, 27, 29.5),
    door("pantry", "x", 24, 16.5, 19),
    door("coat", "y", 26, 25.25, 27.75),
    door("primary-closet", "y", 15, 30, 32.5),
    door("primary-bath", "y", 15, 36.5, 39),
    door("study", "x", 29, 28, 30.5),
  ],
  windows: [
    { side: "front", from: 2, to: 10 },
    { side: "front", from: 14, to: 27 },
    { side: "front", from: 31, to: 40 },
    { side: "right", from: 3, to: 12 },
    { side: "right", from: 26, to: 31 },
  ],
  balcony: { x: 10, y: -7, w: 32, h: 7 },
  options: [
    {
      id: "third-bedroom",
      label: "Study as bedroom 3",
      description:
        "The study is finished as a third bedroom with a closet. It keeps its side window.",
      price: 22000,
      patch: { study: { type: "bedroom", label: "Bedroom 3" } },
    },
    {
      id: "double-vanity",
      label: "Double vanity bath",
      description:
        "The primary bath widens for a double vanity. The closet gets narrower.",
      price: 16000,
      patch: {
        "primary-closet": { w: 5 },
        "primary-bath": { x: 34, w: 8 },
      },
    },
    {
      id: "enclosed-kitchen",
      label: "Enclosed kitchen",
      description:
        "Walls close the kitchen, with doors to the entry and the living room.",
      price: 7800,
      patch: { kitchen: { open: false } },
      addDoors: [
        door("kitchen", "y", 26, 15, 18),
        door("kitchen-living", "y", 15, 16, 19),
      ],
    },
  ],
  basePrice: 1495000,
};
