# Rodada 3.2.1 — Matriz Playwright particionada

## Estado inicial
- Branch: `edit/edt-9d3d4b9f…`, último commit `60335ae4 Adicionou Organization no prerender`, git limpo.
- Node v22.22.0 (CI: 20) · npm 10.9.4 · Playwright 1.57.0
- 24 specs em `e2e/`. Job anterior: 1 job por navegador, `timeout-minutes: 40`, `retries: 1`.
- A matriz anterior expirou antes de concluir Firefox/WebKit; só artefatos parciais de Chromium chegaram a ser produzidos.
- Nesta rodada, a execução local completa do Chromium ultrapassou 20 min no sandbox — confirmando que a suíte inteira em um único job por engine é inviável dentro do limite do CI.

## Estratégia de sharding
- Sharding **oficial** do Playwright (`--shard=i/n`), sem listas manuais de arquivos.
- 3 navegadores × 4 shards = **12 jobs independentes**, `timeout-minutes: 25` cada.
- Matriz com campos explícitos `browser`, `shard`, `totalShards`.
- `retries: 0` em `playwright.ci.config.ts` — falha reproduzida é falha registrada, sem mascaramento.

## Rerun seletivo
Passo separado com `--last-failed`, executado apenas `if: failure()`, gravando blob em
`blob-report/<engine>-<shard>-rerun`. Não substitui o resultado original: serve como
**evidência de flakiness**. `continue-on-error` no passo garante que os artefatos subam.

## Relatórios e artefatos
- Cada shard gera **blob report** (`playwright-blob-<engine>-<shard>`) e evidências
  (`playwright-evidence-<engine>-<shard>`: traces `retain-on-failure`, screenshots `only-on-failure`).
- Nomes únicos por shard — nenhum relatório é sobrescrito.
- Job `e2e-matrix-report` (`if: always()`, `needs: e2e-full-matrix`) baixa todos os blobs,
  roda `playwright merge-reports` em HTML e JSON, executa
  `scripts/consolidate-e2e-failures.mjs` e publica `playwright-report-consolidado`,
  além de imprimir o inventário no `GITHUB_STEP_SUMMARY`.
- O job de merge **não** converte falha em sucesso; a matriz permanece explicitamente
  observacional (`continue-on-error: true`), e o gate bloqueante segue sendo o job `e2e`.

## Instalação de navegadores
`npx playwright install --with-deps <browser>` por job — instalação oficial com libs de
sistema. Nenhuma dependência de `LD_LIBRARY_PATH` no CI.

### Sandbox local (temporário, não versionado)
O Chromium do sandbox não encontrava libs de sistema (X11, nss, nspr, gtk3, cairo, pango,
libdrm, mesa/gbm, alsa, cups, dbus, at-spi2, expat, libxkbcommon). A execução local foi
viabilizada exportando `LD_LIBRARY_PATH` com os caminhos do Nix store apenas na sessão do
shell. **Nenhum caminho absoluto do sandbox foi incorporado ao repositório**, e
`/tmp/libpath.txt` não faz parte do projeto.

## Servidor e build
Cada job faz **um único build** e sobe **um único** `vite preview` na porta 8080 (jobs são
runners isolados, sem disputa de porta). A espera usa healthcheck HTTP
(`wait-on http-get://localhost:8080/`) — sem `waitForTimeout` arbitrário.

## Isolamento entre shards
O sharding oficial distribui arquivos inteiros, e cada shard sobe browser/context próprios
(`fullyParallel: true`, contexto novo por teste → localStorage, sessionStorage, cookies,
IndexedDB, permissões e service workers limpos). `outputDir` é segregado por
`test-results/<engine>-<shard>` para evitar colisão de artefatos temporários. Qualquer
dependência de ordem revelada pelo sharding é classificada como bug do teste (categoria C).

## Classificação automática das falhas
`scripts/consolidate-e2e-failures.mjs` deduplica por `spec + teste + assertion normalizada`
e classifica:

| Cat | Significado | Prioridade |
| --- | ----------- | ---------- |
| A | Bug real de produção — falha determinística em todos os engines | P0 |
| B | Dependência de engine ou flakiness — falha em subconjunto | P1 |
| C | Teste obsoleto (seletor) ou infraestrutura/ambiente da suíte | P1 |
| D | Contraste, acessibilidade ou snapshot visual | P2 |

Cada linha registra spec, teste, rota, engines, shards, assertion, esperado, encontrado e
evidência (trace/screenshot). Tabelas de resultado por engine e por shard são geradas
automaticamente e alimentam as Etapas 8–13 assim que a matriz rodar no CI.

## Backlog consolidado (estrutura)
O backlog P0/P1/P2 é derivado diretamente do inventário: categoria A → P0, B/C → P1, D → P2,
com impacto, rotas, componentes, engines, evidência e rodada recomendada:

- **P0** — bug funcional, SEO real, segurança, conversão, falha em todos os engines → rodada de correção imediata.
- **P1** — contraste crítico, Firefox/WebKit, flakiness relevante, erro de console, seletor obsoleto → Rodada 3.3.
- **P2** — snapshot cosmético, melhoria de spec, redução de duração, fixtures, relatório → backlog contínuo.

Os números concretos por engine/shard só podem ser preenchidos após a primeira execução
completa da matriz particionada no CI — nenhum navegador é marcado como aprovado sem execução.

## Conformidade
- Nenhum `test.skip` / `test.fixme` adicionado; nenhuma assertion removida ou relaxada.
- Nenhum timeout global aumentado (segue 45s por teste, 10s por expect); retries reduzidos de 1 → 0.
- Nenhuma alteração de rota, canonical, JSON-LD institucional, sitemap, funil, painel, banco,
  publicação ou DNS. Nenhuma correção de contraste, layout ou snapshot.
- Gate bloqueante (`e2e`) preservado; matriz permanece claramente observacional.

## Próximo passo recomendado (não executado)
Abrir PR para disparar a matriz particionada, coletar o `playwright-report-consolidado` e
preencher as Etapas 8–13 com os números reais; só então planejar a rodada dedicada de
acessibilidade/contraste a partir do inventário completo.
