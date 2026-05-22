"use client";

/*
  Tiny wrapper that fades + lifts its children when they cross 70% of the
  viewport. IntersectionObserver, no GSAP overhead. Honors
  prefers-reduced-motion. PLAN §3 specs scroll reveals on multiple pages;
  this is the generic primitive.
*/

import { createElement, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  // Stagger delay in ms (useful when revealing siblings).
  delay?: number;
  // Override the threshold (0–1). Default 0.25 = 25% visible.
  threshold?: number;
  as?: "div" | "section" | "article" | "li" | "p" | "span";
  id?: string;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  threshold = 0.25,
  as: Tag = "div",
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, reduced]);

  // createElement sidesteps the JSX-generic ref intersection issue you
  // get if you try to put a single ref<HTMLElement> onto a polymorphic
  // <Tag> in TSX. Runtime is identical; the DX cost is one helper call.
  return createElement(
    Tag,
    {
      ref,
      id,
      className: cn(
        "transition-[opacity,transform] duration-700 ease-out will-change-transform",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className,
      ),
      style: { transitionDelay: shown ? `${delay}ms` : "0ms" },
    },
    children,
  );
}
