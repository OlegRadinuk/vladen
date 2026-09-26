import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import BukletSlider from "@/components/sections/BukletSlider";
import ProjectCase from "@/components/sections/ProjectCase";
import WhyWe from "@/components/sections/WhyWe";
import Calculator from "@/components/sections/Calculator";
import FAQ from "@/components/sections/FAQ";
import Reviews from "@/components/sections/Reviews";
import Partners from "@/components/sections/Partners";
import Contacts from "@/components/sections/Contacts";
import MobileCTABar from "@/components/ui/MobileCTABar";
import { YEARS_PHRASE, OBJECTS_DONE, OBJECTS_PHRASE } from "@/lib/company";

export const metadata: Metadata = {
  title: "Ремонт квартир и домов под ключ в Симферополе — Владен",
  description:
    `Ремонт квартир и домов под ключ в Симферополе и Крыму. Дизайнерский ремонт, чистовая отделка, строительство. ${YEARS_PHRASE} опыта, более ${OBJECTS_DONE} объектов. Бесплатная консультация: +7 (978) 717-44-47`,
  keywords: [
    "ремонт квартир Симферополь",
    "ремонт квартиры под ключ Симферополь",
    "ремонт квартиры Симферополь цена",
    "ремонт дома Симферополь",
    "ремонт под ключ Крым",
    "дизайнерский ремонт Симферополь",
    "дизайн интерьера Симферополь",
    "ремонт квартиры Ялта",
    "ремонт квартиры Севастополь",
    "капитальный ремонт квартиры Симферополь",
    "отделка квартиры Симферополь",
    "строительство дома Симферополь",
    "строительство под ключ Крым",
    "строительная компания Симферополь",
  ],
  openGraph: {
    title: "Ремонт квартир и домов под ключ в Симферополе — Владен",
    description:
      `Ремонт квартир, дизайнерская отделка, строительство в Симферополе и Крыму. ${YEARS_PHRASE}, ${OBJECTS_PHRASE} объектов. Звоните: +7 (978) 717-44-47`,
    url: "https://vladen-crimea.ru",
    images: [{ url: "https://vladen-crimea.ru/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <div id="buklet"><BukletSlider /></div>
      <Calculator />
      <div id="services"><Services /></div>
      <div id="project-case"><ProjectCase /></div>
      <WhyWe />
      <FAQ />
      <Contacts />
      <Partners />
      <Reviews />
      {/* Спейсер под мобильный sticky-бар */}
      <div className="h-[68px] md:hidden" />
      <MobileCTABar />
    </>
  );
}
