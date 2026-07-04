import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Showreel from "@/components/Showreel";
import Works from "@/components/Works";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import ContactFooter from "@/components/ContactFooter";
import ChatWidget from "@/components/ChatWidget";
import CaseStudyProvider from "@/components/CaseStudyProvider";

export default function Home() {
  return (
    <CaseStudyProvider>
      {/* Overlay noise SVG fixe — très subtil, derrière le contenu */}
      <div className="noise-overlay" aria-hidden="true" />

      <div className="relative z-[2]">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Showreel />
          <Works />
          <Stats />
          <Services />
          <About />
          <Process />
          <ContactFooter />
        </main>
      </div>

      <ChatWidget />
    </CaseStudyProvider>
  );
}
