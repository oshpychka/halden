import type { Plan } from "@/lib/types";
import { door, room } from "./room";

export const harbor: Plan = {
  slug: "the-harbor",
  name: "The Harbor",
  summary: "One bedroom plus den, one and a half baths",
  description:
    "A one-bedroom with a separate den behind the kitchen, a powder room for guests and an en-suite bath. The den works as a guest room, a study or, opened up, as a media room.",
  width: 32,
  depth: 30,
  rooms: [
    room("living", "living", "Living", 0, 0, 18, 15),
    room("bedroom", "bedroom", "Bedroom", 18, 0, 14, 15),
    room("kitchen", "kitchen", "Kitchen", 0, 15, 10, 10),
    room("den", "den", "Den", 10, 15, 8, 10),
    room("closet", "closet", "Closet", 18, 15, 6, 7),
    room("laundry", "laundry", "Laundry", 18, 22, 6, 3),
    room("bath", "bath", "Bath", 24, 15, 8, 9),
    room("powder", "powder", "Powder", 24, 24, 8, 6),
    room("foyer", "foyer", "Entry", 0, 25, 24, 5),
  ],
  doors: [
    door("entry", "y", 30, 4, 7),
    door("den", "y", 25, 12, 14.5),
    door("closet", "y", 15, 19, 21.5),
    door("bath", "y", 15, 26, 28.5),
    door("laundry", "y", 25, 19.5, 22),
    door("powder", "x", 24, 26, 28.5),
    door("bedroom", "x", 18, 11.5, 14),
  ],
  windows: [
    { side: "front", from: 2, to: 16 },
    { side: "front", from: 20, to: 30 },
  ],
  balcony: { x: 0, y: -6, w: 24, h: 6 },
  options: [
    {
      id: "open-den",
      label: "Open den",
      description:
        "Remove the den walls and use it as a media corner open to the kitchen.",
      price: 0,
      patch: { den: { open: true, label: "Media corner" } },
      removeDoors: ["den"],
    },
    {
      id: "guest-bath",
      label: "Full guest bath",
      description:
        "The powder room gets a shower and becomes a second full bath.",
      price: 14500,
      patch: { powder: { type: "bath", label: "Guest bath" } },
    },
    {
      id: "enclosed-kitchen",
      label: "Enclosed kitchen",
      description:
        "Walls close the kitchen, with doors to the entry and the living room.",
      price: 7800,
      patch: { kitchen: { open: false } },
      addDoors: [
        door("kitchen", "y", 25, 3, 6),
        door("kitchen-living", "y", 15, 4, 7),
      ],
    },
  ],
  basePrice: 965000,
};
