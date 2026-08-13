// @ts-nocheck
import { test, expect, type Page } from "@playwright/test";

/**
 * Governança determinística de JSON-LD (Rodada 1.1).
 *
 * Cada entidade estruturada ocupa um SLOT com chave estável (data-schema-key).
 * O client adota (upsert) o nó estático do prerender pela chave — nunca por
 * coincidência de @type e nunca por temporizador. Este spec garante:
 *  1. nenhum slot duplicado após a hidratação;
 *  2. nenhum BreadcrumbList/LocalBusiness duplicado;
 *  3. navegação SPA atualiza os schemas da rota de destino;
 *  4. todo nó JSON-LD é válido e possui @type.
 */

const ROUTES = [
  "/",
  "/sobre",
  "/faq",
  "/servicos",
  "/servicos/formatacao",
  "/bairros/batel",
  "/empresa-de-ti-curitiba",
  "/tecnico-informatica-curitiba",
];

type Node = { slot: string; type: string; id: string; raw: string };

async function readNodes(page: Page): Promise<Node[]> {
  await page.waitForFunction(
    () => document.querySelectorAll('script[type="application/ld+json"]').length > 0,
    undefined,
    { timeout: 15000 },
  );
  return page.$$eval('script[type="application/ld+json"]', (nodes) =>
    nodes.map((n) => {
      const el = n as HTMLScriptElement;
      const raw = el.textContent ?? "";
      let type = "";
      let id = "";
      try {
        const parsed = JSON.parse(raw);
        const first = Array.isArray(parsed) ? parsed[0] : parsed;
        type = Array.isArray(first?.["@type"]) ? first["@type"][0] : (first?.["@type"] ?? "");
        id = first?.["@id"] ?? "";
      } catch {
        type = "__INVALID__";
      }
      return { slot: el.dataset.schemaKey ?? "", type, id, raw };
    }),
  );
}

function countBy(nodes: Node[], pick: (n: Node) => string) {
  const map = new Map<string, number>();
  for (const n of nodes) {
    const k = pick(n);
    if (!k) continue;
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return map;
}

function assertHealthy(nodes: Node[], label: string) {
  expect(nodes.length, `${label}: nenhum JSON-LD encontrado`).toBeGreaterThan(0);

  for (const n of nodes) {
    expect(n.type, `${label}: JSON-LD inválido → ${n.raw.slice(0, 120)}`).not.toBe("__INVALID__");
    expect(n.type, `${label}: JSON-LD sem @type`).not.toBe("");
    expect(n.slot, `${label}: nó sem data-schema-key (${n.type})`).not.toBe("");
  }

  const bySlot = countBy(nodes, (n) => n.slot);
  const dupSlots = [...bySlot].filter(([, c]) => c > 1);
  expect(dupSlots, `${label}: slots duplicados → ${JSON.stringify(dupSlots)}`).toEqual([]);

  // Entidades singleton por página, independentemente do slot.
  for (const singleton of ["BreadcrumbList", "LocalBusiness", "FAQPage", "Service"]) {
    const count = nodes.filter((n) => n.type === singleton).length;
    expect(count, `${label}: ${singleton} aparece ${count}x`).toBeLessThanOrEqual(1);
  }

  const byId = countBy(nodes, (n) => n.id);
  const dupIds = [...byId].filter(([, c]) => c > 1);
  expect(dupIds, `${label}: @id duplicados → ${JSON.stringify(dupIds)}`).toEqual([]);
}

test.describe("JSON-LD — governança por slots", () => {
  for (const path of ROUTES) {
    test(`${path} tem um único nó por slot após a hidratação`, async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      assertHealthy(await readNodes(page), path);
    });
  }

  test("navegação SPA troca os schemas sem duplicar nem vazar a rota anterior", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    assertHealthy(await readNodes(page), "spa:/");

    for (const target of ["/servicos/formatacao", "/bairros/batel", "/empresa-de-ti-curitiba"]) {
      const link = page.locator(`a[href="${target}"]`).first();
      if (await link.count()) {
        await link.click();
        await page.waitForURL(`**${target}`, { timeout: 15000 });
      } else {
        await page.goto(target, { waitUntil: "networkidle" });
      }
      await page.waitForLoadState("networkidle");

      // O breadcrumb da nova rota é reescrito pelo slot após a hidratação da
      // rota — aguardar o upsert em vez de ler um único frame (anti-flake).
      await expect
        .poll(
          async () => {
            const current = await readNodes(page);
            const c = current.find((n) => n.type === "BreadcrumbList");
            return c?.raw?.includes(target) ?? false;
          },
          {
            timeout: 15000,
            message: `spa:${target}: BreadcrumbList ausente ou desatualizado após a navegação`,
          },
        )
        .toBe(true);

      const nodes = await readNodes(page);
      assertHealthy(nodes, `spa:${target}`);


      // Entidades exclusivas da home não podem permanecer.
      expect(
        nodes.some((n) => n.id.includes("#webpage-home")),
        `spa:${target}: WebPage da home vazou`,
      ).toBe(false);
    }
  });
});
