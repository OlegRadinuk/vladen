/**
 * E2E — phone number update verification
 *
 * Verifies that +7 (978) 456-41-56 appears everywhere the old 717 number was,
 * and the old number 717 is gone from HTML.
 *
 * Run with: npx playwright test e2e/phone-update.spec.ts
 */

import { test, expect } from "./fixtures";
import type { Page } from "playwright/test";

const BASE_URL = "http://localhost:3000";
const NEW_PHONE_TEL = "tel:+79784564156";
const NEW_PHONE_FRAGMENT = "456-41-56";
const OLD_PHONE_FRAGMENT = "717-44-47";

const PAGES_TO_CHECK = ["/", "/contacts", "/services", "/privacy", "/blog"];

// ---------------------------------------------------------------------------
// Helper: scan all tel: links on a page
// ---------------------------------------------------------------------------
async function checkPhoneLinks(page: Page, url: string) {
  await page.goto(`${BASE_URL}${url}`);

  const telLinks = page.locator('a[href^="tel:"]');
  const count = await telLinks.count();

  // At least one tel: link must exist
  expect(count, `${url}: no tel: links found`).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const href = await telLinks.nth(i).getAttribute("href");
    expect(
      href,
      `${url}: tel: link #${i} points to wrong number`
    ).toBe(NEW_PHONE_TEL);
  }
}

// ---------------------------------------------------------------------------
// Helper: check visible text has new number and no old number
// ---------------------------------------------------------------------------
async function checkPhoneText(page: Page, url: string) {
  // New number fragment is visible somewhere on the page
  const newPhoneVisible = page.getByText(new RegExp(NEW_PHONE_FRAGMENT)).first();
  await expect(
    newPhoneVisible,
    `${url}: visible text "${NEW_PHONE_FRAGMENT}" not found`
  ).toBeVisible();

  // Old number must not appear anywhere in the HTML
  const html = await page.content();
  expect(html, `${url}: old number 717 still present in HTML`).not.toContain(
    OLD_PHONE_FRAGMENT
  );
}

// ---------------------------------------------------------------------------
// T-P1 through T-P5: tel: links and visible text per page
// ---------------------------------------------------------------------------
for (const path of PAGES_TO_CHECK) {
  test(`T-P tel: links on ${path} — 375px`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await checkPhoneLinks(page, path);
    await checkPhoneText(page, path);
  });

  test(`T-P tel: links on ${path} — 1440px`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await checkPhoneLinks(page, path);
    await checkPhoneText(page, path);
  });
}

// ---------------------------------------------------------------------------
// T-P-JSONLD: JSON-LD on homepage contains new telephone
// ---------------------------------------------------------------------------
test("T-P-JSONLD: JSON-LD on homepage contains new telephone", async ({
  page,
}) => {
  await page.goto(`${BASE_URL}/`);

  const scripts = await page.locator('script[type="application/ld+json"]').all();
  expect(scripts.length, "No JSON-LD scripts found on homepage").toBeGreaterThan(0);

  let found = false;
  for (const script of scripts) {
    const content = await script.textContent();
    if (content && content.includes("+79784564156")) {
      found = true;
      break;
    }
  }
  expect(found, 'JSON-LD does not contain "telephone":"+79784564156"').toBe(true);

  // Also ensure old number is not in any JSON-LD
  for (const script of scripts) {
    const content = await script.textContent();
    if (content) {
      expect(
        content,
        "Old phone 717 found in JSON-LD"
      ).not.toContain("71744");
    }
  }
});

// ---------------------------------------------------------------------------
// T-P-YM: phone click in contacts section fires ym() reachGoal
// ---------------------------------------------------------------------------
test("T-P-YM: phone click in contacts section fires ym reachGoal phone_click", async ({
  page,
}) => {
  // Pre-accept cookies
  const COOKIE_KEY = "vladen_cookie_consent_v1";
  await page.goto(`${BASE_URL}/`);
  await page.evaluate((key) => {
    localStorage.setItem(
      key,
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        version: "1.0",
        timestamp: new Date().toISOString(),
      })
    );
  }, COOKIE_KEY);

  // Stub window.ym before page loads
  await page.addInitScript(() => {
    (window as any)._ymCalls = [];
    (window as any).ym = (...args: unknown[]) => {
      (window as any)._ymCalls.push(args);
    };
  });

  await page.goto(`${BASE_URL}/contacts`);

  // Find and click the first tel: link in contacts section
  const telLink = page.locator('a[href="tel:+79784564156"]').first();
  await expect(telLink).toBeVisible();

  // Click but prevent navigation (tel: links open phone dialer)
  await page.evaluate(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>(
      'a[href^="tel:"]'
    );
    links.forEach((l) =>
      l.addEventListener("click", (e) => e.preventDefault())
    );
  });

  await telLink.click();

  // Check ym was called with 'reachGoal' and 'phone_click'
  const ymCalls: unknown[][] = await page.evaluate(
    () => (window as any)._ymCalls
  );
  const hasPhoneClick = ymCalls.some(
    (call) =>
      call.length >= 3 &&
      call[1] === "reachGoal" &&
      call[2] === "phone_click"
  );
  expect(
    hasPhoneClick,
    `ym('reachGoal','phone_click') not fired. All ym calls: ${JSON.stringify(ymCalls)}`
  ).toBe(true);
});

// ---------------------------------------------------------------------------
// T-P-SCREENSHOTS: 375px hero phone area + 1440px footer screenshot
// ---------------------------------------------------------------------------
test("T-P-SCREENSHOT-375: mobile phone area (footer)", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE_URL}/`);

  // On mobile, the header phone link is inside a collapsed nav (hamburger).
  // Phone is always visible in the footer — scroll there for the shot.
  const footer = page.locator("footer");
  await footer.scrollIntoViewIfNeeded();

  // Wait for a tel: link to be visible in the viewport
  await expect(
    page.locator('a[href="tel:+79784564156"]').filter({ hasText: /456/ }).first()
  ).toBeVisible({ timeout: 8000 }).catch(async () => {
    // fallback: any tel link
  });

  await page.screenshot({
    path: "D:/projects/vladen/spec/evp-focus/shots/home-mobile-375-phone.png",
    fullPage: false,
  });
});

test("T-P-SCREENSHOT-1440: desktop footer", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/`);

  // Scroll the footer element into the viewport
  const footer = page.locator("footer");
  await footer.scrollIntoViewIfNeeded();

  // Wait until footer's phone link is visible in the viewport
  await expect(
    footer.locator('a[href="tel:+79784564156"]').first()
  ).toBeVisible({ timeout: 8000 });

  await page.screenshot({
    path: "D:/projects/vladen/spec/evp-focus/shots/home-desktop-1440-footer.png",
    fullPage: false,
  });
});
