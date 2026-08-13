/**
 * Adaptador único das fontes de páginas de problema.
 *
 * O inventário, o gate de intenção e o gerador de interlinks precisam da mesma
 * lista normalizada. Manter a junção aqui evita que cada script reimplemente a
 * deduplicação entre `problemaPagesData` e `CLUSTER_PROBLEMAS` — que foi
 * exatamente como as 33 entradas duplicadas passaram despercebidas.
 */
import { problemaPagesData as dadosProblemas } from "./problemaPagesData";
import { CLUSTER_PROBLEMAS } from "./clusterProblemas";
import { CURATED_PATHS } from "../../scripts/lib/curated-urls.mjs";
import type { EntradaProblema } from "./problemIntentPolicy";

export type EntradaInventario = EntradaProblema & {
  origem: "problemaPagesData" | "clusterProblemas";
  /** Texto curto usado para medir sobreposição semântica entre páginas. */
  texto: string;
};

const curados = (): Set<string> =>
  new Set(
    (CURATED_PATHS as (string | { path: string })[]).map((p) =>
      typeof p === "string" ? p : p.path,
    ),
  );

/** Lista deduplicada por URL, na ordem em que as fontes declaram. */
export function problemaPagesData(): EntradaInventario[] {
  const indexaveis = curados();
  const brutos: EntradaInventario[] = [
    ...dadosProblemas.map((p) => ({
      url: `/problemas/${p.slug}`,
      origem: "problemaPagesData" as const,
      titulo: p.title,
      h1: p.h1,
      metaDescription: p.metaDescription,
      indexavel: indexaveis.has(`/problemas/${p.slug}`),
      texto: `${p.slug} ${p.h1} ${p.metaDescription}`,
    })),
    ...CLUSTER_PROBLEMAS.map((p) => ({
      url: p.path,
      origem: "clusterProblemas" as const,
      titulo: p.metaTitle,
      h1: p.titulo,
      metaDescription: p.metaDescription,
      indexavel: indexaveis.has(p.path),
      texto: `${p.slug} ${p.titulo} ${p.metaDescription}`,
    })),
  ];

  const vistos = new Map<string, EntradaInventario>();
  for (const item of brutos) if (!vistos.has(item.url)) vistos.set(item.url, item);
  return [...vistos.values()];
}

/** URLs declaradas em mais de uma fonte — conflito estrutural, não editorial. */
export function urlsDuplicadasEntreFontes(): string[] {
  const contagem = new Map<string, number>();
  for (const p of dadosProblemas) {
    const u = `/problemas/${p.slug}`;
    contagem.set(u, (contagem.get(u) ?? 0) + 1);
  }
  for (const p of CLUSTER_PROBLEMAS) contagem.set(p.path, (contagem.get(p.path) ?? 0) + 1);
  return [...contagem].filter(([, n]) => n > 1).map(([u]) => u);
}
