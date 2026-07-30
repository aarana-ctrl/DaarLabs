import { Link } from "@tanstack/react-router";
import type { Project } from "@/lib/projects-data";

/**
 * Showcase card. Hovering lifts the card and lights the whole frame in gold;
 * the entire card is a link through to the project's detail page.
 */
export function ProjectCard({
  project,
  index,
  className = "",
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className={`group relative flex flex-col squircle border border-border bg-card/70 overflow-hidden
                  transition-all duration-500 hover:-translate-y-2
                  hover:border-gold/60 hover:bg-card
                  hover:shadow-[0_0_0_1px_oklch(0.84_0.13_82/0.25),0_28px_80px_-20px_oklch(0.84_0.13_82/0.35)]
                  focus-visible:outline-none focus-visible:border-gold ${className}`}
    >
      {/* ---------- Thumbnail ---------- */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-[oklch(0.94_0.005_240)]">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          // Light plate with the project's initial — a placeholder that still
          // reads as a thumbnail until real artwork lands.
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background:
                "linear-gradient(150deg, oklch(0.97 0.004 240) 0%, oklch(0.88 0.01 240) 55%, oklch(0.8 0.015 240) 100%)",
            }}
          >
            <span className="font-serif text-6xl text-[oklch(0.28_0.02_240)]/50">
              {project.name.charAt(0)}
            </span>
          </div>
        )}
        {/* gold veil on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, oklch(0.84 0.13 82 / 0.22), transparent 55%)",
          }}
        />
      </div>

      {/* ---------- Body ---------- */}
      <div className="relative flex flex-1 flex-col p-7 lg:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold/80 whitespace-nowrap">
            {project.note}
          </span>
        </div>

        <h3 className="mt-5 font-serif text-3xl lg:text-4xl text-foreground group-hover:text-gold transition-colors duration-500">
          {project.name}
        </h3>

        <p className="mt-4 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.shortDescription}
        </p>

        <div className="mt-7 pt-5 border-t border-border group-hover:border-gold/30 transition-colors duration-500 flex items-center justify-between gap-4">
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground whitespace-nowrap">
            {project.tag}
          </span>
          {/* affordance only — the whole card is the link */}
          <span
            aria-hidden
            className="text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
