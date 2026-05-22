export default function Home() {
  return (
    <main className="relative z-10 flex flex-1 flex-col px-8 py-16 md:px-16 lg:px-24">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-muted">
        [00] / scaffold · 2026
      </p>

      <h1 className="mt-12 max-w-5xl text-[clamp(3rem,9vw,9rem)] font-display font-bold leading-[0.95] tracking-[-0.03em]">
        MAKEMINDS
        <br />
        ROBOTICS<span className="text-accent">.</span>
      </h1>

      <p className="mt-10 max-w-xl text-fg-muted leading-[1.6]">
        FTC Team 23786 — Edison, NJ. Rebuild in progress. This holding page
        only exists to verify the token + font pipeline. The real Home page,
        boot loader, R3F robot, and scroll choreography land next.
      </p>

      <ul className="mt-16 grid max-w-3xl gap-3 font-mono text-xs uppercase tracking-[0.12em] text-fg-dim sm:grid-cols-2">
        <li>
          <span className="text-accent">[ok]</span> next 16 · app router · ts
        </li>
        <li>
          <span className="text-accent">[ok]</span> tailwind v4 · token theme
        </li>
        <li>
          <span className="text-accent">[ok]</span> space grotesk · dm sans ·
          geist mono
        </li>
        <li>
          <span className="text-accent">[ok]</span> dark-mode-first · grain
          overlay
        </li>
        <li>
          <span className="text-fg-dim">[..]</span> boot loader · cursor ·
          lenis
        </li>
        <li>
          <span className="text-fg-dim">[..]</span> hero · r3f wire-robot
        </li>
      </ul>
    </main>
  );
}
