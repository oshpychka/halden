import type { Plan } from "@/lib/types";
import { door, room } from "./room";

export const key: Plan = {
  slug: "the-key",
  name: "The Key",
  summary: "Corner three bedroom, three baths",
  description:
    "Three bedrooms and three baths on the south corner. A long entry gallery leads past the kitchen, and a private hall keeps the third bedroom apart from the living area.",
  width: 48,
  depth: 36,
  rooms: [
    room("bedroom-2", "bedroom", "Bedroom 2", 0, 0, 12, 15),
    room("living", "living", "Living", 12, 0, 20, 15),
    room("primary", "bedroom", "Primary bedroom", 32, 0, 16, 15),
    room("bath-2", "bath", "Bath 2", 0, 15, 8, 10),
    room("laundry", "laundry", "Laundry", 0, 25, 8, 6),
    room("storage", "closet", "Storage", 0, 31, 8, 5),
    room("closet-2", "closet", "Closet", 8, 15, 4, 5),
    room("hall", "foyer", "Hall", 8, 20, 4, 16),
    room("kitchen", "kitchen", "Kitchen", 12, 15, 16, 12),
    room("foyer", "foyer", "Gallery", 12, 27, 16, 9),
    room("hall-2", "foyer", "Hall", 28, 15, 4, 21),
    room("primary-bath", "bath", "Primary bath", 32, 15, 9, 9),
    room("primary-closet", "closet", "Walk-in closet", 41, 15, 7, 9),
    room("bath-3", "bath", "Bath 3", 32, 24, 4, 6),
    room("hall-3", "foyer", "Hall", 32, 30, 4, 6),
    room("bedroom-3", "bedroom", "Bedroom 3", 36, 24, 12, 12),
  ],
  doors: [
    door("entry", "y", 36, 18, 21),
    door("bedroom-2", "x", 12, 11.5, 14),
    door("primary", "x", 32, 11.5, 14),
    door("closet-2", "y", 15, 8.75, 11.25),
    door("bath-2", "x", 8, 21, 23.5),
    door("laundry", "x", 8, 26, 28.5),
    door("storage", "x", 8, 32, 34.5),
    door("primary-bath", "y", 15, 34, 36.5),
    door("primary-closet", "y", 15, 43, 45.5),
    door("bath-3", "x", 32, 25, 27.5),
    door("bedroom-3", "x", 36, 31, 33.5),
  ],
  windows: [
    { side: "front", from: 2, to: 10 },
    { side: "front", from: 14, to: 30 },
    { side: "front", from: 34, to: 46 },
    { side: "right", from: 3, to: 12 },
    { side: "right", from: 26, to: 34 },
  ],
  balcony: { x: 12, y: -7, w: 36, h: 7 },
  options: [
    {
      id: "media-room",
      label: "Bedroom 2 as media room",
      description:
        "Bedroom 2 opens to the living room through a wide cased opening.",
      price: 0,
      patch: { "bedroom-2": { type: "den", label: "Media room", open: true } },
      removeDoors: ["bedroom-2"],
    },
    {
      id: "double-vanity",
      label: "Double vanity bath",
      description:
        "The primary bath widens for a double vanity. The closet gets narrower.",
      price: 16000,
      patch: {
        "primary-bath": { w: 10 },
        "primary-closet": { x: 42, w: 6 },
      },
    },
    {
      id: "enclosed-kitchen",
      label: "Enclosed kitchen",
      description: "A wall and door separate the kitchen from the living room.",
      price: 7800,
      patch: { kitchen: { open: false } },
      addDoors: [door("kitchen", "y", 27, 18, 21)],
    },
  ],
  basePrice: 1925000,
};
