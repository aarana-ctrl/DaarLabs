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
  screenshots: Shot[];
  /** Grouped feature write-up, rendered as sections on the detail page. */
  features?: FeatureGroup[];
  /** Card thumbnail. A light-toned image reads best against the dark cards. */
  thumbnail?: string;
  /** Shown under the gallery when captures have redactions. */
  imageNote?: string;
  /** Explains a missing device group in the gallery, e.g. mobile still in build. */
  mobileStatus?: string;
  /** Technology chips shown on the detail page. */
  stack: string[];
  /** Source repo. Omitted while a project is still private. */
  url?: string;
  /** Optional live deployment. */
  liveUrl?: string;
  year: string;
};

/** How a screenshot should be framed on the detail page. */
export type ShotDevice = "desktop" | "mobile";
export type ShotTheme = "light" | "dark";

export type Shot = {
  caption: string;
  image: string;
  device?: ShotDevice;
  theme?: ShotTheme;
};

export type FeatureGroup = {
  title: string;
  blurb?: string;
  items: string[];
};

export const projects: Project[] = [
  {
    slug: "liquid",
    name: "Liquid",
    tag: "Web / React",
    category: "Web",
    note: "Open source",
    shortDescription:
      "Because planning your degree shouldn't be four different windows and twelve tabs — a degree and quarter planner for University of Washington students, powered by real MyPlan, DARS, DawgPath, and RateMyProfessors data.",
    longDescription:
      "Planning your degree shouldn't be four different windows with twelve tabs. UW students juggle MyPlan to build a schedule, DARS to audit degree progress, DawgPath for grade distributions, and RateMyProfessors to size up instructors. Liquid pulls all of it into a single planning surface and keeps the numbers exact by reading the student's own signed-in university data through a companion Chrome extension, so nothing is guessed. A recommendation model then ranks courses by how much of what you still need each one covers — all of it wrapped in a calm liquid-glass interface with live video wallpaper themes that shift with the time of day.",
    highlights: [
      "DARS audits imported automatically and rendered as a live progress card with every unmet requirement",
      "Compare majors and minors side by side with exact per-category requirements, tagged Major / Minor / Both",
      "Gen-ed picker ranks courses by how much of your remaining requirements each one satisfies",
      "Course details with DawgPath grade distributions, live professor ratings, and open-seat counts",
      "Drag-and-drop plan board that respects the UW calendar, with prerequisite awareness and clash detection",
      "Seven video wallpaper themes — Tahoe, Goa, Sequoia, Tea Gardens, Golden Gate, Ganges — that shift with the time of day, with adjustable liquid-glass blur, background dim, and a live/still switch to save battery",
    ],
    features: [
      {
        title: "Degree Audit That's Actually Exact",
        blurb:
          "Your DARS audit is imported automatically and rendered as a live progress card plus a full per-requirement breakdown — no re-typing, no guessing.",
        items: [
          "Earned / in-progress / remaining credits, GPA, and on-track status at a glance",
          "Every unmet requirement listed with the specific courses that satisfy it",
          "Re-sync MyPlan (DARS) in one click to refresh the whole audit",
          "Requirement cards mark themselves met as planned courses fill them",
        ],
      },
      {
        title: "Compare Majors & Minors",
        blurb:
          "Line up any programs side by side and see every requirement, so you can weigh a switch or an added minor before committing to it.",
        items: [
          "323 majors and 185 minors, searchable, with double-counting allowed",
          "Programs you've run through DARS are marked ✓ exact with real per-category numbers and named required courses",
          "Everything else shows as a transcript estimate until its audit runs",
          "Auto-run DARS across a whole batch of saved programs in the background",
          "With a minor added, requirements are tagged Major / Minor / Both so you always know what counts for what",
        ],
      },
      {
        title: "Recommendations Built Around What You Still Need",
        blurb:
          "The gen-ed picker ranks courses by how much of your remaining requirements each one covers — a course that fills three open areas beats one that double-counts areas you've already finished.",
        items: [
          "Full-screen picker, searchable and filterable by area and credits",
          "Auto Plan drops recommended courses straight onto the board",
          "Ranking updates the moment your audit or plan changes",
        ],
      },
      {
        title: "Course Details With Real Data",
        blurb:
          "Open any course and everything you'd normally open four tabs for is already there.",
        items: [
          "DawgPath grade distribution — tap a bar for the exact % who earned each grade",
          "Professor ratings pulled live from RateMyProfessors",
          "Every lecture and quiz section for the current and next quarter, with meeting times and live open-seat counts",
          "Clash detection so you never plan two classes at the same time",
        ],
      },
      {
        title: "A Plan Board That Respects the UW Calendar",
        blurb:
          "Timeline and grid views over every quarter of your degree, from pre-credits to years out.",
        items: [
          "Drag and drop courses across quarters with prerequisite awareness",
          "Correct academic-year labeling (Summer → Spring)",
          "Per-quarter credit totals, completed-quarter states, and a this-quarter widget",
          "Smart add for typing courses in quickly, plus Reset to start over",
        ],
      },
      {
        title: "Make It Yours",
        blurb:
          "Liquid is a liquid-glass interface layered over live video wallpaper — the theme sets the mood of the whole app.",
        items: [
          "Seven themes: Tahoe, Goa Beaches, Goa Coast, Sequoia, Tea Gardens, Ganges, and Golden Gate",
          "Live video backgrounds that shift with the time of day, marked Live in the picker",
          "Adjustable liquid-glass blur and background dim, with reset to defaults",
          "Live/still switch to save battery, plus widget toggles",
        ],
      },
      {
        title: "How It Works",
        blurb:
          "Three pieces: a React web app, an Express + Firestore backend, and a Chrome MV3 extension that reads the student's own signed-in UW session.",
        items: [
          "The web app is the interface only — it never touches university systems directly",
          "The extension reads the DARS audit, scrapes the program and course catalog, and fetches per-course grades, professors, sections, and seats",
          "The backend stores each user's plan and per-program DARS snapshots and serves the shared course catalog",
          "An auto-audit queue on the backend is drained by the extension in the background",
          "No NetID, password, or 2FA is ever requested, and no university request signatures are forged",
        ],
      },
    ],
    screenshots: [
      {
        caption: "Plan board — drag courses across quarters · Goa Beaches theme",
        image: "/projects/liquid/plan-timeline-goa.jpg",
        device: "desktop",
      },
      {
        caption:
          "Degree requirements — per-category progress with recommended courses · Goa Beaches theme",
        image: "/projects/liquid/requirements-goa.jpg",
        device: "desktop",
      },
      {
        caption:
          "Design your path — 323 majors and 185 minors, compared side by side · Goa Beaches theme",
        image: "/projects/liquid/majors-minors.jpg",
        device: "desktop",
      },
      {
        caption: "Appearance — seven live video themes, blur, and background dim · Tahoe theme",
        image: "/projects/liquid/appearance-themes.jpg",
        device: "desktop",
      },
      {
        caption: "The same plan board in the Tea Gardens theme",
        image: "/projects/liquid/plan-timeline-tea.jpg",
        device: "desktop",
      },
    ],
    thumbnail: "/projects/liquid/plan-timeline-tea.jpg",
    mobileStatus:
      "Liquid is built for the desktop web — planning a degree needs the room — so there's no mobile app for this one.",
    stack: ["React 18", "Vite", "Node.js", "Express", "Firestore", "Chrome MV3", "JWT"],
    url: "https://github.com/aarana-ctrl/Liquid",
    liveUrl: "https://liquid-rouge.vercel.app",
    year: "2026",
  },
  {
    slug: "tabs",
    name: "Tabs",
    tag: "iOS & Web / Swift",
    category: "iOS",
    note: "Shipping",
    shortDescription:
      "A cross-platform poker session tracker for friend groups — running ledgers, guest players, and settlements synced in real time.",
    longDescription:
      "Tabs keeps a running ledger of profit and loss across poker sessions, handles guest players who don't have accounts, manages settlements, and gives every player a full history of their results. The SwiftUI iOS app and the React web app share one Firestore database, so any action on one platform is immediately reflected on the other.",
    highlights: [
      "Tables with unique reference codes, admins, and co-admins, plus an all-time P&L leaderboard",
      "Live balance bar per session — the total net must reach $0 before settlement",
      "Guest players tracked separately from the main leaderboard",
      "Settlement mode where each player marks themselves settled before the admin closes the night",
      "Admin controls: edit any entry retroactively, distribute a player's P&L, and manage a dispute fund",
      "Analytics rolled up across every table — cumulative P&L, win rate, best and worst sessions",
    ],
    features: [
      {
        title: "Tables",
        blurb:
          "A table represents a recurring poker group. Each has a unique reference code that members use to join. One player is the Admin and can optionally designate Co-Admins.",
        items: [
          "Create a new table or join one with a reference code",
          "Persistent leaderboard showing each member's all-time P&L",
          "Admin and Co-Admin badges shown next to names on the leaderboard",
          "Session history page (admin only) listing every session and each player's result",
        ],
      },
      {
        title: "Sessions",
        blurb:
          "A session is a single poker night, started and managed from the table page.",
        items: [
          "Players log their own buy-in and final chip amount at the end of the night",
          "A live balance bar shows the total net, which must reach $0 before settlement",
          "Admin can edit any submitted entry at any time, including retroactively",
          "Guests can be added to a session with just a name and net P&L",
        ],
      },
      {
        title: "Guests",
        blurb:
          "Guests are one-off players without accounts. Their results count toward the session balance but stay off the main leaderboard.",
        items: [
          "Added to any session with a name and net P&L",
          "Results included in the session balance calculation",
          "All-time P&L tracked and shown in the table's Guests section",
        ],
      },
      {
        title: "Settlements",
        blurb: "When a session ends, the admin initiates settlement mode.",
        items: [
          "Each player marks themselves settled once cash has changed hands",
          "The admin closes the session once every player is settled",
        ],
      },
      {
        title: "Player Profiles",
        blurb: "Tapping any player opens their full record.",
        items: [
          "Total earnings broken down as Session Total plus Distributed",
          "Session-by-session history with net P&L for each night",
          "Win rate alongside best and worst session stats",
        ],
      },
      {
        title: "Admin Controls",
        blurb: "Admins get a dedicated panel with elevated abilities.",
        items: [
          "Edit any session entry — correct a buy-in or final amount after the fact",
          "Distribute a player's P&L — zero their balance and split it evenly among the rest",
          "Remove a player — split their balance among the others or move it to the dispute fund",
          "Dispute fund — a running pool from removed players or contested amounts, splittable or clearable",
          "Session history — every session newest-first, with inline editing of any entry",
        ],
      },
      {
        title: "Analytics",
        blurb:
          "Personal stats rolled up across every table a player belongs to.",
        items: [
          "Cumulative P&L chart with a per-session toggle",
          "Win rate plus best and worst session",
          "Per-table breakdown of earnings, win rate, and best night",
        ],
      },
    ],
    screenshots: [
      {
        caption: "Analytics — cumulative P&L across every table",
        image: "/projects/tabs/analytics-dark.png",
        device: "desktop",
        theme: "dark",
      },
      {
        caption: "Table page — leaderboard, dispute fund, and guests",
        image: "/projects/tabs/table-dark.png",
        device: "desktop",
        theme: "dark",
      },
      {
        caption: "Player profile with the full admin action panel",
        image: "/projects/tabs/player-dark.png",
        device: "desktop",
        theme: "dark",
      },
      {
        caption: "Dispute fund — split evenly among current players or clear it",
        image: "/projects/tabs/dispute-dark.png",
        device: "desktop",
        theme: "dark",
      },
      {
        caption: "Analytics in light mode",
        image: "/projects/tabs/analytics-light.png",
        device: "desktop",
        theme: "light",
      },
      {
        caption: "Table leaderboard in light mode",
        image: "/projects/tabs/table-light.png",
        device: "desktop",
        theme: "light",
      },
      {
        caption: "Live session — balance off by $0.05",
        image: "/projects/tabs/mobile-session.png",
        device: "mobile",
      },
      {
        caption: "Table players and all-time standings",
        image: "/projects/tabs/mobile-table.png",
        device: "mobile",
      },
      {
        caption: "My Analytics on iOS",
        image: "/projects/tabs/mobile-analytics.png",
        device: "mobile",
      },
    ],
    thumbnail: "/projects/tabs/table-light.png",
    imageNote:
      "Player names, table names, and reference codes have been redacted in these captures for privacy.",
    stack: ["SwiftUI", "React 18", "TypeScript", "Vite", "Tailwind CSS", "Firebase", "Recharts"],
    url: "https://github.com/aarana-ctrl/Tabs",
    liveUrl: "https://tabs-web.vercel.app",
    year: "2026",
  },
  {
    slug: "taskflow",
    name: "TaskFlow",
    tag: "Web / React",
    category: "Tool",
    note: "Open source",
    shortDescription:
      "A student assignment tracker that syncs directly with Canvas and Gradescope, so all your due dates live in one place.",
    longDescription:
      'TaskFlow pulls assignments from Canvas, Gradescope, and course websites via their iCal feeds and merges them into a unified task list. You can also add your own tasks in plain English — "CS hw tuesday at 11pm" — and dates, days, and times are detected automatically. Tasks sort themselves into Overdue, Today, Upcoming, and Later, and sync across every device. Built as a single-page web app on Vercel, with Firebase handling authentication and storage.',
    highlights: [
      "Canvas and Gradescope sync — paste an iCal feed URL once and it re-syncs every six hours",
      "Natural language input that parses dates, days, times, and recurring schedules",
      "Duplicate assignments across sources are collapsed automatically",
      "Smart views — Today, Upcoming, All Tasks, Calendar, and Completed — plus a tappable week strip",
      "Google and Apple sign-in through Firebase, with no passwords to manage",
      "Mobile-first layout with a hamburger drawer, bottom-sheet details, and full safe-area support",
    ],
    features: [
      {
        title: "Sync & Integrations",
        blurb:
          "TaskFlow fetches each iCal feed through a secure serverless proxy, parses the events, and merges them into one list. Duplicates across sources — same title and same due date — are collapsed automatically.",
        items: [
          "Canvas — paste the Feed URL from Account → Settings → Calendar (it starts with webcal://)",
          "Gradescope — optional, for schools that expose a standalone calendar feed",
          "Course websites — add as many additional course calendar feeds as you like",
          "Auto-syncs every six hours, with a Sync Now button to force it anytime",
        ],
      },
      {
        title: "Natural Language Input",
        blurb:
          "Type a task the way you'd say it and TaskFlow works out when it's due.",
        items: [
          '"finish essay by friday" → due this Friday',
          '"chem lab report monday at 11:59pm" → due Monday 11:59 PM',
          '"read chapter 5 in 3 days" → due 3 days from today',
          '"weekly review every sunday" → a recurring weekly task',
        ],
      },
      {
        title: "Task Views",
        blurb: "Everything sorts itself by urgency, with several ways to look at it.",
        items: [
          "Today, Upcoming, All Tasks, Calendar, and Completed",
          "Automatic Overdue / Today / This Week / Later grouping",
          "Week strip — tap any day to filter tasks to that date",
          "Calendar view — monthly overview with colour-coded indicators per source",
        ],
      },
      {
        title: "Task Details",
        items: [
          "Due dates, reminders, priority, and recurring schedules",
          "Source badges showing whether a task came from Canvas, Gradescope, a course site, or by hand",
          "Completion animations — a green checkmark bounce with strikethrough",
        ],
      },
      {
        title: "Accounts & Experience",
        items: [
          "Google and Apple sign-in — no passwords, synced through Firebase",
          "Dark mode toggle in Settings that persists across sessions",
          "Mobile-first — hamburger drawer nav, bottom-sheet task details, full safe-area support",
        ],
      },
    ],
    screenshots: [
      {
        caption: "All Tasks — automatic Overdue, Today, and This Week grouping",
        image: "/projects/taskflow/alltasks-dark.png",
        device: "desktop",
        theme: "dark",
      },
      {
        caption: "Calendar — monthly overview with per-source indicators",
        image: "/projects/taskflow/calendar-dark.png",
        device: "desktop",
        theme: "dark",
      },
      {
        caption: "Completed — finished work, struck through and archived",
        image: "/projects/taskflow/completed-dark.png",
        device: "desktop",
        theme: "dark",
      },
      {
        caption: "Today — the week strip and natural language capture bar",
        image: "/projects/taskflow/today-light.png",
        device: "desktop",
        theme: "light",
      },
      {
        caption: "Integrations — Canvas connected, plus extra course feeds",
        image: "/projects/taskflow/integrations-light.png",
        device: "desktop",
        theme: "light",
      },
    ],
    thumbnail: "/projects/taskflow/today-light.png",
    mobileStatus:
      "Screenshots of the mobile app aren't available yet — it's still under development.",
    stack: ["React", "Firebase Auth", "Firestore", "Vercel Functions", "iCal"],
    url: "https://github.com/aarana-ctrl/TaskFlow",
    liveUrl: "https://taskflow-deploy-lilac.vercel.app",
    year: "2026",
  },
  {
    slug: "ridepool",
    name: "RidePool",
    tag: "iOS / Swift",
    category: "iOS",
    note: "In development",
    shortDescription:
      "School carpooling made simple — connects students and staff around shared events to cut the number of cars on the road.",
    longDescription:
      "RidePool is an iOS app that connects students and staff at the same school around shared events, making it easy to find or offer rides and earn credits for driving. Sign-up is restricted to school-affiliated email addresses, and every user picks a role — student, staff, or club organizer — which determines whether they can post events.",
    highlights: [
      "School-email-only access (.edu and .k12 domains) with a clear message for everyone else",
      "Three roles — Student, Staff / Faculty, and Student Rep — controlling who can post events",
      "Event feed with colour-coded categories, dates, and locations",
      "Offer a ride with a seat count, or request a seat in someone's car with one tap",
      "Accept or decline ride requests from the notifications tab, earning credits for each rider",
      "Rewards shop where credits buy hoodies, gift cards, and sticker packs",
    ],
    screenshots: [
      {
        caption: "Home — upcoming events at your school, searchable",
        image: "/projects/ridepool/home-feed.png",
        device: "mobile",
      },
      {
        caption: "Sign-up — your role decides what you can post",
        image: "/projects/ridepool/role.png",
        device: "mobile",
      },
      {
        caption: "Event detail — offer a ride and earn 20 credits",
        image: "/projects/ridepool/event-club.png",
        device: "mobile",
      },
      {
        caption: "Available rides — seats left, and how fast they're going",
        image: "/projects/ridepool/event-rides.png",
        device: "mobile",
      },
      {
        caption: "My Rides — what you're driving to, requests, and past trips",
        image: "/projects/ridepool/my-rides.png",
        device: "mobile",
      },
      {
        caption: "Rewards Shop — credits from driving buy real things",
        image: "/projects/ridepool/rewards.png",
        device: "mobile",
      },
    ],
    thumbnail: "/projects/ridepool/home-feed.png",
    stack: ["SwiftUI", "iOS 17+", "Firebase Auth", "Cloud Firestore"],
    url: "https://github.com/aarana-ctrl/RidePool",
    year: "2026",
  },
  {
    slug: "daarforce",
    name: "DaarForce",
    tag: "Web / TypeScript",
    category: "Tool",
    note: "Developer preview",
    shortDescription:
      "AI security for the sites people ship fast — find the holes before hackers do.",
    longDescription:
      "A huge wave of sites and apps are now built with AI coding tools — Lovable, Bolt, v0, Replit, Cursor — and anyone can ship a real product in a weekend. Almost none of them are secure, and the people building them usually don't know what a security hole looks like, let alone how to fix one. They can't afford a security engineer, so they launch apps that leak API keys, expose a database, or let attackers inject code, and only find out when something goes wrong. Existing tooling doesn't help: it's built for security experts and returns a wall of CVEs and jargon a non-technical founder can't act on. DaarForce is an AI security analyst for exactly those builders — it reads your code, probes your live site, correlates the two to work out what is actually exploitable, scores your posture, and hands you each issue in plain English with the exact fix. Grammarly for security.",
    highlights: [
      "Hybrid scanning — static code analysis and live-site probing, correlated so the findings are real rather than theoretical",
      "Plain-language findings — what it is, why it matters, and where, written for a non-technical site owner",
      "A concrete AI-written patch for every finding, plus one-click fix pull requests on connected GitHub repos",
      "Secret scanning for committed AWS, Stripe, Google, GitHub, OpenAI, and private keys — the most common vibe-coded mistake",
      "A single 0–100 security score with a prioritised fix-these-first summary",
      "Ownership-gated live scans — DNS TXT or .well-known proof before DaarForce ever probes a site",
    ],
    features: [
      {
        title: "The Problem",
        blurb:
          "The fastest-growing group of builders is also the least protected, and current tooling is aimed at everyone but them.",
        items: [
          "AI coding tools let anyone ship a real product in a weekend, with no security review anywhere in the loop",
          "The resulting apps leak API keys, expose databases, and accept injected code",
          "A security engineer is out of reach for a solo founder or a small business",
          "Existing scanners answer with CVE IDs and jargon — accurate, and useless to the person who has to fix it",
        ],
      },
      {
        title: "Two Engines, One Verdict",
        blurb:
          "DaarForce looks at your project the way a careful reviewer and an attacker each would, then reconciles the two.",
        items: [
          "Static engine — reads the code for insecure patterns, leaked secrets, unsafe database queries, exposed admin keys, and vulnerable dependencies",
          "Dynamic engine — probes the live site with no code access: exposed files, missing protections, secrets shipped to the browser",
          "Correlation layer — dedupes, cross-confirms, and scores; anything both engines see is flagged high-confidence",
          "LLM reasoning — kills false positives, then explains and fixes what survives",
          "Language-agnostic, with deeper rule coverage for the common vibe-coded stacks: Next.js, Supabase, Node",
        ],
      },
      {
        title: "Findings You Can Actually Act On",
        blurb:
          "Every result is written for the person who owns the site, not for a security team.",
        items: [
          "A plain-English title, why it matters, and exactly where it lives",
          "An AI-written patch for each finding, plus a step to verify the fix worked",
          "One-click pull requests against connected GitHub repos",
          "Dependency audit flagging outdated packages with known vulnerabilities",
          "Visual checks as a secondary pass — placeholder text and broken renders left live on the site",
          "First scan free; fixes, fix PRs, and ongoing monitoring are the subscription",
        ],
      },
      {
        title: "Encrypted By Design",
        blurb:
          "A scan result is a map of how to break into someone's app, which makes it the most sensitive data we hold.",
        items: [
          "Every stored scan is encrypted at rest with AES-256-GCM",
          "The clone path is never persisted and temp clones are deleted after each scan",
          "Secrets are redacted wherever they're displayed",
          "The web app ships the headers it tells you to ship — CSP, HSTS, X-Frame-Options, nosniff",
        ],
      },
      {
        title: "Cheap and Accurate Now, A Model Later",
        blurb:
          "Detection is deterministic so nothing is hallucinated; the model is only used for judgement and writing.",
        items: [
          "Deterministic tooling finds candidates; a frontier LLM reasons about them and writes the fixes",
          "About 80% accuracy today with no training data of our own",
          "Every scan produces labelled data — detection, judgement, user action, re-scan result",
          "That dataset is the path to a fine-tuned, cheaper, 90%+ model, which is the long-term moat",
          "Provider-agnostic reasoning layer — Anthropic, OpenAI, or our own model behind one interface, with graceful fallback so a downed API never breaks a scan",
        ],
      },
    ],
    screenshots: [
      {
        caption: "Run a scan — point it at a repo, a live URL, or both",
        image: "/projects/daarforce/scan-hero.jpg",
        device: "desktop",
      },
    ],
    thumbnail: "/projects/daarforce/scan-hero.jpg",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Claude API",
      "Postgres",
      "GitHub App",
      "AES-256-GCM",
    ],
    year: "2026",
  },
  {
    slug: "suits-ai",
    name: "Suits AI",
    tag: "Web / RAG",
    category: "Research",
    note: "In development",
    shortDescription:
      "Legal intelligence, tailored to your situation — clear, cited answers on immigration, tax, and everyday legal questions.",
    longDescription:
      "Suits AI is an AI legal information assistant for the people who can't put a lawyer on retainer for every question — immigrants, international students, anyone facing a form or a notice they don't understand. You describe your situation and get a plain-English answer grounded in current statutes, regulations, and case law, with every source cited and an 'accurate as of' date attached. It's deliberately a generalist, covering the questions people actually face — immigration, taxes, traffic, housing, small claims, employment, consumer, legal news — and deepening in each area over time. It provides legal information, not legal advice, and it says so plainly.",
    highlights: [
      "Retrieval-augmented answers over primary legal sources — every claim links to something you can open and read",
      "Each answer stamped 'accurate as of' a date, with the corpus re-indexed on a scan schedule rather than re-trained",
      "Honest limits — confidence signals, and escalation to a licensed attorney for high-stakes matters",
      "Broad coverage: immigration, tax, traffic, housing, small claims, employment, consumer, and legal news",
      "The model is never trained on the law; it retrieves the law at query time, which is what keeps answers current",
      "Monochrome-luxury editorial UI with persisted light and dark modes, built as a zero-build static site",
    ],
    features: [
      {
        title: "Grounded, Cited, Dated",
        blurb:
          "The architecture is the honesty policy: nothing is answered from memory, so nothing can drift from the source.",
        items: [
          "Retrieval-augmented generation over eCFR (Title 8 immigration, Title 26 tax), CourtListener case law, govinfo, USCIS, and IRS material",
          "Every claim carries a link to the source it came from",
          "Answers are stamped with the date the corpus was last refreshed",
          "Re-index, not re-train — currency is a pipeline problem, not a model problem",
        ],
      },
      {
        title: "Why ~95%, And Why That's The Point",
        blurb:
          "We don't claim 100%. Stanford RegLab / HAI found in 2025 that even leading commercial legal-research AIs hallucinate on a meaningful share of queries.",
        items: [
          "Calibrated honesty over false confidence — roughly 1 in 20 answers may be wrong, and the product says so",
          "Every answer is grounded, cited, dated, and auditable",
          "High-stakes questions — criminal exposure, filing deadlines, immigration status — escalate to a human attorney rather than being guessed at",
          "Planned evaluation harness covering citation validity, escalation recall, and sycophancy",
        ],
      },
      {
        title: "How It's Built",
        blurb:
          "A static multi-page site over a Python ingestion pipeline and a Postgres vector store.",
        items: [
          "Front end is plain HTML, CSS, and JS with no build step, deployed static on Vercel",
          "Hybrid vector and keyword search over Postgres with pgvector; embeddings behind a swappable managed API",
          "Python stdlib ingestion chunks free primary sources into the corpus, on a GitHub Actions / Vercel Cron schedule",
          "Nav and footer injected from a single source so links stay consistent across every page",
          "Explicit .html routing so browser history and back-forward behave natively",
        ],
      },
      {
        title: "What's Next",
        blurb: "The site and pipeline exist; the reasoning endpoint is the current work.",
        items: [
          "Wire the chat interface to a real /api/ask RAG endpoint over the corpus",
          "Expand the corpus — govinfo US Code, the USCIS Policy Manual, IRS publications, per-state material",
          "Add accounts and a user 'situation profile', and migrate the front end to Next.js",
          "Later phases: assisted tax prep, document assembly, and lawyer referral",
        ],
      },
      {
        title: "The Legal Position",
        blurb:
          "Stated plainly on the site, because a product in this space that's vague about it is a product to distrust.",
        items: [
          "Suits AI provides legal information and news for general educational purposes",
          "It does not provide legal advice, does not practice law, and is not a law firm",
          "Using it creates no attorney–client relationship; verify anything important with primary sources or a licensed attorney",
          "Not affiliated with, endorsed by, or connected to the television programme “Suits” or its rights holders",
        ],
      },
    ],
    screenshots: [],
    stack: [
      "HTML/CSS/JS",
      "Vercel",
      "Postgres",
      "pgvector",
      "Python",
      "RAG",
      "GitHub Actions",
    ],
    year: "2026",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
