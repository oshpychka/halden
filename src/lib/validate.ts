export type RequestValues = {
  name: string;
  phone: string;
  email: string;
  contact: "phone" | "email" | "text";
  residence: string;
  comment: string;
  consent: boolean;
};

export type RequestErrors = Partial<Record<keyof RequestValues, string>>;

export function formatUsPhone(input: string): string {
  const digits = input.replace(/\D/g, "").replace(/^1/, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function validateRequest(values: RequestValues): RequestErrors {
  const errors: RequestErrors = {};
  const name = values.name.trim();
  if (name.length < 2) errors.name = "Enter your full name.";
  else if (name.length > 80) errors.name = "Keep the name under 80 characters.";
  if (values.phone.replace(/\D/g, "").length !== 10)
    errors.phone = "Enter a 10-digit US phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (values.comment.length > 1000)
    errors.comment = "Keep the message under 1,000 characters.";
  if (!values.consent) errors.consent = "Please agree so we can contact you.";
  return errors;
}
