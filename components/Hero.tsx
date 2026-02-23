export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text mb-6 leading-tight">
            Digital products that grow your business
          </h1>
          <p className="text-xl sm:text-2xl text-text-light mb-8 leading-relaxed max-w-3xl mx-auto">
            We design and develop fast, scalable websites and web applications
            that bring you customers and automate your work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#contact"
              className="bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Book a Free Consultation
            </a>
            <a
              href="#portfolio"
              className="bg-white text-text border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold text-lg hover:border-primary hover:text-primary transition-all"
            >
              View Our Work
            </a>
          </div>
          <p className="text-sm text-text-light uppercase tracking-wider">
            Trusted by growing businesses
          </p>
        </div>
      </div>
    </section>
  );
}
