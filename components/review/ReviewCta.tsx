import { reviewCta } from "@/lib/review";

export function Arrow({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Check({
  className = "size-3.5 text-cyan",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`mt-[0.3rem] shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      aria-hidden="true"
    >
      <path d="M4 12.5 9.5 18 20 6" />
    </svg>
  );
}

/** The primary call to action. Always scrolls to the review form. */
export function ReviewCta({
  id,
  variant = "primary",
  className = "",
}: {
  id?: string;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  return (
    <a
      id={id}
      href="#review"
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}
    >
      {reviewCta}
      <Arrow />
    </a>
  );
}
