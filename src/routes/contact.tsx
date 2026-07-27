import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteChrome";

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

function Contact() {
  return (
    <PageShell>
      <section className="max-w-[90rem] mx-auto px-6 md:px-12 py-16">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Get in Touch</p>
        <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-tight mb-6">Reach us.</h1>
        <p className="text-muted-foreground max-w-xl mb-16 leading-relaxed">
          Project inquiries, collaborations, or just a hello — the storm has a
          way of carrying signal further than you'd think.
        </p>

        <form className="grid gap-7 max-w-2xl">
          <label className="block">
            <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Name</span>
            <input
              type="text"
              className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground transition-colors"
            />
          </label>
          <label className="block">
            <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Email</span>
            <input
              type="email"
              className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground transition-colors"
            />
          </label>
          <label className="block">
            <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Message</span>
            <textarea
              rows={5}
              className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground transition-colors resize-none"
            />
          </label>
          <button
            type="button"
            className="mt-6 self-start px-8 py-3 bg-gold text-primary-foreground text-[11px] tracking-[0.3em] uppercase rounded-sm hover:bg-transparent hover:text-gold border border-gold transition-colors"
          >
            Send Signal
          </button>
        </form>

        <div className="mt-24 pt-12 border-t border-border grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Email</p>
            <a href="mailto:hello@daarlabs.com" className="font-serif text-xl hover:text-gold transition-colors">
              hello@daarlabs.com
            </a>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Location</p>
            <p className="font-serif text-xl">Somewhere in the storm.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
