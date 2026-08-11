import { test, expect, type Page } from "@playwright/test";

/**
 * Guarda de regressão estrutural do JSON-LD LocalBusiness (NAP, área atendida,
 * horários) na home e nas páginas de atendimento, além de BreadcrumbList e
 * unicidade das metatags sociais (og:image / twitter:*).
 */

const ATENDIMENTO_PATHS = [
  "/atendimento-domicilio",
  "/atendimento-remoto",
  "/coleta-e-entrega",
];

const EXPECTED_PHONE = "+5541997452053";
const EXPECTED_CITY = "Curitiba";
const EXPECTED_REGION = "PR";

type Json = Record<string, unknown>;

async function readJsonLd(page: Page): Promise<Json[]> {
  await page.waitForFunction(
    () => document.querySelectorAll('script[type="application/ld+json"]').length > 0,
    undefined,
    { timeout: 15000 },
  );
  const raw = await page.$$eval('script[type="application/ld+json"]', (nodes) =>
    nodes.map((n) => n.textContent ?? ""),
  );
  const out: Json[] = [];
  for (const text of raw) {
    if (!text.trim()) continue;
    let parsed: unknown;
    expect(() => {
      parsed = JSON.parse(text);
    }, `JSON-LD inválido: ${text.slice(0, 120)}`).not.toThrow();
    if (Array.isArray(parsed)) out.push(...(parsed as Json[]));
    else if (parsed) out.push(parsed as Json);
  }
  return out;
}

function hasType(node: Json, type: string): boolean {
  const t = node["@type"];
  return Array.isArray(t) ? t.includes(type) : t === type;
}

function findLocalBusiness(nodes: Json[]): Json | undefined {
  return nodes.find(
    (n) =>
      hasType(n, "LocalBusiness") ||
      hasType(n, "ProfessionalService") ||
      hasType(n, "ComputerRepairService"),
  );
}

function assertLocalBusiness(node: Json | undefined, path: string) {
  expect(node, `LocalBusiness ausente em ${path}`).toBeTruthy();
  const lb = node as Json;

  // NAP — nome
  expect(String(lb.name ?? ""), `name vazio em ${path}`).not.toHaveLength(0);

  // NAP — endereço
  const address = lb.address as Json | undefined;
  expect(address, `address ausente em ${path}`).toBeTruthy();
  expect(address!["@type"]).toBe("PostalAddress");
  expect(address!.addressLocality).toBe(EXPECTED_CITY);
  expect(address!.addressRegion).toBe(EXPECTED_REGION);
  expect(address!.addressCountry).toBe("BR");

  // NAP — telefone (canônico, só no schema)
  expect(lb.telephone, `telephone divergente em ${path}`).toBe(EXPECTED_PHONE);

  // Geo
  const geo = lb.geo as Json | undefined;
  expect(geo, `geo ausente em ${path}`).toBeTruthy();
  expect(Number(geo!.latitude)).toBeLessThan(0);
  expect(Number(geo!.longitude)).toBeLessThan(0);

  // Área atendida
  const area = lb.areaServed as Array<Json> | undefined;
  expect(Array.isArray(area), `areaServed deve ser lista em ${path}`).toBe(true);
  expect(area!.length).toBeGreaterThanOrEqual(1);
  for (const city of area!) {
    expect(city["@type"]).toBe("City");
    expect(String(city.name ?? "").length).toBeGreaterThan(1);
  }
  expect(area!.some((c) => String(c.name).includes(EXPECTED_CITY))).toBe(true);

  // Horários
  const hours = lb.openingHoursSpecification as Array<Json> | undefined;
  expect(Array.isArray(hours), `openingHoursSpecification ausente em ${path}`).toBe(true);
  expect(hours!.length).toBeGreaterThanOrEqual(1);
  for (const h of hours!) {
    expect(h["@type"]).toBe("OpeningHoursSpecification");
    expect(h.dayOfWeek).toBeTruthy();
    expect(String(h.opens)).toMatch(/^\d{2}:\d{2}$/);
    expect(String(h.closes)).toMatch(/^\d{2}:\d{2}$/);
  }

  // Regra do projeto: nunca inventar avaliação
  expect(lb.aggregateRating, `aggregateRating proibido em ${path}`).toBeUndefined();
}

test.describe("JSON-LD LocalBusiness", () => {
  test("home expõe LocalBusiness completo", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const nodes = await readJsonLd(page);
    assertLocalBusiness(findLocalBusiness(nodes), "/");
  });

  for (const path of ATENDIMENTO_PATHS) {
    test(`${path} expõe LocalBusiness consistente e BreadcrumbList`, async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      const nodes = await readJsonLd(page);
      assertLocalBusiness(findLocalBusiness(nodes), path);

      const crumb = nodes.find((n) => hasType(n, "BreadcrumbList"));
      expect(crumb, `BreadcrumbList ausente em ${path}`).toBeTruthy();
      const items = crumb!.itemListElement as Array<Json>;
      expect(items.length).toBeGreaterThanOrEqual(2);
      items.forEach((item, i) => {
        expect(item.position).toBe(i + 1);
        expect(String(item.name ?? "").length).toBeGreaterThan(1);
        expect(String(item.item ?? "")).toMatch(/^https:\/\/tecnico\.curitiba\.br/);
      });
      expect(String(items[items.length - 1].item)).toContain(path);
    });
  }

  test("/gestor-responsavel expõe BreadcrumbList e autoridade consistente", async ({ page }) => {
    await page.goto("/gestor-responsavel", { waitUntil: "networkidle" });
    const nodes = await readJsonLd(page);

    const crumb = nodes.find((n) => hasType(n, "BreadcrumbList"));
    expect(crumb).toBeTruthy();
    const items = crumb!.itemListElement as Array<Json>;
    expect(String(items[items.length - 1].item)).toContain("/gestor-responsavel");

    assertLocalBusiness(findLocalBusiness(nodes), "/gestor-responsavel");

    const person = nodes.find((n) => hasType(n, "Person"));
    if (person) {
      expect(person.worksFor).toBeTruthy();
      expect(String(person.name ?? "").length).toBeGreaterThan(2);
    }
  });
});

test.describe("Metatags sociais únicas", () => {
  for (const path of ["/", ...ATENDIMENTO_PATHS, "/gestor-responsavel"]) {
    test(`${path} tem exatamente uma tag social de cada tipo`, async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      const counts = await page.evaluate(() => ({
        twitterCard: document.querySelectorAll('meta[name="twitter:card"]').length,
        twitterTitle: document.querySelectorAll('meta[name="twitter:title"]').length,
        twitterImage: document.querySelectorAll('meta[name="twitter:image"]').length,
        ogImage: document.querySelectorAll('meta[property="og:image"]').length,
        ogTitle: document.querySelectorAll('meta[property="og:title"]').length,
        canonical: document.querySelectorAll('link[rel="canonical"]').length,
      }));
      expect(counts.twitterCard, `twitter:card duplicado em ${path}`).toBe(1);
      expect(counts.twitterTitle).toBe(1);
      expect(counts.twitterImage).toBe(1);
      expect(counts.ogImage).toBe(1);
      expect(counts.ogTitle).toBe(1);
      expect(counts.canonical).toBe(1);

      const og = await page.getAttribute('meta[property="og:image"]', "content");
      expect(og).toMatch(/^https:\/\//);
      const w = await page.getAttribute('meta[property="og:image:width"]', "content");
      const h = await page.getAttribute('meta[property="og:image:height"]', "content");
      expect(w).toBe("1200");
      expect(h).toBe("630");
    });
  }
});
