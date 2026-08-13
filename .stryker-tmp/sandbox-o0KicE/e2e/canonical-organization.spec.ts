// @ts-nocheck
import { test, expect, type Page } from "@playwright/test";
import { SITE_URL } from "./site-env";

/**
 * Rodada 3.1 / 3.2 — canonical único e identidade Organization determinística.
 *
 * Garante, em runtime (pós-hidratação e após navegação SPA):
 *  1. exatamente UM <link rel="canonical"> no documento;
 *  2. canonical self-referente à rota atual, sem query string nem fragment;
 *  3. nenhum @id duplicado entre nós JSON-LD;
 *  4. exatamente uma entidade institucional #organization;
 *  5. toda referência { "@id": … } do domínio resolve para um nó do documento;
 *  6. os slots `organization`/`local-business` não recriam nós na hidratação
 *     nem vazam entre rotas durante a navegação SPA.
 */

const ROUTES = [
  "/",
  "/sobre",
  "/contato",
  "/blog",
  "/servicos",
  "/servicos/formatacao",
  "/empresa-de-ti-curitiba",
  "/politica-de-privacidade",
  "/termos-e-condicoes",
  "/diagnostico-60s",
];

const SITE = SITE_URL;
const REF_KEYS = new Set([
  "publisher",
  "provider",
  "seller",
  "parentOrganization",
  "about",
  "isPartOf",
  "worksFor",
  "mainEntity",
  "brand",
]);

const norm = (u: string) => u.replace(/\/$/, "");

type Graph = { defined: string[]; refs: string[]; orgNodes: number };

async function canonicals(page: Page) {
  return page.$$eval('link[rel="canonical"]', (els) => els.map((e) => (e as HTMLLinkElement).href));
}

async function readGraph(page: Page, refKeys: string[], site: string): Promise<Graph> {
  return page.evaluate(
    ({ refKeys, site }) => {
      const keys = new Set(refKeys);
      const defined: string[] = [];
      const refs: string[] = [];
      let orgNodes = 0;

      const walk = (node: unknown, parentKey: string) => {
        if (Array.isArray(node)) {
          node.forEach((n) => walk(n, parentKey));
          return;
        }
        if (!node || typeof node !== "object") return;
        const obj = node as Record<string, unknown>;
        const id = typeof obj["@id"] === "string" ? (obj["@id"] as string) : "";
        const isPureRef =
          !!id && Object.keys(obj).every((k) => k === "@id" || k === "@type");

        if (isPureRef) {
          if (id.startsWith(site)) refs.push(id);
        } else if (id) {
          defined.push(id);
          if (id === `${site}/#organization`) orgNodes += 1;
        }

        for (const [k, v] of Object.entries(obj)) {
          if (k.startsWith("@")) continue;
          walk(v, keys.has(k) ? k : parentKey);
        }
      };

      for (const el of Array.from(
        document.querySelectorAll('script[type="application/ld+json"]'),
      )) {
        try {
          walk(JSON.parse(el.textContent ?? ""), "");
        } catch {
          /* validado em jsonld-slots.spec.ts */
        }
      }
      return { defined, refs, orgNodes };
    },
    { refKeys, site },
  );
}

async function slotCounts(page: Page) {
  return page.$$eval('script[data-schema-key]', (els) => {
    const out: Record<string, number> = {};
    for (const el of els) {
      const key = (el as HTMLElement).dataset.schemaKey ?? "";
      out[key] = (out[key] ?? 0) + 1;
    }
    return out;
  });
}

async function assertRoute(page: Page, path: string, label = path) {
  const expected = norm(`${SITE}${path === "/" ? "/" : path}`);
  // A rota pode ser lazy: aguarda o efeito de canonical da rota atual assumir.
  await expect
    .poll(async () => (await canonicals(page)).map(norm).join(","), {
      timeout: 15000,
      message: `${label}: canonical não convergiu para a rota`,
    })
    .toBe(expected);

  const hrefs = await canonicals(page);
  expect(hrefs, `${label}: canonical duplicado → ${JSON.stringify(hrefs)}`).toHaveLength(1);
  expect(norm(hrefs[0]), `${label}: canonical não self-referente`).toBe(
    norm(`${SITE}${path === "/" ? "/" : path}`),
  );
  // Query string e fragment nunca podem contaminar o href canônico.
  expect(hrefs[0], `${label}: canonical contaminado por query/fragment`).not.toMatch(/[?#]/);

  const { defined, refs, orgNodes } = await readGraph(page, [...REF_KEYS], SITE);

  const dup = [...new Set(defined.filter((id, i) => defined.indexOf(id) !== i))];
  expect(dup, `${label}: @id duplicado → ${JSON.stringify(dup)}`).toEqual([]);

  expect(orgNodes, `${label}: ${orgNodes} nós #organization`).toBe(1);

  const broken = [...new Set(refs.filter((id) => !defined.includes(id)))];
  expect(broken, `${label}: referências @id quebradas → ${JSON.stringify(broken)}`).toEqual([]);

  const slots = await slotCounts(page);
  for (const slot of ["organization", "local-business", "website"]) {
    if (slots[slot] !== undefined) {
      expect(slots[slot], `${label}: slot "${slot}" com ${slots[slot]} nós`).toBe(1);
    }
  }
  return slots;
}

test.describe("Canonical único e identidade Organization", () => {
  for (const path of ROUTES) {
    test(`${path} tem canonical único, Organization única e refs resolvidas`, async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      await assertRoute(page, path);
    });
  }

  test("query string e fragment não contaminam o canonical", async ({ page }) => {
    const cases = [
      { path: "/", url: "/?utm_source=google&utm_medium=cpc" },
      { path: "/servicos", url: "/servicos?utm_source=newsletter#lista" },
      { path: "/contato", url: "/contato#formulario" },
      { path: "/empresa-de-ti-curitiba", url: "/empresa-de-ti-curitiba?utm_campaign=b2b#planos" },
    ];
    for (const c of cases) {
      await page.goto(c.url, { waitUntil: "networkidle" });
      await assertRoute(page, c.path, `${c.url}`);
    }
  });

  test("slots institucionais não são recriados na hidratação", async ({ page }) => {
    await page.goto("/sobre", { waitUntil: "domcontentloaded" });
    const before = await slotCounts(page);
    await page.waitForLoadState("networkidle");
    const after = await slotCounts(page);
    for (const slot of ["organization", "local-business"]) {
      if (before[slot] !== undefined || after[slot] !== undefined) {
        expect(after[slot] ?? 0, `slot "${slot}" recriado na hidratação`).toBe(1);
      }
    }
  });

  test("navegação SPA não acumula canonical nem duplica a Organization", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await assertRoute(page, "/");

    for (const target of ["/sobre", "/servicos", "/contato", "/empresa-de-ti-curitiba", "/blog"]) {
      const link = page.locator(`a[href="${target}"]`).first();
      if (await link.count()) {
        await link.click();
        await page.waitForURL(`**${target}`, { timeout: 15000 });
      } else {
        await page.goto(target, { waitUntil: "networkidle" });
      }
      await page.waitForLoadState("networkidle");
      await assertRoute(page, target, `spa:${target}`);
    }
  });
});
