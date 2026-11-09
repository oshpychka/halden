import type { View } from "@/lib/types";

export type CollectionFilter = {
  bedrooms?: number;
  minBedrooms?: number;
  balcony?: boolean;
  views?: View[];
  minFloor?: number;
  maxPrice?: number;
  stacks?: string[];
  plans?: string[];
};

export type Collection = {
  slug: string;
  title: string;
  heading: string;
  description: string;
  intro: string[];
  filter: CollectionFilter;
};

export const collections: Collection[] = [
  {
    slug: "studios",
    title: "Studio residences",
    heading: "Studios on Biscayne Bay",
    description:
      "Studio residences at The Halden in Edgewater, Miami: 572 sq ft, full-width bay windows, floors 4 to 9.",
    intro: [
      "The Inlet studios sit in the C stack on floors 4 to 9. Each one is 22 feet wide with an 18-foot window wall facing the bay.",
      "The bath and kitchen are pushed to the back, so the living space reads as one room. An optional partition creates a sleeping alcove without losing the view.",
    ],
    filter: { plans: ["the-inlet"] },
  },
  {
    slug: "one-bedroom",
    title: "One-bedroom residences",
    heading: "One-bedroom residences",
    description:
      "One-bedroom and one-bedroom plus den residences at The Halden, Miami. Bay views, 784 to 960 sq ft.",
    intro: [
      "Two one-bedroom layouts: The Mooring with a dining nook, and The Harbor with a separate den and a powder room for guests.",
      "In both, the bedroom and living room share the bay frontage, so neither room looks into the corridor side of the building.",
    ],
    filter: { bedrooms: 1 },
  },
  {
    slug: "two-bedroom",
    title: "Two-bedroom residences",
    heading: "Two-bedroom residences",
    description:
      "Two-bedroom residences at The Halden, Edgewater: split bedroom layouts and corner plans from 1,240 sq ft.",
    intro: [
      "The two-bedroom plans put the bedrooms on opposite sides of the living room. Guests and owners never share a wall.",
      "The Causeway adds a flex room near the entry. The Point takes the north corner, with a study that can become a third bedroom.",
    ],
    filter: { bedrooms: 2 },
  },
  {
    slug: "three-bedroom",
    title: "Three-bedroom residences",
    heading: "Three bedrooms, three baths",
    description:
      "Three-bedroom corner residences at The Halden in Miami, 1,728 to 1,976 sq ft, windows on two sides.",
    intro: [
      "Every three-bedroom residence at The Halden is a corner unit. The Key holds the south corner on floors 4 to 19, The Bayfront the north corner on floors 16 to 19.",
      "A private hall keeps the third bedroom apart from the living area, which suits a guest suite or a teenager's room.",
    ],
    filter: { minBedrooms: 3, maxPrice: 4000000 },
  },
  {
    slug: "penthouses",
    title: "Penthouses on Biscayne Bay",
    heading: "The two penthouses",
    description:
      "Two half-floor penthouses on level 20 of The Halden, Miami: 3,200 sq ft, wraparound terraces, bay and skyline views.",
    intro: [
      "Level 20 is divided between two residences. Each has a 30-foot great room, a media room, a study with its own bath and a terrace along the full bay front.",
      "Penthouse 1 looks north over Margaret Pace Park. Penthouse 2 looks south to the downtown skyline.",
    ],
    filter: { plans: ["the-penthouse"] },
  },
  {
    slug: "bay-view",
    title: "Residences with direct bay views",
    heading: "Direct views over the bay",
    description:
      "Residences at The Halden facing Biscayne Bay straight on, from studios to two-bedroom plans, floors 4 to 19.",
    intro: [
      "The B, C and D stacks face due east. From the living room, the view runs across Biscayne Bay to the islands and Miami Beach.",
      "East-facing rooms get direct sun in the morning and soft light in the afternoon, which keeps them cooler in summer.",
    ],
    filter: { views: ["bay"] },
  },
  {
    slug: "skyline-view",
    title: "Residences with skyline views",
    heading: "Bay and downtown skyline",
    description:
      "South corner residences at The Halden with views of Biscayne Bay and the downtown Miami skyline.",
    intro: [
      "The E stack and Penthouse 2 turn the corner to the south. Side windows frame the downtown skyline, the front windows the bay.",
      "South light reaches these rooms most of the day in winter and stays high and shallow in summer.",
    ],
    filter: { views: ["bay-skyline"] },
  },
  {
    slug: "corner-residences",
    title: "Corner residences",
    heading: "Corner residences",
    description:
      "Corner residences at The Halden in Edgewater, Miami: windows on two sides, two and three bedrooms, terraces on every floor.",
    intro: [
      "The A and E stacks hold the corners of every floor. Windows on two sides mean cross ventilation and two different views from the same room.",
      "Every corner residence has a terrace, including those on the lower floors.",
    ],
    filter: { stacks: ["A", "E"] },
  },
  {
    slug: "with-balcony",
    title: "Residences with a terrace",
    heading: "Residences with a terrace",
    description:
      "Residences with private terraces at The Halden, Miami. Every residence from floor 10 up and every corner unit.",
    intro: [
      "From floor 10, every residence at The Halden has a terrace facing the bay. Below that, terraces belong to the corner units.",
      "Terraces are 6 to 10 feet deep, enough for a dining table for four.",
    ],
    filter: { balcony: true },
  },
  {
    slug: "two-bedroom-with-balcony",
    title: "Two-bedroom residences with a terrace",
    heading: "Two bedrooms and a terrace",
    description:
      "Two-bedroom residences with a private bay-facing terrace at The Halden in Edgewater, Miami.",
    intro: [
      "The most requested combination: two bedrooms and outdoor space on the bay side.",
      "These are The Causeway plans from floor 10 up and The Point corner residences on every floor.",
    ],
    filter: { bedrooms: 2, balcony: true },
  },
  {
    slug: "high-floor",
    title: "High-floor residences",
    heading: "Floors 15 and above",
    description:
      "Residences on floors 15 to 20 at The Halden, Miami, with open views over Biscayne Bay and the islands.",
    intro: [
      "Above the 15th floor, the view clears the neighboring towers to the north and south and opens to the whole bay.",
      "These floors also include The Bayfront corner residences and the two penthouses.",
    ],
    filter: { minFloor: 15 },
  },
  {
    slug: "under-1-million",
    title: "Residences under $1 million",
    heading: "Under one million dollars",
    description:
      "Residences at The Halden in Edgewater, Miami priced under $1,000,000: studios and one-bedroom plans with bay views.",
    intro: [
      "Studios and one-bedroom residences on the lower and middle floors start well below one million dollars.",
      "Prices shown are base prices before layout options and finish packages.",
    ],
    filter: { maxPrice: 1000000 },
  },
];

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}
