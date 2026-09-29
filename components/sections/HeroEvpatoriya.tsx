"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import ScrollCTA from "@/components/ui/ScrollCTA";
import { typo } from "@/lib/evp-landings";

interface HeroEvpatoriyaProps {
  badge: string;
  h1: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaSecondaryHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  priceTable?: { label: string; price: string }[];
  /** Второй абзац под подзаголовком (лид с SEO-вхождениями) */
  lead?: string;
  /** Подпись поверх фото (снизу слева) */
  imageCaption?: string;
  /** Видимые хлебные крошки над бейджем; последний пункт — текущая страница (без href) */
  breadcrumbs?: { label: string; href?: string }[];
  /** minHeight override, e.g. "min-h-[620px]" */
  minH?: string;
}

export default function HeroEvpatoriya({
  badge,
  h1,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  ctaSecondaryHref = "#projects",
  imageSrc,
  imageAlt,
  priceTable,
  lead,
  imageCaption,
  breadcrumbs,
  minH = "min-h-[600px]",
}: HeroEvpatoriyaProps) {
  const shouldReduceMotion = useReducedMotion();
  const a = !shouldReduceMotion;

  return (
    <section className={`relative ${minH} flex items-center bg-dark`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-24 sm:py-32">
          {/* Левая колонка */}
          <div className="min-w-0">
            {breadcrumbs && breadcrumbs.length > 0 ? (
              <nav aria-label="Хлебные крошки" className="mb-5">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-text-muted">
                  {breadcrumbs.map((b, i) => (
                    <li key={b.label} className="flex items-center gap-2">
                      {i > 0 ? (
                        <svg className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      ) : null}
                      {b.href ? (
                        <Link href={b.href} className="hover:text-accent transition-colors">
                          {b.label}
                        </Link>
                      ) : (
                        <span aria-current="page" className="text-text-dark">{b.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            <motion.span
              className="inline-block mb-4 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent font-oswald text-xs tracking-widest uppercase"
              initial={a ? { opacity: 0, y: 24 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              {badge}
            </motion.span>

            <motion.h1
              className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance"
              initial={a ? { opacity: 0, y: 24 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {h1}
            </motion.h1>

            <motion.p
              className={`text-text-dark text-base sm:text-lg leading-relaxed ${lead ? "mb-3" : "mb-8"}`}
              initial={a ? { opacity: 0, y: 24 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {typo(subtitle)}
            </motion.p>

            {lead ? (
              <motion.p
                className="text-text-muted text-sm sm:text-base leading-relaxed mb-8"
                initial={a ? { opacity: 0, y: 24 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                {typo(lead)}
              </motion.p>
            ) : null}

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={a ? { opacity: 0, y: 24 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ScrollCTA targetId="calculator" label={ctaPrimary} variant="primary" size="lg" />
              <Link href={ctaSecondaryHref}>
                <span className="font-oswald text-sm text-accent underline underline-offset-4 hover:text-accent/80 transition-colors inline-block py-4">
                  {ctaSecondary}
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Правая колонка (скрыта на мобайл) */}
          <div className="hidden lg:block">
            {priceTable ? (
              /* Таблица цен */
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-4">
                  Стоимость ремонта
                </p>
                <div className="space-y-3">
                  {priceTable.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex justify-between items-center py-3 ${
                        i < priceTable.length - 1 ? "border-b border-white/10" : ""
                      }`}
                    >
                      <span className="text-text-dark font-oswald">{row.label}</span>
                      <span className="text-accent font-oswald font-bold">{typo(row.price)}</span>
                    </div>
                  ))}
                </div>
                <p className="text-text-muted text-xs mt-4">
                  Точная стоимость после бесплатного выезда замерщика
                </p>
              </div>
            ) : imageSrc ? (
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={imageSrc}
                  fill
                  className="object-cover"
                  // Без priority: колонка hidden ниже lg, а preload от priority качал бы фото и на мобиле.
                  // Lazy-картинку в display:none браузер не грузит; на десктопе она в первом экране —
                  // загрузится сразу после layout, fetchPriority поднимает её в очереди.
                  fetchPriority="high"
                  alt={imageAlt ?? ""}
                  sizes="(max-width: 1024px) 100vw, 640px"
                />
                {imageCaption ? (
                  <>
                    <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-dark/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white font-oswald text-sm">{imageCaption}</span>
                    </div>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
