import type { Post } from "@/lib/types";
import { authors } from "./authors";

export const layoutOptions: Post = {
  slug: "choosing-layout-options",
  title: "Choosing layout options before the walls go up",
  description:
    "Which layout changes a pre-construction condo allows, when they are confirmed and how to choose between a study, a bedroom and a larger bath.",
  author: authors.elena,
  published: "2026-07-14",
  updated: "2026-07-14",
  cover: {
    src: "/images/interior-kitchen.webp",
    alt: "White kitchen with glass-front cabinets and a window over a small table",
  },
  body: [
    {
      type: "p",
      text: "Buying early has one advantage that resale never offers: some walls are still on paper. At The Halden every plan has a short list of layout options, prepared with the architects so that each one works with the structure and the services.",
    },
    { type: "h2", text: "What can change" },
    {
      type: "list",
      items: [
        "Closing or opening the kitchen",
        "A study finished as a bedroom, where it has a window",
        "A larger primary bath in place of part of the closet",
        "A powder room upgraded to a full guest bath",
      ],
    },
    {
      type: "p",
      text: "Columns, the facade, the risers that carry water and air, and the entry door stay where they are. That is why the options are a list and not a blank page.",
    },
    { type: "h2", text: "Deadlines" },
    {
      type: "p",
      text: "Layout options are confirmed when the structure reaches two floors below your residence. After that the plumbing and electrical rough-in starts on your floor. Finish packages can be changed until six months before completion.",
    },
    { type: "h2", text: "How to decide" },
    {
      type: "p",
      text: "Think about the next five years, not the next five months. A third bedroom adds resale value in the corner plans. A study with glass doors is easier to live with if it will be an office most days.",
    },
    {
      type: "quote",
      text: "Most buyers change one thing. The ones who change three usually go back to two after a week.",
    },
    {
      type: "p",
      text: "The configurator on each residence page shows the plan and the price as you switch options. Save the link and bring it to your presentation.",
    },
  ],
};
