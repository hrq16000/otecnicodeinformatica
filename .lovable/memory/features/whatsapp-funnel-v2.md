---
name: WhatsApp Branched Funnel V3
description: Funil ramificado por equipamento, somente texto/múltipla escolha. Sem upload — exigência de vídeo vai na mensagem final do WhatsApp.
type: feature
---

# Funil V3 (Junho 2026)

`src/components/WhatsAppFunnel.tsx` tem 4 etapas:
1. Equipamento (PC, TV, Celular, Som, Videogame, Outro)
2. Marca + sintoma (múltipla escolha) — declarado em `src/components/funnel/equipmentBranches.ts`. Para "Outro" vira descrição livre.
3. Card "Coleta e Entrega obrigatória" para sintomas marcados `requiresColeta` (não-liga, desliga sozinho, tela quebrada, molhou, sem imagem, etc.) — exige checkbox de aceite com R$ 300 mínimo + prazo.
4. Confirmação + envio para WhatsApp.

**Regra de negócio (jun/26):** o site NÃO faz upload de fotos/vídeos (sem storage). A exigência de mídia foi transferida para a mensagem pré-preenchida do WhatsApp, que termina com aviso em destaque: vídeo do equipamento completo (com etiqueta traseira), sem áudio nem ruídos, ou o atendimento não é iniciado.

WhatsApp humano só abre no step 3 após a triagem. Submissão grava `funnel_submissions` (anon INSERT, RLS) com sintoma, requires_coleta e UTMs — `media_paths` permanece `[]`.

`TopOfferBanner` (apenas home) promove R$ 99,99 / 30 min e abre o funil via `wa-funnel:open`.

Storage key atual: `wa_funnel_answers_v3` (v1/v2 deprecadas). Bucket `funnel-uploads` foi descontinuado.
