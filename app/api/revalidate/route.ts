/**
 * POST /api/revalidate
 *
 * Вебхук от движка автоблогов: сбрасывает ISR-кэш для статьи и /blog.
 * Контракт: секрет в заголовке x-revalidate-secret, тело { slug?: string, type?: string }.
 *
 * Принимает ТОЛЬКО POST. Защита — timingSafeEqual сравнение секрета.
 */

import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { timingSafeEqual } from "node:crypto"

const EXPECTED_SECRET = process.env.BLOG_REVALIDATE_SECRET ?? ""

function safeCompare(a: string, b: string): boolean {
  if (!a || !b) return false
  try {
    const bufA = Buffer.from(a)
    const bufB = Buffer.from(b)
    if (bufA.length !== bufB.length) {
      // Constant-time check even if lengths differ (avoid timing oracle)
      timingSafeEqual(bufA, Buffer.alloc(bufA.length))
      return false
    }
    return timingSafeEqual(bufA, bufB)
  } catch {
    return false
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const headerSecret = req.headers.get("x-revalidate-secret") ?? ""

  if (!safeCompare(headerSecret, EXPECTED_SECRET)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { slug?: string; type?: string }

  try {
    body = (await req.json()) as { slug?: string; type?: string }
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  revalidatePath("/blog", "page")
  revalidatePath("/sitemap.xml")

  if (body.slug) {
    revalidatePath(`/blog/${body.slug}`, "page")
  }

  return NextResponse.json({ revalidated: true, slug: body.slug ?? null })
}

// Block all non-POST methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
