import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Build } from "@/components/sections/Build";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { RevealProvider } from "@/components/ui/Reveal";
import { StructuredData } from "@/components/site/StructuredData";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Work />
        <Build />
        <Pricing />
        <Process />
        <About />
        <Contact />
      </main>

      <Footer />

      <RevealProvider />
      <StructuredData />
    </>
  );
}
