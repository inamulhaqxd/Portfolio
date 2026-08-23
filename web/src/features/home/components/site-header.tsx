"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "services", href: "/services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = ["hero", "about", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const scrollTo = useCallback((id: string) => {
    if (!isHome) {
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", window.location.pathname);
    }
  }, [isHome, router]);

  const isActive = (link: (typeof NAV_LINKS)[number]) => {
    if (link.href) return pathname === link.href;
    return isHome && activeSection === link.id;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 sm:pt-5 md:px-8">
      <nav
        aria-label="Primary navigation"
        className="metallic-glass flex w-full max-w-4xl items-center justify-between rounded-full px-4 py-3 sm:px-6 sm:py-3"
      >
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="text-lg font-bold tracking-tight transition-all duration-300 hover:text-accent sm:text-xl"
        >
          Inam<span className="text-accent">.</span>
        </button>

        <div className="hidden items-center gap-1 text-sm text-foreground md:flex lg:gap-2">
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            if (link.href) {
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 transition-all duration-300 hover:text-white hover:bg-white/5 ${
                    active ? "text-foreground font-medium bg-white/10" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className={`relative rounded-full px-4 py-2 transition-all duration-300 hover:text-white hover:bg-white/5 ${
                  active ? "text-foreground font-medium bg-white/10" : ""
                }`}
              >
                  {link.label}
                </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="hidden rounded-full metallic px-4 py-2 text-xs font-bold text-ink transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 hover:scale-105 sm:px-5 md:inline-flex"
          >
            Let&apos;s talk
          </button>

          <MobileMenu scrollTo={scrollTo} isHome={isHome} pathname={pathname} activeSection={activeSection} />
        </div>
      </nav>
    </header>
  );
}

function MobileMenu({
  scrollTo,
  isHome,
  pathname,
  activeSection,
}: {
  scrollTo: (id: string) => void;
  isHome: boolean;
  pathname: string;
  activeSection: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (link: (typeof NAV_LINKS)[number]) => {
    if (link.href) return pathname === link.href;
    return isHome && activeSection === link.id;
  };

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        className="flex size-8 items-center justify-center rounded-lg border border-line bg-foreground/[0.03] backdrop-blur-sm text-foreground transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent sm:size-9 md:hidden"
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {open ? (
            <>
              <line x1="18" x2="6" y1="6" y2="18" />
              <line x1="6" x2="18" y1="6" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" x2="20" y1="9" y2="9" />
              <line x1="4" x2="20" y1="15" y2="15" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div className="fixed inset-x-0 top-[72px] z-50 border-t border-line glass md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-5 pt-4 sm:px-6">
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              if (link.href) {
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-surface hover:text-accent ${
                      active ? "text-accent" : "text-foreground/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    scrollTo(link.id);
                  }}
                  className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-300 hover:bg-surface hover:text-accent ${
                    active ? "text-accent" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                scrollTo("contact");
              }}
              className="mt-2 rounded-full bg-accent px-5 py-2.5 text-center text-sm font-bold text-ink transition-all duration-300 hover:bg-accent-strong hover:shadow-lg hover:shadow-accent/30"
            >
              Let&apos;s talk
            </button>
          </div>
        </div>
      )}
    </>
  );
}
