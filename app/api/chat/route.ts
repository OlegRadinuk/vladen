import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.text();

  const res = await fetch("http://optisphere.tech/api/bots/vlad/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  if (!res.ok) {
    return new Response("Произошла ошибка. Позвоните нам напрямую: +7 (978) 717-44-47", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(res.body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "Transfer-Encoding": "chunked",
    },
  });
}
