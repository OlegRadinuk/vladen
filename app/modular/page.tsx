import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import AnimateOnView from "@/components/ui/AnimateOnView";
import Contacts from "@/components/sections/Contacts";

export const metadata: Metadata = {
  title: "Модульные дома и бани в Крыму — быстро и под ключ",
  description:
    "Модульные дома и бани под ключ в Симферополе и Крыму. Сборка за 7 дней, утеплённые круглогодичные конструкции, полная отделка. ООО «ВЛАДЕН» — от 350 000 руб. Звоните: +7 (978) 717-44-47",
  keywords: [
    "модульный дом Крым",
    "модульный дом Симферополь",
    "купить модульный дом Крым",
    "баня под ключ Симферополь",
    "модульная баня Крым",
    "быстровозводимый дом Крым",
    "дачный домик Симферополь",
    "модульный дом цена Крым",
  ],
  alternates: { canonical: "https://vladen-crimea.ru/modular" },
  openGraph: {
    title: "Модульные дома и бани в Крыму — Владен",
    description:
      "Модульные дома и бани под ключ. Сборка от 7 дней, круглогодичное проживание, от 350 000 руб.",
    url: "https://vladen-crimea.ru/modular",
  },
  twitter: {
    card: "summary",
    title: "Модульные дома и бани в Крыму — от 350 000 ₽",
    description: "Быстровозводимые дома и бани под ключ в Крыму. Сборка от 7 дней. Гарантия 5 лет.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: "https://vladen-crimea.ru" },
    { "@type": "ListItem", position: 2, name: "Модульные дома", item: "https://vladen-crimea.ru/modular" },
  ],
};

const products = [
  {
    title: "Дачный домик",
    area: "16–24 м²",
    days: "5–7",
    price: "от 350 000 ₽",
    desc: "Компактный домик для сезонного отдыха. Утеплённые стены, окна ПВХ, электрика. Идеально для дачи или гостевого дома.",
    features: ["Сезонное проживание", "Электрика в комплекте", "Окна ПВХ", "Готовая отделка"],
    accent: false,
  },
  {
    title: "Жилой модульный дом",
    area: "36–72 м²",
    days: "7–14",
    price: "от 850 000 ₽",
    desc: "Полноценный дом для круглогодичного проживания. Утепление 150 мм, отопление, водоснабжение, санузел. Сдаём под ключ.",
    features: ["Круглогодичное проживание", "Отопление и водоснабжение", "Санузел", "Утепление 150 мм"],
    accent: true,
  },
  {
    title: "Баня",
    area: "18–36 м²",
    days: "5–10",
    price: "от 420 000 ₽",
    desc: "Рубленая или каркасная баня с предбанником, парной и комнатой отдыха. Печь в комплекте, отделка вагонкой.",
    features: ["Парная и предбанник", "Печь в комплекте", "Отделка вагонкой", "Комната отдыха"],
    accent: false,
  },
];

const advantages = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Сборка за 7–14 дней",
    desc: "Завод изготавливает модули, мы монтируем на участке. Нет мокрых процессов — работаем в любую погоду.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Гарантия 5 лет",
    desc: "На конструктив даём гарантию 5 лет. Все материалы сертифицированы, работаем по официальному договору.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Любой участок",
    desc: "Фундамент — сваи или площадка. Подходит для сложного рельефа, крутых склонов и прибрежных зон Крыма.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Фиксированная цена",
    desc: "Смета фиксируется в договоре до начала работ. Никаких доплат в процессе — цена не меняется.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Отделка под ключ",
    desc: "Сдаём готовый объект: пол, потолок, стены, двери, электрика. Заезжайте сразу после приёмки.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Весь Крым",
    desc: "Доставляем и монтируем по всему Крыму: Симферополь, Ялта, Севастополь, Евпатория, Феодосия.",
  },
];

const steps = [
  { n: "01", title: "Заявка и замер", desc: "Звоните или оставляйте заявку. Выезжаем на участок, обсуждаем планировку." },
  { n: "02", title: "Договор и смета", desc: "Фиксируем стоимость, сроки и комплектацию. Подписываем договор." },
  { n: "03", title: "Производство", desc: "Изготавливаем модули на заводе. Параллельно готовим фундамент на участке." },
  { n: "04", title: "Монтаж и сдача", desc: "Привозим, собираем, подключаем коммуникации. Принимаете готовый объект." },
];

export default function ModularPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero */}
      <div className="bg-dark pt-32 pb-24 relative overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#D97706 1px, transparent 1px), linear-gradient(90deg, #D97706 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #D97706 0%, transparent 70%)",
          }}
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 mb-6">
              <svg viewBox="0 0 16 20" fill="none" className="w-3 h-4">
                <path d="M8 0C8 0 10 4 8 7C10 5 14 7 13 11C14 9 16 10 16 13C16 17 12.4 20 8 20C3.6 20 0 17 0 13C0 9 4 7 4 7C4 10 6 11 6 11C5 8 8 0 8 0Z" fill="#D97706"/>
                <path d="M8 13C8 13 9 14.5 8 16C9 15 10.5 15.5 10 17C10.5 16 11.5 16.5 11 18C10.2 19.2 9.2 20 8 20C6.8 20 5.8 19.2 5 18C4.5 16.5 5.5 16 6 17C5.5 15.5 7 13 8 13Z" fill="#FCD34D"/>
              </svg>
              <span className="text-accent text-sm font-inter font-medium">Новое направление</span>
            </div>
            <h1 className="font-oswald text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Модульные дома
              <br />
              <span className="text-accent">и бани под ключ</span>
            </h1>
            <p className="text-text-dark text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Быстровозводимые конструкции для дачи, отдыха и постоянного
              проживания. Завод — производство, Владен — монтаж и отделка в
              Крыму. Сборка от 7 дней.
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-lg">
              {[
                { val: "7", unit: "дней", label: "сборка" },
                { val: "350", unit: "тыс. ₽", label: "от" },
                { val: "5", unit: "лет", label: "гарантия" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-oswald text-3xl sm:text-4xl font-bold text-accent leading-none">
                    {s.val}
                    <span className="text-lg font-normal ml-1">{s.unit}</span>
                  </div>
                  <div className="text-white/60 text-xs uppercase tracking-wide mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Products */}
      <div className="bg-light py-20">
        <Container>
          <AnimateOnView className="text-center mb-12">
            <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">Что строим</p>
            <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-text-light">
              Выберите свой вариант
            </h2>
          </AnimateOnView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <AnimateOnView key={p.title} delay={i * 0.1}>
                <div
                  className={`relative rounded-2xl p-8 h-full flex flex-col transition-all duration-300 ${
                    p.accent
                      ? "bg-dark border-2 border-accent shadow-[0_0_40px_rgba(217,119,6,0.15)]"
                      : "bg-white border border-gray-200 hover:border-accent/30 hover:shadow-md"
                  }`}
                >
                  {p.accent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-oswald font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                      Популярный
                    </div>
                  )}
                  <div className={`font-oswald text-2xl font-bold mb-1 ${p.accent ? "text-white" : "text-text-light"}`}>
                    {p.title}
                  </div>
                  <div className="text-accent font-oswald text-sm mb-4">
                    {p.area} · {p.days} дней
                  </div>
                  <p className={`text-sm leading-relaxed mb-6 flex-1 ${p.accent ? "text-text-dark" : "text-text-muted"}`}>
                    {p.desc}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <span className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                            <path d="M2 6l3 3 5-5" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className={p.accent ? "text-text-dark" : "text-text-muted"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`font-oswald text-2xl font-bold ${p.accent ? "text-accent" : "text-text-light"}`}>
                    {p.price}
                  </div>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </Container>
      </div>

      {/* Advantages */}
      <div className="bg-dark py-20">
        <Container>
          <AnimateOnView className="text-center mb-12">
            <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">Почему мы</p>
            <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              6 причин выбрать Владен
            </h2>
          </AnimateOnView>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a, i) => (
              <AnimateOnView key={a.title} delay={i * 0.08}>
                <div className="p-6 border border-white/10 rounded-xl hover:border-accent/30 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center text-accent mb-4 group-hover:bg-accent/25 transition-colors">
                    {a.icon}
                  </div>
                  <h3 className="font-oswald text-lg font-semibold text-white mb-2">{a.title}</h3>
                  <p className="text-text-dark text-sm leading-relaxed">{a.desc}</p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </Container>
      </div>

      {/* Steps */}
      <div className="bg-light py-20">
        <Container>
          <AnimateOnView className="text-center mb-12">
            <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">Процесс</p>
            <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-text-light">
              Как это работает
            </h2>
          </AnimateOnView>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <AnimateOnView key={s.n} delay={i * 0.1}>
                <div className="relative">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-accent/20 z-0" style={{ width: "calc(100% - 3rem)", left: "3.5rem" }} />
                  )}
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
                      <span className="font-oswald font-bold text-white text-sm">{s.n}</span>
                    </div>
                    <h3 className="font-oswald text-lg font-semibold text-text-light mb-2">{s.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
                  </div>
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
