import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ChatWidget from "@/components/ui/ChatWidget";
import { LoadingProvider } from "@/contexts/LoadingContext";

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ремонт квартир и домов в Симферополе — Владен",
    template: "%s | Владен — Ремонт и строительство в Крыму",
  },
  description:
    "Ремонт квартир и домов под ключ в Симферополе и Крыму. Дизайнерский ремонт, отделка, строительство. ООО «ВЛАДЕН» — 12 лет опыта, более 200 объектов. Звоните: +7 (978) 717-44-47",
  keywords: [
    "ремонт квартир Симферополь",
    "ремонт квартиры под ключ Симферополь",
    "ремонт квартиры Крым",
    "ремонт дома Симферополь",
    "ремонт под ключ Крым",
    "дизайнерский ремонт Симферополь",
    "дизайн интерьера Симферополь",
    "ремонт квартир Ялта",
    "ремонт квартир Севастополь",
    "ремонт квартир Евпатория",
    "ремонт квартир Феодосия",
    "строительство дома Симферополь",
    "строительство дома под ключ Крым",
    "строительная компания Крым",
    "сколько стоит ремонт квартиры Симферополь",
    "цена ремонта квартиры Крым",
    "ремонт квартиры цена за метр Симферополь",
    "строительство дома из ракушняка Крым",
    "Владен",
  ],
  verification: {
    google: "c8BSwUzn9rfTn3XWZAF8CH5DWdaWag5IinDhu2KsBOo",
    yandex: "08a03483f1c3ba4a",
  },
  metadataBase: new URL("https://vladen-crimea.ru"),
  alternates: { canonical: "https://vladen-crimea.ru" },
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/favicon.ico", type: "image/x-icon" },
    ],
    apple: [
      { url: "/icons/favicon-57x57.png", sizes: "57x57" },
      { url: "/icons/favicon-60x60.png", sizes: "60x60" },
      { url: "/icons/favicon-72x72.png", sizes: "72x72" },
      { url: "/icons/favicon-76x76.png", sizes: "76x76" },
      { url: "/icons/favicon-114x114.png", sizes: "114x114" },
      { url: "/icons/favicon-120x120.png", sizes: "120x120" },
      { url: "/icons/favicon-144x144.png", sizes: "144x144" },
      { url: "/icons/favicon-152x152.png", sizes: "152x152" },
      { url: "/icons/favicon-180x180.png", sizes: "180x180" },
    ],
    other: [
      { rel: "msapplication-config", url: "/icons/browserconfig.xml" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Владен",
    title: "Ремонт квартир и домов в Симферополе — Владен",
    description:
      "Ремонт квартир и домов под ключ в Крыму. Дизайнерский ремонт, отделка, строительство. 12 лет опыта, 200+ объектов.",
    url: "https://vladen-crimea.ru",
    images: [{ url: "/icons/favicon-192x192.png", width: 192, height: 192 }],
  },
  twitter: {
    card: "summary",
    title: "Ремонт квартир и домов в Симферополе — Владен",
    description: "Ремонт и строительство под ключ в Крыму. 12 лет опыта, 200+ объектов. Звоните: +7 (978) 717-44-47",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://vladen-crimea.ru/#organization",
  name: "ООО «ВЛАДЕН»",
  alternateName: "Владен",
  description:
    "Строительная компания в Симферополе. Строительство домов под ключ, ремонт, проектирование, инженерные сети по всему Крыму с 2005 года.",
  url: "https://vladen-crimea.ru",
  telephone: "+79787174447",
  email: "vladen2026@mail.ru",
  foundingDate: "2014",
  taxID: "2317074414",
  legalName: "ООО «ВЛАДЕН»",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Киевская 41, офис 727",
    addressLocality: "Симферополь",
    addressRegion: "Республика Крым",
    postalCode: "295000",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.9572,
    longitude: 34.1108,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "15:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Симферополь" },
    { "@type": "City", name: "Ялта" },
    { "@type": "City", name: "Севастополь" },
    { "@type": "City", name: "Керчь" },
    { "@type": "AdministrativeArea", name: "Республика Крым" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Ремонт и строительство в Симферополе",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ремонт квартиры под ключ в Симферополе" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ремонт дома под ключ в Крыму" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Дизайнерский ремонт квартиры в Симферополе" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Дизайн интерьера в Симферополе" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Отделка квартиры в Симферополе" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Строительство дома под ключ в Симферополе" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Проектирование домов в Крыму" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Кровельные работы в Симферополе" } },
    ],
  },
  priceRange: "от 20 000 ₽/м²",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "8",
    bestRating: "5",
    worstRating: "5",
  },
  sameAs: [
    "https://yandex.com/maps/org/vladen/111586244168/",
    "https://2gis.ru/simferopol/search/владен",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Сколько стоит ремонт квартиры под ключ в Симферополе?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Стоимость зависит от площади, состояния квартиры и класса отделки. Эконом — от 20 000 руб./м², стандарт — от 30 000 руб./м², премиум — от 40 000 руб./м². Точную цену назовём после выезда замерщика — это бесплатно.",
      },
    },
    {
      "@type": "Question",
      name: "Сколько времени занимает ремонт квартиры?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Стандартная однокомнатная квартира 40 м² под ключ — 6–8 недель. Двухкомнатная 65 м² — 8–12 недель. Сроки фиксируем в договоре.",
      },
    },
    {
      "@type": "Question",
      name: "Вы работаете по договору?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, обязательно. Заключаем официальный договор подряда с фиксированной сметой, графиком работ и гарантией. Оплата поэтапно.",
      },
    },
    {
      "@type": "Question",
      name: "Вы работаете только в Симферополе?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Нет, работаем по всему Крыму: Ялта, Севастополь, Керчь, Евпатория, Феодосия, Бахчисарай. Стоимость выезда в другие города — от 0 руб. при объёме работ от 300 000 руб.",
      },
    },
    {
      "@type": "Question",
      name: "Даёте ли вы гарантию на ремонт?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да. Гарантия на отделочные работы — 2 года, на конструктивные (фундамент, стены, кровля) — 5 лет. Все условия прописаны в договоре.",
      },
    },
    {
      "@type": "Question",
      name: "Сколько стоит строительство дома под ключ в Крыму?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Строительство дома в предчистовой отделке — от 55 000 руб./м² (фундамент, стены, кровля, черновые сети). Чистовая отделка стандарт — от 80 000 руб./м². Точная смета составляется бесплатно после выезда специалиста.",
      },
    },
    {
      "@type": "Question",
      name: "Нужно ли покупать материалы самому?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Не обязательно. Мы можем взять закупку полностью на себя — у нас есть договоры с поставщиками и скидки до 15% от рыночной цены.",
      },
    },
    {
      "@type": "Question",
      name: "Как начать работу с компанией Владен?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Позвоните по номеру +7 (978) 717-44-47 или оставьте заявку на сайте. Выедем на замер, составим смету — бесплатно и без обязательств. Обычно это занимает 2–3 дня.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${oswald.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <LoadingProvider>
          <SmoothScroll />
          <ScrollToTop />
          <LoadingScreen />
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </LoadingProvider>
      </body>
    </html>
  );
}
