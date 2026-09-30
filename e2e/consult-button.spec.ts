/**
 * E2E — кнопка «Получить консультацию» в шапке открывает модалку с формой
 * на ЛЮБОЙ странице (раньше скроллила к #contacts и на /blog ничего не делала).
 *
 * 1440 — кнопка в шапке; 375 — через бургер-меню.
 * Проверяем: модалка видна (role=dialog, aria-modal), фокус в поле имени,
 * Esc закрывает и возвращает фокус; клик по подложке закрывает;
 * отправка → мок /api/telegram 200 → успех, тело с source "consult-modal";
 * мок 502 → ошибка с телефоном. /api/telegram ВСЕГДА замокан — реальные заявки не уходят.
 *
 * Run: npx playwright test e2e/consult-button.spec.ts  (сервер на :3000)
 */

import { test, expect } from "./fixtures";
import type { Page, Request } from "playwright/test";

const PHONE_DISPLAY = "+7 (978) 456-41-56";
const COOKIE_KEY = "vladen_cookie_consent_v1";

const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900, mobile: false },
  { name: "mobile-375", width: 375, height: 812, mobile: true },
] as const;

async function prepare(page: Page) {
  await page.addInitScript((key) => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({
          necessary: true,
          analytics: false,
          marketing: false,
          version: "1.0",
          timestamp: new Date().toISOString(),
        }),
      );
    } catch {}
    const w = window as unknown as { __ymCalls: unknown[][] };
    w.__ymCalls = [];
    Object.defineProperty(window, "ym", {
      configurable: true,
      get: () => (...args: unknown[]) => w.__ymCalls.push(args),
      set: () => {},
    });
  }, COOKIE_KEY);
  // Страховка: ни одна заявка не уйдёт в реальный Telegram, даже если тест забыл свой мок
  await page.route("**/api/telegram", (route) =>
    route.fulfill({ status: 599, contentType: "application/json", body: '{"ok":false}' }),
  );
}

async function openConsult(page: Page, mobile: boolean) {
  if (mobile) {
    await page.getByRole("button", { name: "Меню" }).click();
    const btn = page.locator("header").getByRole("button", { name: "Получить консультацию" }).last();
    await expect(btn).toBeVisible();
    await btn.click();
  } else {
    await page.locator("header").getByRole("button", { name: "Получить консультацию" }).first().click();
  }
  const dialog = page.getByRole("dialog", { name: "Получить консультацию" });
  await expect(dialog).toBeVisible();
  return dialog;
}

async function blogArticlePath(page: Page): Promise<string> {
  const res = await page.request.get("/sitemap.xml");
  const xml = await res.text();
  const m = xml.match(/<loc>https?:\/\/[^<]+?(\/blog\/(?!category\/)[^<]+)<\/loc>/);
  expect(m, "в sitemap.xml нет ни одной статьи /blog/<slug>").not.toBeNull();
  return m![1];
}

const PAGES = ["/", "/evpatoriya", "/blog", "ARTICLE"] as const;

for (const vp of VIEWPORTS) {
  test.describe(`consult modal @ ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const p of PAGES) {
      test(`${p}: открывается, фокус в имени, Esc закрывает`, async ({ page }) => {
        await prepare(page);
        const path = p === "ARTICLE" ? await blogArticlePath(page) : p;
        await page.goto(path, { waitUntil: "domcontentloaded" });

        const dialog = await openConsult(page, vp.mobile);
        await expect(dialog).toHaveAttribute("aria-modal", "true");
        await expect(page).toHaveURL(new RegExp(`${path.replace(/[/]/g, "\\/")}$`));

        const nameInput = dialog.getByLabel("Ваше имя");
        await expect(nameInput).toBeFocused();

        // Фон не прокручивается, пока открыта модалка
        expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("hidden");

        // Цель Метрики на открытие
        const calls = await page.evaluate(() => (window as unknown as { __ymCalls: unknown[][] }).__ymCalls);
        expect(calls.some((c) => c[1] === "reachGoal" && c[2] === "consult_open")).toBe(true);

        // Модалка целиком в пределах вьюпорта по ширине
        const box = await dialog.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(vp.width + 0.5);

        await page.keyboard.press("Escape");
        await expect(dialog).toBeHidden();
        expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");

        // Фокус вернулся на кнопку (десктоп) / бургер (мобайл)
        const focusedLabel = await page.evaluate(
          () => document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.textContent?.trim() ?? "",
        );
        expect(focusedLabel).toBe(vp.mobile ? "Меню" : "Получить консультацию");
      });
    }

    test("клик по подложке закрывает", async ({ page }) => {
      await prepare(page);
      await page.goto("/blog", { waitUntil: "domcontentloaded" });
      const dialog = await openConsult(page, vp.mobile);
      // Кликаем в верхний левый угол — там только подложка
      await page.mouse.click(5, 5);
      await expect(dialog).toBeHidden();
    });

    test("отправка: 200 → успех, source consult-modal, цель form_submit", async ({ page }) => {
      await prepare(page);
      let captured: Request | null = null;
      await page.route("**/api/telegram", (route) => {
        captured = route.request();
        return route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
      });
      const path = await blogArticlePath(page);
      await page.goto(path, { waitUntil: "domcontentloaded" });
      const dialog = await openConsult(page, vp.mobile);

      const submit = dialog.getByRole("button", { name: "Получить консультацию" });
      await dialog.getByLabel("Ваше имя").fill("Тест Модалка");
      await dialog.getByLabel("Телефон").click();
      await dialog.getByLabel("Телефон").pressSequentially("9781234567");
      await expect(submit).toBeDisabled(); // без согласия на ПД отправить нельзя
      await expect(dialog.locator('a[href="/privacy"]')).toBeVisible();
      await dialog.locator('input[type="checkbox"]').check();
      await expect(submit).toBeEnabled();
      await submit.click();

      await expect(dialog.getByText("Заявка отправлена!")).toBeVisible();
      expect(captured).not.toBeNull();
      const body = JSON.parse(captured!.postData() ?? "{}");
      expect(body.source).toBe("consult-modal");
      expect(body.name).toBe("Тест Модалка");
      expect(body.phone).toBe("+7 (978) 123-45-67");
      expect(typeof body.consent_timestamp).toBe("string");
      expect("calc" in body).toBe(true);

      const calls = await page.evaluate(() => (window as unknown as { __ymCalls: unknown[][] }).__ymCalls);
      expect(calls.some((c) => c[1] === "reachGoal" && c[2] === "form_submit")).toBe(true);

      const close = dialog.getByRole("button", { name: "Закрыть" }).last();
      await expect(close).toBeFocused();
      await close.click();
      await expect(dialog).toBeHidden();
    });

    test("отправка: 502 → ошибка с телефоном, без успеха и без form_submit", async ({ page }) => {
      await prepare(page);
      let hits = 0;
      await page.route("**/api/telegram", (route) => {
        hits++;
        return route.fulfill({ status: 502, contentType: "application/json", body: '{"ok":false}' });
      });
      await page.goto("/", { waitUntil: "domcontentloaded" });
      const dialog = await openConsult(page, vp.mobile);

      await dialog.getByLabel("Ваше имя").fill("Тест Ошибка");
      await dialog.getByLabel("Телефон").click();
      await dialog.getByLabel("Телефон").pressSequentially("9781234567");
      await dialog.locator('input[type="checkbox"]').check();
      await dialog.getByRole("button", { name: "Получить консультацию" }).click();

      const err = dialog.getByTestId("consult-error");
      await expect(err).toBeVisible();
      await expect(err).toHaveAttribute("role", "alert");
      await expect(err).toContainText(PHONE_DISPLAY);
      await expect(err.locator('a[href^="tel:"]')).toBeVisible();
      await expect(dialog.getByText("Заявка отправлена!")).toHaveCount(0);
      await expect(dialog.getByLabel("Ваше имя")).toHaveValue("Тест Ошибка");
      expect(hits).toBe(1);

      const calls = await page.evaluate(() => (window as unknown as { __ymCalls: unknown[][] }).__ymCalls);
      expect(calls.some((c) => c[1] === "reachGoal" && c[2] === "form_submit")).toBe(false);
    });

    test("маска: номер, набранный с «8», уходит как +7 (978) 123-45-67", async ({ page }) => {
      await prepare(page);
      let body: { phone?: string; source?: string } | null = null;
      await page.route("**/api/telegram", (route) => {
        body = JSON.parse(route.request().postData() ?? "{}");
        return route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
      });
      await page.goto("/blog", { waitUntil: "domcontentloaded" });
      const dialog = await openConsult(page, vp.mobile);
      const tel = dialog.getByLabel("Телефон");

      await dialog.getByLabel("Ваше имя").fill("Тест Восьмёрка");
      await tel.click();
      await expect(tel).toHaveValue("+7 ");
      await tel.pressSequentially("89781234567");
      await expect(tel).toHaveValue("+7 (978) 123-45-67");
      await dialog.locator('input[type="checkbox"]').check();
      await dialog.getByRole("button", { name: "Получить консультацию" }).click();

      await expect(dialog.getByText("Заявка отправлена!")).toBeVisible();
      expect(body).not.toBeNull();
      expect(body!.phone).toBe("+7 (978) 123-45-67");
      expect(body!.source).toBe("consult-modal");
    });

    test("пока идёт отправка — Esc, подложка и крестик модалку не закрывают", async ({ page }) => {
      await prepare(page);
      let release: () => void = () => {};
      const gate = new Promise<void>((resolve) => (release = resolve));
      await page.route("**/api/telegram", async (route) => {
        await gate; // держим запрос «в полёте», пока тест не отпустит
        return route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
      });
      await page.goto("/blog", { waitUntil: "domcontentloaded" });
      const dialog = await openConsult(page, vp.mobile);

      await dialog.getByLabel("Ваше имя").fill("Тест Загрузка");
      await dialog.getByLabel("Телефон").click();
      await dialog.getByLabel("Телефон").pressSequentially("9781234567");
      await dialog.locator('input[type="checkbox"]').check();
      await dialog.getByRole("button", { name: "Получить консультацию" }).click();
      await expect(dialog.getByRole("button", { name: "Отправка..." })).toBeVisible();

      const closeX = dialog.getByRole("button", { name: "Закрыть" });
      await expect(closeX).toBeDisabled();
      await page.keyboard.press("Escape");
      await page.mouse.click(5, 5); // подложка
      await page.waitForTimeout(400); // дольше анимации закрытия
      await expect(dialog).toBeVisible();

      release();
      await expect(dialog.getByText("Заявка отправлена!")).toBeVisible();
      // После ответа модалка снова закрывается
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
    });
  });
}
