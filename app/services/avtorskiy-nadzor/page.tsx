import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import AnimateOnView from "@/components/ui/AnimateOnView";
import ProjectGallery from "@/components/sections/ProjectGallery";
import Contacts from "@/components/sections/Contacts";
import type { GalleryGroup } from "@/lib/projects";

const BASE_URL = "https://vladen-crimea.ru";

export const metadata: Metadata = {
  title: "Авторский надзор в Крыму — контроль ремонта по проекту | Владен",
  description:
    "Авторский надзор ООО «ВЛАДЕН»: выезды на объект, фотофиксация, отчёт по каждой комнате с пометками поверх чертежа, повторная проверка исправлений. Реальные фото со стройки в ЖК «Сага».",
  keywords: [
    "авторский надзор Крым",
    "авторский надзор Симферополь",
    "контроль ремонта по дизайн-проекту",
    "технадзор ремонта квартиры Крым",
    "проверка электрики по проекту",
    "отчёт авторского надзора",
    "надзор за ремонтом Симферополь",
  ],
  alternates: { canonical: `${BASE_URL}/services/avtorskiy-nadzor` },
  openGraph: {
    title: "Авторский надзор в Крыму — контроль ремонта по проекту | Владен",
    description:
      "Как устроен авторский надзор: выезд, фотофиксация, отчёт по комнате с пометками поверх развёртки стены, контроль исправлений. Реальные фото с объекта.",
    url: `${BASE_URL}/services/avtorskiy-nadzor`,
    images: [`${BASE_URL}/projects/saga/nadzor/prihozhaya-shchit.webp`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Авторский надзор в Крыму — Владен",
    description:
      "Выезд, фотофиксация, отчёт с пометками поверх чертежа, контроль исправлений. Реальные фото со стройки.",
    images: [`${BASE_URL}/projects/saga/nadzor/prihozhaya-shchit.webp`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Услуги", item: `${BASE_URL}/services` },
        {
          "@type": "ListItem",
          position: 3,
          name: "Авторский надзор",
          item: `${BASE_URL}/services/avtorskiy-nadzor`,
        },
      ],
    },
    {
      "@type": "Service",
      name: "Авторский надзор за ремонтом и строительством",
      serviceType: "Авторский надзор",
      areaServed: { "@type": "Place", name: "Республика Крым" },
      provider: {
        "@type": "Organization",
        name: "ООО «ВЛАДЕН»",
        url: BASE_URL,
      },
      description:
        "Регулярные выезды на объект, фотофиксация, письменный отчёт по каждому помещению с пометками поверх рабочих чертежей и контроль исправлений.",
    },
  ],
};

const img = (file: string, alt: string, caption: string) => ({
  src: `/projects/saga/nadzor/${file}.webp`,
  alt,
  caption,
});

const reportGroups: GalleryGroup[] = [
  {
    title: "Электрика и слаботочка",
    images: [
      img("prihozhaya-shchit", "Проверка сборки электрощита и слаботочки на объекте", "Электрощит и слаботочка: проверяем сборку и маркировку линий"),
      img("prihozhaya-razvertka", "Развёртка стены прихожей с пометками по выводам электрики", "Прихожая: выводы под домофон, видеокамеру и подсветку зоны обуви"),
      img("prihozhaya-proem", "Проём в прихожей с кабельными трассами до закрытия ГКЛ", "Кабельные трассы — фиксируем до того, как стену закроют"),
      img("kuhnya-razvertka", "Развёртка кухни-гостиной с проверенными привязками техники", "Кухня-гостиная: сверяем привязки вытяжки, посудомойки и техники"),
      img("kuhnya-rozetka-smeshchenie", "Стена кухни с отметками смещения розетки", "Розетка варочной панели смещена на 5 см — на монтаж не влияет"),
      img("kuhnya-shtroby", "Штробы и выводы под встроенную технику на кухне", "Штробы и выводы под встроенную технику"),
      img("detskaya-razvertka", "Развёртка стены детской комнаты с привязками розеток", "Детская: привязки розеток и выводов на развёртке стены"),
      img("detskaya-otklonenie", "Чертёж детской с отметкой отклонения от проектных размеров", "Отклонение от проектных размеров зафиксировано и признано некритичным"),
      img("detskaya-razvodka", "Разводка труб и электрики в детской до отделки", "Разводка до штукатурки — момент, когда ещё можно всё поправить"),
      img("spalnya-arka-chertezh", "Чертёж арочной ниши в спальне с осью и привязками", "Спальня: ось арочной ниши и привязки бра на чертеже"),
      img("spalnya-rozetki-os", "Чертёж спальни с пометкой о расстоянии между розетками", "Между розетками 2120 вместо 2170 — просим выровнять по оси"),
      img("spalnya-pereproverit-os", "Фото стены спальни с разметкой оси и розеток", "Тот же узел на объекте: перепроверяем ось и расстояние по факту"),
      img("holl-razvertka-shtroby", "Развёртка холла с отметкой готовых штроб", "Холл: штробы сделаны, провода ещё не заведены"),
      img("holl-kladovka-chertezh", "Чертёж холла с переносом линий в кладовую", "Слишком много линий по одной стене — часть переносим в кладовую"),
      img("holl-router-kladovka", "Проём в холле с решением по переносу роутера", "Дублирующий роутер перенесли в кладовую под лестницей"),
      img("holl-proem-truby", "Трубы и кабель-каналы в проёме холла", "Инженерия в проёме — проверяем до закрытия стен"),
      img("vanna-vyvody-provodov", "Стена ванной с пометками по выводам проводов", "Ванная: отмечаем выводы, которые нужно допроверить"),
      img("vanna-nisha-podsvetka", "Ниша над ванной с выводами под контурную подсветку", "Выводы под контурную подсветку ниши и цоколя ванны"),
    ],
  },
  {
    title: "Сантехника",
    images: [
      img("vanna-kollektor", "Коллектор и разводка водоснабжения в технической нише", "Коллектор и разводка водоснабжения в технической нише"),
      img("santehnika-privyazka-unitaza", "Замер привязки унитаза рулеткой на объекте", "Замер по факту: привязка унитаза — 1150 мм от левой стены"),
      img("sanuzel-regulyator", "Простенок санузла с отметкой положения регулятора", "Регулятор сдвигаем по центру простенка"),
      img("sanuzel-dvernaya-korobka", "Фото санузла с учётом будущей дверной коробки", "Учитываем дверную коробку 10 см — иначе оборудование встанет криво"),
      img("sanuzel-razvertka", "Развёртка стен санузла с пометками надзора", "Развёртка санузла с пометками по привязкам"),
    ],
  },
  {
    title: "Отопление",
    images: [
      img("otoplenie-radiator", "Радиатор отопления, выведенный по центру окна", "Радиатор по центру окна, 90 см от чистого пола"),
      img("otoplenie-konvektor", "Конвектор в полу кухни-гостиной", "Конвектор в полу установлен по проектной привязке"),
    ],
  },
  {
    title: "Геометрия и проёмы",
    images: [
      img("lestnica-privyazka", "Простенок у лестницы с отметкой привязки оборудования", "Доуточняем привязку по простенку у лестницы"),
      img("lestnica-proem", "Проём в кладовую у лестницы с указанными размерами", "Проём в кладовую: 700 × 2170, плечо наращиваем на 5 см"),
    ],
  },
];

const problems = [
  {
    title: "Розетка окажется за холодильником",
    text: "На бумаге всё сходилось, а на стене вывод ушёл на 15 см — и техника уже не встаёт. Это ловится за одну проверку до штукатурки.",
  },
  {
    title: "Подсветку нечем запитать",
    text: "Контурная подсветка ниши и цоколя требует выводов, которых нет в стандартной разводке. После отделки добавить их нельзя.",
  },
  {
    title: "Дверная коробка съедает 10 см",
    text: "Оборудование привязали к «грязной» стене, забыв про пирог плитки и коробку. По чистовой всё смещается и выглядит криво.",
  },
  {
    title: "Каждый решает по-своему",
    text: "Без надзора бригада принимает десятки мелких решений самостоятельно. Каждое по отдельности мелочь, вместе — другой интерьер.",
  },
];

const steps = [
  {
    title: "Выезд на объект",
    text: "Приезжаем на ключевых этапах: разводка инженерии, штробы, стяжка, монтаж перегородок, подготовка под чистовую.",
  },
  {
    title: "Фотофиксация",
    text: "Снимаем каждый узел с рулеткой и привязками. Фото — доказательство того, как объект выглядел в конкретный день.",
  },
  {
    title: "Отчёт по комнате",
    text: "Пометки наносим прямо поверх развёртки стены и фото: что совпало с проектом, что поправить и до какого размера.",
  },
  {
    title: "Контроль исправлений",
    text: "Следующий выезд начинается с прошлых замечаний. Пока по пункту не стоит «исправлено» — он не закрыт.",
  },
];

const checks = [
  "Электрика: высоты и привязки розеток, выключателей, выводов под технику, группы света",
  "Слаботочка: интернет, домофон, видеокамеры, выводы под управление шторами",
  "Сантехника: привязки унитаза, смесителей, трапа, душевых леек по чистовым размерам",
  "Отопление: радиаторы по центрам окон, конвекторы в полу, контуры тёплого пола",
  "Геометрия: размеры проёмов, простенков, ниш и арок с учётом чистовой отделки",
  "Материалы: соответствие спецификации проекта — плитка, инженерная доска, ступени",
];

export default function AvtorskiyNadzorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="bg-dark pt-28 sm:pt-32 pb-14 sm:pb-20">
        <Container>
          <nav aria-label="Хлебные крошки" className="mb-6 text-xs sm:text-sm text-text-muted">
            <Link href="/" className="inline-block py-1 hover:text-accent transition-colors">
              Главная
            </Link>
            <span className="mx-2 text-white/20">/</span>
            <Link href="/services" className="inline-block py-1 hover:text-accent transition-colors">
              Услуги
            </Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-text-dark">Авторский надзор</span>
          </nav>

          <p className="text-accent font-oswald text-xs sm:text-sm tracking-widest uppercase mb-3">
            Услуга
          </p>
          <h1 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Авторский надзор
          </h1>
          <p className="text-text-dark text-base sm:text-lg max-w-3xl leading-relaxed">
            Проект работает только тогда, когда его выполняют по чертежу. Авторский надзор — это
            регулярные выезды на объект, фотофиксация и письменный отчёт по каждому помещению:
            что совпало с проектом, что нужно поправить и до какого размера. Ниже — настоящие
            страницы отчёта с нашего объекта в ЖК «Сага».
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 sm:mt-10 max-w-2xl">
            {[
              { v: "7", l: "Помещений под контролем" },
              { v: "27", l: "Кадров в отчёте" },
              { v: "4", l: "Направления проверки" },
            ].map((s) => (
              <div
                key={s.l}
                className="text-center px-2 py-3 sm:p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="font-oswald text-lg sm:text-2xl font-bold text-accent mb-0.5 leading-tight">
                  {s.v}
                </div>
                <div className="text-text-muted text-[11px] sm:text-xs leading-tight">{s.l}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Что идёт не так без надзора */}
      <div className="bg-light py-16 sm:py-20">
        <Container>
          <h2 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-text-light mb-3">
            Что идёт не так без надзора
          </h2>
          <p className="text-text-muted text-sm sm:text-base max-w-2xl mb-8 sm:mb-12">
            Все эти ошибки стоят копейки, пока стена открыта, и дорого — после чистовой отделки.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {problems.map((p, i) => (
              <AnimateOnView key={p.title} delay={i * 0.06}>
                <div className="bg-white rounded-lg p-6 sm:p-8 h-full border-l-2 border-accent">
                  <h3 className="font-oswald text-base sm:text-lg font-semibold text-text-light mb-2">
                    {p.title}
                  </h3>
                  <p className="text-text-muted text-sm sm:text-base leading-relaxed">{p.text}</p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </Container>
      </div>

      {/* Как это работает */}
      <div className="bg-white py-16 sm:py-20">
        <Container>
          <h2 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-text-light mb-8 sm:mb-12">
            Как это работает
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((s, i) => (
              <AnimateOnView key={s.title} delay={i * 0.06}>
                <div className="h-full">
                  <span className="font-oswald text-4xl sm:text-5xl font-bold text-accent/20 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-oswald text-base sm:text-lg font-semibold text-text-light mt-2 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">{s.text}</p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </Container>
      </div>

      {/* Что проверяем */}
      <div className="bg-light py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-start">
            <AnimateOnView>
              <h2 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-text-light mb-4 sm:mb-6">
                Что проверяем
              </h2>
              <ul className="space-y-3">
                {checks.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-text-muted text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimateOnView>

            <AnimateOnView delay={0.1}>
              <div className="bg-white rounded-lg p-6 sm:p-8">
                <h3 className="font-oswald text-lg sm:text-xl font-semibold text-text-light mb-4">
                  Что остаётся у заказчика
                </h3>
                <ul className="space-y-3 text-text-muted text-sm sm:text-base">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[9px] shrink-0" />
                    Отчёт по каждой комнате с фото и пометками поверх чертежа
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[9px] shrink-0" />
                    Фотофиксация всех инженерных трасс до закрытия стен — понадобится через годы,
                    когда будете сверлить
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[9px] shrink-0" />
                    Список замечаний со статусом: что исправлено, что принято как есть и почему
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[9px] shrink-0" />
                    Готовый интерьер, который совпадает с визуализацией, а не «примерно похож»
                  </li>
                </ul>
              </div>
            </AnimateOnView>
          </div>
        </Container>
      </div>

      {/* Реальный отчёт */}
      <ProjectGallery
        groups={reportGroups}
        fit="contain"
        heading="Отчёт с объекта: ЖК «Сага», Крым"
        subheading="27 страниц отчёта авторского надзора по двухуровневой квартире. Нажмите на кадр, чтобы рассмотреть пометки."
      />

      {/* Ссылка на кейс */}
      <div className="bg-light py-16 sm:py-20">
        <Container>
          <div className="rounded-lg bg-white p-6 sm:p-10">
            <p className="text-accent font-oswald text-xs sm:text-sm tracking-widest uppercase mb-2">
              Объект целиком
            </p>
            <h2 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-text-light mb-4">
              Двухуровневая квартира в ЖК «Сага»
            </h2>
            <p className="text-text-muted text-sm sm:text-base max-w-2xl mb-6">
              Тот же объект от начала до конца: планировочное решение, 36 видов визуализации,
              рабочие чертежи, инженерия и чистовая отделка. Сдан в 2026 году.
            </p>
            <Link
              href="/projects/kvartira-zhk-saga"
              className="inline-flex items-center gap-2 font-oswald font-medium tracking-wide rounded bg-accent text-white px-6 py-3 text-sm sm:text-base hover:bg-amber-600 transition-colors"
            >
              Смотреть проект
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Container>
      </div>

      <Contacts />
    </>
  );
}
