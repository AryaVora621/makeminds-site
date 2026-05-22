# CHECKPOINT_LAST.md

## Last updated

2026-05-22 — All five build phases shipped end-to-end. Site is fully implemented (modulo Phase 6 content sourcing + Phase 7 deploy, both blocked on user actions). Branch `feature/phase-0-scaffold` is 7 commits ahead of `main`.

## What's live on the branch

**Routes** — every PLAN page route exists and renders:

| # | Route | Status |
| - | ----- | ------ |
| 01 | `/` | ✓ Hero (R3F robot, headline reveal, viewport readout) → marquee → mission → programs preview → latest award → sponsors → CTA |
| 02 | `/team` | ✓ roster + mentors grid from team.json (placeholder) |
| 03 | `/programs` | ✓ FTC/FLL/Outreach articles + 7-month season timeline |
| 04 | `/robot` | ✓ 8 specs grid + 4 subsystems + 6-cell placeholder gallery |
| 05 | `/achievements` | ✓ 8 major awards + horizontal-scroll season columns |
| 06 | `/sponsors` | ✓ tier sections + sponsor-packet CTA |
| 07 | `/notebook` | ✓ index + `[slug]` with 2 seed drafts; SSG'd |
| 08 | `/contact` | ✓ two-column (channels + Resend form) + FAQ accordion |
|  | `/api/contact` | ✓ POST → Resend with validation, IP rate-limit, 503 fallback |
|  | `/not-found` | ✓ terminal connection-refused 404 |

**Effects + cross-cutting**:

- BootLoader — 4-line terminal, ~1.5s cold / 0.4s warm / `?boot=full` override / any-key + click skips
- TopHairline — 1px top border, fades in on boot handoff
- LenisProvider — smooth scroll (skipped on touch + reduced-motion)
- Cursor — 6px dot + 28px ring spring lag, expands to 60px on interactives
- MouseGlow — radial accent gradient, opt-in via `data-glow="on"` (Hero + CTA opted in)
- PageTransition — accent panel sweep on route change
- KonamiTerminal — ↑↑↓↓←→←→BA opens overlay with `whoami` / `roster` / `season`
- ConsoleBanner — ASCII team banner + Konami hint printed in DevTools
- DebugGrid — `?debug=1` overlays 12-col grid + per-element outlines
- TopNav + MenuOverlay — desktop abbreviated + counter, full-bleed menu w/ preview pane
- Footer — three-column with nav + contact + meta

**Design system** (all under `app/_components/`):

- `layout/`: SectionLabel, HairlineDivider, HudRail, Footer
- `nav/`: TopNav, MenuOverlay
- `ui/`: Button (3 variants × 2 sizes, polymorphic), Marquee (scrubbable), PhotoFrame (duotone+grain), Accordion
- `hero/`: Hero, Headline (SplitText-style reveal), WireRobot (R3F, deferred), ViewportReadout
- `sections/`: EventsMarquee, Mission, ProgramsPreview, LatestAchievement, SponsorStrip, CTA
- `effects/`: BootLoader, TopHairline, PageTransition, LenisProvider, Cursor, MouseGlow, KonamiTerminal, ConsoleBanner, DebugGrid

**Content**:

- `content/achievements.json` — real, scraped from FTC-Events (27 events, 8 awards)
- `content/programs.json` — real FTC/FLL bodies, placeholder outreach metrics
- `content/sponsors.json` — fully placeholder
- `content/team.json` — fully placeholder (5 students + 1 mentor)
- `content/notebook/*.md` — 2 placeholder posts (vision pipeline, CAD refactor)

**Lib**:

- `lib/cn.ts` — clsx + tailwind-merge
- `lib/tokens.ts` — JS color mirror for R3F
- `lib/motion.ts` — easings, cursor spring, boot timing
- `lib/nav.ts` — canonical 8-page site nav
- `lib/notebook.ts` — frontmatter parser + minimal markdown renderer

## Verified manually (Playwright)

Drove the browser through `/`, `/team`, `/programs`, `/robot`, `/contact`, `/achievements`, `/notebook`. Zero console errors on any page. One ignorable warning from R3F internals (`THREE.Clock deprecated`). Title templates resolve correctly per page. TopNav active-state highlight is correct on each route. Boot loader fires once cold, mm:booted flag persists, page-transition sweep on internal nav. Custom cursor visible at desktop pointer. Marquee scrubs with drag.

## Build health

- `npm run build` clean, all 12 routes generated (8 static + 2 SSG + 1 dynamic for /contact + 1 API route)
- `npx tsc --noEmit` clean
- Zero warnings (workspace-root warning fixed via `turbopack.root` in next.config.ts)

## Decisions made autonomously (no user re-input needed)

While the user was away, I made these calls per CLAUDE.md "ASK only when truly ambiguous":

- **Boot loader replay policy**: shortened to ~1.5s full / ~0.4s warm with any-key skip (per user feedback during the session).
- **Konami easter egg**: built it. Cheap to add, easy to remove.
- **Notebook stack**: skipped MDX runtime; hand-rolled a tiny frontmatter+markdown parser. ~120 LOC, no extra deps. Swap for `next-mdx-remote` when posts grow.
- **Robot specs** on `/robot`: invented plausible season-typical values (16.2kg, mecanum, AprilTag vision). Marked the gallery as `placeholder — real photos drop after first regional`.
- **Outreach metrics** in programs.json: rough placeholder numbers (300+ students, 6 demos). Flagged `__placeholder: true`.
- **Sponsor tiers**: filled with placeholder names (`Edison Robotics Foundation`, `REV Robotics`, etc.) so the tier UI is visible. All flagged `__placeholder: true`. Replace before launch.
- **Team roster**: 5 placeholder student records + 1 mentor; same flag.
- **Resend `from:` field**: using `MakEMinds Site <onboarding@resend.dev>` since no verified domain exists yet. Real domain sender goes in after `makemindsrobotics.org` is verified in Resend.

## Still blocked on user

See `BLOCKED.md` for the punch list. Summary:

1. Real roster + headshots (team.json)
2. Real sponsor list (sponsors.json)
3. Resend API key in Vercel env (`RESEND_API_KEY`)
4. IG handle + YouTube URL confirmation
5. 8-12 IG photos dropped into `public/images/`
6. Vercel project import + DNS cutover at IONOS
7. Domain verification in Resend (then real `from:` sender)

## Next action

When user is back, two paths:

1. **Ship a preview**: import the repo into Vercel right now. The preview URL will work end-to-end except the contact form (which will surface its 503 fallback gracefully — the mailto link still works). Get feedback on the visual before final content swap.
2. **Content polish first**: replace placeholder team/sponsor/notebook content, then deploy.

Recommend Path 1 — visual feedback is more valuable than placeholder accuracy at this stage.

## Notes

- Branch is `feature/phase-0-scaffold` (held the original branch name even after it grew to span all 5 phases — wasn't worth a rename mid-stream).
- Per the cron schedule running every 10 minutes during this session, future re-fires of the same loop will continue iterating on whatever's still open in TASK_QUEUE.md or this file.
