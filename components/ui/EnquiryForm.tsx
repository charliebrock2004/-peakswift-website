"use client";

import { useState } from "react";
import { mailto } from "@/lib/site";

const needs = [
  "Enquiry site",
  "Portfolio site",
  "Shop or online ordering",
  "Landing page",
  "Redesign of a current site",
  "Not sure yet",
];

/**
 * The enquiry form. There is no server behind it: it writes the email for the
 * visitor and opens it in their own mail app, so nothing is stored and there
 * is no inbox other than the configured one that could ever receive it.
 *
 * Because some visitors have no mail app set up, the address is always shown
 * underneath with a copy button — a mailto that silently does nothing is the
 * most common way an enquiry gets lost.
 */
export function EnquiryForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const name = get("name");
    const business = get("business");
    const details = [
      `Name: ${name}`,
      business ? `Business: ${business}` : "",
      `Looking for: ${get("need")}`,
    ].filter(Boolean);
    const body = `${details.join("\n")}\n\n${get("message")}`;

    const href = mailto(`Website enquiry — ${business || name}`, body);
    if (!href) return;
    window.location.href = href;
    setSent(true);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked — the address is visible and selectable anyway. */
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enquiry-name" className="field-label">
            Your name
          </label>
          <input
            id="enquiry-name"
            name="name"
            className="field"
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label htmlFor="enquiry-business" className="field-label">
            Business name{" "}
            <span className="font-normal text-faint">(optional)</span>
          </label>
          <input
            id="enquiry-business"
            name="business"
            className="field"
            autoComplete="organization"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-need" className="field-label">
            What do you need?
          </label>
          <select
            id="enquiry-need"
            name="need"
            className="field"
            defaultValue={needs[0]}
          >
            {needs.map((need) => (
              <option key={need}>{need}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-message" className="field-label">
            Tell me about the business
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            className="field"
            required
            placeholder="What you do, where you are, and what the website needs to achieve."
          />
        </div>
        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" className="btn btn-primary">
            Write my enquiry
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
          </button>
          <p className="text-[0.82rem] leading-[1.5] text-faint sm:max-w-[15rem] sm:text-right">
            Opens your email app with the message written, ready to send.
          </p>
        </div>
      </form>

      {/* Always in the DOM so screen readers are listening before it fills */}
      <p
        role="status"
        className={`text-[0.9rem] leading-[1.6] text-muted ${sent ? "mt-5" : ""}`}
      >
        {sent
          ? "Your email app should now be open with the enquiry ready to send. If nothing happened, email the address below directly."
          : ""}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-6">
        <span className="mono-label">Or email directly</span>
        <a
          href={mailto() ?? undefined}
          className="link-underline text-[0.95rem] font-medium text-text"
        >
          {email}
        </a>
        <button
          type="button"
          onClick={copy}
          className="mono-label rounded-full border border-line px-3 py-1.5 transition-colors duration-200 hover:border-line-strong hover:text-text"
        >
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}
