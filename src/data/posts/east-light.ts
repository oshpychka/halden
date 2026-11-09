import type { Post } from "@/lib/types";
import { authors } from "./authors";

export const eastLight: Post = {
  slug: "why-every-residence-faces-the-bay",
  title: "East light: why every residence faces the bay",
  description:
    "Why The Halden puts all five residences on each floor along the east facade, and what morning sun means for living in Miami.",
  author: authors.tomas,
  published: "2026-06-10",
  updated: "2026-07-02",
  cover: {
    src: "/images/bay-skyline.webp",
    alt: "Downtown Miami towers along the water under a blue sky",
  },
  body: [
    {
      type: "p",
      text: "Most towers in Edgewater split each floor into a bay side and a city side. The bay-side residences sell first and for more. The city side waits.",
    },
    {
      type: "p",
      text: "We drew The Halden the other way round. The elevator core and corridor run along the west side of the floor, and all five residences face east over Biscayne Bay.",
    },
    { type: "h2", text: "What east light means" },
    {
      type: "p",
      text: "In Miami the sun rises over the bay. East-facing rooms get direct sun in the morning, when the air is cooler, and lose it by early afternoon. In August that matters more than any view.",
    },
    {
      type: "list",
      items: [
        "Morning sun in living rooms and bedrooms",
        "No low western sun in the hottest hours",
        "Lower cooling load, quieter air conditioning",
      ],
    },
    { type: "h2", text: "The corners" },
    {
      type: "p",
      text: "The two corner residences on each floor add a second exposure. The A stack looks north over Margaret Pace Park. The E stack looks south to the downtown skyline and gets winter sun through its side windows.",
    },
    { type: "h2", text: "Check it yourself" },
    {
      type: "p",
      text: "Every residence page has a sunlight view. Pick a date and drag the time slider to see where the light falls in each room, on the plan and in 3D.",
    },
  ],
};
