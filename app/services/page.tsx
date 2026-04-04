import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import AnimateOnView from "@/components/ui/AnimateOnView";
import Contacts from "@/components/sections/Contacts";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Полный спектр строительных услуг в Крыму: строительство домов, ремонт, отделка, фундаменты, кровля.",
  openGraph: {
    title: "Услуги — Владен",
    description: "Строительные услуги в Крыму от компании Владен.",
  },
};

const services = [
  {
    category: "Подготовка и проектирование",
    items: [
      {
        title: "Подбор земельного участка",
        desc: "Помогаем выбрать и проверить участок: анализ документов, геологии, коммуникаций и инфраструктуры района.",
        price: "по запросу",
      },
      {
        title: "Проектирование",
        desc: "Архитектурные и конструктивные проекты. Получение всех разрешений и согласований.",
        price: "по запросу",
      },
      {
        title: "Дизайн-проекты",
        desc: "Авторский дизайн интерьера и экстерьера. Визуализация, рабочие чертежи, авторский надзор.",
        price: "по запросу",
      },
    ],
  },
  {
    category: "Строительство",
    items: [
      {
        title: "Фундамент и стены",
        desc: "Закладка фундаментов любого типа: ленточный, плитный, свайный. Возведение стен из кирпича, газобетона, монолитного бетона.",
        price: "по запросу",
      },
      {
        title: "Кровля",
        desc: "Монтаж стропильной системы, укладка металлочерепицы, профнастила, мягкой кровли. Гидроизоляция и водоотведение.",
        price: "по запросу",
      },
      {
        title: "Инженерные сети",
        desc: "Электрика, водоснабжение, канализация, отопление, вентиляция. Проектирование и монтаж под ключ.",
        price: "по запросу",
      },
    ],
  },
  {
    category: "Ремонт и отделка",
    items: [
      {
        title: "Дизайнерские ремонты",
        desc: "Ремонт квартир и домов по дизайн-проекту. Все виды отделочных работ: плитка, паркет, штукатурка, покраска.",
        price: "по запросу",
      },
      {
        title: "Ремонт под ключ",
        desc: "Комплексный ремонт — от черновой отделки до меблировки. Авторский надзор, гарантия на работы.",
        price: "по запросу",
      },
    ],
  },
];

function PlaceholderImage() {
  return (
    <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M9 22V12h6v10" />
      </svg>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-dark pt-32 pb-20">
        <Container>
          <h1 className="font-oswald text-4xl md:text-6xl font-bold text-white mb-4">
            Наши услуги
          </h1>
          <p className="text-text-dark text-lg max-w-2xl">
            Полный цикл строительных работ в Крыму. От закладки фундамента до
            чистовой отделки и благоустройства.
          </p>
        </Container>
      </div>

      {/* Services by category */}
      <div className="bg-light py-20">
        <Container>
          {services.map((cat) => (
            <div key={cat.category} className="mb-16 last:mb-0">
              <AnimateOnView>
                <h2 className="font-oswald text-2xl md:text-3xl font-bold text-text-light mb-8 pb-3 border-b border-accent/30">
                  {cat.category}
                </h2>
              </AnimateOnView>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item, i) => (
                  <AnimateOnView key={item.title} delay={i * 0.1}>
                    <Card className="group overflow-hidden h-full">
                      <div className="relative">
                        <PlaceholderImage />
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </div>
                      <div className="p-6">
                        <h3 className="font-oswald text-lg font-semibold text-text-light mb-2">
                          {item.title}
                        </h3>
                        <p className="text-text-muted text-sm leading-relaxed mb-4">
                          {item.desc}
                        </p>
                        <p className="text-accent font-oswald font-semibold">
                          {item.price}
                        </p>
                      </div>
                    </Card>
                  </AnimateOnView>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </div>

      <Contacts />
    </>
  );
}
