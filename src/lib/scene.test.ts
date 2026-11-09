import { describe, expect, it } from "vitest";
import { plans } from "@/data/plans";
import { buildLayout } from "./plan";
import { sceneBoxes } from "./scene";

describe.each(plans)("$name scene", (plan) => {
  it("builds wall boxes with positive size inside the envelope", () => {
    const { solid, glass } = sceneBoxes(buildLayout(plan));
    expect(solid.length).toBeGreaterThan(10);
    expect(glass.length).toBe(plan.windows.length);
    for (const item of [...solid, ...glass]) {
      expect(item.width).toBeGreaterThan(0);
      expect(item.depth).toBeGreaterThan(0);
      expect(item.top).toBeGreaterThan(item.bottom);
      expect(item.x).toBeGreaterThanOrEqual(0);
      expect(item.x).toBeLessThanOrEqual(plan.width);
      expect(item.z).toBeGreaterThanOrEqual(0);
      expect(item.z).toBeLessThanOrEqual(plan.depth);
    }
  });
});
