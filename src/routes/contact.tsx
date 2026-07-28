import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageShell } from "@/components/SiteChrome";
import { sendMessage, CONTACT_EMAIL, type ContactResult } from "@/lib/send-message";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — DaarLabs" },
      { name: "description", content: "Get in touch with DaarLabs." },
      { property: "og:title", content: "Contact — DaarLabs" },
      { property: "og:description", content: "Get in touch with DaarLabs." },
    ],
  }),
  component: Contact,
});

type Status = "idle" | "sending" | "sent" | "error";

function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const result: ContactResult = await sendMessage({
        data: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          message: String(fd.get("message") ?? ""),
          company: String(fd.get("company") ?? ""),
        },
      });

      if (result.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(result.error);
      }
    } catch {
      setStatus("error");
      setError("Something went wrong on our end. Please try again.");
    }
  }

  const busy = status === "sending";

  return (
    <PageShell>
      <section className="max-w-[90rem] mx-auto px-6 md:px-12 py-16">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Get in Touch</p>
        <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-tight mb-6">
          Reach us.
        </h1>
        <p className="text-muted-foreground max-w-xl mb-16 leading-relaxed">
          Project inquiries, collaborations, or just a hello — the storm has a way of carrying
          signal further than you'd think.
        </p>

        <form className="grid gap-7 max-w-2xl" onSubmit={onSubmit} noValidate>
          <label className="block">
            <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Name
            </span>
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              disabled={busy}
              className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground transition-colors disabled:opacity-50"
            />
          </label>

          <label className="block">
            <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={busy}
              className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground transition-colors disabled:opacity-50"
            />
          </label>

          <label className="block">
            <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Message
            </span>
            <textarea
              name="message"
              rows={5}
              required
              disabled={busy}
              className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground transition-colors resize-none disabled:opacity-50"
            />
          </label>

          {/* honeypot — hidden from people, catches bots */}
          <input
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="hidden"
          />

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <button
              type="submit"
              disabled={busy}
              className="px-8 py-3 bg-gold text-primary-foreground text-[11px] tracking-[0.3em] uppercase rounded-sm hover:bg-transparent hover:text-gold border border-gold transition-colors disabled:opacity-60"
            >
              {busy ? "Sending…" : "Send Signal"}
            </button>

            {status === "sent" && (
              <p role="status" className="text-sm text-gold">
                Signal received — we'll be in touch.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        </form>

        <div className="mt-24 pt-12 border-t border-border grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Email
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-serif text-xl hover:text-gold transition-colors break-all"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Location
            </p>
            <p className="font-serif text-xl">Somewhere in the storm.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
