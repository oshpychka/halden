import { describe, expect, it } from "vitest";
import { formatUsPhone, validateRequest, type RequestValues } from "./validate";

const valid: RequestValues = {
  name: "Maya Lindgren",
  phone: "(305) 555-0187",
  email: "maya@example.com",
  contact: "phone",
  residence: "14b",
  comment: "",
  consent: true,
};

describe("formatUsPhone", () => {
  it("formats progressively and drops the country code", () => {
    expect(formatUsPhone("305")).toBe("305");
    expect(formatUsPhone("3055")).toBe("(305) 5");
    expect(formatUsPhone("+1 305 555 0187 99")).toBe("(305) 555-0187");
  });
});

describe("validateRequest", () => {
  it("accepts a complete request", () => {
    expect(validateRequest(valid)).toEqual({});
  });

  it("flags every invalid field", () => {
    const errors = validateRequest({
      ...valid,
      name: " ",
      phone: "555",
      email: "maya@",
      comment: "x".repeat(1001),
      consent: false,
    });
    expect(Object.keys(errors).sort()).toEqual([
      "comment",
      "consent",
      "email",
      "name",
      "phone",
    ]);
  });

  it("treats markup as plain text", () => {
    expect(
      validateRequest({ ...valid, name: "<script>alert(1)</script>" }),
    ).toEqual({});
  });
});
