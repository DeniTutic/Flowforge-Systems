export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-xl w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center shadow-sm">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-text dark:text-white mb-3">Payment successful</h1>
        <p className="text-text-light dark:text-gray-400 mb-6">
          Thank you for your purchase. We received your payment and will contact you soon.
        </p>
        <a
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
        >
          Back to homepage
        </a>
      </div>
    </main>
  );
}

