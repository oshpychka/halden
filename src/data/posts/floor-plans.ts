import type { Post } from "@/lib/types";
import { authors } from "./authors";

export const floorPlans: Post = {
  slug: "reading-a-floor-plan",
  title: "Reading a floor plan: what the numbers leave out",
  description:
    "How to read a condo floor plan before the building exists: interior area, room sizes, windows, door swings and the routes between rooms.",
  author: authors.tomas,
  published: "2026-08-04",
  updated: "2026-08-04",
  cover: {
    src: "/images/interior-lounge.webp",
    alt: "Living room with a dark sofa, a round pendant lamp and a garden view",
  },
  body: [
    {
      type: "p",
      text: "A floor plan is a drawing of a horizontal cut through the residence about four feet above the floor. Everything above the cut disappears, which is why plans look emptier than rooms feel.",
    },
    { type: "h2", text: "Interior area" },
    {
      type: "p",
      text: "The area we publish is the interior area: the floor inside the exterior walls, including interior walls and closets. Terraces are listed separately. Some developers add terraces and shared corridors to one large number. We think that makes comparisons harder.",
    },
    { type: "h2", text: "Room sizes" },
    {
      type: "p",
      text: "Room dimensions are measured wall to wall. A bedroom of 12 by 15 feet fits a king bed with room to walk on both sides. Below 11 feet across, the bed starts to decide where everything else goes.",
    },
    { type: "h2", text: "Windows" },
    {
      type: "p",
      text: "On our plans the window line is drawn as a thin double line in the exterior wall. Look at how much of each room it covers. A living room with 25 feet of glass will feel larger than a wider room with a single window.",
    },
    {
      type: "list",
      items: [
        "Thick lines are walls, thicker on the outside of the building",
        "Thin double lines are windows",
        "Arcs show which way a door opens",
        "Dashed outlines are terraces",
      ],
    },
    { type: "h2", text: "Doors and circulation" },
    {
      type: "p",
      text: "Follow the route from the entry to each bedroom. Every turn and every short corridor takes floor area that does not feel like a room. Good plans keep that route short and let it double as a gallery or a dining space.",
    },
    {
      type: "quote",
      text: "The best test is to imagine carrying shopping bags from the front door to the kitchen. Count the doors you have to open.",
    },
  ],
};
