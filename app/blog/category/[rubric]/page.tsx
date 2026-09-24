import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Container from "@/components/ui/Container"
import { fetchArticles, rubricLabel, RUBRIC_LABELS } from "@/lib/blog"

export const revalidate = 3600

type Props = { params: Promise<{ rubric: string }> }

export function generateStaticParams() {
  return Object.keys(RUBRIC_LABELS).map((code) => ({ rubric: code }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { rubric } = await params
  const label = RUBRIC_LABELS[rubric]
  if (!label) return { title: "Рубрика не найдена | Владен" }

  // Если в рубрике нет опубликованных статей — noindex (МПК-риск)
  const res = await fetchArticles(1, 100)
  const hasArticles = res.data.some(
    (a) => a.template_code === rubric && a.published_at
  )

  return {
    title: `${label} — блог Владен`,
    description: `Статьи Владен по теме «${label}»: реальные кейсы, советы и полезная информация о строительстве и ремонте в Крыму.`,
    alternates: { canonical: `https://vladen-crimea.ru/blog/category/${rubric}` },
    robots: hasArticles ? undefined : { index: false, follow: true },
    openGraph: {
      title: `${label} — Владен`,
      url: `https://vladen-crimea.ru/blog/category/${rubric}`,
    },
  }
}

export default async function RubricPage({ params }: Props) {
  const { rubric } = await params

  if (!RUBRIC_LABELS[rubric]) notFound()

  const label = rubricLabel(rubric)

  // Fetch all articles and filter by template_code client-side
  // (API doesn't have rubric filter yet — this works for typical volume)
  const response = await fetchArticles(1, 100)
  const articles = response.data.filter((a) => a.template_code === rubric)

  const rubricCodes = Object.keys(RUBRIC_LABELS)

  return (
    <>
      <main className="min-h-screen bg-light">
        {/* Hero — bg-dark starts at top so transparent header stays readable (matches /about, /projects) */}
        <section className="bg-dark pt-32 pb-12 md:pb-16">
          <Container>
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
                <li className="text-white/80" aria-current="page">
                  {label}
                </li>
              </ol>
            </nav>
            <p className="text-sm font-oswald font-medium text-accent uppercase tracking-wide mb-3">
              Рубрика
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald font-bold text-white leading-tight">
              {label}
            </h1>
          </Container>
        </section>

        {/* Rubric nav */}
        <section className="bg-dark/95 border-b border-white/10 py-3 sticky top-16 md:top-20 z-30">
          <Container>
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
              <Link
                href="/blog"
                className="shrink-0 px-4 py-1.5 rounded-full text-sm font-oswald font-medium border border-white/20 text-white/70 hover:border-accent hover:text-accent transition-colors"
              >
                Все статьи
              </Link>
              {rubricCodes.map((code) => (
                <Link
                  key={code}
                  href={`/blog/category/${code}`}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-oswald font-medium transition-colors ${
                    code === rubric
                      ? "bg-accent text-white"
                      : "border border-white/20 text-white/70 hover:border-accent hover:text-accent"
                  }`}
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
                <p className="text-text-muted font-inter text-lg mb-6">
                  В этой рубрике пока нет статей. Загляните позже.
                </p>
                <Link
                  href="/blog"
                  className="inline-block px-6 py-3 bg-accent text-white font-oswald font-medium rounded hover:bg-amber-600 transition-all"
                >
                  Все статьи
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <article
                    key={article.slug}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="flex flex-col flex-1 px-5 py-5">
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
          </Container>
        </section>
      </main>
    </>
  )
}
