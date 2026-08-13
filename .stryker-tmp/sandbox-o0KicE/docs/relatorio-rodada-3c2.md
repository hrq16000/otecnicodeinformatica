# Rodada 3C.2 — Atribuição, monitoramento e reforço editorial

## 1. Rastreamento de cliques com atribuição por origem

- Novo módulo `src/lib/attribution.ts` (first-touch): classifica a sessão em
  `ads | seo | social | referral | campanha | direto` a partir de UTMs, `gclid`/`gbraid`/`wbraid`/`msclkid`
  e do referrer (buscadores × redes sociais × demais domínios).
- `captureAttribution()` roda no bootstrap do app (`src/App.tsx`), junto da captura de UTMs.
- `src/lib/funnelAnalytics.ts` envia `attribution_channel` e `attribution_source` em todos os eventos
  (GA4) e grava `attribution_channel` em `click_events` — vale para "WhatsApp Agora" e "Ligar Agora".
- Banco: coluna `attribution_channel` + índice `(attribution_channel, created_at desc)` em `click_events`.

## 2. Relatório semanal das 5 páginas da Rodada 3C

- `scripts/report-weekly-3c.mjs` (`npm run report:weekly-3c`): impressões, cliques, CTR, posição,
  variação WoW, consultas por página, estado de indexação (URL Inspection) e HTTP/redirect em produção.
- Saídas: `reports/weekly-3c.json` e `reports/weekly-3c.md`. Flag `--alert` sai 1 em erro de acesso,
  perda de indexação ou queda >30% de impressões.
- Rodando semanalmente no workflow `.github/workflows/seo-weekly.yml`.

## 3. `/problemas/computador-lento` desconhecida no GSC

Diagnóstico: robots liberado, canônica correta, HTTP 200, presente no sitemap curado — faltavam
**sinais de frescor** e presença nos monitoramentos.

- `scripts/lib/lastmod.mjs`: fonte única de `lastmod` por URL; `scripts/generate-sitemaps.mjs`
  passa a emitir `<lastmod>` para as páginas reescritas (3B/3C).
- A URL entrou em `WAVE_3C_PATHS` de `scripts/lib/priority-urls.mjs`, portanto agora é coberta pelo
  monitor de indexação, pelo guard de URLs prioritárias e pelo Core Web Vitals.
- Conteúdo reforçado (item 5) renova a página e justifica o recrawl.

## 4. Core Web Vitals

As 5 páginas da 3C entraram em `priorityUrls()`, logo `npm run monitor:vitals:alert` já coleta
LCP/CLS/INP delas e alerta em degradação — sem script novo.

## 5. Conteúdo e interlinking

- `/problemas/computador-lento`: nova seção "Critérios objetivos antes de você decidir"
  (processo em etapas, tempo estimado, garantia de 90 dias sobre mão de obra + o que não é prometido),
  com âncoras específicas para `/precos-e-politicas` e `/quando-nao-compensa`. Sem preço inventado.
- `/como-funciona`: bloco completo "Backup e Recuperação de Dados no Atendimento" — 3 etapas,
  prazos de referência, limites seguros e 4 perguntas novas na FAQ (visíveis e no `FAQPage`),
  com links para `/servicos/recuperacao-de-dados`, o artigo de backup e `/precos-e-politicas`.

## 6. Gates executados

| Gate | Resultado |
| --- | --- |
| `check:jsonld-parity` | ✔ 314 páginas · 162 FAQ · 12 ofertas · 16 LocalBusiness |
| `check:cannibalization` | ✔ nenhuma canibalização P0 (1 aviso conhecido de description) |
| `generate-sitemaps` | ✔ index + 6 sub-sitemaps (53 URLs, agora com `lastmod`) |
| `test:cutover-browser` | ⚠ indisponível no sandbox (Chromium sem libs de sistema) — executar no CI |

## 7. Próxima onda

Escopo da terceira onda editorial em `docs/escopo-onda-3d-editorial.md` (suporte empresarial,
manutenção preventiva, backup/segurança de dados e sintoma de vírus — sem bairros ou cidades).
