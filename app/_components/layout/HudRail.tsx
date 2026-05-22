"use client";

/*
  HudRail — persistent left-edge HUD on desktop (PLAN §Layout system).
  Shows page section index + a scroll-progress bar in mono.
  Hidden under lg breakpoint. Updates on scroll via passive listener +
  rAF throttle; honors prefers-reduced-motion by skipping the smooth
  transition.

  Section labels are passed in by the page since the HUD doesn't know the
  page's IA. If no sections are provided we render a minimal progress rail.
*/

import { useEffect, useRef, useState } from "react";

type Section = {
  id: string;
  label: string;
};

type Props = {
  sections?: Section[];
};

export default function HudRail({ sections = [] }: Props) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      setProgress(p);

      if (sections.length > 0) {
        // Active = the section whose top is closest to (but above) viewport center.
        const center = window.scrollY + window.innerHeight / 2;
        let bestId: string | null = null;
        let bestDelta = Number.POSITIVE_INFINITY;
        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top + window.scrollY;
          const delta = center - top;
          if (delta >= 0 && delta < bestDelta) {
            bestDelta = delta;
            bestId = s.id;
          }
        }
        setActiveId(bestId);
      }
    };

    const onScroll = () => {
      if (tickRef.current != null) return;
      tickRef.current = window.requestAnimationFrame(() => {
        compute();
        tickRef.current = null;
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (tickRef.current != null) cancelAnimationFrame(tickRef.current);
    };
  }, [sections]);

  return (
    <aside
      aria-hidden
      data-boot-fade
      className="pointer-events-none fixed left-5 top-1/2 z-[70] hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
        scroll
      </p>
      <div className="relative h-40 w-px bg-border">
        <div
          className="absolute left-0 top-0 w-px bg-accent transition-[height] duration-200 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
      <p className="font-mono text-[10px] tabular-nums tracking-[0.16em] text-fg-muted">
        {(progress * 100).toFixed(0).padStart(2, "0")}%
      </p>
      {sections.length > 0 ? (
        <ol className="mt-4 space-y-2">
          {sections.map((s) => (
            <li
              key={s.id}
              className={
                "font-mono text-[10px] uppercase tracking-[0.16em] transition-colors " +
                (activeId === s.id ? "text-accent" : "text-fg-dim")
              }
            >
              {s.label}
            </li>
          ))}
        </ol>
      ) : null}
    </aside>
  );
}
