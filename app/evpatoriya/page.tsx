import type { Metadata } from "next";
import HeroEvpatoriya from "@/components/sections/HeroEvpatoriya";
import ServiceTileHub from "@/components/sections/ServiceTileHub";
import ProjectCase from "@/components/sections/ProjectCase";
import WhyWe from "@/components/sections/WhyWe";
import Calculator from "@/components/sections/Calculator";
import FAQ from "@/components/sections/FAQ";
import Reviews from "@/components/sections/Reviews";
import Contacts from "@/components/sections/Contacts";
import RelatedLinks from "@/components/sections/RelatedLinks";
import MobileCTABar from "@/components/ui/MobileCTABar";
import ScrollCTA from "@/components/ui/ScrollCTA";
import { safeJsonLd } from "@/lib/utils";
import { OBJECTS_DONE, OBJECTS_PHRASE, PHONE_DISPLAY, YEARS_PHRASE } from "@/lib/company";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  relatedLinksExcept,
  serviceJsonLd,
  SITE_URL,
  typo,
  type FaqItem,
} from "@/lib/evp-landings";

const PATH = "/evpatoriya";
const TITLE = "Ремонт и строительство в Евпатории — Владен";
const DESCRIPTION = `Ремонт квартир, домов и строительство под ключ в Евпатории. Работаем в Евпатории и Сакском районе. ООО «ВЛАДЕН» — гарантия, договор. Звоните: ${PHONE_DISPLAY}`;

export const metadata: Metadata = {
  // absolute — чтобы шаблон title из layout не дописал второй «Владен»
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "ремонт и строительство евпатория",
    "строительная компания евпатория",
    "ремонт квартир евпатория",
    "строительство домов евпатория",
    "ремонт под ключ евпатория",
    "ремонт сакский район",
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
    q: "Вы работаете в Евпатории?",
    a: "Да, работаем в Евпатории и Сакском районе. Принимаем объекты на ремонт и строительство. Выезд замерщика — бесплатно.",
  },
  {
    q: "Сколько стоит ремонт квартиры в Евпатории?",
    a: "Эконом — от 17 000 ₽/м², стандарт — от 27 000 ₽/м², премиум — от 37 000 ₽/м². Точную цену назовём после бесплатного выезда замерщика. Стоимость фиксируется в договоре — не меняется в процессе без вашего согласия.",
  },
  {
    q: "Строите дома в Евпатории?",
    a: "Да. Строим дома по индивидуальному проекту из ракушечника и других материалов. Строительство предчистовое — от 55 000 ₽/м². Есть реализованный объект в Евпатории: двухэтажный дом 165 м², сдан в декабре 2025 года.",
  },
  {
    q: "Есть ли у вас реальные проекты в Евпатории?",
    a: "Да. Двухэтажный дом 165 м² по индивидуальному проекту из природного камня ракушка, металлочерепица, декоративная штукатурка. Баня с предбанником, кухня-гостиная 38 м². Сдан в декабре 2025 года.",
  },
  {
    q: "Как начать работу с вами?",
    a: `Позвоните ${PHONE_DISPLAY} или оставьте заявку на сайте. Выедем на замер — бесплатно и без обязательств. После согласования сметы подписываем договор. Обычно от звонка до договора — 2–3 дня.`,
  },
];

const jsonLd = [
  serviceJsonLd({
    name: "Ремонт и строительство в Евпатории",
    path: PATH,
    areaServed: [
      { type: "City", name: "Евпатория" },
      { type: "AdministrativeArea", name: "Сакский район" },
    ],
  }),
  breadcrumbJsonLd([
    { name: "Главная", path: "" },
    { name: "Евпатория", path: PATH },
  ]),
  faqPageJsonLd(faqItems),
];

const iconClass = "w-10 h-10";

export default function EvpatoriyaPage() {
  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      ))}

      <HeroEvpatoriya
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Евпатория" }]}
        badge="Работаем в Евпатории и Сакском районе"
        h1="Ремонт и строительство в Евпатории"
        subtitle={`Работаем в Евпатории и Сакском районе. ${YEARS_PHRASE} опыта, ${OBJECTS_PHRASE} сданных объектов. Цена фиксируется в договоре — без сюрпризов в процессе.`}
        ctaPrimary="Рассчитать стоимость"
        ctaSecondary="Смотреть наши работы"
        ctaSecondaryHref="#projects"
        imageSrc="/cases/1keys-fasad.jpg"
        imageAlt="Фасад двухэтажного дома 165 м² в Евпатории — природный камень ракушка, декоративная штукатурка, металлочерепица"
      />

      {/* Плитка услуг. Тайлы — ссылки на посадочные (перелинковка); кнопка «Рассчитать» ведёт на страницу услуги с калькулятором */}
      <ServiceTileHub
        heading="Что мы делаем в Евпатории"
        tiles={[
          {
            icon: (
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            ),
            title: "Ремонт квартир",
            desc: "Чистовая отделка, электрика, сантехника. Эконом от 17 000 ₽/м².",
            href: "/evpatoriya/remont-kvartir",
            ctaLabel: "Рассчитать",
          },
          {
            icon: (
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            ),
            title: "Ремонт домов",
            desc: "Полный цикл — от черновой до меблировки. Сроки в договоре.",
            href: "/services",
            ctaLabel: "Подробнее",
          },
          {
            icon: (
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            ),
            title: "Строительство домов",
            desc: "Индивидуальный проект, ракушечник и другие материалы. От 55 000 ₽/м².",
            href: "/evpatoriya/stroitelstvo-domov",
            ctaLabel: "Рассчитать",
          },
        ]}
        secondaryCTA={{ label: "Смотреть все услуги →", href: "/services" }}
      />

      <ProjectCase
        filterSlugs={["dom-evpatoriya-165"]}
        initialSlug="dom-evpatoriya-165"
        sectionHeading="Наш объект в Евпатории"
        sectionSubtitle="Двухэтажный дом 165 м² из природного камня ракушка. Сдан в декабре 2025 года."
      />
      <div className="bg-dark pb-16 text-center">
        <ScrollCTA targetId="calculator" label="Рассчитать мой проект" variant="outline" size="md" />
      </div>

      <WhyWe
        subtitle={`Работаем в Евпатории и Сакском районе. ${YEARS_PHRASE} работы в Крыму. Более ${OBJECTS_DONE} реализованных объектов. Репутация строится годами.`}
      />
      <div className="bg-light pb-16 text-center">
        <ScrollCTA targetId="calculator" label="Получить расчёт бесплатно" />
      </div>

      <Calculator defaultServiceId="repair" />

      <FAQ items={faqItems.map((it) => ({ q: it.q, a: typo(it.a) }))} />

      <Reviews />

      <Contacts
        heading="Обсудим ваш проект в Евпатории"
        subtitle={typo("Оставьте заявку — перезвоним в течение 30 минут. Выезд замерщика бесплатно.")}
        source="evpatoriya-hub"
        submitLabel="Получить расчёт"
      />

      <RelatedLinks links={relatedLinksExcept(PATH)} />

      {/* Спейсер под мобильный sticky-бар — как на главной */}
      <div className="h-[68px] md:hidden" />
      <MobileCTABar />
    </>
  );
}
