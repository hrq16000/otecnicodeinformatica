---
name: Rodada 6B — atribuição e data quality
description: Classificação de oportunidade, Sankey de jornada, painel de qualidade e gates de PII/contexto local/jornada no CI
type: feature
---

## Definições fixas
- WhatsApp aberto = **microconversão**, nunca lead. Lead = registro em `funnel_submissions`. OS = conversão operacional.
- Métricas sempre por **sessão distinta**; duplo clique não infla conversão.
- Estágio sem integração aparece como "não carregado", nunca como zero.

## Classificação de oportunidade (`src/lib/oportunidadeAnalise.ts`)
- Amostra mínima: 30 sessões. Alvo: 10% WhatsApp/sessão.
- `expand_candidate` (≥ amostra e ≥ alvo) · `improve_page` (≥ amostra e < alvo) · `low_evidence` (< amostra).
- Abaixo da amostra o painel **não** emite recomendação.
- Dimensões: rota, cidade, bairro, serviço e canal.

## Superfícies
- Tudo dentro de `/admin/conversao`: `JornadaSankey`, `RelatorioOportunidade` (CSV/PDF) e `QualidadeDados`. Não criar painel novo.
- Relatório periódico: `npm run report:oportunidade` → `docs/relatorio-oportunidade.md` + Slack (fail-closed sem credenciais).

## Gates bloqueantes no CI
- `check:analytics-pii` — chaves sensíveis e repasse cego de objeto de formulário. Comentários e labels de breadcrumb não contam.
- `check:analytics-local-context` — cidade só sai da rota; cenários CWB, SJP, bairros, serviço×cidade e página global.
- `check:analytics-journey-integrity` — TTL do `journey_id`, `event_id`, first/last touch, contexto mínimo e analytics non-blocking.
