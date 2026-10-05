"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { reviewPath } from "@/lib/review";
import { contactHref, nav } from "@/lib/site";

/**
 * Fixed header that gets out of the way. It only paints a background once the
 * page has moved, hides itself when the visitor scrolls down and comes back
 * the moment they scroll up — so on a phone the content gets the full screen
 * while the navigation is never more than a flick away.
 */
type NavItem = { label: string; href: string };

/**
 * `items` and `cta` let a landing page swap in its own navigation and its own
 * call to action; with neither, the header is the site's standard one.
 */
export function Header({
  items = nav,
  cta = { label: "Start a project", href: contactHref },
}: {
  items?: readonly NavItem[];
  cta?: NavItem;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  /* On the full pricing page, the Pricing item is the current one. */
  const pathname = usePathname();
  const current = pathname === "/pricing" ? "/#pricing" : active;
  /* The review offer sits in the main site nav, not on the review page itself
     — that page already has its own call to action. */
  const showReview = items === nav;

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled(y > 12);
        setHidden(y > 420 && y > last && !menuOpen);
        last = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  /* Highlight the nav item for whichever section is currently in view. */
  useEffect(() => {
    const sections = items
      .map((n) => document.getElementById(n.href.split("#")[1]))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length || !("IntersectionObserver" in window)) return;

    /* Kept as a running set rather than read off each callback, so that
       scrolling back up to the hero clears the highlight instead of leaving
       the last section marked current. */
    const inView = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        }
        const match = items.find((n) => inView.has(n.href.split("#")[1]));
        setActive(match?.href ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  /* Lock the page behind the open menu. position:fixed is what actually
     stops iOS Safari from scrolling the page underneath. */
  useEffect(() => {
    if (!menuOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    return () => {
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled || menuOpen
          ? "border-b border-line bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <a
          href="/#top"
          className="shrink-0 rounded-lg transition-opacity duration-200 hover:opacity-80"
          aria-label="PeakSwift Studios — home"
        >
          <Logo />
        </a>

        {/* -------------------------------------------------- desktop nav -- */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-7 lg:flex xl:gap-8"
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={current === item.href ? "true" : undefined}
              className={`link-underline text-[0.92rem] font-medium transition-colors duration-200 ${
                current === item.href
                  ? "text-text"
                  : "text-muted hover:text-text"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {showReview ? (
            <a
              href={reviewPath}
              className="btn btn-primary hidden min-h-[2.7rem] px-5 text-[0.88rem] sm:inline-flex"
            >
              Free Online Review
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          ) : (
            <a
              href={cta.href}
              className="btn btn-primary hidden min-h-[2.7rem] px-5 text-[0.88rem] sm:inline-flex"
            >
              {cta.label}
            </a>
          )}

          {/* ------------------------------------------------ menu button -- */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex size-11 flex-col items-center justify-center gap-[5px] rounded-xl border border-line bg-white/[0.04] transition-colors duration-200 hover:border-line-strong lg:hidden"
          >
            <span
              className={`block h-[1.5px] w-4 bg-text transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? "translate-y-[3.25px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-4 bg-text transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? "-translate-y-[3.25px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- mobile nav -- */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        /* Closed, the menu is only collapsed visually; inert also takes its
           links out of the tab order and the accessibility tree. */
        inert={!menuOpen}
        className={`border-t border-line bg-base/95 backdrop-blur-xl transition-[max-height,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          menuOpen
            ? "max-h-[min(40rem,calc(100dvh-4.5rem-env(safe-area-inset-bottom,0px)))] overflow-y-auto overscroll-contain opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <ul className="shell list-none py-2 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]">
          {items.map((item, i) => (
            <li key={item.href} className="border-b border-line last:border-0">
              <a
                href={item.href}
                onClick={closeMenu}
                className="flex min-h-12 items-baseline gap-4 py-3.5 text-lg font-medium transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: menuOpen ? "none" : "translateY(-0.5rem)",
                  transitionDelay: menuOpen ? `${60 + i * 45}ms` : "0ms",
                }}
              >
                <span className="mono-label" aria-hidden="true">
                  0{i + 1}
                </span>
                {item.label}
              </a>
            </li>
          ))}
          {showReview ? (
            <li className="border-b border-line">
              <a
                href={reviewPath}
                onClick={closeMenu}
                className="flex min-h-12 items-center gap-3 py-3.5 text-lg font-medium"
              >
                <span className="rounded-full border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[0.62rem] font-medium tracking-[0.14em] text-cyan">
                  FREE
                </span>
                Online Review
              </a>
            </li>
          ) : null}
          <li className="py-4 sm:hidden">
            <a
              href={showReview ? reviewPath : cta.href}
              onClick={closeMenu}
              className="btn btn-primary w-full"
            >
              {showReview ? "Get a Free Online Review" : cta.label}
              {showReview ? (
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              ) : null}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
