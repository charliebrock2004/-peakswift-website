import { site } from "@/lib/site";
import {
  exampleReport,
  reviewHeadline,
  reviewSubheadline,
  reviewTrust,
} from "@/lib/review";
import { PeakLines } from "@/components/ui/PeakLines";
import { Arrow, Check, ReviewCta } from "@/components/review/ReviewCta";
import { ScoreBar, ScoreRing } from "@/components/review/ScoreVisuals";

const rise = (ms: number) =>
  ({ "--rise-delay": `${ms}ms` }) as React.CSSProperties;

export function ReviewHero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-[7.5rem] pb-[clamp(3.5rem,8vw,7rem)] md:pt-[9.5rem]"
    >
      <div className="grid-bg" aria-hidden="true" />
      <PeakLines />
      <div
        className="glow left-1/2 top-[-10rem] size-[36rem] -translate-x-1/2 bg-azure/25"
        aria-hidden="true"
      />

      <div className="shell relative grid items-center gap-[clamp(3rem,6vw,5rem)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <div>
          <p className="eyebrow rise" style={rise(80)}>
            <span>
              Free online business review{" "}
              <span className="whitespace-nowrap">
                · {site.locality}, {site.region}
              </span>
            </span>
          </p>

          <h1 className="display-1 rise mt-6" style={rise(180)}>
            {reviewHeadline.lead}{" "}
            <span className="grad-text">{reviewHeadline.accent}</span>
          </h1>

          <p className="lede rise mt-7 max-w-[36rem]" style={rise(300)}>
            {reviewSubheadline}
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-3"
            style={rise(420)}
          >
            <ReviewCta id="hero-cta" />
            <a href="#example" className="btn btn-ghost">
              See an example review
            </a>
          </div>

          <ul
            className="rise mt-9 flex list-none flex-col gap-3 p-0 sm:flex-row sm:flex-wrap sm:gap-x-8"
            style={rise(540)}
          >
            {reviewTrust.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[0.92rem] leading-[1.5] text-muted"
              >
                <Check />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* A glimpse of the report itself — the full one is further down */}
        <a
          href="#example"
          className="rise group block rounded-2xl border border-line-strong bg-raised/80 p-6 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] backdrop-blur transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 sm:p-7 lg:max-w-[22rem] lg:justify-self-end"
          style={rise(600)}
          aria-label="See the full example review"
        >
          <p className="mono-label flex items-center justify-between gap-3">
            <span>Online presence review</span>
            <span className="text-cyan">Example</span>
          </p>
          <div className="mt-5 flex items-center gap-5">
            <ScoreRing value={exampleReport.overall} size="md" />
            <p className="text-[0.88rem] leading-[1.55] text-muted">
              Your overall score, with a breakdown behind it.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6">
            {exampleReport.scores.slice(0, 3).map((s, i) => (
              <ScoreBar
                key={s.label}
                label={s.label}
                value={s.value}
                index={i}
              />
            ))}
          </div>
          <p className="mt-6 flex items-center gap-2 text-[0.88rem] font-semibold text-text">
            See the full example
            <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </p>
        </a>
      </div>
    </section>
  );
}
