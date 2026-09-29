import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { appendLeadLog } from "@/lib/leads-log";

const DEFAULT_TG_API_BASE = "https://tg-proxy.radinuko.workers.dev";
const TG_TIMEOUT_MS = 10_000;
const TG_RETRY_DELAY_MS = 1_500;

/** База API Telegram (реле). Принимает варианты "https://host", "https://host/", "https://host/bot". */
function telegramApiBase(): string {
  const raw = process.env.TELEGRAM_API_BASE?.trim() || DEFAULT_TG_API_BASE;
  return raw.replace(/\/+$/, "").replace(/\/bot$/, "");
}

type SendResult =
  | { ok: true; status: number }
  | { ok: false; status?: number; error: string; retryable: boolean };

type CalcData = { service?: string; area?: number; material?: string; total?: number };

/** calc приходит с клиента (localStorage): оставляем только известные поля нужных типов с лимитами.
 *  Иначе произвольный объект до 1 МБ уходит в журнал, а не-строка в service роняет esc(). */
function sanitizeCalc(raw: unknown): CalcData | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const r = raw as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.slice(0, 100) : undefined);
  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
  const out: CalcData = { service: str(r.service), area: num(r.area), material: str(r.material), total: num(r.total) };
  return Object.values(out).some((v) => v !== undefined) ? out : undefined;
}

/** Одна попытка отправки. Никогда не бросает; в error — только безопасное описание (без URL с токеном). */
async function sendOnce(url: string, payload: string): Promise<SendResult> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      signal: AbortSignal.timeout(TG_TIMEOUT_MS),
      cache: "no-store",
    });
    if (res.ok) return { ok: true, status: res.status };
    let description = `http_${res.status}`;
    try {
      const data = (await res.json()) as { description?: unknown };
      if (typeof data.description === "string") description = data.description.slice(0, 300);
    } catch {
      // тело не JSON (например, HTML-ошибка реле) — оставляем http_<status>
    }
    return { ok: false, status: res.status, error: description, retryable: res.status >= 500 };
  } catch (err) {
    const e = err as { name?: string; cause?: { code?: string } };
    const error =
      e?.name === "TimeoutError" || e?.name === "AbortError"
        ? "timeout"
        : `network:${e?.cause?.code ?? e?.name ?? "unknown"}`;
    return { ok: false, error, retryable: true };
  }
}

export async function POST(request: NextRequest) {
  let body: { name?: string; phone?: string; calc?: unknown; chat?: string; source?: string; consent_timestamp?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, phone, chat, source, consent_timestamp } = body;
  const calc = sanitizeCalc(body.calc);
  if (typeof name !== "string" || typeof phone !== "string" || !name.trim() || !phone) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Basic phone validation
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 10) {
    return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
  }

  const id = randomUUID();
  const headers = request.headers;
  // Только для журнала. X-Real-IP ставит nginx ($remote_addr); первый элемент X-Forwarded-For
  // подделывается клиентом (nginx лишь дописывает в конец через $proxy_add_x_forwarded_for).
  const ip =
    headers.get("x-real-ip")?.trim().slice(0, 64) ||
    headers.get("x-forwarded-for")?.split(",").pop()?.trim().slice(0, 64) ||
    null;

  // 1. Резервная копия ДО любой попытки доставки (ПД — только в файл 0600, не в console).
  //    Сбой записи не блокирует отправку в Telegram.
  await appendLeadLog({
    event: "received",
    id,
    ts: new Date().toISOString(),
    source: typeof source === "string" && source.trim() ? source.trim().slice(0, 64) : null,
    name: name.trim().slice(0, 200),
    phone: phone.slice(0, 40),
    page: headers.get("referer")?.slice(0, 500) ?? null,
    consent_timestamp: typeof consent_timestamp === "string" ? consent_timestamp.slice(0, 40) : null,
    ua: headers.get("user-agent")?.slice(0, 300) ?? null,
    ip,
    ...(calc ? { calc } : {}),
    ...(typeof chat === "string" && chat ? { chat: chat.slice(0, 8000) } : {}),
  });

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    if (process.env.NODE_ENV !== "production") {
      // dev без env: имитация доставки (заявка всё равно лежит в data/leads.jsonl)
      console.log("[TELEGRAM MOCK] lead", id);
      await appendLeadLog({ event: "delivered", id, ts: new Date().toISOString(), error: "mock" });
      return NextResponse.json({ ok: true, id });
    }
    // prod без env: НЕ врём клиенту «успехом» — форма покажет ошибку с телефоном
    console.error("[LEAD] TELEGRAM env missing", id);
    await appendLeadLog({ event: "failed", id, ts: new Date().toISOString(), error: "env_missing" });
    return NextResponse.json({ ok: false, error: "delivery_unavailable" }, { status: 500 });
  }

  // Экранируем спецсимволы HTML чтобы Telegram не сломал разметку
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const calcBlock = calc
    ? `\n\n📊 <b>Расчёт из калькулятора:</b>\n` +
      `   Вид работ: ${esc(calc.service ?? "")}\n` +
      `   Площадь: ${calc.area ?? "—"} м²\n` +
      `   Материалы: ${esc(calc.material ?? "")}\n` +
      `   Ориентир. стоимость: от ${new Intl.NumberFormat("ru-RU").format(calc.total ?? 0)} ₽`
    : "";

  // Telegram limit ~4096 chars; резервируем ~300 на шапку — остаток на чат
  // Срез после esc мог разрезать сущность (&am…) → Telegram отклонял всё сообщение; хвост-обрубок убираем
  const chatBlock = typeof chat === "string" && chat
    ? `\n\n💬 <b>Переписка с ИИ-консультантом:</b>\n<blockquote>${esc(chat).slice(0, 3700).replace(/&[a-z]*$/, "")}</blockquote>`
    : "";

  // source приходит с клиента: только строка, режем длину ДО экранирования (иначе можно разрезать &amp;)
  const sourceBlock =
    typeof source === "string" && source.trim()
      ? `\n🔖 Источник: ${esc(source.trim().slice(0, 64))}`
      : "";

  const text =
    `🏗 <b>Новая заявка с сайта ВЛАДЕН</b>\n\n` +
    `👤 Имя: ${esc(name.trim().slice(0, 200))}\n` +
    `📞 Телефон: ${esc(phone.slice(0, 40))}` +
    sourceBlock +
    calcBlock +
    chatBlock +
    `\n\n🕐 ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`;

  const url = `${telegramApiBase()}/bot${botToken}/sendMessage`;
  const payload = JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" });

  // 2. Отправка: таймаут 10 с, один повтор при сетевой ошибке/таймауте/5xx через 1.5 с
  let result = await sendOnce(url, payload);
  if (!result.ok && result.retryable) {
    await new Promise((r) => setTimeout(r, TG_RETRY_DELAY_MS));
    result = await sendOnce(url, payload);
  }

  if (!result.ok) {
    console.error("[LEAD] telegram failed", id, result.status ?? "-", result.error);
    await appendLeadLog({
      event: "failed",
      id,
      ts: new Date().toISOString(),
      ...(result.status ? { status: result.status } : {}),
      error: result.error,
    });
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  await appendLeadLog({ event: "delivered", id, ts: new Date().toISOString(), status: result.status });
  return NextResponse.json({ ok: true, id });
}
