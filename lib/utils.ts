import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Сериализует объект в JSON для <script type="application/ld+json">.
 * Экранирует < > & чтобы </script> в данных не нарушал HTML-парсинг.
 * Используй везде вместо JSON.stringify в dangerouslySetInnerHTML.
 */
export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
}
