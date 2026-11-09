import { describe, expect, it } from "vitest";
import { plans } from "@/data/plans";
import { units } from "@/data/units";
import { configuredPrice, getUnit, unitName, unitSummary } from "./units";

describe("units data", () => {
  it("keeps stable slugs", () => {
    const expected = [
      ...Array.from({ length: 16 }, (_, index) =>
        ["a", "b", "c", "d", "e"].map((stack) => `${index + 4}${stack}`),
      ).flat(),
      "ph1",
      "ph2",
    ];
    expect(units.map((unit) => unit.slug)).toEqual(expected);
  });

  it("references existing plans and uses every plan", () => {
    const slugs = plans.map((plan) => plan.slug);
    expect(units.every((unit) => slugs.includes(unit.plan))).toBe(true);
    expect(new Set(units.map((unit) => unit.plan)).size).toBe(plans.length);
  });

  it("names residences and penthouses", () => {
    expect(unitName(getUnit("14b")!)).toBe("Residence 14B");
    expect(unitName(getUnit("ph2")!)).toBe("Penthouse 2");
  });
});

describe("pricing", () => {
  const unit = getUnit("14d")!;

  it("adds option prices and finish cost per square foot", () => {
    const base = configuredPrice(unit, { options: [], finish: "shell" });
    expect(base).toBe(unit.price);
    expect(
      configuredPrice(unit, { options: ["double-vanity"], finish: "shell" }),
    ).toBe(base + 16000);
    expect(configuredPrice(unit, { options: [], finish: "walnut" })).toBe(
      base + 54 * 1240,
    );
  });

  it("ignores unknown options", () => {
    expect(
      configuredPrice(unit, { options: ["helipad"], finish: "nope" }),
    ).toBe(unit.price);
  });

  it("updates room counts with options", () => {
    const point = getUnit("10a")!;
    expect(unitSummary(point).bedrooms).toBe(2);
    expect(
      unitSummary(point, { options: ["third-bedroom"], finish: "shell" })
        .bedrooms,
    ).toBe(3);
  });
});
