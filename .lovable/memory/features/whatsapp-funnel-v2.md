---
name: WhatsApp Branched Funnel V3.1
description: Funil ramificado, somente texto, com aviso obrigatório centralizado e zero dependência de storage.
type: feature
---

# Funil V3.1 (Junho 2026)

`src/components/WhatsAppFunnel.tsx` — 4 etapas, todas text/múltipla escolha:
1. Equipamento (PC, TV, Celular, Som, Videogame, Outro) — auto-advance ao clicar.
2. Marca + sintoma (ou descrição livre para "Outro"). Declarado em `equipmentBranches.ts`.
3. `ColetaRequiredCard` quando `sintoma.requiresColeta === true` (não-liga, desliga sozinho, tela quebrada, molhou, sem imagem, etc.) — exige checkbox de aceite (R$ 300 mínimo + prazo).
4. Confirmação + envio.

## Travas de validação
- `validateStep(step)` é fonte única de verdade. **Não chamar dentro de `next()`** (causaria falso negativo no auto-advance do equipamento). Roda em:
  - `canAdvance` (desabilita "Continuar" reativamente)
  - `submit` (revalida todas as etapas antes de abrir WhatsApp — se falhar, volta o usuário ao step quebrado).

## Aviso obrigatório
- Fonte única: `src/lib/funnelWarning.ts` exporta `VIDEO_WARNING` e `withVideoWarning(msg)`.
- `buildMessage` no funil e `FALLBACK_TEXT` em `FunilIndisponivel` aplicam `withVideoWarning`.
- Quando vem `presetMessage` de outro CTA, `withVideoWarning` re-aplica no final.

## Storage
- **0 dependências**. Bucket `funnel-uploads` foi apagado via Storage API (edge function temporária `cleanup-funnel-bucket` em 2026-06-15, já removida). Migração `20260615082307` removeu as policies de `storage.objects`. Nenhum upload no site.
- Exigência de fotos/vídeo é transferida para a mensagem final do WhatsApp.

## Admin
- `/admin/funnel` (proteção via `user_roles` + `has_role`).
- Filtros: equipamento, sintoma, status, coleta, envio WhatsApp (mensagem gerada / não), busca em texto.
- Export CSV (Excel-friendly, BOM, todas as colunas) e PDF (jspdf + jspdf-autotable, landscape A4 com apêndice de mensagens completas).
- Drawer mostra "Respostas da triagem" estruturadas + UTMs + mensagem WhatsApp + notas internas.

## Testes
- `WhatsAppFunnel.integration.test.tsx` cobre 3 jornadas (PC simples, TV não-liga com barreira de R$ 300, Celular tela quebrada com cláusulas de mídia) + guard de submit.
- `equipmentBranches.test.ts` valida flags `requiresColeta`/`requiresVideo`.

Storage key atual: `wa_funnel_answers_v3`. v1/v2 e bucket `funnel-uploads` deprecados.
