/**
 * ─────────────────────────────────────────────────────────────
 * JSON-LD NO SSR (coletor por requisição)
 * ─────────────────────────────────────────────────────────────
 * Os slots de JSON-LD são mantidos no cliente por efeito (`useJsonLdSlot`),
 * o que deixava o HTML do servidor sem nenhum dado estruturado depois da
 * migração para SSR. Aqui os mesmos registros são coletados durante a
 * renderização do servidor e emitidos por `<JsonLdSsrSink />`, que o
 * `__root` renderiza DEPOIS do `<Outlet />` — assim os schemas das rotas
 * já estão coletados.
 *
 * O coletor vive no contexto React (uma instância por árvore/renderização),
 * portanto não há vazamento entre requisições concorrentes.
 */
import { createContext, useContext } from "react";

export interface JsonLdCollectorEntry {
  slot: string;
  schema: Record<string, unknown>;
  priority: number;
}

export interface JsonLdCollector {
  entries: JsonLdCollectorEntry[];
}

export const JsonLdCollectorContext = createContext<JsonLdCollector | null>(null);

export function createJsonLdCollector(): JsonLdCollector {
  return { entries: [] };
}

export function useJsonLdCollector() {
  return useContext(JsonLdCollectorContext);
}

/** Emite um <script> por slot, mantendo o de maior prioridade. */
export function JsonLdSsrSink() {
  const collector = useContext(JsonLdCollectorContext);
  if (!collector || collector.entries.length === 0) return null;

  const vencedores = new Map<string, JsonLdCollectorEntry>();
  for (const entry of collector.entries) {
    const atual = vencedores.get(entry.slot);
    if (!atual || entry.priority >= atual.priority) vencedores.set(entry.slot, entry);
  }

  return (
    <>
      {[...vencedores.values()].map((entry) => (
        <script
          key={entry.slot}
          type="application/ld+json"
          data-schema-key={entry.slot}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry.schema) }}
        />
      ))}
    </>
  );
}
