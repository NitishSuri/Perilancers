"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { buttonClass } from "./ui/ButtonLink";

/** Copies an email address to the clipboard, with a short confirmation. */
export function CopyEmailButton({ email, label }: { email: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); fall back to opening the email app.
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button type="button" onClick={copy} className={buttonClass("secondary", "px-5 py-3.5 text-base")}>
      {copied ? <Check className="size-4 text-green" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Copied!" : label}</span>
    </button>
  );
}
