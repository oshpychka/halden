import type { Post } from "@/lib/types";
import { authors } from "./authors";

export const deposits: Post = {
  slug: "how-deposits-work-before-completion",
  title: "How deposits work when you buy before completion",
  description:
    "A plain guide to the 10/10/10/70 deposit schedule at The Halden: when each payment is due, where the money is held and what happens at closing.",
  author: authors.elena,
  published: "2026-09-15",
  updated: "2026-10-20",
  cover: {
    src: "/images/brickell-key.webp",
    alt: "Residential towers on a small island in Biscayne Bay",
  },
  body: [
    {
      type: "p",
      text: "Buying a residence before it is built means paying part of the price years before you get the keys. Most buyers ask the same three questions: how much, when, and where does the money sit in the meantime.",
    },
    { type: "h2", text: "The schedule" },
    {
      type: "p",
      text: "At The Halden the deposits follow a 10/10/10/70 schedule. The first two payments follow your contract date, the third is tied to the building itself. The remaining 70% is paid at closing.",
    },
    {
      type: "list",
      items: [
        "10% when you sign the purchase agreement",
        "10% 120 days after signing",
        "10% at topping out, planned for August 2027",
        "70% at closing, planned for the second quarter of 2028",
      ],
    },
    {
      type: "p",
      text: "On a residence priced at $1,265,000, that is $126,500 three times before completion and $885,500 at closing. The deposit planner on every residence page calculates the exact amounts and dates for your configuration and exports them to your calendar.",
    },
    { type: "h2", text: "Where the deposits are held" },
    {
      type: "p",
      text: "Deposits are paid to an independent escrow agent, not to the developer. Florida condominium law sets out how pre-construction deposits are held and when they can be released. Your attorney receives the escrow agreement with the contract and should walk you through it.",
    },
    { type: "h2", text: "Layout options and finishes" },
    {
      type: "p",
      text: "Layout options and finish packages are added to the purchase price. If you choose them after signing, the difference is spread across the deposits that are still to come.",
    },
    { type: "h2", text: "At closing" },
    {
      type: "p",
      text: "Before closing you walk through the finished residence with the site team and note anything that needs attention. The final 70% can be paid in cash or financed with a mortgage. Lenders usually issue the commitment a few months before the expected closing date, so it is worth speaking to one early.",
    },
    {
      type: "quote",
      text: "The topping-out deposit is tied to the structure, not to a date. If the building is late, that payment waits with it.",
    },
  ],
};
