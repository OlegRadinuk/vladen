import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import ProjectCase from "@/components/sections/ProjectCase";
import WhyWe from "@/components/sections/WhyWe";
import Calculator from "@/components/sections/Calculator";
import Contacts from "@/components/sections/Contacts";

export const metadata: Metadata = {
  title: "Владен — Строительная компания в Крыму",
  description:
    "Строительство домов, ремонт и отделка в Крыму. Более 200 объектов. Гарантия качества. Звоните: +7 (800) 123-45-67",
  openGraph: {
    title: "Владен — Строительная компания в Крыму",
    description: "Строительство домов, ремонт и отделка в Крыму.",
    url: "https://vladen-crimea.ru",
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
      <Contacts />
    </>
  );
}
