"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

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

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } } as const,
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  };

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
          preload="auto"
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

      <Container className="relative z-10 py-32 md:py-40">
        <motion.div
          className="max-w-3xl"
          variants={stagger}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12 }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-sm font-inter font-medium">
                Строительство в Крыму с 2005 года
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="font-oswald text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Строим дома,
            <br />
            <span className="text-accent">которые служат</span>
            <br />
            поколениями
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-text-dark text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
          >
            Полный цикл строительства: от подбора участка до сдачи ключей.
            Более 200 объектов по Крыму. Гарантия качества на все работы.
          </motion.p>

          {/* Stats */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-8 mb-10">
            {[
              { value: "200+", label: "Объектов сдано" },
              { value: "18", label: "Лет опыта" },
              { value: "98%", label: "Клиентов довольны" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-accent font-oswald text-3xl font-bold">
                  {stat.value}
                </div>
                <div className="text-text-muted text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("contacts")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Получить консультацию
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
              Смотреть проекты
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-light to-transparent" />
    </section>
  );
}
