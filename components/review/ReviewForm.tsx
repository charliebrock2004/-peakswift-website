"use client";

import { useEffect, useRef, useState } from "react";
import { reviewCta } from "@/lib/review";
import { Arrow } from "@/components/review/ReviewCta";

type Status = "idle" | "sending" | "sent" | "error";

const SEND_ERROR = "We couldn't send your review request. Please try again.";

/**
 * Posts the review request to the site and stays on this page.
 * The success state is shown only after the server accepts the email.
 */
export function ReviewForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const confirmRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "sent") confirmRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/free-online-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: get("name"),
          business: get("business"),
          email: get("email"),
          phone: get("phone"),
          website: get("website"),
          social: get("social"),
          type: get("type"),
          town: get("town"),
          improve: get("improve"),
        }),
      });
      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!res.ok || !json?.ok) {
        setStatus("error");
        setError(json?.error || SEND_ERROR);
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(SEND_ERROR);
    }
  }

  const sent = status === "sent";

  return (
    <div>
      {/* ------------------------------------------------- confirmation --- */}
      <div hidden={!sent} role="status" aria-live="polite">
        {sent ? (
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
              Review request sent! We'll get back to you shortly.
            </h3>
          </div>
        ) : null}
      </div>

      {/* ----------------------------------------------------------- form --- */}
      <div hidden={sent}>
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
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto"
              disabled={status === "sending"}
              aria-busy={status === "sending"}
            >
              {status === "sending" ? "Sending…" : reviewCta}
              <Arrow />
            </button>
            {status === "error" ? (
              <p
                role="alert"
                className="mt-4 text-[0.92rem] font-medium leading-[1.6] text-text"
              >
                {error}
              </p>
            ) : null}
            <p className="mt-4 text-[0.82rem] leading-[1.6] text-faint">
              Free, with no obligation to buy anything.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
