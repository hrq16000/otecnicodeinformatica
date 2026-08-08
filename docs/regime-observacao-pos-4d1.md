# Regime de observação comercial — pós-4D.1

**Status:** CONGELAMENTO ATIVO até existir baseline útil.
**Verticais sob observação:** `/servicos/conserto-tv`, `/servicos/conserto-placa`,
`/servicos/conserto-monitor`.

## Marco oficial

| Marco | UTC | Curitiba |
| --- | --- | --- |
| T1 | 2026-08-08T00:05:45Z | 2026-08-07 21:05:45 -03:00 |
| Início do baseline comercial (fim dos smoke tests) | 2026-08-08T00:10:00Z | 2026-08-07 21:10:00 -03:00 |

Somente eventos posteriores ao início do baseline comercial alimentam taxas de
conversão completas.

## Pipeline validado

```text
funnel_open → funnel_stage/triagem → funnel_stage/submit → wa_click
```

tracking · RLS · dedupe · UTM · atribuição · SEO · prerender = **operacional**.

## Congelamento

Não alterar: hero, CTA, copy, quantidade/ordem de perguntas da triagem, preços,
garantia, SEO, titles, H1, schema, interlinking, páginas, rotas, imagens
promocionais, tracking e banco. Nenhuma vertical nova.

**Bloqueio de expansão:** áudio, JBL, soundbar, amplificador, receiver,
videogame, projetor, nobreak, novas páginas de sintomas, BGA, reballing.

**Exceção — somente P0:** tracking parou de persistir; rota fora do índice;
canonical incorreto; erro de produção; CTA não abre o funil; WhatsApp quebrado;
regressão de segurança.

## Exclusão de QA (nada é apagado)

Implementada em `src/lib/qaExclusion.ts` e aplicada nos painéis `/admin`
(`AdminDashboard`, `AdminConversao`). Eventos permanecem no banco, apenas são
rotulados `QA / NÃO COMERCIAL` e removidos das taxas.

Critérios:

- `utm_source` ∈ {teste_4d1, teste_4d, teste_4c, qa}
- `utm_medium` = `qa`
- `utm_campaign` ∈ {measurement_final, measurement_cutover}
- `session_id` em `QA_SESSION_IDS`
- `created_at` anterior a 2026-08-08T00:10:00Z (cutover 4C/4D/4D.1)

Inventário no momento do congelamento (leitura do banco):

| utm_source | utm_medium | utm_campaign | eventos | sessões | janela |
| --- | --- | --- | --- | --- | --- |
| teste_4d1 | cta | measurement_final | 37 | 4 | 00:00:52Z–00:06:09Z |
| site | cta | servicos_conserto_tv | 22 | 5 | 07/08 13:27Z–08/08 00:07Z |
| site | cta | servicos_conserto_monitor | 17 | 3 | 23:01Z–00:06Z |
| site | cta | servicos_conserto_placa | 10 | 1 | 00:06:19Z–00:06:27Z |
| teste_4d | cta | measurement_cutover | 4 | 1 | 23:01Z |
| (sem utm) | — | — | 2 | 2 | 22:54Z–00:07Z |

Todos são anteriores ao início do baseline → 100% classificados como QA.
**Baseline comercial atual: SEM DADOS.**

## Dados acumulados por vertical

`funnel_open`, `funnel_stage/triagem`, `funnel_stage/submit`, `wa_click`,
`cta_location`, `attribution_channel`, `viewport_bucket`, `path`, `city`,
`neighborhood`, `utm_source`, `utm_medium`, `utm_campaign`, `created_at`.

## Maturidade (sessões comerciais distintas por vertical)

| Faixa | Classificação |
| --- | --- |
| 0 | SEM DADOS |
| 1–14 | SINAL INICIAL |
| 15–49 | AMOSTRA ÚTIL |
| ≥50 | SINAL CONSISTENTE |

Não forçar decisão com poucas sessões.

## Gatilho da Rodada 4E

Executar apenas quando houver tráfego real (não-QA) suficiente para comparar
`open → submit → wa_click`, com separação obrigatória entre TV, PLACAS e
MONITOR. Pergunta única a responder: **em qual estágio comprovado estamos
perdendo potenciais clientes?**

Gargalos possíveis (nenhum presumido): A aquisição · B CTA · C triagem ·
D WhatsApp · E funil saudável.

## Provas reais (fluxo paralelo, não bloqueia congelamento)

Fluxo obrigatório: capturar → registrar origem → revisar privacidade → aprovar →
associar à rota → publicar. Nunca capturar → publicar. Registro em
`docs/registro-provas-visuais.md`.

Prioridade: TV (TV identificada · placa em diagnóstico · teste após reparo);
Placas (placa identificada · microscópio/instrumentação · validação);
Monitor (monitor em bancada · fonte/placa em diagnóstico · teste final).

Proibido exibir: nome, endereço, telefone, WhatsApp, número de OS associado a
pessoa, arquivos pessoais, tela com informações privadas. Serial ocultado quando
não houver necessidade de divulgação.

## P1 — Transparência de telemetria first-party

Consent Mode ≠ telemetria first-party `click_events`: com consentimento negado,
`click_events` continua registrando o funil, enquanto o banner fala
principalmente de cookies de medição.

Classificação: **P1 — REQUER AUDITORIA DE TRANSPARÊNCIA**. Não alterar texto nem
tracking fora da rodada própria: `RODADA 4E.1 — TRANSPARÊNCIA DE TELEMETRIA
FIRST-PARTY` (escopo: ConsentBanner, política de cookies, política de
privacidade, finalidade de `click_events`, campos coletados, retenção e
comportamento sem consentimento). Não mexer em analytics durante a auditoria.
