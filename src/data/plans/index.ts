import type { Plan } from "@/lib/types";
import { bayfront } from "./bayfront";
import { causeway } from "./causeway";
import { harbor } from "./harbor";
import { inlet } from "./inlet";
import { key } from "./key";
import { mooring } from "./mooring";
import { penthouse } from "./penthouse";
import { point } from "./point";

export const plans: Plan[] = [
  inlet,
  mooring,
  harbor,
  causeway,
  point,
  key,
  bayfront,
  penthouse,
];

export function getPlan(slug: string): Plan | undefined {
  return plans.find((plan) => plan.slug === slug);
}
