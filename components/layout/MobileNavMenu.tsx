"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { t } from "@/lib/i18n";
import { useLocaleStore } from "@/store/useLocaleStore";

const emptySubscribe = () => () => {};

export function MobileNavMenu({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const locale = useLocaleStore((s) => s.locale);
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const overlay = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-[var(--header-h)] z-30 bg-black/20"
          />
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-[var(--header-h)] z-40 border-b border-border bg-background p-3 shadow-lg"
          >
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t(locale, open ? "메뉴 닫기" : "메뉴 열기", open ? "Close menu" : "Open menu")}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
      >
        <span className="relative block h-3.5 w-5">
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-foreground"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-foreground"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-foreground"
          />
        </span>
      </button>

      {mounted ? createPortal(overlay, document.body) : null}
    </div>
  );
}
