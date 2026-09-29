import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  type CalcData = { service?: string; area?: number; material?: string; total?: number };
  let body: { name?: string; phone?: string; calc?: CalcData; chat?: string; source?: string; consent_timestamp?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, phone, calc, chat, source } = body;
  if (typeof name !== "string" || typeof phone !== "string" || !name.trim() || !phone) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Basic phone validation
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 10) {
    return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    // Graceful fallback when env vars are not set (development)
    console.log(`[TELEGRAM MOCK] New lead: name=${name}, phone=${phone}`);
    return NextResponse.json({ ok: true });
  }

  // Экранируем спецсимволы HTML чтобы Telegram не сломал разметку
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const calcBlock = calc
    ? `\n\n📊 <b>Расчёт из калькулятора:</b>\n` +
      `   Вид работ: ${esc(calc.service ?? "")}\n` +
      `   Площадь: ${calc.area} м²\n` +
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

  const res = await fetch(
    `https://tg-proxy.radinuko.workers.dev/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Telegram error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
