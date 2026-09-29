/**
 * E2E — посадочные под Евпаторию + «дом из ракушечника»
 *
 * Проверяет: 200, один h1, title, JSON-LD (Service + BreadcrumbList + FAQPage),
 * tel-ссылки, ссылку на /evpatoriya в футере, sitemap, скролл hero-CTA к
 * калькулятору и отправку формы (с source) — /api/telegram ВСЕГДА замокан,
 * реальные заявки не уходят.
 *
 * Run with: npx playwright test e2e/evp-landings.spec.ts
 */

import { test, expect } from "./fixtures";
import type { Page, Request } from "playwright/test";

const BASE_URL = "http://localhost:3000";
const TEL = "tel:+79784564156";
const COOKIE_KEY = "vladen_cookie_consent_v1";

type Landing = {
  path: string;
  title: RegExp;
  heroCta: string;
  source: string;
};

const LANDINGS: Landing[] = [
  {
    path: "/evpatoriya",
    title: /Евпатори/,
    heroCta: "Рассчитать стоимость",
    source: "evpatoriya-hub",
  },
  {
    path: "/evpatoriya/remont-kvartir",
    title: /Евпатори/,
    heroCta: "Рассчитать стоимость ремонта",
    source: "evp-remont-kvartir",
  },
  {
    path: "/evpatoriya/stroitelstvo-domov",
    title: /Евпатори/,
    heroCta: "Получить расчёт стоимости дома",
    source: "evp-stroitelstvo",
  },
  {
    path: "/dom-iz-rakushechnika",
    title: /ракушечник/i,
    heroCta: "Рассчитать стоимость дома из ракушечника",
    source: "dom-iz-rakushechnika",
  },
];

/** Мок /api/telegram: регистрируется ДО навигации, копит перехваченные запросы. */
async function mockTelegram(page: Page) {
  const captured: Request[] = [];
  await page.route("**/api/telegram", (route) => {
    captured.push(route.request());
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });
  return captured;
}

/** Предустановить согласие на cookie, чтобы баннер не перекрывал форму. */
async function preAcceptCookies(page: Page) {
  await page.addInitScript((key) => {
    localStorage.setItem(
      key,
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        version: "1.0",
        timestamp: new Date().toISOString(),
      })
    );
  }, COOKIE_KEY);
}

function collectTypes(node: unknown, acc: Set<string>) {
  if (Array.isArray(node)) {
    node.forEach((n) => collectTypes(n, acc));
    return;
  }
  if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    const t = obj["@type"];
    if (typeof t === "string") acc.add(t);
    if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && acc.add(x));
    if (obj["@graph"]) collectTypes(obj["@graph"], acc);
  }
}

for (const l of LANDINGS) {
  test.describe(`EVP ${l.path}`, () => {
    test("SEO: 200, один h1, title, JSON-LD, tel, футер", async ({ page }) => {
      await mockTelegram(page);
      const resp = await page.goto(`${BASE_URL}${l.path}`);
      expect(resp?.status(), "HTTP status").toBe(200);

      // ровно один h1, и он видим
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      await expect(page).toHaveTitle(l.title);

      // JSON-LD: все блоки парсятся, вместе содержат Service + BreadcrumbList + FAQPage
      const raws = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      expect(raws.length).toBeGreaterThan(0);
      const types = new Set<string>();
      for (const raw of raws) {
        let parsed: unknown;
        expect(() => (parsed = JSON.parse(raw)), `invalid JSON-LD: ${raw.slice(0, 80)}`).not.toThrow();
        collectTypes(parsed, types);
      }
      for (const t of ["Service", "BreadcrumbList", "FAQPage"]) {
        expect([...types], `JSON-LD @type ${t}`).toContain(t);
      }

      // все tel-ссылки ведут на один номер
      const tels = page.locator('a[href^="tel:"]');
      const n = await tels.count();
      expect(n, "нет tel-ссылок").toBeGreaterThan(0);
      for (let i = 0; i < n; i++) {
        await expect(tels.nth(i)).toHaveAttribute("href", TEL);
      }

      // перелинковка: в футере есть ссылка на хаб /evpatoriya
      await expect(page.locator('footer a[href="/evpatoriya"]').first()).toBeAttached();
    });

    test("hero CTA скроллит к калькулятору", async ({ page }) => {
      await mockTelegram(page);
      await preAcceptCookies(page);
      await page.goto(`${BASE_URL}${l.path}`);

      const calc = page.locator("#calculator");
      const calcTop = () => calc.evaluate((el) => el.getBoundingClientRect().top);
      // до клика калькулятор ниже первого экрана (может чуть выглядывать снизу)
      expect(await calcTop()).toBeGreaterThan(200);

      await page.getByRole("button", { name: l.heroCta, exact: true }).first().click();
      await expect(calc).toBeInViewport();
      // scrollIntoView (start) + smooth: верх секции доезжает к верху экрана
      await expect.poll(calcTop).toBeLessThan(120);
      await expect.poll(calcTop).toBeGreaterThan(-120);
    });

    test("форма: отправка уходит в /api/telegram с source страницы (мок)", async ({ page }) => {
      const captured = await mockTelegram(page);
      await preAcceptCookies(page);
      await page.goto(`${BASE_URL}${l.path}`);

      const form = page.locator("#contacts form");
      await form.scrollIntoViewIfNeeded();

      const submit = form.locator('button[type="submit"]');
      // 152-ФЗ: без согласия отправка заблокирована
      await expect(submit).toBeDisabled();

      await form.getByPlaceholder("Иван Иванов").fill("Тест E2E");
      await form.getByPlaceholder("+7 (978) 123-45-67").pressSequentially("9781234567");
      await form
        .locator("label", { hasText: /согласен на обработку персональных данных/i })
        .locator('input[type="checkbox"]')
        .check();
      await expect(submit).toBeEnabled();

      const reqPromise = page.waitForRequest("**/api/telegram");
      await submit.click();
      const req = await reqPromise;

      const body = req.postDataJSON() as Record<string, unknown>;
      expect(body.source).toBe(l.source);
      expect(body.name).toBe("Тест E2E");
      expect(String(body.phone).replace(/\D/g, "")).toBe("79781234567");
      expect(typeof body.consent_timestamp).toBe("string");

      await expect(page.getByText("Заявка отправлена!")).toBeVisible();
      expect(captured.length).toBe(1);
    });
  });
}

test("форма: невалидный телефон — ошибка, запрос не уходит", async ({ page }) => {
  const captured = await mockTelegram(page);
  await preAcceptCookies(page);
  await page.goto(`${BASE_URL}/evpatoriya`);

  const form = page.locator("#contacts form");
  await form.scrollIntoViewIfNeeded();
  await form.getByPlaceholder("Иван Иванов").fill("Тест E2E");
  await form.getByPlaceholder("+7 (978) 123-45-67").pressSequentially("978");
  await form
    .locator("label", { hasText: /согласен на обработку персональных данных/i })
    .locator('input[type="checkbox"]')
    .check();
  await form.locator('button[type="submit"]').click();

  await expect(form.getByText("Введите корректный номер телефона")).toBeVisible();
  expect(captured.length).toBe(0);
});

test("mobile 390: hero CTA и tel — тач-таргет >= 44px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const l of LANDINGS) {
    await page.goto(`${BASE_URL}${l.path}`);
    const cta = page.getByRole("button", { name: l.heroCta, exact: true }).first();
    await expect(cta).toBeVisible();
    const box = await cta.boundingBox();
    expect(box?.height ?? 0, `${l.path}: hero CTA height`).toBeGreaterThanOrEqual(44);
    // горизонтального скролла нет
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `${l.path}: horizontal overflow`).toBeLessThanOrEqual(0);
  }
});

test("sitemap.xml содержит 4 посадочные", async ({ request }) => {
  const res = await request.get(`${BASE_URL}/sitemap.xml`);
  expect(res.status()).toBe(200);
  const xml = await res.text();
  for (const l of LANDINGS) {
    expect(xml, `sitemap: ${l.path}`).toContain(`<loc>https://vladen-crimea.ru${l.path}</loc>`);
  }
});
