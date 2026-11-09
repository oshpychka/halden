import { describe, expect, it } from "vitest";
import { parseShortlist, toggleSaved, updateSaved } from "./shortlist";

describe("shortlist", () => {
  it("parses valid entries and drops anything unexpected", () => {
    const raw = JSON.stringify([
      { slug: "14b", query: "?o=office&f=walnut" },
      { slug: "14b", query: "" },
      { slug: "99z", query: "" },
      { slug: "10a", query: "<script>" },
      { slug: "ph1", query: "", extra: true },
      "junk",
      null,
    ]);
    expect(parseShortlist(raw)).toEqual([
      { slug: "14b", query: "?o=office&f=walnut" },
      { slug: "ph1", query: "" },
    ]);
  });

  it("survives broken storage", () => {
    expect(parseShortlist("{not json")).toEqual([]);
    expect(parseShortlist(JSON.stringify({ slug: "14b" }))).toEqual([]);
    expect(parseShortlist(null)).toEqual([]);
  });

  it("toggles, caps and updates entries", () => {
    let list = toggleSaved([], { slug: "4a", query: "" });
    list = toggleSaved(list, { slug: "5a", query: "" });
    expect(list.map((item) => item.slug)).toEqual(["5a", "4a"]);
    expect(toggleSaved(list, { slug: "4a", query: "" })).toHaveLength(1);
    const full = ["4a", "5a", "6a", "7a", "8a", "9a", "10a"].reduce(
      (acc, slug) => toggleSaved(acc, { slug, query: "" }),
      list.slice(0, 0),
    );
    expect(full).toHaveLength(6);
    expect(
      updateSaved(list, { slug: "4a", query: "?f=walnut" })[1]!.query,
    ).toBe("?f=walnut");
  });
});
