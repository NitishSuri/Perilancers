"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, m } from "framer-motion";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { submitContact, type ContactResult } from "@/app/actions/contact";
import { LIMITS, TRACKING_FIELDS, readContactForm, validateContact, type ContactErrors } from "@/lib/validation";
import { buttonClass } from "./ui/ButtonLink";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-xl border bg-paper/60 px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-forest focus:bg-surface focus:ring-4 focus:ring-sage/10 focus:outline-none";

const selectArrow =
  "appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%2315120e%22%20stroke-width%3D%222.5%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10";

const FIELD_ORDER = ["name", "email", "company", "service", "budget", "message"] as const;

export function ContactForm({ services, budgets }: { services: string[]; budgets: string[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [result, setResult] = useState<ContactResult | null>(null);
  const [pending, startTransition] = useTransition();

  // Capture marketing attribution (UTM params, referrer, landing page) into hidden fields.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const params = new URLSearchParams(window.location.search);
    const stored = JSON.parse(sessionStorage.getItem("pl_attribution") || "null") as Record<string, string> | null;
    const attribution: Record<string, string> = stored ?? {
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      referrer: document.referrer,
      landing_page: window.location.pathname + window.location.search,
    };
    if (!stored) sessionStorage.setItem("pl_attribution", JSON.stringify(attribution));
    for (const key of TRACKING_FIELDS) {
      const input = form.elements.namedItem(key);
      if (input instanceof HTMLInputElement) input.value = attribution[key] ?? "";
    }
  }, []);

  function focusFirstError(errs: ContactErrors) {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const clientErrors = validateContact(readContactForm(formData), { services, budgets });
    setErrors(clientErrors);
    setResult(null);
    if (Object.keys(clientErrors).length > 0) {
      focusFirstError(clientErrors);
      return;
    }

    startTransition(async () => {
      try {
        const res = await submitContact(formData);
        setResult(res);
        if (res.ok) {
          // Keep attribution fields, clear the rest.
          for (const f of FIELD_ORDER) {
            const el = formRef.current?.elements.namedItem(f);
            if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)
              el.value = "";
          }
          setErrors({});
        } else {
          if (res.errors) {
            setErrors(res.errors);
            focusFirstError(res.errors);
          }
        }
      } catch {
        setResult({ ok: false, message: "Network error. Please check your connection and try again." });
      }
    });
  }

  const clearError = (field: keyof ContactErrors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const describedBy = (field: keyof ContactErrors) => (errors[field] ? `${field}-error` : undefined);

  const errorText = (field: keyof ContactErrors) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 text-sm font-medium text-danger">
        {errors[field]}
      </p>
    ) : null;

  const border = (field: keyof ContactErrors) => (errors[field] ? "border-danger" : "border-line");

  const label = "mb-1.5 block text-sm font-semibold";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="form-status"
      className="relative rounded-2xl border border-line bg-surface p-6 shadow-[0_20px_40px_-28px_rgba(61,43,31,0.35)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name <span className="text-forest" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            onChange={() => clearError("name")}
            className={cn(fieldClass, border("name"))}
            placeholder="Jane Smith"
          />
          {errorText("name")}
        </div>

        <div>
          <label htmlFor="email" className={label}>
            Email <span className="text-forest" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={LIMITS.email}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            onChange={() => clearError("email")}
            className={cn(fieldClass, border("email"))}
            placeholder="jane@company.com"
          />
          {errorText("email")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="company" className={label}>
            Company <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
            aria-invalid={!!errors.company}
            aria-describedby={describedBy("company")}
            onChange={() => clearError("company")}
            className={cn(fieldClass, border("company"))}
            placeholder="Acme Inc."
          />
          {errorText("company")}
        </div>

        <div>
          <label htmlFor="service" className={label}>
            Service needed <span className="text-forest" aria-hidden="true">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            aria-invalid={!!errors.service}
            aria-describedby={describedBy("service")}
            onChange={() => clearError("service")}
            className={cn(fieldClass, border("service"), selectArrow)}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errorText("service")}
        </div>

        <div>
          <label htmlFor="budget" className={label}>
            Budget (USD) <span className="text-forest" aria-hidden="true">*</span>
          </label>
          <select
            id="budget"
            name="budget"
            required
            defaultValue=""
            aria-invalid={!!errors.budget}
            aria-describedby={describedBy("budget")}
            onChange={() => clearError("budget")}
            className={cn(fieldClass, border("budget"), selectArrow)}
          >
            <option value="" disabled>
              Choose a range
            </option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {errorText("budget")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>
            Project details <span className="text-forest" aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            minLength={LIMITS.messageMin}
            maxLength={LIMITS.messageMax}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message")}
            onChange={() => clearError("message")}
            className={cn(fieldClass, border("message"), "resize-y")}
            placeholder="What are you building? Any goals, deadlines, or links we should see? Interested in an AI agent? Tell us the task."
          />
          {errorText("message")}
        </div>

        {/* Marketing attribution, filled in automatically */}
        {TRACKING_FIELDS.map((f) => (
          <input key={f} type="hidden" name={f} />
        ))}

        {/* Honeypot field for spam bots, hidden from people and screen readers */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <button type="submit" disabled={pending} className={buttonClass("primary", "mt-7 w-full py-3.5 text-base")}>
        {pending ? (
          <>
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </button>

      <div id="form-status" role="status" aria-live="polite" className="mt-4">
        <AnimatePresence mode="wait">
          {result && (
            <m.p
              key={result.message}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex items-start gap-2.5 rounded-xl border p-4 text-sm font-medium",
                result.ok ? "border-[#1f7a4d]/30 bg-[#1f7a4d]/10" : "border-danger/30 bg-danger/5",
              )}
            >
              {result.ok ? (
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-[#1f7a4d]" aria-hidden="true" />
              ) : (
                <CircleAlert className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden="true" />
              )}
              {result.message}
            </m.p>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-4 text-xs text-muted">
        We only use your details to reply to your enquiry. See our{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
