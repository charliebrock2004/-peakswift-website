import { mailto, site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="relative py-[var(--section-y)]">
      <div className="shell">
        <div
          className="card relative isolate overflow-hidden px-6 py-[clamp(3.5rem,8vw,6.5rem)] text-center sm:px-10"
          data-reveal
        >
          <div className="grid-bg" aria-hidden="true" />
          <div
            className="glow left-1/2 top-[-6rem] size-[30rem] -translate-x-1/2 bg-azure/30"
            aria-hidden="true"
          />
          {/* A single gradient hairline across the top edge */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-brand)]"
          />

          <div className="relative mx-auto max-w-[38rem]">
            <p className="eyebrow justify-center">Start a project</p>
            <h2 className="display-2 mt-6">
              Got a business that deserves a{" "}
              <span className="grad-text">better website?</span>
            </h2>
            <p className="lede mt-6">
              Tell me what your business does and what the site needs to
              achieve. I&apos;ll come back with an honest answer on whether I can
              help, what it would take, and what it would cost.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href={mailto()} className="btn btn-primary">
                Start a project
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
              <a href="#work" className="btn btn-ghost">
                See the work again
              </a>
            </div>

            <p className="mt-8 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.16em] text-faint">
              <a href={mailto()} className="link-underline">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
