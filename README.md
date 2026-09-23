# Monograph

An editorial publishing platform designed for long-form technical monographs, built with Next.js App Router, React 19, Tailwind CSS v4, and Sanity CMS.

Live Deployment: [monograph-cms.vercel.app](https://monograph-cms.vercel.app)

---

## Architectural Highlights

Monograph is an exploration in combining typographic restraint with enterprise-grade defensive frontend engineering. It ships zero-runtime font metrics, zero-dependency rate limiting, and an architecture capable of running fully offline without external CMS credentials.

* **Editorial Typographic Rhythm:** Measures locked to a comfortable 65ch line length, pairing Newsreader serif typography with Inter and JetBrains Mono. Snaps to a strict vertical baseline cadence with optical size scaling across all viewports.
* **Zero-Config Dual Data Engine:** Native GROQ queries against Sanity CMS with automatic, zero-latency fallback to an embedded 20-monograph dataset across 4 engineering disciplines when CMS credentials are omitted.
* **Viewport-Clamped Highlight-to-Quote:** Medium-grade inline text selection popover. Computes coordinates relative to the enclosing container's bounding box rather than the viewport, preventing off-screen drift on mobile and desktop viewports.
* **Atomic Applause Engine:** Multi-clap micro-interaction (up to 50 claps per reader) with optimistic client UI, debounced batching, and atomic server-side mutations (`patch.inc`) guarded by fixed-window rate limiting.
* **Local-First Reading List:** Client-side bookmarking engine with defensive JSON schema validation, automatic data repair, and real-time cross-tab synchronization via the Web Storage API.
* **Hardened Security Perimeter:** Strict scheme allowlisting on Portable Text links to eliminate stored XSS vectors, CWE-209 server error masking on mutation endpoints, and baseline HTTP security headers.

---

## Tech Stack

| Layer | Technology | Specification |
| :--- | :--- | :--- |
| Framework | Next.js | App Router, Server Components (RSC), Turbopack |
| Runtime | Node.js / React | React 19, Node.js 22 LTS |
| Styling | Tailwind CSS | Version 4, CSS-first `@theme` configuration |
| Headless CMS | Sanity.io | GROQ querying, Visual Editing support, atomic mutations |
| Language | TypeScript | Version 5.6+, strict mode, zero `any` declarations |
| Icons | Lucide React | Clean, tree-shaken SVG icon primitives |
| Package Manager | pnpm | Locked via `packageManager` and peer resolution overrides |

---

## System Architecture

```
src/
├── app/
│   ├── api/posts/[slug]/
│   │   ├── clap/route.ts        # Atomic clap mutation with IP rate limiting
│   │   └── view/route.ts        # View beacon with session deduplication
│   ├── bookmarks/page.tsx       # Offline/local saved reading list
│   ├── category/[slug]/page.tsx # Category stream with on-demand ISR
│   ├── posts/[slug]/
│   │   ├── interactive-shell.tsx# Client container for selection and beacons
│   │   ├── loading.tsx          # Streaming skeleton fallback
│   │   └── page.tsx             # Pre-rendered article detail view
│   ├── search/page.tsx          # Word-boundary search with query normalization
│   ├── globals.css              # Tailwind v4 theme, animations, typographic scales
│   ├── layout.tsx               # Root layout, font variable registration, nav
│   └── page.tsx                 # Paginated feed with tabbed views and trending rail
├── components/
│   ├── article/                 # Portable Text renderer, TOC, clapper, popover
│   ├── feed/                    # Horizontal post cards, trending rails
│   ├── navigation/              # Header, search link, access dialog, footer
│   └── ui/                      # WCAG AAA compliant buttons, badges, avatars
├── hooks/                       # Domain hooks (selection, claps, bookmarks, progress)
├── lib/                         # Sanity client, rate limiter, mock dataset, utils
└── types/                       # Pure TypeScript domain models and AST types
```

---

## Defensive Engineering Audit

Every feature in Monograph adheres to Tier-1 enterprise reliability benchmarks:

* **Stored XSS Neutralization (SEC-01):** Links rendered from Portable Text run through `isValidHref()`, blocking `javascript:`, `data:`, `vbscript:`, and protocol-relative `//` bypasses.
* **Anti-Automation Throttling (SEC-05):** In-memory sliding buckets (`src/lib/rate-limit.ts`) enforce strict IP-based ceilings on unauthenticated endpoints (60 claps/min, 30 views/min) returning HTTP 429 with standard `Retry-After` headers.
* **Session Deduplication:** View count beacons verify `sessionStorage` before dispatch, preventing artificial counter inflation during React StrictMode double mounts and browser navigation restores.
* **Touch Footprint Compliance (WCAG AAA):** All interactive buttons and mobile dock triggers maintain a minimum touch bounding box of 44x44px with dedicated `env(safe-area-inset-bottom)` padding for iOS gesture bars.
* **Heading Anchor Stability (DATA-03):** Table of Contents anchor generation uses deterministic 32-bit key hashing when headings contain non-Latin scripts or symbol-only text, preventing empty `id=""` attribute collisions.

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/mmy-lana/monograph-cms.git
cd monograph-cms
pnpm install
```

### 2. Configure Environment (Optional)

Monograph boots out-of-the-box using an internal 20-monograph production mock dataset. To connect a live Sanity CMS project, populate `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your_editor_write_token
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio.sanity.studio
```

*Note: If `SANITY_API_WRITE_TOKEN` is unset, the application automatically falls back to in-memory mutations without throwing upstream 401 errors.*

### 3. Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` in your browser.

---

## Verification & Quality Gates

Run the static analysis and production build checks:

```bash
# Type-check TypeScript codebase without emitting artifacts
pnpm typecheck

# Build optimized production bundle
pnpm build

# Start production server locally
pnpm start
```

---

## License

MIT License. Engineered for open technical publishing.
