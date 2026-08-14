---
name: Rodada 8D — aquisição orgânica controlada
description: QR no link builder, bloco "Aquisição real" no /admin/conversao, relatório JSON/MD e E2E de atribuição GBP→WhatsApp
type: feature
---

- QR code é gerado **apenas** a partir da URL já validada por `construirLinkAquisicao` (import dinâmico de `qrcode`, sem peso no bundle inicial).
- `/admin/conversao` tem o bloco `AquisicaoReal`: soma principal só com canais externos; internal/QA e UNKNOWN ficam separados; reason codes `MISSING_ATTRIBUTION_SIGNAL` / `INVALID_UTM` / `UNKNOWN_REFERRER`; milestones 1/5/10/25/50; marca FIRST ACQUISITION SESSION.
- `npm run report:acquisition-performance` grava `reports/acquisition-performance.{json,md}` + `docs/relatorios/aquisicao-baseline.md`, com funil por canal e por landing (só aquisição).
- `e2e/aquisicao-atribuicao.spec.ts` cobre GBP → landing → navegação interna sem UTM → wa.me com atribuição e `text=`.
- Baseline 8D: 41 eventos, 20 sessões, **0 aquisição** (100% internal). Experimento 1 DISABLED, veredito LOW_EVIDENCE. Edge 404: READY_TO_DEPLOY.
