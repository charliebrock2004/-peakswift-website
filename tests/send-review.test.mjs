import assert from "node:assert/strict";
import test from "node:test";
import {
  REVIEW_INBOX,
  buildReviewEmail,
  sendReviewEmail,
  validateReviewSubmission,
} from "../lib/send-review.mjs";

const sample = {
  name: "Ailsa Kerr",
  business: "Kerr Plumbing",
  email: "ailsa@kerrplumbing.co.uk",
  phone: "01764 000000",
  website: "https://kerrplumbing.co.uk",
  social: "https://facebook.com/kerrplumbing",
  type: "Plumber",
  town: "Crieff",
  improve: "More calls from Google",
};

test("validateReviewSubmission accepts a complete request and labels every field", () => {
  const parsed = validateReviewSubmission(sample);
  assert.equal(parsed.ok, true);
  const email = buildReviewEmail(parsed.data);
  assert.equal(email.subject, "Free Online Review request — Kerr Plumbing");
  for (const label of [
    "Your name: Ailsa Kerr",
    "Business name: Kerr Plumbing",
    "Email: ailsa@kerrplumbing.co.uk",
    "Phone number: 01764 000000",
    "Website URL: https://kerrplumbing.co.uk",
    "Social media links: https://facebook.com/kerrplumbing",
    "Business type or service: Plumber",
    "Town or city: Crieff",
    "What would you most like to improve?",
    "More calls from Google",
  ]) {
    assert.ok(email.text.includes(label), `missing ${label}`);
  }
});

test("validateReviewSubmission rejects a missing email and a broken address", () => {
  const missing = validateReviewSubmission({ ...sample, email: "  " });
  assert.equal(missing.ok, false);
  assert.equal(missing.status, 400);
  const broken = validateReviewSubmission({ ...sample, email: "not-an-email" });
  assert.equal(broken.ok, false);
});

test("sendReviewEmail does not report success when Resend is not configured", async () => {
  let called = false;
  const result = await sendReviewEmail(sample, {
    env: {},
    fetchImpl: async () => {
      called = true;
      return new Response("{}", { status: 200 });
    },
  });
  assert.equal(result.ok, false);
  assert.equal(called, false);
});

test("sendReviewEmail posts every field to the PeakSwift inbox and sets Reply-To", async () => {
  let captured;
  const result = await sendReviewEmail(sample, {
    env: { RESEND_API_KEY: "re_test_key", RESEND_API_URL: "https://api.resend.com/emails" },
    fetchImpl: async (url, init) => {
      captured = { url, init };
      return new Response(JSON.stringify({ id: "email_123" }), { status: 200 });
    },
  });
  assert.equal(result.ok, true);
  assert.equal(captured.url, "https://api.resend.com/emails");
  assert.equal(captured.init.headers.Authorization, "Bearer re_test_key");
  const body = JSON.parse(captured.init.body);
  assert.deepEqual(body.to, [REVIEW_INBOX]);
  assert.equal(body.reply_to, sample.email);
  assert.equal(body.subject, "Free Online Review request — Kerr Plumbing");
  assert.match(body.text, /Your name: Ailsa Kerr/);
  assert.match(body.text, /More calls from Google/);
  assert.equal(JSON.stringify(body).includes("re_test_key"), false);
});

test("sendReviewEmail does not report success when Resend rejects the message", async () => {
  const result = await sendReviewEmail(sample, {
    env: { RESEND_API_KEY: "re_test_key" },
    fetchImpl: async () => new Response("domain not verified", { status: 403 }),
  });
  assert.equal(result.ok, false);
  assert.equal(result.status, 502);
});
