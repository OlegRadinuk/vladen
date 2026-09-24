/**
 * blog.ts — клиент публичного API движка автоблогов
 *
 * Env (серверные, без NEXT_PUBLIC):
 *   BLOG_API_URL            — базовый URL движка, напр. https://blog-engine.optisphere.tech
 *   BLOG_API_TOKEN          — Bearer-токен сайта «vladen» из таблицы sites.api_token
 *   BLOG_REVALIDATE_SECRET  — секрет для POST /api/revalidate от движка
 *
 * При недоступном движке возвращаем пустые данные / null — сайт НЕ падает.
 */

import { remark } from "remark"
import remarkHtml from "remark-html"
import sanitizeHtml from "sanitize-html"

const BLOG_API_URL = process.env.BLOG_API_URL ?? ""
const BLOG_API_TOKEN = process.env.BLOG_API_TOKEN ?? ""
const SITE_SLUG = "vladen"
const TIMEOUT_MS = 5000

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ArticleListItem {
  id: number
  slug: string
  title: string
  meta_title: string
  meta_description: string
  h1: string
  published_at: string | null
  updated_at: string
  template_code: string
  target_query: string
}

export interface ArticleFull extends ArticleListItem {
  author: { name: string; url: string | null }
  body_html: string
  body_md: string
  toc: Array<{ level: number; text: string; id: string }>
  faq: Array<{ q: string; a: string }>
  schema_org: Record<string, unknown>
  hero_image: { url: string; alt: string; caption: string } | null
  images: Array<{ url: string; alt: string; caption: string }>
  internal_links: Array<{ anchor: string; target: string }>
  cta: { text: string; url: string }
}

interface ArticlesPageResponse {
  site: string
  page: number
  limit: number
  data: ArticleListItem[]
}

// ─── Internal fetch helper ────────────────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T | null> {
  if (!BLOG_API_URL || !BLOG_API_TOKEN) return null

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(`${BLOG_API_URL}${path}`, {
      headers: { Authorization: `Bearer ${BLOG_API_TOKEN}` },
      signal: controller.signal,
      next: { revalidate: 3600 },
    })
    clearTimeout(timer)
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    clearTimeout(timer)
    return null
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Получить список опубликованных статей (страница, до 100 за раз). */
export async function fetchArticles(
  page = 1,
  limit = 20
): Promise<ArticlesPageResponse> {
  const data = await apiFetch<ArticlesPageResponse>(
    `/api/public/${SITE_SLUG}/articles?page=${page}&limit=${limit}`
  )
  return data ?? { site: SITE_SLUG, page, limit, data: [] }
}

/** Получить полную статью по slug. null при недоступном движке → 404. */
export async function fetchArticle(slug: string): Promise<ArticleFull | null> {
  return apiFetch<ArticleFull>(`/api/public/${SITE_SLUG}/articles/${slug}`)
}

// ─── Markdown → safe HTML ────────────────────────────────────────────────────

const ALLOWED_TAGS = [
  "h1","h2","h3","h4","h5","h6",
  "p","br","ul","ol","li","blockquote","pre","code",
  "strong","em","s","a","img","figure","figcaption",
  "table","thead","tbody","tr","th","td",
]

const ALLOWED_ATTRS: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "title", "rel", "target"],
  img: ["src", "alt", "title", "width", "height"],
  "*": ["id", "class"],
}

/**
 * Предварительная обработка Markdown перед рендером:
 * 1. Удаляет ведущий H1 (страница сама рисует H1 в hero)
 * 2. Оставшиеся H1 («# »)  понижает до H2
 * 3. Если hasFaq=true И заголовок с «вопрос» стоит последним или предпоследним H2 —
 *    вырезает inline-раздел FAQ (аккордеон покажет faq_json). Строгая эвристика:
 *    случайный H2 «Что ответить на частый вопрос…» в середине статьи НЕ трогаем.
 * 4. Вырезает хвостовой раздел-CTA (ContactCTA заменяет его)
 */
function preprocessMd(md: string, { hasFaq }: { hasFaq: boolean }): string {
  let lines = md.split("\n")

  // 1. Удалить ведущий H1 (первая строка вида «# …»)
  const firstH1 = lines.findIndex((l) => /^# /.test(l))
  if (firstH1 !== -1) {
    lines.splice(firstH1, 1)
    // Удалить пустую строку сразу после H1
    if (firstH1 < lines.length && lines[firstH1].trim() === "") {
      lines.splice(firstH1, 1)
    }
  }

  // 2. Оставшиеся H1 → H2
  lines = lines.map((l) => (/^# (?!#)/.test(l) ? l.replace(/^# /, "## ") : l))

  // 3. Вырезать inline FAQ-секцию — только если это последний или предпоследний H2
  //    (иначе рискуем срезать пол-статьи, если «вопрос» встречается в середине).
  if (hasFaq) {
    const h2Indices: number[] = []
    lines.forEach((l, i) => { if (/^## /.test(l)) h2Indices.push(i) })
    if (h2Indices.length >= 1) {
      // Кандидаты — только два последних H2
      const candidates = h2Indices.slice(-2)
      const faqH2Idx = candidates.find((i) => /^## .*вопрос/i.test(lines[i]))
      if (faqH2Idx !== undefined) {
        // Всё до следующего H2 (или до конца документа) — вырезать
        const positionInAll = h2Indices.indexOf(faqH2Idx)
        const nextH2 = h2Indices[positionInAll + 1] ?? lines.length
        lines.splice(faqH2Idx, nextH2 - faqH2Idx)
      }
    }
  }

  // 4. Вырезать хвостовой CTA-раздел (ContactCTA его заменяет)
  const ctaRe = /^## .*(рассчитай|запис(ьт|ьс)|заявк|обсуди|свяжи|стоимость вашего|получи(те)? консульт)/i
  let ctaIdx = -1
  for (let i = lines.length - 1; i >= 0; i--) {
    if (ctaRe.test(lines[i])) { ctaIdx = i; break }
  }
  if (ctaIdx !== -1) lines.splice(ctaIdx)

  return lines.join("\n")
}

/**
 * Рендерит Markdown в безопасный HTML.
 * Применяет preprocessMd перед remark — страница всегда имеет ровно один H1.
 */
export async function mdToSafeHtml(
  markdown: string,
  opts: { hasFaq?: boolean } = {}
): Promise<string> {
  const cleaned = preprocessMd(markdown, { hasFaq: opts.hasFaq ?? false })
  const file = await remark().use(remarkHtml, { sanitize: false }).process(cleaned)
  return sanitizeHtml(String(file), {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRS,
    allowedSchemes: ["https", "http", "mailto", "tel"],
    // Относительные ссылки (внутренние) сохраняются как есть; внешние — с rel="noopener noreferrer" и target="_blank"
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? ""
        const isExternal = /^https?:\/\//i.test(href) &&
          !/^https?:\/\/(www\.)?vladen-crimea\.ru(\/|$)/i.test(href)
        if (isExternal) {
          return {
            tagName,
            attribs: {
              ...attribs,
              rel: "noopener noreferrer nofollow",
              target: "_blank",
            },
          }
        }
        // Внутренние — удаляем target/rel если движок их поставил
        const rest: Record<string, string> = {}
        for (const k of Object.keys(attribs)) {
          if (k !== "target" && k !== "rel") rest[k] = attribs[k]
        }
        return { tagName, attribs: rest }
      },
    },
  })
}

// ─── Rubric (category) helpers ────────────────────────────────────────────────

export const RUBRIC_LABELS: Record<string, string> = {
  case_story: "Наши объекты",
  how_much: "Стоимость работ",
  guide: "Руководства",
  client_mistakes: "Ошибки клиентов",
  news_comment: "Новости отрасли",
}

export function rubricLabel(code: string): string {
  return RUBRIC_LABELS[code] ?? "Статьи"
}
