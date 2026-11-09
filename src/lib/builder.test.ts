import { describe, expect, it } from "vitest";
import {
  builderQuery,
  emptyNeeds,
  matchUnits,
  parseBuilder,
  PENTHOUSE,
} from "./builder";

const parse = (query: string) => parseBuilder(new URLSearchParams(query));

describe("builder url", () => {
  it("defaults to the guided first step", () => {
    const state = parse("");
    expect(state.mode).toBe("guided");
    expect(state.step).toBe(1);
    expect(state.needs).toEqual(emptyNeeds);
    expect(state.unit).toBeNull();
    expect(builderQuery(state)).toBe("?mode=guided&step=1");
  });

  it("round-trips a guided configuration", () => {
    const query =
      "?mode=guided&step=3&beds=2&budget=1500000&view=bay&terrace=1&unit=15b&o=office&f=walnut";
    const state = parse(query.slice(1));
    expect(state.unit).toBe("15b");
    expect(state.config).toEqual({ options: ["office"], finish: "walnut" });
    expect(builderQuery(state)).toBe(query);
  });

  it("round-trips a custom layout and clamps the step", () => {
    const state = parse("mode=custom&step=9&p=the-key&r=lv-0-0-20-15");
    expect(state.mode).toBe("custom");
    expect(state.step).toBe(3);
    expect(state.rooms).toHaveLength(1);
    expect(builderQuery(state)).toBe(
      "?mode=custom&step=3&p=the-key&r=lv-0-0-20-15",
    );
  });

  it("starts a custom shell from its plan when no rooms are given", () => {
    const state = parse("mode=custom&p=the-mooring");
    expect(state.rooms.length).toBeGreaterThan(3);
    expect(parse("mode=custom&p=the-mooring&r=").rooms).toHaveLength(0);
  });

  it("ignores bad values", () => {
    const state = parse("beds=9&budget=7&view=moon&unit=99z&o=office");
    expect(state.needs).toEqual(emptyNeeds);
    expect(state.unit).toBeNull();
  });
});

describe("matching", () => {
  it("finds residences by bedrooms, budget, view and terrace", () => {
    const { units, relaxed } = matchUnits({
      beds: 1,
      budget: 1_500_000,
      view: "bay",
      terrace: true,
    });
    expect(relaxed).toBe(false);
    expect(units.length).toBeGreaterThan(0);
    expect(
      units.every(
        (unit) =>
          unit.status !== "sold" && unit.price <= 1_500_000 && unit.balcony,
      ),
    ).toBe(true);
  });

  it("returns only penthouses for the penthouse choice", () => {
    const { units } = matchUnits({ ...emptyNeeds, beds: PENTHOUSE });
    expect(units.map((unit) => unit.plan)).toEqual(
      units.map(() => "the-penthouse"),
    );
    const threeBeds = matchUnits({ ...emptyNeeds, beds: 3 }).units;
    expect(threeBeds.some((unit) => unit.plan === "the-penthouse")).toBe(false);
  });

  it("relaxes budget and view when nothing matches", () => {
    const { units, relaxed } = matchUnits({
      beds: 3,
      budget: 1_000_000,
      view: "bay",
      terrace: false,
    });
    expect(relaxed).toBe(true);
    expect(units.length).toBeGreaterThan(0);
  });
});
