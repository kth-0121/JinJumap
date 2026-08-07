"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { type PointerEvent, type ReactNode, useEffect, useRef } from "react";

type SheetState = "peek" | "half" | "full";

// Fraction of the sheet's own height to push below the viewport bottom edge.
// 0 = fully visible, closer to 1 = mostly hidden (only a peek strip shows).
const RATIOS: Record<SheetState, number> = { full: 0.04, half: 0.45, peek: 0.82 };

export function MapBottomSheet({
  header,
  children,
}: {
  header?: ReactNode;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const dragStart = useRef({ pointerY: 0, translate: 0 });
  const isDragging = useRef(false);

  const snapTo = (next: SheetState) => {
    const height = panelRef.current?.offsetHeight ?? 0;
    animate(y, RATIOS[next] * height, { type: "spring", stiffness: 320, damping: 34 });
  };

  useEffect(() => {
    snapTo("half");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    isDragging.current = true;
    dragStart.current = { pointerY: e.clientY, translate: y.get() };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) return;
    const height = panelRef.current?.offsetHeight ?? 1;
    const delta = e.clientY - dragStart.current.pointerY;
    const max = height * RATIOS.peek;
    const next = Math.min(Math.max(dragStart.current.translate + delta, 0), max);
    y.set(next);
  }

  function onPointerUp() {
    isDragging.current = false;
    const height = panelRef.current?.offsetHeight ?? 1;
    const current = y.get() / height;
    let nearest: SheetState = "half";
    let minDist = Infinity;
    for (const state of Object.keys(RATIOS) as SheetState[]) {
      const dist = Math.abs(current - RATIOS[state]);
      if (dist < minDist) {
        minDist = dist;
        nearest = state;
      }
    }
    snapTo(nearest);
  }

  return (
    <motion.div
      ref={panelRef}
      style={{ y }}
      className="fixed inset-x-0 bottom-0 z-20 flex h-[88vh] flex-col rounded-t-3xl bg-background shadow-[0_-8px_30px_rgba(0,0,0,0.14)]"
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="flex shrink-0 touch-none flex-col items-center gap-3 pb-3 pt-4 active:cursor-grabbing"
      >
        <span className="h-1.5 w-10 rounded-full bg-muted-foreground/30" />
        {header && <div className="w-full px-5">{header}</div>}
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
        {children}
      </div>
    </motion.div>
  );
}
