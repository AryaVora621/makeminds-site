# MakEMinds Robotics — site rebuild plan

> Frozen on 2026-05-22. Resume by reading this file, then `TASK_QUEUE.md`, then `CHECKPOINT_LAST.md`.

## Context

`makemindsrobotics.org` currently routes to a Google Sites page (Home / Our Programs / Achievements / Sponsors / Contact) with a robot photo hero, a serif title, and the team's lightbulb-in-circuit logo. The apex domain is parked on IONOS — Google Sites is reached only through a `/home` path, so direct visitors see an IONOS "domain registered" page. Visually it reads as a default template: no motion, no personality, no signal of technical sophistication.

The team wants a complete rebuild that:

- Looks like it was made in 2040 — opinionated motion, mouse reactivity, scroll choreography, terminal-style boot loader.
- Would impress a senior front-end engineer, not just a parent or judge.
- Matches the existing dark circular logo and FTC-team identity.
- Borrows the editorial calm of hackjps.org (large type, generous whitespace, monospace accents, sharp section breaks) without copying it.

Scope: full redesign + rebuild, 8 pages, animated boot sequence, custom design system, deployed to Vercel under the existing domain. Ship Home first at a flagship level (every animation, every detail), then fast-follow the rest at the same quality bar.

## Decisions locked

| Item | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties for theme tokens |
| Motion | Framer Motion (component-level), GSAP + ScrollTrigger (scroll choreography), Lenis (smooth scroll) |
| 3D / canvas | React Three Fiber + drei (hero, robot showcase). Postprocessing for bloom/chromatic. |
| Fonts | `Geist` (UI body), `Geist Mono` (terminal, captions, numbers), `Editorial New` or `PP Neue Montreal` (display) — self-hosted via `next/font/local` |
| Icons | Lucide + custom SVGs |
| CMS / content | MDX in-repo for blog (Engineering Notebook). Static JSON for team/sponsors/achievements. No external CMS in v1. |
| Forms | Vercel serverless function → Resend for the contact form. No DB. |
| Analytics | Vercel Analytics + Speed Insights |
| Hosting | Vercel Hobby, A/CNAME records at IONOS pointing apex + www to Vercel |
| Repo | `AryaVora621/makeminds-site` (public). `main` auto-deploys; PRs get preview URLs. |

## Brand & visual language

Design north star: dark-mode-first, monochrome with one electric accent, editorial layout, monospace as a structural element, motion as a first-class material.

### Color tokens

```
--bg          #0A0B0E   near-black, not pure black (less harsh, better for OLED + bloom)
--bg-elev     #111318   one step up for cards
--bg-grain    layered SVG noise at 4% opacity over --bg
--fg          #F4F4F1   off-white (warmer than #FFF, reads premium)
--fg-muted    #8A8F98
--fg-dim      #4A4F58
--border      #1E2128
--accent      #C8FF00   electric lime — single hero accent, used sparingly
--accent-dim  #5A7300
--warn        #FF6B35   reserved for terminal errors in boot loader only
```

A single saturated accent against warm-black + warm-white is the hackjps move and what reads "design-led" vs "AI-generated gradient slop." Lime over the more obvious blue/cyan keeps the site from looking like every other robotics team.

### Typography scale

- Display (hero, page H1s): `PP Neue Montreal` or `Editorial New`, 72–180px, tracking -0.04em, line-height 0.95
- H2: 40–56px, tracking -0.02em
- Body: Geist 16/26
- Caption / metadata: Geist Mono 12/16, uppercase, tracking 0.08em
- Numbers / counters: Geist Mono, tabular figures

Mono is used **structurally** — as section labels (`[01] / WHO`), timestamps, coordinate labels next to images, status indicators. Not decorative.

### Layout system

- 12-col grid, 80px gutter on desktop, asymmetric — content sits in cols 2–8 or 5–12, never centered with equal margins. This kills the "Google Sites centered block" feeling instantly.
- Section markers in the top-left of every section: `[02] PROGRAMS · 2025–26`
- Horizontal hairline dividers in `--border`, never thicker than 1px.
- A persistent left-edge HUD on desktop showing page section index + scroll progress, mono.

### Photo treatment

Every uploaded photo is run through a duotone + grain pipeline:

```
filter: grayscale(1) contrast(1.05);
mix-blend-mode: lighten;
background: --bg-elev tinted with --accent at 6%;
```

The result: photos blend into the dark background as if they were rendered into the page, not pasted on. No floating jpegs. For hero photography, we composite an SVG noise overlay + soft vignette so a single robot shot reads as intentional art direction.

## Signature interactions

The "shock a pro dev" moments. Each lives under `app/_components/effects/` once built.

### 1. Boot loader (first paint, ~2.4s)

Full-viewport `<BootLoader />` mounts at root layout before anything else. Pure terminal aesthetic.

```
[ make-minds-robotics.boot ]
> initializing systems......... OK
> loading manifest............. OK
> auth: GUEST                   [ pass ]
> resolving makemindsrobotics.org
  ▸ 76.76.21.21
  ▸ TLS 1.3, HSTS enabled
> mounting /home              [████████████░] 87%
> mounting /home              [██████████████] 100%
> ready.

press [ enter ] to continue, or wait 1.2s
```

- Typewriter timing per line (24–60ms/char, GSAP timeline).
- Cursor blink in `--accent`.
- "press [ enter ]" — actually wired: Enter key or click skips remaining wait.
- After the last line, the terminal collapses into a 1px horizontal line that flies to the top of the viewport and becomes the page's top hairline border. Coordinated handoff so it doesn't fade — it transforms.
- LocalStorage flag `mm:booted=1` so returning visitors get a 0.4s minimal version. `?boot=full` query param replays the full sequence for showing off.
- Skip-link respected; `prefers-reduced-motion` collapses the whole thing to a 200ms fade.

### 2. Hero (Home page)

- Headline `MAKEMINDS / ROBOTICS` in display face, broken across two lines, kinetic on mount — characters mask-reveal from below with stagger 0.012s, GSAP SplitText.
- Behind the text: a slow-rotating wireframe robot built in R3F. Low-poly, edges-only material, slight chromatic aberration. Mouse position drives subtle camera parallax (lerped, never jittery). Idle, the model breathes ±2° rotation.
- Mouse leaves a 1px crosshair with `(x, y)` mono coordinates and a "VIEWPORT 1440×900" readout in the corner — purely visual but immediately reads "made by people who care."
- Marquee row below the fold: `FTC TEAM 23786 · SEASON 2025–26 · NEW JERSEY · MAKEMINDS ROBOTICS ·` infinite scroll, scrubs in reverse based on scroll velocity.

### 3. Scroll-driven section reveals

GSAP ScrollTrigger pinned timelines on key sections:

- **About**: text blocks fade in one phrase at a time as the section pins. A meter on the left fills as you progress. When it hits 100% the pin releases.
- **Programs (FTC / FLL / Outreach)**: three vertical panels. As you scroll, the active panel slides to full-bleed; the others compress to thin labeled spines on the right. Click a spine to expand it; previous one collapses.
- **Achievements**: horizontal scroll section. Vertical wheel = horizontal page motion via GSAP. Each award is a card with giant year, place, event, photo with the duotone treatment.

### 4. Interactive nav

- Top-right nav, mono uppercase. Hovering a label slides a 1px underline left→right + advances a counter `(03)` next to the active item.
- Clicking opens a full-bleed menu overlay: left half is a giant index `[01] HOME / [02] PROGRAMS / ...`, right half is a live preview thumbnail of the page being hovered.
- Closing animates outward as 12 vertical bars retreating to the edges.

### 5. Mouse reactivity (global, subtle)

- Custom cursor: 6px dot + 28px ring that lags behind with a spring. On any interactive element, ring expands to 60px and the dot inverts color. Disabled on touch.
- A faint `--accent` glow follows the cursor through hero/CTA blocks via a radial gradient masked to the section. ~12% opacity max.
- Image cards: cursor magnet — within 80px, the card translates 4–6px toward the cursor. Spring damping 18.

### 6. Page transitions

App Router page transitions use a single horizontal panel sweep: lime panel slides in from right covering everything, page swaps under it, panel slides off-left. ~520ms total. Kills the "different site" feel of route changes.

### 7. Easter eggs

- Konami code → terminal opens with three real commands: `whoami`, `roster`, `season`. Output is real team data. Closes on `exit`.
- `console.log` ASCII banner with team name + recruiting line + email.
- View-source comment block at the top with team tagline and credit.
- `?debug=1` query param turns on a grid overlay + element box-model outlines.

## Pages

8 pages. Home is the flagship, the rest share the design system and progressively cheaper animation budgets.

| # | Route | Priority | Key content blocks |
| --- | --- | --- | --- |
| 01 | `/` Home | P0, flagship | Boot loader, hero with R3F robot, marquee, mission, programs preview, latest achievement, sponsor strip, CTA |
| 02 | `/team` | P0 | Roster grid with hover-reveal bios, role/year metadata, dual-tone portraits |
| 03 | `/programs` | P0 | FTC + FLL + Outreach kinetic panels, season timeline |
| 04 | `/robot` | P0 | Current season robot showcase, scroll-driven spec reveal, photo gallery, CAD render placeholder |
| 05 | `/achievements` | P1 | Horizontal-scroll timeline of awards/results |
| 06 | `/sponsors` | P1 | Tiered logo grid (Title / Gold / Silver / Friends), sponsor CTA, sponsor packet PDF link |
| 07 | `/notebook` | P1 | MDX engineering blog index + post pages with code blocks, build-season tags |
| 08 | `/contact` | P0 | Two-column layout (see Contact Pattern below): direct-link channels + form (Resend), FAQ accordion |

### Contact pattern (revised)

The contact page splits in two:

**Left column — direct channels**, large hover-reactive list, monospace-coded keys:

```
[ 01 / EMAIL    ]  info@makemindsrobotics.org      →
[ 02 / INSTAGRAM]  @makemindsrobotics              ↗
[ 03 / YOUTUBE  ]  MakEMinds Robotics              ↗
[ 04 / LOCATION ]  Edison, NJ — USA                ·
```

Each row is a real anchor (`mailto:`, IG, YouTube). On hover: the row inset-shifts 16px right, the arrow turns `--accent`, a subtle lime wash slides under it. Mono uppercase keys, display-font values.

**Right column — message form**, posts to `/api/contact` via Resend serverless function. Fields: name, email, reason (select: sponsorship / mentor / partnership / outreach / judging / other), message. Submit button is a lime mono "TRANSMIT →" with translateY hover.

**Mailto fallback** sits just below the submit row: `or email us direct: info@makemindsrobotics.org` — so the form is never a hard dependency. If JS is broken or Resend is down, the mailto link still works.

Both halves stack into a single column on mobile.

Build order: Home → shared design system tokens / components → Team → Programs → Robot → Contact → Sponsors → Achievements → Notebook.

## File / folder structure

```
makeminds-site/
├─ app/
│  ├─ layout.tsx              # boot loader mount, fonts, cursor, lenis provider
│  ├─ page.tsx                # Home
│  ├─ team/page.tsx
│  ├─ programs/page.tsx
│  ├─ robot/page.tsx
│  ├─ achievements/page.tsx
│  ├─ sponsors/page.tsx
│  ├─ notebook/page.tsx
│  ├─ notebook/[slug]/page.tsx
│  ├─ contact/page.tsx
│  ├─ api/contact/route.ts    # POST → Resend
│  └─ _components/
│     ├─ effects/
│     │  ├─ BootLoader.tsx
│     │  ├─ Cursor.tsx
│     │  ├─ PageTransition.tsx
│     │  ├─ LenisProvider.tsx
│     │  ├─ NoiseOverlay.tsx
│     │  └─ MouseGlow.tsx
│     ├─ hero/
│     │  ├─ Hero.tsx
│     │  ├─ WireRobot.tsx     # R3F scene
│     │  └─ Headline.tsx      # SplitText reveal
│     ├─ nav/
│     │  ├─ TopNav.tsx
│     │  └─ MenuOverlay.tsx
│     ├─ layout/
│     │  ├─ SectionLabel.tsx  # `[02] PROGRAMS · 2025–26`
│     │  ├─ HairlineDivider.tsx
│     │  └─ HudRail.tsx       # left-edge progress
│     └─ ui/
│        ├─ Marquee.tsx
│        ├─ PhotoFrame.tsx    # duotone + grain pipeline
│        ├─ Accordion.tsx
│        └─ Button.tsx
├─ content/
│  ├─ team.json
│  ├─ achievements.json
│  ├─ sponsors.json
│  ├─ programs.json
│  └─ notebook/*.mdx
├─ public/
│  ├─ fonts/
│  ├─ images/  (sourced — see below)
│  └─ logo.svg (cleaned vector)
├─ lib/
│  ├─ motion.ts               # shared easings, spring configs
│  ├─ tokens.ts               # color/space tokens mirrored for JS consumers
│  └─ analytics.ts
├─ tailwind.config.ts
├─ next.config.ts
└─ package.json
```

## Content sourcing plan

Per the user's choice: pull what we can from the current site + Instagram + FTC sources, fill gaps with placeholders.

Already collected (2026-05-22):
- Team identity confirmed via FTC-Events: **Team 23786 MakEMinds, Edison NJ, rookie 2023, 27 events across 2 seasons.**
- Award history scraped end-to-end into `content/achievements.json` (Inspire 2nd 2025, Inspire 3rd 2024, Think, Control, multiple Finalist/Winning alliance captains at NJ Championship).
- Original detailed logo PNG saved to `public/logo-full.png`.
- Clean hand-built simplified brand mark saved to `public/logo-mark.svg` (uses `currentColor` — themeable to white/lime/dark per context).

Still to gather:
1. **Logo refinement**: simplified mark is built; may want a wordmark `logo-lockup.svg` (mark + "MakEMinds" set in chosen display font).
2. **Mission copy**: lift verbatim from current site ("MakEMinds Robotics is a dynamic community…"). Tighten by ~30% for the new hero.
3. **Hero photo**: the current robot-on-bench shot. Re-export at high res; apply duotone in component.
4. **Achievements**: lift bullets from `/achievements`. Add years/places/events into `content/achievements.json`.
5. **Sponsors**: enumerate from `/sponsors` page. Logos sourced from sponsor websites (PNG + SVG where available).
6. **Programs**: lift FTC / FLL descriptions, restructure for the kinetic panel layout.
7. **Instagram**: pull 8–12 best shots (events, builds, outreach) for the team page collage + outreach section. Each gets the duotone treatment.
8. **Contact**: `info@makemindsrobotics.org`, IG `@makemindsrobotics` (verify handle), YouTube channel link from current site.

Placeholders flagged in content JSON with `__placeholder: true` so build warns before deploy.

## Performance & accessibility budget

Non-negotiable, even with heavy motion:

- LCP < 2.0s on 4G mobile (hero photo pre-loaded, R3F deferred until idle, boot loader doesn't block LCP candidate)
- Total JS < 220KB gzipped on first nav
- All animations honor `prefers-reduced-motion`: boot loader collapses to fade, R3F static, ScrollTrigger pins disabled, cursor reverts to native
- Keyboard navigable: focus rings in `--accent`, skip-link to main, Tab order tested per page
- Color contrast ≥ 4.5:1 for body, ≥ 3:1 for large text — verified against the dark palette
- All photos `next/image` with explicit width/height, blur placeholder
- R3F scene: <30k polys, frustum culled, paused when off-screen via IntersectionObserver

## Deployment

1. Push to `AryaVora621/makeminds-site` on GitHub.
2. Import into Vercel; framework auto-detected; build settings default.
3. At IONOS DNS: add `A` record `@ → 76.76.21.21`, `CNAME` `www → cname.vercel-dns.com`. TTL 3600. Domain verifies in Vercel within ~10 minutes.
4. Add `RESEND_API_KEY` env var in Vercel for the contact form.
5. Vercel Analytics + Speed Insights enabled.
6. Each PR auto-deploys to a preview URL.

## Verification (per page, before "done")

- **Boot loader**: cleared storage → full sequence plays → handoff to top border is seamless. `mm:booted=1` → fast variant. `?boot=full` → full again. `prefers-reduced-motion` → 200ms fade only.
- **Hero**: hard reload, watch LCP in Lighthouse (< 2.0s). Move mouse → wireframe parallax tracks. Disable JS → headline + photo still render.
- **Scroll**: full-page scroll on trackpad and mouse wheel. Lenis should not lag input. ScrollTrigger pins release cleanly on resize.
- **Nav menu**: open / close 5x rapidly without state breaking. Tab through all items keyboard-only.
- **Photo treatment**: every photo gets `<PhotoFrame>`. Visual sweep: no raw jpegs visible against page bg.
- **Contact form**: submit with valid + invalid email, empty fields, too-long input. Verify Resend delivery + serverless 200/400 codes.
- **Routes**: visit every page via in-app nav and direct URL. Page transition plays both ways.
- **Lighthouse**: on Home, Team, Robot. Performance ≥ 90, A11y ≥ 95, Best Practices ≥ 95.
- **Reduced motion**: macOS Reduce Motion ON. Reload. No motion sickness vectors remain.
- **Cross-device**: iPhone Safari, Android Chrome, MacBook Chrome + Safari + Firefox, Windows Chrome. 320px → 2560px without overflow.
- **DNS cutover**: pre-cutover, dev URL fully QA'd. Cutover during low-traffic window. Monitor `dig makemindsrobotics.org` until both A + CNAME resolve to Vercel.

## Out of scope for v1

- Multi-language
- Member-only / admin areas
- CMS UI (content edits via PR for now)
- Online merch / donations checkout
- Match scouting tools

These can be added later without restructuring; the architecture leaves room (App Router segments, env-flagged routes).
