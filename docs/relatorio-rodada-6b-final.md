# Rodada 6B — Atribuição, fechamento de conversão e data quality

Escopo: **SEO → jornada → WhatsApp → lead → OS**, sem PII e sem número inventado.
Fonte: `click_events` + `funnel_submissions`. Tráfego de QA excluído pelo
baseline comercial `2026-08-08T00:10:00Z`. Painel: `/admin/conversao`.

## 1. Definições fechadas

| Estágio | Evento | Natureza |
| --- | --- | --- |
| Visualização | `page_view` | denominador |
| CTA | `cta_click` / abertura de funil | microconversão |
| Triagem | `triage_start` → `triage_complete` | microconversão |
| WhatsApp | `whatsapp_open` / `wa_click` | **microconversão** (não é venda) |
| Lead | registro em `funnel_submissions` | **lead qualificado** |
| OS | `os_created` | conversão operacional (ainda sem vínculo técnico com `journey_id`) |

Regra permanente: abertura de WhatsApp **não** é lead. Contagem sempre por
**sessão distinta** — duplo clique não infla conversão.

## 2. O que passou a existir nesta rodada

- `src/lib/oportunidadeAnalise.ts` — classificação **Expand candidate ·
  Improve page · Low evidence** por rota, cidade, bairro, serviço e canal,
  com amostra mínima de 30 sessões e alvo de 10% WhatsApp/sessão.
- `src/components/admin/RelatorioOportunidade.tsx` — tabela por dimensão com
  volume ao lado da taxa e exportação CSV/PDF.
- `src/components/admin/JornadaSankey.tsx` — visualização da queda entre
  sessão → CTA → triagem → WhatsApp, com estágios não integrados sinalizados
  como "não carregado" em vez de zero.
- `src/components/admin/QualidadeDados.tsx` — painel compacto de data quality
  dentro do próprio `/admin/conversao` (sem criar terceiro painel).
- `scripts/report-opportunity.mjs` — relatório periódico em
  `docs/relatorio-oportunidade.md` + resumo no Slack (fail-closed).

## 3. Gates novos (bloqueantes)

| Gate | O que impede |
| --- | --- |
| `check:analytics-pii` | chave sensível em payload e repasse cego de objeto de formulário |
| `check:analytics-local-context` | cidade/bairro inventados; valida CWB, SJP, bairros, serviço×cidade e página global |
| `check:analytics-journey-integrity` | perda de TTL, `event_id`, first/last touch ou contexto mínimo; exige analytics non-blocking |
| `check:analytics-event-contract` | divergência de nomes/parâmetros contra snapshot versionado |

## 4. Vereditos

1. **Atribuição — aprovado com limite declarado.** First touch e last touch
   convivem lado a lado, sem modelo algorítmico opaco. Jornadas assistidas são
   descritivas; não substituem experimento.
2. **Fechamento de conversão — parcial.** Lead está vinculado à rota de origem;
   `os_created` ainda não tem vínculo técnico confiável com `journey_id` e por
   isso aparece como "não carregado", nunca como zero.
3. **Data quality — aprovado.** PII, contexto local, dedupe e exclusão de QA
   têm verificação automática no CI e leitura visível no painel.

## 5. Limites honestos

- Volume comercial pós go-live ainda é baixo: a maioria dos recortes fica em
  `low_evidence`, e nesse estado o painel **não** emite recomendação.
- Decisão de conteúdo continua dependendo de evidência do Search Console.
- Nenhuma métrica desta rodada mede receita.
