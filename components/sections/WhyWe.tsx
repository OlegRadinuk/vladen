import Container from "@/components/ui/Container";
import AnimateOnView from "@/components/ui/AnimateOnView";

const reasons = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Гарантия качества",
    desc: "Даём письменную гарантию на все виды работ. Используем только сертифицированные материалы.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Соблюдение сроков",
    desc: "Фиксируем сроки в договоре и соблюдаем их. За каждый день просрочки — неустойка.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Прозрачные цены",
    desc: "Составляем детальную смету перед стартом. Цена не меняется в ходе работ без вашего согласия.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Собственная бригада",
    desc: "Работаем без посредников и субподрядчиков. Наши штатные специалисты контролируют каждый этап.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Полный документооборот",
    desc: "Работаем официально. Договор, смета, акты выполненных работ — всё по закону.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Поддержка после сдачи",
    desc: "Менеджер на связи даже после завершения работ. Решаем гарантийные вопросы оперативно.",
  },
];

export default function WhyWe() {
  return (
    <section id="why" className="py-20 md:py-28 bg-light">
      <Container>
        <AnimateOnView className="text-center mb-14">
          <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
            Наши преимущества
          </p>
          <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-text-light mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            12 лет работы в Крыму. Более 300 реализованных объектов. Репутация
            строится годами.
          </p>
        </AnimateOnView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, i) => (
            <AnimateOnView key={item.title} delay={i * 0.07}>
              <div className="group p-6 bg-white rounded-lg border border-transparent hover:border-accent/30 shadow-sm hover:shadow-md transition-all duration-200 h-full">
                <div className="text-accent mb-4 group-hover:scale-110 transition-transform duration-200 inline-block">
                  {item.icon}
                </div>
                <h3 className="font-oswald text-xl font-semibold text-text-light mb-2">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </Container>
    </section>
  );
}
