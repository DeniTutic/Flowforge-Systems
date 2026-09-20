import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-paper dark:bg-ink flex flex-col">
      <Navbar />
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full bg-primary-bright/10 blur-3xl" />
        </div>
        <div className="relative max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">404</p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-heading text-text dark:text-white mb-4">
            This page doesn&apos;t exist.
          </h1>
          <p className="text-body text-text-light dark:text-steel-dark mb-10">
            The link may be old or mistyped. Head back home, or tell us what you were looking for.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-primary text-white px-7 py-3.5 rounded-full font-semibold hover:bg-primary-dark transition-all motion-safe:hover:-translate-y-0.5 shadow-lg shadow-primary/20"
            >
              Back to home
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold border border-line dark:border-line-dark text-text dark:text-white hover:border-primary/50 hover:text-primary transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
