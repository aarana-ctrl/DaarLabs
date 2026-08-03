/**
 * The DaarLabs mark — the trident from the hero, reduced to a line drawing.
 *
 * Strokes use `currentColor`, so it picks up whatever text colour it sits in
 * (muted in the nav, gold on hover, gold in the footer).
 */
export function Trident({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={className}
    >
      {/* centre prong, carried straight down through the collar into the shaft */}
      <path d="M24 2v60" />
      {/* outer prongs, rising past the ferrule and sweeping out */}
      <path d="M8 6v11c0 8 5.5 13 16 14.5" />
      <path d="M40 6v11c0 8-5.5 13-16 14.5" />
      {/* the two ferrule bands under the head */}
      <path d="M17 35.5h14" />
      <path d="M19 40.5h10" />
    </svg>
  );
}
