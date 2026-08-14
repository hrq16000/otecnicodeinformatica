# Rodada 8D — Ativação de aquisição orgânica controlada

## 1. Resumo executivo

Infraestrutura de reconhecimento da primeira sessão humana concluída: QR rastreável no link
builder, bloco "Aquisição real" no `/admin/conversao` (com milestone de FIRST ACQUISITION
SESSION), relatório `report:acquisition-performance` com saída JSON + MD e E2E de atribuição
GBP → landing → WhatsApp. Nenhuma landing nova, nenhuma mídia paga, nenhum evento fabricado.

## 2. Baseline

Janela de 30 dias: **41 eventos · 20 sessões · 0 sessões de aquisição · 20 internas/QA**.
Baseline pré-8D preservado (nada reclassificado).

## 3–5. Links GBP / Facebook / Instagram

Gerados exclusivamente por `/admin/link-builder` (presets `gbp_profile`, `gbp_post`,
`facebook_organic`, `instagram_organic`, `offline_qr`). Cada link agora traz QR code PNG
baixável, derivado apenas da URL já validada (fail-closed contra PII, destino inválido e
fonte interna/QA).

## 6. Landing strategy

- GBP perfil → `/tecnico-informatica-curitiba` (service_city, Curitiba, self-canonical, index).
- GBP post → `/problemas/computador-lento` (problem, diagnóstica, sem sufixo geográfico).
- Instagram → `/diagnostico-tecnico`; Facebook/WhatsApp → `/`.
Nenhuma rota criada nesta rodada.

## 7–9. Contrato de atribuição / first touch / last touch

Interno/QA vence qualquer sinal e nunca vira aquisição; UNKNOWN nunca é convertido em direct.
**Complemento 8D:** a taxonomia ganhou o canal próprio `gbp` — `utm_medium=organic_gbp`
(perfil e posts) não colapsa mais com Google Search orgânico, e social orgânico
(`facebook`/`instagram` + `organic`) é classificado como `social`, não como organic/referral.
First touch persiste em `utm_payload_v1` (primeiro hit ganha) e sobrevive à navegação interna,
que continua sem UTM na URL.


## 10. WhatsApp attribution

`wa.me` mantém `text=` contextual da rota e recebe a UTM da jornada; sem UTM externa o CTA é
marcado como `cta_interno`, nunca como organic/cpc.

## 11. Diagnóstico

`/diagnostico-tecnico` emite apenas eventos categóricos (`diagnostic_search_start`,
`diagnostic_search_result`, `diagnostic_no_result`, `diagnostic_result_click`). Texto livre
segue proibido pelo gate `check:utm-governance`.

## 12–14. Sessões

Aquisição: **0**. Internal: **20**. Unknown: **0**
(reason codes suportados: `MISSING_ATTRIBUTION_SIGNAL`, `INVALID_UTM`, `UNKNOWN_REFERRER`).

## 15–16. Funil por canal e por landing

Tabelas geradas em `reports/acquisition-performance.md` / `.json`; ambas vazias por ausência
de aquisição — sem estimativa.

## 17–18. Search Console e problem discovery

Sem conexão GSC vinculada ao projeto nesta rodada; monitor diário e o cluster `/problemas`
(162 URLs, 0 órfãs) seguem sem reestruturação.

## 19. Experiment readiness

Thresholds intocados. Experimento 1: **DISABLED**. Veredito: **LOW_EVIDENCE**.

## 20–21. Pop-up e Edge 404

Pop-up de saída sem novo redesign (apenas regressão). Edge 404: **READY_TO_DEPLOY**
(aguarda `CLOUDFLARE_API_TOKEN`; token nunca em código, log ou doc).

## 22–25. Segurança, gates, build e testes

Views públicas/RLS/admin authorization preservados. Gates verdes:
`check:utm-governance`, `check:acquisition-attribution`. Typecheck limpo. Nenhum gate novo
criado (sem lacuna real).

## 26. Pendências

- **P0** — nenhuma.
- **P1** — distribuição operacional real dos links GBP/social (ação humana fora do código).
- **P2** — deploy do Worker de borda quando houver token.
- **P3** — conectar Search Console ao projeto para leitura automática de indexação.

## Vereditos

1. Infraestrutura pronta para reconhecer a 1ª sessão humana sem classificá-la errado: **SIM**.
2. GBP e social com URLs oficiais rastreáveis e canônicas: **SIM**.
3. Sessões humanas reais de aquisição: **0**.
4. Sessões que chegaram a CTA/diagnóstico/triagem/WhatsApp: **0 / 0 / 0 / 0**.
5. Volume suficiente para CRO: **NÃO — CONTINUAR ACUMULANDO**.
