---
name: Triagem V6 — bifurcação PF × PJ
description: Ramo residencial × empresarial no funil de WhatsApp, com etapas, mensagens, analytics e contexto de erro por customer_type.
type: feature
---

# Triagem V6 (PF × PJ)

`TRIAGE_VERSION = "6.0"` (bump invalida estado persistido V5).

## Fluxo
Etapa 0 sempre pergunta **"Este atendimento é para quem?"** (PF: "Para mim ou minha residência" · PJ: "Para uma empresa ou organização").

- **PF (`RESIDENTIAL_STEPS`)**: customer → equipment → identity → details → modality → terms → review.
- **PJ (`BUSINESS_STEPS`)**: customer → business-need → business-context → business-modality → terms → review. Nunca exibe a grade de equipamentos residenciais.

Campos PJ usam prefixo `biz-` e vivem em `answers.business` (separado de `answers.fields`).

## Regras
- Trocar PF↔PJ (`resetForCustomerType`) descarta o ramo anterior, preservando só o nome.
- `resetForEquipment` **preserva** `customerType` (o ramo é anterior ao equipamento).
- Modalidade PJ derivada de `biz-intent` + `biz-engagement`.

## Observabilidade
- `setFunnelBranchContext` injeta `customer_type` em todos os eventos (`wa_funnel_step`, submit etc.).
- Eventos novos: `wa_funnel_branch`, `wa_funnel_business_profile`.
- `setErrorContext({ funnel_customer_type })` anexa o ramo às exceções reportadas.

## Testes
- `src/lib/funnel/triageMachine.test.ts`, `WhatsAppFunnel.integration.test.tsx` (helpers `chooseResidential`/`fillQualification`).
- `e2e/triagem-pf-pj.spec.ts` — bifurcação, eventos e unicidade de JSON-LD após navegação SPA.
