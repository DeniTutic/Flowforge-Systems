import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Services from "@/components/Services";
import Benefits from "@/components/Benefits";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import SocialProof from "@/components/SocialProof";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import NewsletterPopup from "@/components/NewsletterPopup";
import CookieConsent from "@/components/CookieConsent";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />
      <NewsletterPopup />
      <CookieConsent />
      <Hero />
      <Problem />
      <Solution />
      <Services />
      <Benefits />
      <Process />
      <Portfolio />
      <SocialProof />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Contact />
      <Footer />
    </main>
  );
}
