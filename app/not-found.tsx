import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main
        id="main"
        className="shell flex min-h-[70vh] flex-col items-center justify-center py-32 text-center"
      >
        <p className="eyebrow">Error 404</p>
        <h1 className="display-2 mt-6">This page doesn&apos;t exist.</h1>
        <p className="lede mt-5 max-w-[30rem]">
          The link may be out of date. The work, and everything else, is on the
          home page.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="/" className="btn btn-primary">
            Back to PeakSwift
          </a>
          <a href="/#work" className="btn btn-ghost">
            See the work
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
