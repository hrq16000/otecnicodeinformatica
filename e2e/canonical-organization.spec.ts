import { test, expect, type Page } from "@playwright/test";

/**
 * Rodada 3.1 — canonical único e identidade Organization determinística.
 *
 * Garante, em runtime (pós-hidratação e após navegação SPA):
 *  1. exatamente UM <link rel="canonical"> no documento;
 *  2. canonical self-referente à rota atual;
 *  3. nenhum @id duplicado entre nós JSON-LD;
 *  4. no máximo uma entidade com @id .../#organization.
 */

const ROUTES = [
  "/",
  "/sobre",
  "/servicos",
  "/servicos/formatacao",
  "/empresa-de-ti-curitiba",
  "/politica-de-privacidade",
  "/termos-e-condicoes",
  "/diagnostico-60s",
];

const SITE = "https://tecnico.curitiba.br";

async function canonicals(page: Page) {
  return page.$$eval('link[rel="canonical"]', (els) =>
    els.map((e) => (e as HTMLLinkElement).href),
  );
}

async function jsonLdIds(page: Page) {
  return page.$$eval('script[type="application/ld+json"]', (els) => {
    const ids: string[] = [];
    for (const el of els) {
      try {
        const parsed = JSON.parse(el.textContent ?? "");
        for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
          if (node && typeof node["@id"] === "string") ids.push(node["@id"]);
        }
      } catch {
        /* validado em outro spec */
      }
    }
    return ids;
  });
}

async function assertRoute(page: Page, path: string) {
  const hrefs = await canonicals(page);
  expect(hrefs, `${path}: canonical duplicado → ${JSON.stringify(hrefs)}`).toHaveLength(1);
  const expected = `${SITE}${path === "/" ? "/" : path}`;
  expect(hrefs[0].replace(/\/$/, ""), `${path}: canonical não self-referente`).toBe(
    expected.replace(/\/$/, ""),
  );

  const ids = await jsonLdIds(page);
  const dup = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  expect(dup, `${path}: @id duplicado → ${JSON.stringify(dup)}`).toEqual([]);

  const orgCount = ids.filter((id) => id.endsWith("/#organization")).length;
  expect(orgCount, `${path}: ${orgCount} entidades usando #organization`).toBeLessThanOrEqual(1);
}

test.describe("Canonical único e identidade Organization", () => {
  for (const path of ROUTES) {
    test(`${path} tem canonical único e @id sem colisão`, async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      await assertRoute(page, path);
    });
  }

  test("navegação SPA não acumula canonical nem duplica a Organization", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await assertRoute(page, "/");

    for (const target of ["/sobre", "/servicos", "/empresa-de-ti-curitiba"]) {
      const link = page.locator(`a[href="${target}"]`).first();
      if (await link.count()) {
        await link.click();
        await page.waitForURL(`**${target}`, { timeout: 15000 });
      } else {
        await page.goto(target, { waitUntil: "networkidle" });
      }
      await page.waitForLoadState("networkidle");
      await assertRoute(page, target);
    }
  });
});
