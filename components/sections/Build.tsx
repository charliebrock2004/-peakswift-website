import { contactHref } from "@/lib/site";

const things = [
  {
    title: "Enquiry sites",
    copy: "For a trade that lives on the phone. A clear offer, proof of the work, and a way to get in touch that still works while someone is standing in the room.",
  },
  {
    title: "Portfolio sites",
    copy: "For a business whose finished work does the selling. Photography first, and a structure the owner can add to without breaking the design.",
  },
  {
    title: "Shops & ordering",
    copy: "For a local business that sells something. Prices up front, a basket, delivery a customer can understand, and an order that actually reaches the owner.",
  },
  {
    title: "Landing pages",
    copy: "One page, one job. Built to load fast and turn a visit into a call, a form, or an order.",
  },
];

export function Build() {
  return (
    <section id="services" className="relative py-[var(--section-y)]">
      <div className="shell">
        <div className="grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <header className="lg:sticky lg:top-32 lg:self-start" data-reveal>
            <p className="eyebrow">What I build</p>
            <h2 className="display-2 mt-5">
              Four things,
              <br />
              done properly.
            </h2>
            <p className="lede mt-5 max-w-[26rem]">
              Every one designed and coded from scratch — responsive, quick to
              load, and easy for you to keep up to date.
            </p>
            <a
              href={contactHref}
              className="link-underline mt-7 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-text"
            >
              Not sure which you need? Ask
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
          </header>

          <ul className="m-0 grid list-none gap-px overflow-hidden rounded-2xl border border-line bg-line p-0 sm:grid-cols-2">
            {things.map((thing, i) => (
              <li
                key={thing.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="group relative bg-base p-7 transition-colors duration-300 hover:bg-surface sm:p-8"
              >
                {/* Hairline that draws across the top on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[image:var(--gradient-brand)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
                <span className="mono-label" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-[1.25rem] font-semibold tracking-[-0.025em]">
                  {thing.title}
                </h3>
                <p className="mt-2.5 text-[0.94rem] leading-[1.65] text-muted">
                  {thing.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
