import {
  carePlans,
  careTerms,
  extras,
  formatExtra,
  gbp,
  introNotice,
  packages,
  pricingTerms,
  type CarePlan,
  type Package,
} from "@/lib/pricing";
import { ChooseLink } from "@/components/ui/ChooseLink";

/* ------------------------------------------------------------- pieces --- */

function Check({ strong }: { strong?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`mt-[0.32rem] size-3.5 shrink-0 ${strong ? "text-cyan" : "text-muted"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      aria-hidden="true"
    >
      <path d="M4 12.5 9.5 18 20 6" />
    </svg>
  );
}

function Arrow() {
  return (
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
  );
}

/** The large price figure, with a smaller pound sign set against the cap height. */
function Price({ amount, unit }: { amount: number; unit?: string }) {
  return (
    <p className="flex items-baseline gap-2">
      <span className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,5vw,3.2rem)] font-semibold leading-none tracking-[-0.045em]">
        <span className="mr-0.5 align-[0.5em] text-[0.5em] font-medium text-muted">
          £
        </span>
        {amount.toLocaleString("en-GB")}
      </span>
      {unit ? <span className="mono-label">{unit}</span> : null}
    </p>
  );
}

export function IntroNotice() {
  return (
    <aside
      aria-label={introNotice.title}
      className="flex flex-col gap-2 border-l-2 border-cyan bg-cyan/[0.04] py-4 pl-5 pr-5 sm:flex-row sm:items-baseline sm:gap-6"
    >
      <p className="mono-label shrink-0 text-cyan">{introNotice.title}</p>
      <p className="text-[0.95rem] leading-[1.6] text-muted">
        {introNotice.body}
      </p>
    </aside>
  );
}

export function PricingTerms({
  children = pricingTerms,
}: {
  children?: string;
}) {
  return (
    <p className="max-w-[52rem] text-[0.85rem] leading-[1.65] text-faint">
      {children}
    </p>
  );
}

/* --------------------------------------------------------- packages --- */

function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const featured = pkg.recommended;
  return (
    <li
      data-reveal
      style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
      className={`group relative flex flex-col p-7 transition-colors duration-300 sm:p-9 ${
        featured ? "bg-raised" : "bg-base hover:bg-surface"
      }`}
    >
      {/* Top rule: always drawn on the recommended package, drawn on hover
          for the others — the same detail the services grid uses. */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 origin-left bg-[image:var(--gradient-brand)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          featured ? "h-[2px]" : "h-px scale-x-0 group-hover:scale-x-100"
        }`}
      />

      <div className="flex items-center justify-between gap-4">
        <h3 className="font-[family-name:var(--font-display)] text-[1.3rem] font-semibold tracking-[-0.025em]">
          {pkg.name}
        </h3>
        {featured ? (
          <span className="mono-label inline-flex items-center gap-2 text-cyan">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-cyan"
            />
            Recommended
          </span>
        ) : null}
      </div>
      <p className="mt-2 min-h-[3.2em] text-[0.94rem] leading-[1.6] text-muted">
        {pkg.subtitle}
      </p>

      <div className="mt-7 border-b border-line pb-7">
        <Price amount={pkg.price} />
        <p className="mono-label mt-3">One-off · introductory price</p>
      </div>

      <ul className="mt-7 flex list-none flex-col gap-3 p-0">
        {pkg.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-3 text-[0.93rem] leading-[1.55] ${
              featured ? "text-text" : "text-muted"
            }`}
          >
            <Check strong={featured} />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-9">
        <ChooseLink
          slug={pkg.slug}
          className={`btn w-full ${featured ? "btn-primary" : "btn-ghost"}`}
        >
          {pkg.cta}
          <span className="sr-only">
            {" "}
            — {pkg.name}, {gbp(pkg.price)}
          </span>
          <Arrow />
        </ChooseLink>
      </div>
    </li>
  );
}

export function PackageCards() {
  return (
    <ul className="m-0 grid list-none gap-px overflow-hidden rounded-2xl border border-line bg-line p-0 lg:grid-cols-3">
      {packages.map((pkg, i) => (
        <PackageCard key={pkg.slug} pkg={pkg} index={i} />
      ))}
    </ul>
  );
}

/* --------------------------------------------------------- extras --- */

export function ExtrasList() {
  return (
    <ul className="m-0 grid list-none gap-x-12 p-0 md:grid-cols-2">
      {extras.map((extra) => (
        <li
          key={extra.slug}
          className="flex items-baseline gap-4 border-b border-line py-4 text-[0.98rem]"
        >
          <span className="text-text">{extra.name}</span>
          {/* Dotted leader, so the eye can run from service to price */}
          <span
            aria-hidden="true"
            className="min-w-6 flex-1 translate-y-[-0.25em] border-b border-dotted border-line-strong"
          />
          <span className="shrink-0 font-[family-name:var(--font-mono)] text-[0.88rem] text-text">
            {formatExtra(extra)}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------- care plans --- */

function CareCard({ plan, index }: { plan: CarePlan; index: number }) {
  return (
    <li
      data-reveal
      style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
      className="group relative flex flex-col bg-base p-7 transition-colors duration-300 hover:bg-surface sm:p-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[image:var(--gradient-brand)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
      <h3 className="font-[family-name:var(--font-display)] text-[1.2rem] font-semibold tracking-[-0.025em]">
        {plan.name}
      </h3>
      <p className="mt-1.5 text-[0.92rem] text-muted">{plan.summary}</p>
      <div className="mt-6">
        <Price amount={plan.price} unit="/ month" />
      </div>
      <ul className="mt-6 flex list-none flex-col gap-3 border-t border-line p-0 pt-6">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-[0.92rem] leading-[1.55] text-muted"
          >
            <Check />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <ChooseLink slug={plan.slug} className="btn btn-ghost w-full">
          {plan.cta}
          <span className="sr-only"> — {gbp(plan.price)} a month</span>
          <Arrow />
        </ChooseLink>
      </div>
    </li>
  );
}

export function CarePlans() {
  return (
    <ul className="m-0 grid list-none gap-px overflow-hidden rounded-2xl border border-line bg-line p-0 md:grid-cols-3">
      {carePlans.map((plan, i) => (
        <CareCard key={plan.slug} plan={plan} index={i} />
      ))}
    </ul>
  );
}

export function CareTerms() {
  return <PricingTerms>{careTerms}</PricingTerms>;
}

/* ------------------------------------------------ home page section --- */

const landing = extras.find((e) => e.slug === "landing-page")!;
const shop = extras.find((e) => e.slug === "online-shop")!;
const cheapestCare = Math.min(...carePlans.map((c) => c.price));

export function Pricing() {
  return (
    <section id="pricing" className="relative py-[var(--section-y)]">
      <div className="shell">
        <header
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          data-reveal
        >
          <div className="max-w-[40rem]">
            <p className="eyebrow">Pricing</p>
            <h2 className="display-2 mt-5">
              Clear prices for small business websites.
            </h2>
          </div>
          <p className="lede max-w-[26rem]">
            Affordable, hand-built websites for sole traders, tradespeople and
            small businesses across the UK. Pick a starting point — every
            package is designed and coded from scratch.
          </p>
        </header>

        <div className="mt-[clamp(2.5rem,5vw,3.5rem)]" data-reveal>
          <IntroNotice />
        </div>

        <div className="mt-6">
          <PackageCards />
        </div>

        <div className="mt-6" data-reveal>
          <PricingTerms />
        </div>

        <div
          className="mt-[clamp(2.5rem,5vw,3.5rem)] flex flex-col gap-5 border-t border-line pt-8 md:flex-row md:items-center md:justify-between"
          data-reveal
        >
          <p className="max-w-[38rem] text-[0.98rem] leading-[1.6] text-muted">
            Also available: single-page websites at {formatExtra(landing)},
            online shops {formatExtra(shop).toLowerCase()}, and monthly website
            care from {gbp(cheapestCare)}/month.
          </p>
          <a
            href="/pricing"
            className="link-underline inline-flex shrink-0 items-center gap-2 text-[0.95rem] font-semibold text-text"
          >
            All services, prices and care plans
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
