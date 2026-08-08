# Teste de balanceamento — legítimo interesse (telemetria `click_events`)

**Decisão:** 07/08/2026 — Curitiba/PR (referência UTC 08/08/2026)
**Responsável:** Henrique Rodrigues — responsável pelo projeto e pela decisão de governança
**Resultado:** APROVADO COM CONDIÇÕES
**Rodada de implementação:** 4E.4

> Registro interno de governança. Não constitui parecer jurídico profissional externo.

## A. Finalidade — legítima e específica

Medir o funcionamento e a conversão do funil de atendimento do tecnico.curitiba.br:
abertura, avanço, abandono e encaminhamento aos canais de contato, comparando
origem, CTA e contexto técnico.

## B. Necessidade — necessário e proporcional, com minimização obrigatória

Condição obrigatória cumprida na implementação: `viewport_width` exato deixou de ser
persistido; `viewport_bucket` é mantido por atender à análise responsiva demonstrada
nos painéis.

## C. Expectativa do titular — compatível

Banner informa a telemetria técnica; a política de privacidade tem seção própria;
a telemetria nasce da interação direta com o funil; `session_id` é limitado à aba;
não há correlação entre visitas nem identificação direta.

## D. Impacto — residual aceitável com salvaguardas

Dataset pseudônimo, sem IP, sem PII direta, sem texto livre, sem fingerprint,
sem perfil comportamental entre visitas, sem enriquecimento externo e sem leitura pública.

## E. Salvaguardas — suficientes, condicionadas à implementação aprovada

RLS; leitura apenas administrativa; `anon` restrito a inserção; allowlist de campos;
bloqueio de PII; `session_id` por aba; transparência pública; retenção raw de 90 dias;
expurgo fail-closed; consolidação antes do delete; remoção de `viewport_width`;
revisão periódica; ROPA; este registro.

## Condições obrigatórias e status de implementação

| # | Condição | Status |
| --- | --- | --- |
| 1 | Retenção raw de 90 dias | Implementada — `purge_click_events_raw` usa corte de 90 dias |
| 2 | Expurgo somente após consolidação validada | Implementada — expurgo aborta com dias não consolidados |
| 3 | Parar de persistir `viewport_width` | Implementada — campo removido do insert em `funnelAnalytics.ts` |
| 4 | Manter `viewport_bucket` | Mantido no raw e no agregado |
| 5 | Criar ROPA | `docs/ropa-telemetria-click-events.md` |
| 6 | Registrar o teste de balanceamento | Este documento |
| 7 | Revisar após o primeiro baseline útil | Pendente — depende do baseline pós-T1 |
| 8 | Não ampliar campos/finalidades automaticamente | Vigente — allowlist fechada |
| 9 | Nova finalidade exige nova avaliação | Vigente |
| 10 | Preservar a transparência pública da 4E.2 | Mantida — banner e política inalterados |

## Parâmetros fechados

```text
LEGAL_BASIS = LEGITIMATE_INTEREST
RAW_RETENTION_DAYS = 90
AGGREGATE_RETENTION_MONTHS = 24
LOW_COUNT_THRESHOLD = 5
PERSIST_VIEWPORT_WIDTH = false
GOVERNANCE_REVIEW_MONTHS = 12
```

## Revisão

Revisão obrigatória a cada 12 meses ou após o primeiro ciclo de baseline útil,
o que ocorrer primeiro. Alteração de prazo exige justificativa documentada
registrada antes do vencimento.
