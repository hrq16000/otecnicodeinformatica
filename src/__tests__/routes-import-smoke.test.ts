import { describe, it, expect } from "vitest";

/**
 * Smoke de rotas: importa TODOS os módulos de página do app.
 * Objetivo: falhar no CI quando um identificador usado no topo do módulo
 * não existe (ex.: `Navigate` não importado do @/lib/router-compat), que em
 * produção aparece como ReferenceError em runtime na navegação.
 *
 * Não renderiza a árvore inteira (custo alto e dependente de DOM/rede);
 * avalia o módulo, que é exatamente onde o ReferenceApError de import
 * ausente se manifesta.
 */
const pageModules = import.meta.glob("../pages/**/*.tsx");
const appModules = import.meta.glob("../{App,LegacyApp}.tsx");
const allModules = { ...appModules, ...pageModules } as Record<
  string,
  () => Promise<Record<string, unknown>>
>;

describe("rotas — smoke de importação", () => {
  it("encontra os módulos de página", () => {
    expect(Object.keys(pageModules).length).toBeGreaterThan(20);
  });

  for (const [path, load] of Object.entries(allModules)) {
    it(`carrega ${path} sem ReferenceError`, async () => {
      const mod = await load();
      expect(mod).toBeTruthy();
    });
  }
});
