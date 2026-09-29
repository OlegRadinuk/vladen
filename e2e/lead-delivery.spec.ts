/**
 * E2E — заявка не должна «успешно» теряться (инцидент 07.09.2026).
 * /api/telegram мокается → 500/502; UI обязан показать ошибку с телефоном,
 * не показывать «успех» и не ставить цель Метрики form_submit.
 *
 * Run: npx playwright test e2e/lead-delivery.spec.ts  (сервер на :3000)
 */

import { test, expect } from "./fixtures";
import type { Page } from "playwright/test";

const PHONE_DISPLAY = "+7 (978) 456-41-56";

async function stubYm(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __ymCalls: unknown[][]; ym: (...a: unknown[]) => void };
    w.__ymCalls = [];
    Object.defineProperty(window, "ym", {
      configurable: true,
      get: () => (...args: unknown[]) => w.__ymCalls.push(args),
      set: () => {},
    });
  });
}

test("L-1: contacts form — API 500 shows error with phone, no success, no form_submit goal", async ({ page }) => {
  await stubYm(page);
  let apiHits = 0;
  await page.route("**/api/telegram", (route) => {
    apiHits++;
    return route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, error: "delivery_unavailable" }),
    });
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  const section = page.locator("#contacts");
  await section.scrollIntoViewIfNeeded();

  await section.getByPlaceholder("Иван Иванов").fill("Тест Тестов");
  await section.locator('input[type="tel"]').click();
  await section.locator('input[type="tel"]').pressSequentially("9781234567");
  await section.locator('input[type="checkbox"]').check();
  await section.locator('button[type="submit"]').click();

  const err = section.getByTestId("contacts-error");
  await expect(err).toBeVisible();
  await expect(err).toContainText(PHONE_DISPLAY);
  await expect(err.locator('a[href^="tel:"]')).toBeVisible();
  expect(apiHits).toBe(1);

  // Форма не сменилась на экран «спасибо» — поля на месте, введённые данные не стёрты
  await expect(section.getByPlaceholder("Иван Иванов")).toHaveValue("Тест Тестов");

  const ymCalls = await page.evaluate(() => (window as unknown as { __ymCalls: unknown[][] }).__ymCalls);
  expect(ymCalls.some((c) => c[1] === "reachGoal" && c[2] === "form_submit")).toBe(false);
});

test("L-2: chat phone prompt — API 502 shows 'Не получилось отправить номер' with phone", async ({ page }) => {
  await stubYm(page);
  await page.route("**/api/telegram", (route) =>
    route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, error: "delivery_failed" }),
    })
  );
  // lookbook-режим не должен открывать PDF при сбое
  const popups: string[] = [];
  page.on("popup", (p) => popups.push(p.url()));

  await page.goto("/", { waitUntil: "domcontentloaded" });
  // Открываем чат сразу с формой номера (как кнопка «Забрать лукбук у Влада»)
  await page.waitForFunction(() => document.readyState !== "loading");
  await expect(async () => {
    await page.evaluate(() =>
      window.dispatchEvent(new CustomEvent("vlad:open", { detail: { intent: "lookbook" } }))
    );
    await expect(page.getByPlaceholder("Ваше имя")).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 15000 });

  await page.getByPlaceholder("Ваше имя").fill("Тест");
  await page.getByPlaceholder("+7 (___) ___-__-__").fill("+7 978 123 45 67");
  const prompt = page.getByPlaceholder("Ваше имя").locator("xpath=..");
  await prompt.locator('input[type="checkbox"]').check();
  await page.getByRole("button", { name: "Получить лукбук" }).click();

  await expect(page.getByText(/Не получилось отправить номер/)).toBeVisible();
  await expect(page.getByText(new RegExp(`Позвоните нам: ${PHONE_DISPLAY.replace(/[()+]/g, "\\$&")}`)).first()).toBeVisible();
  // Нет «успешного» ответа и форма осталась для повтора
  await expect(page.getByText(/Лукбук открылся/)).toHaveCount(0);
  await expect(page.getByPlaceholder("Ваше имя")).toBeVisible();
  expect(popups).toHaveLength(0);
});
