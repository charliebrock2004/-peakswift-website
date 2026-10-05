import { contactHref, site } from "@/lib/site";
import { reviewPath } from "@/lib/review";
import { projects } from "@/lib/projects";
import { gbp, lowestPackagePrice } from "@/lib/pricing";
import { PeakLines } from "@/components/ui/PeakLines";
import { HeroPreview } from "@/components/ui/HeroPreview";

const facts = [
  { value: `From ${gbp(lowestPackagePrice)}`, label: "Website packages" },
  { value: String(projects.length), label: "Live client sites" },
  { value: "1:1", label: "You deal with me" },
];

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      {down ? (
        <path d="M12 5v14M5 12l7 7 7-7" />
      ) : (
        <path d="M5 12h14M13 6l6 6-6 6" />
      )}
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-[7.5rem] pb-[clamp(3rem,7vw,6rem)] md:pt-[9.5rem]"
    >
      {/* ------------------------------------------------------ backdrop -- */}
      <div className="grid-bg" aria-hidden="true" />
      <PeakLines />
      <div
        className="glow left-1/2 top-[-10rem] size-[36rem] -translate-x-1/2 bg-azure/25"
        aria-hidden="true"
      />
      <div
        className="glow right-[-8rem] top-[6rem] size-[26rem] bg-cyan/12"
        aria-hidden="true"
      />

      <div className="shell relative">
        {/* -------------------------------------------------- headline --- */}
        <div className="max-w-[52rem]">
          <p
            className="eyebrow rise"
            style={{ "--rise-delay": "80ms" } as React.CSSProperties}
          >
            <span>
              Small business web design{" "}
              <span className="whitespace-nowrap">
                · {site.locality}, {site.region}
              </span>
            </span>
          </p>

          <h1
            className="display-1 rise mt-6"
            style={{ "--rise-delay": "180ms" } as React.CSSProperties}
          >
            Websites that make your business{" "}
            <span className="grad-text">look the part.</span>
          </h1>

          <p
            className="lede rise mt-7 max-w-[34rem]"
            style={{ "--rise-delay": "300ms" } as React.CSSProperties}
          >
            PeakSwift is a one-person web design studio building fast, modern
            websites for small businesses, sole traders and tradespeople across
            the UK. Every site is written from scratch, not dragged out of a
            template — at a price a small business can plan for.
          </p>

          <div
            className="rise mt-9"
            style={{ "--rise-delay": "420ms" } as React.CSSProperties}
          >
            <div className="flex flex-wrap items-center gap-3">
              <a href={reviewPath} className="btn btn-primary">
                Get a Free Online Review
                <Arrow />
              </a>
              <a href="#pricing" className="btn btn-ghost">
                View pricing
              </a>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={contactHref}
                className="inline-flex min-h-12 items-center gap-2 text-[0.95rem] font-semibold text-muted transition-colors duration-200 hover:text-text"
              >
                Let's build something
                <Arrow />
              </a>
              <a
                href="#work"
                className="inline-flex min-h-12 items-center gap-2 text-[0.95rem] font-semibold text-muted transition-colors duration-200 hover:text-text"
              >
                See the work
                <Arrow down />
              </a>
            </div>
            <p className="mt-3 max-w-[28rem] text-[0.92rem] leading-snug text-muted">
              Free review of your website, Google presence & social media.
            </p>
          </div>

          {/* ------------------------------------------------- fact row --- */}
          <dl
            className="rise mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-7"
            style={{ "--rise-delay": "540ms" } as React.CSSProperties}
          >
            {facts.map((f) => (
              /* Shown value-first, but the dt leads in the source so a screen
                 reader announces each label once, before its value. */
              <div key={f.label} className="flex flex-col-reverse">
                <dt className="mono-label mt-1">{f.label}</dt>
                <dd className="m-0 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* --------------------------------------------------- previews --- */}
        <HeroPreview />
      </div>

      {/* Fades the hero into the work section so the join is invisible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base"
      />
    </section>
  );
}
