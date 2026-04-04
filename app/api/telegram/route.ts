import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Origin check
  const origin = request.headers.get("origin");
  const allowedOrigin = process.env.ALLOWED_ORIGIN ?? "";
  if (allowedOrigin && origin !== allowedOrigin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { name?: string; phone?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, phone } = body;
  if (!name || !phone) {
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

  const text =
    `🏗 Новая заявка с сайта ВЛАДЕН\n\n` +
    `👤 Имя: ${name}\n` +
    `📞 Телефон: ${phone}\n` +
    `🕐 Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`;

  const res = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
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
