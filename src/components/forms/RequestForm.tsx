"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { units } from "@/data/units";
import { planOf, unitName } from "@/lib/units";
import {
  formatUsPhone,
  validateRequest,
  type RequestErrors,
  type RequestValues,
} from "@/lib/validate";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Input, Textarea } from "@/components/ui/Input";
import { Segmented } from "@/components/ui/Segmented";
import { Select } from "@/components/ui/Select";

const residenceOptions = [
  { value: "", label: "Not decided yet" },
  ...units
    .filter((unit) => unit.status !== "sold")
    .map((unit) => ({
      value: unit.slug,
      label: `${unitName(unit)}, ${planOf(unit).name}`,
    })),
];

const contactOptions = [
  { value: "phone" as const, label: "Call" },
  { value: "text" as const, label: "Text" },
  { value: "email" as const, label: "Email" },
];

type RequestFormProps = {
  residence?: string;
  configuration?: string;
};

export function RequestForm({
  residence = "",
  configuration,
}: RequestFormProps) {
  const prefix = useId();
  const id = (field: string) => `${prefix}-${field}`;
  const empty: RequestValues = {
    name: "",
    phone: "",
    email: "",
    contact: "phone",
    residence,
    comment: "",
    consent: false,
  };
  const [values, setValues] = useState<RequestValues>(empty);
  const [errors, setErrors] = useState<RequestErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  function update<K extends keyof RequestValues>(
    key: K,
    value: RequestValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state !== "idle") return;
    const found = validateRequest(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }
    setState("sending");
    setTimeout(() => setState("sent"), 700);
  }

  if (state === "sent") {
    const firstName = values.name.trim().split(/\s+/)[0];
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <p className="font-display text-3xl">Thank you, {firstName}.</p>
        <p className="max-w-prose text-muted">
          A residence advisor will contact you within one business day to
          arrange a private presentation at the sales gallery or by video.
        </p>
        <Button
          variant="ghost"
          onClick={() => {
            setValues(empty);
            setState("idle");
          }}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="grid gap-x-6 gap-y-2 sm:grid-cols-2"
    >
      <Field id={id("name")} label="Full name" error={errors.name}>
        <Input
          id={id("name")}
          autoComplete="name"
          value={values.name}
          invalid={!!errors.name}
          onChange={(event) => update("name", event.target.value)}
        />
      </Field>
      <Field id={id("phone")} label="Phone" error={errors.phone}>
        <Input
          id={id("phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(305) 555-0100"
          value={values.phone}
          invalid={!!errors.phone}
          onChange={(event) =>
            update("phone", formatUsPhone(event.target.value))
          }
        />
      </Field>
      <Field id={id("email")} label="Email" error={errors.email}>
        <Input
          id={id("email")}
          type="email"
          autoComplete="email"
          value={values.email}
          invalid={!!errors.email}
          onChange={(event) => update("email", event.target.value)}
        />
      </Field>
      <Field id={id("residence")} label="Residence" optional>
        <Select
          id={id("residence")}
          value={values.residence}
          options={residenceOptions}
          onChange={(value) => update("residence", value)}
        />
      </Field>
      <div className="flex flex-col gap-1.5 pb-7 sm:col-span-2">
        <span className="text-sm font-medium">Preferred contact</span>
        <Segmented
          label="Preferred contact"
          value={values.contact}
          options={contactOptions}
          onChange={(value) => update("contact", value)}
          className="w-full sm:w-auto sm:self-start"
        />
      </div>
      {configuration && (
        <div className="mb-7 rounded-xl bg-bay-tint px-4 py-3 text-sm sm:col-span-2">
          <span className="font-medium">Your configuration: </span>
          <span className="text-muted">{configuration}</span>
        </div>
      )}
      <div className="sm:col-span-2">
        <Field
          id={id("comment")}
          label="Message"
          optional
          error={errors.comment}
        >
          <Textarea
            id={id("comment")}
            rows={3}
            maxLength={1000}
            value={values.comment}
            invalid={!!errors.comment}
            onChange={(event) => update("comment", event.target.value)}
          />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Checkbox
          id={id("consent")}
          checked={values.consent}
          invalid={!!errors.consent}
          aria-describedby={`${id("consent")}-message`}
          onChange={(event) => update("consent", event.target.checked)}
          label={
            <>
              I agree to be contacted about The Halden. See the{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-bay"
              >
                privacy notice
              </Link>
              .
            </>
          }
        />
        <p
          id={`${id("consent")}-message`}
          className="min-h-5 text-sm text-error"
          aria-live="polite"
        >
          {errors.consent ?? ""}
        </p>
      </div>
      <div className="pt-2 sm:col-span-2">
        <Button
          type="submit"
          variant="accent"
          disabled={state === "sending"}
          className="w-full sm:w-auto"
        >
          {state === "sending" ? "Sending" : "Request a presentation"}
        </Button>
      </div>
    </form>
  );
}
