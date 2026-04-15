"use client";

import { useState, useRef } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

// Цены по каждому тарифу: [эконом/предчистовая, стандарт/чистовая, премиум]
const serviceTypes = [
  { id: "house",      label: "Строительство дома",  prices: [55000, 80000, 80000] },
  { id: "repair",     label: "Ремонт квартиры",      prices: [20000, 30000, 40000] },
  { id: "foundation", label: "Фундамент",            prices: [12000, 18000, 25000] },
  { id: "roof",       label: "Кровельные работы",    prices: [ 6000,  9000, 14000] },
];

// Тарифы: для дома — предчистовая / чистовая; для ремонта — эконом / стандарт / премиум
const tiers = [
  { id: "t1", labelHouse: "Предчистовая", labelOther: "Эконом" },
  { id: "t2", labelHouse: "Чистовая",     labelOther: "Стандарт" },
  { id: "t3", labelHouse: "Чистовая +",   labelOther: "Премиум" },
];

function saveCalc(data: object) {
  localStorage.setItem("vladen_calc", JSON.stringify(data));
  window.dispatchEvent(new Event("vladen_calc_update"));
}

export default function Calculator() {
  const [serviceId, setServiceId]   = useState("house");
  const [area, setArea]             = useState(100);
  const [tierIdx, setTierIdx]       = useState(0);
  const [saved, setSaved]           = useState(false);
  const touched = useRef(false);

  const service  = serviceTypes.find((s) => s.id === serviceId)!;
  const isHouse  = serviceId === "house";
  // Для дома показываем только 2 тарифа (предчистовая / чистовая)
  const visibleTiers = isHouse ? tiers.slice(0, 2) : tiers;
  const safeTierIdx  = isHouse && tierIdx > 1 ? 1 : tierIdx;

  const pricePerM2 = service.prices[safeTierIdx];
  const total      = Math.round(pricePerM2 * area);
  const formatted  = new Intl.NumberFormat("ru-RU").format(total);
  const tierLabel  = isHouse
    ? tiers[safeTierIdx].labelHouse
    : tiers[safeTierIdx].labelOther;

  const persist = (sid: string, a: number, ti: number) => {
    const svc = serviceTypes.find((s) => s.id === sid)!;
    const isH = sid === "house";
    const idx = isH && ti > 1 ? 1 : ti;
    const t   = Math.round(svc.prices[idx] * a);
    const lbl = isH ? tiers[idx].labelHouse : tiers[idx].labelOther;
    saveCalc({ service: svc.label, area: a, material: lbl, total: t });
  };

  const handleServiceChange = (id: string) => {
    touched.current = true;
    setServiceId(id);
    const newTi = id === "house" && tierIdx > 1 ? 1 : tierIdx;
    setTierIdx(newTi);
    persist(id, area, newTi);
    setSaved(false);
  };

  const handleAreaChange = (val: number) => {
    touched.current = true;
    setArea(val);
    persist(serviceId, val, safeTierIdx);
    setSaved(false);
  };

  const handleTierChange = (idx: number) => {
    touched.current = true;
    setTierIdx(idx);
    persist(serviceId, area, idx);
    setSaved(false);
  };

  return (
    <section id="calculator" className="py-20 md:py-28 bg-dark">
      <Container>
        <div className="text-center mb-14">
          <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
            Стоимость работ
          </p>
          <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
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
                    onClick={() => handleServiceChange(s.id)}
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
                onChange={(e) => handleAreaChange(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-text-muted text-xs mt-1">
                <span>20 м²</span>
                <span>500 м²</span>
              </div>
            </div>

            {/* Tier */}
            <div>
              <label className="block text-white font-oswald text-lg mb-3">
                {isHouse ? "Вариант отделки" : "Класс отделки"}
              </label>
              <div className={`grid gap-3 ${isHouse ? "grid-cols-2" : "grid-cols-3"}`}>
                {visibleTiers.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => handleTierChange(i)}
                    className={`p-3 rounded-lg border text-sm font-inter transition-all duration-200 ${
                      safeTierIdx === i
                        ? "border-accent bg-accent/20 text-accent"
                        : "border-white/20 text-text-dark hover:border-accent/50"
                    }`}
                  >
                    <span className="block font-medium">
                      {isHouse ? t.labelHouse : t.labelOther}
                    </span>
                    <span className="block text-xs mt-0.5 opacity-70">
                      {new Intl.NumberFormat("ru-RU").format(service.prices[i])} ₽/м²
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <p className="text-text-muted text-sm mb-1">
                    Ориентировочная стоимость
                  </p>
                  <p className="font-oswald text-4xl font-bold text-accent">
                    от {formatted} ₽
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    {pricePerM2.toLocaleString("ru-RU")} ₽/м² · {tierLabel} · {area} м²
                  </p>
                  <p className="text-text-muted text-xs mt-0.5">
                    * Точная смета после выезда специалиста — бесплатно
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Button
                    size="lg"
                    onClick={() => {
                      if (!touched.current) {
                        touched.current = true;
                        persist(serviceId, area, safeTierIdx);
                      }
                      setSaved(true);
                      setTimeout(() => {
                        document
                          .getElementById("contacts")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 400);
                    }}
                  >
                    {saved ? "✓ Расчёт сохранён" : "Заказать смету"}
                  </Button>
                  {saved && (
                    <p className="text-accent text-xs">Данные переданы в форму ниже</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
