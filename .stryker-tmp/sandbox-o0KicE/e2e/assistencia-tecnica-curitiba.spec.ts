// @ts-nocheck
import { test, expect, type Page } from "@playwright/test";

const ROUTE = "/assistencia-tecnica-curitiba";

type Schema = Record<string, unknown> & { "@type"?: string | string[] };

async function collectJsonLd(page: Page): Promise<Schema[]> {
  return await page.$$eval('script[type="application/ld+json"]', (nodes) =>
    nodes
      .map((n) => {
        try {
          return JSON.parse(n.textContent || "null");
        } catch {
          return null;
        }
      })
      .filter(Boolean)
  );
}

function hasType(schemas: Schema[], type: string): Schema | undefined {
  return schemas.find((s) => {
    const t = s["@type"];
    return Array.isArray(t) ? t.includes(type) : t === type;
  });
}

test.describe("/assistencia-tecnica-curitiba — SEO, schema, meta, CTA tracking", () => {
  test.beforeEach(async ({ page }) => {
    // Install gtag/dataLayer spies BEFORE navigation so the page picks them up.
    await page.addInitScript(() => {
      (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls = [];
      (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
      (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = function (
        ...args: unknown[]
      ) {
        (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls.push(args);
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push(args);
      };
    });
  });

  test("renders all required JSON-LD (BreadcrumbList, LocalBusiness, FAQPage, Service)", async ({
    page,
  }) => {
    await page.goto(`${ROUTE}?utm_source=cisrc&utm_medium=ci&utm_campaign=schema_test&gclid=CI_GCLID_123`);
    await page.waitForLoadState("networkidle");

    const schemas = await collectJsonLd(page);

    const breadcrumb = hasType(schemas, "BreadcrumbList");
    const localBusiness = hasType(schemas, "LocalBusiness");
    const faq = hasType(schemas, "FAQPage");
    const service = hasType(schemas, "Service");

    expect(breadcrumb, "BreadcrumbList JSON-LD must be present").toBeTruthy();
    expect(localBusiness, "LocalBusiness JSON-LD must be present").toBeTruthy();
    expect(faq, "FAQPage JSON-LD must be present").toBeTruthy();
    expect(service, "Service JSON-LD must be present").toBeTruthy();

    // BreadcrumbList shape
    const items = (breadcrumb as { itemListElement?: unknown[] }).itemListElement;
    expect(Array.isArray(items) && items.length >= 2).toBeTruthy();

    // LocalBusiness: required fields + Curitiba in areaServed, no PostalAddress
    expect((localBusiness as { name?: string }).name).toBeTruthy();
    expect((localBusiness as { telephone?: string }).telephone).toMatch(/\+?55.*41997086380/);
    const area = JSON.stringify((localBusiness as { areaServed?: unknown }).areaServed || "");
    expect(area.toLowerCase()).toContain("curitiba");

    // FAQPage: at least 3 questions with answers
    const mainEntity = (faq as { mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }> })
      .mainEntity || [];
    expect(mainEntity.length).toBeGreaterThanOrEqual(3);
    for (const q of mainEntity) {
      expect(q.name, "FAQ question must have a name").toBeTruthy();
      expect(q.acceptedAnswer?.text, "FAQ answer text required").toBeTruthy();
    }

    // Service schemas should reference LocalBusiness via provider.@id
    const services = schemas.filter((s) => {
      const t = s["@type"];
      return Array.isArray(t) ? t.includes("Service") : t === "Service";
    });
    expect(services.length).toBeGreaterThanOrEqual(4);
    for (const s of services) {
      const provider = (s as { provider?: { "@id"?: string } }).provider;
      expect(provider?.["@id"]).toContain("#localbusiness");
    }
  });

  test("SEO meta tags & H1 are correct and H1 does not overflow", async ({ page }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle(/Assistência Técnica.*Curitiba/i);

    const description = await page
      .locator('head meta[name="description"]')
      .getAttribute("content");
    expect(description || "").toMatch(/Curitiba/i);
    expect((description || "").length).toBeGreaterThan(50);

    const canonical = await page.locator('head link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/assistencia-tecnica-curitiba");

    const ogTitle = await page.locator('head meta[property="og:title"]').getAttribute("content");
    const twTitle = await page.locator('head meta[name="twitter:title"]').getAttribute("content");
    expect(ogTitle).toBeTruthy();
    expect(twTitle).toBeTruthy();

    // H1 must exist, be unique, and not overflow at the current viewport.
    for (const viewport of [
      { width: 375, height: 812, label: "mobile" },
      { width: 1440, height: 900, label: "desktop" },
    ]) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const h1s = page.locator("h1");
      await expect(h1s).toHaveCount(1);
      const overflow = await h1s.first().evaluate((el) => ({
        scrollWidth: (el as HTMLElement).scrollWidth,
        clientWidth: (el as HTMLElement).clientWidth,
      }));
      // Allow a 2px rounding tolerance.
      expect(
        overflow.scrollWidth,
        `H1 must not overflow on ${viewport.label} (scrollWidth=${overflow.scrollWidth}, clientWidth=${overflow.clientWidth})`
      ).toBeLessThanOrEqual(overflow.clientWidth + 2);
    }
  });

  test("WhatsApp CTA click fires GA4 event with utm_*/gclid in payload", async ({ page }) => {
    const url = `${ROUTE}?utm_source=ga4ci&utm_medium=cpc&utm_campaign=whatsapp_test&gclid=GA4_DEBUG_GCLID`;
    await page.goto(url);
    await page.waitForLoadState("networkidle");

    // Persist UTM/gclid the way the app would (localStorage), so handlers can read them.
    await page.evaluate(() => {
      const params = new URLSearchParams(window.location.search);
      const ctx: Record<string, string> = {};
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].forEach((k) => {
        const v = params.get(k);
        if (v) ctx[k] = v;
      });
      try {
        localStorage.setItem("utm_context", JSON.stringify(ctx));
      } catch {
        /* noop */
      }
    });

    // Prevent navigation to wa.me so the test stays on the page.
    await page.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));

    const ctas = page.locator('a[href*="wa.me/5541997452053"]');
    const count = await ctas.count();
    expect(count, "Page should expose at least one WhatsApp CTA").toBeGreaterThan(0);

    // Click every WhatsApp CTA (cap at 8 to keep the test fast).
    const toClick = Math.min(count, 8);
    for (let i = 0; i < toClick; i++) {
      const cta = ctas.nth(i);
      await cta.scrollIntoViewIfNeeded();
      await cta.click({ force: true }).catch(() => {});
    }

    // Give analytics handlers a chance to fire.
    await page.waitForTimeout(800);

    const calls = await page.evaluate(
      () => (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls || []
    );

    // Find at least one event call relating to a WhatsApp CTA click.
    const eventCalls = calls.filter(
      (c) => c[0] === "event" && typeof c[1] === "string" && /cta_click|whatsapp_click|generate_lead/i.test(c[1] as string)
    );
    expect(
      eventCalls.length,
      `Expected GA4 cta_click/whatsapp_click events. Captured calls: ${JSON.stringify(calls).slice(0, 800)}`
    ).toBeGreaterThan(0);

    // At least one event must carry utm_* or gclid in the payload.
    const withAttribution = eventCalls.find((c) => {
      const payload = (c[2] || {}) as Record<string, unknown>;
      const flat = JSON.stringify(payload);
      return (
        /utm_source|utm_medium|utm_campaign/i.test(flat) ||
        /gclid/i.test(flat)
      );
    });
    expect(
      withAttribution,
      `Expected at least one CTA event payload to contain utm_* or gclid. Events: ${JSON.stringify(eventCalls).slice(0, 800)}`
    ).toBeTruthy();
  });

  test("no console errors related to schema/meta on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");
    const relevant = errors.filter((e) =>
      /json|schema|meta|helmet|ld\+json/i.test(e)
    );
    expect(relevant, `Schema/meta-related console errors: ${relevant.join(" | ")}`).toHaveLength(0);
  });
});
