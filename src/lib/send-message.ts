import { createServerFn } from "@tanstack/react-start";
import { deliverMessage, type ContactPayload, type ContactResult } from "./contact";

export { CONTACT_EMAIL } from "./contact";
export type { ContactPayload, ContactResult } from "./contact";

/**
 * Server-side handler for the contact form. Runs only on the server, so the
 * Resend API key never reaches the browser.
 */
export const sendMessage = createServerFn({ method: "POST" })
  .inputValidator((data: ContactPayload) => data)
  .handler(async ({ data }): Promise<ContactResult> => deliverMessage(data));
