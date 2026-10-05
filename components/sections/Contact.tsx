import { site } from "@/lib/site";
import { reviewPath } from "@/lib/review";
import { EnquiryForm } from "@/components/ui/EnquiryForm";

const include = [
  "What the business does, and where",
  "Which package or service you have in mind, if you know",
  "What the site needs to do — enquiries, show work, take orders",
  "Your current site, if there is one",
  "Any date you are working towards",
];

export function Contact() {
  return (
    <section id="contact" className="relative py-[var(--section-y)]">
      <div className="shell">
        <div className="card relative isolate overflow-hidden" data-reveal>
          <div
            className="glow left-[-8rem] top-[-8rem] size-[28rem] bg-azure/20"
            aria-hidden="true"
          />
          {/* A single gradient hairline across the top edge */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-brand)]"
          />

          <div className="relative grid gap-[clamp(2.5rem,5vw,4.5rem)] px-5 py-[clamp(3rem,7vw,5.5rem)] sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-14">
            {/* ------------------------------------------------ the pitch -- */}
            <div>
              <p className="eyebrow">Start a project</p>
              <h2 className="display-2 mt-6">
                Got a business that deserves a better website?
              </h2>
              <p className="lede mt-6">
                Tell me what your business does and what the site needs to
                achieve. I&apos;ll come back with an honest answer on whether I
                can help, what it would take, and what it would cost.
              </p>

              <p className="mt-6 max-w-[34rem] text-[0.98rem] leading-[1.6] text-muted">
                Want us to look at your current online presence?{" "}
                <a
                  href={reviewPath}
                  className="link-underline font-semibold text-text"
                >
                  Get a free review
                </a>
              </p>

              <h3 className="mono-label mt-10">Useful to include</h3>
              <ul className="mt-4 flex list-none flex-col gap-3 p-0">
                {include.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.95rem] leading-[1.55] text-muted"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-[0.3rem] size-3.5 shrink-0 text-cyan"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      aria-hidden="true"
                    >
                      <path d="M4 12.5 9.5 18 20 6" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mono-label mt-10">{site.location}</p>
            </div>

            {/* ------------------------------------------------- the form -- */}
            <div className="rounded-xl border border-line bg-base/70 p-5 sm:p-8">
              <EnquiryForm email={site.email} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
