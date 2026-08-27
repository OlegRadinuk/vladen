import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import AnimateOnView from "@/components/ui/AnimateOnView";
import YandexReviews from "@/components/ui/YandexReviews";
import Contacts from "@/components/sections/Contacts";
import TeamSection from "@/components/sections/TeamSection";
import { FOUNDED_YEAR, YEARS_PHRASE, OBJECTS_DONE, OBJECTS_PHRASE } from "@/lib/company";

export const metadata: Metadata = {
  title: "О компании Владен — ремонт и строительство в Крыму с 2014 года",
  description:
    `ООО «ВЛАДЕН» — компания по ремонту квартир и строительству с ${FOUNDED_YEAR} года. Собственная бригада отделочников и строителей, ${OBJECTS_PHRASE} объектов в Крыму и Краснодарском крае, официальный договор.`,
  keywords: [
    "компания по ремонту квартир Симферополь",
    "отзывы о ремонте квартир Симферополь",
    "надёжная компания ремонт Крым",
    "ООО Владен Симферополь",
    "ремонтная компания Симферополь официально",
    "строительная компания Симферополь отзывы",
  ],
  alternates: { canonical: "https://vladen-crimea.ru/about" },
  openGraph: {
    title: "О компании Владен | Ремонт и строительство в Крыму",
    description:
      `ООО «ВЛАДЕН» — ремонт квартир и строительство в Симферополе с ${FOUNDED_YEAR} года. ${YEARS_PHRASE}, ${OBJECTS_PHRASE} объектов, собственная бригада.`,
    url: "https://vladen-crimea.ru/about",
  },
  twitter: {
    card: "summary",
    title: "О компании Владен — ремонт и строительство в Крыму",
    description: `ООО «ВЛАДЕН» с ${FOUNDED_YEAR} года. ${OBJECTS_PHRASE} объектов, собственная бригада, официальный договор.`,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: "https://vladen-crimea.ru" },
    { "@type": "ListItem", position: 2, name: "О компании", item: "https://vladen-crimea.ru/about" },
  ],
};

const milestones = [
  { year: "2014", event: "Основание компании в Адлере. Начало с посёлка коттеджей в Адлерском районе" },
  { year: "2016", event: "Первый крупный коммерческий проект. Выход на рынок Ялты и Севастополя" },
  { year: "2018", event: "50-й реализованный объект. Формирование собственной бригады отделочников" },
  { year: "2020", event: "Запуск отдела дизайна интерьеров. Расширение в Евпаторию и Керчь" },
  { year: "2022", event: "150-й объект. Начало работы с коммерческой недвижимостью" },
  { year: "2024", event: "Более 300 реализованных проектов. Ребрендинг и перезапуск компании" },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero */}
      <div className="bg-dark pt-32 pb-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-oswald text-4xl md:text-6xl font-bold text-white mb-6">
              О компании
            </h1>
            <p className="text-text-dark text-lg leading-relaxed">
              Владен — строительная компания полного цикла. С 2014 года мы
              строим дома, делаем ремонт и облагораживаем территории по всему
              Крыму. Наш принцип прост: делать работу так, как делали бы для
              себя.
            </p>
          </div>
        </Container>
      </div>

      {/* Story */}
      <div className="bg-light py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left: text */}
            <AnimateOnView direction="left">
              <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
                Наша история
              </p>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold text-text-light mb-6">
                {YEARS_PHRASE} строим Крым
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  Компания основана в 2014 году в Адлере. Начинали со
                  строительства посёлка коттеджей в Адлерском районе — именно
                  там сложился наш подход к качеству и срокам.
                </p>
                <p>
                  Сегодня в команде инженеры, архитекторы, прорабы, отделочники,
                  дизайнеры и проектировщики. Работаем в Симферополе, Ялте,
                  Евпатории и Джанкое.
                </p>
                <p>
                  За эти годы реализовали более {OBJECTS_DONE} объектов по Крыму и
                  Краснодарскому краю: от небольших дач до коммерческих
                  комплексов. Каждый проект — новая ответственность.
                </p>
              </div>
            </AnimateOnView>

            {/* Right: timeline */}
            <AnimateOnView direction="right">
              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <div key={m.year} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                        <span className="text-white font-oswald text-xs font-bold">
                          {m.year.slice(2)}
                        </span>
                      </div>
                      {i < milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-accent/20 mt-1 flex-1 min-h-[1.5rem]" />
                      )}
                    </div>
                    <div className="pt-2 pb-4">
                      <span className="text-accent font-oswald font-semibold text-sm">
                        {m.year}
                      </span>
                      <p className="text-text-light text-sm mt-0.5">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateOnView>
          </div>

          {/* Team */}
          <TeamSection />
        </Container>
      </div>

      {/* Яндекс отзывы */}
      <div className="bg-light py-16">
        <Container>
          <AnimateOnView className="text-center mb-10">
            <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
              Отзывы клиентов
            </p>
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-text-light mb-2">
              Что о нас говорят на Яндексе
            </h2>
            <a
              href="https://yandex.com/maps/org/vladen/111586244168/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted text-sm hover:text-accent transition-colors"
            >
              Открыть страницу компании на Яндекс Картах ↗
            </a>
          </AnimateOnView>
          <div className="max-w-2xl mx-auto">
            <YandexReviews />
          </div>
        </Container>
      </div>

      {/* Values */}
      <div className="bg-dark py-20">
        <Container>
          <AnimateOnView className="text-center mb-12">
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white mb-4">
              Наши ценности
            </h2>
          </AnimateOnView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Честность",
                desc: "Говорим правду о сроках и стоимости. Не обещаем невозможного.",
              },
              {
                title: "Качество",
                desc: "Не сдаём объект, пока сами не удовлетворены результатом.",
              },
              {
                title: "Ответственность",
                desc: "Берём ответственность за каждый элемент работы. Никаких отговорок.",
              },
            ].map((v, i) => (
              <AnimateOnView key={v.title} delay={i * 0.1}>
                <div className="p-6 border border-white/10 rounded-lg text-center hover:border-accent/40 transition-colors">
                  <h3 className="font-oswald text-xl font-semibold text-accent mb-3">
                    {v.title}
                  </h3>
                  <p className="text-text-dark text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </Container>
      </div>

      <Contacts />
    </>
  );
}
