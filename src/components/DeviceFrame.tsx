import type { ReactNode } from "react";

/**
 * iPhone 16 Pro mockup — titanium rail, Dynamic Island, and the 19.5:9
 * display corner radius. Screenshots sit inside the safe display area.
 */
export function PhoneFrame({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[19rem] ${className}`}>
      {/* titanium band */}
      <div
        className="relative rounded-[3rem] p-[3px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)]"
        style={{
          background:
            "linear-gradient(150deg, oklch(0.72 0.01 240) 0%, oklch(0.42 0.008 240) 22%, oklch(0.62 0.01 240) 48%, oklch(0.38 0.008 240) 74%, oklch(0.68 0.01 240) 100%)",
        }}
      >
        {/* side buttons */}
        <span
          aria-hidden
          className="absolute -left-[2px] top-[22%] h-9 w-[3px] rounded-l bg-[oklch(0.5_0.008_240)]"
        />
        <span
          aria-hidden
          className="absolute -left-[2px] top-[33%] h-14 w-[3px] rounded-l bg-[oklch(0.5_0.008_240)]"
        />
        <span
          aria-hidden
          className="absolute -left-[2px] top-[45%] h-14 w-[3px] rounded-l bg-[oklch(0.5_0.008_240)]"
        />
        <span
          aria-hidden
          className="absolute -right-[2px] top-[36%] h-20 w-[3px] rounded-r bg-[oklch(0.5_0.008_240)]"
        />

        {/* bezel */}
        <div className="relative rounded-[2.85rem] bg-black p-[7px]">
          {/* display */}
          <div className="relative overflow-hidden rounded-[2.4rem] bg-black">
            <img src={src} alt={alt} loading="lazy" className="block w-full" />
            {/* Dynamic Island */}
            <span
              aria-hidden
              className="absolute left-1/2 top-[9px] h-[22px] w-[76px] -translate-x-1/2 rounded-full bg-black"
            />
            {/* home indicator */}
            <span
              aria-hidden
              className="absolute bottom-[6px] left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-black/35"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Browser window mockup for desktop captures — subtle chrome so light-mode
 * screenshots don't float unframed on a dark page.
 */
export function BrowserFrame({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const bar = tone === "light" ? "bg-[oklch(0.9_0.005_240)]" : "bg-[oklch(0.24_0.012_240)]";
  return (
    <div className="overflow-hidden rounded-xl border border-border shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]">
      <div className={`flex items-center gap-2 px-4 py-3 ${bar}`}>
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
      {children}
    </div>
  );
}
