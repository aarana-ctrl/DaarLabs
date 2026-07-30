/**
 * Contact types and pure helpers. Safe to import from client code — this file
 * must never pull in anything Node-only, since the contact route bundles it.
 */

/** Every message from the contact form lands here. */
export const CONTACT_EMAIL = "Labs.daar@gmail.com";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  /** Honeypot — real people never fill this in. */
  company?: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns an error message, or null when the payload is good. */
export function validateContact(input: ContactPayload): string | null {
  if (input.company) return "Rejected."; // bot tripped the honeypot
  if (!input.name?.trim()) return "Please add your name.";
  if (!EMAIL_RE.test(input.email?.trim() ?? "")) return "That email address doesn't look right.";
  if (!input.message?.trim()) return "Please add a message.";
  if (input.message.length > 5000) return "That message is a little too long.";
  return null;
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
