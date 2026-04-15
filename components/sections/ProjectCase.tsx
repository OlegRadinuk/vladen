"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface MediaItem {
  src: string;
  type: "image" | "video";
  alt: string;
}

interface Case {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  location: string;
  year: string;
  stats: { value: string; label: string }[];
  features: string[];
  media: (MediaItem | null)[];
}

const cases: Case[] = [
  {
    id: 3,
    tag: "Коттеджный посёлок",
    title: "«Крымская Палитра»",
    subtitle: "6 домов по типовому проекту · Симферопольский район · 2025",
    location: "Симферопольский район",
    year: "2025",
    stats: [
      { value: "6 домов", label: "Объектов" },
      { value: "107 м²", label: "Площадь каждого" },
      { value: "2025", label: "Год сдачи" },
    ],
    features: [
      "Одноэтажные дома по типовому проекту, предчистовая отделка",
      "Четыре комнаты, терраса для отдыха в каждом доме",
      "Центральное отопление и водоснабжение, газовая система",
      "Планировка участка 6 соток на каждый дом",
      "Строительство в едином архитектурном стиле",
      "Сдан полностью — все 6 домов в 2025 году",
    ],
    media: [
      { src: "/cases/kottedge.MP4", type: "video", alt: "Видео посёлка" },
      { src: "/cases/kottedge.jpg", type: "image", alt: "Фасад дома" },
      { src: "/cases/kottedge-plan.jpg", type: "image", alt: "Планировка участка" },
    ],
  },
  {
    id: 2,
    tag: "Под ключ · Предчистовая",
    title: "Одноэтажный дом в с. Мирное",
    subtitle: "Ракушечник · Битумная черепица · Тёплый пол · Все коммуникации",
    location: "Симферополь, с. Мирное",
    year: "2025",
    stats: [
      { value: "81 м²", label: "Площадь дома" },
      { value: "1 этаж", label: "Этажность" },
      { value: "2025", label: "Год сдачи" },
    ],
    features: [
      "Стены и перегородки из ракушечника, кровля — битумная черепица",
      "Тёплый пол в кухне-гостиной, коридоре и санузле",
      "Электрокотёл + бойлер 100 л, радиаторы в спальнях",
      "Полусухая стяжка, потолок под натяжной, электропроводка разведена",
      "Утеплённый фасад (пенопласт 5 см), энергосберегающие стеклопакеты",
      "Забор, откатные ворота, центральные газ / вода / электричество / канализация",
    ],
    media: [
      { src: "/cases/keys2-vnutri.jpg", type: "image", alt: "Интерьер" },
      { src: "/cases/keys2-gorizontalnaya.jpg", type: "image", alt: "Вид горизонтальный" },
      { src: "/cases/keys2.jpg", type: "image", alt: "Фасад дома, с. Мирное" },
    ],
  },
  {
    id: 1,
    tag: "Индивидуальный проект",
    title: "Двухэтажный дом в Евпатории",
    subtitle: "Природный камень ракушка · Металлочерепица · Декоративная штукатурка",
    location: "Евпатория",
    year: "декабрь 2025",
    stats: [
      { value: "165 м²", label: "Общая площадь" },
      { value: "2 этажа", label: "Этажность" },
      { value: "2025", label: "Год сдачи" },
    ],
    features: [
      "Ленточный фундамент по индивидуальному расчёту",
      "Стены из природного камня ракушка",
      "Кровля из металлочерепицы с водоотводом",
      "Фасад — декоративная штукатурка",
      "Баня 5,6 м² + предбанник 4 м² на первом этаже",
      "Кухня-гостиная 38 м², две спальни и детская на втором этаже",
    ],
    media: [
      { src: "/cases/1keys-fasad.jpg", type: "image", alt: "Фасад дома, Евпатория" },
      null,
      null,
    ],
  },
];

function PlaceholderSlot() {
  return (
    <div className="w-full h-full min-h-[160px] bg-white/5 flex flex-col items-center justify-center gap-2 rounded-lg border border-white/10">
      <svg
        className="w-10 h-10 text-white/20"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 22V12h6v10"
        />
      </svg>
      <span className="text-white/20 text-xs">Фото скоро</span>
    </div>
  );
}

function MediaSlot({ item }: { item: MediaItem | null }) {
  if (!item) return <PlaceholderSlot />;

  if (item.type === "video") {
    return (
      <video
        src={item.src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover rounded-lg"
        aria-label={item.alt}
      />
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      className="object-contain rounded-lg"
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
  );
}

export default function ProjectCase() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 250);
    },
    [animating, current]
  );

  const prev = () => go((current - 1 + cases.length) % cases.length);
  const next = () => go((current + 1) % cases.length);

  const c = cases[current];

  return (
    <section id="projects" className="py-20 md:py-28 bg-dark overflow-hidden">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
            Наши кейсы
          </p>
          <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Реализованные проекты
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-sm">
            Каждый дом — индивидуальная история. Реальные объекты, реальные сроки.
          </p>
        </div>

        {/* Slide */}
        <div
          className="transition-opacity duration-250"
          style={{ opacity: animating ? 0 : 1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Media grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 relative h-60 sm:h-72 rounded-lg overflow-hidden bg-white/5">
                <MediaSlot item={c.media[0]} />
              </div>
              <div className="relative h-40 rounded-lg overflow-hidden bg-white/5">
                <MediaSlot item={c.media[1]} />
              </div>
              <div className="relative h-40 rounded-lg overflow-hidden bg-white/5">
                <MediaSlot item={c.media[2]} />
              </div>
            </div>

            {/* Info */}
            <div>
              {/* Tag */}
              <span className="inline-block text-xs font-oswald tracking-widest uppercase text-accent border border-accent/40 rounded px-3 py-1 mb-4">
                {c.tag}
              </span>

              <h3 className="font-oswald text-2xl sm:text-3xl font-bold text-white mb-2">
                {c.title}
              </h3>
              <p className="text-text-muted text-sm mb-6">{c.subtitle}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-7">
                {c.stats.map((s) => (
                  <div
                    key={s.label}
                    className="text-center p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="font-oswald text-xl font-bold text-accent mb-0.5">
                      {s.value}
                    </div>
                    <div className="text-text-muted text-xs">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-8">
                {c.features.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[7px] shrink-0" />
                    <span className="text-text-dark text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Location + year */}
              <div className="flex items-center gap-4 mb-8 text-text-muted text-sm">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {c.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Сдан: {c.year}
                </span>
              </div>

              <Button
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("contacts")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Хочу такой же дом
              </Button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-10">
          {/* Arrows */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-accent hover:text-accent transition-colors"
              aria-label="Назад"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-accent hover:text-accent transition-colors"
              aria-label="Вперёд"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-2">
            {cases.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-accent"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Кейс ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="text-text-muted text-sm font-oswald">
            {String(current + 1).padStart(2, "0")}{" "}
            <span className="text-white/20">/</span>{" "}
            {String(cases.length).padStart(2, "0")}
          </span>
        </div>
      </Container>
    </section>
  );
}
