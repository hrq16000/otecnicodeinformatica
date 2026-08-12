#!/usr/bin/env node
/**
 * CI gate: validates JSON-LD on /assistencia-tecnica-curitiba.
 *
 * Boots Vite preview, opens the route with Playwright, and asserts that
 * BreadcrumbList, LocalBusiness, FAQPage, and Service schemas are present
 * and shaped correctly. Exits non-zero on any failure.
 *
 * Usage:
 *   node scripts/validate-jsonld.mjs              # builds + serves locally
 *   BASE_URL=https://o domínio configurado \
 *     node scripts/validate-jsonld.mjs            # validates a live URL
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { chromium } from "playwright";

const ROUTE = "/assistencia-tecnica-curitiba";
const REQUIRED = ["BreadcrumbList", "LocalBusiness", "FAQPage", "Service"];

async function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* not ready */
    }
    await sleep(500);
  }
  throw new Error(`Server not ready at ${url}`);
}

async function main() {
  const baseUrl = process.env.BASE_URL;
  let preview;
  let url;

  if (baseUrl) {
    url = baseUrl.replace(/\/$/, "") + ROUTE;
  } else {
    // Start vite preview on a known port.
    preview = spawn("npx", ["vite", "preview", "--port", "4173", "--strictPort"], {
      stdio: "inherit",
      env: process.env,
    });
    await waitForServer("http://localhost:4173/");
    url = `http://localhost:4173${ROUTE}`;
  }

  const browser = await chromium.launch();
  const errors = [];
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    const schemas = await page.$$eval('script[type="application/ld+json"]', (nodes) =>
      nodes
        .map((n) => {
          try {
            return JSON.parse(n.textContent || "null");
          } catch (e) {
            return { __parseError: String(e) };
          }
        })
        .filter(Boolean),
    );

    for (const s of schemas) {
      if (s.__parseError) errors.push(`JSON parse error: ${s.__parseError}`);
    }

    const hasType = (t) =>
      schemas.find((s) => {
        const ty = s["@type"];
        return Array.isArray(ty) ? ty.includes(t) : ty === t;
      });

    for (const t of REQUIRED) {
      if (!hasType(t)) errors.push(`Missing required JSON-LD @type: ${t}`);
    }

    const lb = hasType("LocalBusiness");
    if (lb) {
      if (!lb.name) errors.push("LocalBusiness.name is missing");
      if (!lb.telephone) errors.push("LocalBusiness.telephone is missing");
      if (lb.address) errors.push("LocalBusiness must NOT include a postal address");
      const area = JSON.stringify(lb.areaServed || "").toLowerCase();
      if (!area.includes("curitiba")) errors.push("LocalBusiness.areaServed must include Curitiba");
    }

    const faq = hasType("FAQPage");
    if (faq) {
      const m = faq.mainEntity || [];
      if (!Array.isArray(m) || m.length < 3)
        errors.push(`FAQPage.mainEntity must have >=3 questions (got ${m.length})`);
      for (const q of m) {
        if (!q.name || !q.acceptedAnswer?.text)
          errors.push(`FAQPage question malformed: ${JSON.stringify(q).slice(0, 120)}`);
      }
    }

    const bc = hasType("BreadcrumbList");
    if (bc) {
      const items = bc.itemListElement;
      if (!Array.isArray(items) || items.length < 2)
        errors.push("BreadcrumbList.itemListElement must have >=2 entries");
    }

    const services = schemas.filter((s) => {
      const ty = s["@type"];
      return Array.isArray(ty) ? ty.includes("Service") : ty === "Service";
    });
    if (services.length < 4)
      errors.push(`Expected >=4 Service schemas (got ${services.length})`);
    for (const s of services) {
      if (!s.provider?.["@id"] || !s.provider["@id"].includes("#localbusiness"))
        errors.push(`Service "${s.name}" must reference LocalBusiness via provider.@id`);
    }
  } finally {
    await browser.close();
    if (preview) preview.kill("SIGTERM");
  }

  if (errors.length) {
    console.error("\n✗ JSON-LD validation FAILED:\n  - " + errors.join("\n  - "));
    process.exit(1);
  }
  console.log(`✓ JSON-LD validation passed for ${ROUTE} (${REQUIRED.join(", ")})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
