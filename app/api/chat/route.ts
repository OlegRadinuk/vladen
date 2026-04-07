import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Ты — онлайн-консультант строительной компании ООО «ВЛАДЕН» (Симферополь, Крым). Тебя зовут Влад.

Отвечай только на русском языке. Отвечай кратко — 2-4 предложения максимум. Будь дружелюбным и профессиональным.

Данные компании:
- Телефон: +7 (978) 717-44-47
- Email: vladen2026@mail.ru
- Адрес: г. Симферополь, ул. Киевская 41, офис 727
- Режим работы: Пн-Пт 9:00-18:00, Сб 10:00-15:00
- Работаем по всему Крыму: Симферополь, Ялта, Севастополь, Керчь, Евпатория

Услуги и примерные цены:
- Черновой ремонт квартиры: от 4 500 руб./м²
- Чистовой ремонт квартиры: от 7 000 руб./м²
- Дизайнерский ремонт: от 12 000 руб./м²
- Дизайн-проект интерьера: по запросу (выезд бесплатно)
- Строительство дома под ключ: по запросу
- Фасадные работы, кровля, фундамент, инженерные сети: по запросу

Важно:
- Компания основана в 2014 году, более 300 реализованных объектов
- Гарантия на отделочные работы — 2 года, на конструктивные — 5 лет
- Работаем по официальному договору с фиксированной сметой
- Замер и консультация — бесплатно
- Никогда не давай точные цены — только ориентировочные диапазоны

Если клиент интересуется конкретным проектом или хочет узнать точную стоимость — предложи оставить номер телефона для бесплатного замера.`;

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowedOrigin = process.env.ALLOWED_ORIGIN ?? "";
  if (allowedOrigin && origin !== allowedOrigin) {
    return new Response("Forbidden", { status: 403 });
  }

  let body: { messages: { role: "user" | "assistant"; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await client.messages.stream({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 512,
          system: SYSTEM_PROMPT,
          messages: body.messages,
        });

        for await (const chunk of response) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
      } catch (err) {
        console.error("[chat route error]", err);
        controller.enqueue(encoder.encode("Произошла ошибка. Позвоните нам напрямую: +7 (978) 717-44-47"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
    },
  });
}
