import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CONTACT_EMAIL } from "@/lib/site";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Flowforge Systems",
  description: "Terms governing use of the Flowforge Systems website and services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-paper dark:bg-ink text-text dark:text-white">
      <Navbar />
      <article id="main" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <p className="text-sm text-text-light dark:text-steel-dark mb-6">
          <Link href="/" className="text-primary dark:text-primary-light hover:underline">
            ← Back to home
          </Link>
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-heading text-text dark:text-white mb-3">Terms of Service</h1>
        <p className="text-text-light dark:text-steel-dark mb-10">Last updated: May 11, 2026</p>

        <div className="space-y-8 text-text-light dark:text-steel-dark leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-heading text-text dark:text-white">1. Agreement</h2>
            <p>
              By accessing this website or engaging Flowforge Systems for services, you agree to
              these Terms and our{" "}
              <Link href="/privacy" className="text-primary dark:text-primary-light hover:underline">
                Privacy Policy
              </Link>
              . If you disagree, do not use the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-heading text-text dark:text-white">2. Services</h2>
            <p>
              Website content (including pricing indicators and project tools) is for general
              information only. Custom work is governed by a separate statement of work or contract,
              including scope, fees, and deliverables.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-heading text-text dark:text-white">3. Intellectual property</h2>
            <p>
              Our site, branding, and materials are owned by Flowforge Systems or licensors. Unless
              agreed in writing, we grant no license to copy or exploit them. Client deliverables are
              addressed in individual agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-heading text-text dark:text-white">4. Acceptable use</h2>
            <p>You agree not to misuse the site (e.g. unlawful activity, harassment, attempting to breach security, or automated abuse of forms or APIs).</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-heading text-text dark:text-white">5. Disclaimers</h2>
            <p>
              The site is provided &quot;as is&quot; to the extent permitted by law. We disclaim
              implied warranties where allowed. Estimators and marketing descriptions are not
              guarantees of results, timelines, or prices.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-heading text-text dark:text-white">6. Limitation of liability</h2>
            <p>To the maximum extent permitted by law, Flowforge Systems is not liable for indirect, incidental, special, consequential, or punitive damages, or loss of profits or data, arising from use of the site.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-heading text-text dark:text-white">7. Indemnity</h2>
            <p>You will defend and hold us harmless from claims arising from your violation of these Terms or misuse of the site, where permitted by law.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-heading text-text dark:text-white">8. Governing law</h2>
            <p>These Terms are governed by the laws applicable to Flowforge Systems&apos; place of establishment, without regard to conflict-of-law rules, unless mandatory consumer protections in your country say otherwise.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-heading text-text dark:text-white">9. Changes</h2>
            <p>We may update these Terms; continued use after changes constitutes acceptance of the revised Terms.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-heading text-text dark:text-white">10. Contact</h2>
            <p>
              {CONTACT_EMAIL ? (
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary dark:text-primary-light hover:underline">
                  {CONTACT_EMAIL}
                </a>
              ) : (
                <Link href="/#contact" className="text-primary dark:text-primary-light hover:underline">
                  Use the contact form on our website.
                </Link>
              )}
            </p>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
