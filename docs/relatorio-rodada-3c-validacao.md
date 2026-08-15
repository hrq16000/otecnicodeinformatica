# Rodada 3C — Publicação, validação e monitoramento

Data: 06/08/2026 · Base: https://tecnico.curitiba.br

## 1. Publicação e páginas no ar

| Página | HTTP | Palavras no HTML servido | Novo bloco |
| --- | ---: | ---: | --- |
| /precos-e-politicas | 200 | 2105 | "Limites técnicos declarados" presente |
| /sobre | 200 | 1183 | — |
| /servicos/upgrade-ssd-ram | 200 | 2138 | — |
| /servicos/recuperacao-de-dados | 200 | 1703 | — |
| /problemas/computador-lento | 200 | 1521 | — |

## 2. Gates reexecutados

| Gate | Resultado |
| --- | --- |
| build + prerender (46 rotas curadas, 313 páginas estáticas) | ✔ |
| seo-basics (index + curadas) | ✔ |
| jsonld estático (312 HTMLs, 481 blocos, 0 erros) | ✔ |
| paridade JSON-LD × conteúdo (314 páginas, 158 FAQ, 12 Offer, 16 LocalBusiness) | ✔ |
| jsonld P0 (breadcrumb, sem rating/review) | ✔ |
| canibalização P0 (12 páginas) | ✔ (1 aviso: description 0.50 entre suporte-empresarial e empresa-de-ti) |
| links internos (341 destinos) | ✔ 0 quebrados |
| sitemap-source (53 URLs) | ✔ |
| guard de URLs prioritárias (14) | ✔ |
| copy proibido + trust claims | ✔ |
| E-E-A-T (14 páginas) | ✔ |
| cluster editorial | ✔ |
| soft-404 (216 verificações) | ✔ |
| smoke de borda: 55 rotas válidas, 35 aliases, 60 URLs falsas | ✔ 150/150 |
| cobertura de redirects | ✔ 100% (35/35) |

Artefatos: `reports/edge-smoke.json`, `reports/redirect-coverage.json`,
`docs/relatorio-smoke-edge.md`, `docs/relatorio-cobertura-redirects.md`.

## 3. Search Console — estado das páginas da rodada

| URL | Verdict | Cobertura | Último rastreio |
| --- | --- | --- | --- |
| /precos-e-politicas | PASS | Submitted and indexed | 18/07 |
| /sobre | PASS | Submitted and indexed | 18/07 |
| /servicos/upgrade-ssd-ram | PASS | Submitted and indexed | 12/07 |
| /servicos/recuperacao-de-dados | PASS | Submitted and indexed | 12/07 |
| /problemas/computador-lento | NEUTRAL | URL is unknown to Google | — |

Desempenho 05/07–02/08 (28 dias, propriedade `sc-domain:tecnico.curitiba.br`):

| URL | Impressões | Cliques | Posição média |
| --- | ---: | ---: | ---: |
| /precos-e-politicas | 25 | 0 | 13,4 |
| /servicos/recuperacao-de-dados | 24 | 1 | 22,6 |
| /servicos/upgrade-ssd-ram | 17 | 0 | 33,0 |
| /sobre | 6 | 0 | 4,8 |
| /tecnico-informatica-colombo | 36 | 0 | 7,7 |
| /tecnico-informatica-araucaria | 27 | 0 | 8,0 |

Observação: os conteúdos aprofundados da 3C ainda não foram rastreados após a
publicação — as posições acima refletem a versão anterior das páginas.

## 4. Próximos ajustes sugeridos

1. **/problemas/computador-lento ainda desconhecida** — a URL é nova; garantir
   que está no sitemap enviado e reforçar links de `/servicos/formatacao` e
   `/servicos/manutencao-de-computador` (já feitos) e do blog. Reavaliar em 7 dias.
2. **/servicos/upgrade-ssd-ram na posição 33 com 17 impressões** — título e
   description ainda genéricos para a intenção "trocar HD por SSD preço";
   ajustar o title para incluir a intenção comercial local.
3. **/precos-e-politicas: 25 impressões e 0 clique (pos. 13,4)** — CTR zero na
   segunda página; o novo bloco de limites técnicos deve melhorar a relevância,
   mas o próximo ganho está no snippet (description mais direta sobre valor
   mínimo e o que está incluso).
4. **Alias `/servicos/remocao-virus` aparecendo no GSC** — recebe impressão
   apesar de ser 301. Confirmar que o Google consolidou no destino
   `/servicos/remocao-de-virus` na próxima leitura.
5. **Cidades da RMC (Colombo, Araucária) somam 63 impressões e 0 clique** —
   maior volume do site sem conversão; prioridade de CTR na próxima rodada.
6. **Aviso de canibalização** entre `/servicos/suporte-tecnico-empresarial` e
   `/empresa-de-ti-curitiba` (description 0,50) — diferenciar as descriptions.

## 5. Infraestrutura de borda entregue nesta rodada

- `scripts/smoke-edge-routes.mjs` (`npm run smoke:edge` / `smoke:edge:prod`) —
  rotas válidas, todos os aliases 301 de salto único e 60 URLs inexistentes.
- Health-check `GET /__edge/health` no Worker e no servidor de paridade:
  status do manifesto, `generatedAt` do build e contagens de rotas, aliases e
  assets. Não expõe token, zona, origem nem variáveis de ambiente.
- `scripts/report-redirect-coverage.mjs` — matriz declarada × observado
  (301 correto / divergente / 404 / proxy / não observado).
- `scripts/alert-edge-errors.mjs` — alerta Slack/e-mail quando a taxa de 404
  (> 5%) ou de 5xx (> 1%) no edge estoura, ou quando o smoke falha, com links
  para os artefatos e para o health-check.
- Todos plugados no workflow `seo-weekly.yml`, com upload de artefatos.

Ressalva: enquanto o Worker da zona Cloudflare não estiver publicado,
`/__edge/health` responde pelo fallback SPA da hospedagem (HTML, não JSON) e o
404 real de borda continua dependendo das regras de borda — o smoke em produção
roda em modo `--report-only` até o cutover.
