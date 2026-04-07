"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import AnimateOnView from "@/components/ui/AnimateOnView";

const faqs = [
  {
    q: "Сколько стоит ремонт квартиры под ключ в Симферополе?",
    a: "Стоимость зависит от площади, состояния квартиры и класса отделки. Черновой ремонт — от 4 500 руб./м², чистовой — от 7 000 руб./м², дизайнерский — от 12 000 руб./м². Точную цену назовём после выезда замерщика — это бесплатно.",
  },
  {
    q: "Сколько времени занимает ремонт квартиры?",
    a: "Стандартная «однушка» 40 м² под ключ — 6–8 недель. Двухкомнатная 65 м² — 8–12 недель. На сроки влияют: объём работ, необходимость сушки стяжки, поставки материалов. Сроки фиксируем в договоре.",
  },
  {
    q: "Вы работаете по договору?",
    a: "Да, обязательно. Заключаем официальный договор подряда с фиксированной сметой, графиком работ и гарантией. Оплата поэтапно — вы платите только за выполненные работы после приёмки каждого этапа.",
  },
  {
    q: "Можно ли строить дом без проекта?",
    a: "Строить без проекта — значит рисковать и деньгами, и безопасностью. Мы делаем полный пакет документов: архитектурный проект, конструктивные решения, инженерные сети. Помогаем получить разрешение на строительство и ввод в эксплуатацию.",
  },
  {
    q: "Вы работаете только в Симферополе?",
    a: "Нет, работаем по всему Крыму: Ялта, Севастополь, Керчь, Евпатория, Феодосия, Бахчисарай. Стоимость выезда в другие города — от 0 руб. при объёме работ от 300 000 руб.",
  },
  {
    q: "Даёте ли вы гарантию на ремонт?",
    a: "Да. Гарантия на отделочные работы — 2 года, на конструктивные (фундамент, стены, кровля) — 5 лет. Все условия прописаны в договоре. Если что-то пошло не так — приедем и исправим за наш счёт.",
  },
  {
    q: "Нужно ли покупать материалы самому?",
    a: "Не обязательно. Мы можем взять закупку полностью на себя — у нас есть договоры с поставщиками и скидки до 15% от рыночной цены. Если хотите выбрать материалы самостоятельно — поможем с выбором и проконтролируем качество.",
  },
  {
    q: "Как начать работу с вами?",
    a: "Позвоните или оставьте заявку на сайте. Выедем на замер, составим смету — бесплатно и без обязательств. После согласования сметы подписываем договор и приступаем. Обычно это занимает 2–3 дня.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-light py-20">
      <Container>
        <AnimateOnView className="text-center mb-12">
          <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
            Частые вопросы
          </p>
          <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-text-light">
            FAQ
          </h2>
        </AnimateOnView>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, i) => (
            <AnimateOnView key={i} delay={i * 0.05}>
              <div
                className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-accent/30 transition-colors"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="font-oswald font-semibold text-text-light text-base sm:text-lg leading-tight">
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full border-2 border-accent/40 flex items-center justify-center transition-transform duration-300 ${
                      open === i ? "rotate-45 bg-accent border-accent" : ""
                    }`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className={open === i ? "text-white" : "text-accent"}
                    >
                      <path
                        d="M6 1v10M1 6h10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    open === i ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-text-muted text-sm sm:text-base leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </Container>
    </section>
  );
}
