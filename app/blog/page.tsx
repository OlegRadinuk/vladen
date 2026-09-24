import type { Metadata } from "next"
import Link from "next/link"
import Container from "@/components/ui/Container"
import { fetchArticles, rubricLabel, RUBRIC_LABELS } from "@/lib/blog"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  // Если статей нет — noindex (МПК-риск: пустая страница в индексе Яндекса)
  const res = await fetchArticles(1, 1)
  const hasArticles = res.data.some((a) => a.published_at)

  return {
    title: "Блог — полезные статьи о строительстве и ремонте в Крыму",
    description:
      "Экспертные статьи Владен: стоимость ремонта, выбор материалов, разбор ошибок клиентов, реальные кейсы строительства в Симферополе и Крыму.",
    alternates: { canonical: "https://vladen-crimea.ru/blog" },
    robots: hasArticles ? undefined : { index: false, follow: true },
    openGraph: {
      title: "Блог Владен — строительство и ремонт в Крыму",
      description:
        "Реальные кейсы, стоимость работ, разбор ошибок — читайте эксперты Владен.",
      url: "https://vladen-crimea.ru/blog",
    },
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam ?? "1"))
  const LIMIT = 12

  const response = await fetchArticles(page, LIMIT)
  const articles = response.data

  const hasMore = articles.length === LIMIT
  const hasPrev = page > 1

  const rubricCodes = Object.keys(RUBRIC_LABELS)

  return (
    <>
      <main className="min-h-screen bg-light">
        {/* Hero — bg-dark starts at top so transparent header stays readable (matches /about, /projects) */}
        <section className="bg-dark pt-32 pb-12 md:pb-16">
          <Container>
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-sm text-white/50 font-inter">
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    Главная
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white/80">Блог</li>
              </ol>
            </nav>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald font-bold text-white leading-tight">
              Блог Владен
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/60 font-inter max-w-xl">
              Реальные кейсы, стоимость работ, разбор ошибок клиентов и советы
              от команды строительной компании.
            </p>
          </Container>
        </section>

        {/* Rubric filters */}
        <section className="bg-dark/95 border-b border-white/10 py-3 sticky top-16 md:top-20 z-30">
          <Container>
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
              <Link
                href="/blog"
                className="shrink-0 px-4 py-1.5 rounded-full text-sm font-oswald font-medium bg-accent text-white transition-colors"
              >
                Все статьи
              </Link>
              {rubricCodes.map((code) => (
                <Link
                  key={code}
                  href={`/blog/category/${code}`}
                  className="shrink-0 px-4 py-1.5 rounded-full text-sm font-oswald font-medium border border-white/20 text-white/70 hover:border-accent hover:text-accent transition-colors"
                >
                  {RUBRIC_LABELS[code]}
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* Articles grid */}
        <section className="py-12 md:py-16">
          <Container>
            {articles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-text-muted font-inter text-lg">
                  Статьи скоро появятся. Следите за обновлениями.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <article
                    key={article.slug}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    {/* Rubric badge */}
                    <div className="px-5 pt-5 pb-0">
                      <Link
                        href={`/blog/category/${article.template_code}`}
                        className="inline-block text-xs font-oswald font-medium text-accent uppercase tracking-wide hover:underline"
                      >
                        {rubricLabel(article.template_code)}
                      </Link>
                    </div>

                    <div className="flex flex-col flex-1 px-5 pt-3 pb-5">
                      <h2 className="text-lg sm:text-xl font-oswald font-bold text-text-light leading-snug">
                        <Link
                          href={`/blog/${article.slug}`}
                          className="hover:text-accent transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h2>

                      {article.meta_description && (
                        <p className="mt-2 text-sm text-text-muted font-inter line-clamp-3">
                          {article.meta_description}
                        </p>
                      )}

                      <div className="mt-auto pt-4 flex items-center justify-between">
                        {article.published_at && (
                          <time
                            dateTime={article.published_at}
                            className="text-xs text-text-muted font-inter"
                          >
                            {new Date(article.published_at).toLocaleDateString("ru-RU", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </time>
                        )}
                        <Link
                          href={`/blog/${article.slug}`}
                          className="text-sm font-oswald font-medium text-accent hover:text-amber-600 transition-colors"
                          aria-label={`Читать статью: ${article.title}`}
                        >
                          Читать
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {(hasPrev || hasMore) && (
              <nav
                aria-label="Пагинация"
                className="mt-10 md:mt-14 flex justify-center gap-4"
              >
                {hasPrev && (
                  <Link
                    href={`/blog?page=${page - 1}`}
                    className="px-6 py-3 border-2 border-accent text-accent font-oswald font-medium rounded hover:bg-accent hover:text-white transition-all"
                  >
                    Назад
                  </Link>
                )}
                {hasMore && (
                  <Link
                    href={`/blog?page=${page + 1}`}
                    className="px-6 py-3 bg-accent text-white font-oswald font-medium rounded hover:bg-amber-600 transition-all"
                  >
                    Ещё статьи
                  </Link>
                )}
              </nav>
            )}
          </Container>
        </section>
      </main>
    </>
  )
}
