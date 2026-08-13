---
name: Onda 28 — A/B de copy+posição de CTA, gate cross-cluster e vitals com baseline
description: Experimento cta_1/cta_2 no cluster /problemas, gate de colisão de intenção entre clusters e relatório de Web Vitals com baseline e OTLP.
type: feature
---
- `src/lib/problemasCtaVariants.ts`: variante `1` (controle) / `2` (desafiante) persistida por visitante (localStorage + cookie 1 ano); SSR sempre `1`. Define microcopy, rótulo do botão e POSIÇÃO do bloco (`antes`/`depois` do conteúdo da seção). Nunca altera conteúdo editorial indexável.
- `ClusterProblemaPage`: `CtaContextual` agora recebe `secao`, `mensagem` e `quando`; renderiza só quando a posição da variante bate. Seções cobertas: sintomas, causas, modalidades e FAQ.
- Telemetria: `trackWaClick` envia `variant: msg_<a|b>_cta_<1|2>` — cruza o experimento de mensagem com o de copy/posição no painel `/admin/experimento-wa`.
- `call_click` permanece desativado por política (contato só por WhatsApp; gate `check:cta-funnel` proíbe `tel:`).
- `scripts/check-intent-collisions.mjs` (`npm run check:intent-collisions`): compara pares CROSS-família (serviço × problema × bairro × hub) no HTML de `dist`. Bloqueia title Jaccard > 0.75, H1 idêntico ou corpo editorial (5-gramas) >= 0.55. Pula com aviso quando não há build.
- `scripts/report-problemas-vitals.mjs`: compara com `reports/problemas-vitals-baseline.json` (regressão > 10% em LCP/INP, +0.02 em CLS), grava baseline com `--save-baseline`, falha com `--alert` também em regressão e envia métricas OTLP quando `OTLP_ENDPOINT`/`VITE_OTLP_ENDPOINT` existe.
- Onda de páginas de parceiros continua fail-closed: sem parceiro real aprovado (fotos e casos reais), nenhuma rota é criada.
