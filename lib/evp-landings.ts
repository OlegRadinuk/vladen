/**
 * Общие данные посадочных страниц «Евпатория» и «Дом из ракушечника»:
 * JSON-LD-хелперы и карта перелинковки. Тексты — из spec/evp-focus/50-copy.md.
 */

export const SITE_URL = "https://vladen-crimea.ru";

export interface FaqItem {
  q: string;
  a: string;
}

/** FAQPage строится из тех же вопросов, что выводятся на странице. */
export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

interface ServiceJsonLdInput {
  name: string;
  path: string;
  areaServed: { type: "City" | "AdministrativeArea"; name: string }[];
  /** Цена «от», ₽ за м² */
  priceFromPerM2?: number;
}

export function serviceJsonLd({ name, path, areaServed, priceFromPerM2 }: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: areaServed.map((a) => ({ "@type": a.type, name: a.name })),
    url: `${SITE_URL}${path}`,
    ...(priceFromPerM2
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "RUB",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              minPrice: priceFromPerM2,
              priceCurrency: "RUB",
              unitCode: "MTK",
              unitText: "м²",
            },
          },
        }
      : {}),
  };
}

/** Карта перелинковки: 4 посадочные страницы. На каждой выводим остальные три. */
export const LANDING_LINKS = [
  {
    href: "/evpatoriya",
    title: "Ремонт и строительство в Евпатории",
    desc: "Работаем в Евпатории и Сакском районе. Цена фиксируется в договоре.",
  },
  {
    href: "/evpatoriya/remont-kvartir",
    title: "Ремонт квартир в Евпатории",
    desc: "Эконом от 17 000 ₽/м², стандарт от 27 000 ₽/м², премиум от 37 000 ₽/м².",
  },
  {
    href: "/evpatoriya/stroitelstvo-domov",
    title: "Строительство домов в Евпатории",
    desc: "Индивидуальный проект, ракушечник и другие материалы. От 55 000 ₽/м².",
  },
  {
    href: "/dom-iz-rakushechnika",
    title: "Дома из ракушечника в Крыму",
    desc: "Природный камень ракушка — местный материал, проверенный крымским климатом.",
  },
] as const;

export function relatedLinksExcept(href: string) {
  return LANDING_LINKS.filter((l) => l.href !== href).map((l) => ({ ...l }));
}

/**
 * Типографика для видимого текста: не даём переносить «55 000», «₽/м²» и телефон
 * (на 375px иначе рвётся «от 55 / 000 ₽/м²» и «456- / 41-56»).
 * В JSON-LD не применяем — там нужен чистый текст.
 */
export function typo(s: string): string {
  return s
    .replace(/(\d) (?=\d{3}(?!\d))/g, "$1\u00A0")
    .replace(/ (₽|м²)/g, "\u00A0$1")
    .replace(/(\d)-(?=\d)/g, "$1-\u2060")
    .replace(/\/\u043c\u00b2/g, "/\u2060\u043c\u00b2");
}
