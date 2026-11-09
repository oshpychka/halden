import type { Plan } from "@/lib/types";
import { door, room } from "./room";

export const causeway: Plan = {
  slug: "the-causeway",
  name: "The Causeway",
  summary: "Two bedrooms with a flex room",
  description:
    "Two bedrooms on either side of the living room, so neither shares a wall with the other. A windowless flex room near the entry serves as storage, a gym corner or a home office.",
  width: 40,
  depth: 31,
  rooms: [
    room("bedroom-2", "bedroom", "Bedroom 2", 0, 0, 12, 15),
    room("living", "living", "Living", 12, 0, 15, 15),
    room("primary", "bedroom", "Primary bedroom", 27, 0, 13, 15),
    room("bath-2", "bath", "Bath 2", 0, 15, 8, 10),
    room("closet-2", "closet", "Closet", 8, 15, 4, 5),
    room("hall", "foyer", "Hall", 8, 20, 4, 11),
    room("storage", "closet", "Storage", 0, 25, 8, 6),
    room("kitchen", "kitchen", "Kitchen", 12, 15, 11, 10),
    room("laundry", "laundry", "Laundry", 23, 15, 4, 10),
    room("primary-closet", "closet", "Walk-in closet", 27, 15, 6, 10),
    room("primary-bath", "bath", "Primary bath", 33, 15, 7, 10),
    room("foyer", "foyer", "Entry", 12, 25, 15, 6),
    room("flex", "den", "Flex room", 27, 25, 13, 6),
  ],
  doors: [
    door("entry", "y", 31, 18, 21),
    door("bedroom-2", "x", 12, 11.5, 14),
    door("primary", "x", 27, 11.5, 14),
    door("closet-2", "y", 15, 8.75, 11.25),
    door("bath-2", "x", 8, 21, 23.5),
    door("storage", "x", 8, 26, 28.5),
    door("laundry", "y", 25, 23.75, 26.25),
    door("primary-closet", "y", 15, 28, 30.5),
    door("primary-bath", "y", 15, 35, 37.5),
    door("flex", "x", 27, 26.5, 29),
  ],
  windows: [
    { side: "front", from: 2, to: 10 },
    { side: "front", from: 14, to: 25 },
    { side: "front", from: 29, to: 38 },
  ],
  balcony: { x: 6, y: -7, w: 28, h: 7 },
  options: [
    {
      id: "office",
      label: "Home office",
      description:
        "The flex room is finished as an office with built-in desk and shelving.",
      price: 6000,
      patch: { flex: { label: "Home office" } },
    },
    {
      id: "double-vanity",
      label: "Double vanity bath",
      description:
        "The primary bath grows by two feet for a double vanity. The closet gets narrower.",
      price: 16000,
      patch: {
        "primary-closet": { w: 4 },
        "primary-bath": { x: 31, w: 9 },
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
        door("kitchen", "y", 25, 16, 19),
        door("kitchen-living", "y", 15, 16, 19),
      ],
    },
  ],
  basePrice: 1265000,
};
