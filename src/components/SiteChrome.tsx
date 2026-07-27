import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Storm ambience — distant lightning flashes over the page.
 *
 * `intensity` (0–1) lets a page dial it down: the home page eases it to 0 as
 * the hero scrolls away, so the storm winds down to a stop rather than
 * flickering behind the content below. Rain lives in the hero footage itself,
 * so there's no overlay to draw here.
 */
export function LightningLayer({ intensity = 1 }: { intensity?: number }) {
  if (intensity <= 0.01) return null;
  const playState = intensity < 0.05 ? "paused" : "running";
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-40 bg-white lightning mix-blend-screen"
        style={{
          opacity: intensity,
          animationPlayState: playState,
          transition: "opacity 320ms linear",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-40 lightning"
        style={{
          animationDelay: "3.5s",
          opacity: intensity,
          animationPlayState: playState,
          transition: "opacity 320ms linear",
          background:
            "radial-gradient(ellipse at 20% 10%, oklch(0.84 0.13 82 / 0.32), transparent 60%)",
        }}
      />
    </>
  );
}

export function Nav({ transparent = false }: { transparent?: boolean }) {
  return (
    <>
      {/* Soft top gradient behind nav so it flows into the page seamlessly */}
      {!transparent && (
        <div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 right-0 h-40 z-40 bg-gradient-to-b from-background via-background/70 to-transparent"
        />
      )}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground hover:text-gold transition-colors"
        >
          DAARLABS
        </Link>
        <div className="flex gap-6 md:gap-10 items-center">
          <Link
            to="/founders"
            activeProps={{ className: "text-gold" }}
            className="text-[11px] tracking-[0.3em] uppercase hover:text-gold transition-colors"
          >
            Founders
          </Link>
          <Link
            to="/projects"
            activeProps={{ className: "text-gold" }}
            className="text-[11px] tracking-[0.3em] uppercase hover:text-gold transition-colors"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            activeProps={{ className: "text-gold" }}
            className="text-[11px] tracking-[0.3em] uppercase border border-gold/40 hover:border-gold hover:text-gold px-5 py-2.5 squircle transition-colors whitespace-nowrap"
          >
            Get in Touch
          </Link>
        </div>
      </nav>
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border py-20 px-6 md:px-12 bg-background">
      <div className="max-w-[100rem] mx-auto grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="font-serif text-3xl text-gold mb-4">DaarLabs</div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Built in the storm. Forged for the unknown.
          </p>
        </div>
        <div>
          <h5 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">
            Studio
          </h5>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/founders" className="hover:text-gold transition-colors">
                Founders
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-gold transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">
            Legal
          </h5>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/privacy" className="hover:text-gold transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[100rem] mx-auto mt-16 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        <span>© MMXXVI DaarLabs. All rights reserved.</span>
        <span className="text-gold/70 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-gold flicker" />
          Venture beyond the unknown
        </span>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Persistent top-left gold shine, matching the home page */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background:
            "radial-gradient(ellipse 900px 700px at 12% 8%, oklch(0.78 0.13 82 / 0.16), transparent 70%)",
        }}
      />
      <LightningLayer />
      <Nav />
      <main className="pt-28">{children}</main>
      <Footer />
    </div>
  );
}
