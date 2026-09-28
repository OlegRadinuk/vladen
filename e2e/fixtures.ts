/**
 * Shared Playwright fixtures for vladen e2e suite.
 * Blocks external analytics/CDN requests so `load` event fires quickly.
 */

import { test as base } from "playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    // Block all external (non-localhost) requests that may delay the load event.
    // This includes Yandex Metrika, Google Fonts, CDN scripts, etc.
    await page.route(/^https?:\/\/(?!localhost|127\.0\.0\.1)/, (route) => {
      const url = route.request().url();
      const resourceType = route.request().resourceType();
      // Let images through — they are not render-blocking
      if (resourceType === "image" || resourceType === "media") {
        return route.continue();
      }
      // Block scripts, stylesheets, fetch/xhr to external domains
      return route.fulfill({
        status: 200,
        contentType:
          resourceType === "stylesheet" ? "text/css" : "application/javascript",
        body: `/* blocked external: ${url} */`,
      });
    });
    await use(page);
  },
});

export { expect } from "playwright/test";
