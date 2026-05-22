"use client";

/*
  Mission section (PLAN §3). Asymmetric grid: left column has a vertical
  meter that fills as we scroll through the pinned section; right column
  has the mission copy broken into phrases that fade up one at a time as
  the meter advances. When the meter hits 100% the pin releases.

  Implementation: GSAP ScrollTrigger pins the section, a single timeline
  drives both the meter scaleY and each phrase's opacity/translateY.
  Reduced motion: skip the pin + animation, render phrases at rest.
*/

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "../layout/SectionLabel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PHRASES = [
  "MakEMinds is a student-led FTC team out of Edison, NJ.",
  "We design, build, code, and field competition robots — three seasons in.",
  "We run a summer build camp, mentor two FLL teams, and host library STEM days.",
  "Engineering rigor with a community-first attitude. We win when our chapter wins.",
];

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const phrasesRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    const meter = meterRef.current;
    const phrases = phrasesRef.current.filter(
      (p): p is HTMLParagraphElement => p !== null,
    );
    if (!section || !meter || phrases.length === 0) return;

    // Initial state: meter empty, phrases dimmed + offset.
    gsap.set(meter, { scaleY: 0, transformOrigin: "top" });
    gsap.set(phrases, { opacity: 0.18, y: 12 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=" + window.innerHeight * 1.2,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
        },
      });
      tl.to(meter, { scaleY: 1, ease: "none" }, 0);
      // Stagger phrase reveals across the timeline.
      phrases.forEach((p, i) => {
        const at = (i / phrases.length) * 0.9;
        tl.to(
          p,
          { opacity: i === 0 ? 1 : 0.92, y: 0, duration: 0.25, ease: "power2.out" },
          at,
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="relative grid min-h-screen grid-cols-12 gap-6 px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="col-span-12 md:col-span-3">
        <SectionLabel index={2} label="Mission" meta="who · what · why" />
        <div
          aria-hidden
          className="relative mt-6 h-40 w-px bg-border md:h-64"
        >
          <div
            ref={meterRef}
            className="absolute inset-0 w-px bg-accent"
            style={{ transform: "scaleY(0)", transformOrigin: "top" }}
          />
        </div>
      </div>
      <div className="col-span-12 md:col-span-8 md:col-start-5">
        <div className="space-y-5 font-display text-[clamp(1.4rem,3.2vw,2.4rem)] font-medium leading-[1.18] tracking-[-0.01em]">
          {PHRASES.map((p, i) => (
            <p
              key={i}
              ref={(el) => {
                phrasesRef.current[i] = el;
              }}
              className={i === 0 ? "text-fg" : "text-fg-muted"}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
