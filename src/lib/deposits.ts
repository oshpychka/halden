export const TOPPING_OUT = "2027-08-16";
export const CLOSING = "2028-06-15";

export type Payment = {
  label: string;
  share: number;
  amount: number;
  date: string;
};

function addDays(iso: string, days: number): string {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function later(a: string, b: string): string {
  return a > b ? a : b;
}

export function isValidContractDate(iso: string, today: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(iso) &&
    iso >= today &&
    iso <= addDays(CLOSING, -60)
  );
}

export function depositSchedule(
  price: number,
  contractDate: string,
): Payment[] {
  const tenth = Math.round(price * 0.1);
  return [
    { label: "Contract deposit", share: 10, amount: tenth, date: contractDate },
    {
      label: "Second deposit",
      share: 10,
      amount: tenth,
      date: addDays(contractDate, 120),
    },
    {
      label: "Topping-out deposit",
      share: 10,
      amount: tenth,
      date: later(TOPPING_OUT, contractDate),
    },
    {
      label: "Balance at closing",
      share: 70,
      amount: price - tenth * 3,
      date: CLOSING,
    },
  ];
}

function escapeText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/[,;]/g, (match) => `\\${match}`)
    .replace(/\n/g, "\\n");
}

function compact(iso: string): string {
  return iso.replaceAll("-", "");
}

export function scheduleIcs(
  payments: Payment[],
  residence: string,
  slug: string,
  stamp: Date,
): string {
  const dtstamp = stamp
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const events = payments.flatMap((payment, index) => [
    "BEGIN:VEVENT",
    `UID:${slug}-${index + 1}@thehalden`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;VALUE=DATE:${compact(payment.date)}`,
    `DTEND;VALUE=DATE:${compact(addDays(payment.date, 1))}`,
    `SUMMARY:${escapeText(`${residence}: ${payment.label}`)}`,
    `DESCRIPTION:${escapeText(`${payment.share}% of the purchase price, $${payment.amount.toLocaleString("en-US")}.`)}`,
    "END:VEVENT",
  ]);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Halden//Deposit schedule//EN",
    "CALSCALE:GREGORIAN",
    ...events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
