function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 mb-4" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="text-lg">
          {i <= rating ? (
            <span className="text-amber-400">★</span>
          ) : i - 0.5 <= rating ? (
            <span className="relative inline-block">
              <span className="text-gray-200 dark:text-gray-600">★</span>
              <span className="absolute left-0 top-0 overflow-hidden text-amber-400" style={{ width: "50%" }}>★</span>
            </span>
          ) : (
            <span className="text-gray-200 dark:text-gray-600">★</span>
          )}
        </span>
      ))}
      <span className="ml-1.5 text-sm text-text-light dark:text-gray-500 font-medium">{rating}</span>
    </div>
  );
}

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "They didn't just build a site — they helped us get more clients. Our leads increased by 3x in the first month.",
      author: "Sarah Chen",
      role: "Founder, TechFlow",
      rating: 5,
    },
    {
      quote:
        "Apex built a system that automates 80% of our manual work. We can finally focus on growing the business.",
      author: "Michael Rodriguez",
      role: "CEO, GrowthLab",
      rating: 5,
    },
    {
      quote:
        "Professional, fast, and results-driven. They understand business, not just code. Worth every dollar.",
      author: "Emily Johnson",
      role: "Director, EcoStore",
      rating: 4.5,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text dark:text-white mb-4">
            What clients say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-primary/20 dark:hover:border-primary/40 transition-all"
            >
              <StarRating rating={testimonial.rating} />
              <p className="text-text-light dark:text-gray-400 mb-6 leading-relaxed text-lg">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="font-semibold text-text dark:text-white">
                  {testimonial.author}
                </div>
                <div className="text-sm text-text-light dark:text-gray-500">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
