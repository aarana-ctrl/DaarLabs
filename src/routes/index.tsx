import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { LightningLayer, Nav, Footer } from "@/components/SiteChrome";
import stormVideo from "@/assets/storm-hero.mp4.asset.json";

// Seconds into the hero video when the trident has finished landing.
// After the first playthrough, the loop restarts from this point so the
// trident only lands once and the storm continues seamlessly.
const LOOP_START_SECONDS = 4.0;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DaarLabs — Venture beyond the unknown" },
      {
        name: "description",
        content:
          "DaarLabs is a studio building apps and services for the daring. Venture beyond the unknown.",
      },
      { property: "og:title", content: "DaarLabs — Venture beyond the unknown" },
      {
        property: "og:description",
        content: "A studio building apps and services for the daring.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // 1 while the hero fills the screen, easing to 0 as it scrolls away.
  const [stormLevel, setStormLevel] = useState(1);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnded = () => {
      try {
        v.currentTime = LOOP_START_SECONDS;
        void v.play();
      } catch {
        /* noop */
      }
    };
    v.addEventListener("ended", onEnded);
    return () => v.removeEventListener("ended", onEnded);
  }, []);

  // Scrolling away calms the storm: the film slows to a halt, rain and
  // lightning fade out, rather than cutting abruptly.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const h = window.innerHeight || 1;
        // fully calm by the time the hero is ~65% scrolled away, so the storm
        // is completely gone — not merely dimmed — over the content below
        const raw = 1 - window.scrollY / (h * 0.65);
        const level = Math.min(Math.max(raw, 0), 1);
        setStormLevel(level < 0.04 ? 0 : level);

        const v = videoRef.current;
        if (!v) return;
        if (level <= 0.02) {
          if (!v.paused) v.pause();
        } else {
          // ease the footage down to a near-standstill before it stops
          v.playbackRate = Math.max(0.1, level);
          if (v.paused) void v.play().catch(() => {});
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="relative bg-background text-foreground">
      {/* Persistent top-left gradient shine across the home page */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background:
            "radial-gradient(ellipse 900px 700px at 12% 8%, oklch(0.78 0.13 82 / 0.2), transparent 70%)",
        }}
      />
      {/* Initial storm-gold wash — holds a warm tint through the wordmark
          landing, then settles instead of vanishing. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 intro-glow"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, oklch(0.78 0.13 82 / 0.3), transparent 65%)",
        }}
      />
      {/* Lightning intensity follows the storm level, so it dies down on scroll */}
      <LightningLayer intensity={stormLevel} />
      <Nav transparent />

      {/* HERO */}
      <section className="relative h-svh min-h-[640px] w-full overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src={stormVideo.url}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            // ~10% brighter than before, and the storm dims as it scrolls away
            filter: `brightness(${(0.62 * (0.45 + 0.55 * stormLevel)).toFixed(3)}) contrast(1.12) saturate(0.9)`,
            transition: "filter 180ms linear",
          }}
        />
        {/* Vignette + gradient */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_25%,oklch(0.08_0.01_240/0.78)_88%)]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/45 via-transparent to-background" />

        {/* Split wordmark — "Daar" left of trident, "Labs" right.
            Gap scales with the viewport so the trident always sits between them. */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
          <div className="wordmark-in w-full max-w-[110rem]">
            <h1 className="font-serif tracking-tight text-foreground grid grid-cols-[1fr_clamp(9rem,26vw,34rem)_1fr] items-center text-[clamp(2.75rem,8vw,9rem)] leading-none">
              <span className="text-right">Daar</span>
              <span aria-hidden />
              <span className="text-left text-gold">Labs</span>
            </h1>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-gold/70 to-transparent drift" />
        </div>
      </section>

      {/* TAGLINE SECTION — ocean fades, thunder continues */}
      <section className="relative py-[clamp(6rem,18vh,14rem)] px-6 overflow-hidden">
        {/* residual storm glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, oklch(0.24 0.02 240) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-8">The Studio</p>
          <p className="font-serif text-[clamp(1.6rem,3.4vw,3.5rem)] leading-tight text-balance text-foreground/95">
            In Hindi, <em className="text-gold">Daar</em> means fear. We named the studio for the
            exact edge we build past — the quiet cliff between what is known and what waits beyond.
          </p>
          <p className="mt-16 text-xs tracking-[0.5em] uppercase text-muted-foreground">
            Venture beyond the unknown
          </p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="relative py-[clamp(5rem,12vh,10rem)] px-6 md:px-12 border-t border-border">
        <div className="max-w-[100rem] mx-auto grid gap-12 md:gap-16 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-gold mb-4">01 — Build</p>
            <h3 className="font-serif text-2xl lg:text-3xl mb-3">Applications</h3>
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-prose">
              Consumer and specialist apps shaped end-to-end — from concept to the store shelf.
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-gold mb-4">02 — Operate</p>
            <h3 className="font-serif text-2xl lg:text-3xl mb-3">Services</h3>
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-prose">
              Living products that ship, iterate, and keep serving the people who depend on them.
            </p>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-[10px] tracking-[0.35em] uppercase text-gold mb-4">03 — Explore</p>
            <h3 className="font-serif text-2xl lg:text-3xl mb-3">R&amp;D</h3>
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-prose">
              Small bets in unfamiliar waters — the kind that most studios call too risky to try.
            </p>
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="relative py-[clamp(5rem,12vh,10rem)] px-6 md:px-12 border-t border-border">
        <div className="max-w-[100rem] mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Selected Work</p>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,4rem)] leading-[1.05]">
              Four ships, <span className="text-gold">already sailing.</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-4 border border-gold/40 hover:border-gold text-[11px] tracking-[0.3em] uppercase text-foreground hover:text-gold px-8 py-4 squircle transition-colors self-start lg:self-auto"
          >
            View the Showcase
            <span className="text-gold group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
