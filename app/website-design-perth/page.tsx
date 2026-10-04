import { InfoPage, NextSteps, TextLink, pageJsonLd, pageMetadata } from "@/components/site/InfoPage";
import { gbp, packages } from "@/lib/pricing";

const path = "/website-design-perth";
const title = "Web Design for Perth Businesses";
const description =
  "Phone-first websites for service businesses in Perth, built from a studio in Crieff. Enquiry forms, Google Maps, and what the first conversation covers.";

const bySlug = (slug: string) => packages.find((item) => item.slug === slug);

export const metadata = pageMetadata(title, description, path);

export default function PerthPage() {
  const starter = bySlug("starter");
  const business = bySlug("business");
  const premium = bySlug("premium");

  return (
    <InfoPage
      eyebrow="Perth · from the Crieff studio"
      title={
        <>
          Website design for service businesses in{" "}
          <span className="grad-text">Perth.</span>
        </>
      }
      lede="I build these sites from Crieff. There is no Perth office. The published case studies are Crieff businesses, and I will not invent a Perth client to fill the gap."
      jsonLd={pageJsonLd({
        path,
        title,
        description,
        serviceName: "Website design for Perth businesses",
        areaServed: [{ "@type": "City", name: "Perth" }],
      })}
    >
      <section className="pb-[var(--section-y)]">
        <div className="shell">
          <p className="eyebrow">How the work happens</p>
          <h2 className="display-2 mt-5 max-w-[40rem]">
            Remote from Crieff. Written for someone in Perth on a phone.
          </h2>
          <div className="mt-6 flex max-w-[40rem] flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
            <p>
              Perth is a city of service businesses: trades, clinics, tutors,
              small firms. The person comparing you is often between other
              jobs, on a phone, and not sat at a desk. The first screen has to
              say what you do. The next thing they need is a way to call or
              send an enquiry.
            </p>
            <p>
              I design for that order of attention. A larger screen still has
              to read properly, but the phone is the one I check first. You and
              I talk it through on a call. There is no Perth meeting room and
              no Perth office.
            </p>
            <p>
              The sites I can show you — WeeJob Joinery, Brock Contracts and
              Timber {"&"} Flame — are all Crieff businesses. They are written
              up on the{" "}
              <TextLink href="/website-design-crieff">Crieff page</TextLink>.
              A Perth site is the same kind of build, done at a distance, not
              a claim that one of those businesses is in Perth.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface/40 py-[var(--section-y)]">
        <div className="shell">
          <p className="eyebrow">What the page is for</p>
          <h2 className="display-2 mt-5 max-w-[40rem]">
            Enquiry, and a map to the premises.
          </h2>
          <div className="mt-6 flex max-w-[40rem] flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
            <p>
              The packages draw a line between a button and a form, and only
              some of them include a map. I will stick to that line.
            </p>
            {starter ? (
              <p>
                Starter ({gbp(starter.price)}, up to three pages) includes
                contact information and enquiry buttons, and Google Maps
                integration. That is the short site: a clear offer, and a way
                to call or write.
              </p>
            ) : null}
            {business ? (
              <p>
                Business ({gbp(business.price)}, up to five pages) includes
                contact and enquiry forms, a portfolio or image gallery, and
                Google Maps integration. This is the package marked
                recommended when a service business needs more than a calling
                card.
              </p>
            ) : null}
            {premium ? (
              <p>
                Premium ({gbp(premium.price)}, up to eight pages) includes
                advanced contact forms, for an enquiry that has to carry more
                than a name and a message. Maps are not listed on that
                package. If you need one, say so and it is quoted, rather than
                assumed.
              </p>
            ) : null}
            <p>
              A map is there so someone can find the premises. A form is there
              so the job can be described once. I will not add fields you will
              never read. Page counts, galleries and the SEO lines are spelled
              out on{" "}
              <TextLink href="/small-business-websites">
                small business websites
              </TextLink>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-[var(--section-y)]">
        <div className="shell">
          <p className="eyebrow">Before anything is built</p>
          <h2 className="display-2 mt-5 max-w-[40rem]">
            What the first conversation covers.
          </h2>
          <p className="lede mt-5 max-w-[38rem]">
            It is the same four steps as the process on the homepage. Nothing
            extra is bolted on because the business is in Perth.
          </p>
          <ol className="mt-10 grid list-none gap-8 p-0">
            <li className="border-t border-line-strong pt-6">
              <p className="mono-label">Step 01</p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.25rem] font-semibold tracking-[-0.025em]">
                Tell me about the business
              </h3>
              <p className="mt-3 max-w-[40rem] text-[1.02rem] leading-[1.7] text-muted">
                What you do, and where in Perth the customers are. Who the
                site is for. What it needs to achieve — enquiries, showing
                finished work, or taking orders. The current site, if there is
                one, and any date you are working towards.
              </p>
            </li>
            <li className="border-t border-line-strong pt-6">
              <p className="mono-label">Step 02</p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.25rem] font-semibold tracking-[-0.025em]">
                An honest answer and a price
              </h3>
              <p className="mt-3 max-w-[40rem] text-[1.02rem] leading-[1.7] text-muted">
                Whether I can help, which package fits, and what it would
                cost. You know the price before anything is built. A 50%
                deposit secures the project.
              </p>
            </li>
            <li className="border-t border-line-strong pt-6">
              <p className="mono-label">Step 03</p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.25rem] font-semibold tracking-[-0.025em]">
                Designed and built from scratch
              </h3>
              <p className="mt-3 max-w-[40rem] text-[1.02rem] leading-[1.7] text-muted">
                No template and no page builder. You talk to the person
                writing the code, on a call from Crieff, the whole way
                through.
              </p>
            </li>
            <li className="border-t border-line-strong pt-6">
              <p className="mono-label">Step 04</p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.25rem] font-semibold tracking-[-0.025em]">
                Launched, and yours to keep
              </h3>
              <p className="mt-3 max-w-[40rem] text-[1.02rem] leading-[1.7] text-muted">
                The remaining balance is due before launch. The site then goes
                live, the code lives in your repository, and you get a
                plain-English guide to keeping it up to date.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <NextSteps
        title="Start with the business, not a postcode."
        lede="If you already have a site that is simply awkward on a phone, a redesign may be the right job. If you are starting from nothing, the packages are the place to look. Either way the conversation above is the first step."
        links={[
          { href: "/pricing", label: "Website design prices" },
          { href: "/website-design-crieff", label: "The Crieff studio and the published work" },
          { href: "/website-design-perthshire", label: "Perthshire, and a note on Stirling" },
          { href: "/small-business-websites", label: "What the packages include" },
          { href: "/website-redesign", label: "When a redesign is the better fit" },
        ]}
      />
    </InfoPage>
  );
}
