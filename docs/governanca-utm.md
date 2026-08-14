# Governança de UTM e atribuição de aquisição

Fonte única da taxonomia: `src/lib/canalAtribuicao.ts`.
Gate bloqueante: `npm run check:acquisition-attribution`.

## Por que esta política existe

Auditoria de produção (13/08/2026) sobre `click_events`:

| utm_source | utm_medium | attribution_channel | sessões |
| --- | --- | --- | ---: |
| site | cta | direto | 11 |
| google | cta | ads | 2 |
| site | cta | referral | 2 |
| ci | cta | ads | 1 |
| ga4ci | cta | ads | 1 |

Nenhuma dessas sessões é aquisição. Todas nasceram de CTAs do próprio site ou
de automações de CI/E2E, mas estavam gravadas como "direto" e "ads". Com esse
denominador, qualquer taxa de conversão por canal e qualquer leitura de
prontidão de experimento fica falsa.

## Regras

1. **UTM de aquisição só entra pela URL de entrada da sessão.** `utmCapture.ts`
   captura no primeiro hit e o primeiro toque vence.
2. **Link interno nunca carrega UTM de aquisição.** Links de saída (WhatsApp)
   marcam `utm_source=site` + `utm_medium=cta_interno`. É proibido carimbar
   `organic`, `cpc`, `paid`, `seo` ou `referral` como default — isso falsifica
   a origem e é bloqueado pelo gate.
3. **Taxonomia única.** Canais válidos: `google_ads`, `paid_other`, `organic`,
   `social`, `referral`, `direct`, `internal`, `unknown`. Rótulos legados
   (`direto`, `ads`, `organico`, `referencia`) são normalizados na leitura; o
   histórico do banco não é reescrito.
4. **`internal` nunca é aquisição.** Fica fora de `CANAIS_DE_AQUISICAO` e,
   portanto, fora dos denominadores de CRO, funil e prontidão de experimento.
5. **Sem fallback geográfico.** Canal não inventa cidade nem bairro; ausência
   de dado vira `unknown`.

## Convenção de campanha (mídia paga)

```
utm_source=google
utm_medium=cpc
utm_campaign=<cluster>-<cidade>      ex.: manutencao-computador-curitiba
utm_content=<variacao-do-anuncio>
utm_term={keyword}
```

## Como auditar

```bash
npm run check:acquisition-attribution   # contrato no código
npm run check:analytics-event-contract  # nomes de evento e parâmetros
```

No painel `/admin/conversao`, a segmentação por canal passa a exibir
"Interno / QA (não é aquisição)" como linha separada — use-a para conferir
quanto do volume ainda é tráfego próprio.
