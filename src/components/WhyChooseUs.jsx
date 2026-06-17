// src/components/WhyChooseUs.jsx
export default function WhyChooseUs() {
  const cards = [
    {
      title: "Verified & Secured",
      desc: "Every property goes through a rigorous inspection process.",
      bg: "bg-white text-gray-900 border border-gray-100",
    },
    {
      title: "24/7 Global Support",
      desc: "Our dedicated support team is available in 12+ languages.",
      bg: "bg-blue-600 text-white",
    },
    {
      title: "Zero Hidden Fees",
      desc: "What you see is what you pay. Transparent pricing always.",
      bg: "bg-white text-gray-900 border border-gray-100",
    },
    {
      title: "Yield Optimization",
      desc: "Property owners earn more using dynamic matching algorithms.",
      bg: "bg-slate-900 text-white",
    },
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Why Choose HavenStay?
        </h2>
        <p className="text-gray-500 text-sm">
          We provide the highest standards of safety and comfort.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`p-8 rounded-2xl shadow-xs flex flex-col justify-between min-h-[200px] ${card.bg}`}>
            <div>
              <div className="mb-4 text-xl">✦</div>
              <h3 className="font-bold text-base mb-2">{card.title}</h3>
            </div>
            <p className="text-sm opacity-80">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
