"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const serviceTypes = [
  { id: "house", label: "Строительство дома", basePrice: 35000 },
  { id: "repair", label: "Ремонт квартиры", basePrice: 8000 },
  { id: "foundation", label: "Фундамент", basePrice: 12000 },
  { id: "roof", label: "Кровельные работы", basePrice: 6000 },
];

const materials = [
  { id: "standard", label: "Стандарт", mult: 1 },
  { id: "comfort", label: "Комфорт", mult: 1.4 },
  { id: "premium", label: "Премиум", mult: 1.9 },
];

export default function Calculator() {
  const [serviceId, setServiceId] = useState("house");
  const [area, setArea] = useState(100);
  const [materialId, setMaterialId] = useState("standard");

  const service = serviceTypes.find((s) => s.id === serviceId)!;
  const material = materials.find((m) => m.id === materialId)!;
  const total = Math.round(service.basePrice * area * material.mult);

  const formatted = new Intl.NumberFormat("ru-RU").format(total);

  return (
    <section id="calculator" className="py-20 md:py-28 bg-dark">
      <Container>
        <div className="text-center mb-14">
          <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
            Стоимость работ
          </p>
          <h2 className="font-oswald text-3xl md:text-5xl font-bold text-white mb-4">
            Калькулятор цены
          </h2>
          <p className="text-text-dark max-w-xl mx-auto">
            Получите предварительный расчёт стоимости работ. Точная смета —
            после выезда специалиста.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 space-y-8">
            {/* Service type */}
            <div>
              <label className="block text-white font-oswald text-lg mb-3">
                Вид работ
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {serviceTypes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    className={`p-3 rounded-lg border text-sm font-inter transition-all duration-200 text-left ${
                      serviceId === s.id
                        ? "border-accent bg-accent/20 text-accent"
                        : "border-white/20 text-text-dark hover:border-accent/50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Area */}
            <div>
              <label className="block text-white font-oswald text-lg mb-3">
                Площадь: <span className="text-accent">{area} м²</span>
              </label>
              <input
                type="range"
                min={20}
                max={500}
                step={10}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-text-muted text-xs mt-1">
                <span>20 м²</span>
                <span>500 м²</span>
              </div>
            </div>

            {/* Material */}
            <div>
              <label className="block text-white font-oswald text-lg mb-3">
                Класс материалов
              </label>
              <div className="grid grid-cols-3 gap-3">
                {materials.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMaterialId(m.id)}
                    className={`p-3 rounded-lg border text-sm font-inter transition-all duration-200 ${
                      materialId === m.id
                        ? "border-accent bg-accent/20 text-accent"
                        : "border-white/20 text-text-dark hover:border-accent/50"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-text-muted text-sm mb-1">
                    Ориентировочная стоимость
                  </p>
                  <p className="font-oswald text-4xl font-bold text-accent">
                    от {formatted} ₽
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    * Точная смета после выезда специалиста
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() =>
                    document
                      .getElementById("contacts")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Заказать смету
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
