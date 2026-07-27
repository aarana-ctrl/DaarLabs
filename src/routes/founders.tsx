import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteChrome";

export const Route = createFileRoute("/founders")({
  head: () => ({
    meta: [
      { title: "Founders — DaarLabs" },
      { name: "description", content: "Meet the founders of DaarLabs." },
      { property: "og:title", content: "Founders — DaarLabs" },
      { property: "og:description", content: "Meet the founders of DaarLabs." },
    ],
  }),
  component: Founders,
});

function Founders() {
  return (
    <PageShell>
      <section className="max-w-[90rem] mx-auto px-6 md:px-12 py-16">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">The Architects</p>
        <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-tight mb-16">
          Founders
        </h1>

        <div className="grid lg:grid-cols-[minmax(18rem,1fr)_1.6fr] gap-12 lg:gap-20 items-start">
          <div className="relative">
            <div className="absolute -top-3 -left-3 w-20 h-20 border-t border-l border-gold/40" />
            <div className="aspect-[4/5] w-full bg-gradient-to-br from-card to-muted rounded-sm relative overflow-hidden ring-1 ring-border">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.78_0.13_82/0.12),transparent_60%)]" />
              <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Portrait / Placeholder
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b border-r border-gold/40" />
          </div>

          <div>
            <h2 className="font-serif text-3xl md:text-5xl mb-2">Founder Name</h2>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-8">
              Founder &amp; Chief Visionary
            </p>
            <div className="space-y-6 text-muted-foreground leading-relaxed max-w-[58ch] text-pretty">
              <p>
                DaarLabs began with a simple conviction: the most valuable
                products live on the other side of the things people are
                afraid to try. Daar — fear — was never the obstacle. It was
                the map.
              </p>
              <p>
                The studio builds apps and services with that lens: small,
                sharp teams, ambitious problems, and the patience to sit with
                a hard question until it opens.
              </p>
              <p>
                Full bio, background, and links coming soon.
              </p>
            </div>
            <div className="mt-12 flex gap-6 text-[10px] tracking-[0.3em] uppercase">
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">LinkedIn</a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">Email</a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
