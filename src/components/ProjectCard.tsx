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
      className={`group relative block squircle border border-border bg-card/70 p-8 lg:p-10
                  transition-all duration-500 hover:-translate-y-2
                  hover:border-gold/60 hover:bg-card
                  hover:shadow-[0_0_0_1px_oklch(0.84_0.13_82/0.25),0_28px_80px_-20px_oklch(0.84_0.13_82/0.35)]
                  focus-visible:outline-none focus-visible:border-gold ${className}`}
    >
      {/* gold wash that blooms in on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 squircle opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, oklch(0.84 0.13 82 / 0.14), transparent 65%)",
        }}
      />

      <div className="relative flex items-baseline justify-between gap-4">
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-gold/80 whitespace-nowrap">
          {project.note}
        </span>
      </div>

      <h3 className="relative font-serif text-4xl lg:text-5xl text-center my-14 lg:my-16 text-foreground group-hover:text-gold transition-colors duration-500">
        {project.name}
      </h3>

      <div className="relative border-t border-border group-hover:border-gold/30 transition-colors duration-500 pt-6">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.shortDescription}
        </p>
        <div className="mt-6 flex items-center justify-between gap-4">
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
