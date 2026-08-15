# Rodada 8H — Distribuição operacional do Cluster 1

Data de execução: 2026-08-14 (UTC). Sem criação de páginas, clusters, títulos, H1, canonical, sitemap, CRO ou Ads.

## 1. Resumo executivo

A rodada entregou a camada **operacional** de distribuição: matriz auditável de canal × pauta,
contrato de status (`READY | SCHEDULED | PUBLISHED | BLOCKED`) com rebaixamento automático de
`PUBLISHED` sem `published_at`, e um bloco compacto no painel do Cluster 1. Nenhuma publicação
externa foi executada por este sistema — não há integração autorizada de publicação em GBP,
Facebook ou Instagram, então o estado real é `PRONTO_PARA_PUBLICAR`, não `PUBLISHED`.

## 2. Estado inicial

`OBSERVING` / `OBSERVE` — inalterado ao final da rodada.

## 3. URLs da coorte (`content_cluster_formatacao_v1`, congelada)

- `/blog/como-formatar-pc-sem-perder-arquivos` (informational)
- `/blog/quanto-custa-formatar-um-computador` (commercial)
- `/servicos/formatacao` (service)
- `/problemas/computador-lento` (diagnostic)

Saúde técnica: 200, index, self-canonical, sitemap, ≥2 links internos, profundidade ≤3 —
`check:content-intent` e `check:content-discovery` verdes no build. Nada foi alterado.

## 4. Matriz de distribuição

`docs/distribuicao-cluster-1.md` — 9 pares (3 pautas × 3 canais), todos `READY`, todos com URL
gerada pelos presets do `/admin/link-builder` (governança UTM da 8C). Nenhuma UTM montada à mão.

## 5. GBP

3 pautas prontas: custo de formatação (comercial), formatar resolve lentidão (diagnóstica),
backup antes de formatar (informacional). Status: `READY_TO_PUBLISH`. Publicação é manual.

## 6. Facebook

As mesmas 3 pautas, `utm_source=facebook&utm_medium=organic`. Status `READY`. Sem conteúdo novo no site.

## 7. Instagram

As mesmas 3 pautas, `utm_source=instagram&utm_medium=organic`, aplicáveis a bio/story/post.
Não foi criada página de "links da bio".

## 8. QR / offline

`READY` — preset `offline_qr` disponível no Link Builder. Canal **não ativo**; nenhum QR usado para
fabricar tráfego.

## 9. Sessões de aquisição

0 comprovadas. Sem publicação externa, não existe fonte de sessão de distribuição.

## 10. Internal / QA

Continuam excluídos do baseline pelo mecanismo QA existente. Nenhuma sessão interna contada.

## 11. UNKNOWN

Preservado com reason code. Nenhuma reclassificação para Direct.

## 12–17. Landing performance, cluster sessions, CTA, transições e WhatsApp

Sem fonte: `—`, não zero. CTA e conteúdo permanecem congelados.

## 18–21. Search discovery, indexação, impressões, cliques

Discovered 0/4 · Indexed 0/4 · impressões 0 · cliques 0 (`report:content-cohort`). Fonte contínua do
Search Console: `NO_CONTINUOUS_SOURCE` nesta execução — dados não foram inventados.

## 22. Milestones

Nenhum atingido: `FIRST_DISCOVERY`, `FIRST_INDEXATION`, `FIRST_IMPRESSION`, `FIRST_CLICK`,
`FIRST_ORGANIC_SESSION`, `FIRST_ACQUISITION_SESSION` seguem pendentes.

## 23. cohortObservation

Status `OBSERVING` · decisão `OBSERVE` — decidido pela política, não manualmente.

## 24. CRO readiness

Experimento 1 `DISABLED`. Nenhuma distribuição foi direcionada para gerar amostra.

## 25. Cluster 2

`NOT_AUTHORIZED`.

## 26. Edge 404

Pendente de credencial; workflow já preparado. Independente desta rodada.

## 27. Build

`npm run build` verde — 110 gates, 0 bloqueios, 0 avisos.

## 28. Testes

679 testes verdes em 29 arquivos (7 novos apenas para o contrato de status de publicação).

## 29. Pendências

- Publicação manual real em GBP/Facebook/Instagram e registro de `published_at` + prova em
  `config/distribuicao-cluster-1.json`.
- Conexão contínua com o Search Console para sair de `NO_CONTINUOUS_SOURCE`.
- Credencial da borda para o contrato de 404.

## Vereditos

1. **Distribuído por canais externos reais?** NÃO — links e pautas prontos, nenhuma publicação comprovada.
2. **Sessões humanas de aquisição:** 0 (GBP 0 · Facebook 0 · Instagram 0 · offline 0).
3. **Avanço além da landing:** CTA = 0 · diagnóstico = 0 · serviço = 0 · WhatsApp = 0.
4. **Search Console:** discovery 0 · indexation 0 · impressions 0 · clicks 0.
5. **Decisão da coorte:** `OBSERVE`.
6. **Justificativa para Cluster 2:** NÃO.
7. **Justificativa para Google Ads:** NÃO.
