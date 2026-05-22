# CHECKPOINT_LAST.md

## Last updated

2026-05-22 — Phase 0 scaffold landed. Next.js 16 + Tailwind v4 + token theme + tri-font stack are wired and building clean.

## Completed this session

- Resolved doc drift: PLAN.md, CLAUDE.md, TASK_QUEUE.md now all agree on steel-blue `#649dc7` accent (lime references removed) and Space Grotesk + DM Sans + Geist Mono via `next/font/google` (stale self-hosted/PP-Neue mention deleted).
- Scaffolded Next.js into the existing repo via `create-next-app` → `/tmp/mm-scaffold` → selective merge so PLAN/CLAUDE/TASK_QUEUE/README/content/public/design/.git were preserved.
- Scaffold version: **Next 16.2.6** (not 15 — `@latest` shipped Next 16, App Router APIs unchanged, no plan impact).
- Stack settings: TypeScript strict, Tailwind v4, App Router, no `src/`, alias `@/*`, ESLint, Turbopack.
- Installed motion + 3D + form deps: `framer-motion`, `gsap`, `lenis`, `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `resend`, `lucide-react`, `clsx`, `tailwind-merge`, `@types/three`.
- `app/globals.css`: declared all PLAN color tokens, mirrored into `@theme inline` so Tailwind utilities like `text-fg`, `text-accent`, `bg-bg-elev` resolve; declared font CSS vars; added `prefers-reduced-motion` global override and `.bg-grain` SVG noise overlay.
- `app/layout.tsx`: loads Space Grotesk / DM Sans / Geist Mono with the variable names tokens expect; declares site metadata (title template, OG, robots); applies `.bg-grain` to body.
- `app/page.tsx`: replaced boilerplate with a Phase-0 holding page that proves tokens + fonts render (display headline, mono section label, accent dot, status checklist).
- `lib/tokens.ts`: JS-readable color mirror for R3F / canvas consumers.
- `lib/motion.ts`: shared easings (`outQuint`, `outExpo`, `inOutCirc`), cursor spring, boot-loader timing constants.
- `.env.example`: `RESEND_API_KEY` + `CONTACT_TO_EMAIL` placeholders.
- `next.config.ts`: pinned `turbopack.root` so the parent `~/package-lock.json` doesn't get auto-detected as workspace root.
- Verified: `npx tsc --noEmit` clean, `npm run build` clean (4 static routes), no warnings.

## In-progress

Phase 1 — design system primitives. None started yet.

## Next action

1. `<HairlineDivider>` + `<SectionLabel>` + `<Button>` first — they unblock everything visual.
2. `<TopNav>` + `<MenuOverlay>` second — needed before any page can ship a real top bar.
3. `<Marquee>` (with the scrubbable behavior from PLAN §1.5) third — it's needed by Home before anything else on Phase 2 makes sense.
4. Then `<PhotoFrame>`, `<HudRail>`, `<Accordion>`.

Branch per primitive: `feature/section-label`, `feature/marquee`, etc. Squash-merge to `main` after preview-URL review.

## Locked decisions (no further input needed)

Carried over from previous checkpoint, plus:

- Next 16.2.6 is the framework version. Confirmed compatible with PLAN's App Router / RSC assumptions.
- Accent is **`#649dc7` steel-blue**, sampled from the logo SVG. No lime anywhere in the codebase or docs.
- Fonts loaded via `next/font/google` (not self-hosted): Space Grotesk 500/600/700, DM Sans 400/500/700, Geist Mono 400/500.

## Still open (carried from prior session)

1. Robot photos — high-res shots beyond current Google Sites hero?
2. Team roster — roles + headshots + bios?
3. Sponsor list — current tier breakdown.
4. Resend account — exists, or need walk-through?
5. IONOS DNS — coach handles cutover when ready.
6. 2026 AGE-season events — anything beyond the 27 already scraped?
7. YouTube URL.
8. Instagram handle confirmation (`@makemindsrobotics`).
9. 8–12 IG shots dropped into `public/images/`.
10. Boot loader replay policy — confirm full-on-first-visit + short-after default.
11. Konami code easter egg — keep or cut?

## Notes

- `next-env.d.ts` is gitignored (Next regenerates on build).
- ESLint config is the create-next-app default; tighten in Phase 1 once we have components to lint.
- `<Image>` from `next/image` is unused right now (holding page is pure type/color); will be needed in Phase 2 for the hero.
- The grain overlay uses `mix-blend-mode: overlay`, which renders subtly on the near-black bg; revisit if it looks muddy under R3F.
