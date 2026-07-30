import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteChrome";
import { BrowserFrame, PhoneFrame } from "@/components/DeviceFrame";
import { getProject, projects, type Project, type Shot } from "@/lib/projects-data";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.name} — DaarLabs` : "Project — DaarLabs";
    const description = p?.shortDescription ?? "A DaarLabs project.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  const shots = project.screenshots ?? [];
  const desktopDark = shots.filter((s) => s.device !== "mobile" && s.theme !== "light");
  const desktopLight = shots.filter((s) => s.device !== "mobile" && s.theme === "light");
  const mobile = shots.filter((s) => s.device === "mobile");
  const isPlaceholder = shots.some((s) => s.image.includes("picsum.photos"));

  return (
    <PageShell>
      <article className="max-w-[90rem] mx-auto px-6 md:px-12 py-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-muted-foreground hover:text-gold transition-colors"
        >
          <span aria-hidden>←</span> Back to The Artifacts
        </Link>

        {/* ---------- Header ---------- */}
        <header className="mt-12">
          <p className="flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase mb-6">
            <span className="text-muted-foreground">{String(idx + 1).padStart(2, "0")}</span>
            <span className="text-gold">{project.note}</span>
          </p>
          <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight">
            {project.name}
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {project.shortDescription}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-3 border border-gold/40 hover:border-gold hover:bg-gold/10 hover:text-gold px-6 py-3.5 squircle text-[11px] tracking-[0.2em] uppercase transition-colors"
              >
                <span aria-hidden>{"<>"}</span> Source Code
              </a>
            ) : (
              <span className="inline-flex items-center gap-3 border border-border text-muted-foreground px-6 py-3.5 squircle text-[11px] tracking-[0.2em] uppercase">
                Source Private
              </span>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-3 bg-gold text-primary-foreground hover:opacity-90 px-6 py-3.5 squircle text-[11px] tracking-[0.2em] uppercase font-medium transition-opacity"
              >
                <span aria-hidden>↗</span> Live Demo
              </a>
            )}
          </div>
        </header>

        {/* ---------- Lead image ---------- */}
        {desktopDark[0] && (
          <figure className="mt-14">
            <BrowserFrame tone="dark">
              <img
                src={desktopDark[0].image}
                alt={desktopDark[0].caption}
                className="block w-full"
              />
            </BrowserFrame>
            <figcaption className="mt-3 text-xs text-muted-foreground">
              {desktopDark[0].caption}
            </figcaption>
          </figure>
        )}

        <div className="mt-14 border-t border-border" />

        {/* ---------- Overview ---------- */}
        <section className="mt-14 squircle border border-border bg-card/60 p-8 md:p-12 lg:p-16">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Project Overview</h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[75ch]">
            {project.longDescription}
          </p>

          <h3 className="mt-12 mb-6 text-base font-medium text-foreground">
            Key Architectural Highlights
          </h3>
          <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <span aria-hidden className="text-gold shrink-0 mt-0.5">
                  ⊘
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-12 mb-5 text-base font-medium text-foreground">Technology Stack</h3>
          <ul className="flex flex-wrap gap-3">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="text-[11px] tracking-[0.15em] uppercase text-gold/90 border border-gold/30 bg-gold/5 px-4 py-2 rounded-full"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Features ---------- */}
        {project.features && project.features.length > 0 && (
          <section className="mt-24">
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Features</p>
            <h2 className="font-serif text-3xl md:text-5xl mb-12">What it does</h2>

            <div className="grid gap-x-16 gap-y-14 lg:grid-cols-2">
              {project.features.map((group) => (
                <div key={group.title} className="border-t border-border pt-8">
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
                    {group.title}
                  </h3>
                  {group.blurb && (
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-[60ch] mb-6">
                      {group.blurb}
                    </p>
                  )}
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span aria-hidden className="text-gold/70 shrink-0 mt-0.5">
                          ·
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------- Gallery ---------- */}
        {shots.length > 0 && (
          <section className="mt-24">
            <div className="flex items-baseline justify-between gap-6 mb-10">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Gallery</p>
                <h2 className="font-serif text-3xl md:text-5xl">A look inside</h2>
              </div>
              {isPlaceholder && (
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  Placeholder imagery
                </span>
              )}
            </div>

            {desktopDark.length > 1 && (
              <DesktopGroup label="Web — Dark" shots={desktopDark.slice(1)} tone="dark" />
            )}
            {desktopLight.length > 0 && (
              <DesktopGroup label="Web — Light" shots={desktopLight} tone="light" />
            )}

            {mobile.length > 0 && (
              <div className="mt-16">
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-8">
                  iOS — iPhone 16 Pro
                </p>
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                  {mobile.map((s) => (
                    <figure key={s.image}>
                      <PhoneFrame src={s.image} alt={s.caption} />
                      <figcaption className="mt-5 text-center text-xs text-muted-foreground">
                        {s.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* ---------- Meta + next ---------- */}
        <section className="mt-24 pt-10 border-t border-border grid gap-10 sm:grid-cols-3">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Discipline
            </p>
            <p className="font-serif text-xl">{project.tag}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Category
            </p>
            <p className="font-serif text-xl">{project.category}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Year</p>
            <p className="font-serif text-xl">{project.year}</p>
          </div>
        </section>

        <section className="mt-16 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-10">
          <Link
            to="/projects/all"
            className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground hover:text-gold transition-colors"
          >
            ← All Projects
          </Link>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group inline-flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase hover:text-gold transition-colors"
          >
            <span className="text-muted-foreground group-hover:text-gold">Next</span>
            <span className="font-serif text-2xl normal-case tracking-normal">{next.name}</span>
            <span className="text-gold group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </section>
      </article>
    </PageShell>
  );
}

function DesktopGroup({
  label,
  shots,
  tone,
}: {
  label: string;
  shots: Shot[];
  tone: "light" | "dark";
}) {
  return (
    <div className="mt-14 first:mt-0">
      <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-8">{label}</p>
      <div className="grid gap-10 lg:grid-cols-2">
        {shots.map((s) => (
          <figure key={s.image} className="group">
            <BrowserFrame tone={tone}>
              <img
                src={s.image}
                alt={s.caption}
                loading="lazy"
                className="block w-full transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </BrowserFrame>
            <figcaption className="mt-3 text-xs text-muted-foreground">{s.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
