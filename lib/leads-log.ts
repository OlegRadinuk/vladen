import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Резервный журнал заявок (JSON Lines). Пишется ДО отправки в Telegram,
 * чтобы заявка не терялась при сбое доставки.
 *
 * Путь: env LEADS_LOG_PATH (абсолютный). По умолчанию:
 *  - production: /var/www/vladen/data/leads.jsonl (вне .next/standalone — тот стирается при сборке)
 *  - dev:        ./data/leads.jsonl
 *
 * Файл содержит ПД (152-ФЗ) → mode 0o600, каталог 0o700, в git не попадает (data/ в .gitignore).
 */
export function leadsLogPath(): string {
  const fromEnv = process.env.LEADS_LOG_PATH?.trim();
  if (fromEnv) return fromEnv;
  return process.env.NODE_ENV === "production"
    ? "/var/www/vladen/data/leads.jsonl"
    : path.join(process.cwd(), "data", "leads.jsonl");
}

export type LeadReceived = {
  event: "received";
  id: string;
  ts: string;
  source: string | null;
  name: string;
  phone: string;
  page: string | null;
  consent_timestamp: string | null;
  ua: string | null;
  ip: string | null;
  calc?: unknown;
  chat?: string;
};

export type LeadOutcome = {
  event: "delivered" | "failed";
  id: string;
  ts: string;
  status?: number;
  error?: string;
};

/** Дописывает одну строку. Никогда не бросает — ошибка только в console.error (без ПД). */
export async function appendLeadLog(entry: LeadReceived | LeadOutcome): Promise<boolean> {
  const file = leadsLogPath();
  try {
    await mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
    await appendFile(file, JSON.stringify(entry) + "\n", { encoding: "utf8", mode: 0o600 });
    return true;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code ?? "unknown";
    console.error("[LEAD] leads log write failed", entry.id, entry.event, code);
    return false;
  }
}
