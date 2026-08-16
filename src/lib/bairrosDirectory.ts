/**
 * MICRO-RODADA INDEXAÇÃO 1 — diretório de descoberta interna dos bairros.
 *
 * Fonte de verdade para links internos das páginas locais indexáveis
 * (/bairros/<slug>). O diagnóstico mostrou páginas órfãs: existiam no sitemap,
 * mas nenhuma página indexável apontava para elas em HTML. Sitemap é sugestão;
 * link interno é caminho de rastreio.
 *
 * Regra: só entra aqui bairro com página local própria e indexability "index"
 * em src/lib/localIndexPolicy.json. Nada de bairro sem página.
 */
export interface BairroDirectoryItem {
  slug: string;
  nome: string;
  cidade: "Curitiba" | "São José dos Pinhais";
}

export const BAIRROS_DIRECTORY: BairroDirectoryItem[] = [
  { slug: "centro", nome: "Centro", cidade: "Curitiba" },
  { slug: "batel", nome: "Batel", cidade: "Curitiba" },
  { slug: "agua-verde", nome: "Água Verde", cidade: "Curitiba" },
  { slug: "portao", nome: "Portão", cidade: "Curitiba" },
  { slug: "cic", nome: "CIC (Cidade Industrial)", cidade: "Curitiba" },
  { slug: "santa-felicidade", nome: "Santa Felicidade", cidade: "Curitiba" },
  { slug: "boa-vista", nome: "Boa Vista", cidade: "Curitiba" },
  { slug: "bigorrilho", nome: "Bigorrilho", cidade: "Curitiba" },
  { slug: "cabral", nome: "Cabral", cidade: "Curitiba" },
  { slug: "cajuru", nome: "Cajuru", cidade: "Curitiba" },
  { slug: "boqueirao", nome: "Boqueirão", cidade: "Curitiba" },
  { slug: "pinheirinho", nome: "Pinheirinho", cidade: "Curitiba" },
  { slug: "xaxim", nome: "Xaxim", cidade: "Curitiba" },
  { slug: "sitio-cercado", nome: "Sítio Cercado", cidade: "Curitiba" },
  { slug: "afonso-pena", nome: "Afonso Pena", cidade: "São José dos Pinhais" },
  { slug: "cruzeiro", nome: "Cruzeiro", cidade: "São José dos Pinhais" },
  { slug: "costeira", nome: "Costeira", cidade: "São José dos Pinhais" },
  { slug: "guatupe", nome: "Guatupê", cidade: "São José dos Pinhais" },
  { slug: "aviacao", nome: "Aviação", cidade: "São José dos Pinhais" },
  { slug: "ouro-fino-sjp", nome: "Ouro Fino", cidade: "São José dos Pinhais" },
  { slug: "cidade-jardim-sjp", nome: "Cidade Jardim", cidade: "São José dos Pinhais" },
];

export const BAIRROS_DIRECTORY_POR_CIDADE = [
  {
    cidade: "Curitiba" as const,
    itens: BAIRROS_DIRECTORY.filter((b) => b.cidade === "Curitiba"),
  },
  {
    cidade: "São José dos Pinhais" as const,
    itens: BAIRROS_DIRECTORY.filter((b) => b.cidade === "São José dos Pinhais"),
  },
];

export const bairroHref = (slug: string) => `/bairros/${slug}`;
