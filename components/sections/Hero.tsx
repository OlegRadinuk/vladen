"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.06)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Секция — колонка: контент растягивается, подсказка «Варианты ремонта»
  // лежит под ним в обычном потоке. Раньше она была absolute и на низких
  // ноутбучных экранах наезжала на кнопку «Смотреть наши работы».
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-dark">
      {/* Video background */}
      <div
        ref={bgRef}
        className="absolute inset-0 transition-transform duration-200 ease-out scale-105"
      >
        {/* Fallback gradient — всегда видна под видео */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 50%, rgba(217,119,6,0.18) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(217,119,6,0.10) 0%, transparent 50%)",
          }}
        />

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-70"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-dark/35" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#D97706 1px, transparent 1px), linear-gradient(90deg, #D97706 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* short: компактный ритм для ноутбуков с низким экраном (≈720px и ниже),
          чтобы контент и нижняя подсказка помещались в первый экран */}
      <Container className="relative z-10 flex-1 flex items-center py-16 sm:py-20 md:py-24 short:py-4 short-sm:py-6">
        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Badge — скрыт на очень маленьких экранах */}
          <div className="hidden sm:block">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 mb-6 short:mb-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-sm font-inter font-medium">
                Ремонт и строительство в Крыму с 2014 года
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-oswald text-4xl sm:text-5xl md:text-6xl lg:text-7xl short:text-5xl font-bold text-white leading-tight mb-6 short:mb-4 short-sm:mb-4">
            Ремонт квартир и домов
            <br />
            <span className="text-accent">под ключ в Крыму</span>
          </h1>

          <p className="text-text-dark text-lg md:text-xl short:text-base leading-relaxed mb-10 short:mb-5 short-sm:mb-5 max-w-2xl">
            Дизайнерский ремонт, чистовая отделка, строительство.
            Фиксированная цена в договоре — без сюрпризов.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-8 mb-10 sm:mb-12 short:mb-6 short-sm:mb-6">
            {[
              { to: 369, suffix: "+", label: "объектов сдано", sub: "Крым и Краснодар" },
              { to: 12,  suffix: "",  label: "лет на рынке",   sub: "работаем с 2014" },
              { to: 98,  suffix: "%", label: "клиентов довольны", sub: "по отзывам" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <div className="text-accent font-oswald text-3xl sm:text-5xl short:text-4xl font-bold leading-none">
                  <CountUp to={stat.to} suffix={stat.suffix} duration={2} />
                </div>
                <div className="text-white font-oswald text-xs sm:text-lg font-semibold mt-1 uppercase tracking-wide leading-tight">{stat.label}</div>
                <div className="text-text-muted text-xs hidden sm:block">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("calculator")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Рассчитать стоимость ремонта
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Смотреть наши работы
            </Button>
          </div>
        </motion.div>
      </Container>

      {/* Scroll-cue → Варианты ремонта + крючок «лукбук в подарок».
          В обычном потоке под контентом — не перекрывает CTA на низких экранах. */}
      <motion.button
        onClick={() =>
          document.getElementById("buklet")?.scrollIntoView({ behavior: "smooth" })
        }
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
        className="group relative z-20 mx-auto w-fit shrink-0 mb-4 sm:mb-6 flex flex-col items-center gap-2"
        aria-label="Смотреть варианты ремонта — лукбук в подарок"
      >
        {/* Крючок-подарок */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 border border-accent/40 px-3 py-1 backdrop-blur-sm transition-colors group-hover:bg-accent/25">
          <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-accent" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect x="2" y="7" width="20" height="5" />
            <line x1="12" y1="22" x2="12" y2="7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
          <span className="text-accent font-inter text-[11px] sm:text-xs font-semibold tracking-wide">
            Лукбук в подарок
          </span>
        </span>
        {/* Подпись */}
        <span className="text-white/85 font-oswald text-xs sm:text-sm uppercase tracking-[0.2em] leading-none">
          Варианты ремонта
        </span>
        {/* Анимированная стрелка вниз */}
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-accent"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </motion.button>

      {/* Bottom fade — тёмное свечение под тёмный блок «Варианты ремонта» */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 160,
          background:
            "linear-gradient(to top, #161616 0%, rgba(22,22,22,0.72) 42%, transparent 100%)",
        }}
      />
      {/* Тёплый акцент-глоу в центре низа — «свечение в цвет блока» */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "80%",
          height: 180,
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(217,119,6,0.22) 0%, transparent 70%)",
        }}
      />

      {/* Top fade — под хедер */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: 110, background: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)" }}
      />
    </section>
  );
}
