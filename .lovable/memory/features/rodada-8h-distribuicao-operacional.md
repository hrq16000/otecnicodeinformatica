---
name: Rodada 8H — distribuição operacional do Cluster 1
description: Matriz canal × pauta, contrato de status READY/SCHEDULED/PUBLISHED/BLOCKED e proibição de declarar publicação sem prova.
type: feature
---
- Fonte do estado: `config/distribuicao-cluster-1.json` + `src/lib/distribuicaoOperacional.ts`.
- `PUBLISHED` exige `published_at` ISO real; sem isso é rebaixado a `READY` automaticamente. Nunca reescrever data para parecer recente.
- Links externos só via presets do `/admin/link-builder` (governança UTM 8C). Nada montado à mão.
- Relatório: `npm run report:distribution` → `docs/distribuicao-cluster-1.md` + `public/reports/distribuicao-cluster-1.json`.
- Aquisição (`report:acquisition-performance`) e busca (`report:content-cohort`) permanecem relatórios separados; o semanal apenas resume ambos no bloco "Cluster 1".
- Enquanto `cohortObservation.ts` disser `OBSERVE`: sem Cluster 2, sem Ads, sem CRO, sem novas páginas.
