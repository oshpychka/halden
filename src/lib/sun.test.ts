import { describe, expect, it } from "vitest";
import {
  directSunMinutes,
  facesSun,
  miamiOffsetHours,
  miamiTime,
  solarPosition,
  sunVector,
} from "./sun";

describe("miami time", () => {
  it("switches between EST and EDT on the US rules", () => {
    expect(miamiOffsetHours("2026-03-07")).toBe(-5);
    expect(miamiOffsetHours("2026-03-08")).toBe(-4);
    expect(miamiOffsetHours("2026-10-31")).toBe(-4);
    expect(miamiOffsetHours("2026-11-01")).toBe(-5);
    expect(miamiTime("2026-06-21", 12 * 60).toISOString()).toBe(
      "2026-06-21T16:00:00.000Z",
    );
    expect(miamiTime("2026-12-21", 12 * 60).toISOString()).toBe(
      "2026-12-21T17:00:00.000Z",
    );
  });
});

describe("solarPosition", () => {
  it("matches the solstice noon altitudes for Miami", () => {
    const summer = solarPosition(miamiTime("2026-06-21", 13 * 60 + 29));
    expect(summer.altitude).toBeGreaterThan(87);
    expect(summer.altitude).toBeLessThan(88.5);
    const winter = solarPosition(miamiTime("2026-12-21", 12 * 60 + 23));
    expect(winter.altitude).toBeGreaterThan(40.3);
    expect(winter.altitude).toBeLessThan(41.2);
    expect(winter.azimuth).toBeGreaterThan(175);
    expect(winter.azimuth).toBeLessThan(185);
  });

  it("rises north of east in June and south of east in December", () => {
    const june = solarPosition(miamiTime("2026-06-21", 7 * 60));
    expect(june.azimuth).toBeGreaterThan(60);
    expect(june.azimuth).toBeLessThan(70);
    const december = solarPosition(miamiTime("2026-12-21", 8 * 60));
    expect(december.azimuth).toBeGreaterThan(115);
    expect(december.azimuth).toBeLessThan(125);
  });

  it("is below the horizon at midnight", () => {
    expect(solarPosition(miamiTime("2026-06-21", 0)).altitude).toBeLessThan(0);
  });
});

describe("exposure", () => {
  it("gives east windows morning sun only", () => {
    const morning = solarPosition(miamiTime("2026-09-22", 9 * 60));
    const evening = solarPosition(miamiTime("2026-09-22", 17 * 60));
    expect(facesSun("front", morning)).toBe(true);
    expect(facesSun("front", evening)).toBe(false);
  });

  it("adds hours for a south corner in winter", () => {
    const east = directSunMinutes(["front"], "2026-12-21");
    const corner = directSunMinutes(["front", "right"], "2026-12-21");
    expect(east).toBeGreaterThan(4 * 60);
    expect(corner).toBeGreaterThan(east + 2 * 60);
  });

  it("points the light vector up and toward the sun", () => {
    const vector = sunVector({ azimuth: 90, altitude: 30 });
    expect(vector.y).toBeCloseTo(0.5);
    expect(vector.z).toBeCloseTo(-Math.cos(Math.PI / 6));
    expect(vector.x).toBeCloseTo(0);
  });
});
