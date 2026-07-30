import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteChrome";
import { CONTACT_EMAIL } from "@/lib/contact-shared";
import { projects } from "@/lib/projects-data";

export const Route = createFileRoute("/founders")({
  head: () => ({
    meta: [
      { title: "Founders — DaarLabs" },
      { name: "description", content: "Aaditya Rana, founder of DaarLabs." },
      { property: "og:title", content: "Founders — DaarLabs" },
      { property: "og:description", content: "Aaditya Rana, founder of DaarLabs." },
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
            <div className="aspect-[4/5] w-full bg-card rounded-sm relative overflow-hidden ring-1 ring-border">
              <img
                src="/founders/aaditya-rana.jpg"
                alt="Aaditya Rana"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* keeps the portrait sitting in the site's palette rather than
                  glowing against the dark page */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.14_0.01_260/0.45),transparent_55%)]"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b border-r border-gold/40" />
          </div>

          <div>
            <h2 className="font-serif text-3xl md:text-5xl mb-2">Aaditya Rana</h2>
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
              <a
                href="https://www.linkedin.com/in/aaditya-rana-37868722b/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted-foreground hover:text-gold transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/aarana-ctrl"
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted-foreground hover:text-gold transition-colors"
              >
                GitHub
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-muted-foreground hover:text-gold transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Built so far — each row opens that project's page */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-12 pb-32">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-8">Built So Far</p>
        <ul className="border-t border-border">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10 border-b border-border py-7 md:py-9 transition-colors hover:bg-gold/[0.04]"
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="font-serif text-2xl md:text-4xl text-foreground group-hover:text-gold transition-colors">
                    {p.name}
                  </span>
                  <span className="block mt-1 text-sm text-muted-foreground truncate">
                    {p.shortDescription}
                  </span>
                </span>
                <span className="flex items-center gap-6">
                  <span className="hidden md:inline text-[10px] tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">
                    {p.tag}
                  </span>
                  <span
                    aria-hidden
                    className="text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
