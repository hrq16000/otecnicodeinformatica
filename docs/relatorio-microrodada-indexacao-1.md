# Micro-Rodada Indexação 1 — diagnóstico de 10 URLs

Data do baseline: ver `reports/indexation-microlot-1.json` (campo `baseline`).
Coorte: `indexation_microlot_1`. Comando: `npm run report:indexation-microlot-1`.

## Método

- Universo: 153 URLs curadas (index + self-canonical + sitemap), excluindo `/admin`, `/debug`, `/status`.
- SSR real renderizado no harness (`scripts/lib/ssr-harness.mjs`), com snapshot invalidado antes de medir — o
  incidente da Micro-Rodada Local 2 mostrou que snapshot velho mente.
- Descoberta interna medida por links `<a href>` reais dentro de `<main>` e click depth por BFS a partir da home.
- Search Console apenas leitura: `searchAnalytics` (28 dias, dimensão page) + `urlInspection` nas 10 selecionadas.
- `UNKNOWN` nunca vira zero nem falha. Ausência de dado de performance é `NO_DATA`/`LOW_SAMPLE`, não "não indexado".

## Resultado do baseline (antes da correção)

| Situação | URLs |
| --- | --- |
| Técnica OK no SSR (robots index, canonical self, 1×H1) | 10/10 |
| Órfãs de link interno (`in=0`) | 2 (`/bairros/aviacao`, `/bairros/boqueirao`) |
| Click depth ≥ 4 | 3 (`/equipamentos/desktop`, `/equipamentos/impressora`, 1 artigo do blog) |
| Indexadas confirmadas | 1 (`/blog/backup-nuvem-empresas-qual-escolher`) |
| Discovered – currently not indexed | 4 |
| URL is unknown to Google | 4 |

## Correção aplicada (única, inequívoca)

Descoberta interna dos bairros. O hub `/areas-atendidas` linkava apenas 5 bairros (match por rótulo em
`CURITIBA_BAIRROS`), enquanto existem 21 páginas locais indexáveis no sitemap. Resultado: páginas boas,
tecnicamente corretas, sem nenhum caminho de rastreio em HTML.

- Novo `src/lib/bairrosDirectory.ts`: diretório das 21 páginas locais (14 Curitiba + 7 São José dos Pinhais).
- `src/pages/AreasAtendidas.tsx`: seção "Todas as páginas locais por bairro" com link para cada uma.
- Efeito medido: `/bairros/aviacao` e `/bairros/boqueirao` saíram de órfãs (`in=0`) para depth 4 com inbound real.

Nada de conteúdo novo, threshold alterado ou rota criada.

## Divergência produção × repositório (não é bug de código)

Inspeção direta do HTML de produção em 12/08–14/08:

| URL | Produção | Repositório |
| --- | --- | --- |
| `/bairros/boqueirao` | `noindex, follow` | `index, follow` |
| `/bairros/cajuru` | `noindex, follow` | `index, follow` |
| `/bairros/pinheirinho` | `noindex, follow` | `index, follow` |
| `/bairros/cidade-jardim-sjp` | `noindex, follow` | `index, follow` |

São exatamente as 4 páginas promovidas na Micro-Rodada Local 2. A promoção existe no código e ainda não foi
publicada. Enquanto não publicar, o Google continuará com razão excluindo por `noindex`.

O `Excluded by 'noindex' tag` de `/servicos/formatacao-computador/batel` tem `lastCrawlTime` 11/08 e a produção
atual já serve `index, follow`: é estado histórico, resolve no próximo rastreio. Não requer ação de código.

## Próxima micro-rodada (não executada aqui)

1. Publicar para eliminar a divergência de `noindex` dos 4 bairros.
2. Reduzir click depth de `/equipamentos/*` (hoje 4–6) com entrada contextual a partir de páginas de problema.
3. Reobservar a mesma coorte com o mesmo comando e comparar contra este baseline.
