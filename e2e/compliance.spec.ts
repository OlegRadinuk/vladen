/**
 * E2E — 152-ФЗ compliance flows
 *
 * Base URL: http://localhost:3000
 * Run with: npx playwright test e2e/compliance.spec.ts
 */

import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";
const COOKIE_KEY = "vladen_cookie_consent_v1";

// ---------------------------------------------------------------------------
// T-1: Cookie banner appears on first visit (no prior consent in localStorage)
// ---------------------------------------------------------------------------
test("T-1: cookie banner is visible on first visit with empty localStorage", async ({
  page,
}) => {
  // Clear consent before navigation so the banner has no stored decision.
  await page.goto(BASE_URL);
  await page.evaluate((key) => localStorage.removeItem(key), COOKIE_KEY);

  // Reload to let the component re-mount with a clean slate.
  await page.reload();

  // CookieBanner renders as role="dialog" aria-label="Настройки cookie".
  const banner = page.getByRole("dialog", { name: /настройки cookie/i });
  await expect(banner).toBeVisible();

  // The banner must contain at least one of the expected Cyrillic keywords.
  await expect(
    banner.getByText(/cookie|куки/i).first()
  ).toBeVisible();
});

// ---------------------------------------------------------------------------
// T-2: Banner disappears after "Принять все" and consent is persisted
// ---------------------------------------------------------------------------
test("T-2: accepting all cookies hides banner and writes consent to localStorage", async ({
  page,
}) => {
  // Ensure no prior consent.
  await page.goto(BASE_URL);
  await page.evaluate((key) => localStorage.removeItem(key), COOKIE_KEY);
  await page.reload();

  const banner = page.getByRole("dialog", { name: /настройки cookie/i });
  await expect(banner).toBeVisible();

  // Click the primary accept button.
  await banner.getByRole("button", { name: /принять все/i }).click();

  // Banner must disappear (component returns null when !visible).
  await expect(banner).not.toBeVisible();

  // Verify localStorage entry contains required fields.
  const stored = await page.evaluate((key) => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }, COOKIE_KEY);

  expect(stored).not.toBeNull();
  expect(stored.necessary).toBe(true);
  expect(typeof stored.timestamp).toBe("string");
  // Timestamp must be a valid ISO-8601 date string.
  expect(() => new Date(stored.timestamp).toISOString()).not.toThrow();
});

// ---------------------------------------------------------------------------
// T-3: Contacts form submit is disabled without PD consent
// ---------------------------------------------------------------------------
test("T-3: contacts form submit button is disabled until consent checkbox is checked", async ({
  page,
}) => {
  // Pre-accept cookie banner so it doesn't interfere with the form.
  await page.goto(BASE_URL);
  await page.evaluate((key) => {
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
  await page.reload();

  // Scroll to the contacts section.
  await page.locator("#contacts").scrollIntoViewIfNeeded();

  // The submit button carries text "Отправить заявку" and is disabled when
  // pdConsent === false (see Contacts.tsx: disabled={status === "loading" || !pdConsent}).
  const submitBtn = page.getByRole("button", { name: /отправить заявку/i });
  await expect(submitBtn).toBeVisible();
  await expect(submitBtn).toBeDisabled();

  // Check the PD consent checkbox — identified by its label text.
  const consentCheckbox = page.getByRole("checkbox").filter({
    // The label wrapping the checkbox contains "персональных данных".
    has: page.locator(
      'label:has-text("персональных данных") input[type="checkbox"]'
    ),
  });

  // Fallback: locate the checkbox that lives inside the consent label directly.
  const pdLabel = page.locator("label", {
    hasText: /согласен на обработку персональных данных/i,
  });
  const pdCheckbox = pdLabel.locator('input[type="checkbox"]');

  await pdCheckbox.check();

  // Submit button must now be enabled.
  await expect(submitBtn).toBeEnabled();
});

// ---------------------------------------------------------------------------
// T-4: ChatWidget phone-prompt send button is disabled without PD consent
// ---------------------------------------------------------------------------
test("T-4: chat widget phone-prompt send button is disabled without PD consent", async ({
  page,
}) => {
  /**
   * The phone prompt inside ChatWidget (showPhonePrompt state) only appears
   * automatically after SUGGEST_AFTER=2 assistant responses from /api/chat,
   * which requires a live backend + AI call. We cannot trigger it without a
   * real API, so we mock /api/chat to stream a minimal response and repeat the
   * exchange twice so the component flips showPhonePrompt to true.
   *
   * Mock strategy: intercept /api/chat and return a streamed text body
   * that resolves immediately, so the component increments assistantCount.
   */

  // Pre-accept cookie banner.
  await page.goto(BASE_URL);
  await page.evaluate((key) => {
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

  // Mock the streaming chat endpoint.
  await page.route("**/api/chat", (route) => {
    route.fulfill({
      status: 200,
      contentType: "text/plain; charset=utf-8",
      body: "Хорошо, я помогу вам с расчётом.",
    });
  });

  await page.reload();

  // Open the chat widget (FAB button).
  const fab = page.getByRole("button", { name: /открыть чат с консультантом/i });
  await expect(fab).toBeVisible();
  await fab.click();

  // Chat panel should now be open.
  const chatPanel = page.locator(".fixed.bottom-6.right-6").filter({
    has: page.locator("text=Влад"),
  });
  await expect(chatPanel).toBeVisible();

  // Locate the chat text input and send button.
  const chatInput = chatPanel.locator('input[placeholder="Напишите вопрос..."]');
  const chatSendBtn = chatPanel.getByRole("button", { name: /отправить/i });

  // Send first message.
  await chatInput.fill("Сколько стоит ремонт?");
  await chatSendBtn.click();

  // Wait for assistant response to arrive (assistantCount becomes 2).
  await page.waitForResponse("**/api/chat");

  // Send second message to trigger assistantCount >= SUGGEST_AFTER (2).
  await chatInput.fill("А балкон?");
  await chatSendBtn.click();
  await page.waitForResponse("**/api/chat");

  // The phone prompt card should now be visible.
  const phonePrompt = page.locator(".bg-accent\\/10.border.border-accent\\/30");
  // Fallback: look for the prompt by its heading text.
  const promptCard = page.locator("text=Хотите получить точный расчёт?");
  await expect(promptCard).toBeVisible({ timeout: 8000 });

  // The "Отправить" button inside the phone prompt is disabled when !pdConsent.
  // It is the button that calls sendPhone(), distinct from the chat send button.
  const phonePromptSection = page.locator(".bg-accent\\/10");
  const sendPhoneBtn = phonePromptSection.getByRole("button", {
    name: /отправить/i,
  });
  await expect(sendPhoneBtn).toBeDisabled();

  // Check the PD consent checkbox inside the phone prompt.
  const promptConsentLabel = phonePromptSection.locator("label", {
    hasText: /согласен на обработку/i,
  });
  const promptConsentCheckbox = promptConsentLabel.locator(
    'input[type="checkbox"]'
  );
  await expect(promptConsentCheckbox).not.toBeChecked();

  // With consent unchecked, button stays disabled.
  await expect(sendPhoneBtn).toBeDisabled();

  // After checking consent, button becomes enabled.
  await promptConsentCheckbox.check();
  await expect(sendPhoneBtn).toBeEnabled();
});

// ---------------------------------------------------------------------------
// T-5: Privacy policy page exists and contains required legal content
// ---------------------------------------------------------------------------
test("T-5: /privacy page exists and contains required 152-FZ legal content", async ({
  page,
}) => {
  await page.goto(`${BASE_URL}/privacy`);

  // Page title (browser tab) should reference the policy.
  await expect(page).toHaveTitle(/политика|конфиденциальность/i);

  // H1 heading on the page.
  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText(/политика/i);

  // Required legal identifiers in the page body.
  await expect(page.getByText(/ООО\s*«ВЛАДЕН»/i).first()).toBeVisible();
  await expect(page.getByText(/ИНН/i).first()).toBeVisible();
  // Telegram is named as the data processor in section 6.
  await expect(page.getByText(/Telegram/i).first()).toBeVisible();
});
