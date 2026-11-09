import type { Finish } from "@/lib/types";

export const finishes: Finish[] = [
  {
    id: "shell",
    label: "Shell",
    description: "White oak floors, matte white cabinetry, honed quartz.",
    pricePerSqft: 0,
    floor: "#d8c4a4",
    cabinetry: "#f1efea",
    stone: "#e6e3dc",
  },
  {
    id: "travertine",
    label: "Travertine",
    description:
      "Vein-cut travertine floors, limed oak cabinetry, travertine counters.",
    pricePerSqft: 38,
    floor: "#e3d6c1",
    cabinetry: "#cdbb9c",
    stone: "#d9c8ab",
  },
  {
    id: "walnut",
    label: "Walnut",
    description:
      "Smoked walnut floors, dark walnut cabinetry, Calacatta marble.",
    pricePerSqft: 54,
    floor: "#6e5440",
    cabinetry: "#4c3a2c",
    stone: "#efede8",
  },
];

export function getFinish(id: string | undefined) {
  return finishes.find((finish) => finish.id === id) ?? finishes[0]!;
}
