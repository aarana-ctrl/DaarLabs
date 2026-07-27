import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteChrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — DaarLabs" },
      { name: "description", content: "How DaarLabs handles your data." },
      { property: "og:title", content: "Privacy Policy — DaarLabs" },
      { property: "og:description", content: "How DaarLabs handles your data." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <PageShell>
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Legal</p>
        <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight mb-6">Privacy Policy</h1>
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-16">
          Last updated — placeholder
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">1. Overview</h2>
            <p>
              This is a placeholder privacy policy for DaarLabs. Replace this
              content with your finalized legal text before publishing to
              customers.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">2. Information we collect</h2>
            <p>
              We only collect information necessary to operate our apps and
              services. Specific categories will be listed here.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">3. How we use information</h2>
            <p>
              Information is used to deliver, maintain, and improve our
              products, and to communicate with you when required.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">4. Sharing</h2>
            <p>
              We do not sell personal data. Details on any limited sharing with
              service providers will appear here.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-foreground mb-3">5. Contact</h2>
            <p>
              Questions about this policy can be sent to hello@daarlabs.com.
            </p>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
