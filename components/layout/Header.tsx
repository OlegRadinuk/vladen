"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/modular", label: "Модульные дома / бани", hot: true },
  { href: "/projects", label: "Проекты" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [trainKey, setTrainKey] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const trigger = () => setTrainKey((k) => k + 1);
    const initial = setTimeout(() => {
      trigger();
      const interval = setInterval(trigger, 5000);
      return () => clearInterval(interval);
    }, 3000);
    return () => clearTimeout(initial);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-dark shadow-lg" : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 min-w-0 overflow-hidden">
            <img
              src="/logo.png"
              alt="Владен"
              className="h-9 md:h-14 w-auto object-contain flex-shrink-0"
            />
            <div className="flex flex-col leading-none min-w-0">
              <span className="text-accent text-lg md:text-2xl font-oswald font-bold tracking-wider whitespace-nowrap">
                ВЛАДЕН
              </span>
              <span className="text-white/70 text-[9px] sm:text-[10px] tracking-widest uppercase font-inter whitespace-nowrap">
                Строительная компания
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-1 transition-colors duration-200 font-inter text-sm tracking-wide ${
                  link.hot ? "text-accent hover:text-accent/80" : "text-text-dark hover:text-accent"
                }`}
              >
                {link.label}
                {link.hot && (
                  <span className="absolute -top-2.5 -right-3 text-[9px] font-oswald font-bold text-accent uppercase tracking-wide leading-none">
                    new
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <div className="relative group">
              {/* SVG трасса — всегда в DOM, stroke-dashoffset анимируется */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                style={{ filter: "drop-shadow(0 0 4px #fbbf24)" }}
              >
                <defs>
                  <linearGradient id="comet-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#D97706" stopOpacity="0" />
                    <stop offset="40%"  stopColor="#fbbf24" />
                    <stop offset="70%"  stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <rect
                  key={trainKey}
                  x="1" y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="4"
                  fill="none"
                  stroke="url(#comet-grad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="55 485"
                  strokeDashoffset="0"
                  className={trainKey > 0 ? "comet-racing" : ""}
                  style={{ opacity: 0 }}
                />
              </svg>

              <Button
                size="md"
                className="hover:shadow-[0_0_18px_5px_rgba(217,119,6,0.4)] transition-shadow duration-300"
                onClick={() => {
                  document
                    .getElementById("contacts")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Получить консультацию
              </Button>
            </div>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-accent p-2 flex-shrink-0 ml-3"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Меню"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </Container>

      {/* Fade-хвост под хедером — только когда прозрачный */}
      {!scrolled && (
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: "100%",
            height: 10,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)",
          }}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        } bg-dark border-t border-white/10`}
      >
        <Container>
          <nav className="py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 transition-colors py-1 ${
                  link.hot ? "text-accent" : "text-text-dark hover:text-accent"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
                {link.hot && (
                  <span className="text-[10px] font-oswald font-bold text-accent uppercase tracking-wide">
                    new
                  </span>
                )}
              </Link>
            ))}
            <Button
              size="sm"
              className="mt-2 w-full"
              onClick={() => {
                setIsOpen(false);
                document
                  .getElementById("contacts")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Получить консультацию
            </Button>
          </nav>
        </Container>
      </div>
    </header>
  );
}
