import type { Metadata } from "next";
import HeroEvpatoriya from "@/components/sections/HeroEvpatoriya";
import Calculator from "@/components/sections/Calculator";
import InfoBlocks from "@/components/sections/InfoBlocks";
import BukletSlider from "@/components/sections/BukletSlider";
import FeatureCards from "@/components/sections/FeatureCards";
import ProjectCase from "@/components/sections/ProjectCase";
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

const PATH = "/evpatoriya/remont-kvartir";
const TITLE = "Ремонт квартир в Евпатории под ключ — цены | Владен";
const DESCRIPTION =
  "Ремонт квартир в Евпатории под ключ: эконом от 17 000 ₽/м², стандарт от 27 000 ₽/м². Отделка, дизайн, сроки по договору. Бесплатный замер. ООО «ВЛАДЕН».";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "ремонт квартир евпатория",
    "отделка евпатория",
    "ремонт под ключ евпатория",
    "ремонт квартиры евпатория цена",
    "отделка квартиры евпатория",
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
    q: "Сколько стоит ремонт квартиры в Евпатории под ключ?",
    a: "Эконом — от 17 000 ₽/м², стандарт — от 27 000 ₽/м², премиум — от 37 000 ₽/м². На цену влияют площадь, состояние квартиры и класс отделки. Точную стоимость назовём после бесплатного выезда замерщика.",
  },
  {
    q: "Что входит в ремонт под ключ в Евпатории?",
    a: "Полный цикл: демонтаж, выравнивание стен и полов, замена электрики и сантехники, укладка плитки, ламината или кварцвинила, монтаж натяжных потолков, покраска, установка дверей. Помогаем с закупкой материалов со скидками до 15%.",
  },
  {
    q: "Сколько времени занимает ремонт квартиры?",
    a: "Однокомнатная 40 м² — 6–8 недель, двухкомнатная 65 м² — 8–12 недель. На сроки влияет объём работ и поставки материалов. Сроки фиксируем в договоре: за каждый день просрочки — неустойка.",
  },
  {
    q: "Работаете ли вы по официальному договору?",
    a: "Да. Заключаем договор подряда с фиксированной сметой, графиком работ и гарантией. Оплата поэтапно — вы платите только за выполненные работы после приёмки каждого этапа.",
  },
  {
    q: "Как контролировать ремонт, если я живу не в Крыму?",
    a: `Принимаем заявки дистанционно. Позвоните ${PHONE_DISPLAY} или напишите в чат-ассистента «Влад» на сайте — ответим на вопросы без вашего визита. Для удалённых заказчиков рекомендуем авторский надзор — выезды специалиста с отчётом по каждому этапу.`,
  },
  {
    q: "Нужно ли покупать материалы самому?",
    a: "Не обязательно. Возьмём закупку на себя — у нас договоры с поставщиками и скидки до 15% от рыночной цены. Если хотите выбрать материалы сами — поможем с выбором и проверим качество.",
  },
  {
    q: "Делаете ли бесплатный замер в Евпатории?",
    a: "Да. Выезд замерщика бесплатно и без обязательств. После замера составим детальную смету. Обычно от звонка до подписания договора — 2–3 дня.",
  },
];

const jsonLd = [
  serviceJsonLd({
    name: "Ремонт квартир в Евпатории",
    path: PATH,
    areaServed: [{ type: "City", name: "Евпатория" }],
    priceFromPerM2: 17000,
  }),
  breadcrumbJsonLd([
    { name: "Главная", path: "" },
    { name: "Евпатория", path: "/evpatoriya" },
    { name: "Ремонт квартир", path: PATH },
  ]),
  faqPageJsonLd(faqItems),
];

const iconProps = {
  className: "w-8 h-8",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

export default function RemontKvartirEvpatoriyaPage() {
  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      ))}

      <HeroEvpatoriya
        minH="min-h-[580px]"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Евпатория", href: "/evpatoriya" },
          { label: "Ремонт квартир" },
        ]}
        badge="Работаем в Евпатории и Сакском районе"
        h1="Ремонт квартир в Евпатории под ключ"
        subtitle="от 17 000 ₽/м² — цена фиксируется в договоре. Сроки — тоже. За каждый день просрочки — неустойка."
        lead="Принимаем квартиры в Евпатории под ремонт — эконом, стандарт и дизайнерский. Работаем в Евпатории и Сакском районе. Бесплатный выезд замерщика, детальная смета, официальный договор подряда с фиксированной ценой."
        ctaPrimary="Рассчитать стоимость ремонта"
        ctaSecondary="Посмотреть наши работы"
        ctaSecondaryHref="#projects"
        priceTable={[
          { label: "Эконом", price: "от 17 000 ₽/м²" },
          { label: "Стандарт", price: "от 27 000 ₽/м²" },
          { label: "Премиум", price: "от 37 000 ₽/м²" },
        ]}
      />

      {/* Калькулятор сразу после hero — по conversion plan */}
      <Calculator
        defaultServiceId="repair"
        heading="Узнайте стоимость ремонта за 2 минуты"
        subtitle="Выберите тип работ и площадь — получите ориентир без звонка."
      />

      <InfoBlocks
        blocks={[
          {
            heading: "Стоимость ремонта квартиры в Евпатории",
            rows: [
              { label: "Эконом", value: "от 17 000 ₽/м²", note: "Черновая и чистовая отделка стен, полов, потолков" },
              { label: "Стандарт", value: "от 27 000 ₽/м²", note: "То же + электрика, сантехника, инженерные системы" },
              { label: "Премиум", value: "от 37 000 ₽/м²", note: "Полный цикл по дизайн-проекту, авторский надзор" },
            ],
            link: { label: "Полный прайс на услуги", href: "/services" },
          },
          {
            heading: "Что входит в ремонт под ключ",
            bullets: [
              "Черновая подготовка: демонтаж, выравнивание стен, стяжка пола",
              "Инженерия: замена электропроводки и сантехники с нуля",
              "Чистовая отделка: плитка, ламинат, кварцвинил, покраска, натяжные потолки",
              "Координация поставок материалов — у нас скидки до 15% от рыночной цены",
              "Авторский надзор: выезды на каждом ключевом этапе, отчёт по результатам",
            ],
          },
          {
            heading: "Сроки ремонта",
            bullets: [
              "Однокомнатная 40 м² под ключ — 6–8 недель",
              "Двухкомнатная 65 м² — 8–12 недель",
              "На сроки влияет: объём работ, время сушки стяжки, поставки материалов",
              "Сроки фиксируем в договоре. За просрочку — неустойка.",
            ],
          },
        ]}
      />

      <div id="lookbook">
        <BukletSlider />
      </div>

      <FeatureCards
        accentLabel="Для удалённых заказчиков"
        heading="Ремонт квартиры в Евпатории, даже если вы не в Крыму"
        bg="dark"
        cards={[
          {
            icon: (
              <svg {...iconProps}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            ),
            title: "Звонок или чат без визита",
            desc: `Принимаем заявки дистанционно. Позвоните ${PHONE_DISPLAY} или напишите в чат-ассистента «Влад» на сайте. Ответим на вопросы по цене и срокам без вашего приезда.`,
          },
          {
            icon: (
              <svg {...iconProps}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ),
            title: "Авторский надзор с фотофиксацией",
            // TODO-1 (Олег): авторский надзор входит в стандартный договор ремонта или это отдельная услуга? Уточнить формулировку.
            desc: "Для удалённых заказчиков подключаем авторский надзор — выезды на каждом ключевом этапе с фотоотчётом.",
          },
          {
            icon: (
              <svg {...iconProps}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            ),
            title: "Договор с фиксированной ценой",
            // TODO-2 (Олег): можно ли подписать договор без визита в Симферополь (скан / ЭДО / курьер)? Если да — дописать в карточку.
            desc: "Смету и договор согласовываем до начала работ. Цена не меняется без вашего согласия.",
          },
        ]}
      />

      <ProjectCase
        filterSlugs={["remont-doma-pod-klyuch-78", "kvartira-zhk-saga", "dom-evpatoriya-165"]}
        initialSlug="remont-doma-pod-klyuch-78"
        sectionHeading="Наши работы"
        sectionSubtitle="Реальные объекты в Крыму — ремонт под ключ."
      />
      <div className="bg-dark pb-16 text-center">
        <ScrollCTA targetId="calculator" label="Рассчитать мой проект" variant="outline" size="md" />
      </div>

      <WhyWe
        subtitle={`Работаем в Евпатории и Сакском районе. ${YEARS_PHRASE} в Крыму. Официальный договор, гарантия 2 года на отделку.`}
      />
      <div className="bg-light pb-16 text-center">
        <ScrollCTA targetId="calculator" label="Получить расчёт бесплатно" />
      </div>

      <FAQ items={faqItems.map((it) => ({ q: it.q, a: typo(it.a) }))} />

      <Reviews />

      <Contacts
        heading="Обсудим ваш ремонт в Евпатории"
        subtitle={typo("Оставьте заявку — перезвоним в течение 30 минут и договоримся о бесплатном выезде замерщика.")}
        source="evp-remont-kvartir"
        submitLabel="Записаться на замер"
      />

      <RelatedLinks links={relatedLinksExcept(PATH)} />

      <div className="h-[68px] md:hidden" />
      <MobileCTABar />
    </>
  );
}
