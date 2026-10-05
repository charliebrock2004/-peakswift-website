import {
  areas,
  deliverables,
  exampleNote,
  exampleQuote,
  exampleReport,
  faqs,
  pillars,
  steps,
} from "@/lib/review";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { Check, ReviewCta } from "@/components/review/ReviewCta";
import { ScoreBar, ScoreRing } from "@/components/review/ScoreVisuals";

const delay = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

/* ----------------------------------------------------- what I review --- */

export function ReviewAreas() {
  return (
    <section id="review-areas" className="relative py-[var(--section-y)]">
      <div className="shell">
        <header
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          data-reveal
        >
          <div className="max-w-[40rem]">
            <p className="eyebrow">What I review</p>
            <h2 className="display-2 mt-5">
              Your whole online presence, not just your website.
            </h2>
          </div>
          <p className="lede max-w-[26rem]">
            I look at your business the way a new customer would — from the
            first Google search to the moment they decide to get in touch.
          </p>
        </header>

        <ul className="mt-[clamp(2.5rem,5vw,4rem)] m-0 grid list-none gap-px overflow-hidden rounded-2xl border border-line bg-line p-0 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area, i) => (
            <li
              key={area.title}
              data-reveal
              style={delay((i % 4) * 70)}
              className="group relative bg-base p-7 transition-colors duration-300 hover:bg-surface"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[image:var(--gradient-brand)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
              <svg
                viewBox="0 0 24 24"
                className="size-6 text-cyan"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: area.icon }}
              />
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-[1.12rem] font-semibold leading-[1.25] tracking-[-0.02em]">
                {area.title}
              </h3>
              <p className="mt-2.5 text-[0.92rem] leading-[1.65] text-muted">
                {area.copy}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10" data-reveal>
          <ReviewCta />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- what you get --- */

export function ReviewDeliverables() {
  return (
    <section
      id="what-you-get"
      className="relative border-y border-line bg-surface/40 py-[var(--section-y)]"
    >
      <div className="shell grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <header className="lg:sticky lg:top-32 lg:self-start" data-reveal>
          <p className="eyebrow">What you get</p>
          <h2 className="display-2 mt-5">
            A clear plan, written for a business owner.
          </h2>
          <p className="lede mt-5 max-w-[28rem]">
            No jargon and no padding. A personalised breakdown of where
            you stand, and exactly what I’d do about it.
          </p>

          <p className="mt-8 max-w-[28rem] border-l-2 border-cyan bg-cyan/[0.04] py-4 pl-5 pr-5 text-[0.95rem] leading-[1.6] text-muted">
            <strong className="font-semibold text-text">
              The review is free, with no obligation.
            </strong>{" "}
            You don’t have to buy anything, and I won’t chase you if you don’t.
          </p>
        </header>

        <ol className="m-0 list-none p-0">
          {deliverables.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              style={delay(i * 50)}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line-strong py-6 first:border-t-0 first:pt-0 sm:grid-cols-[3rem_1fr]"
            >
              <span className="mono-label pt-1 text-cyan" aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-[1.2rem] font-semibold tracking-[-0.025em]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[0.95rem] leading-[1.65] text-muted">
                  {item.copy}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- how it works --- */

export function ReviewSteps() {
  return (
    <section id="how" className="relative py-[var(--section-y)]">
      <div className="shell">
        <header className="max-w-[40rem]" data-reveal>
          <p className="eyebrow">How it works</p>
          <h2 className="display-2 mt-5">
            Five steps, and only the first one is yours.
          </h2>
        </header>

        <ol className="mt-[clamp(3rem,6vw,4.5rem)] grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={delay(i * 70)}
              className="relative border-t border-line-strong pt-6"
            >
              {i === 0 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[-1px] h-px w-12 bg-[image:var(--gradient-brand)]"
                />
              ) : null}
              <span className="mono-label" aria-hidden="true">
                Step 0{i + 1}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.15rem] font-semibold leading-[1.25] tracking-[-0.025em]">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[0.92rem] leading-[1.65] text-muted">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-[clamp(3rem,6vw,4.5rem)]" data-reveal>
          <ReviewCta />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ example report --- */

export function ExampleReport() {
  const r = exampleReport;
  return (
    <section
      id="example"
      className="relative overflow-hidden border-y border-line bg-surface/40 py-[var(--section-y)]"
    >
      <div
        className="glow right-[-8rem] top-1/4 size-[28rem] bg-azure/15"
        aria-hidden="true"
      />
      <div className="shell relative">
        <header className="max-w-[42rem]" data-reveal>
          <p className="eyebrow">Example report</p>
          <h2 className="display-2 mt-5">This is what lands in your inbox.</h2>
          <p className="lede mt-5">
            A score for each area so you can see where you stand, then plain
            recommendations in the order I’d tackle them.
          </p>
        </header>

        {/* The report, drawn as a document in the same frame as the site previews */}
        <figure
          className="mx-0 mt-[clamp(2.5rem,5vw,4rem)] mb-0 overflow-hidden rounded-2xl border border-line-strong bg-raised shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]"
          data-reveal
        >
          <div className="flex items-center justify-between gap-4 border-b border-line bg-white/[0.03] px-5 py-3.5 sm:px-8">
            <span className="mono-label">
              PeakSwift Studios · Online business review
            </span>
            <span className="mono-label text-cyan">Example</span>
          </div>

          <div className="grid gap-px bg-line lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            {/* ------------------------------------------------ scores --- */}
            <div className="bg-raised p-6 sm:p-8">
              <p className="mono-label">{r.detail}</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-[1.35rem] font-semibold tracking-[-0.03em]">
                {r.business}
              </p>

              <div className="mt-7 flex items-center gap-6">
                <ScoreRing value={r.overall} />
                <div>
                  <p className="mono-label">Online presence score</p>
                  <p className="mt-2 max-w-[13rem] text-[0.9rem] leading-[1.55] text-muted">
                    Solid foundations, with clear room to be found more easily.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-5 border-t border-line pt-7">
                {r.scores.map((s, i) => (
                  <ScoreBar
                    key={s.label}
                    label={s.label}
                    value={s.value}
                    index={i}
                    focus={r.focus.includes(s.label)}
                  />
                ))}
              </div>
            </div>

            {/* ------------------------------------------ findings + plan --- */}
            <div className="flex flex-col gap-px bg-line">
              <div className="grid gap-px bg-line sm:grid-cols-2">
                <ReportList title="What’s working" items={r.doingWell} />
                <ReportList
                  title="What’s holding you back"
                  items={r.holdingBack}
                />
              </div>

              <div className="bg-raised p-6 sm:p-8">
                <p className="mono-label">Action plan · in order</p>
                <ol className="m-0 mt-5 flex list-none flex-col p-0">
                  {r.plan.map((item, i) => (
                    <li
                      key={item.step}
                      className="grid grid-cols-[1.75rem_1fr] items-baseline gap-x-3 border-t border-line py-3.5 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[1.75rem_1fr_auto]"
                    >
                      <span className="mono-label text-cyan" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className="text-[0.95rem] leading-[1.5] text-text">
                        {item.step}
                      </span>
                      <span className="mono-label col-start-2 mt-1 sm:col-start-3 sm:mt-0">
                        {item.effort}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-raised p-6 sm:p-8">
                <p className="mono-label">Your quote · optional</p>
                <ul className="m-0 mt-5 flex list-none flex-col gap-2 p-0">
                  {exampleQuote.lines.map((line) => (
                    <li
                      key={line.label}
                      className="flex items-baseline gap-4 text-[0.95rem]"
                    >
                      <span className="text-muted">{line.label}</span>
                      <span
                        aria-hidden="true"
                        className="min-w-6 flex-1 translate-y-[-0.25em] border-b border-dotted border-line-strong"
                      />
                      <span className="shrink-0 font-[family-name:var(--font-mono)] text-[0.88rem] text-text">
                        {line.price}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-4">
                  <span className="mono-label">Example total</span>
                  <span className="font-[family-name:var(--font-display)] text-[1.35rem] font-semibold tracking-[-0.03em]">
                    {exampleQuote.total}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <figcaption className="border-t border-line bg-white/[0.02] px-5 py-4 text-[0.82rem] leading-[1.6] text-faint sm:px-8">
            {exampleNote}
          </figcaption>
        </figure>

        <div className="mt-10" data-reveal>
          <ReviewCta />
        </div>
      </div>
    </section>
  );
}

function ReportList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-raised p-6 sm:p-8">
      <p className="mono-label">{title}</p>
      <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[0.92rem] leading-[1.55] text-muted"
          >
            <Check className="size-3.5 text-muted" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------- why peakswift --- */

export function WhyPeakSwift() {
  return (
    <section id="why" className="relative py-[var(--section-y)]">
      <div className="shell grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <header data-reveal>
          <p className="eyebrow">Why PeakSwift</p>
          <h2 className="display-2 mt-5">
            A view of the whole business, not a website pitch.
          </h2>
          <div className="mt-6 flex max-w-[30rem] flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
            <p>
              PeakSwift is a one-person studio in {site.locality}, {site.region}
              , helping local businesses across Perth, Scotland and the UK
              improve how they show up online. Web design is only one part of
              that.
            </p>
            <p>
              I’ll show you where your online presence could be improved and
              give you a practical plan. If you want me to carry out the work,
              I’ll give you a clear quote — and if you don’t, that’s fine.
            </p>
          </div>

          <p className="mt-8 text-[0.95rem] leading-[1.6] text-muted">
            {projects.length} local business websites built and live.{" "}
            <a href="/#work" className="link-underline font-semibold text-text">
              See the work
            </a>
          </p>
        </header>

        <ul className="m-0 grid list-none gap-px overflow-hidden rounded-2xl border border-line bg-line p-0 sm:grid-cols-2">
          {pillars.map((pillar, i) => (
            <li
              key={pillar.title}
              data-reveal
              style={delay(i * 70)}
              className="bg-base p-7 sm:p-8"
            >
              <span className="mono-label" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-[1.2rem] font-semibold tracking-[-0.025em]">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-[0.93rem] leading-[1.65] text-muted">
                {pillar.copy}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- faq --- */

export function ReviewFaq() {
  return (
    <section
      id="faq"
      className="relative border-t border-line bg-surface/40 py-[var(--section-y)]"
    >
      <div className="shell grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <header data-reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="display-2 mt-5">Before you send anything.</h2>
        </header>

        <div data-reveal>
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group border-t border-line-strong py-5 first:border-t-0 first:pt-0"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-[family-name:var(--font-display)] text-[1.15rem] font-semibold tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg
                  viewBox="0 0 24 24"
                  className="mt-1.5 size-4 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="mt-3 max-w-[40rem] text-[0.97rem] leading-[1.7] text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
