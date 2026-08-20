"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/#hero", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const getHref = (href: string) => {
    if (isHome && href.startsWith("/#")) {
      return href.slice(1);
    }
    return href;
  };

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-8 lg:px-12"
      >
        <a href={isHome ? "#hero" : "/#hero"} className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl">
          Inam<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-5 text-sm text-foreground/70 md:flex lg:gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={getHref(link.href)}
              className="transition hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href={isHome ? "#contact" : "/#contact"}
            className="hidden rounded-full bg-accent px-4 py-2 text-xs font-bold text-ink transition hover:bg-accent-strong sm:px-5 md:inline-flex"
          >
            Let&apos;s talk
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="flex size-8 items-center justify-center rounded-lg border border-line text-foreground transition hover:border-accent hover:text-accent sm:size-9 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-line bg-background/95 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-5 pt-4 sm:px-6 lg:px-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={getHref(link.href)}
                onClick={closeMobile}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-surface hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={isHome ? "#contact" : "/#contact"}
              onClick={closeMobile}
              className="mt-2 rounded-full bg-accent px-5 py-2.5 text-center text-sm font-bold text-ink transition hover:bg-accent-strong"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
