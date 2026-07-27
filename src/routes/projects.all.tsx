import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/SiteChrome";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, type ProjectCategory } from "@/lib/projects-data";

export const Route = createFileRoute("/projects/all")({
  head: () => ({
    meta: [
      { title: "All Projects — DaarLabs" },
      { name: "description", content: "Browse and filter every project built by DaarLabs." },
      { property: "og:title", content: "All Projects — DaarLabs" },
      {
        property: "og:description",
        content: "Browse and filter every project built by DaarLabs.",
      },
    ],
  }),
  component: AllProjects,
});

const filters: ("All" | ProjectCategory)[] = ["All", "iOS", "Web", "Tool", "Research"];

function AllProjects() {
  const [active, setActive] = useState<"All" | ProjectCategory>("All");
  const list = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <PageShell>
      <section className="max-w-[100rem] mx-auto px-6 md:px-12 py-16">
        <Link
          to="/projects"
          className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-gold transition-colors"
        >
          ← Back to Showcase
        </Link>
        <p className="mt-10 text-[10px] tracking-[0.4em] uppercase text-gold mb-6">The Archive</p>
        <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-tight mb-6">
          All Projects
        </h1>
        <p className="text-muted-foreground max-w-xl mb-12">
          Every artifact — filter by discipline to venture through it more carefully.
        </p>

        <div className="flex flex-wrap gap-3 mb-16">
          {filters.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`text-[10px] tracking-[0.3em] uppercase px-5 py-2.5 squircle border transition-colors ${
                  isActive
                    ? "border-gold text-gold bg-gold/10"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 lg:gap-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {list.map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={projects.findIndex((x) => x.slug === p.slug)}
            />
          ))}
        </div>

        {list.length === 0 && (
          <p className="text-muted-foreground text-sm mt-10">Nothing in this category yet.</p>
        )}
      </section>
    </PageShell>
  );
}
