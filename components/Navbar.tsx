"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "./ui/ButtonLink";
import { Container } from "./ui/Container";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string; highlight?: boolean };

export function Navbar({ items, ctaHref }: { items: NavItem[]; ctaHref: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1280 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-line bg-paper/85 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-3 sm:gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
                >
                  {item.label}
                  {item.highlight && (
                    <span className="rounded-full bg-orange/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-orange-deep uppercase">
                      New
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <ButtonLink href={ctaHref} className="px-4 py-2.5">
            <span>
              <span className="hidden min-[400px]:inline">Get a </span>Quote
            </span>
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-ink/15 bg-surface text-ink transition-colors hover:border-ink/40 xl:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {/* Reading progress */}
      <m.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-orange"
      />

      <AnimatePresence initial={false}>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-line xl:hidden"
          >
            <Container className="py-3">
              <ul className="flex flex-col">
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-3 font-medium transition-colors hover:bg-paper-2"
                    >
                      {item.label}
                      {item.highlight && (
                        <span className="rounded-full bg-orange/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-orange-deep uppercase">
                          New
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </Container>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
