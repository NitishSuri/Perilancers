"use server";

import { Resend } from "resend";
import { budgetOptions, contactSection, serviceOptions, site } from "@/lib/content";
import { readContactForm, readTracking, validateContact, type ContactErrors, type ContactInput } from "@/lib/validation";

export type ContactResult =
  | { ok: true; message: string }
  | { ok: false; message: string; errors?: ContactErrors };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function buildEmail(input: ContactInput, tracking: Record<string, string>) {
  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Company", input.company || "Not provided"],
    ["Service", input.service],
    ["Budget (USD)", input.budget],
  ];

  const source: [string, string][] = Object.entries(tracking).filter(([, v]) => v);

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Project details:",
    input.message,
    ...(source.length ? ["", "Source:", ...source.map(([k, v]) => `${k}: ${v}`)] : []),
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111">
      <h2 style="margin:0 0 16px">New enquiry from ${escapeHtml(input.name)}</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#666;padding-right:16px"><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px">Project details</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(input.message)}</p>
      ${
        source.length
          ? `<h3 style="margin:24px 0 8px;color:#666;font-size:13px">Source</h3><p style="margin:0;color:#666;font-size:13px">${source
              .map(([k, v]) => `${k}: ${escapeHtml(v)}`)
              .join("<br>")}</p>`
          : ""
      }
    </div>`;

  return { text, html };
}

/** Appends the enquiry to the Google Sheet via its Apps Script web app (see scripts/google-sheets-contact.gs). */
async function sendToGoogleSheet(input: ContactInput, tracking: Record<string, string>): Promise<boolean> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_SECRET;
  if (!url || !secret) return false;

  try {
    const res = await fetch(url, {
      method: "POST",
      // Apps Script reads the raw body; text/plain avoids an extra CORS/preflight round trip.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, ...input, ...tracking }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!data?.ok) console.error("Contact form: Google Sheets error", res.status, data?.error);
    return Boolean(data?.ok);
  } catch (err) {
    console.error("Contact form: Google Sheets request failed", err);
    return false;
  }
}

/** Emails the enquiry to the official inbox via Resend (optional; needs a verified domain). */
async function sendEmailWithResend(input: ContactInput, tracking: Record<string, string>): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  // Enquiries go to the official inbox (work@perilancers.com) unless overridden.
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  // Sent from our own domain, which must be verified in Resend.
  const from = process.env.CONTACT_FROM_EMAIL || `Perilancers Website <noreply@${site.email.split("@")[1]}>`;
  const { text, html } = buildEmail(input, tracking);

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: to.split(",").map((e) => e.trim()).filter(Boolean),
      replyTo: input.email,
      subject: `New enquiry: ${input.service} from ${input.name}`,
      text,
      html,
    });
    if (error) console.error("Contact form: Resend error", error);
    return !error;
  } catch (err) {
    console.error("Contact form: Resend request failed", err);
    return false;
  }
}

export async function submitContact(formData: FormData): Promise<ContactResult> {
  // Honeypot: real users never see or fill this field. Pretend success for bots.
  if (formData.get("website")) {
    return { ok: true, message: contactSection.successMessage };
  }

  const input = readContactForm(formData);
  const errors = validateContact(input, { services: serviceOptions, budgets: budgetOptions });
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Please fix the highlighted fields.", errors };
  }

  const sheetsConfigured = Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL && process.env.GOOGLE_SHEETS_SECRET);
  const resendConfigured = Boolean(process.env.RESEND_API_KEY);
  if (!sheetsConfigured && !resendConfigured) {
    console.error("Contact form: no destination configured (set GOOGLE_SHEETS_* and/or RESEND_API_KEY).");
    return {
      ok: false,
      message: `Our contact form is temporarily unavailable. Please email us at ${site.email}.`,
    };
  }

  const tracking = readTracking(formData);
  // Send to every configured destination; the enquiry is safe if at least one succeeds.
  const results = await Promise.all([
    sheetsConfigured ? sendToGoogleSheet(input, tracking) : Promise.resolve(false),
    resendConfigured ? sendEmailWithResend(input, tracking) : Promise.resolve(false),
  ]);

  if (!results.some(Boolean)) {
    return { ok: false, message: contactSection.errorMessage };
  }
  return { ok: true, message: contactSection.successMessage };
}
