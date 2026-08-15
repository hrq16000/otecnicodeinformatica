---
name: Rodada 8C — aquisição local controlada
description: Link builder de UTM, gate check:utm-governance, baseline de aquisição fail-closed, reason codes no painel de indexação e portal do pop-up de saída.
type: feature
---
- Fonte única de links de campanha: `src/lib/utmLinkBuilder.ts` + painel `/admin/link-builder`.
  Presets canônicos: gbp_profile, gbp_post, facebook_organic, instagram_organic,
  whatsapp_profile, offline_qr. `utm_source` interno/QA (site, ci, qa, e2e) é recusado.
- Validação fail-closed: destino só caminho interno canônico (sem host externo, sem
  `javascript:`, sem query); UTM em `[a-z0-9_-]` até 64 chars; PII (e-mail/telefone/CPF) recusada.
- Gate bloqueante `npm run check:utm-governance`: UTM proibida em sitemap/llms.txt/robots/canonical
  e em link interno permanente; busca diagnóstica não pode enviar a frase digitada.
- Relatório `npm run report:acquisition-performance` → `docs/relatorios/aquisicao-baseline.md`.
  Lê `click_events` (sem colunas de referrer/user agent — elas não existem; usar
  `attribution_channel`). Sem credencial ou sem dado, escreve "sem evidência".
- Baseline 2026-08-14: 40 eventos, 100% interno, 0 sessões de aquisição real.
  Só reavaliar depois de publicar os links do GBP.
- Eventos da busca diagnóstica: `diagnostic_search_start` (query_length),
  `diagnostic_search_result`, `diagnostic_no_result`, `diagnostic_result_click`.
- `AlertaIndexacao`: badge de severidade + reason code SEMPRE visível
  (`UNKNOWN_SEM_MOTIVO_REPORTADO` quando a fonte não informa) e contador de UNKNOWN por família.
- Pop-up de saída renderiza via `createPortal(document.body)`: ancestral com transform/filter
  quebrava o `position: fixed`. Não voltar a centralizar por `translate`.
