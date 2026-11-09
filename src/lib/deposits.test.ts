import { describe, expect, it } from "vitest";
import {
  CLOSING,
  depositSchedule,
  isValidContractDate,
  scheduleIcs,
  TOPPING_OUT,
} from "./deposits";

describe("depositSchedule", () => {
  it("splits the price 10/10/10/70 and keeps the total exact", () => {
    const payments = depositSchedule(1_265_001, "2026-12-01");
    expect(payments.map((payment) => payment.amount)).toEqual([
      126_500, 126_500, 126_500, 885_501,
    ]);
    expect(payments.reduce((sum, payment) => sum + payment.amount, 0)).toBe(
      1_265_001,
    );
  });

  it("dates the payments from the contract and the milestones", () => {
    const payments = depositSchedule(1_000_000, "2026-12-01");
    expect(payments.map((payment) => payment.date)).toEqual([
      "2026-12-01",
      "2027-03-31",
      TOPPING_OUT,
      CLOSING,
    ]);
  });

  it("moves the topping-out deposit to signing when the structure is already topped out", () => {
    const payments = depositSchedule(1_000_000, "2027-10-01");
    expect(payments[2]!.date).toBe("2027-10-01");
  });

  it("validates contract dates", () => {
    expect(isValidContractDate("2026-12-01", "2026-11-09")).toBe(true);
    expect(isValidContractDate("2026-11-01", "2026-11-09")).toBe(false);
    expect(isValidContractDate("2028-06-01", "2026-11-09")).toBe(false);
    expect(isValidContractDate("12/01/2026", "2026-11-09")).toBe(false);
  });
});

describe("scheduleIcs", () => {
  it("builds a valid calendar with one all-day event per payment", () => {
    const ics = scheduleIcs(
      depositSchedule(1_000_000, "2026-12-01"),
      "Residence 14B",
      "14b",
      new Date("2026-11-09T10:00:00.000Z"),
    );
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(4);
    expect(ics).toContain("DTSTART;VALUE=DATE:20261201");
    expect(ics).toContain("DTEND;VALUE=DATE:20261202");
    expect(ics).toContain("DTSTAMP:20261109T100000Z");
    expect(ics).toContain("UID:14b-4@thehalden");
    expect(ics).toContain("10% of the purchase price\\, $100\\,000.");
  });
});
