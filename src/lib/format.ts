const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const number = new Intl.NumberFormat("en-US");

export function formatPrice(value: number): string {
  return usd.format(value);
}

export function formatCompactPrice(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  }
  return `$${Math.round(value / 1000)}K`;
}

export function formatArea(value: number): string {
  return `${number.format(value)} sq ft`;
}

export function formatFeet(value: number): string {
  const feet = Math.floor(value);
  const inches = Math.round((value - feet) * 12);
  return inches ? `${feet}′ ${inches}″` : `${feet}′`;
}

export function formatBedrooms(count: number): string {
  return count === 0 ? "Studio" : `${count} bed`;
}

export function formatBathrooms(count: number): string {
  return `${count} bath`;
}

export function formatDate(value: string): string {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}
