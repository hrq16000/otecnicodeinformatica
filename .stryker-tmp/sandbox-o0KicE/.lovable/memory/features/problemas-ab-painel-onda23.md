---
name: Onda 23 — painel A/B e telemetria de FAQ em /problemas
description: Painel /admin/experimento-wa (msg_a × msg_b por sintoma), variante estável por dispositivo, profundidade por seção de FAQ e gate E2E dos CTAs.
type: feature
---

- Variante do A/B (`msg_a`/`msg_b`) persiste em localStorage **e** cookie de 1 ano
  (`wa_variant_problemas`); `useVarianteWa()` resolve uma vez por sessão de navegação
  (SSR/pré-render sempre "a", só usado em href/onClick — sem hydration mismatch).
- Todo clique de WhatsApp no cluster /problemas dispara GA4 (`trackCTAClick`) **e**
  persiste em `click_events` via `trackWaClick` com `variant=msg_x`,
  `servico=<sintoma>` e `cta_position=problema_<secao>`. É essa gravação que alimenta o painel.
- Painel `/admin/experimento-wa`: taxas por SESSÃO (não por evento), por sintoma,
  delta B−A em p.p., Realtime em `click_events`, filtro por período, skeletons.
- `useFaqSectionDepth` emite `faq_section_depth` (25/50/75/100%) por seção `faq-N`,
  correlacionável com `faq_anchor_click`, `faq_internal_link` e os cliques de WhatsApp da mesma seção.
- Gate E2E `e2e/problemas-wa-cta.spec.ts`: seletor `a[href*="sintoma="]` isola os CTAs do
  cluster (CTAs globais do header/float não têm esses parâmetros). Rotas `/problemas/computador-lento`
  e `/problemas/notebook-nao-liga` são páginas próprias, fora do ClusterProblemaPage — usar
  `tela-azul` nos testes do cluster.
- Ligações telefônicas seguem desativadas (gate `check:cta-funnel` proíbe `tel:`): o painel
  já contabiliza `call_click` para quando/se o canal for liberado.
