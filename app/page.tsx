import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import ProjectCase from "@/components/sections/ProjectCase";
import WhyWe from "@/components/sections/WhyWe";
import Calculator from "@/components/sections/Calculator";
import FAQ from "@/components/sections/FAQ";
import Reviews from "@/components/sections/Reviews";
import Partners from "@/components/sections/Partners";
import Contacts from "@/components/sections/Contacts";

export const metadata: Metadata = {
  title: "Ремонт квартир и домов под ключ в Симферополе — Владен",
  description:
    "Ремонт квартир и домов под ключ в Симферополе и Крыму. Дизайнерский ремонт, чистовая отделка, строительство. 12 лет опыта, более 200 объектов. Бесплатная консультация: +7 (978) 717-44-47",
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
      "Ремонт квартир, дизайнерская отделка, строительство в Симферополе и Крыму. 12 лет, 200+ объектов. Звоните: +7 (978) 717-44-47",
    url: "https://vladen-crimea.ru",
    images: [{ url: "https://vladen-crimea.ru/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ProjectCase />
      <WhyWe />
      <Calculator />
      <FAQ />
      <Contacts />
      <Partners />
      <Reviews />
    </>
  );
}
