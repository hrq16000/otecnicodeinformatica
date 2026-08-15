---
name: Onda 30 — aprovação de fotos, editor local, similaridade cruzada e ImageObject
description: Painéis /admin/fotos, /admin/editor-local e /admin/performance-local; gates check:imageobject e check:cross-cluster; ImageObject estático por rota com foto real.
type: feature
---
- **Fotos**: `scripts/report-photo-review.mjs` (roda no `prebuild`) gera `public/photo-review.json` com preview, bytes, hash sha256, EXIF (bloqueia assinatura de IA), rotas de uso e reuso. Painel `/admin/fotos` só lê o JSON; a aprovação por hash fica em `localStorage` (checklist humano, não gate).
- **ImageObject**: `scripts/lib/fotos-rotas.mjs` mapeia rota → foto (`src/lib/clusterProblemas.ts` + manifesto `fotosLicenciadas.ts`) e `curated-static-body.mjs` injeta o nó `ImageObject` (slot `image`) no HTML estático com `creditText`/`license` reais. Gate `check:imageobject` no `postbuild` — 9 rotas cobertas.
- **Similaridade cruzada**: `check:cross-cluster` compara serviço × problema × bairro no `dist` (Jaccard 5-gramas em `<main>`), bloqueio ≥ 0.62, aviso ≥ 0.50. Baseline atual: máx 0.037.
- **Editor guiado**: `/admin/editor-local` — contexto, sintomas, atendimento e casos por bairro/cidade com checklist de originalidade (vs. `publish-status.json` < 0.45 e entre blocos < 0.35) e export JSON só quando tudo passa. Não escreve no site.
- **Performance local**: `/admin/performance-local` cruza `public/local-performance.json` (gerado por `report:local-performance` via connector gateway do Search Console, fail-closed sem credencial) com `click_events` (28 dias) e ordena por prioridade = impressões (peso maior em posição 5–20) + cliques de WhatsApp.
