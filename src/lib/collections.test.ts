import { describe, expect, it } from "vitest";
import { collections } from "@/data/collections";
import { collectionUnits } from "./collections";

describe("collections", () => {
  it.each(collections)("$slug has residences", (collection) => {
    expect(collectionUnits(collection.filter).length).toBeGreaterThan(0);
  });

  it("has unique slugs and descriptions within length", () => {
    expect(new Set(collections.map((item) => item.slug)).size).toBe(
      collections.length,
    );
    for (const item of collections) {
      expect(item.description.length).toBeGreaterThanOrEqual(70);
      expect(item.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("matches the expected counts", () => {
    const count = (slug: string) =>
      collectionUnits(collections.find((item) => item.slug === slug)!.filter)
        .length;
    expect(count("penthouses")).toBe(2);
    expect(count("studios")).toBe(6);
    expect(count("corner-residences")).toBe(32);
  });
});
