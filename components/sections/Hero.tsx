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

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark">
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

      <Container className="relative z-10 py-24 sm:py-32 md:py-40">
        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Badge — скрыт на очень маленьких экранах */}
          <div className="hidden sm:block">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-sm font-inter font-medium">
                Ремонт и строительство в Крыму с 2014 года
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-oswald text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Ремонт квартир и домов
            <br />
            <span className="text-accent">под ключ в Симферополе</span>
          </h1>

          <p className="text-text-dark text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            Дизайнерский ремонт, чистовая отделка, строительство.
            Фиксированная цена в договоре — без сюрпризов.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-8 mb-10 sm:mb-12">
            {[
              { to: 369, suffix: "+", label: "объектов сдано", sub: "Крым и Краснодар" },
              { to: 12,  suffix: "",  label: "лет на рынке",   sub: "работаем с 2014" },
              { to: 98,  suffix: "%", label: "клиентов довольны", sub: "по отзывам" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <div className="text-accent font-oswald text-3xl sm:text-5xl font-bold leading-none">
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

      {/* Bottom gradient */}
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 40, background: "linear-gradient(to top, #ECF0F1, transparent)" }}
      />

      {/* Top fade — под хедер */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: 110, background: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)" }}
      />
    </section>
  );
}
