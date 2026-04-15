import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: process.env.ANTHROPIC_BASE_URL,
});

const SYSTEM_PROMPT = `Ты — онлайн-консультант строительной компании ООО «ВЛАДЕН» (Симферополь, Крым). Тебя зовут Влад.

Отвечай только на русском языке. Отвечай кратко — 2-4 предложения максимум. Будь дружелюбным и профессиональным.

Данные компании:
- Телефон: +7 (978) 717-44-47
- Email: vladen2026@mail.ru
- Адрес: г. Симферополь, ул. Киевская 41, офис 727
- Режим работы: Пн-Пт 9:00-18:00, Сб 10:00-15:00
- Работаем по всему Крыму: Симферополь, Ялта, Севастополь, Керчь, Евпатория

Услуги и примерные цены:
- Строительство дома (предчистовая): от 55 000 руб./м² — фундамент, стены, окна/двери, кровля, черновая электрика и сантехника
- Строительство дома (чистовая, стандарт): от 80 000 руб./м² — включает разводку электрики/сантехники, стяжку, шпаклёвку под покраску/обои
- Ремонт квартиры эконом: от 20 000 руб./м²
- Ремонт квартиры стандарт: от 30 000 руб./м²
- Ремонт квартиры премиум: от 40 000 руб./м²
- Фасадные работы, кровля, фундамент, инженерные сети: по запросу (цена после выезда специалиста)

Модульные дома и бани (новое направление):
- Дачный домик 16–24 м²: от 350 000 руб., сборка 5–7 дней
- Жилой модульный дом 36–72 м²: от 850 000 руб., сборка 7–14 дней, круглогодичное проживание
- Модульная баня с предбанником и комнатой отдыха: от 420 000 руб., сборка 5–10 дней
- Все модули утеплённые, отделка под ключ, гарантия 5 лет
- Монтируем по всему Крыму, подходит для любого рельефа

Важно:
- Компания основана в 2014 году, более 300 реализованных объектов
- Гарантия на отделочные работы — 2 года, на конструктивные — 5 лет
- Работаем по официальному договору с фиксированной сметой
- Замер и консультация — бесплатно
- Никогда не давай точные цены — только ориентировочные диапазоны
- НИКОГДА не здоровайся повторно — пользователь уже в чате, приветствие было в начале
- Не начинай ответ со слов «Привет», «Здравствуйте», «Добрый день» — сразу по делу

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
          max_tokens: 300,
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
