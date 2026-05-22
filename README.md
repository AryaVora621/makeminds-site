# makeminds-site

Rebuild of [makemindsrobotics.org](https://makemindsrobotics.org) for FTC Team 23786 — MakEMinds Robotics.

Currently a planning/scaffold repo. **Implementation has not started.** The full design and build plan lives in [`PLAN.md`](./PLAN.md).

## Status

> **Phase: Planning frozen, build paused.** Resume when ready.

## Target

A dark-mode-first, motion-heavy site that would impress a senior front-end engineer. Eight pages, terminal-style boot loader, scroll-driven section reveals, mouse-reactive hero with a wireframe R3F robot, monospace HUD details, custom cursor, page transitions, easter eggs.

Inspiration reference: [hackjps.org](https://hackjps.org) — editorial calm, monospace as structure, large type, sharp section breaks.

## Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 + CSS custom-property tokens
- **Motion**: Framer Motion + GSAP/ScrollTrigger + Lenis
- **3D**: React Three Fiber + drei
- **Fonts**: Geist + Geist Mono + PP Neue Montreal (or Editorial New)
- **Forms**: Resend via Vercel serverless function
- **Hosting**: Vercel Hobby, domain `makemindsrobotics.org` via IONOS DNS

## Resume here (next session)

1. Read `PLAN.md` end-to-end.
2. Read `TASK_QUEUE.md` for the build order and what's in flight.
3. Read `CHECKPOINT_LAST.md` for the last known state and next action.
4. Read `CLAUDE.md` for project-specific operating rules.
5. Confirm with the user, then begin Phase 1 of the build (scaffold Next.js app).

## Repo conventions

- Branch off `main` for any feature work; PRs auto-deploy to Vercel previews.
- Conventional Commits encouraged but not enforced.
- Content (team, sponsors, achievements) lives in `content/*.json` — edited via PR until a CMS is added.
- Engineering Notebook blog posts live in `content/notebook/*.mdx`.

## Contact

`info@makemindsrobotics.org`
