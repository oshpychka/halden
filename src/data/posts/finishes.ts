import type { Post } from "@/lib/types";
import { authors } from "./authors";

export const finishesCompared: Post = {
  slug: "finish-packages-compared",
  title: "Finish packages compared: Shell, Travertine and Walnut",
  description:
    "What is included in each of the three finish packages at The Halden, how they wear in a coastal climate and what they add to the price per square foot.",
  author: authors.priya,
  published: "2026-03-18",
  updated: "2026-09-01",
  cover: {
    src: "/images/interior-bath.webp",
    alt: "Bathroom with a freestanding tub, stone floor and floor-to-ceiling windows",
  },
  body: [
    {
      type: "p",
      text: "Every residence comes with one of three finish packages. They share the same fixtures, appliances and window systems. What changes is the floor, the cabinetry and the stone.",
    },
    { type: "h2", text: "Shell" },
    {
      type: "p",
      text: "White oak floors, matte white cabinetry and honed quartz counters. Included in the base price. It is the calmest of the three and the easiest to furnish around.",
    },
    { type: "h2", text: "Travertine" },
    {
      type: "p",
      text: "Vein-cut travertine floors, limed oak cabinetry and travertine counters. Adds $38 per square foot. Travertine stays cool underfoot in summer, and the vein-cut slabs show a linear grain instead of the usual cloudy pattern.",
    },
    { type: "h2", text: "Walnut" },
    {
      type: "p",
      text: "Smoked walnut floors, dark walnut cabinetry and Calacatta marble counters and bath walls. Adds $54 per square foot. The darkest package, and the most dramatic against the bright bay light.",
    },
    {
      type: "list",
      items: [
        "All floors are engineered for humidity and laid on an acoustic underlay",
        "All stone is sealed before handover",
        "Kitchens include the same appliance package in all three",
      ],
    },
    { type: "h2", text: "Seeing them" },
    {
      type: "p",
      text: "The model residence at the sales gallery shows all three packages in different rooms. On the website, the configurator adds the package to the price and colors the 3D view so you can compare them in your own plan.",
    },
  ],
};
