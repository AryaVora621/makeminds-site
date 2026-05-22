# TASK_QUEUE.md

Build order for makeminds-site. Move tasks between sections as they progress. Update `CHECKPOINT_LAST.md` after each meaningful unit.

## In-Progress

_(nothing yet — build hasn't started)_

## Open — Phase 0: Scaffold

- [ ] `npx create-next-app@latest .` with TS + Tailwind v4 + App Router, inside this repo
- [ ] Install deps: `framer-motion`, `gsap`, `lenis`, `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `resend`, `lucide-react`, `clsx`, `tailwind-merge`
- [ ] Configure `tailwind.config.ts` with the token palette from `PLAN.md`
- [ ] Wire fonts via `next/font/google`: Space Grotesk (display 700/900), DM Sans (body 400/500/700), Geist Mono (mono 400/500)
- [ ] Add `lib/motion.ts` (shared easings, spring configs) and `lib/tokens.ts` (JS-readable color/space tokens)
- [ ] Wire `LenisProvider`, `Cursor`, `NoiseOverlay`, `MouseGlow` into `app/layout.tsx`
- [ ] Add `.env.example` with `RESEND_API_KEY=`

## Open — Phase 1: Design system primitives

- [ ] `<SectionLabel>` — `[02] PROGRAMS · 2025–26`
- [ ] `<HairlineDivider>`
- [ ] `<HudRail>` — left-edge scroll progress (desktop only)
- [ ] `<Marquee>` — infinite scroll w/ velocity-reactive direction
- [ ] `<PhotoFrame>` — duotone + grain pipeline wrapper
- [ ] `<Accordion>`
- [ ] `<Button>` — primary, ghost, terminal variants
- [ ] `<TopNav>` — mono uppercase, counter, hover underline
- [ ] `<MenuOverlay>` — full-bleed, index + preview pane

## Open — Phase 2: Home (flagship)

- [ ] `<BootLoader>` — terminal sequence, GSAP typewriter, handoff to top border, reduced-motion fallback, `mm:booted` localStorage flag, `?boot=full` override
- [ ] `<Hero>` shell with mono coordinates + viewport readout
- [ ] `<WireRobot>` — R3F low-poly wire-edge robot, mouse parallax, idle breathing
- [ ] `<Headline>` — SplitText mask-reveal
- [ ] Mission section with pinned scroll reveal + left meter
- [ ] Programs preview (compressed version of `/programs` kinetic panels)
- [ ] Latest achievement card
- [ ] Sponsor strip
- [ ] CTA + footer
- [ ] `<PageTransition>` — accent (`--accent` steel-blue) panel sweep
- [ ] Lighthouse pass: Perf ≥ 90, A11y ≥ 95

## Open — Phase 3: Remaining P0 pages

- [ ] `/team` — roster grid, hover-reveal bios, dual-tone portraits, `content/team.json`
- [ ] `/programs` — FTC / FLL / Outreach kinetic panels, season timeline, `content/programs.json`
- [ ] `/robot` — current season robot, scroll-driven spec reveal, gallery
- [ ] `/contact` — form (Resend serverless), socials, FAQ, location, `app/api/contact/route.ts`

## Open — Phase 4: P1 pages

- [ ] `/achievements` — horizontal-scroll timeline, `content/achievements.json`
- [ ] `/sponsors` — tiered logo grid, sponsor packet PDF link, `content/sponsors.json`
- [ ] `/notebook` index + `[slug]` — MDX engineering blog, code blocks, tags

## Open — Phase 5: Easter eggs + polish

- [ ] Konami code → terminal with `whoami`, `roster`, `season` commands
- [ ] `console.log` ASCII banner
- [ ] View-source comment block
- [ ] `?debug=1` grid + box-model overlay
- [ ] Custom 404 page (terminal `connection refused` aesthetic)

## Open — Phase 6: Content sourcing

- [ ] Trace logo as clean SVG (mono + accent variants) → `public/logo.svg`
- [ ] Lift mission copy from current Google Site; tighten ~30%
- [ ] Re-export current robot hero photo at high res
- [ ] Compile achievements list with year / place / event into `content/achievements.json`
- [ ] Source sponsor logos (PNG + SVG) → `public/sponsors/`
- [ ] Pull 8–12 best Instagram shots; apply duotone via `<PhotoFrame>` at render time
- [ ] Confirm IG handle, YouTube channel URL, contact email

## Open — Phase 7: Deploy

- [ ] Import repo to Vercel (project: `makeminds-site`)
- [ ] Set `RESEND_API_KEY` env var in Vercel project
- [ ] Verify a preview deploy works end-to-end
- [ ] IONOS DNS: `A @ → 76.76.21.21`, `CNAME www → cname.vercel-dns.com`
- [ ] Cutover Vercel domain to `makemindsrobotics.org`
- [ ] Monitor `dig makemindsrobotics.org` until DNS resolves to Vercel
- [ ] Enable Vercel Analytics + Speed Insights
- [ ] Final Lighthouse pass across all P0 routes

## Done

- [x] Plan written (`PLAN.md`)
- [x] Local project folder created at `~/Desktop/makeminds-site`
- [x] GitHub repo created at `github.com/AryaVora621/makeminds-site` (public)
- [x] Initial commit pushed
