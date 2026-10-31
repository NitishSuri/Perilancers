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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return {
      ok: false,
      message: `Our contact form is temporarily unavailable. Please email us at ${site.email}.`,
    };
  }

  const { text, html } = buildEmail(input, readTracking(formData));

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Perilancers Website <onboarding@resend.dev>",
      to: to.split(",").map((e) => e.trim()).filter(Boolean),
      replyTo: input.email,
      subject: `New enquiry: ${input.service} from ${input.name}`,
      text,
      html,
    });

    if (error) {
      console.error("Contact form: Resend error", error);
      return { ok: false, message: contactSection.errorMessage };
    }
  } catch (err) {
    console.error("Contact form: unexpected error", err);
    return { ok: false, message: contactSection.errorMessage };
  }

  return { ok: true, message: contactSection.successMessage };
}
