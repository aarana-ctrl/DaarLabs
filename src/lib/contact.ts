/**
 * Server-side contact delivery. Only ever imported from the server function,
 * so it may touch Node APIs — the client bundle gets `contact-shared.ts`.
 */
import {
  CONTACT_EMAIL,
  escapeHtml,
  validateContact,
  type ContactPayload,
  type ContactResult,
} from "./contact-shared";

export { CONTACT_EMAIL, validateContact };
export type { ContactPayload, ContactResult };

type Env = Record<string, string | undefined>;

let envCache: Env | null = null;

/**
 * Reads a server-side variable.
 *
 * `process.env` is the source of truth (that's what Vercel populates). In local
 * dev, Vite does not put `.env` values there, and depending on how the SSR
 * runtime is isolated, injecting them from vite.config isn't always visible
 * here — so fall back to parsing `.env` off disk once, and cache it.
 */
function readEnv(key: string): string | undefined {
  const fromProcess = typeof process !== "undefined" ? process.env?.[key] : undefined;
  if (fromProcess) return fromProcess;

  if (envCache === null) {
    envCache = {};
    try {
      // Node-only, and deliberately dynamic so bundlers don't hoist it.
      const req = eval("require") as NodeRequire;
      const { readFileSync } = req("node:fs") as typeof import("node:fs");
      const { resolve } = req("node:path") as typeof import("node:path");
      const raw = readFileSync(resolve(process.cwd(), ".env"), "utf8");
      for (const line of raw.split("\n")) {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
        if (!m) continue;
        let value = m[2].trim();
        // strip matching surrounding quotes
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        envCache[m[1]] = value;
      }
    } catch {
      /* no .env on disk — normal in production */
    }
  }
  return envCache[key];
}

/**
 * Validates and forwards a message to CONTACT_EMAIL through Resend.
 *
 * Configuration:
 *   RESEND_API_KEY  — from https://resend.com (the free tier is plenty)
 *   CONTACT_FROM    — a verified sender, e.g. "DaarLabs <hello@daarlabs.com>",
 *                     or "onboarding@resend.dev" while testing
 *
 * `fetchImpl` and `env` are injectable purely so this can be tested.
 */
export async function deliverMessage(
  data: ContactPayload,
  fetchImpl: typeof fetch = fetch,
  env?: Env,
): Promise<ContactResult> {
  const problem = validateContact(data);
  if (problem) return { ok: false, error: problem };

  const apiKey = env ? env.RESEND_API_KEY : readEnv("RESEND_API_KEY");
  const from =
    (env ? env.CONTACT_FROM : readEnv("CONTACT_FROM")) ?? "DaarLabs <onboarding@resend.dev>";

  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY is not set — message NOT delivered.\n" +
        "  Local dev: add it to .env in the project root and restart the dev server.\n" +
        "  Vercel:    add it under Settings → Environment Variables, then redeploy.",
    );
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
      // surface the real reason — a bad key or unverified sender is fixable
      const hint =
        res.status === 401 || res.status === 403
          ? "The email API key was rejected. Check RESEND_API_KEY."
          : "We couldn't send that just now. Please try again shortly.";
      return { ok: false, error: hint };
    }

    return { ok: true };
  } catch (err) {
    console.error("[contact] send failed", err);
    return { ok: false, error: "We couldn't send that just now. Please try again shortly." };
  }
}
