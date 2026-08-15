# Micro-Rodada Local 2 — 4 bairros com conteúdo autoral

Data: 15/08/2026

## Escopo
Bairros reforçados (sem criar rota nova):
- `/bairros/boqueirao` — perfil comercial de bairro (lojas, escritórios pequenos, impressora/PDV)
- `/bairros/cajuru` — perfil estudantil e notebooks de uso intenso
- `/bairros/pinheirinho` — foco em cobertura Wi-Fi em casas alongadas e sobrados
- `/bairros/cidade-jardim-sjp` — home office e trabalho remoto em São José dos Pinhais

## Implementação
- `src/lib/bairrosLote4.ts`: conteúdo autoral (~820–1090 palavras úteis por página), FAQ local e links contextuais para `/servicos/*` e `/problemas/*` canônicos.
- `src/lib/bairrosData.ts`: Lote 4 incorporado ao registro global `BAIRROS`.
- `src/lib/localIndexPolicy.json` / `.ts` / `scripts/lib/local-index-policy.mjs`: slugs promovidos a bairros-âncora e registro `loteLocal4`.
- Páginas `Boqueirao.tsx`, `Cajuru.tsx`, `Pinheirinho.tsx`, `CidadeJardimSJP.tsx` migradas do `BairroTemplate` genérico para `BairroLocalLayout`.
- Removidas promessas proibidas de tempo fixo ("30–60 min") herdadas do template antigo. Nenhuma unidade física, técnico residente, avaliação ou número inventado.

## Incidente resolvido: falso `noindex` nos gates
`check:local-neighborhood-intent` acusava `noindex, follow` nas 4 rotas enquanto o SSR ao vivo emitia `index, follow`.

Causa: snapshot em `dist/` + `dist/ssr-snapshot-manifest.json` gerado antes do HMR aplicar a mudança de política; a assinatura de fonte coincidia, então o harness reaproveitou HTML velho dentro do TTL.

Correção operacional: invalidar snapshots (`rm -rf dist/ssr-snapshot-manifest.json dist/bairros`) sempre que `localIndexPolicy.json` mudar, antes de rodar os gates.

## Gates (todos verdes)
| Gate | Resultado |
| --- | --- |
| check:local-neighborhood-intent | OK — 21 bairros âncora (8 do Lote 2) |
| check:local-doorway | OK — nenhum padrão de doorway; maior par bairro↔bairro 0.169 (xaxim ↔ boqueirao), limite 0.400 |
| check:local-seo-quality | OK — 11 rotas locais indexáveis |
| check:local-interlinking | OK — mãe ⇄ bairros/cidades, serviços canônicos |
| check:local-service-intent | OK — 17 rotas, Jaccard máximo 0.232 |
| check:schema-standards | OK — 272 nós em 153 páginas indexáveis |
| check:sitemap-source | OK — 153 URLs |
| check:robots | OK |
| check:local-regression | OK |
| audit:seo | 0 erros (47 avisos de description > 160 chars, pré-existentes) |

## Pendências conhecidas (pré-existentes, fora do escopo)
- Suíte Vitest sem bloco `test` no `vite.config.ts`: specs Playwright em `e2e/` são coletadas pelo vitest e falham na importação; alguns testes de `src/lib` exigem ambiente jsdom com `sessionStorage`.
- 47 descriptions acima de 160 caracteres em rotas de serviço.
