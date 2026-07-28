/**
 * Contact-form delivery. Kept free of framework imports so it can be reasoned
 * about — and tested — on its own; `send-message.ts` is the thin server-fn
 * wrapper that calls into this.
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

type Env = { RESEND_API_KEY?: string; CONTACT_FROM?: string };

/**
 * Validates and forwards a message to CONTACT_EMAIL through Resend.
 *
 * Requires two environment variables:
 *   RESEND_API_KEY  — from https://resend.com (the free tier is plenty)
 *   CONTACT_FROM    — a verified sender, e.g. "DaarLabs <hello@daarlabs.com>",
 *                     or "onboarding@resend.dev" while testing
 *
 * Without them it fails loudly rather than silently dropping mail, so a
 * misconfigured deploy is obvious instead of quietly losing messages.
 *
 * `fetchImpl` and `env` are injectable purely so this can be tested.
 */
export async function deliverMessage(
  data: ContactPayload,
  fetchImpl: typeof fetch = fetch,
  env: Env = process.env as Env,
): Promise<ContactResult> {
  const problem = validateContact(data);
  if (problem) return { ok: false, error: problem };

  const apiKey = env.RESEND_API_KEY;
  const from = env.CONTACT_FROM ?? "DaarLabs <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — message not delivered", {
      from: data.email,
    });
    return {
      ok: false,
      error: "Email isn't configured on the server yet. Please write to us directly.",
    };
  }

  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  try {
    const res = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `DaarLabs — new message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}\n`,
        html:
          `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>` +
          `<hr /><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] Resend rejected the message", res.status, detail);
      return { ok: false, error: "We couldn't send that just now. Please try again shortly." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[contact] send failed", err);
    return { ok: false, error: "We couldn't send that just now. Please try again shortly." };
  }
}
