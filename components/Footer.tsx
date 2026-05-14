export default function Footer() {
  return (
    <footer className="bg-text dark:bg-gray-950 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Flowforge Systems</h3>
            <p className="text-gray-400">
              Web &amp; AI systems that drive growth.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Websites
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Web Applications
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  E-commerce
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Automation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-white transition-colors">
                  Estimator
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="mailto:hello@flowforge.systems" className="hover:text-white transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm space-y-2">
          <p>&copy; {new Date().getFullYear()} Flowforge Systems. All rights reserved.</p>
          <p>
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
            <span className="mx-2 opacity-50" aria-hidden>
              ·
            </span>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
