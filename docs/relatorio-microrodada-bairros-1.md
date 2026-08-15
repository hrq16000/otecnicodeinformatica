# Micro-Rodada Local 1 — 4 bairros enriquecidos

Data: execução da micro-rodada local sobre rotas **já existentes** (nenhuma rota nova criada).

## 1. Seleção (por que estes 4)

Inventário: 222 rotas `/bairros/*`. A maioria usava o template legado, com texto raso e
promessas de tempo de chegada proibidas. Critério de escolha: densidade populacional/comercial
real, demanda plausível de informática e ausência de conteúdo forte na rota.

| Bairro | Cidade | Rota | Motivo |
| --- | --- | --- | --- |
| Xaxim | Curitiba | `/bairros/xaxim` | Bairro residencial de grande porte, parque de máquinas domésticas antigo (disco, formatação, Wi-Fi). |
| Sítio Cercado | Curitiba | `/bairros/sitio-cercado` | Área residencial extensa somada a comércio de rua com PDV e impressora. |
| Aviação | São José dos Pinhais | `/bairros/aviacao` | Perfil comercial/logístico: parada de máquina tem custo operacional imediato. |
| Ouro Fino | São José dos Pinhais | `/bairros/ouro-fino-sjp` | Residencial com forte necessidade de preservação de dados em conserto de notebook. |

## 2. O que foi feito

- Conteúdo autoral criado em `src/lib/bairrosLote3.ts`: introdução local, contexto real do
  bairro, logística de atendimento, serviços pertinentes e FAQ local (4–6 itens por bairro),
  todos acima de 400 palavras úteis por página (renderizado: 1.037 a 1.219 palavras).
- Novo campo `problemasRelacionados` em `BairroData` (`src/lib/bairrosData.ts`) e bloco
  correspondente em `BairroLocalLayout` — interlinking contextual para `/problemas/*`.
- As 4 páginas passaram do template raso para `BairroLocalLayout`
  (`src/pages/bairros/{Xaxim,SitioCercado,Aviacao,OuroFinoSJP}.tsx`).
- Promoção a bairro-âncora em `src/lib/localIndexPolicy.json` (`bairrosAncora` + `loteLocal3`),
  com `intent` distinta e `parent` correto por cidade; exposto como `LOTE_LOCAL_3` em
  `src/lib/localIndexPolicy.ts` e `scripts/lib/local-index-policy.mjs`.
- Normalização de topônimos ampliada em `scripts/check-local-doorway.mjs`.

## 3. Restrições respeitadas

- Nenhuma rota nova.
- Nenhuma unidade física, técnico residente ou SLA de chegada inventado.
- Nenhum texto turístico sobre o bairro; o contexto local só existe onde muda a decisão técnica.
- Contato exclusivamente por WhatsApp, número canônico via configuração.

## 4. Validação

- `tsgo --noEmit`: sem erros.
- `npm run audit:seo`: sem erros (47 avisos preexistentes de comprimento de title/description).
- `npm run build`: sucesso.
- Render SSR conferido nas 4 rotas: `robots: index, follow`, sem termos proibidos de tempo de chegada.
- `check:local-index-policy`, `check:local-doorway` e `check:local-neighborhood-intent` continuam
  reportando "sem HTML estático no dist" para **todas** as rotas indexáveis — condição preexistente
  da migração para TanStack Start (o build agora gera `dist/client` + SSR em vez de HTML pré-renderizado
  por rota). Não é regressão desta micro-rodada; a adequação desses gates ao novo stack é item à parte.

## 5. Próximo passo sugerido

Adequar os três gates locais a ler o output SSR do novo stack, antes de promover um Lote 4.
