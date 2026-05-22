"use client";

/*
  Boot loader — PLAN §1, tightened per first-pass review.

  Full sequence ~1.5s; returning visitors ~0.4s; ?boot=full overrides; any
  key or click anywhere skips immediately; prefers-reduced-motion is 200ms
  fade. On exit the terminal fades and scales down while the page content
  fades in simultaneously via the .mm-boot-done class on <html>.
*/

import { useEffect, useRef, useState } from "react";
import { bootTiming } from "@/lib/motion";

type Phase = "idle" | "typing" | "ready" | "fading" | "done";

const BOOT_STORAGE_KEY = "mm:booted";
const BOOT_DONE_CLASS = "mm-boot-done";

type Line = {
  text: string;
  tail?: string;
  indent?: number;
};

const FULL_LINES: Line[] = [
  { text: "[ make-minds-robotics.boot ]" },
  { text: "> resolving makemindsrobotics.org", tail: "OK" },
  { text: "> mounting /home   [██████████████] 100%" },
  { text: "> ready." },
];

const SHORT_LINES: Line[] = [
  { text: "[ make-minds-robotics.boot ]", tail: "ready" },
];

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function shouldPlayFull(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get("boot") === "full") return true;
  try {
    return window.localStorage.getItem(BOOT_STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}

function markBooted() {
  try {
    window.localStorage.setItem(BOOT_STORAGE_KEY, "1");
  } catch {
    // ignore
  }
}

function pickSpeed(): number {
  const { min, max } = bootTiming.charDelayMs;
  return min + Math.random() * (max - min);
}

export default function BootLoader() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [renderedLines, setRenderedLines] = useState<RenderedLine[]>([]);
  const [reduced, setReduced] = useState(false);
  const skipRef = useRef(false);
  const timeoutsRef = useRef<number[]>([]);
  const phaseRef = useRef<Phase>("idle");
  phaseRef.current = phase;

  const clearTimers = () => {
    for (const id of timeoutsRef.current) window.clearTimeout(id);
    timeoutsRef.current = [];
  };

  const finish = () => {
    if (phaseRef.current === "fading" || phaseRef.current === "done") return;
    skipRef.current = true;
    clearTimers();
    setPhase("fading");
    markBooted();
    // Flip the class immediately so page content starts its fade-in
    // in lockstep with the terminal's fade-out (PLAN: coordinated handoff).
    document.documentElement.classList.add(BOOT_DONE_CLASS);
    const id = window.setTimeout(() => {
      setPhase("done");
    }, bootTiming.handoffMs);
    timeoutsRef.current.push(id);
  };

  useEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true);
      const id = window.setTimeout(() => {
        markBooted();
        document.documentElement.classList.add(BOOT_DONE_CLASS);
        setPhase("done");
      }, bootTiming.reducedMotionFadeMs);
      timeoutsRef.current.push(id);
      return () => clearTimers();
    }

    const lines = shouldPlayFull() ? FULL_LINES : SHORT_LINES;
    const totalLines = lines.length;
    setPhase("typing");

    let lineIndex = 0;
    let charIndex = 0;
    let currentRendered: RenderedLine[] = [];

    const typeNextChar = () => {
      if (skipRef.current) return;
      const line = lines[lineIndex];
      if (!line) return;

      if (charIndex === 0) {
        currentRendered = [
          ...currentRendered,
          { text: "", tail: undefined, indent: line.indent ?? 0 },
        ];
      }

      const partial = line.text.slice(0, charIndex + 1);
      currentRendered = currentRendered.slice(0, -1).concat({
        text: partial,
        tail: undefined,
        indent: line.indent ?? 0,
      });
      setRenderedLines(currentRendered);

      charIndex += 1;
      if (charIndex >= line.text.length) {
        const afterTail = () => {
          if (skipRef.current) return;
          if (line.tail) {
            currentRendered = currentRendered.slice(0, -1).concat({
              text: line.text,
              tail: line.tail,
              indent: line.indent ?? 0,
            });
            setRenderedLines(currentRendered);
          }
          lineIndex += 1;
          charIndex = 0;
          if (lineIndex >= totalLines) {
            setPhase("ready");
            const autoId = window.setTimeout(
              finish,
              shouldPlayFull()
                ? bootTiming.postSequencePauseMs
                : bootTiming.returningVisitorMs,
            );
            timeoutsRef.current.push(autoId);
            return;
          }
          const lineId = window.setTimeout(typeNextChar, bootTiming.postLineDelayMs);
          timeoutsRef.current.push(lineId);
        };
        const tailId = window.setTimeout(afterTail, 30);
        timeoutsRef.current.push(tailId);
      } else {
        const charId = window.setTimeout(typeNextChar, pickSpeed());
        timeoutsRef.current.push(charId);
      }
    };

    typeNextChar();

    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Any key skips.
  useEffect(() => {
    if (phase === "done") return;
    const onKey = (e: KeyboardEvent) => {
      // Ignore pure modifier keypresses so Cmd/Ctrl/Shift alone don't trigger.
      if (
        e.key === "Shift" ||
        e.key === "Control" ||
        e.key === "Meta" ||
        e.key === "Alt"
      )
        return;
      e.preventDefault();
      finish();
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () =>
      window.removeEventListener("keydown", onKey, { capture: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Booting MakEMinds Robotics"
      onClick={finish}
      className={[
        "fixed inset-0 z-[100] flex items-center justify-center bg-bg cursor-pointer",
        "transition-opacity ease-out",
        phase === "fading"
          ? "opacity-0 pointer-events-none duration-[600ms]"
          : "opacity-100 duration-200",
      ].join(" ")}
    >
      <div
        className={[
          "w-full max-w-2xl px-6 font-mono text-[13px] leading-[1.7] text-fg select-none",
          "transition-all ease-out",
          phase === "fading"
            ? "scale-y-0 origin-center opacity-0 duration-[500ms]"
            : "scale-y-100 opacity-100 duration-200",
        ].join(" ")}
      >
        {reduced ? (
          <p className="text-fg-muted">
            <span className="text-accent">[ make-minds-robotics ]</span> ready.
          </p>
        ) : (
          <>
            <pre className="whitespace-pre-wrap">
              {renderedLines.map((line, i) => (
                <span key={i} className="block">
                  {line.indent ? " ".repeat(line.indent) : ""}
                  <span
                    className={
                      line.text.startsWith("[") ? "text-accent" : "text-fg"
                    }
                  >
                    {line.text}
                  </span>
                  {line.tail ? (
                    <>
                      {"  "}
                      <span className="text-accent">{line.tail}</span>
                    </>
                  ) : null}
                  {i === renderedLines.length - 1 && phase === "typing" ? (
                    <span className="mm-cursor text-accent">█</span>
                  ) : null}
                </span>
              ))}
            </pre>

            {phase === "ready" ? (
              <p className="mt-5 text-fg-dim transition-opacity duration-200">
                press any key, or click anywhere
              </p>
            ) : null}
          </>
        )}
      </div>

      <style>{`
        .mm-cursor {
          display: inline-block;
          animation: mm-blink 0.85s steps(2) infinite;
        }
        @keyframes mm-blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

type RenderedLine = {
  text: string;
  tail?: string;
  indent: number;
};
