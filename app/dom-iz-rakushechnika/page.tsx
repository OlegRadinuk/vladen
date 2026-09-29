import type { Metadata } from "next";
import HeroEvpatoriya from "@/components/sections/HeroEvpatoriya";
import FeatureCards from "@/components/sections/FeatureCards";
import ProjectCase from "@/components/sections/ProjectCase";
import InfoBlocks from "@/components/sections/InfoBlocks";
import Calculator from "@/components/sections/Calculator";
import WhyWe from "@/components/sections/WhyWe";
import FAQ from "@/components/sections/FAQ";
import Reviews from "@/components/sections/Reviews";
import Contacts from "@/components/sections/Contacts";
import RelatedLinks from "@/components/sections/RelatedLinks";
import MobileCTABar from "@/components/ui/MobileCTABar";
import ScrollCTA from "@/components/ui/ScrollCTA";
import { safeJsonLd } from "@/lib/utils";
import { OBJECTS_PHRASE, PHONE_DISPLAY, YEARS_PHRASE } from "@/lib/company";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  relatedLinksExcept,
  serviceJsonLd,
  SITE_URL,
  typo,
  type FaqItem,
} from "@/lib/evp-landings";

const PATH = "/dom-iz-rakushechnika";
const TITLE = "Дом из ракушечника в Крыму под ключ — Владен";
const DESCRIPTION = `Строительство домов из ракушечника в Крыму: тёплые стены, экологичность, местный материал. Кейсы в Евпатории и Симферополе. Расчёт стоимости бесплатно. ООО «ВЛАДЕН». ${PHONE_DISPLAY}`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "дом из ракушечника",
    "дом из ракушечника крым",
    "дом из ракушечника под ключ",
    "строительство дома из ракушечника",
    "дом из ракушечника евпатория",
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
    q: "Почему в Крыму строят дома из ракушечника?",
    a: "Ракушечник — местный крымский материал. Его не нужно везти издалека, что снижает стоимость строительства. Хорошо держит тепло, устойчив к местному климату. Традиционный материал Крыма с многолетней историей применения.",
  },
  // TODO-5 (Олег): вопрос «В доме из ракушечника не будет холодно зимой?» снят до подтверждения
  // технических характеристик (толщина кладки, утепление, коэффициент теплопроводности). Вернуть с цифрами.
  {
    q: "Сколько стоит дом из ракушечника под ключ?",
    a: "Предчистовая отделка — от 55 000 ₽/м², полная чистовая — от 80 000 ₽/м². На итоговую цену влияют площадь, тип фундамента, этажность и объём отделки. Рассчитайте ориентир в калькуляторе или оставьте заявку на бесплатный выезд замерщика.",
  },
  {
    q: "В каких городах Крыма вы строите?",
    a: `Работаем по всему Крыму. Реализованные объекты из ракушечника — в Евпатории, с. Мирном под Симферополем и в Бахчисарае. Принимаем заказы из других городов — оцените условия по телефону ${PHONE_DISPLAY}.`,
  },
  {
    q: "Какие сроки строительства дома из ракушечника?",
    // TODO-4 (Олег): конкретные сроки строительства — пока общая формулировка.
    a: "Сроки зависят от площади, сложности проекта и типа отделки. Фиксируем в договоре — за просрочку начисляется неустойка.",
  },
  {
    q: "Есть ли у вас реализованные дома из ракушечника?",
    a: "Да. Три объекта: двухэтажный дом 165 м² в Евпатории (сдан декабрь 2025), одноэтажный дом 81 м² в с. Мирном под Симферополем (сдан 2025), дом 112 м² с мансардой в Бахчисарае (сдан 2024). Смотрите портфолио на сайте.",
  },
];

const jsonLd = [
  serviceJsonLd({
    name: "Строительство домов из ракушечника в Крыму",
    path: PATH,
    areaServed: [{ type: "AdministrativeArea", name: "Республика Крым" }],
    priceFromPerM2: 55000,
  }),
  breadcrumbJsonLd([
    { name: "Главная", path: "" },
    { name: "Дом из ракушечника", path: PATH },
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

export default function DomIzRakushechnikaPage() {
  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(ld) }} />
      ))}

      <HeroEvpatoriya
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Дом из ракушечника" }]}
        badge="Строим по всему Крыму"
        h1="Дома из ракушечника в Крыму"
        subtitle="Природный камень ракушка — местный материал, проверенный крымским климатом. Строим по всему Крыму от 55 000 ₽/м²."
        lead="Ракушечник — традиционный строительный материал Крыма. Мы строим дома из природного камня ракушка в Евпатории, Симферополе и по всему полуострову. Три реализованных объекта — в Евпатории, Мирном и Бахчисарае."
        ctaPrimary="Рассчитать стоимость дома из ракушечника"
        ctaSecondary="Смотреть построенные дома"
        ctaSecondaryHref="#projects"
        imageSrc="/cases/keys2-gorizontalnaya.jpg"
        imageAlt="Одноэтажный дом 81 м² из ракушечника в с. Мирное под Симферополем, битумная черепица, сдан 2025"
      />

      <FeatureCards
        accentLabel="Материал"
        heading="Почему ракушечник"
        bg="light"
        cards={[
          {
            icon: (
              <svg {...iconProps}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ),
            title: "Местный материал",
            desc: "Добывается в Крыму — дешевле привозных аналогов, не требует длинной логистики. Доступность снижает стоимость строительства по сравнению с привозным кирпичом.",
          },
          {
            icon: (
              <svg {...iconProps}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ),
            title: "Тёплые стены",
            // TODO-5 (Олег): коэффициент теплопроводности / толщина кладки — не публиковать без подтверждения.
            desc: "Ракушечник хорошо сохраняет тепло и отдаёт его равномерно.",
          },
          {
            icon: (
              <svg {...iconProps}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14zm0 0c2-4 5-7 9-9" />
              </svg>
            ),
            title: "Экологичность",
            desc: "Природный камень без химических добавок. Не выделяет вредных веществ в течение всего срока службы.",
          },
          {
            icon: (
              <svg {...iconProps}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            ),
            title: "Долговечность",
            desc: "Постройки из ракушечника в Крыму стоят десятилетиями. Устойчив к солёному морскому воздуху и перепадам температур.",
          },
        ]}
      />

      {/* TODO-6 (Олег): dom-bahchisaray-112 (ракушечник, 112 м², 2024) вернуть в filterSlugs, когда появятся фото (сейчас cover: null) */}
      <ProjectCase
        filterSlugs={["dom-evpatoriya-165", "dom-mirnoe-81"]}
        initialSlug="dom-evpatoriya-165"
        sectionHeading="Наши реализованные объекты из ракушечника"
        sectionSubtitle="Дома в Евпатории и Мирном — природный камень ракушка."
      />
      <div className="bg-dark pb-16 text-center">
        <ScrollCTA targetId="calculator" label="Рассчитать мой проект" variant="outline" size="md" />
      </div>

      <InfoBlocks
        blocks={[
          {
            heading: "Стоимость дома из ракушечника под ключ",
            rows: [
              { label: "Предчистовая", value: "от 55 000 ₽/м²" },
              { label: "Полная чистовая", value: "от 80 000 ₽/м²" },
            ],
            footnote:
              "Цена зависит от площади, этажности, типа фундамента и объёма отделочных работ. Для точного расчёта — бесплатный выезд.",
            link: { label: "Строительство домов в Евпатории", href: "/evpatoriya/stroitelstvo-domov" },
          },
        ]}
      />

      <Calculator defaultServiceId="house" />

      <WhyWe
        subtitle={`Работаем в Евпатории, Симферополе и по всему Крыму. ${YEARS_PHRASE} опыта, ${OBJECTS_PHRASE} объектов.`}
      />
      <div className="bg-light pb-16 text-center">
        <ScrollCTA targetId="calculator" label="Получить расчёт бесплатно" />
      </div>

      <FAQ items={faqItems.map((it) => ({ q: it.q, a: typo(it.a) }))} />

      <Reviews />

      <Contacts
        heading="Рассчитаем ваш дом из ракушечника"
        subtitle={typo(`Работаем по всему Крыму. Бесплатный выезд замерщика. Звоните ${PHONE_DISPLAY}.`)}
        source="dom-iz-rakushechnika"
        submitLabel="Получить расчёт дома"
      />

      <RelatedLinks links={relatedLinksExcept(PATH)} />

      <div className="h-[68px] md:hidden" />
      <MobileCTABar />
    </>
  );
}
