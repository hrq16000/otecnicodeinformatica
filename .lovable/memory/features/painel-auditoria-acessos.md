---
name: Painel de auditoria de acessos negados
description: /admin/auditoria-acessos sonda superfícies sensíveis (anon e authenticated), registra em admin_audit_log e mostra broadcast sanitizado
type: feature
---

# /admin/auditoria-acessos (Rodada 4C)

Painel admin-only, `noindex`, registrado em `src/LegacyApp.tsx`.

- **Sondas**: consulta proposital de `partners.documento`, `partners.notas_admin`,
  `reviews.client_phone`, `click_events` e `admin_audit_log` como visitante anônimo
  (fetch direto no PostgREST, sem sessão) e das RPCs administrativas como usuário autenticado.
- **Exibição**: apenas veredito (`negado` / `sem linhas` / `EXPOSTO`) e código HTTP.
  Nunca renderizar o valor retornado.
- **Registro**: cada rodada grava em `admin_audit_log` com `area: "seguranca"` e
  `action: "sondagem_acesso_negado"`.
- **Broadcast**: amostras ao vivo de `click_events` sempre passam por `projetarEventoClique`
  (`src/lib/realtimeSafeFields.ts`) antes de entrar em estado.

`partner_program_settings` SELECT `USING(true)` está allowlistado em
`scripts/check-rls-always-true.mjs` — lista de preços pública de uma linha, sem PII.

Documentos: `docs/relatorio-rodada-4c-final.md`, `docs/evidencias-rodada-4c.md`,
`docs/rodada-5-seo-local-plano.md`.
