"use client";

import { cn } from "@/lib/utils";

export function SearchBar({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-shadow focus-within:shadow-[0_4px_18px_rgba(0,0,0,0.1)]",
        className,
      )}
    >
      <span aria-hidden className="text-lg text-muted-foreground">
        🔍
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
