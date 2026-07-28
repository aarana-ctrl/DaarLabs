import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteChrome";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects-data";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — DaarLabs" },
      { name: "description", content: "A showcase of apps and services built by DaarLabs." },
      { property: "og:title", content: "Projects — DaarLabs" },
      {
        property: "og:description",
        content: "A showcase of apps and services built by DaarLabs.",
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <PageShell>
      <section className="max-w-[100rem] mx-auto px-6 md:px-12 py-16">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">The Artifacts</p>
        <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-tight mb-6">
          Project Showcase
        </h1>
        <p className="text-muted-foreground max-w-xl leading-relaxed">
          A flowing gallery of what DaarLabs is building. Scroll sideways to venture through the
          collection.
        </p>
      </section>

      {/* Horizontal rail — generous card sizing, staggered so it reads as a flow.
          Scrolls with the wheel/trackpad and snaps to each card. */}
      <section className="pb-20">
        <div
          className="flex gap-8 lg:gap-10 overflow-x-auto px-6 md:px-12 pt-6 pb-14
                     no-scrollbar snap-x snap-mandatory
                     [scroll-padding-left:1.5rem] md:[scroll-padding-left:3rem]"
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              className={`shrink-0 snap-start w-[min(85vw,26rem)] ${
                i % 2 === 1 ? "lg:mt-16" : ""
              }`}
            />
          ))}
          {/* trailing spacer so the last card can snap clear of the edge */}
          <div aria-hidden className="shrink-0 w-2 md:w-8" />
        </div>
      </section>

      <section className="max-w-[100rem] mx-auto px-6 md:px-12 pb-32 flex justify-center">
        <Link
          to="/projects/all"
          className="group inline-flex items-center gap-4 border border-gold/40 hover:border-gold text-[11px] tracking-[0.3em] uppercase text-foreground hover:text-gold px-8 py-4 squircle transition-colors"
        >
          View All Projects
          <span className="text-gold group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </section>
    </PageShell>
  );
}
