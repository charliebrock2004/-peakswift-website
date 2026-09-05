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
        <a href="/" className="btn btn-primary mt-9">
          Back to PeakSwift
        </a>
      </main>
      <Footer />
    </>
  );
}
