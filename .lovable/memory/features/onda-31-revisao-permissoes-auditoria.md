---
name: Onda 31 — fluxo de revisão de fotos, permissões por perfil, auditoria e tendências
description: Status rascunho→em revisão→aprovado→publicado em /admin/fotos, perfis admin/revisor, admin_audit_log, exportação CSV/JSON dos gates, limiares de similaridade por cluster e tendências em /admin/performance-local.
type: feature
---
- **Banco**: `photo_review_items` (hash único, slug, status `rascunho|em_revisao|aprovado|publicado`, updated_by) e `admin_audit_log` (actor, área, ação, alvo, details jsonb). RLS: leitura/escrita só para `admin` ou `moderator`; auditoria é append-only.
- **Perfis**: `src/hooks/useAdminRoles.ts` — `moderator` = **revisor**. Revisor move status até "aprovado"; **só admin publica**. `useAdminAuth` continua para os painéis que exigem admin puro.
- **Auditoria**: `src/lib/adminAudit.ts` (`registrarAuditoria` fail-soft + `lerAuditoria`), exibida em `/admin/fotos` e `/admin/editor-local`.
- **Fotos**: aprovação em lote por seleção, filtro por status e bloqueio de avanço quando `exifSuspeito` (assinatura de IA).
- **Gates**: `scripts/report-gates.mjs` (`npm run report:gates`, roda no fim do `postbuild`) consolida image-integrity, imageobject-jsonld, cross-cluster-similarity e photo-review em `public/gates-report.json`; painéis exportam CSV/JSON via `src/lib/exportarRelatorio.ts`.
- **Limiares**: `src/lib/similaridadeConfig.ts` — limiar externo/interno por cluster (serviço 0,45/0,35 · problema 0,40/0,30 · bairro 0,35/0,30) em localStorage, com score e justificativa por bloqueio. O gate de build segue fixo em 0,62.
- **Tendências**: `report-local-performance.mjs` grava também `rotasAnterior` (dias 32–60); `/admin/performance-local` compara 28d vs 28d anteriores (WhatsApp via `click_events`), lista maiores quedas/subidas e gera recomendações por rota.
