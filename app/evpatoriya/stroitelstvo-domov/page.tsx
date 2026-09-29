import type { Metadata } from "next";
import HeroEvpatoriya from "@/components/sections/HeroEvpatoriya";
import Calculator from "@/components/sections/Calculator";
import ProjectCase from "@/components/sections/ProjectCase";
import InfoBlocks from "@/components/sections/InfoBlocks";
import BuildStages from "@/components/sections/BuildStages";
import WhyWe from "@/components/sections/WhyWe";
import FAQ from "@/components/sections/FAQ";
import Reviews from "@/components/sections/Reviews";
import Contacts from "@/components/sections/Contacts";
import RelatedLinks from "@/components/sections/RelatedLinks";
import MobileCTABar from "@/components/ui/MobileCTABar";
import ScrollCTA from "@/components/ui/ScrollCTA";
import { safeJsonLd } from "@/lib/utils";
import { PHONE_DISPLAY, YEARS_PHRASE } from "@/lib/company";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  relatedLinksExcept,
  serviceJsonLd,
  SITE_URL,
  typo,
  type FaqItem,
} from "@/lib/evp-landings";

const PATH = "/evpatoriya/stroitelstvo-domov";
const TITLE = "Строительство домов в Евпатории под ключ — Владен";
const DESCRIPTION = `Строительство домов под ключ в Евпатории: предчистовая от 55 000 ₽/м², дома из ракушечника, индивидуальный проект. Реализованный кейс 165 м² в Евпатории. Звоните: ${PHONE_DISPLAY}`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "строительство домов евпатория",
    "строительная компания евпатория",
    "строительство дома под ключ евпатория",
    "дом из ракушечника евпатория",
    "ремонт домов евпатория",
  ],
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
  },
};

const faqItems: FaqItem[] = [
  {
    q: "Сколько стоит строительство дома в Евпатории под ключ?",
    a: "Предчистовая отделка — от 55 000 ₽/м², полная чистовая — от 80 000 ₽/м². На итоговую цену влияет тип фундамента, материал стен, площадь и сложность проекта. Рассчитайте ориентир в калькуляторе или оставьте заявку на бесплатный выезд.",
  },
  {
    q: "Из каких материалов вы строите дома в Евпатории?",
    a: "В основном — ракушечник. Это местный крымский материал, проверенный климатом полуострова. Также строим из газобетона, кирпича и монолитного бетона — подбираем материал под ваш бюджет и задачи.",
  },
  {
    q: "Нужен ли проект для строительства дома?",
    a: "Да. Строить без проекта — значит рисковать безопасностью и деньгами. Мы делаем полный пакет: архитектурный проект, конструктивные решения, инженерные сети. Помогаем получить разрешение на строительство и ввод в эксплуатацию.",
  },
  {
    q: "Какие сроки строительства?",
    // TODO-4 (Олег): типовые сроки строительства по площади — пока общая формулировка без цифр.
    a: "Сроки зависят от площади и сложности проекта. Фиксируем в договоре — за каждый день просрочки начисляется неустойка.",
  },
  {
    q: "Строите ли вы в Сакском районе?",
    a: "Да, работаем в Евпатории и Сакском районе.",
  },
  {
    q: "Какая гарантия на строительство?",
    a: "Гарантия на конструктивные работы — фундамент, стены, кровля — 5 лет. На отделочные работы — 2 года. Все условия прописаны в договоре.",
  },
];

const jsonLd = [
  serviceJsonLd({
    name: "Строительство домов в Евпатории",
    path: PATH,
    areaServed: [{ type: "City", name: "Евпатория" }],
    priceFromPerM2: 55000,
  }),
  breadcrumbJsonLd([
    { name: "Главная", path: "" },
    { name: "Евпатория", path: "/evpatoriya" },
    { name: "Строительство домов", path: PATH },
  ]),
  faqPageJsonLd(faqItems),
];

export default function StroitelstvoDomovEvpatoriyaPage() {
  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      ))}

      <HeroEvpatoriya
        minH="min-h-[620px]"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Евпатория", href: "/evpatoriya" },
          { label: "Строительство домов" },
        ]}
        badge="Работаем в Евпатории и Сакском районе"
        h1="Строительство домов в Евпатории под ключ"
        subtitle="от 55 000 ₽/м² — дома из ракушечника и других материалов. Индивидуальный расчёт фундамента под ваш участок. Договор с фиксированной ценой."
        lead="Строим дома в Евпатории и Сакском районе по индивидуальному проекту. Ракушечник — местный материал, проверенный крымским климатом. Реализованный объект: двухэтажный дом 165 м², сдан в декабре 2025 года."
        ctaPrimary="Получить расчёт стоимости дома"
        ctaSecondary="Смотреть построенный дом в Евпатории"
        ctaSecondaryHref="#projects"
        imageSrc="/cases/1keys-fasad.jpg"
        imageAlt="Двухэтажный дом 165 м² в Евпатории — фасад из природного камня ракушка, декоративная штукатурка, металлочерепица, сдан 2025"
        imageCaption="165 м² · Евпатория · 2025"
      />

      <Calculator defaultServiceId="house" />

      <ProjectCase
        // TODO-6 (Олег): dom-bahchisaray-112 вернуть, когда появятся фото (сейчас cover: null)
        filterSlugs={["dom-evpatoriya-165", "dom-mirnoe-81", "poselok-krymskaya-palitra"]}
        initialSlug="dom-evpatoriya-165"
        sectionHeading="Построенные объекты в Евпатории и Крыму"
        sectionSubtitle="Каждый дом — индивидуальный проект. Реальные объекты, реальные сроки."
      />
      <div className="bg-dark pb-16 text-center">
        <ScrollCTA targetId="calculator" label="Рассчитать мой проект" variant="outline" size="md" />
      </div>

      <InfoBlocks
        blocks={[
          {
            heading: "Реализованный объект в Евпатории",
            text: "Двухэтажный дом 165 м² в Евпатории по индивидуальному проекту. Стены из природного камня ракушка, кровля из металлочерепицы, фасад — декоративная штукатурка. На первом этаже — баня с предбанником (5,6 + 4 м²). На втором — кухня-гостиная 38 м², две спальни и детская. Ленточный фундамент рассчитывался под конкретный участок. Сдан в декабре 2025 года.",
            link: { label: "Смотреть проект", href: "/projects/dom-evpatoriya-165" },
          },
          {
            heading: "Из чего строим дома в Евпатории",
            text: "Основной материал в Евпатории и Крыму — ракушечник. Добывается в Крыму, хорошо держит тепло при крымском климате, долговечен. Строим также из газобетона, кирпича и монолитного бетона — подбираем материал под бюджет и требования к проекту.",
            link: { label: "Подробнее о ракушечнике", href: "/dom-iz-rakushechnika" },
          },
          {
            heading: "Стоимость строительства дома в Евпатории",
            rows: [
              { label: "Предчистовая отделка", value: "от 55 000 ₽/м²" },
              { label: "Полная чистовая", value: "от 80 000 ₽/м²" },
            ],
            footnote:
              "Точная стоимость зависит от площади, типа фундамента, материалов и сложности проекта. Рассчитайте ориентир в калькуляторе или оставьте заявку на бесплатный выезд.",
          },
        ]}
      />

      <BuildStages
        heading="Этапы строительства под ключ"
        stages={[
          { num: "01", title: "Проект и согласования", desc: "Архитектурный и конструктивный проект, получение разрешения на строительство." },
          { num: "02", title: "Фундамент", desc: "Ленточный, плитный или свайный под ваш участок и грунт. Индивидуальный расчёт." },
          { num: "03", title: "Стены и кровля", desc: "Кладка из ракушечника или другого материала, монтаж стропильной системы и кровли." },
          { num: "04", title: "Инженерные сети", desc: "Электрика, водоснабжение, канализация, отопление с нуля." },
          { num: "05", title: "Отделка и сдача", desc: "Предчистовая или полная чистовая в зависимости от договора." },
        ]}
      />

      <WhyWe
        subtitle={`Работаем в Евпатории и Сакском районе. ${YEARS_PHRASE} опыта. Реализованный объект: дом 165 м² в Евпатории, сдан 2025.`}
      />
      <div className="bg-light pb-16 text-center">
        <ScrollCTA targetId="calculator" label="Получить расчёт бесплатно" />
      </div>

      <FAQ items={faqItems.map((it) => ({ q: it.q, a: typo(it.a) }))} />

      <Reviews />

      <Contacts
        heading="Рассчитаем стоимость вашего дома в Евпатории"
        subtitle={typo(`Пришлём детальную смету после бесплатного выезда. Звоните ${PHONE_DISPLAY} или оставьте заявку.`)}
        source="evp-stroitelstvo"
        submitLabel="Получить расчёт дома"
      />

      <RelatedLinks links={relatedLinksExcept(PATH)} />

      <div className="h-[68px] md:hidden" />
      <MobileCTABar />
    </>
  );
}
