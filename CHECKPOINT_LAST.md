# CHECKPOINT_LAST.md

## Last updated

2026-05-22 — typography + logo + contact pattern + events marquee all approved/locked. Build still paused.

## Completed this session

- Full design + implementation plan drafted (`PLAN.md`).
- Reviewed current Google Sites version of makemindsrobotics.org via Playwright screenshot.
- Locked stack: Next.js 15 + TS + Tailwind v4 + Framer Motion + GSAP + Lenis + R3F.
- Locked hosting: Vercel under existing `makemindsrobotics.org` domain (IONOS DNS, A + CNAME records).
- Locked page set: Home, Team, Programs, Robot, Achievements, Sponsors, Notebook, Contact (8 pages).
- Logo identified: dark circular badge, lightbulb-in-circuit, white/silver linework. Needs to be re-traced as a clean vector before Phase 2.
- Created local project folder `~/Desktop/makeminds-site` and seeded with `PLAN.md`, `README.md`, `CLAUDE.md`, `TASK_QUEUE.md`.
- Created GitHub repo `AryaVora621/makeminds-site` (public) and pushed initial commit.
- Hand-built simplified brand-mark SVG: `public/logo-mark.svg` (uses `currentColor` for theming).
- Saved original detailed PNG: `public/logo-full.png` (use for hero / large display).
- Scraped award history from FTC-Events into `content/achievements.json` (Team 23786, Edison NJ, rookie 2023, 8 awards across 3 seasons).
- Built `design/preview.html` — open this in a browser to:
  1. compare SVG mark (3 treatments + favicon sizes) against the original PNG,
  2. compare 8 candidate display fonts side-by-side rendering "MAKEMINDS ROBOTICS",
  3. interact with the new two-column contact pattern (channels + form + mailto fallback),
  4. verify scraped award data is correct.
- Updated `PLAN.md` content-sourcing section with what's already collected, and added the revised contact pattern spec.

## In-progress

Nothing. Implementation paused at user's request.

## Next action

Resume by opening this folder, reading `PLAN.md` then `TASK_QUEUE.md`, and starting Phase 0 (Scaffold). First concrete command:

```
cd ~/Desktop/makeminds-site
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

Then install the motion stack:

```
npm i framer-motion gsap lenis three @react-three/fiber @react-three/drei @react-three/postprocessing resend lucide-react clsx tailwind-merge
```

## Locked decisions (no further input needed)

- **Logo**: user's traced `image2vector.svg` is the canonical mark (saved to `public/logo-mark.svg`). Has baked-in colors — won't recolor — but renders beautifully on the dark bg. Optimize via SVGO during build.
- **Display font**: **Space Grotesk** (700/600).
- **Body font**: **DM Sans** (400/500/700).
- **Mono font**: **Geist Mono** (400/500) — captions, metadata, terminal.
- **Contact pattern**: two-column (channels left, form right) is approved.
- **Events marquee**: confirmed as a Home-page block, infinite right-to-left, 120s, pause on hover, all 27 events.

## Still open

1. **Robot photos**: any high-res shots beyond the current Google Sites hero? Drive folder location?
2. **Team roster**: roles + headshots + bios for each member — who owns gathering this?
3. **Sponsor list**: current tier breakdown (Title / Gold / Silver / Friends) — confirm or adjust.
4. **Resend account**: do you have one, or should I walk through creating it (free tier covers form volume)?
5. **DNS at IONOS**: ✅ coach owns the account. When ready, they add `A @ → 76.76.21.21` and `CNAME www → cname.vercel-dns.com`.
6. **Achievements**: confirm the 27 events + 8 awards are correct, and flag anything missing from the current 2026 AGE season.
7. **YouTube URL**: I left the channel link as a placeholder — give me the real URL.
8. **Instagram handle**: assumed `@makemindsrobotics` — confirm (or correct).
9. **IG photos**: still need 8–12 of your favorite shots dropped into `public/images/` — couldn't scrape, IG blocks it.

## Open questions logged

- Should the boot loader replay on every cold load, or only on first-visit-ever? Current plan: full on first visit, 0.4s short version after, `?boot=full` for demos. Confirm.
- Konami code easter egg: do you want one? Plan includes it but it can be cut.
- `prefers-reduced-motion` for the boot loader: collapse to 200ms fade is the current plan; some users may want a "skip" button instead. Worth a UX call.

## Notes

- IONOS apex is parked. Google Sites currently reachable only via `/home` subpath redirect.
- Domain ownership is via IONOS (not Google Domains / Squarespace).
- Twitter / X handle was not present on current site — confirm if one exists.
