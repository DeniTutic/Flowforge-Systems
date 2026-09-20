import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Solution from "@/components/Solution";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import ProjectEstimator from "@/components/ProjectEstimator";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

// Interrupts are client-only and lazy so they never block first paint.
const NewsletterPopup = dynamic(() => import("@/components/NewsletterPopup"), {
  ssr: false,
  loading: () => null,
});

const CookieConsent = dynamic(() => import("@/components/CookieConsent"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main" className="min-h-screen bg-paper dark:bg-ink">
        <Hero />
        <Portfolio />
        <Solution />
        <Services />
        <Testimonials />
        <Pricing />
        <ProjectEstimator />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <NewsletterPopup />
      <CookieConsent />
    </>
  );
}
