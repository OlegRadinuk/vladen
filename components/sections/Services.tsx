import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import AnimateOnView from "@/components/ui/AnimateOnView";
import Link from "next/link";

const services = [
  {
    title: "Подбор земельного участка",
    desc: "Поможем найти и оценить участок под строительство. Анализ документов, геологии и инфраструктуры.",
    img: null,
  },
  {
    title: "Проектирование",
    desc: "Разработка архитектурных и конструктивных проектов. Все согласования и разрешения.",
    img: null,
  },
  {
    title: "Дизайн-проекты",
    desc: "Авторский дизайн интерьера и экстерьера. Визуализация, рабочие чертежи, авторский надзор.",
    img: null,
  },
  {
    title: "Инженерные сети",
    desc: "Электрика, водоснабжение, канализация, отопление, вентиляция. Проектирование и монтаж под ключ.",
    img: null,
  },
  {
    title: "Фундамент и стены",
    desc: "Закладка фундаментов любого типа. Возведение стен из кирпича, газобетона, монолитного бетона.",
    img: null,
  },
  {
    title: "Кровля",
    desc: "Монтаж и ремонт кровли: металлочерепица, профнастил, мягкая кровля. Гидроизоляция.",
    img: null,
  },
  {
    title: "Дизайнерские ремонты",
    desc: "Ремонт квартир и домов по дизайн-проекту. Чистовая отделка, авторский надзор, гарантия.",
    img: null,
  },
];

function PlaceholderImage({ title }: { title: string }) {
  return (
    <div className="w-full h-52 bg-gray-200 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
      <svg
        className="w-16 h-16 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 22V12h6v10"
        />
      </svg>
      <span className="text-gray-400 text-xs px-4 text-center">{title}</span>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-light">
      <Container>
        {/* Header */}
        <AnimateOnView className="text-center mb-14">
          <p className="text-accent font-oswald text-sm tracking-widest uppercase mb-2">
            Что мы делаем
          </p>
          <h2 className="font-oswald text-3xl md:text-5xl font-bold text-text-light mb-4">
            Наши услуги
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Полный спектр строительных и ремонтных работ в Крыму. Гарантируем
            качество и соблюдение сроков.
          </p>
        </AnimateOnView>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimateOnView key={service.title} delay={i * 0.08}>
              <Card className="group cursor-pointer overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <PlaceholderImage title={service.title} />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
                <div className="p-6">
                  <h3 className="font-oswald text-xl font-semibold text-text-light mb-2">
                    {service.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </Card>
            </AnimateOnView>
          ))}
        </div>

        <AnimateOnView className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-accent font-oswald font-medium hover:gap-3 transition-all duration-200"
          >
            Все услуги
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </AnimateOnView>
      </Container>
    </section>
  );
}
