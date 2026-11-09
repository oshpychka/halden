import type { Update } from "@/lib/types";

export const updates: Update[] = [
  {
    slug: "structure-reaches-level-12",
    title: "The structure reaches level 12",
    date: "2026-10-30",
    milestone: "Level 12 slab",
    progress: 52,
    summary:
      "Two floors a month since August. The level 12 slab was poured on October 27, and the first window units arrive in December.",
    photo: {
      src: "/images/bay-marina.webp",
      alt: "Biscayne Bay and the marina seen from above, with towers along the shore",
    },
    body: [
      {
        type: "p",
        text: "The concrete crews poured the level 12 slab on October 27. Since August the structure has risen two floors a month, which keeps topping out on schedule for August 2027.",
      },
      {
        type: "p",
        text: "We flew a drone at the height of level 12 to record the view for buyers on floors 10 to 14. The bay is open across the full width of the east facade, and the marina to the south stays in view from the E stack.",
      },
      { type: "h2", text: "Next two months" },
      {
        type: "list",
        items: [
          "Levels 13 and 14 formed and poured",
          "First window wall units delivered and tested on a mock-up bay",
          "Plumbing risers installed up to level 8",
        ],
      },
    ],
  },
  {
    slug: "model-residence-opens",
    title: "The model residence opens at the sales gallery",
    date: "2026-08-28",
    milestone: "Model residence",
    progress: 41,
    summary:
      "A full-size Causeway residence, built inside the sales gallery on Biscayne Boulevard, with all three finish packages on show.",
    photo: {
      src: "/images/interior-living.webp",
      alt: "Bright living room with white sofas, a low table and tall windows",
    },
    body: [
      {
        type: "p",
        text: "The model residence is a full-size copy of The Causeway, our two-bedroom plan, built inside the sales gallery at 2380 Biscayne Boulevard.",
      },
      {
        type: "p",
        text: "Each room shows a different finish package, so you can stand on the travertine floor in the living room and compare it with walnut in the primary bedroom.",
      },
      {
        type: "quote",
        text: "People read plans differently once they have walked a room at full size. Twelve feet stops being a number.",
      },
      {
        type: "p",
        text: "Visits are by appointment, seven days a week. The model also shows the double vanity option in the primary bath.",
      },
    ],
  },
  {
    slug: "tower-crane-and-level-6",
    title: "Tower crane up, level 6 formed",
    date: "2026-06-25",
    milestone: "Tower crane",
    progress: 34,
    summary:
      "The tower crane went up in early June. The core now leads the slabs by two floors, and level 6 is formed and ready for concrete.",
    photo: {
      src: "/images/construction-crane.webp",
      alt: "A red tower crane beside a concrete building under construction",
    },
    body: [
      {
        type: "p",
        text: "The tower crane was assembled over three days in early June. It stands inside the footprint of the building and will be removed through the roof after topping out.",
      },
      {
        type: "p",
        text: "The elevator and stair core is cast with climbing formwork and now runs two floors ahead of the slabs. Level 6, the first floor of residences, is formed and ready for concrete.",
      },
      { type: "h2", text: "What residents will notice later" },
      {
        type: "p",
        text: "The core position sets the corridor along the west side of every floor. That is why all five residences on a floor face the bay.",
      },
    ],
  },
  {
    slug: "podium-slab-poured",
    title: "The podium slab is poured",
    date: "2026-04-20",
    milestone: "Podium",
    progress: 22,
    summary:
      "The level 3 podium slab, which will carry the pool deck, was poured in a single 14-hour session on April 14.",
    photo: {
      src: "/images/construction-frame.webp",
      alt: "Concrete frame of a high-rise building surrounded by tower cranes",
    },
    body: [
      {
        type: "p",
        text: "The podium slab is the thickest in the building. It carries the pool, the deck planting and the transfer beams that move the tower loads onto the parking structure below.",
      },
      {
        type: "p",
        text: "Concrete trucks arrived every six minutes from 4 am. The pour finished at 6 pm and the slab was cured under wet blankets for seven days.",
      },
      {
        type: "list",
        items: [
          "Parking levels complete",
          "Podium slab complete",
          "Waterproofing of the pool basin starts in May",
        ],
      },
    ],
  },
  {
    slug: "piles-complete",
    title: "Foundation piles complete",
    date: "2026-02-12",
    milestone: "Foundations",
    progress: 11,
    summary:
      "All 214 auger-cast piles are in. Pile caps and the mat foundation under the core follow in March.",
    photo: {
      src: "/images/construction-cranes.webp",
      alt: "Several cranes over a construction site against a cloudy sky",
    },
    body: [
      {
        type: "p",
        text: "Edgewater sits on limestone a short way below the surface. The tower stands on 214 auger-cast piles, drilled to between 70 and 90 feet.",
      },
      {
        type: "p",
        text: "Each pile was load tested by sampling. Results are filed with the City of Miami building department.",
      },
      { type: "h2", text: "Next" },
      {
        type: "list",
        items: [
          "Pile caps and grade beams",
          "Mat foundation under the core",
          "First parking level",
        ],
      },
    ],
  },
  {
    slug: "groundbreaking",
    title: "Groundbreaking on Bayshore Lane",
    date: "2025-12-04",
    milestone: "Groundbreaking",
    progress: 4,
    summary:
      "Site work began after permits were issued in November. The seawall along the bay is being rebuilt before the foundations start.",
    photo: {
      src: "/images/bay-causeway.webp",
      alt: "Biscayne Bay with a causeway in the foreground and the Miami skyline beyond",
    },
    body: [
      {
        type: "p",
        text: "The building permit was issued in November and the site was fenced the same week. The first job is the seawall: a new wall, two feet higher than the old one, along the full bay frontage.",
      },
      {
        type: "p",
        text: "Raising the seawall now protects the site during construction and sets the level of the bay landing garden residents will use later.",
      },
      {
        type: "quote",
        text: "The seawall is the first thing we build and the last thing anyone notices. That is how it should be.",
      },
    ],
  },
];

export function getUpdate(slug: string) {
  return updates.find((update) => update.slug === slug);
}
