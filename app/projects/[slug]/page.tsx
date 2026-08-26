import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import AnimateOnView from "@/components/ui/AnimateOnView";
import ProjectGallery from "@/components/sections/ProjectGallery";
import Contacts from "@/components/sections/Contacts";
import { projects, getProject, flatGallery } from "@/lib/projects";

const BASE_URL = "https://vladen-crimea.ru";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Объект не найден | Владен" };

  const url = `${BASE_URL}/projects/${project.slug}`;
  const cover = project.cover ? `${BASE_URL}${project.cover}` : undefined;

  return {
    title: project.seo.title,
    description: project.seo.description,
    keywords: project.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      url,
      images: cover ? [cover] : undefined,
    },
    twitter: {
      card: cover ? "summary_large_image" : "summary",
      title: project.seo.title,
      description: project.seo.description,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const photos = flatGallery(project);
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Проекты", item: `${BASE_URL}/projects` },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${BASE_URL}/projects/${project.slug}`,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.seo.description,
        url: `${BASE_URL}/projects/${project.slug}`,
        dateCreated: project.year,
        ...(project.cover ? { image: `${BASE_URL}${project.cover}` } : {}),
        creator: {
          "@type": "Organization",
          name: "ООО «ВЛАДЕН»",
          url: BASE_URL,
        },
        locationCreated: { "@type": "Place", name: project.location },
      },
    ],
  };

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
            <Link href="/projects" className="inline-block py-1 hover:text-accent transition-colors">
              Проекты
            </Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-text-dark">{project.title}</span>
          </nav>

          <span className="inline-block text-xs font-oswald tracking-widest uppercase text-accent border border-accent/40 rounded px-3 py-1 mb-4">
            {project.tag}
          </span>

          <h1 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            {project.title}
          </h1>
          <p className="text-text-dark text-sm sm:text-base max-w-3xl">{project.subtitle}</p>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-7 sm:mt-9 max-w-2xl">
            {project.stats.map((s) => (
              <div
                key={s.label}
                className="text-center px-2 py-3 sm:p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="font-oswald text-[13px] sm:text-lg md:text-xl font-bold text-accent mb-0.5 leading-tight break-words">
                  {s.value}
                </div>
                <div className="text-text-muted text-[11px] sm:text-xs leading-tight">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 text-text-muted text-xs sm:text-sm">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {project.location}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {project.status}
            </span>
            {photos.length > 0 && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {photos.length} фото
              </span>
            )}
          </div>
        </Container>
      </div>

      {/* Обложка */}
      {project.cover && (
        <div className="bg-dark pb-14 sm:pb-20">
          <Container>
            <div className="relative w-full h-56 sm:h-80 md:h-[28rem] rounded-lg overflow-hidden bg-white/5">
              <Image
                src={project.cover}
                alt={`${project.title} — ${project.location}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </Container>
        </div>
      )}

      {/* Описание и состав работ */}
      <div className="bg-light py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14">
            <AnimateOnView>
              <h2 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-text-light mb-4 sm:mb-6">
                О проекте
              </h2>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">{project.lead}</p>
            </AnimateOnView>

            <AnimateOnView delay={0.1}>
              <h2 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-text-light mb-4 sm:mb-6">
                Что сделали
              </h2>
              <ul className="space-y-3">
                {project.features.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[9px] shrink-0" />
                    <span className="text-text-muted text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimateOnView>
          </div>
        </Container>
      </div>

      {/* Экспликация помещений */}
      {project.schedule && project.schedule.length > 0 && (
        <div className="bg-white py-16 sm:py-20">
          <Container>
            <h2 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-text-light mb-3">
              Экспликация помещений
            </h2>
            <p className="text-text-muted text-sm mb-8 sm:mb-10">
              Площади по утверждённому планировочному решению.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {project.schedule.map((floor) => (
                <AnimateOnView key={floor.floor}>
                  <div className="border border-gray-200 rounded-lg p-6 sm:p-8 h-full">
                    <div className="flex items-baseline justify-between mb-5 pb-4 border-b border-gray-200">
                      <h3 className="font-oswald text-lg sm:text-xl font-semibold text-text-light">
                        {floor.floor}
                      </h3>
                      <span className="font-oswald text-accent font-bold text-base sm:text-lg">
                        {floor.total}
                      </span>
                    </div>
                    <dl className="space-y-2.5">
                      {floor.rooms.map((room) => (
                        <div key={room.name} className="flex items-baseline gap-3">
                          <dt className="text-text-muted text-sm sm:text-base">{room.name}</dt>
                          <span className="flex-1 border-b border-dotted border-gray-300 translate-y-[-3px]" />
                          <dd className="text-text-light text-sm sm:text-base font-medium shrink-0">
                            {room.area}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </AnimateOnView>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Галерея */}
      {project.galleryGroups && project.galleryGroups.length > 0 && (
        <ProjectGallery groups={project.galleryGroups} />
      )}

      {/* Этапы работ */}
      {project.stages && project.stages.length > 0 && (
        <div className="bg-light py-16 sm:py-20">
          <Container>
            <h2 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-text-light mb-8 sm:mb-12">
              Как шла работа
            </h2>
            <ol className="space-y-6 sm:space-y-8 max-w-3xl">
              {project.stages.map((stage, i) => (
                <li key={stage.title}>
                  <AnimateOnView delay={i * 0.05} className="flex items-start gap-4 sm:gap-6">
                    <span className="shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center font-oswald font-bold text-accent text-sm sm:text-base">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-oswald text-base sm:text-lg font-semibold text-text-light mb-1.5">
                        {stage.title}
                      </h3>
                      <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                        {stage.text}
                      </p>
                    </div>
                  </AnimateOnView>
                </li>
              ))}
            </ol>
          </Container>
        </div>
      )}

      {/* Переход на страницу авторского надзора */}
      {project.showNadzorCta && (
        <div className="bg-dark py-16 sm:py-20">
          <Container>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 sm:p-10">
              <p className="text-accent font-oswald text-xs sm:text-sm tracking-widest uppercase mb-2">
                Как мы контролируем стройку
              </p>
              <h2 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Авторский надзор на этом объекте
              </h2>
              <p className="text-text-dark text-sm sm:text-base max-w-2xl mb-6">
                Каждый этап на объекте сверялся с чертежом: выезд, фотофиксация, отчёт по комнате
                с пометками поверх развёртки стены и повторная проверка исправлений. Показываем,
                как это выглядит изнутри — с реальными фото со стройки.
              </p>
              <Link
                href="/services/avtorskiy-nadzor"
                className="inline-flex items-center gap-2 font-oswald font-medium tracking-wide rounded bg-accent text-white px-6 py-3 text-sm sm:text-base hover:bg-amber-600 transition-colors"
              >
                Смотреть, как устроен авторский надзор
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Container>
        </div>
      )}

      {/* Другие объекты */}
      {others.length > 0 && (
        <div className="bg-white py-16 sm:py-20">
          <Container>
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8">
              <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-text-light">
                Другие объекты
              </h2>
              <Link
                href="/projects"
                className="text-accent text-sm font-oswald hover:underline underline-offset-4"
              >
                Всё портфолио →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group block rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative w-full h-40 bg-gray-100">
                    {p.cover ? (
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs px-4 text-center">
                        {p.title}
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6">
                    <span className="text-accent text-xs font-medium bg-accent/10 px-2 py-0.5 rounded">
                      {p.tag}
                    </span>
                    <h3 className="font-oswald text-base sm:text-lg font-semibold text-text-light mt-3 group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-text-muted text-xs sm:text-sm mt-1">
                      {p.area} · {p.year}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}

      <Contacts />
    </>
  );
}
