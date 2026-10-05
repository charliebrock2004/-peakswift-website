"use client";

import { useEffect, useRef, useState } from "react";
import { mailto } from "@/lib/site";
import { reviewCta } from "@/lib/review";
import { Arrow } from "@/components/review/ReviewCta";

type Request = {
  name: string;
  business: string;
  subject: string;
  body: string;
};

/**
 * The review request form. There is no server behind it: submitting writes
 * the request into an email to the PeakSwift inbox and opens the visitor's own
 * mail app, so nothing is stored and nothing goes anywhere else.
 *
 * That means the visitor still has to press send, and some people have no mail
 * app set up. So the confirmation says exactly that, and offers the address
 * and a copy button instead — it never claims the request has been delivered.
 */
export function ReviewForm({ email }: { email: string | null }) {
  const [request, setRequest] = useState<Request | null>(null);
  const [copied, setCopied] = useState(false);
  const confirmRef = useRef<HTMLHeadingElement>(null);

  /* Move focus to the confirmation so it is announced and in view. */
  useEffect(() => {
    if (request) confirmRef.current?.focus();
  }, [request]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const name = get("name");
    const business = get("business");
    const social = get("social").replace(/\s*\n\s*/g, ", ");
    const details = [
      `Name: ${name}`,
      `Business: ${business}`,
      `Email: ${get("email")}`,
      get("phone") ? `Phone: ${get("phone")}` : "",
      `Website: ${get("website")}`,
      social ? `Social media: ${social}` : "",
      `Business type: ${get("type")}`,
      `Town/city: ${get("town")}`,
    ].filter(Boolean);
    const body = [
      "Free Online Business Review request",
      "",
      ...details,
      "",
      "What I'd most like to improve:",
      get("improve") || "(not specified)",
    ].join("\n");
    const subject = `Free Online Review request — ${business}`;

    const href = mailto(subject, body);
    if (!href) return;
    setRequest({ name, business, subject, body });
    window.location.href = href;
  }

  async function copy() {
    if (!request || !email) return;
    try {
      await navigator.clipboard.writeText(
        `To: ${email}\nSubject: ${request.subject}\n\n${request.body}`,
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* Clipboard blocked — the address is shown for typing instead. */
    }
  }

  const firstName = request?.name.split(/\s+/)[0];

  return (
    <div>
      {/* ------------------------------------------------- confirmation --- */}
      <div hidden={!request} role="status" aria-live="polite">
        {request ? (
          <div className="py-2">
            <span
              aria-hidden="true"
              className="flex size-11 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 text-cyan"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M4 12.5 9.5 18 20 6" />
              </svg>
            </span>
            <h3
              ref={confirmRef}
              tabIndex={-1}
              className="mt-5 font-[family-name:var(--font-display)] text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.03em] outline-none"
            >
              Thanks, {firstName}. One step left.
            </h3>
            <p className="mt-4 text-[0.97rem] leading-[1.7] text-muted">
              Your email app has opened with your request written in. Press{" "}
              <strong className="font-semibold text-text">send</strong>, and
              PeakSwift will review {request.business}&apos;s online presence
              and get back to you with your findings: what&apos;s working, what
              isn&apos;t, a prioritised plan and, if you&apos;d like help, a
              clear quote. There&apos;s no obligation to buy anything.
            </p>

            <div className="mt-7 border-t border-line pt-6">
              <p className="mono-label">Nothing opened?</p>
              <p className="mt-3 text-[0.92rem] leading-[1.6] text-muted">
                If you use webmail, or have no email app set up, copy your
                request and send it to{" "}
                <a
                  href={mailto() ?? undefined}
                  className="link-underline inline-block font-medium text-text"
                >
                  {email}
                </a>
                .
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={copy}
                  className="btn btn-ghost min-h-[2.7rem] px-5 text-[0.88rem]"
                >
                  <span aria-live="polite">
                    {copied ? "Copied" : "Copy my request"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRequest(null)}
                  className="mono-label rounded-full px-3 py-2 transition-colors duration-200 hover:text-text"
                >
                  Edit my details
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* ----------------------------------------------------------- form --- */}
      <div hidden={!!request}>
        <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="review-name" className="field-label">
              Your name
            </label>
            <input
              id="review-name"
              name="name"
              className="field"
              autoComplete="name"
              required
            />
          </div>
          <div>
            <label htmlFor="review-business" className="field-label">
              Business name
            </label>
            <input
              id="review-business"
              name="business"
              className="field"
              autoComplete="organization"
              required
            />
          </div>
          <div>
            <label htmlFor="review-email" className="field-label">
              Email
            </label>
            <input
              id="review-email"
              name="email"
              type="email"
              className="field"
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label htmlFor="review-phone" className="field-label">
              Phone number{" "}
              <span className="font-normal text-faint">(optional)</span>
            </label>
            <input
              id="review-phone"
              name="phone"
              type="tel"
              className="field"
              autoComplete="tel"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="review-website" className="field-label">
              Website URL
            </label>
            <input
              id="review-website"
              name="website"
              inputMode="url"
              autoComplete="url"
              className="field"
              placeholder="www.yourbusiness.co.uk"
              aria-describedby="review-website-hint"
              required
            />
            <p
              id="review-website-hint"
              className="mt-2 text-[0.8rem] leading-[1.5] text-faint"
            >
              No website yet? Just write “none” and I’ll review what you do
              have.
            </p>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="review-social" className="field-label">
              Social media links{" "}
              <span className="font-normal text-faint">(optional)</span>
            </label>
            <textarea
              id="review-social"
              name="social"
              className="field !min-h-[4.5rem]"
              rows={2}
              placeholder="Facebook, Instagram, TikTok, LinkedIn, Google Business Profile — paste any links"
            />
          </div>
          <div>
            <label htmlFor="review-type" className="field-label">
              Business type or service
            </label>
            <input
              id="review-type"
              name="type"
              className="field"
              placeholder="e.g. Plumber, café, hair salon"
              required
            />
          </div>
          <div>
            <label htmlFor="review-town" className="field-label">
              Town or city
            </label>
            <input
              id="review-town"
              name="town"
              className="field"
              autoComplete="address-level2"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="review-improve" className="field-label">
              What would you most like to improve?{" "}
              <span className="font-normal text-faint">(optional)</span>
            </label>
            <textarea
              id="review-improve"
              name="improve"
              className="field"
              placeholder="More enquiries, a better-looking website, showing up on Google… whatever matters most to you."
            />
          </div>

          <div className="sm:col-span-2">
            <button type="submit" className="btn btn-primary w-full sm:w-auto">
              {reviewCta}
              <Arrow />
            </button>
            <p className="mt-4 text-[0.82rem] leading-[1.6] text-faint">
              Free, with no obligation to buy anything. This opens your email
              app with your request written, ready to send.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
