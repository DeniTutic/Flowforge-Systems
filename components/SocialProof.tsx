export default function SocialProof() {
  const stats = [
    { number: "10+", label: "Shipped Projects" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "2–4", label: "Week Delivery" },
    { number: "Long-term", label: "Partnerships" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-text-light dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
