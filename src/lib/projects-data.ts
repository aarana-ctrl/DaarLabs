export type ProjectCategory = "iOS" | "Web" | "Tool" | "Research";

export type Project = {
  slug: string;
  name: string;
  tag: string;
  category: ProjectCategory;
  note: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  /** `image` is a placeholder until real captures are dropped in. */
  screenshots: { caption: string; image: string }[];
  /** Technology chips shown on the detail page. */
  stack: string[];
  url: string;
  /** Optional live deployment. */
  liveUrl?: string;
  year: string;
};

export const projects: Project[] = [
  {
    slug: "liquid",
    name: "Liquid",
    tag: "Web / JavaScript",
    category: "Web",
    note: "Open source",
    shortDescription:
      "A fluid, motion-first web experiment exploring liquid interfaces and generative visuals.",
    longDescription:
      "Liquid is an exploration in motion-first interface design — a study in how digital surfaces can behave less like documents and more like matter. Built with a focus on real-time animation, generative shaders, and interaction as material, it exists somewhere between a design system and an art piece.",
    highlights: [
      "Custom WebGL fluid simulation with cursor-driven forces",
      "Motion primitives that stay under 60fps on modest hardware",
      "Design tokens shaped by physics, not by grids",
    ],
    screenshots: [
      { caption: "Idle liquid state — settled surface", image: "https://picsum.photos/seed/liquid-0/1600/1000" },
      { caption: "Cursor interaction — displacement field", image: "https://picsum.photos/seed/liquid-1/1600/1000" },
      { caption: "Generative palette response", image: "https://picsum.photos/seed/liquid-2/1600/1000" },
    ],
    stack: ["React", "TypeScript", "WebGL", "Vite", "Tailwind"],
    liveUrl: "https://liquid-rouge.vercel.app",
    url: "https://github.com/aarana-ctrl/Liquid",
    year: "2025",
  },
  {
    slug: "ridepool",
    name: "RidePool",
    tag: "iOS / Swift",
    category: "iOS",
    note: "In development",
    shortDescription:
      "A ride-pooling iOS app that connects nearby travelers heading the same direction.",
    longDescription:
      "RidePool is a native iOS app for organizing shared rides between people who happen to be heading the same way. It's built for the small, repeated trips that don't warrant a rideshare but always end up costing one — the airport run, the weekend commute, the trip back to campus.",
    highlights: [
      "Native SwiftUI interface with map-first navigation",
      "Route matching that prioritizes real overlap, not just proximity",
      "Fare splitting and trust signals built in from day one",
    ],
    screenshots: [
      { caption: "Home — nearby pool matches", image: "https://picsum.photos/seed/ridepool-0/1600/1000" },
      { caption: "Route detail with fare split", image: "https://picsum.photos/seed/ridepool-1/1600/1000" },
      { caption: "Trip in progress", image: "https://picsum.photos/seed/ridepool-2/1600/1000" },
    ],
    stack: ["SwiftUI", "iOS 17+", "Firestore", "MapKit"],
    url: "https://github.com/aarana-ctrl/RidePool",
    year: "2026",
  },
  {
    slug: "tabs",
    name: "Tabs",
    tag: "iOS / Swift",
    category: "iOS",
    note: "Shipping",
    shortDescription:
      "A minimalist tab manager for iOS — designed to keep the noise out and the flow in.",
    longDescription:
      "Tabs is a small, opinionated tab manager for iOS. It doesn't try to replace your browser — it sits alongside it and gives you a quieter place to keep the things you actually mean to return to.",
    highlights: [
      "Gesture-first triage in under two seconds per tab",
      "Local-first storage with iCloud sync",
      "Zero telemetry, no accounts, no cruft",
    ],
    screenshots: [
      { caption: "Inbox — new tabs land here", image: "https://picsum.photos/seed/tabs-0/1600/1000" },
      { caption: "Swipe to archive or promote", image: "https://picsum.photos/seed/tabs-1/1600/1000" },
      { caption: "Focus mode", image: "https://picsum.photos/seed/tabs-2/1600/1000" },
    ],
    stack: ["React", "SwiftUI", "Firebase Realtime DB", "Vite", "Framer Motion"],
    liveUrl: "https://tabs-web.vercel.app",
    url: "https://github.com/aarana-ctrl/Tabs",
    year: "2025",
  },
  {
    slug: "taskflow",
    name: "taskFlow",
    tag: "Web / HTML",
    category: "Tool",
    note: "Open source",
    shortDescription:
      "A lightweight task-flow tool for tracking what matters and letting go of what doesn't.",
    longDescription:
      "taskFlow is a small task tool that refuses to grow into a project management platform. It tracks a short list, respects your attention, and disappears when the work is done.",
    highlights: [
      "Single-file, no build — open the HTML and go",
      "Keyboard-first entry and triage",
      "Exports to plain text so your data stays yours",
    ],
    screenshots: [
      { caption: "The list — nothing else", image: "https://picsum.photos/seed/taskflow-0/1600/1000" },
      { caption: "Quick capture", image: "https://picsum.photos/seed/taskflow-1/1600/1000" },
      { caption: "Weekly review", image: "https://picsum.photos/seed/taskflow-2/1600/1000" },
    ],
    stack: ["React", "Firebase", "iCal Sync", "Vercel"],
    liveUrl: "https://taskflow-deploy-lilac.vercel.app",
    url: "https://github.com/aarana-ctrl/taskFlow",
    year: "2024",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
