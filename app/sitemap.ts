import { MetadataRoute } from "next"
import { projects } from "@/lib/projects"
import { fetchArticles, RUBRIC_LABELS } from "@/lib/blog"

const BASE_URL = "https://vladen-crimea.ru"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/avtorskiy-nadzor`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/modular`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contacts`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectPages,
  ]

  // Blog articles — при недоступном движке возвращаем пустой список (fetchArticles не бросает)
  let publishedArticles: Awaited<ReturnType<typeof fetchArticles>>["data"] = []
  try {
    const res = await fetchArticles(1, 100)
    publishedArticles = res.data.filter((a) => a.published_at)
  } catch {
    // движок недоступен — sitemap без статей, не падаем
  }

  // /blog в sitemap — только если есть хотя бы одна опубликованная статья (МПК-риск)
  const blogIndexRoute: MetadataRoute.Sitemap = publishedArticles.length > 0
    ? [{
        url: `${BASE_URL}/blog`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }]
    : []

  // Рубрика в sitemap — только если в ней есть хотя бы одна опубликованная статья
  const rubricsWithArticles = new Set(publishedArticles.map((a) => a.template_code))
  const rubricRoutes: MetadataRoute.Sitemap = Object.keys(RUBRIC_LABELS)
    .filter((code) => rubricsWithArticles.has(code))
    .map((code) => ({
      url: `${BASE_URL}/blog/category/${code}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))

  // Дедуп статей по URL (страховка от битых slug движка)
  const seen = new Set<string>()
  const blogRoutes: MetadataRoute.Sitemap = publishedArticles
    .filter((a) => {
      const url = `${BASE_URL}/blog/${a.slug}`
      if (seen.has(url)) return false
      seen.add(url)
      return true
    })
    .map((a) => ({
      url: `${BASE_URL}/blog/${a.slug}`,
      lastModified: new Date(a.updated_at ?? a.published_at!),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

  return [...staticRoutes, ...blogIndexRoute, ...rubricRoutes, ...blogRoutes]
}
