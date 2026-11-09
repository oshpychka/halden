import type { WindowSpan } from "./types";

export const MIAMI = { latitude: 25.8003, longitude: -80.1873 };

const rad = (deg: number) => (deg * Math.PI) / 180;
const deg = (value: number) => (value * 180) / Math.PI;

export type SunPosition = { azimuth: number; altitude: number };

export function solarPosition(
  date: Date,
  latitude = MIAMI.latitude,
  longitude = MIAMI.longitude,
): SunPosition {
  const jd = date.getTime() / 86_400_000 + 2_440_587.5;
  const t = (jd - 2_451_545) / 36_525;
  const meanLong = (280.46646 + t * (36000.76983 + t * 0.0003032)) % 360;
  const meanAnom = 357.52911 + t * (35999.05029 - 0.0001537 * t);
  const ecc = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
  const center =
    Math.sin(rad(meanAnom)) * (1.914602 - t * (0.004817 + 0.000014 * t)) +
    Math.sin(rad(2 * meanAnom)) * (0.019993 - 0.000101 * t) +
    Math.sin(rad(3 * meanAnom)) * 0.000289;
  const omega = 125.04 - 1934.136 * t;
  const apparentLong =
    meanLong + center - 0.00569 - 0.00478 * Math.sin(rad(omega));
  const meanObliquity =
    23 +
    (26 + (21.448 - t * (46.815 + t * (0.00059 - t * 0.001813))) / 60) / 60;
  const obliquity = meanObliquity + 0.00256 * Math.cos(rad(omega));
  const declination = Math.asin(
    Math.sin(rad(obliquity)) * Math.sin(rad(apparentLong)),
  );
  const y = Math.tan(rad(obliquity / 2)) ** 2;
  const equationOfTime =
    4 *
    deg(
      y * Math.sin(2 * rad(meanLong)) -
        2 * ecc * Math.sin(rad(meanAnom)) +
        4 * ecc * y * Math.sin(rad(meanAnom)) * Math.cos(2 * rad(meanLong)) -
        0.5 * y * y * Math.sin(4 * rad(meanLong)) -
        1.25 * ecc * ecc * Math.sin(2 * rad(meanAnom)),
    );
  const minutes =
    date.getUTCHours() * 60 + date.getUTCMinutes() + date.getUTCSeconds() / 60;
  const solarTime =
    (((minutes + equationOfTime + 4 * longitude) % 1440) + 1440) % 1440;
  const hourAngle =
    solarTime / 4 < 0 ? solarTime / 4 + 180 : solarTime / 4 - 180;
  const lat = rad(latitude);
  const zenith = Math.acos(
    Math.min(
      1,
      Math.max(
        -1,
        Math.sin(lat) * Math.sin(declination) +
          Math.cos(lat) * Math.cos(declination) * Math.cos(rad(hourAngle)),
      ),
    ),
  );
  const cosAz =
    (Math.sin(lat) * Math.cos(zenith) - Math.sin(declination)) /
    (Math.cos(lat) * Math.sin(zenith));
  const azBase = deg(Math.acos(Math.min(1, Math.max(-1, cosAz))));
  const azimuth = hourAngle > 0 ? (azBase + 180) % 360 : (540 - azBase) % 360;
  return { azimuth, altitude: 90 - deg(zenith) };
}

function nthSunday(year: number, month: number, n: number): number {
  const first = new Date(Date.UTC(year, month, 1)).getUTCDay();
  return 1 + ((7 - first) % 7) + (n - 1) * 7;
}

export function miamiOffsetHours(isoDate: string): number {
  const [year, month, day] = isoDate.split("-").map(Number) as [
    number,
    number,
    number,
  ];
  const start = Date.UTC(year, 2, nthSunday(year, 2, 2));
  const end = Date.UTC(year, 10, nthSunday(year, 10, 1));
  const value = Date.UTC(year, month - 1, day);
  return value >= start && value < end ? -4 : -5;
}

export function miamiTime(isoDate: string, minutes: number): Date {
  const [year, month, day] = isoDate.split("-").map(Number) as [
    number,
    number,
    number,
  ];
  const offset = miamiOffsetHours(isoDate);
  return new Date(
    Date.UTC(year, month - 1, day, 0, minutes) - offset * 3_600_000,
  );
}

export const SIDE_AZIMUTH: Record<WindowSpan["side"], number> = {
  front: 90,
  left: 0,
  right: 180,
};

export function facesSun(side: WindowSpan["side"], sun: SunPosition): boolean {
  if (sun.altitude <= 2) return false;
  const diff = Math.abs(((sun.azimuth - SIDE_AZIMUTH[side] + 540) % 360) - 180);
  return diff < 85;
}

export function directSunMinutes(
  sides: WindowSpan["side"][],
  isoDate: string,
): number {
  const unique = [...new Set(sides)];
  let total = 0;
  for (let minute = 0; minute < 1440; minute += 5) {
    const sun = solarPosition(miamiTime(isoDate, minute));
    if (unique.some((side) => facesSun(side, sun))) total += 5;
  }
  return total;
}

export function sunVector(sun: SunPosition) {
  const az = rad(sun.azimuth);
  const alt = rad(sun.altitude);
  return {
    x: -Math.cos(az) * Math.cos(alt),
    y: Math.sin(alt),
    z: -Math.sin(az) * Math.cos(alt),
  };
}
