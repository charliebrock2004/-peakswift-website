import { mailto } from "@/lib/site";
import { projects } from "@/lib/projects";
import { PeakLines } from "@/components/ui/PeakLines";
import { HeroPreview } from "@/components/ui/HeroPreview";

const facts = [
  { value: String(projects.length), label: "Live client sites" },
  { value: "100%", label: "Hand-built, no templates" },
  { value: "1:1", label: "You deal with me" },
];

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
            Web design &amp; development
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
            I&apos;m PeakSwift — a one-person studio designing and building fast,
            modern websites for businesses. Every site is written from scratch,
            not dragged out of a template.
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-3"
            style={{ "--rise-delay": "420ms" } as React.CSSProperties}
          >
            <a href="#work" className="btn btn-primary">
              View my work
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
            <a href={mailto()} className="btn btn-ghost">
              Let&apos;s build something
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
          </div>

          {/* ------------------------------------------------- fact row --- */}
          <dl
            className="rise mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-7"
            style={{ "--rise-delay": "540ms" } as React.CSSProperties}
          >
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="m-0">
                  <span className="block font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em]">
                    {f.value}
                  </span>
                  <span className="mt-1 block font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.16em] text-faint">
                    {f.label}
                  </span>
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
