/**
 * Extrai as OFERTAS REAIS já exibidas em /precos-e-politicas a partir do
 * código-fonte da página — sem inventar valores.
 *
 * Garante paridade entre o preço visível (HTML estático + hidratado) e o
 * markup `Offer` do JSON-LD. Se a página mudar de preço, o estático muda junto.
 */
import { readFileSync, existsSync } from "node:fs";

const SOURCE = "src/pages/PrecosEPoliticas.tsx";

const ROW =
  /\{\s*nome:\s*"((?:[^"\\]|\\.)*)"\s*,\s*valor:\s*"((?:[^"\\]|\\.)*)"\s*(?:,\s*obs:\s*"((?:[^"\\]|\\.)*)"\s*)?\}/g;

const clean = (s) => (s ?? "").replace(/\\"/g, '"').replace(/\s+/g, " ").trim();

/** "a partir de R$ 99,99" → { price: "99.99", priceCurrency: "BRL" } */
export function parsePrice(label) {
  const m = /R\$\s*([\d.]+),(\d{2})/.exec(label ?? "");
  if (!m) return null;
  return { price: `${m[1].replace(/\./g, "")}.${m[2]}`, priceCurrency: "BRL" };
}

/** Ofertas visíveis da rota, ou null quando a rota não expõe preços. */
export function priorityOffers(path) {
  if (path !== "/precos-e-politicas") return null;
  if (!existsSync(SOURCE)) return null;
  const src = readFileSync(SOURCE, "utf8");
  const out = [];
  const seen = new Set();
  for (const m of src.matchAll(ROW)) {
    const nome = clean(m[1]);
    const valor = clean(m[2]);
    const parsed = parsePrice(valor);
    if (!nome || !parsed || seen.has(nome)) continue;
    seen.add(nome);
    out.push({ nome, valor, obs: clean(m[3]), ...parsed });
  }
  return out.length ? out.slice(0, 12) : null;
}

export const PRIORITY_OFFER_PATHS = ["/precos-e-politicas"];
