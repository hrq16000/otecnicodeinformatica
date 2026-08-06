# Rodada 3C.1 — Microgate /problemas/computador-lento

Data: 06/08/2026 · Escopo: fechar o item pendente da Rodada 3C.

## 1. Estado inicial do Git

`git status --short` e `git diff --stat` vazios no início e no fim da rodada — o
versionamento é gerenciado pela plataforma (working tree sempre sincronizada).
O rastreio das alterações está na seção 10.

## 2. Situação encontrada

**PÁGINA EXISTIA E FOI COMPLETADA**

A rota `/problemas/computador-lento` já existia (`src/pages/problemas/ComputadorLento.tsx`),
já estava roteada, no sitemap curado, com canonical próprio, breadcrumb e corpo
estático. Faltavam dois itens do contrato desta rodada:

1. FAQ com 6 perguntas — abaixo das 8 exigidas e sem os temas de vírus,
   falha de disco e segurança de uso continuado.
2. Saída obrigatória para `/servicos/recuperacao-de-dados` ausente, e o HTML
   servido trazia o bloco genérico de links da família "problema" (notebook,
   preços, como funciona, quando não compensa, serviços) em vez das sete saídas
   contratadas.

Nada além disso foi reescrito. Nenhum slug alternativo foi criado.

## 3. Conteúdo

- **Palavras úteis no HTML servido:** 1006 (faixa exigida: 700–1100).
- **Title:** `Computador Lento? Diagnóstico Técnico em Curitiba`
- **H1:** `Computador lento: sintomas, causas possíveis e o que realmente resolve`
- **Estrutura (H2):** lentidão é sintoma e não diagnóstico · sintomas que ajudam
  a separar as causas · causas possíveis sem afirmar diagnóstico · o que você
  pode observar antes do atendimento · opções que resolvem cada tipo de causa ·
  quando lentidão é sinal de alerta · como é feito o diagnóstico e o que
  influencia o valor · sintomas relacionados · perguntas frequentes · CTA final.
- **FAQ:** 10 perguntas (6 preexistentes + 4 adicionadas): por que fica lento com
  o tempo · vírus pode deixar lento · travamentos podem indicar falha de HD/SSD ·
  é seguro continuar usando · precisa formatar · SSD resolve · quanta RAM ·
  risco de perder arquivos · quando trocar o equipamento · valor antes do
  diagnóstico.
- **Mensagens obrigatórias presentes:** formatação não é solução automática; o
  ganho de SSD/RAM depende da configuração e da causa; ruídos, travamentos
  progressivos e arquivos importantes deslocam a prioridade para preservar dados.
- Linguagem não conclusiva em todas as causas; nenhuma verificação envolve
  desmontagem, comandos destrutivos, registro, antivírus desativado ou disco.

## 4. Diferenciação

| Página | Intenção dominante | Diferença |
| --- | --- | --- |
| /problemas/computador-lento | Investigação por sintoma | Separa armazenamento, memória, temperatura e software; não vende um serviço específico |
| /servicos/manutencao-de-computador | Reparo amplo de desktop | Serviço, escopo, processo e garantia |
| /servicos/formatacao | Sistema operacional | Reinstalação organizada quando indicada |
| /servicos/upgrade-ssd-ram | Componentes | Compatibilidade, limites de placa, clonagem |
| /servicos/remocao-de-virus | Malware | Programas indesejados confirmados ou suspeitos |

Titles, H1, introduções, H2 e FAQs distintos; nenhuma passagem extensa duplicada
(gate `check:cannibalization` sem canibalização nas P0).

## 5. HTML e DOM

- Conteúdo estático: 1006 palavras úteis no `dist/problemas/computador-lento/index.html`,
  com H1, blocos, FAQ e links renderizados sem JavaScript.
- Paridade JSON-LD × conteúdo visível: 314 páginas auditadas, 162 perguntas FAQ
  conferidas, 0 divergências.
- Mobile: layout do template de sintoma (container `max-w-4xl`, grids que colapsam
  em 1 coluna, botões `min-h-14`) — inalterado nesta rodada.
- Ressalva: `test:cutover-browser` retornou **INDISPONÍVEL** neste ambiente
  (Chromium não disponível no sandbox). O gate roda em CI.

## 6. Interlinking

**Saídas (todas presentes no HTML servido e no DOM):**
`/servicos/manutencao-de-computador`, `/servicos/formatacao`,
`/servicos/upgrade-ssd-ram`, `/servicos/remocao-de-virus`,
`/servicos/recuperacao-de-dados`, `/precos-e-politicas`, `/como-funciona`.
Complementares contextuais: `/problemas/notebook-nao-liga`,
`/servicos/manutencao-de-notebook`, `/diagnostico-tecnico`, `/quando-nao-compensa`.

**Entradas contextuais confirmadas:** `/servicos/manutencao-de-computador`,
`/servicos/formatacao` e `/servicos/upgrade-ssd-ram`
(`src/lib/servicosCore.ts`, blocos `relacionados` e `blocoLocal`).

## 7. JSON-LD

Tipos emitidos na rota: `WebPage`, `BreadcrumbList`, `FAQPage` (+ `Organization`
e `WebSite` sitewide). **Sem `Service`**, sem `Offer`, sem preço, sem
`aggregateRating`, sem review. URLs absolutas, `@id` resolvidos.
Validação: `check:jsonld-parity`, `check:seo:curated` e `test:validate-jsonld`
verdes.

## 8. Conversão

Triagem central reutilizada (`whatsappLink` + interceptação global do funil),
mesmo padrão de `/problemas/notebook-nao-liga`. Contexto enviado: página de
origem `/problemas/computador-lento`, equipamento computador e localização do
CTA (`problema_hero` / `problema_final`). Nenhum `wa.me` direto novo, formulário,
telefone, e-mail, modal, funil ou evento de analytics foi criado.

## 9. Regressão 3C

| Página | HTTP | Palavras úteis | Title/H1 | Canonical | JSON-LD/FAQ | Sitemap |
| --- | ---: | ---: | --- | --- | --- | --- |
| /servicos/upgrade-ssd-ram | 200 | 1256 | inalterados | próprio | ok | presente |
| /servicos/recuperacao-de-dados | 200 | 890 | inalterados | próprio | ok | presente |
| /precos-e-politicas | 200 | 1301 | inalterados | próprio | ok | presente |
| /sobre | 200 | 733 | inalterados | próprio | ok | presente |

Nenhuma das quatro foi editada nesta rodada.

## 10. Arquivos alterados

- `src/pages/problemas/ComputadorLento.tsx` — 4 FAQs adicionadas e link
  contextual para recuperação de dados no bloco de alerta.
- `scripts/curated-static-body.mjs` — mapa `PROBLEMA_LINKS` com as saídas
  obrigatórias por página de sintoma no HTML servido.
- `docs/relatorio-rodada-3c1-computador-lento.md` — este relatório.

## 11. Gates

| Gate | Resultado | Evidência |
| --- | --- | --- |
| `rm -rf dist && npm run build` | ✔ | 1034 rotas, 313 páginas estáticas |
| `check:seo` | ✔ | index.html: title, description, 1 H1 |
| `check:seo:curated` | ✔ | 46 rotas: H1 único, canonical self, robots, JSON-LD, links |
| `check:cannibalization` | ✔ | 12 P0; único aviso preexistente (suporte empresarial × empresa de TI) |
| `check:internal-links` | ✔ | 341 destinos, 0 quebrados |
| `check:sitemap-source` | ✔ | 53 URLs curadas = 53 emitidas |
| `check:jsonld-parity` | ✔ | 314 páginas, 162 FAQ, 0 divergências |
| `check:trust-claims` | ✔ | nenhum claim não comprovável |
| `check:soft404` | ✔ | 216 verificações |
| `vitest run` | ✔ | 9 arquivos, 73 testes |
| `test:validate-jsonld` | ✔ | validador reprova inválidos, aprova válido |
| `test:cutover-browser` | INDISPONÍVEL | Chromium ausente no sandbox; roda em CI |

## 12. Git final

`git status --short` — vazio. `git diff --stat` — vazio (versionamento da plataforma).

## 13. Decisão

**RODADA 3C APROVADA**

## 14. Próximo passo

Planejar a terceira onda editorial concentrada em suporte empresarial,
manutenção preventiva, backup e segurança de dados, sem abrir novas páginas de
bairros ou cidades.
