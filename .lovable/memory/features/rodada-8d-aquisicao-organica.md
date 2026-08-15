---
name: Rodada 8D — aquisição orgânica controlada
description: QR no link builder, canal GBP separado do orgânico, bloco "Aquisição real" no /admin/conversao, relatório JSON/MD e regressão do pop-up de saída
type: feature
---

- QR code é gerado **apenas** a partir da URL já validada por `construirLinkAquisicao` (import dinâmico de `qrcode`, sem peso no bundle inicial).
- Taxonomia: canal próprio **`gbp`** (`utm_medium=organic_gbp`, presets GBP do link builder) nunca colapsa com Google Search `organic`; social orgânico (facebook/instagram + organic) cai em `social`, não em organic/referral; internal/QA nunca vira direct.
- `/admin/conversao` tem o bloco `AquisicaoReal`: soma principal só com canais externos; internal/QA e UNKNOWN ficam separados; reason codes `MISSING_ATTRIBUTION_SIGNAL` / `INVALID_UTM` / `UNKNOWN_REFERRER`; milestones 1/5/10/25/50; marca FIRST ACQUISITION SESSION.
- `npm run report:acquisition-performance` grava `reports/acquisition-performance.{json,md}` + `docs/relatorios/aquisicao-baseline.md`, com funil por canal e por landing (só aquisição).
- E2E: `e2e/aquisicao-atribuicao.spec.ts` (GBP → landing → navegação sem UTM → wa.me com atribuição) e `e2e/popup-saida.spec.ts` (pop-up de saída: topo, rolagem, mobile/desktop, botão e Escape). O pop-up tem foco no diálogo ao abrir e restauração de foco ao fechar — não redesenhar de novo.
- Baseline 8D: 41 eventos, 20 sessões, **0 aquisição** (100% internal). Experimento 1 DISABLED, veredito LOW_EVIDENCE. Edge 404: READY_TO_DEPLOY.
