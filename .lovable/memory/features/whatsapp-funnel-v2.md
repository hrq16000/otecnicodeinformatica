---
name: WhatsApp Branched Funnel V2
description: Refatoração do WhatsAppFunnel com ramificação por equipamento, upload obrigatório de mídia e regra de Coleta e Entrega
type: feature
---

# Funil V2 (Junho 2026)

`src/components/WhatsAppFunnel.tsx` agora segue 5 etapas obrigatórias:
1. Equipamento (PC, TV, Celular, Som, Videogame, Outro)
2. Marca + sintoma (chips múltipla escolha) — declarado em `src/components/funnel/equipmentBranches.ts`
3. Upload obrigatório de fotos (mín 1) + vídeo se sintoma exigir, com 3 checkboxes (equipamento completo, sem áudio, sem ruído). Storage: bucket privado `funnel-uploads`, URLs assinadas 24h.
4. Card "Coleta e Entrega obrigatória" para sintomas marcados `requiresColeta` (não-liga, desliga sozinho, tela quebrada, molhou, sem imagem, etc.) — exige checkbox de aceite com R$ 300 mínimo + prazo.
5. Confirmação + envio para WhatsApp.

WhatsApp humano só abre no step 4. Botões disabled bloqueiam avanço enquanto a triagem não estiver completa.

Submissão grava `funnel_submissions` (anon INSERT, RLS) com URLs das mídias, sintoma, requires_coleta e UTMs.

`TopOfferBanner` (apenas home) promove R$ 99,99 / 30 min e abre o funil via `wa-funnel:open`.

Storage key antiga `wa_funnel_answers_v1` foi substituída por `_v2`.
