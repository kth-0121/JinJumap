"use client";

import { type PointerEvent, type ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function ResizableSplit({
  left,
  right,
  defaultLeftPercent = 50,
  minPercent = 30,
  maxPercent = 70,
}: {
  left: ReactNode;
  right: ReactNode;
  defaultLeftPercent?: number;
  minPercent?: number;
  maxPercent?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [leftPercent, setLeftPercent] = useState(defaultLeftPercent);
  const [isResizing, setIsResizing] = useState(false);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    isDragging.current = true;
    setIsResizing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    setLeftPercent(Math.min(Math.max(percent, minPercent), maxPercent));
  }

  function onPointerUp() {
    isDragging.current = false;
    setIsResizing(false);
  }

  return (
    <div ref={containerRef} className="flex flex-1">
      <div style={{ width: `${leftPercent}%` }} className="min-w-0">
        {left}
      </div>
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        role="separator"
        aria-orientation="vertical"
        className="group relative z-10 w-2.5 shrink-0 cursor-col-resize touch-none select-none"
      >
        <div
          className={cn(
            "absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border transition-colors group-hover:bg-foreground/40",
            isResizing && "bg-foreground/40",
          )}
        />
        <div
          className={cn(
            "absolute left-1/2 top-1/2 h-10 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-border transition-colors group-hover:bg-foreground/50",
            isResizing && "bg-foreground/50",
          )}
        />
      </div>
      <div style={{ width: `${100 - leftPercent}%` }} className="min-w-0">
        {right}
      </div>
    </div>
  );
}
