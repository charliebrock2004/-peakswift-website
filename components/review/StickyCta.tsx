"use client";

import { useEffect, useState } from "react";
import { reviewCta } from "@/lib/review";

/**
 * A slim call to action fixed to the bottom of the screen on phones. It only
 * shows in the stretch of the page between the hero button scrolling away and
 * the form being reached, so it never covers the form or the footer.
 */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.getElementById("hero-cta");
      const form = document.getElementById("review");
      if (!hero || !form) return;
      const pastHero = hero.getBoundingClientRect().bottom < 0;
      const formReached =
        form.getBoundingClientRect().top < window.innerHeight * 0.9;
      setShow(pastHero && !formReached);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      inert={!show}
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-base/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a href="#review" className="btn btn-primary w-full">
        {reviewCta}
      </a>
    </div>
  );
}
