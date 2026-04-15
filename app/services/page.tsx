import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import AnimateOnView from "@/components/ui/AnimateOnView";
import Contacts from "@/components/sections/Contacts";

export const metadata: Metadata = {
  title: "Ремонт квартир и домов в Симферополе — услуги и цены",
  description:
    "Ремонт квартир под ключ, дизайнерский ремонт, отделка домов, строительство в Симферополе и Крыму. Прозрачные цены, гарантия качества. ООО «ВЛАДЕН» с 2005 года. Звоните: +7 (978) 717-44-47",
  keywords: [
    "ремонт квартиры Симферополь цена",
    "ремонт квартиры под ключ Симферополь",
    "сколько стоит ремонт квартиры Симферополь",
    "ремонт квартиры Крым недорого",
    "дизайнерский ремонт квартиры Симферополь цена",
    "отделка квартиры Симферополь под ключ",
    "ремонт дома Симферополь цена",
    "дизайн проект квартиры Симферополь",
    "капитальный ремонт Симферополь",
    "строительство дома под ключ Симферополь цена",
    "фундамент Симферополь",
    "кровля Симферополь цена",
  ],
  alternates: { canonical: "https://vladen-crimea.ru/services" },
  openGraph: {
    title: "Ремонт квартир и домов в Симферополе — цены | Владен",
    description:
      "Ремонт квартир, дизайнерская отделка, строительство в Симферополе. Полный цикл работ под ключ. Звоните: +7 (978) 717-44-47",
    url: "https://vladen-crimea.ru/services",
  },
  twitter: {
    card: "summary",
    title: "Услуги и цены на ремонт квартир в Симферополе — Владен",
    description: "Ремонт эконом от 20 000 ₽/м², стандарт от 30 000 ₽/м², премиум от 40 000 ₽/м². Строительство от 55 000 ₽/м².",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: "https://vladen-crimea.ru" },
    { "@type": "ListItem", position: 2, name: "Услуги", item: "https://vladen-crimea.ru/services" },
  ],
};

const services = [
  {
    category: "Ремонт и отделка",
    items: [
      {
        title: "Дизайнерские ремонты",
        desc: "Ремонт квартир и домов по дизайн-проекту. Все виды отделочных работ: плитка, паркет, штукатурка, покраска.",
        price: "по запросу",
        img: "/images/services/dizayn-remont.jpg",
      },
      {
        title: "Ремонт под ключ",
        desc: "Комплексный ремонт — от черновой отделки до меблировки. Авторский надзор, гарантия на работы.",
        price: "по запросу",
        img: "/images/services/remont.jpg",
      },
      {
        title: "Дизайн-проекты",
        desc: "Авторский дизайн интерьера и экстерьера. Визуализация, рабочие чертежи, авторский надзор.",
        price: "по запросу",
        img: "/images/services/dizayn-proekt.png",
      },
      {
        title: "Демонтаж и перепланировка",
        desc: "Снос перегородок, демонтаж стяжки и старой отделки. Согласование перепланировки под ключ.",
        price: "по запросу",
        img: "/images/services/demontag.png",
      },
    ],
  },
  {
    category: "Строительство",
    items: [
      {
        title: "Фасадные работы",
        desc: "Утепление и отделка фасадов: штукатурка, облицовка, покраска. Надёжная защита от крымского климата.",
        price: "по запросу",
        img: "/images/services/fasadnie.png",
      },
      {
        title: "Фундамент и стены",
        desc: "Закладка фундаментов любого типа: ленточный, плитный, свайный. Возведение стен из кирпича, газобетона, монолитного бетона.",
        price: "по запросу",
        img: "/images/services/fundament.png",
      },
      {
        title: "Кровля",
        desc: "Монтаж стропильной системы, укладка металлочерепицы, профнастила, мягкой кровли. Гидроизоляция и водоотведение.",
        price: "по запросу",
        img: "/images/services/krovlja.png",
      },
      {
        title: "Инженерные сети",
        desc: "Электрика, водоснабжение, канализация, отопление, вентиляция. Проектирование и монтаж под ключ.",
        price: "по запросу",
        img: "/images/services/ingener-net.png",
      },
    ],
  },
  {
    category: "Подготовка и проектирование",
    items: [
      {
        title: "Подбор земельного участка",
        desc: "Помогаем выбрать и проверить участок: анализ документов, геологии, коммуникаций и инфраструктуры района.",
        price: "по запросу",
        img: "/images/services/podbor.png",
      },
      {
        title: "Проектирование",
        desc: "Архитектурные и конструктивные проекты. Получение всех разрешений и согласований.",
        price: "по запросу",
        img: "/images/services/proektirovanie.jpg",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
                      <div className="relative overflow-hidden">
                        <Image
                          src={item.img}
                          alt={item.title}
                          width={800}
                          height={450}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
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
