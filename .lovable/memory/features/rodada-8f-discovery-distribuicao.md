---
name: Rodada 8F — discovery e distribuição do cluster piloto
description: Coorte content_cluster_formatacao_v1, gate check:content-discovery (profundidade ≤3), distribuição GBP/social PRONTO_PARA_PUBLICAR e regra de não expandir sem evidência.
type: feature
---

- Coorte única em `src/lib/contentCohort.ts` (`content_cluster_formatacao_v1`, 4 URLs da 8E).
  Toda URL da coorte precisa existir em `src/lib/contentIntentMap.ts` — o gate cobra isso.
- Gate bloqueante `check:content-discovery` (roda no build, sobre `dist/`): rota 200,
  presença no sitemap, self-canonical, sem noindex, ≥2 links internos de entrada e
  profundidade de clique ≤3 a partir da Home.
- Links internos de entrada do cluster vivem em `CLUSTER_8F_INBOUND`, dentro de
  `scripts/curated-static-body.mjs` (HTML estático prerenderizado). Editar `index.html`
  não basta: a Home é reescrita pelo prerender.
- Distribuição (3 pautas × GBP/Facebook/Instagram) em `src/lib/contentDistribution.ts`,
  com links montados só por `utmLinkBuilder`. Estado permanente: PRONTO_PARA_PUBLICAR —
  não existe integração de postagem autorizada; nunca relatar como publicado.
- Sem Search Console conectado, o veredito é SEM_EVIDENCIA. Nunca inferir indexação,
  impressão ou "zero visibilidade". Semrush = demanda de mercado, não desempenho do site.
- Regra de expansão: nenhum cluster novo, keyword nova, título reescrito ou Ads enquanto
  a coorte estiver em LOW_EVIDENCE. Relatório: `docs/relatorio-rodada-8f-final.md`.
