import { InfoPage, NextSteps, TextLink, pageJsonLd, pageMetadata } from "@/components/site/InfoPage";
import { extras, formatExtra, gbp, packages, type Package } from "@/lib/pricing";

const path = "/small-business-websites";
const title = "Websites for Small Businesses";
const description =
  "What a small-business website from PeakSwift includes: packages of up to 3, 5 or 8 pages, with enquiry, gallery and SEO set out per package.";

const focus =
  /pages|enquir|contact form|gallery|portfolio|SEO|Maps|responsive|Mobile-friendly|Bespoke/i;

function shownFeatures(pkg: Package) {
  return pkg.features.filter((feature) => focus.test(feature));
}

const extra = (slug: string) => extras.find((item) => item.slug === slug);

export const metadata = pageMetadata(title, description, path);

export default function SmallBusinessPage() {
  const landing = extra("landing-page");
  const redesign = extra("redesign");
  const basicSeo = extra("basic-seo");
  const localSeo = extra("local-seo");

  return (
    <InfoPage
      eyebrow="Packages · sole traders and small businesses"
      title={
        <>
          What a small-business website{" "}
          <span className="grad-text">actually includes.</span>
        </>
      }
      lede="Written for sole traders and small businesses in Scotland. This page is the work itself — how many pages, how enquiry works, when there is a gallery, and what the SEO line means. It is not a list of towns."
      jsonLd={pageJsonLd({
        path,
        title,
        description,
        serviceName: "Small business websites",
        areaServed: [
          { "@type": "AdministrativeArea", name: "Scotland" },
          { "@type": "Country", name: "United Kingdom" },
        ],
      })}
    >
      <section className="pb-[var(--section-y)]">
        <div className="shell">
          <p className="eyebrow">Three sizes</p>
          <h2 className="display-2 mt-5 max-w-[40rem]">
            Up to three, five or eight pages.
          </h2>
          <div className="mt-6 flex max-w-[40rem] flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
            <p>
              Every package is designed and coded from scratch. You talk to
              the person writing the code. The lines below are taken from the
              packages, not rewritten to sound larger. Revisions, analytics
              and the rest of each list are on{" "}
              <TextLink href="/pricing">the pricing page</TextLink>, with the
              introductory notice and the terms.
            </p>
          </div>
          <ul className="m-0 mt-10 grid list-none gap-px overflow-hidden rounded-2xl border border-line bg-line p-0 lg:grid-cols-3">
            {packages.map((pkg) => (
              <li
                key={pkg.slug}
                className={`p-7 sm:p-8 ${pkg.recommended ? "bg-raised" : "bg-base"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-[family-name:var(--font-display)] text-[1.25rem] font-semibold tracking-[-0.025em]">
                    {pkg.name}
                  </h3>
                  {pkg.recommended ? (
                    <span className="mono-label text-cyan">Recommended</span>
                  ) : null}
                </div>
                <p className="mt-3 font-[family-name:var(--font-display)] text-[1.8rem] font-semibold tracking-[-0.04em]">
                  {gbp(pkg.price)}
                </p>
                <p className="mt-2 text-[0.95rem] leading-[1.6] text-muted">
                  {pkg.subtitle}
                </p>
                <ul className="mt-6 flex list-none flex-col gap-2.5 p-0">
                  {shownFeatures(pkg).map((feature) => (
                    <li
                      key={feature}
                      className="text-[0.95rem] leading-[1.55] text-muted"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-surface/40 py-[var(--section-y)]">
        <div className="shell grid gap-12 lg:grid-cols-3">
          <article>
            <h2 className="font-[family-name:var(--font-display)] text-[1.45rem] font-semibold tracking-[-0.03em]">
              Enquiry
            </h2>
            <div className="mt-4 flex flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
              <p>
                Starter stops at contact information and enquiry buttons: a
                number or an email the visitor can press. Business adds
                contact and enquiry forms, so the job can be written down.
                Premium uses advanced contact forms when the message has to
                carry more than a name.
              </p>
              <p>
                The form on this website is the same idea. You say what the
                business needs. I reply with whether I can help and what it
                would cost.
              </p>
            </div>
          </article>
          <article>
            <h2 className="font-[family-name:var(--font-display)] text-[1.45rem] font-semibold tracking-[-0.03em]">
              Gallery
            </h2>
            <div className="mt-4 flex flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
              <p>
                A gallery is not on every package. Starter does not list one.
                Business includes a portfolio or image gallery. Premium
                includes portfolio and gallery features.
              </p>
              <p>
                If the finished work is what sells the business, Business or
                Premium is the honest fit. The{" "}
                <TextLink href="/#work">work section</TextLink> shows the
                difference between an enquiry site, a portfolio and a shop.
              </p>
            </div>
          </article>
          <article>
            <h2 className="font-[family-name:var(--font-display)] text-[1.45rem] font-semibold tracking-[-0.03em]">
              SEO foundations
            </h2>
            <div className="mt-4 flex flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
              <p>
                Starter includes a basic SEO setup. Business includes SEO
                foundations. Premium includes an enhanced SEO setup. That
                means a clear title, a sensible structure, and the technical
                basics a search engine needs in order to read the site.
              </p>
              <p>
                It is not a promise of a position on Google.
                {basicSeo && localSeo ? (
                  <>
                    {" "}
                    Further help is listed separately: {basicSeo.name} starts{" "}
                    {formatExtra(basicSeo).replace(/^From /, "from ")}, and the{" "}
                    {localSeo.name} starts{" "}
                    {formatExtra(localSeo).replace(/^From /, "from ")}.
                  </>
                ) : null}{" "}
                Both sit on the pricing page with the other extras.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-line py-[var(--section-y)]">
        <div className="shell">
          <p className="eyebrow">Scotland, from Crieff</p>
          <h2 className="display-2 mt-5 max-w-[40rem]">
            The audience is the business, not the town.
          </h2>
          <div className="mt-6 flex max-w-[40rem] flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
            <p>
              The studio is one person in Crieff, Perthshire, working with
              sole traders and small businesses in Scotland and further afield
              when the job fits. The packages are not priced by postcode.
            </p>
            <p>
              If you want the local context, it lives on its own pages:{" "}
              <TextLink href="/website-design-crieff">Crieff</TextLink>,{" "}
              <TextLink href="/website-design-perth">Perth</TextLink>, and{" "}
              <TextLink href="/website-design-perthshire">Perthshire</TextLink>
              . This page stays about the site.
            </p>
            {landing && redesign ? (
              <p>
                Need less than three pages? A single-page landing website is{" "}
                {formatExtra(landing)}. Already online, and the current site
                could still do the job with a proper rebuild of the design?{" "}
                <TextLink href="/website-redesign">Website redesign</TextLink>{" "}
                starts {formatExtra(redesign).replace(/^From /, "from ")}.
                Neither figure is a fixed quote for every brief — the pricing
                page says how the final cost is worked out.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <NextSteps
        title="If you know the job, say which package."
        lede="If you do not, say what the site needs to do. Enquiries, a gallery of finished work, or an order are different builds, and the answer is a package or an extra — not a vaguer promise."
        links={[
          { href: "/pricing", label: "Full prices, extras and monthly care" },
          { href: "/website-redesign", label: "Redesign, when you already have a site" },
          { href: "/website-design-crieff", label: "The studio in Crieff" },
          { href: "/website-design-perth", label: "Phone-first sites for Perth" },
          { href: "/website-design-perthshire", label: "Perthshire, Auchterarder, Comrie and Stirling" },
        ]}
      />
    </InfoPage>
  );
}
