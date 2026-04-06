import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import AnimateOnView from "@/components/ui/AnimateOnView";
import Contacts from "@/components/sections/Contacts";

export const metadata: Metadata = {
  title: "Примеры ремонтов квартир и домов в Крыму — портфолио Владен",
  description:
    "Фото и примеры выполненных ремонтов квартир, дизайнерских отделок и строительства в Симферополе, Ялте, Севастополе. Более 200 объектов ООО «ВЛАДЕН» с 2005 года.",
  keywords: [
    "ремонт квартиры Симферополь фото",
    "примеры ремонта квартир Крым",
    "портфолио ремонтов Симферополь",
    "дизайнерский ремонт Симферополь фото",
    "ремонт квартиры до и после Симферополь",
    "готовые ремонты Крым",
    "фото ремонтов квартир Симферополь",
    "строительство домов Крым фото",
  ],
  alternates: { canonical: "https://vladen-crimea.ru/projects" },
  openGraph: {
    title: "Портфолио ремонтов и строительства в Крыму | Владен",
    description:
      "Примеры ремонтов квартир и домов в Симферополе, Ялте, Севастополе. 200+ реализованных объектов ООО «ВЛАДЕН».",
    url: "https://vladen-crimea.ru/projects",
  },
};

const projects = [
  {
    title: "Двухэтажный дом в Симферополе",
    type: "Строительство под ключ",
    area: "280 м²",
    year: "2023",
    desc: "Газобетонный дом с полной отделкой, инженерными системами и ландшафтным дизайном.",
  },
  {
    title: "Коттедж в Ялте",
    type: "Строительство + отделка",
    area: "190 м²",
    year: "2022",
    desc: "Одноэтажный коттедж из кирпича. Открытая терраса с видом на море.",
  },
  {
    title: "Квартира в Севастополе",
    type: "Ремонт под ключ",
    area: "85 м²",
    year: "2023",
    desc: "Капитальный ремонт трёхкомнатной квартиры. Современный стиль, тёплые полы.",
  },
  {
    title: "Офисный центр в Керчи",
    type: "Коммерческое строительство",
    area: "450 м²",
    year: "2022",
    desc: "Двухэтажный офисный центр. Фасадные работы, отделка, инженерные системы.",
  },
  {
    title: "Дача в Бахчисарае",
    type: "Строительство дачи",
    area: "120 м²",
    year: "2021",
    desc: "Деревянный дом с мансардой. Баня, беседка, мощёные дорожки.",
  },
  {
    title: "Таунхаус в Евпатории",
    type: "Строительство + благоустройство",
    area: "160 м²",
    year: "2021",
    desc: "Таунхаус на 2 секции. Монолитный фундамент, газобетон, полная отделка.",
  },
];

function PlaceholderImage({ title }: { title: string }) {
  return (
    <div className="w-full h-52 bg-gray-200 flex flex-col items-center justify-center gap-2">
      <svg className="w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M9 22V12h6v10" />
      </svg>
      <span className="text-gray-400 text-xs px-4 text-center">{title}</span>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-dark pt-32 pb-20">
        <Container>
          <h1 className="font-oswald text-4xl md:text-6xl font-bold text-white mb-4">
            Наши проекты
          </h1>
          <p className="text-text-dark text-lg max-w-2xl">
            Более 200 реализованных объектов по всему Крыму. Каждый проект —
            это история доверия и качества.
          </p>
          <div className="flex flex-wrap gap-8 mt-8">
            {[
              { v: "200+", l: "Объектов" },
              { v: "18", l: "Лет опыта" },
              { v: "6", l: "Городов" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-oswald text-3xl font-bold text-accent">{s.v}</div>
                <div className="text-text-muted text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Projects grid */}
      <div className="bg-light py-20">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <AnimateOnView key={project.title} delay={i * 0.08}>
              <Card className="group overflow-hidden h-full">
                <div className="relative">
                  <PlaceholderImage title={project.title} />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-accent text-xs font-medium bg-accent/10 px-2 py-0.5 rounded">
                      {project.type}
                    </span>
                    <span className="text-text-muted text-xs">{project.year}</span>
                  </div>
                  <h3 className="font-oswald text-lg font-semibold text-text-light mb-2">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-3">
                    {project.desc}
                  </p>
                  <p className="text-text-light text-sm font-medium">{project.area}</p>
                </div>
              </Card>
              </AnimateOnView>
            ))}
          </div>
        </Container>
      </div>

      <Contacts />
    </>
  );
}
