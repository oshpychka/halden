"use client";

import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import {
  CLOSING,
  depositSchedule,
  isValidContractDate,
  scheduleIcs,
} from "@/lib/deposits";
import { formatDate, formatPrice } from "@/lib/format";
import type { Unit } from "@/lib/types";
import { unitName } from "@/lib/units";

function today(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

const noop = () => () => {};

export function DepositPlanner({ unit, price }: { unit: Unit; price: number }) {
  const now = useSyncExternalStore(noop, today, () => "");
  const [contract, setContract] = useState("");
  const date = contract || now;
  const valid = date !== "" && isValidContractDate(date, now);
  const payments = valid ? depositSchedule(price, date) : [];
  const name = unitName(unit);

  function download() {
    const ics = scheduleIcs(payments, name, unit.slug, new Date());
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `the-halden-${unit.slug}-deposits.ics`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <Field
          id="contract-date"
          label="Contract date"
          hint="Deposits are paid into escrow."
          error={
            date && !valid
              ? "Choose a date from today until April 2028."
              : undefined
          }
        >
          <Input
            id="contract-date"
            type="date"
            value={date}
            min={now}
            max="2028-04-16"
            invalid={Boolean(date) && !valid}
            onChange={(event) => setContract(event.target.value)}
          />
        </Field>
        <p className="tabular mt-2 text-sm text-muted">
          Price as configured:{" "}
          <span className="text-ink">{formatPrice(price)}</span>
        </p>
      </div>
      <div className="lg:col-span-8">
        <ol className="tabular divide-y divide-line border-y border-line">
          {payments.map((payment) => (
            <li
              key={payment.label}
              className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 py-3 sm:grid-cols-[1fr_9rem_9rem]"
            >
              <span className="font-medium">
                {payment.label}
                <span className="ml-2 font-normal text-muted">
                  {payment.share}%
                </span>
              </span>
              <span className="text-right sm:order-last">
                {formatPrice(payment.amount)}
              </span>
              <span className="col-span-2 text-sm text-muted sm:col-span-1 sm:text-base sm:text-ink">
                {formatDate(payment.date)}
              </span>
            </li>
          ))}
        </ol>
        {payments.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted">
              Closing planned for {formatDate(CLOSING)}. Dates after topping out
              move with the building.
            </p>
            <Button
              variant="secondary"
              onClick={download}
              className="print:hidden"
            >
              <Icon name="calendar" size={18} />
              Add to calendar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
