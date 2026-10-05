/**
 * Server-only review delivery. Imported by the API route, never by client code.
 * RESEND_API_KEY stays in the environment and is never returned to the browser.
 */

export const REVIEW_INBOX = "peakswiftstudio@gmail.com";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const LIMITS = {
  name: 120,
  business: 160,
  email: 200,
  phone: 40,
  website: 300,
  social: 2000,
  type: 160,
  town: 120,
  improve: 2000,
};

const REQUIRED = [
  ["name", "Your name"],
  ["business", "Business name"],
  ["email", "Email"],
  ["website", "Website URL"],
  ["type", "Business type or service"],
  ["town", "Town or city"],
];

const LABELS = {
  name: "Your name",
  business: "Business name",
  email: "Email",
  phone: "Phone number",
  website: "Website URL",
  social: "Social media links",
  type: "Business type or service",
  town: "Town or city",
  improve: "What would you most like to improve?",
};

const CUSTOMER_SEND_ERROR =
  "We couldn't send your review request. Please try again.";

function asRecord(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  return input;
}

function oneLine(value, max) {
  return String(value ?? "")
    .replace(/[\u0000\r\n]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function multiLine(value, max) {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, max);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateReviewSubmission(input) {
  const raw = asRecord(input);
  const data = {
    name: oneLine(raw.name, LIMITS.name),
    business: oneLine(raw.business, LIMITS.business),
    email: oneLine(raw.email, LIMITS.email),
    phone: oneLine(raw.phone, LIMITS.phone),
    website: oneLine(raw.website, LIMITS.website),
    social: multiLine(raw.social, LIMITS.social),
    type: oneLine(raw.type, LIMITS.type),
    town: oneLine(raw.town, LIMITS.town),
    improve: multiLine(raw.improve, LIMITS.improve),
  };

  for (const [key, label] of REQUIRED) {
    if (!data[key]) {
      return { ok: false, status: 400, error: `${label} is required.` };
    }
  }
  if (!isEmail(data.email)) {
    return { ok: false, status: 400, error: "Enter a valid email address." };
  }
  return { ok: true, data };
}

export function buildReviewEmail(data) {
  const blank = "(not provided)";
  const lines = [
    "Free Online Business Review request",
    "",
    `${LABELS.name}: ${data.name}`,
    `${LABELS.business}: ${data.business}`,
    `${LABELS.email}: ${data.email}`,
    `${LABELS.phone}: ${data.phone || blank}`,
    `${LABELS.website}: ${data.website}`,
    `${LABELS.social}: ${data.social || blank}`,
    `${LABELS.type}: ${data.type}`,
    `${LABELS.town}: ${data.town}`,
    "",
    `${LABELS.improve}`,
    data.improve || blank,
  ];
  return {
    subject: `Free Online Review request — ${data.business}`,
    text: lines.join("\n"),
  };
}

/**
 * Sends only after Resend accepts the message. Never reports success on a
 * missing key, a network failure, or a non-2xx response.
 */
export async function sendReviewEmail(data, options = {}) {
  const env = options.env ?? process.env;
  const fetchImpl = options.fetchImpl ?? fetch;
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Review email not sent: RESEND_API_KEY is not set.");
    return { ok: false, status: 503, error: CUSTOMER_SEND_ERROR };
  }

  const inbox = env.REVIEW_TO_EMAIL || REVIEW_INBOX;
  const from =
    env.REVIEW_FROM_EMAIL || "PeakSwift Studio <onboarding@resend.dev>";
  const endpoint = env.RESEND_API_URL || RESEND_ENDPOINT;
  const { subject, text } = buildReviewEmail(data);

  let response;
  try {
    response = await fetchImpl(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [inbox],
        reply_to: data.email,
        subject,
        text,
      }),
    });
  } catch (error) {
    console.error("Review email request failed before a response.", error);
    return { ok: false, status: 502, error: CUSTOMER_SEND_ERROR };
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error(
      `Resend rejected the review email (${response.status}).`,
      detail.slice(0, 500),
    );
    return { ok: false, status: 502, error: CUSTOMER_SEND_ERROR };
  }

  return { ok: true };
}
