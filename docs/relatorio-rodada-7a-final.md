# Rodada 7A — CRO controlado (Experimento 1)

## Veredito

**NÃO ATIVAR — AGUARDAR AMOSTRA.** O volume atual de `click_events` (36 eventos,
majoritariamente de QA/desenvolvimento) não sustenta leitura estatística de
experimento. Ativar agora produziria decisão baseada em ruído.

## O que foi entregue nesta rodada

1. **Instrumentação de exposição** (`src/lib/croExposicao.ts`): evento
   `experiment_exposure` com dedupe por sessão, fail-closed em relação a
   `decidirExperimento`, sem PII.
2. **Contrato de analytics** ampliado com `experiment_id` e `variant`
   (snapshot regravado e validado no CI).
3. **Gate bloqueante** `npm run check:cro-experiment`.
4. **Painel de experimentos** em `/admin/conversao`: prontidão, lacunas de
   registro e métricas por variação (sessões, CTA, triagem, WhatsApp, lead)
   com zero-state honesto.

## Condições objetivas para ativar o Experimento 1

- `registroFunil` do experimento cobrindo também `lead` (hoje falta);
- ≥ 200 sessões expostas por variação nas rotas declaradas;
- gargalo confirmado no Sankey (7/30/90 dias) para a rota-alvo.

Enquanto qualquer condição faltar, `ativo` permanece `false`.
