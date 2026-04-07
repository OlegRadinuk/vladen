"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const reviews = [
  {
    name: "Nikolas",
    date: "8 декабря 2025",
    rating: 5,
    text: "Обратился по рекомендации знакомых с ремонтом квартиры под сдачу в Жигулиной Роще. Не пожалел. Ребята сделали всё даже быстрее, чем оговаривалось в договоре, и по очень адекватным деньгам. Что для меня важно — документальная составляющая: фотофиксация этапов, деньги под отчёт с чеками. Вторую квартиру тоже буду делать у них!",
  },
  {
    name: "Данила Веретенников",
    date: "31 декабря 2025",
    rating: 5,
    text: "Хочу выразить искреннюю благодарность компании «Владен» за профессионализм и оперативность! Обратился по поводу строительства дома в три этапа, и уже первый этап успешно завершён. Ребята не только качественно выполнили работу, но и дали советы по экономии на материалах. Поздравляю компанию с Новым годом и желаю процветания!",
  },
  {
    name: "Лена",
    date: "9 декабря 2025",
    rating: 5,
    text: "Огромное спасибо за наш чудесный ремонт! Обратились в «Владен» по совету друзей. Руководитель Александр — отличный специалист, всё разъяснил и грамотно подошёл к делу. Отдельное спасибо бригаде Сергея — Николай и Владимир, руки золотые! Всё сделали в оговоренный срок. Рекомендую!",
  },
  {
    name: "Валерий И.",
    date: "27 марта 2026",
    rating: 5,
    text: "По совету Александра обратился в компанию «Владен» с ремонтом домовладения в Евпатории. Общение было настолько приятным, что хочется отдельно поблагодарить руководство. Чувствуется опыт — подсказали как упростить и сэкономить. Ребята думают не о том, как урвать денег, а как помочь и заработать авторитет. Рекомендую!",
  },
  {
    name: "Mike Echoes",
    date: "20 ноября 2025",
    rating: 5,
    text: "Обращались по ремонту квартиры. В течение недели решили все основные вопросы и заключили договор на три месяца. Порадовало, что работы закончили на неделю раньше срока и помогли удешевить смету. Живя в квартире, было очень комфортно — ребята работали аккуратно и не мешали. Рекомендую!",
  },
  {
    name: "Анна Селькина",
    date: "8 декабря 2025",
    rating: 5,
    text: "Отличная компания! Грамотные специалисты. Быстро и качественно учли все наши пожелания по дизайну. Очень рекомендуем! 👍",
  },
  {
    name: "sasha p.",
    date: "7 февраля 2026",
    rating: 5,
    text: "Хорошая компания, обратился через знакомых и не пожалел — всё как договаривались. Особое спасибо малярам: ребята знают своё дело, видно что профи. Работой доволен, принимали под лампу 👍",
  },
  {
    name: "Виктория Владимировна",
    date: "21 декабря 2025",
    rating: 5,
    text: "Обратилась по ремонту офиса — сделали быстро и качественно! Всем довольна, советую!",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? "text-accent" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Coverflow card — десктоп
function CoverCard({
  review,
  offset,
  onClick,
}: {
  review: typeof reviews[0];
  offset: number; // -2, -1, 0, 1, 2
  onClick: () => void;
}) {
  const abs = Math.abs(offset);

  // Параметры по offset
  const configs: Record<number, { x: number; scale: number; opacity: number; z: number; rotateY: number }> = {
    0: { x: 0,    scale: 1,    opacity: 1,    z: 30, rotateY: 0 },
    1: { x: 340,  scale: 0.82, opacity: 1,    z: 20, rotateY: -10 },
    2: { x: 580,  scale: 0.67, opacity: 0.6,  z: 10, rotateY: -18 },
  };

  const cfg = configs[Math.min(abs, 2)];
  const xSign = offset < 0 ? -1 : 1;

  if (abs > 2) return null;

  return (
    <motion.div
      onClick={offset !== 0 ? onClick : undefined}
      animate={{
        x: cfg.x * xSign,
        scale: cfg.scale,
        opacity: cfg.opacity,
        rotateY: cfg.rotateY * xSign,
        zIndex: cfg.z,
      }}
      transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
      style={{ position: "absolute", width: 400, height: 340, transformOrigin: offset < 0 ? "right center" : "left center" }}
      className={`bg-[#363d46] border border-white/10 rounded-2xl p-7 flex flex-col ${offset !== 0 ? "cursor-pointer" : ""}`}
    >
      <Stars count={review.rating} />
      <p className="text-text-dark text-sm leading-relaxed mt-4 flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center justify-between mt-5">
        <div>
          <p className="text-white font-oswald font-semibold">{review.name}</p>
          <p className="text-text-muted text-xs mt-0.5">{review.date}</p>
        </div>
        {offset === 0 && (
          <a
            href="https://yandex.com/maps/org/vladen/111586244168/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-text-muted border border-white/15 rounded-lg px-3 py-1.5 hover:border-accent/50 hover:text-accent transition-all duration-200"
          >
            Яндекс
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const userInteracted = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setDir(-1);
    setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1));
  }, []);

  const next = useCallback(() => {
    setDir(1);
    setCurrent((c) => (c === reviews.length - 1 ? 0 : c + 1));
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (!userInteracted.current) next();
    }, 6000);
    return () => clearInterval(t);
  }, [next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      userInteracted.current = true;
      if (diff > 0) next(); else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="py-20 md:py-28 bg-dark overflow-hidden">
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

        {/* ── ДЕСКТОП: Coverflow ── */}
        <div className="hidden lg:block">
          <div className="relative flex justify-center" style={{ height: 400 }}>
            {reviews.map((review, i) => {
              const offset = ((i - current + reviews.length) % reviews.length);
              // Нормализуем: -2..2
              const norm = offset > reviews.length / 2 ? offset - reviews.length : offset;
              return (
                <CoverCard
                  key={i}
                  review={review}
                  offset={norm}
                  onClick={() => {
                    setDir(norm > 0 ? 1 : -1);
                    setCurrent(i);
                  }}
                />
              );
            })}
          </div>

          {/* Контролы */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-accent hover:text-accent transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-accent hover:text-accent transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── МОБИЛЬ/ПЛАНШЕТ: обычный слайдер ── */}
        <div className="lg:hidden max-w-2xl mx-auto">
          {/* Grid-стек: все карточки в одной ячейке → высота = самый длинный отзыв, нет прыжков */}
          <div style={{ display: "grid" }}>
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                style={{ gridArea: "1/1", pointerEvents: i === current ? "auto" : "none" }}
                initial={false}
                animate={{
                  opacity: i === current ? 1 : 0,
                  x: i === current ? 0 : (i > current ? 24 : -24),
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                onTouchStart={i === current ? handleTouchStart : undefined}
                onTouchEnd={i === current ? handleTouchEnd : undefined}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 select-none"
              >
                <Stars count={review.rating} />
                <p className="text-text-dark text-base leading-relaxed mt-5 mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-oswald font-semibold">{review.name}</p>
                    <p className="text-text-muted text-xs mt-0.5">{review.date}</p>
                  </div>
                  <a
                    href="https://yandex.com/maps/org/vladen/111586244168/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-text-muted border border-white/15 rounded-lg px-3 py-1.5 hover:border-accent/50 hover:text-accent transition-all duration-200"
                  >
                    Яндекс
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Точки-навигация (без стрелок) */}
          <div className="flex justify-center gap-3 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  userInteracted.current = true;
                  setDir(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                aria-label={`Отзыв ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-8 h-3 bg-accent" : "w-3 h-3 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
