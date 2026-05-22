"use client";

/*
  Lenis smooth scroll (PLAN §Decisions locked).
  Wraps the app. rAF loop drives the lerp; pauses on prefers-reduced-motion
  and on touch devices.

  Integrates with GSAP ScrollTrigger via a shared rAF tick so the two
  don't fight: on every Lenis scroll we call ScrollTrigger.update(), and
  GSAP's gsap.ticker is bridged to drive Lenis. Reference pattern from
  Lenis docs.
*/

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LenisProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Bridge Lenis → ScrollTrigger.
    lenis.on("scroll", ScrollTrigger.update);

    // Single rAF source: GSAP ticker drives Lenis.
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
