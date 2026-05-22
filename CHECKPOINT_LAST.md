# CHECKPOINT_LAST.md

## Last updated

2026-05-22 — planning phase + design preview generated, build paused.

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

## Human decisions needed before next session

1. **Logo asset**: ✅ Simplified SVG mark hand-built. May still want a `logo-lockup.svg` (mark + wordmark in chosen display font) — revisit after font pick.
2. **Display font**: open `design/preview.html` in a browser, pick one of the 8 (all free / OFL). My ranking: **Bricolage Grotesque** > **Unbounded** > **Syne** > **Space Grotesk** > rest. Tell me which one wins.
3. **Robot photos**: any high-res shots beyond the current Google Sites hero? Drive folder location?
4. **Team roster**: roles + headshots + bios for each member — who owns gathering this?
5. **Sponsor list**: current tier breakdown (Title / Gold / Silver / Friends) — confirm or adjust.
6. **Resend account**: do you have one set up, or should I walk through creating it (free tier covers contact form volume)?
7. **DNS at IONOS**: coach owns the IONOS account. When ready for cutover we'll need them to add an A record (`@ → 76.76.21.21`) and a CNAME (`www → cname.vercel-dns.com`).
8. **Achievements**: open `design/preview.html` and confirm the 8 awards I scraped are correct + complete. Anything missing for 2026 season (AGE)?
9. **YouTube URL**: I left the channel link as a placeholder — give me the real URL.
10. **Instagram handle**: assumed `@makemindsrobotics` — confirm (or correct).

## Open questions logged

- Should the boot loader replay on every cold load, or only on first-visit-ever? Current plan: full on first visit, 0.4s short version after, `?boot=full` for demos. Confirm.
- Konami code easter egg: do you want one? Plan includes it but it can be cut.
- `prefers-reduced-motion` for the boot loader: collapse to 200ms fade is the current plan; some users may want a "skip" button instead. Worth a UX call.

## Notes

- IONOS apex is parked. Google Sites currently reachable only via `/home` subpath redirect.
- Domain ownership is via IONOS (not Google Domains / Squarespace).
- Twitter / X handle was not present on current site — confirm if one exists.
