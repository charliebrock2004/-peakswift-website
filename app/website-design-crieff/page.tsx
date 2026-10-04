import { InfoPage, NextSteps, TextLink, pageJsonLd, pageMetadata } from "@/components/site/InfoPage";
import { projects } from "@/lib/projects";
import { gbp, packages } from "@/lib/pricing";
import { site } from "@/lib/site";

const path = "/website-design-crieff";
const title = "Web Design in Crieff, Perthshire";
const description =
  "Hand-coded websites for shops, trades and sole traders in Crieff, from a one-person studio based in the town. Clear packages, starting at £249.";

const crieffWork = projects.filter((project) => project.client.includes("Crieff"));

const notes: Record<string, string> = {
  "weejob-joinery":
    "A joiner in the town. The site is a single page aimed at enquiries, because the person getting in touch is usually on a phone, in the room that needs the work.",
  "brock-contracts":
    "Joiners and building contractors in Crieff. The site is a portfolio they can add to themselves, because the finished work is what the next client wants to see.",
  "timber-and-flame":
    "A firewood supplier in Crieff. The site shows prices, explains delivery around the town, and takes an order. The honesty stand is explained on the site, not left out of it.",
};

export const metadata = pageMetadata(title, description, path);

export default function CrieffPage() {
  const starter = packages.find((item) => item.slug === "starter");
  const business = packages.find((item) => item.slug === "business");
  const premium = packages.find((item) => item.slug === "premium");

  return (
    <InfoPage
      eyebrow={`Studio · ${site.locality}, ${site.region}`}
      title={
        <>
          Website design for businesses in{" "}
          <span className="grad-text">Crieff.</span>
        </>
      }
      lede="PeakSwift is based in Crieff. I design and code websites for shops, trades and sole traders in the town, and you deal with the person who builds the site."
      jsonLd={pageJsonLd({
        path,
        title,
        description,
        serviceName: "Website design in Crieff",
        areaServed: [{ "@type": "City", name: "Crieff" }],
      })}
    >
      <section className="pb-[var(--section-y)]">
        <div className="shell">
          <p className="eyebrow">In the town</p>
          <h2 className="display-2 mt-5 max-w-[40rem]">
            A studio in Crieff, not a listing that mentions it.
          </h2>
          <div className="mt-6 flex max-w-[40rem] flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
            <p>
              If your customers are in Crieff, the site should read as if it
              was made for them. I live and work here. There is no account
              manager, and no second office to pass you to.
            </p>
            <p>
              Most of the useful visits arrive on a phone. The page has to say
              what you do, where you work, and how to get in touch while
              someone is still standing in the room that needs the job. That
              is the brief behind the sites already live for businesses in the
              town.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface/40 py-[var(--section-y)]">
        <div className="shell">
          <p className="eyebrow">Published work</p>
          <h2 className="display-2 mt-5 max-w-[40rem]">
            Three Crieff businesses, three different jobs.
          </h2>
          <p className="lede mt-5 max-w-[38rem]">
            These are the case studies on the site. Locations are the ones on
            the projects themselves. Nothing here is a result I cannot show.
          </p>
          <ul className="mt-10 grid list-none gap-4 p-0">
            {crieffWork.map((project) => (
              <li
                key={project.slug}
                data-reveal
                className="rounded-2xl border border-line bg-base p-6 sm:p-8"
              >
                <p className="mono-label">{project.client}</p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.45rem] font-semibold tracking-[-0.03em]">
                  {project.name}
                </h3>
                <p className="mono-label mt-3 text-cyan">{project.purpose}</p>
                <p className="mt-4 max-w-[40rem] text-[1.02rem] leading-[1.7] text-text">
                  {project.headline}
                </p>
                <p className="mt-3 max-w-[40rem] text-[1.02rem] leading-[1.7] text-muted">
                  {notes[project.slug]}
                </p>
                <p className="mt-5">
                  <TextLink href={project.live}>{project.name} live site</TextLink>
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[1.02rem] leading-[1.7] text-muted">
            The longer write-ups, with the screens, are in{" "}
            <TextLink href="/#work">the work on the homepage</TextLink>.
          </p>
        </div>
      </section>

      <section className="border-t border-line py-[var(--section-y)]">
        <div className="shell">
          <p className="eyebrow">Starting points</p>
          <h2 className="display-2 mt-5 max-w-[40rem]">
            The same packages as everywhere else.
          </h2>
          <div className="mt-6 flex max-w-[40rem] flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
            <p>
              Being in Crieff does not change the price.{" "}
              {starter ? (
                <>
                  Starter is {gbp(starter.price)}, up to three pages, with
                  contact details and enquiry buttons.
                </>
              ) : null}{" "}
              {business ? (
                <>
                  Business is {gbp(business.price)}, up to five pages, with an
                  enquiry form and a gallery — the one I recommend when the
                  work needs to be seen.
                </>
              ) : null}{" "}
              {premium ? (
                <>
                  Premium is {gbp(premium.price)}, up to eight pages, when
                  there is more to explain.
                </>
              ) : null}
            </p>
            <p>
              What each of those lines includes is set out on{" "}
              <TextLink href="/small-business-websites">
                small business websites
              </TextLink>
              . The figures, the introductory notice and the terms are on{" "}
              <TextLink href="/pricing">the pricing page</TextLink>, unchanged.
              If the business already has a site, start with{" "}
              <TextLink href="/website-redesign">website redesign</TextLink>{" "}
              instead of assuming you need a new one.
            </p>
            <p>
              I also work with businesses in Perth, and across Perthshire,
              from this studio. Those are different pages because the
              situation is different:{" "}
              <TextLink href="/website-design-perth">
                website design in Perth
              </TextLink>{" "}
              is remote, with no Perth office, and{" "}
              <TextLink href="/website-design-perthshire">
                website design across Perthshire
              </TextLink>{" "}
              covers the towns — including a clear note that Stirling is not
              in Perthshire.
            </p>
          </div>
        </div>
      </section>

      <NextSteps
        title="Tell me about the Crieff business."
        lede="Say what you do, who the customers are, and whether the site needs to bring enquiries, show the work, or take orders. I will come back with a price before anything is built."
        links={[
          { href: "/pricing", label: "Website design prices and care plans" },
          { href: "/small-business-websites", label: "What a small-business website includes" },
          { href: "/website-redesign", label: "Redesign an existing website" },
          { href: "/website-design-perth", label: "Website design for Perth businesses" },
          { href: "/website-design-perthshire", label: "Website design across Perthshire" },
        ]}
      />
    </InfoPage>
  );
}
