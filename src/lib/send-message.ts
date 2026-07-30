import { createServerFn } from "@tanstack/react-start";
import { deliverMessage } from "./contact";
import type { ContactPayload, ContactResult } from "./contact-shared";

/**
 * Server-side handler for the contact form. Runs only on the server, so the
 * Resend API key never reaches the browser.
 */
export const sendMessage = createServerFn({ method: "POST" })
  .inputValidator((data: ContactPayload) => data)
  .handler(async ({ data }): Promise<ContactResult> => deliverMessage(data));
