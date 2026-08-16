---
name: Micro-Rodada Indexação 1.1 — publicação e baseline pós-deploy
description: Deploy de 16/08/2026 resolveu a divergência noindex×index dos 4 bairros; baseline GSC pós-deploy e regra de observação sem ação.
type: feature
---
- Publicado em 2026-08-16 (UTC). `/bairros/boqueirao|cajuru|pinheirinho|cidade-jardim-sjp` passaram de
  `noindex, follow` em produção para `index, follow`. A divergência produção × repositório está encerrada.
- Smoke de produção: HTTP 200, canonical self, 1×H1, WebPage + BreadcrumbList + FAQPage, 36–37 links internos por rota.
- `/areas-atendidas` publica os 21 links do diretório `src/lib/bairrosDirectory.ts` — fim das páginas de bairro órfãs.
- Baseline pós-deploy: `reports/indexation-microlot-1.json`, campo `baseline` = `2026-08-16T01:38:21.308Z`,
  propriedade `sc-domain:otecnicodeinformatica.com.br`. Coorte: DISCOVERY_FIX 7 · OBSERVE 3.
- As 4 rotas publicadas retornam `URL is unknown to Google` / `NO_DATA` logo após o deploy — é ausência de dado,
  não sinal negativo. Proibido mudar threshold, conteúdo ou rota com base nisso.
- Pendências herdadas: click depth ≥ 4 em `/equipamentos/desktop` e `/equipamentos/impressora`; órfãos de descoberta
  em `/servicos/conserto-pc-notebook/centro` e `/servicos/formatacao-computador/batel`.
- Reobservação: `npm run report:indexation-microlot-1` comparando contra esse baseline.
- Documento: `docs/relatorio-microrodada-indexacao-1-1.md`.
