import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StructuredData } from "@/components/site/StructuredData";
import { Contact } from "@/components/sections/Contact";
import {
  CarePlans,
  CareTerms,
  ExtrasList,
  IntroNotice,
  PackageCards,
  PricingTerms,
} from "@/components/sections/Pricing";
import { RevealProvider } from "@/components/ui/Reveal";
import { lowestPackagePrice } from "@/lib/pricing";
import { site } from "@/lib/site";
import { socialMetadata } from "@/lib/seo";

const title = "Website Design Prices for Small Businesses";
const description = `Affordable small business website design from £${lowestPackagePrice}. Clear prices for websites, extra services and monthly care plans, from a web designer in Crieff, Perthshire.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pricing" },
  ...socialMetadata({
    title: `${title} — ${site.legalName}`,
    description,
    path: "/pricing",
  }),
};

export default function PricingPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main">
        {/* ------------------------------------------------------ intro -- */}
        <section className="relative isolate overflow-hidden pt-[7.5rem] pb-[clamp(2.5rem,5vw,4rem)] md:pt-[9.5rem]">
          <div className="grid-bg" aria-hidden="true" />
          <div
            className="glow left-1/2 top-[-12rem] size-[32rem] -translate-x-1/2 bg-azure/20"
            aria-hidden="true"
          />
          <div className="shell relative">
            <div className="max-w-[52rem]">
              <p className="eyebrow">
                Pricing · {site.locality}, {site.region}
              </p>
              <h1 className="display-1 mt-6">
                Website design prices for{" "}
                <span className="grad-text">small businesses.</span>
              </h1>
              <p className="lede mt-7 max-w-[38rem]">
                Affordable web design for small businesses, sole traders and
                tradespeople across the UK — from a website designer based in
                Crieff, Perthshire. Every site is designed and coded from
                scratch, and you deal directly with the person building it.
              </p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- packages -- */}
        <section
          aria-labelledby="packages-heading"
          className="pb-[var(--section-y)]"
        >
          <div className="shell">
            <h2 id="packages-heading" className="mono-label">
              Website packages
            </h2>
            <div className="mt-5">
              <IntroNotice />
            </div>
            <div className="mt-6">
              <PackageCards />
            </div>
            <div className="mt-6">
              <PricingTerms />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- extras -- */}
        <section
          aria-labelledby="extras-heading"
          className="border-t border-line bg-surface/40 py-[var(--section-y)]"
        >
          <div className="shell grid gap-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
            <header className="lg:sticky lg:top-32 lg:self-start" data-reveal>
              <p className="eyebrow">Additional services</p>
              <h2 id="extras-heading" className="display-2 mt-5">
                Everything else a small business needs online.
              </h2>
              <p className="lede mt-5 max-w-[26rem]">
                Add these to a package, or book them on their own — from a
                single landing page to a full online shop.
              </p>
            </header>
            <div data-reveal>
              <ExtrasList />
              <div className="mt-6">
                <PricingTerms />
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- care -- */}
        <section
          id="care"
          aria-labelledby="care-heading"
          className="py-[var(--section-y)]"
        >
          <div className="shell">
            <header className="max-w-[40rem]" data-reveal>
              <p className="eyebrow">Monthly website care</p>
              <h2 id="care-heading" className="display-2 mt-5">
                Keep your website looked after.
              </h2>
              <p className="lede mt-5">
                A small monthly plan keeps the site checked, maintained and up
                to date, so you can get on with running the business.
              </p>
            </header>
            <div className="mt-[clamp(2.5rem,5vw,3.5rem)]">
              <CarePlans />
            </div>
            <div className="mt-6" data-reveal>
              <CareTerms />
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />

      <RevealProvider />
      <StructuredData />
    </>
  );
}
