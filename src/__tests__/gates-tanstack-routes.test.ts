import { describe, it, expect } from "vitest";
// @ts-expect-error — módulo .mjs de build, sem tipos
import {
  filenameToRoutePattern,
  patternToRegex,
  isAssetPath,
  isPrivatePath,
  readRouteUniverse,
} from "../../scripts/lib/tanstack-routes.mjs";

describe("universo de rotas TanStack (fonte dos gates)", () => {
  it("converte nome de arquivo em padrão de URL", () => {
    expect(filenameToRoutePattern("src/routes/servicos.formatacao.tsx", "src/routes")).toBe("/servicos/formatacao");
    expect(filenameToRoutePattern("src/routes/blog_.$slug.tsx", "src/routes")).toBe("/blog/$slug");
    expect(filenameToRoutePattern("src/routes/admin_.dashboard.tsx", "src/routes")).toBe("/admin/dashboard");
    expect(filenameToRoutePattern("src/routes/index.tsx", "src/routes")).toBe("/");
    expect(filenameToRoutePattern("src/routes/__root.tsx", "src/routes")).toBeNull();
  });

  it("casa segmentos dinâmicos e recusa caminhos inexistentes", () => {
    const re = patternToRegex("/blog/$slug");
    expect(re.test("/blog/tela-azul")).toBe(true);
    expect(re.test("/blog/tela-azul/extra")).toBe(false);
  });

  it("classifica assets e rotas privadas sem tratá-los como link quebrado", () => {
    expect(isAssetPath("/assets/app.css")).toBe(true);
    expect(isAssetPath("/sitemap.xml")).toBe(true);
    expect(isAssetPath("/servicos/formatacao")).toBe(false);
    expect(isPrivatePath("/admin/dashboard")).toBe(true);
    expect(isPrivatePath("/servicos/formatacao")).toBe(false);
  });

  it("negativo: rota inexistente NÃO é reconhecida pelo universo real", () => {
    const u = readRouteUniverse();
    expect(u.ok).toBe(true);
    expect(u.isKnownRoute("/servicos/formatacao")).toBe(true);
    expect(u.isKnownRoute("/rota-que-nunca-existiu-999")).toBe(false);
  });
});
