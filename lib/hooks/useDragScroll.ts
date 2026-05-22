"use client";

import { useEffect, type RefObject } from "react";

/*
  Attach pointer-drag horizontal scroll to a container with overflow-x:auto.
  Cursor changes to grab/grabbing. Touch is left to the native scroller.
  PLAN §1.5 marquee uses the same pattern inline; this hook factors it out
  for other scroll-snappy strips (achievements timeline, gallery rows).
*/

export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (e: PointerEvent) => {
      // Skip secondary mouse buttons; let touch use native scroll.
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.pointerType === "touch") return;
      dragging = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.classList.add("mm-dragging");
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.releasePointerCapture(e.pointerId);
      el.classList.remove("mm-dragging");
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [ref]);
}
