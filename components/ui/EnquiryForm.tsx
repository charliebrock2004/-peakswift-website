"use client";

import { useEffect, useState } from "react";
import { mailto } from "@/lib/site";
import { enquiryOptions, enquirySlugs } from "@/lib/pricing";
import { CHOOSE_EVENT } from "@/components/ui/ChooseLink";

const DEFAULT = "not-sure";
const labelFor = (slug: string) =>
  enquiryOptions.flatMap((g) => g.items).find((i) => i.slug === slug)?.label ??
  "";

/**
 * The enquiry form. There is no server behind it: it writes the email for the
 * visitor and opens it in their own mail app, so nothing is stored and there
 * is no inbox other than the configured one that could ever receive it.
 *
 * The package/service list comes from lib/pricing.ts, and a "Choose …" button
 * anywhere on the page preselects it (via ?package= or the choose event).
 *
 * Because some visitors have no mail app set up, the address is always shown
 * underneath with a copy button — a mailto that silently does nothing is the
 * most common way an enquiry gets lost.
 */
export function EnquiryForm({ email }: { email: string | null }) {
  const [choice, setChoice] = useState(DEFAULT);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  /* Preselect from the URL on load, and from any "Choose …" click after. */
  useEffect(() => {
    const pick = (slug: string | null) => {
      if (slug && enquirySlugs.includes(slug)) setChoice(slug);
    };
    pick(new URLSearchParams(window.location.search).get("package"));
    const onChoose = (e: Event) => pick((e as CustomEvent<string>).detail);
    window.addEventListener(CHOOSE_EVENT, onChoose);
    return () => window.removeEventListener(CHOOSE_EVENT, onChoose);
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const name = get("name");
    const business = get("business");
    const selected = labelFor(choice);
    const details = [
      `Name: ${name}`,
      `Email: ${get("email")}`,
      business ? `Business: ${business}` : "",
      `Interested in: ${selected}`,
    ].filter(Boolean);
    const body = `${details.join("\n")}\n\n${get("message")}`;

    const subject =
      choice === DEFAULT
        ? `Website enquiry — ${business || name}`
        : `Website enquiry — ${selected} — ${business || name}`;
    const href = mailto(subject, body);
    if (!href) return;
    window.location.href = href;
    setSent(true);
  }

  async function copy() {
    if (!email) return;
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
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-package" className="field-label">
            What are you interested in?
          </label>
          <select
            id="enquiry-package"
            name="package"
            className="field"
            value={choice}
            onChange={(e) => setChoice(e.target.value)}
          >
            {enquiryOptions.map((group) => (
              <optgroup key={group.group} label={group.group}>
                {group.items.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
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
          <label htmlFor="enquiry-email" className="field-label">
            Your email
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            className="field"
            autoComplete="email"
            required
          />
        </div>
        <div className="sm:col-span-2">
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
          <label htmlFor="enquiry-message" className="field-label">
            What do you need?
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            className="field"
            required
            placeholder="A few lines on what your business does, where you are, and what the website needs to achieve."
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

      {email ? (
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-6">
          <span className="mono-label">Or email directly</span>
          <a
            href={mailto() ?? undefined}
            className="link-underline break-all text-[0.95rem] font-medium text-text"
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
      ) : null}
    </div>
  );
}
