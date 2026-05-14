import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Flowforge Systems",
  description: "How Flowforge Systems collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-text dark:text-gray-100">
      <Navbar />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <p className="text-sm text-text-light dark:text-gray-400 mb-6">
          <Link href="/" className="text-primary hover:underline">
            ← Back to home
          </Link>
        </p>
        <h1 className="text-4xl font-bold text-text dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-text-light dark:text-gray-400 mb-10">Last updated: May 11, 2026</p>

        <div className="space-y-8 text-text-light dark:text-gray-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text dark:text-white">1. Who we are</h2>
            <p>
              Flowforge Systems (&quot;we&quot;, &quot;us&quot;) operates this website. This policy
              explains how we handle personal data when you use our site, contact us, or subscribe to
              updates. For questions:{" "}
              <a href="mailto:hello@flowforge.systems" className="text-primary hover:underline">
                hello@flowforge.systems
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text dark:text-white">2. Data we collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text dark:text-gray-200">Contact form:</strong> name, email,
                message, and technical data needed to deliver your request (e.g. timestamp, basic
                anti-abuse signals).
              </li>
              <li>
                <strong className="text-text dark:text-gray-200">Newsletter:</strong> email address
                you provide.
              </li>
              <li>
                <strong className="text-text dark:text-gray-200">Cookies &amp; storage:</strong> we
                may store consent choices and newsletter signup state in your browser (local storage /
                session storage) to improve your experience.
              </li>
              <li>
                <strong className="text-text dark:text-gray-200">Logs:</strong> standard server or
                hosting logs (e.g. IP address, user agent) for security and reliability.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text dark:text-white">3. How we use data</h2>
            <p>We use personal data to respond to inquiries, send newsletters you opted into, operate and secure the site, and comply with law. We do not sell your personal information.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text dark:text-white">4. Legal bases (EEA/UK)</h2>
            <p>Where applicable, we rely on consent (e.g. newsletter, non-essential cookies), contract or pre-contract steps (responding to quote requests), and legitimate interests (security, improving the site), balanced against your rights.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text dark:text-white">5. Retention</h2>
            <p>We retain messages and subscriber records only as long as needed for the purposes above or as required by law. You may request deletion where applicable.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text dark:text-white">6. Sharing</h2>
            <p>We may use trusted service providers (e.g. hosting, email delivery, database) who process data on our instructions. We may disclose information if required by law or to protect rights and safety.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text dark:text-white">7. International transfers</h2>
            <p>If providers process data outside your country, we use appropriate safeguards where required (e.g. standard contractual clauses).</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text dark:text-white">8. Your rights</h2>
            <p>Depending on your location, you may have rights to access, correct, delete, restrict, or object to processing, and to data portability. To exercise rights, contact us at the email above. You may lodge a complaint with your supervisory authority.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text dark:text-white">9. Children</h2>
            <p>Our services are not directed at children under 16, and we do not knowingly collect their data.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text dark:text-white">10. Changes</h2>
            <p>We may update this policy; the &quot;Last updated&quot; date will change. Material changes may be highlighted on the site.</p>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
