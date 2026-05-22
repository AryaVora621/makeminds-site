# makeminds-site

Rebuild of [makemindsrobotics.org](https://makemindsrobotics.org) for FTC Team 23786 — MakEMinds Robotics.

## Status

All five implementation phases shipped on the `feature/phase-0-scaffold` branch. 12 routes generated, build clean, end-to-end Playwright-verified. Remaining work is user-blocked (real content + Vercel/DNS).

See [`CHECKPOINT_LAST.md`](./CHECKPOINT_LAST.md) for the full state and [`BLOCKED.md`](./BLOCKED.md) for the punch list of items that need user input before launch.

## Stack

- **Framework**: Next.js 16 (App Router) + TypeScript strict, Turbopack
- **Styling**: Tailwind CSS v4 + CSS custom-property tokens sampled from the logo SVG
- **Motion**: Framer Motion + GSAP/ScrollTrigger + Lenis (bridged via a single gsap.ticker rAF)
- **3D**: React Three Fiber + drei (deferred via `requestIdleCallback`)
- **Fonts**: Space Grotesk (display), DM Sans (body), Geist Mono (mono) — all via `next/font/google`
- **Forms**: Resend via `/api/contact` serverless route with IP rate-limit and 503 fallback
- **Hosting target**: Vercel Hobby, domain `makemindsrobotics.org` via IONOS DNS

## Routes

| # | Route | Source |
| - | ----- | ------ |
| 01 | `/` | `app/page.tsx` — hero, marquee, mission (pinned), programs preview, latest award, sponsors, CTA |
| 02 | `/team` | `app/team/page.tsx` |
| 03 | `/programs` | `app/programs/page.tsx` |
| 04 | `/robot` | `app/robot/page.tsx` |
| 05 | `/achievements` | `app/achievements/page.tsx` |
| 06 | `/sponsors` | `app/sponsors/page.tsx` |
| 07 | `/notebook` + `[slug]` | `app/notebook/` (SSG) |
| 08 | `/contact` | `app/contact/page.tsx` + `app/api/contact/route.ts` |
|  | `/not-found` | terminal 404 |
|  | `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | auto-generated |

## Local development

```sh
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint
```

For the contact form to actually deliver mail in dev, set `RESEND_API_KEY` in `.env.local` (see `.env.example`). Without it, the endpoint returns 503 and the UI surfaces the mailto fallback — no broken silent-fail.

## URL flags

- `?boot=full` — replay the full boot loader sequence (ignores `mm:booted` localStorage flag)
- `?debug=1` — overlay 12-col grid + per-element outlines
- `?reason=sponsorship|mentor|partnership|outreach|judging|join|other` — on `/contact`, preselects the form dropdown

## Hidden interactions

- Konami code (↑↑↓↓←→←→BA) anywhere → terminal overlay with `whoami`, `roster`, `season` commands
- DevTools console banner prints on every page load with a Konami hint
- Custom cursor (6px dot + 28px ring spring lag); expands to 60px over interactives

## Project conventions

- Branch per feature: `feature/<scope>`. PRs auto-deploy to Vercel previews once Vercel is wired.
- Conventional Commits encouraged.
- Content (team, sponsors, achievements, programs) lives in `content/*.json` — edited via PR until a CMS is added.
- Placeholder content is flagged with `__placeholder: true` (build can warn before deploy).
- Engineering Notebook posts live in `content/notebook/*.md` with YAML frontmatter (parsed by `lib/notebook.ts`).

## Contact

`info@makemindsrobotics.org`
