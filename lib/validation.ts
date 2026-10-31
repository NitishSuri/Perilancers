/**
 * Contact form validation shared by the browser and the server action,
 * so both sides enforce exactly the same rules.
 */

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = {
  name: 100,
  email: 200,
  company: 120,
  messageMin: 20,
  messageMax: 5000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readContactForm(formData: FormData): ContactInput {
  const get = (key: keyof ContactInput) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    service: get("service"),
    budget: get("budget"),
    message: get("message"),
  };
}

export function validateContact(
  input: ContactInput,
  options: { services: string[]; budgets: string[] },
): ContactErrors {
  const errors: ContactErrors = {};

  if (input.name.length < 2) errors.name = "Please enter your name.";
  else if (input.name.length > LIMITS.name) errors.name = `Name must be under ${LIMITS.name} characters.`;

  if (!input.email) errors.email = "Please enter your email address.";
  else if (input.email.length > LIMITS.email || !EMAIL_RE.test(input.email))
    errors.email = "Please enter a valid email address.";

  if (input.company.length > LIMITS.company)
    errors.company = `Company must be under ${LIMITS.company} characters.`;

  if (!options.services.includes(input.service)) errors.service = "Please choose a service.";

  if (!options.budgets.includes(input.budget)) errors.budget = "Please choose a budget range.";

  if (input.message.length < LIMITS.messageMin)
    errors.message = `Please share a few more details (at least ${LIMITS.messageMin} characters).`;
  else if (input.message.length > LIMITS.messageMax)
    errors.message = `Please keep it under ${LIMITS.messageMax} characters.`;

  return errors;
}

/** Hidden marketing-attribution fields captured with each enquiry. */
export const TRACKING_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "referrer", "landing_page"] as const;

export function readTracking(formData: FormData): Record<(typeof TRACKING_FIELDS)[number], string> {
  const out = {} as Record<(typeof TRACKING_FIELDS)[number], string>;
  for (const key of TRACKING_FIELDS) {
    const value = formData.get(key);
    out[key] = typeof value === "string" ? value.trim().slice(0, 300) : "";
  }
  return out;
}
