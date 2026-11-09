import { describe, expect, it } from "vitest";
import { units } from "@/data/units";
import { elevationColumn, priceBand, priceBands } from "./facade";
import { getUnit } from "./units";

describe("facade", () => {
  it("places the north corner on the right of the bay elevation", () => {
    expect(elevationColumn(getUnit("10a")!)).toEqual({ index: 4, count: 5 });
    expect(elevationColumn(getUnit("10e")!)).toEqual({ index: 0, count: 5 });
    expect(elevationColumn(getUnit("ph1")!)).toEqual({ index: 1, count: 2 });
  });

  it("spreads residences over four price bands", () => {
    const bands = new Set(units.map(priceBand));
    expect([...bands].sort()).toEqual([0, 1, 2, 3]);
    const ranges = priceBands();
    expect(ranges).toHaveLength(4);
    expect(ranges[0]!.from).toBeLessThan(ranges[3]!.to);
  });
});
