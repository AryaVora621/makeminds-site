# CHECKPOINT_LAST.md

## Last updated

2026-05-22 — session ended after planning phase.

## Completed this session

- Full design + implementation plan drafted (`PLAN.md`).
- Reviewed current Google Sites version of makemindsrobotics.org via Playwright screenshot.
- Locked stack: Next.js 15 + TS + Tailwind v4 + Framer Motion + GSAP + Lenis + R3F.
- Locked hosting: Vercel under existing `makemindsrobotics.org` domain (IONOS DNS, A + CNAME records).
- Locked page set: Home, Team, Programs, Robot, Achievements, Sponsors, Notebook, Contact (8 pages).
- Logo identified: dark circular badge, lightbulb-in-circuit, white/silver linework. Needs to be re-traced as a clean vector before Phase 2.
- Created local project folder `~/Desktop/makeminds-site` and seeded with `PLAN.md`, `README.md`, `CLAUDE.md`, `TASK_QUEUE.md`.
- Created GitHub repo `AryaVora621/makeminds-site` (public) and pushed initial commit.

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

1. **Logo asset**: do you have a clean SVG, or should I trace from the existing PNG?
2. **Display font**: PP Neue Montreal (Pangram Pangram, paid) vs Editorial New (PP, paid) vs a free alternative (Inter Display, General Sans)? Affects budget.
3. **Robot photos**: any high-res shots beyond the current Google Sites hero? Drive folder location?
4. **Team roster**: roles + headshots + bios for each member — who owns gathering this?
5. **Sponsor list**: current tier breakdown (Title / Gold / Silver / Friends) — confirm or adjust.
6. **Resend account**: do you have one set up, or should I walk through creating it (free tier covers contact form volume)?
7. **DNS at IONOS**: who has the IONOS login? Cutover requires adding two records — needs to be done by the account holder.

## Open questions logged

- Should the boot loader replay on every cold load, or only on first-visit-ever? Current plan: full on first visit, 0.4s short version after, `?boot=full` for demos. Confirm.
- Konami code easter egg: do you want one? Plan includes it but it can be cut.
- `prefers-reduced-motion` for the boot loader: collapse to 200ms fade is the current plan; some users may want a "skip" button instead. Worth a UX call.

## Notes

- IONOS apex is parked. Google Sites currently reachable only via `/home` subpath redirect.
- Domain ownership is via IONOS (not Google Domains / Squarespace).
- Twitter / X handle was not present on current site — confirm if one exists.
