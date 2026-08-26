import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import AnimateOnView from "@/components/ui/AnimateOnView";
import Contacts from "@/components/sections/Contacts";
import { projects, flatGallery } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Примеры ремонтов квартир и домов в Крыму — портфолио Владен",
  description:
    "Фото и примеры выполненных ремонтов квартир, дизайнерских отделок и строительства в Симферополе, Ялте, Евпатории. Более 200 объектов ООО «ВЛАДЕН» по Крыму и Краснодарскому краю.",
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
      "Примеры ремонтов квартир и домов в Симферополе, Ялте, Евпатории. 200+ реализованных объектов ООО «ВЛАДЕН» по Крыму и Краснодарскому краю.",
    url: "https://vladen-crimea.ru/projects",
  },
  twitter: {
    card: "summary",
    title: "Портфолио ремонтов и строительства в Крыму — Владен",
    description: "Реальные фото выполненных ремонтов квартир и строительства домов. 200+ объектов по Крыму и Краснодарскому краю.",
  },
};

const BASE_URL = "https://vladen-crimea.ru";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Проекты", item: `${BASE_URL}/projects` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Портфолио реализованных объектов ООО «ВЛАДЕН»",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        url: `${BASE_URL}/projects/${p.slug}`,
      })),
    },
  ],
};

function ProjectThumb({ image, title }: { image: string | null; title: string }) {
  if (image) {
    return (
      <div className="relative w-full h-52">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    );
  }
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero */}
      <div className="bg-dark pt-32 pb-20">
        <Container>
          <h1 className="font-oswald text-4xl md:text-6xl font-bold text-white mb-4">
            Наши проекты
          </h1>
          <p className="text-text-dark text-lg max-w-2xl">
            Более 200 реализованных объектов по Крыму и Краснодарскому краю. Каждый проект —
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
          <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-text-light mb-2">
            Портфолио реализованных объектов
          </h2>
          <p className="text-text-muted text-sm mb-8">
            Нажмите на объект — откроется страница проекта с фото, составом работ и этапами.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => {
              const photoCount = flatGallery(project).length;
              return (
                <AnimateOnView key={project.slug} delay={i * 0.08}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
                  >
                    <Card className="group overflow-hidden h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <ProjectThumb image={project.cover} title={project.title} />
                        {photoCount > 0 && (
                          <span className="absolute top-3 right-3 bg-dark/70 text-white text-[11px] font-oswald px-2 py-1 rounded backdrop-blur-sm">
                            {photoCount} фото
                          </span>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-accent text-xs font-medium bg-accent/10 px-2 py-0.5 rounded">
                            {project.tag}
                          </span>
                          <span className="text-text-muted text-xs shrink-0">{project.year}</span>
                        </div>
                        <h3 className="font-oswald text-lg font-semibold text-text-light mb-2 group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-text-muted text-sm leading-relaxed mb-3">
                          {project.cardDesc}
                        </p>
                        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                          <span className="text-text-light text-sm font-medium">{project.area}</span>
                          <span className="text-accent text-sm font-oswald inline-flex items-center gap-1">
                            Подробнее
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </AnimateOnView>
              );
            })}
          </div>
        </Container>
      </div>

      <Contacts />
    </>
  );
}
