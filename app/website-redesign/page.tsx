import { InfoPage, NextSteps, TextLink, pageJsonLd, pageMetadata } from "@/components/site/InfoPage";
import { extras, formatExtra, gbp, packages } from "@/lib/pricing";

const path = "/website-redesign";

const requiredExtra = (slug: string) => {
  const found = extras.find((item) => item.slug === slug);
  if (!found) throw new Error(`Missing pricing extra: ${slug}`);
  return found;
};

const redesignOffer = requiredExtra("redesign");
const shopOffer = requiredExtra("online-shop");
const bookingOffer = requiredExtra("booking");

const title = `Website Redesign from £${redesignOffer.price}`;
const description = `Website redesign from £${redesignOffer.price} when the site you have can be improved, or a new website when it cannot. Same four-step process, prices on the pricing page.`;

const pkg = (slug: string) => packages.find((item) => item.slug === slug);

export const metadata = pageMetadata(title, description, path);

const steps = [
  {
    title: "Tell me about the business",
    copy: "What you do, who the customers are, and what the site needs to achieve. Send the address of the current site if there is one. That is the brief, whether the answer is a redesign or a new build.",
  },
  {
    title: "An honest answer and a price",
    copy: "I come back with whether I can help, which route fits, and what it would cost. You know the price before anything is built. A 50% deposit secures the project.",
  },
  {
    title: "Designed and built from scratch",
    copy: "No template and no page builder. A redesign is still written by hand. You talk to the person writing the code the whole way through, so nothing is lost in a handover.",
  },
  {
    title: "Launched, and yours to keep",
    copy: "The remaining balance is due before launch. The site then goes live, the code lives in your repository, and you get a plain-English guide to keeping it up to date.",
  },
];

export default function RedesignPage() {
  const starter = pkg("starter");
  const business = pkg("business");
  const premium = pkg("premium");

  return (
    <InfoPage
      eyebrow="Existing websites"
      title={
        <>
          Redesign the site you have,{" "}
          <span className="grad-text">or start again.</span>
        </>
      }
      lede={`A website redesign starts ${formatExtra(redesignOffer).replace(/^From /, "from ")}. That is a starting price, not a promise that every rebuild costs the same. A new site is one of the three packages. The choice is whether the current site can still do the job.`}
      jsonLd={pageJsonLd({
        path,
        title,
        description,
        serviceName: "Website redesign",
        areaServed: [{ "@type": "Country", name: "United Kingdom" }],
      })}
    >
      <section className="pb-[var(--section-y)]">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <article>
            <p className="eyebrow">Keep the site</p>
            <h2 className="display-2 mt-5">When a redesign is the right call.</h2>
            <div className="mt-6 flex flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
              <p>
                You already have a website. People can still follow it, but it
                is awkward on a phone, looks neglected, or hides the way to
                get in touch. The structure is roughly right. You are not
                trying to turn it into a shop or a booking system it was never
                built to be.
              </p>
              <p>
                That is the job priced from {gbp(redesignOffer.price)}. How
                much of the design and the content has to change is what moves
                the figure. The introductory notice, the deposit and what is
                quoted separately are written in full on{" "}
                <TextLink href="/pricing">the pricing page</TextLink>. I am
                not shortening them here.
              </p>
            </div>
          </article>
          <article>
            <p className="eyebrow">Replace it</p>
            <h2 className="display-2 mt-5">When a new site is the honest quote.</h2>
            <div className="mt-6 flex flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
              <p>
                There is no site, or the one you have cannot take an enquiry,
                show the work, or take an order in any sensible way. You would
                be replacing the pages, not repairing them.
              </p>
              <p>
                Then the starting point is a package
                {starter && business && premium
                  ? `: Starter at ${gbp(starter.price)} for up to three pages, Business at ${gbp(business.price)} for up to five, or Premium at ${gbp(premium.price)} for up to eight.`
                  : "."}{" "}
                What those include is on{" "}
                <TextLink href="/small-business-websites">
                  small business websites
                </TextLink>
                .
              </p>
              <p>
                A shop or a booking flow is a different service again. Online
                shop websites start{" "}
                {formatExtra(shopOffer).replace(/^From /, "from ")}. Booking
                websites start{" "}
                {formatExtra(bookingOffer).replace(/^From /, "from ")}. Neither
                is a redesign with a new label.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-line bg-surface/40 py-[var(--section-y)]">
        <div className="shell">
          <p className="eyebrow">How it works</p>
          <h2 className="display-2 mt-5 max-w-[40rem]">
            The same four steps either way.
          </h2>
          <p className="lede mt-5 max-w-[38rem]">
            A redesign does not get its own process. It goes through the one
            already published on the homepage.
          </p>
          <ol className="mt-10 grid list-none gap-8 p-0 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-line-strong pt-6">
                <p className="mono-label">Step 0{index + 1}</p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.2rem] font-semibold tracking-[-0.025em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.98rem] leading-[1.7] text-muted">
                  {step.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <NextSteps
        title="Send the current site, if there is one."
        lede="Say what it needs to do next. I will tell you whether that is a redesign from the published starting price, or one of the packages, before any work starts."
        links={[
          { href: "/pricing", label: "Website redesign and every other price" },
          { href: "/small-business-websites", label: "What the new-site packages include" },
          { href: "/website-design-crieff", label: "The studio in Crieff" },
          { href: "/website-design-perth", label: "Website design for Perth businesses" },
          { href: "/website-design-perthshire", label: "Website design across Perthshire" },
        ]}
      />
    </InfoPage>
  );
}
