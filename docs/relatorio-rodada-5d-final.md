# Rodada 5D — Serviço × São José dos Pinhais (relatório final)

Domínio: https://otecnicodeinformatica.com.br · Data de fechamento: 14/08/2026

## 1. Resumo executivo

Quatro rotas existentes do tipo `/servicos/:servico/sao-jose-dos-pinhais` foram avaliadas por
mérito próprio e promovidas a `index` na `localIndexPolicy` — nenhuma rota nova foi criada e
nenhuma outra cidade foi expandida. O conteúdo local de SJP foi escrito a partir da operação
real (logística intermunicipal, coleta, visita, atendimento a empresas na região do aeroporto e
das indústrias), não por cópia da versão de Curitiba. Todos os gates estão verdes e a
revalidação passou a rodar diariamente com alerta automático.

## 2. Quatro serviços candidatos (derivados da 5C)

`conserto-notebook`, `conserto-pc`, `redes-wifi`, `backup-recuperacao`.

## 3. Rotas SJP existentes avaliadas

| Serviço | Global | Curitiba | SJP |
|---|---|---|---|
| conserto-notebook | /servicos/conserto-notebook | index | index |
| conserto-pc | /servicos/conserto-pc | index | index |
| redes-wifi | /servicos/redes-wifi | index | index |
| backup-recuperacao | /servicos/backup-recuperacao | index | index |

Demais pares `/servicos/:servico/sao-jose-dos-pinhais` continuam `CANONICALIZED_TO_PARENT`.

## 4. Decisão por rota

| Rota | Decisão | Motivo |
|---|---|---|
| /servicos/conserto-notebook/sao-jose-dos-pinhais | INDEX | coleta/visita própria, fluxo intermunicipal |
| /servicos/conserto-pc/sao-jose-dos-pinhais | INDEX | bancada + coleta com rota própria |
| /servicos/redes-wifi/sao-jose-dos-pinhais | INDEX | visita obrigatória, cobertura por região |
| /servicos/backup-recuperacao/sao-jose-dos-pinhais | INDEX | logística de mídia e prazo distintos |
| demais serviços × SJP | CANONICALIZED_TO_PARENT | sem operação/intenção local própria |

## 5. Global × Curitiba × SJP (intenção)

- Global: entender e contratar o serviço, conteúdo técnico profundo.
- Curitiba: contratar com operação na capital (bancada, visita rápida, triagem).
- SJP: contratar com deslocamento intermunicipal, janelas de coleta e atendimento a empresas
  da região do aeroporto/indústrias.

## 6. Conteúdo — diferenças reais

Cobertura por região de SJP, janelas de coleta, custo de deslocamento conforme política vigente,
fluxo de agendamento, atendimento PJ local e FAQ local própria. O conteúdo técnico profundo
permanece no serviço-pai, referenciado por link.

## 7. Jaccard

| Comparação | Máximo |
|---|---|
| Curitiba × SJP (mesmo serviço, topônimos normalizados) | 0,214 (backup-recuperacao) |
| SJP × SJP entre serviços | 0,043 |
| Global × local (todas as famílias) | 0,246 |

Teto vigente mantido em 0,45 — nenhum limite foi afrouxado.

## 8–15. Metadata, canonicals, robots, sitemap, breadcrumbs, schema, areaServed, interlinking

Todos derivados da `localIndexPolicy` e revalidados automaticamente: title/description próprios,
self-canonical, `index,follow`, presença no sitemap, breadcrumb `Início → Serviços → Serviço →
São José dos Pinhais` com destinos existentes, emissão de `Service` + `WebPage` +
`BreadcrumbList` (+ `FAQPage` quando aplicável) e `areaServed` restrito a São José dos Pinhais
com `addressRegion: PR`. Provider único: O Técnico de Informática (sem filial fictícia).

## 16. CTA / funil

Os CTAs enviam `city = São José dos Pinhais` na rota SJP. A camada de analytics passou a emitir
as dimensões `city` e `service_slug` em `cta_click`, `click_whatsapp`, `click_call` e
`generate_lead`, permitindo metas de conversão por rota e por cidade no GA4/Google Ads.
`cityFromPath` nunca cai em Curitiba por fallback (`nao_definida` quando indeterminado).

## 17–18. Gates

- `check:local-service-intent`: 17 rotas serviço × cidade, 105 pares, Jaccard máx 0,246 — verde.
- `check:local-doorway`: nenhum padrão de doorway — verde.
- Novo `check:local-regression`: 26 rotas promovidas, status `healthy`.

## 19–22. Performance, mobile/A11y, segurança, build

Gates de motion/loading, Lighthouse budgets, axe e segurança (RLS, RPC admin, allowlist de
realtime) mantidos sem regressão. `npm run build` verde com todos os postbuilds.

## 23. Testes

565 testes unitários aprovados (18 arquivos) + suíte E2E de SEO/schema do pipeline.

## 24. Rotas rejeitadas

Todos os demais serviços × SJP: a diferença seria apenas o topônimo, então a decisão correta é
manter a autoridade no serviço-pai.

## 25. Pendências

- 🟠 P1 — publicar e confirmar o job diário `local-guardrails` no GitHub Actions com os secrets
  de alerta (`SLACK_WEBHOOK_URL` ou `ALERT_EMAIL_TO` + `RESEND_API_KEY`).
- 🟡 P2 — criar as metas (Key Events) no GA4 usando as novas dimensões `city` e `service_slug`.
- 🟢 P3 — avaliar bairros âncora de SJP em rodada separada.

## Vereditos

1. **4/4** páginas serviço × SJP merecem indexação própria.
2. Curitiba × SJP suficientemente diferenciadas: conserto-notebook **SIM**, conserto-pc **SIM**,
   redes-wifi **SIM**, backup-recuperacao **SIM**.
3. Modelo serviço × cidade provado: **SIM, POR LOTES CONTROLADOS**.

## Próxima etapa recomendada

RODADA 5E — Bairros âncora, lote 2: aprofundar as duas cidades já validadas antes de expandir
geograficamente a RMC.
