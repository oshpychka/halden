import { describe, expect, it } from "vitest";
import { getPlan } from "@/data/plans";
import { units } from "@/data/units";
import {
  configurationQuery,
  describeConfiguration,
  parseConfiguration,
} from "./config";
import {
  applyFilters,
  defaultFilters,
  filtersQuery,
  parseFilters,
} from "./filters";
import { formatCompactPrice, formatFeet, formatPrice } from "./format";

describe("filters", () => {
  it("round-trips through the query string", () => {
    const filters = {
      ...defaultFilters,
      bedrooms: [2, 1],
      balcony: true,
      views: ["bay" as const],
      floorMin: 10,
      priceMax: 1_500_000,
      sort: "price-asc" as const,
    };
    const query = filtersQuery(filters);
    expect(query).toBe(
      "?beds=1,2&terrace=1&view=bay&floor-min=10&price-max=1500000&sort=price-asc",
    );
    const parsed = parseFilters(new URLSearchParams(query.slice(1)));
    expect(parsed).toEqual({ ...filters, bedrooms: [1, 2] });
  });

  it("returns an empty query for defaults and ignores junk", () => {
    expect(filtersQuery(defaultFilters)).toBe("");
    const parsed = parseFilters(
      new URLSearchParams(
        "beds=9,x&view=moon&floor-min=99&sort=random&status=gone",
      ),
    );
    expect(parsed.bedrooms).toEqual([]);
    expect(parsed.views).toEqual([]);
    expect(parsed.floorMin).toBe(20);
    expect(parsed.floorMax).toBe(20);
    expect(parsed.sort).toBe("floor");
    expect(parsed.status).toEqual([]);
  });

  it("filters and sorts residences", () => {
    const result = applyFilters(units, {
      ...defaultFilters,
      bedrooms: [0],
      status: ["available", "reserved", "sold"],
      sort: "price-desc",
    });
    expect(result).toHaveLength(6);
    expect(result.every((unit) => unit.plan === "the-inlet")).toBe(true);
    expect(result[0]!.floor).toBe(9);
    const hidden = applyFilters(units, defaultFilters);
    expect(hidden.some((unit) => unit.status === "sold")).toBe(false);
  });
});

describe("configuration", () => {
  const plan = getPlan("the-point")!;

  it("parses, drops unknown values and serializes in stable order", () => {
    const config = parseConfiguration(
      new URLSearchParams("o=third-bedroom,helipad,double-vanity&f=walnut"),
      plan,
    );
    expect(config).toEqual({
      options: ["third-bedroom", "double-vanity"],
      finish: "walnut",
    });
    expect(configurationQuery(config)).toBe(
      "?o=double-vanity,third-bedroom&f=walnut",
    );
    expect(configurationQuery({ options: [], finish: "shell" })).toBe("");
    expect(parseConfiguration(new URLSearchParams("f=gold"), plan).finish).toBe(
      "shell",
    );
  });

  it("describes a configuration for the request form", () => {
    expect(
      describeConfiguration(plan, {
        options: ["third-bedroom"],
        finish: "travertine",
      }),
    ).toBe("Study as bedroom 3, Travertine finish");
  });
});

describe("format", () => {
  it("formats prices and feet", () => {
    expect(formatPrice(1265000)).toBe("$1,265,000");
    expect(formatCompactPrice(1240000)).toBe("$1.24M");
    expect(formatCompactPrice(2000000)).toBe("$2M");
    expect(formatCompactPrice(795000)).toBe("$795K");
    expect(formatFeet(12.5)).toBe("12′ 6″");
    expect(formatFeet(15)).toBe("15′");
  });
});
