import Logo from "./Logo";
import { HIREHAND_URL } from "@/lib/sisterBrands";

const navigate = [
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#estimator", label: "Estimator" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white border-t border-white/10 py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] mb-12">
          <div>
            <a href="/" className="inline-block rounded-full" aria-label="Flowforge Systems — home">
              <Logo textClassName="text-lg text-white [&_span]:text-white/60" />
            </a>
            <p className="text-white/60 mt-4 max-w-xs text-pretty">
              Websites and AI systems that turn traffic into clients.
            </p>
            <p className="text-white/60 mt-3 max-w-xs text-sm text-pretty">
              Also from us:{" "}
              <a href={HIREHAND_URL} className="text-white/85 font-medium hover:text-white hover:underline transition-colors">
                Hirehand
              </a>
              , the AI employee for cafés, restaurants and salons.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50 mb-4">Navigate</h4>
            <ul className="space-y-2.5 text-white/75">
              {navigate.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50 mb-4">Contact</h4>
            <ul className="space-y-2.5 text-white/75">
              <li>
                <a href="mailto:hello@flowforge.systems" className="hover:text-white transition-colors break-all">
                  hello@flowforge.systems
                </a>
              </li>
              <li className="text-white/50 text-sm">We reply within 24 hours.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50 mb-4">Legal</h4>
            <ul className="space-y-2.5 text-white/75">
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Flowforge Systems. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-bright" aria-hidden />
            Built with our own system.
          </p>
        </div>
      </div>
    </footer>
  );
}
