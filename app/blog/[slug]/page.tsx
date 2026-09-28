import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { safeJsonLd } from "@/lib/utils"
import Container from "@/components/ui/Container"
import ContactCTA from "@/components/blog/ContactCTA"
import { fetchArticle, fetchArticles, mdToSafeHtml, rubricLabel } from "@/lib/blog"
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/company"

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const res = await fetchArticles(1, 100)
    return res.data.map((a) => ({ slug: a.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await fetchArticle(slug)

  if (!article) {
    return { title: "Статья не найдена | Владен" }
  }

  const canonicalUrl = `https://vladen-crimea.ru/blog/${article.slug}`
  const ogImage = article.hero_image?.url

  return {
    title: article.meta_title || article.title,
    description: article.meta_description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description,
      url: canonicalUrl,
      type: "article",
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.updated_at,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await fetchArticle(slug)

  if (!article) notFound()

  // Рендерим из body_md: удаляем ведущий H1, inline-FAQ и хвостовой CTA-раздел
  const bodyHtml = await mdToSafeHtml(article.body_md, { hasFaq: article.faq.length > 0 })

  // Сноска о ценах (compliance): показывать если в body_md встречаются символы цены
  const hasPriceDisclaimer = /\d[\s ]*(₽|руб\.?|тыс\.?\s*₽)/.test(article.body_md)

  // Build JSON-LD: Article + FAQPage
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      "@type": "Organization",
      name: "Владен",
      url: "https://vladen-crimea.ru",
    },
    publisher: {
      "@type": "Organization",
      name: "Владен",
      url: "https://vladen-crimea.ru",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://vladen-crimea.ru/blog/${slug}` },
    ...(article.hero_image ? { image: article.hero_image.url } : {}),
  }

  const faqSchema =
    article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://vladen-crimea.ru",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Блог",
        item: "https://vladen-crimea.ru/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://vladen-crimea.ru/blog/${slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-light">
        {/* Article header — bg-dark starts at top so transparent header stays readable (matches /about, /projects) */}
        <section className="bg-dark pt-32 pb-10 md:pb-14">
          <Container>
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/50 font-inter">
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    Главная
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/blog" className="hover:text-accent transition-colors">
                    Блог
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/blog/category/${article.template_code}`}
                    className="hover:text-accent transition-colors"
                  >
                    {rubricLabel(article.template_code)}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white/80 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {article.title}
                </li>
              </ol>
            </nav>

            <div className="inline-block mb-4">
              <Link
                href={`/blog/category/${article.template_code}`}
                className="text-sm font-oswald font-medium text-accent uppercase tracking-wide hover:underline"
              >
                {rubricLabel(article.template_code)}
              </Link>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-bold text-white leading-tight max-w-4xl">
              {article.h1 || article.title}
            </h1>

            {article.published_at && (
              <p className="mt-4 text-sm text-white/50 font-inter">
                <time dateTime={article.published_at}>
                  {new Date(article.published_at).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                {" · "}
                <span>Владен</span>
              </p>
            )}
          </Container>
        </section>

        {/* Hero image */}
        {article.hero_image && (
          <div className="w-full bg-dark/10">
            <Container>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.hero_image.url}
                alt={article.hero_image.alt}
                className="w-full max-h-[480px] object-cover rounded-b-xl"
                loading="eager"
              />
              {article.hero_image.caption && (
                <p className="mt-2 text-xs text-text-muted font-inter text-center">
                  {article.hero_image.caption}
                </p>
              )}
            </Container>
          </div>
        )}

        {/* Body */}
        <section className="py-10 md:py-14">
          <Container>
            <div className="grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-14 items-start">
              {/* Article body */}
              <article className="max-w-none">
                {/* TOC */}
                {article.toc.length > 1 && (
                  <nav
                    aria-label="Содержание"
                    className="mb-8 p-5 bg-white rounded-xl border border-gray-100 shadow-sm"
                  >
                    <p className="font-oswald font-bold text-text-light text-lg mb-3">Содержание</p>
                    <ol className="space-y-1.5">
                      {article.toc.map((item, i) => (
                        <li
                          key={i}
                          style={{ paddingLeft: `${(item.level - 2) * 16}px` }}
                          className="text-sm font-inter"
                        >
                          <a
                            href={`#${item.id}`}
                            className="text-accent hover:underline"
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}

                {/* Article content */}
                <div
                  className="prose-blog"
                  dangerouslySetInnerHTML={{ __html: bodyHtml }}
                />

                {/* FAQ */}
                {article.faq.length > 0 && (
                  <section aria-label="Частые вопросы" className="mt-10">
                    <h2 className="text-2xl sm:text-3xl font-oswald font-bold text-text-light mb-6">
                      Частые вопросы
                    </h2>
                    <div className="space-y-4">
                      {article.faq.map((item, i) => (
                        <details
                          key={i}
                          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                        >
                          <summary className="px-5 py-4 font-oswald font-bold text-text-light text-base cursor-pointer list-none flex items-center justify-between gap-3 hover:text-accent transition-colors select-none">
                            {item.q}
                            <span aria-hidden="true" className="text-accent shrink-0 text-lg">+</span>
                          </summary>
                          <p className="px-5 pb-4 pt-1 font-inter text-sm text-text-muted">
                            {item.a}
                          </p>
                        </details>
                      ))}
                    </div>
                  </section>
                )}

                {/* Price disclaimer (compliance) */}
                {hasPriceDisclaimer && (
                  <p className="mt-8 text-xs text-text-muted font-inter border-t border-gray-200 pt-4">
                    Стоимость указана по факту конкретного выполненного объекта и не является публичной офертой. Точный расчёт — после замера.
                  </p>
                )}

                {/* CTA block */}
                <ContactCTA cta={article.cta} />
              </article>

              {/* Sidebar */}
              <aside className="hidden lg:block space-y-6 sticky top-28">
                {/* About company */}
                <div className="bg-dark rounded-xl p-6 text-white">
                  <p className="font-oswald font-bold text-lg text-accent mb-2">Владен</p>
                  <p className="text-sm text-white/70 font-inter mb-4">
                    Строительство и ремонт в Симферополе и Крыму. С 2014 года,
                    200+ объектов.
                  </p>
                  <a
                    href={PHONE_HREF}
                    className="block text-center bg-accent text-white font-oswald font-medium py-3 rounded hover:bg-amber-600 transition-colors"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>

                {/* Back to blog */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <Link
                    href="/blog"
                    className="flex items-center gap-2 font-oswald font-medium text-accent hover:text-amber-600 transition-colors"
                  >
                    <span aria-hidden="true">&#8592;</span> Все статьи
                  </Link>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}
