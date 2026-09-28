import { NextRequest } from "next/server";
import { PHONE_DISPLAY } from "@/lib/company";

export async function POST(request: NextRequest) {
  const body = await request.text();

  const res = await fetch("https://optisphere.tech/api/bots/vlad/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  if (!res.ok) {
    return new Response(`Произошла ошибка. Позвоните нам напрямую: ${PHONE_DISPLAY}`, {
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
