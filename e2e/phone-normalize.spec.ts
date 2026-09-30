/**
 * Таблица кейсов для маски телефона (lib/phone.ts) — чистая функция, браузер не нужен.
 *
 * Регрессия: после фокуса в поле стоит «+7 », человек набирает «89781234567» —
 * раньше уходило «+7 (897) 812-34-56» (искажённый номер проходил валидацию).
 *
 * Run: npx playwright test e2e/phone-normalize.spec.ts
 */

import { test, expect } from "playwright/test";
import { isValidRuPhone, normalizeRuPhoneInput } from "../lib/phone";

const FULL = "+7 (978) 123-45-67";

/** Посимвольный набор в поле, где после фокуса уже стоит «+7 ». */
function typeInto(start: string, keys: string): string {
  let value = start;
  for (const ch of keys) value = normalizeRuPhoneInput(value + ch, value);
  return value;
}

/** Backspace в конце поля n раз. */
function backspace(value: string, n = 1): string {
  let v = value;
  for (let i = 0; i < n; i++) v = normalizeRuPhoneInput(v.slice(0, -1), v);
  return v;
}

test.describe("набор с клавиатуры (в поле стоит «+7 »)", () => {
  const cases: [string, string][] = [
    ["89781234567", FULL],
    ["79781234567", FULL],
    ["9781234567", FULL],
    ["8692123456", "+7 (869) 212-34-56"], // Севастополь, код на 8 — не трогаем
    ["8001234567", "+7 (800) 123-45-67"],
    ["8121234567", "+7 (812) 123-45-67"],
    ["88001234567", "+7 (800) 123-45-67"], // 8 800 … с «восьмёркой» впереди
    ["88692123456", "+7 (869) 212-34-56"],
    ["978123", "+7 (978) 123-"],
    ["8978", "+7 (897) 8"], // пока цифр мало — не гадаем, исправится на 11-й
  ];
  for (const [keys, expected] of cases) {
    test(`${keys} → ${expected}`, () => {
      expect(typeInto("+7 ", keys)).toBe(expected);
    });
  }

  test("лишняя цифра после полного номера игнорируется", () => {
    expect(typeInto("+7 ", "97812345675")).toBe(FULL);
    expect(typeInto("+7 ", "80012345675")).toBe("+7 (800) 123-45-67");
    expect(typeInto("+7 ", "86921234565")).toBe("+7 (869) 212-34-56");
  });
});

test.describe("вставка (paste) полного номера", () => {
  const pasted = [
    "+7 (978) 123-45-67",
    "8 978 123 45 67",
    "8 (978) 123-45-67",
    "7 978 123 45 67",
    "+79781234567",
    "89781234567",
    "79781234567",
    "9781234567",
    "978-123-45-67",
  ];
  for (const p of pasted) {
    test(`в поле с «+7 »: ${p}`, () => {
      expect(normalizeRuPhoneInput("+7 " + p, "+7 ")).toBe(FULL);
    });
    test(`с заменой всего значения: ${p}`, () => {
      expect(normalizeRuPhoneInput(p, "+7 ")).toBe(FULL);
      expect(normalizeRuPhoneInput(p, "")).toBe(FULL);
    });
  }
});

test.describe("удаление (Backspace)", () => {
  test("полный номер стирается до префикса без залипания на разделителях", () => {
    const steps: string[] = [];
    let v = FULL;
    for (let i = 0; i < 10; i++) {
      v = backspace(v);
      steps.push(v);
    }
    expect(steps).toEqual([
      "+7 (978) 123-45-6",
      "+7 (978) 123-45-",
      "+7 (978) 123-4",
      "+7 (978) 123-",
      "+7 (978) 12",
      "+7 (978) 1",
      "+7 (978) ",
      "+7 (97",
      "+7 (9",
      "+7",
    ]);
  });

  test("после удаления можно допечатать номер заново", () => {
    const v = backspace(FULL, 4); // "+7 (978) 123-"
    expect(typeInto(v, "9988")).toBe("+7 (978) 123-99-88");
  });

  test("пустое значение → префикс", () => {
    expect(normalizeRuPhoneInput("", "+7")).toBe("+7");
  });
});

test("валидация: нужен полный номер (10 национальных цифр)", () => {
  expect(isValidRuPhone(FULL)).toBe(true);
  expect(isValidRuPhone("+7 (978) 123-45-6")).toBe(false);
  expect(isValidRuPhone("+7 ")).toBe(false);
});
