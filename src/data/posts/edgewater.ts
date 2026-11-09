import type { Post } from "@/lib/types";
import { authors } from "./authors";

export const edgewater: Post = {
  slug: "edgewater-block-by-block",
  title: "Edgewater, block by block",
  description:
    "A walk around Edgewater in Miami: bayfront parks, Biscayne Boulevard, the Design District and Wynwood, and travel times to Brickell and the airport.",
  author: authors.elena,
  published: "2026-05-06",
  updated: "2026-05-06",
  cover: {
    src: "/images/bay-causeway.webp",
    alt: "Causeway crossing Biscayne Bay toward the Miami skyline",
  },
  body: [
    {
      type: "p",
      text: "Edgewater is the narrow strip between Biscayne Boulevard and the bay, north of downtown. For years it was low-rise and quiet. Today it has some of the best bay frontage in the city and still feels residential.",
    },
    { type: "h2", text: "On foot" },
    {
      type: "p",
      text: "Margaret Pace Park is a few minutes north along the water, with tennis courts, a dog park and a path along the seawall. Cafes and small restaurants line the side streets off Biscayne Boulevard.",
    },
    { type: "h2", text: "Ten minutes away" },
    {
      type: "list",
      items: [
        "The Design District, for galleries and furniture showrooms",
        "Wynwood, for restaurants and street art",
        "The Venetian Causeway, for cycling to Miami Beach",
        "The Adrienne Arsht Center and Pérez Art Museum to the south",
      ],
    },
    { type: "h2", text: "Getting around" },
    {
      type: "p",
      text: "Brickell is about 10 minutes by car outside rush hour. Miami International Airport takes around 20 minutes. The beaches are 15 minutes across the causeways.",
    },
    {
      type: "quote",
      text: "People move here for the bay and stay for the fact that they can walk to dinner.",
    },
  ],
};
