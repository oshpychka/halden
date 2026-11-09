import type { Mode } from "@/lib/builder";

export const STEP_TEXT: Record<Mode, { title: string; hint: string }[]> = {
  guided: [
    {
      title: "What are you looking for?",
      hint: "Choose what matters to you. Anything you skip stays open.",
    },
    {
      title: "Pick a residence",
      hint: "These residences match your choices. Tap one to select it, then press Next.",
    },
    {
      title: "Make it yours",
      hint: "Switch layout options and finishes. The plan and the price change as you go. Try 3D and Sunlight above the plan.",
    },
    {
      title: "Your residence",
      hint: "Here is everything in one place. Save it, share the link or ask for a presentation.",
    },
  ],
  custom: [
    {
      title: "Pick a size",
      hint: "Choose how big the residence is and whether to start from our layout or an empty shell.",
    },
    {
      title: "Arrange the rooms",
      hint: "Drag rooms into place, change their size and add new ones. The areas update as you go.",
    },
    {
      title: "Your layout",
      hint: "Share the link or send the layout to our architects for a buildable plan and a price.",
    },
  ],
};
