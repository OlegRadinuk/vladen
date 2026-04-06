"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";

const reviews = [
  {
    name: "Александр",
    date: "27 марта 2026",
    rating: 5,
    text: "Обратился для ремонта квартиры в Евпатории. Высокий уровень профессионализма и качество работ. Специалисты приехали точно в время, внимательно выслушали пожелания. Стены ровные, отделка идеальная, инженерные системы без нареканий. Никаких скрытых платежей — всё по договору.",
  },
  {
    name: "Nikolas",
    date: "8 декабря 2025",
    rating: 5,
    text: "Обратился по рекомендации с ремонтом квартиры под сдачу. Сделали даже быстрее договора и по адекватным деньгам. Документально всё чисто: фотофиксация этапов, деньги под отчёт с чеками. Даже предложили хорошее решение по мебели дешевле магазинов. Вторую квартиру тоже буду делать у них!",
  },
  {
    name: "Данила Веретенников",
    date: "31 декабря 2025",
    rating: 5,
    text: "Обратился по поводу строительства дома в три этапа. Первый этап успешно завершён. Ребята молодцы — качественно выполнили работу и дали советы по экономии на некоторых этапах и материалах. Поздравляю компанию с Новым годом и желаю процветания и развития!",
  },
  {
    name: "Лена",
    date: "9 декабря 2025",
    rating: 5,
    text: "Огромное спасибо за наш чудесный ремонт! Руководитель Александр — отличный специалист, всё разъяснил и грамотно подошёл к делу. Отдельное спасибо бригаде Сергея — Николай и Владимир, руки золотые! Всё сделали в оговоренный срок. Рекомендую!",
  },
  {
    name: "Валерий И.",
    date: "27 марта 2026",
    rating: 5,
    text: "Обратился с ремонтом домовладения в Евпатории. Общение очень приятное. Обсудили строительные работы, инженерные коммуникации, материалы и смету. Чувствуется опыт — подсказали как упростить и сэкономить. Ребята думают не о том, как урвать денег, а как помочь и заработать авторитет. Рекомендую!",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-accent" : "text-white/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const prev = useCallback(() => {
    setDir(-1);
    setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1));
  }, []);

  const next = useCallback(() => {
    setDir(1);
    setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1));
  }, []);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <section className="py-20 md:py-28 bg-dark">
      <Container>
        <div className="text-center mb-14">
          <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
            Отзывы клиентов
          </p>
          <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Что говорят о нас
          </h2>
          <a
            href="https://yandex.com/maps/org/vladen/111586244168/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-accent transition-colors"
          >
            Все отзывы на Яндекс Картах
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Card */}
          <div className="relative min-h-[220px]">
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={current}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10"
              >
                <Stars count={reviews[current].rating} />
                <p className="text-text-dark text-base leading-relaxed mt-5 mb-6">
                  &ldquo;{reviews[current].text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-oswald font-semibold">
                      {reviews[current].name}
                    </p>
                    <p className="text-text-muted text-xs mt-0.5">
                      {reviews[current].date}
                    </p>
                  </div>
                  <a
                    href="https://yandex.com/maps/org/vladen/111586244168/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-text-muted border border-white/15 rounded-lg px-3 py-1.5 hover:border-accent/50 hover:text-accent transition-all duration-200"
                  >
                    Смотреть на Яндексе
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-accent hover:text-accent transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-accent hover:text-accent transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
