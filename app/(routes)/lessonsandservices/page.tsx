"use client";

import { servicesContent } from "@/data/servicesContent";
import { CheckCircle } from "lucide-react";

export default function PricingPlans() {
  const plans = servicesContent.pricingPlans;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Fiyatlandırma</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Sizin için en uygun özel ders paketini seçin. Esnek ve sonuç odaklı
          çözümler sunuyorum.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {plans.map((plan, index) => {
            const isHighlighted = index === 1; // Özel Koçluk Paketi
            return (
              <div
                key={plan.id}
                className={`
                  relative rounded-3xl shadow-lg transition-transform duration-300
                  ${
                    isHighlighted
                      ? "bg-emerald-500 text-white scale-105 z-10"
                      : "bg-gray-100 text-gray-800"
                  }
                  p-8 flex flex-col justify-between hover:scale-105
                `}
              >
                {isHighlighted && (
                  <span className="absolute top-2 right-2 bg-white text-emerald-600 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                    En Çok Tercih Edilen
                  </span>
                )}

                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <p className="text-sm mb-4">{plan.description}</p>

                  <div className="text-3xl font-extrabold mb-1">
                    {plan.price}
                  </div>
                  <p className="text-sm mb-6">{plan.duration}</p>

                  <ul className="text-sm space-y-3">
                    {plan.includes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle
                          size={18}
                          className={
                            isHighlighted ? "text-white" : "text-emerald-600"
                          }
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`mt-8 py-2 px-4 rounded-xl font-semibold transition ${
                    isHighlighted
                      ? "bg-white text-emerald-600 hover:bg-gray-100"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  Paketi Seç
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
