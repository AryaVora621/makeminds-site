/*
  Shared motion primitives. Anything reused across more than one component
  belongs here so easing / timing stays consistent across the site.
  See PLAN.md (Signature interactions) for the choreographic intent.
*/

import type { Transition } from "framer-motion";

// Easing curves — measured against hackjps.org's editorial calm.
// `outQuint` is the default for entrances; `inOutCirc` for choreographed pins.
export const easing = {
  outQuint: [0.22, 1, 0.36, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutCirc: [0.85, 0, 0.15, 1] as const,
  linear: [0, 0, 1, 1] as const,
} as const;

// Default spring used by the custom cursor and image-magnet hovers.
export const cursorSpring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.6,
};

// Stagger config for SplitText-style headline reveals.
export const headlineStagger = {
  perChar: 0.012,
  perLine: 0.06,
  duration: 0.7,
  ease: easing.outQuint,
} as const;

// Boot loader timing. Total ~1.5s full / ~0.4s returning.
// Tightened from PLAN's original 2.4s spec after first-pass review felt sluggish.
export const bootTiming = {
  charDelayMs: { min: 4, max: 12 },
  postLineDelayMs: 35,
  postSequencePauseMs: 280,
  handoffMs: 600,
  reducedMotionFadeMs: 200,
  returningVisitorMs: 250,
} as const;
