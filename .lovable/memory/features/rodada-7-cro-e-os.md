---
name: Rodada 7 — CRO controlado e fechamento operacional (OS)
description: Infraestrutura de experimentos fail-closed por rota/cidade, vínculo journey_id/lead ↔ ordem de serviço e Sankey multi-período com gargalos.
type: feature
---

## CRO controlado (`src/lib/croRodada7.ts`)

- Registro central `EXPERIMENTOS_CRO`; **todo experimento nasce `ativo: false`**.
- `decidirExperimento({ path, cidade, sessionId })` é fail-closed e devolve
  motivo do bloqueio: `sem_experimento`, `toggle_desligado`,
  `cidade_fora_do_escopo`, `registro_funil_incompleto`, `variantes_invalidas`.
- Um experimento só pode ser ativado quando `registroFunil` cobre
  `page_view, cta_click, triage_start, whatsapp_open, lead` (ETAPAS_OBRIGATORIAS).
- Distribuição determinística por sessão (FNV-1a por peso). Variação altera
  apenas apresentação — nunca preço, prazo, escopo, garantia ou triagem.
- Sem fallback geográfico: cidade fora da lista bloqueia o experimento.

## Vínculo lead ↔ OS

- `ordens_servico` ganhou `journey_id`, `lead_id` (FK `funnel_submissions`),
  `origin_route`, `city`, `neighborhood_slug`, `service_slug`.
- RPC `admin_link_os_lead(protocolo, lead_id)` — SECURITY DEFINER com guarda
  `has_role(auth.uid(), 'admin')`, execução revogada de `anon`/PUBLIC.
- No painel, OS só conta quando `journey_id` existe. Sem vínculo → "integração
  não disponível", nunca zero.

## Sankey multi-período

- `JornadaSankey` compara 7/30/90 dias sobre o mesmo carregamento; janela fora
  do intervalo carregado aparece como "fora do período carregado".
- Bloco "Maiores gargalos" ordena por perda × volume, por rota e por serviço.

## Rodada 7A — instrumentação antes de ativar

- `src/lib/croExposicao.ts` emite `experiment_exposure` (1× por sessão ×
  experimento) e define `activeVariant`, fazendo a variação viajar em
  `click_events.variant`.
- Contrato de analytics inclui `experiment_id` e `variant`.
- Gate `npm run check:cro-experiment`: 2+ variações, funil completo quando
  ativo, amostra mínima ≥ 100/variação, exposição instrumentada, sem variação
  de preço/prazo/garantia/SEO.
- Painel de experimentos em `/admin/conversao`.
- Veredito atual: **aguardar amostra** — volume real insuficiente
  (docs/relatorio-rodada-7a-final.md).
