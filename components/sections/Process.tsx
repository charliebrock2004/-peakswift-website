import { contactHref } from "@/lib/site";

/* Every line here restates something the site already promises elsewhere —
   nothing about price or timescale is invented. */
const steps = [
  {
    title: "Tell me about the business",
    copy: "What you do, who your customers are, and what the site needs to achieve — more enquiries, showing off finished work, or taking orders.",
  },
  {
    title: "An honest answer and a price",
    copy: "I come back to you directly: whether I can help, which package fits, and what it would cost. You know the price before anything is built, and a 50% deposit secures your project.",
  },
  {
    title: "Designed and built from scratch",
    copy: "No template and no page builder. You talk to the person writing the code the whole way through, so nothing is lost in a handover.",
  },
  {
    title: "Launched, and yours to keep",
    copy: "The remaining balance is due before launch. The site then goes live, the code lives in your repository, and you get a plain-English guide to keeping it up to date.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative border-y border-line bg-surface/40 py-[var(--section-y)]"
    >
      <div className="shell">
        <header
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          data-reveal
        >
          <div className="max-w-[40rem]">
            <p className="eyebrow">How it works</p>
            <h2 className="display-2 mt-5">
              From first message to a site that&apos;s live.
            </h2>
          </div>
          <p className="lede max-w-[24rem] lg:text-right">
            Clear packages to start from, a confirmed price before any work
            begins, and no surprises after you&apos;ve agreed.
          </p>
        </header>

        <ol className="mt-[clamp(3rem,6vw,4.5rem)] grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className="relative border-t border-line-strong pt-6"
            >
              {/* The first step carries the accent: it is the one to take */}
              {i === 0 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[-1px] h-px w-12 bg-[image:var(--gradient-brand)]"
                />
              ) : null}
              <span className="mono-label" aria-hidden="true">
                Step 0{i + 1}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.2rem] font-semibold tracking-[-0.025em]">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[0.94rem] leading-[1.65] text-muted">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-[clamp(3rem,6vw,4.5rem)]" data-reveal>
          <a href={contactHref} className="btn btn-primary">
            Start with step one
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
      </div>
    </section>
  );
}
