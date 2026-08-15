# Rodada 8A — Aquisição, indexação e descoberta

Data: 13/08/2026 · Propriedade GSC: `sc-domain:otecnicodeinformatica.com.br`
Baseline de go-live: 06/08/2026 (7 dias de domínio)

## 1. Resumo executivo

O site **não tem um problema de conteúdo, tem um problema de idade e de
descoberta**. O Google já rastreia e indexa as páginas de topo, mas a maior
parte do inventário curado está na coorte "descoberta e ainda não indexada",
que é o comportamento normal de um domínio com uma semana de vida.

Em paralelo, a mensuração de aquisição estava contaminada: 100% das sessões
registradas vinham de CTAs do próprio site ou de automações de CI, gravadas
como canal "direto"/"ads". Isso foi corrigido nesta rodada.

## 2. Evidência real de indexação (URL Inspection, leitura)

| URL | Veredito | Estado |
| --- | --- | --- |
| `/tecnico-informatica-curitiba` | **PASS** | Enviada e indexada · rastreio 12/08/2026 · canônico self · Breadcrumbs válidos |
| `/servicos/manutencao-de-computador` | NEUTRAL | Descoberta — ainda não indexada |
| `/servicos/formatacao-computador/curitiba` | NEUTRAL | Descoberta — ainda não indexada |
| `/bairros/agua-verde` | NEUTRAL | Descoberta — ainda não indexada |
| `/problemas/computador-lento` | NEUTRAL | **Desconhecida do Google** |
| `/isto-nao-existe-9f3a2` | NEUTRAL | Desconhecida (URL inexistente não foi rastreada) |

Leituras:

- **Indexação funciona.** A página de Curitiba está indexada com canônico
  self-referente e rich result de Breadcrumb válido. Não há bloqueio de
  robots, noindex ou canonical cruzado nas rotas de topo.
- **Malha interna funciona.** O Google chegou a `/tecnico-informatica-curitiba`
  por `/servicos/formatacao-computador/cic` e a `/servicos/manutencao-de-computador`
  por `/blog/como-resolver-tela-azul-windows` — os interlinks das rodadas
  anteriores estão sendo seguidos.
- **`/problemas/computador-lento` é o único achado anômalo:** está no sitemap
  curado, mas o Google ainda não a conhece. É falha de descoberta, não de
  qualidade — o cluster `/problemas` é o mais novo do inventário.

## 3. Soft-404 (P0 aberto)

Rotas inexistentes respondem **HTTP 200** com o shell estático, porque a
hospedagem serve uma SPA. Mitigação já existente: `NotFound.tsx` remove
canonical, remove JSON-LD e força `noindex, nofollow` no render.

Evidência de que o risco é hoje teórico: o Google classifica
`/isto-nao-existe-9f3a2` como "URL desconhecida" — nenhuma URL inexistente
entrou no índice. O status HTTP real só pode ser corrigido na borda
(`cloudflare/worker.js`), que hoje está em modo `dns`. **Veredito: manter em
observação, não bloquear a rodada.**

## 4. Contaminação de atribuição (corrigida)

Estado encontrado em `click_events` (17 sessões, 11–13/08):

| utm_source | utm_medium | canal gravado | sessões |
| --- | --- | --- | ---: |
| site | cta | direto | 11 |
| google | cta | ads | 2 |
| site | cta | referral | 2 |
| ci | cta | ads | 1 |
| ga4ci | cta | ads | 1 |

Nenhuma sessão de aquisição real. Correções aplicadas:

- `src/lib/canalAtribuicao.ts` ganhou o canal `internal` e a função
  `ehTrafegoInterno()`; CTAs do site e automações de CI/E2E deixam de ser
  contados como aquisição, e rótulos legados (`direto`, `ads`) são
  normalizados na leitura.
- `src/lib/utmCapture.ts` parou de carimbar `utm_medium=organic` em links de
  saída — passou a usar `cta_interno`, que é o que de fato é.
- Novo gate `npm run check:acquisition-attribution` impede o retorno da
  falsificação e mantém a taxonomia em um único arquivo.
- Política documentada em `docs/governanca-utm.md`.

Consequência direta: a prontidão de experimento continua **NOT_READY**, agora
por um motivo honesto — sessões elegíveis de aquisição = 0, não 17.

## 5. Demanda real de busca (Semrush, base BR)

| Termo | Volume/mês | CPC | Concorrência |
| --- | ---: | ---: | ---: |
| conserto de computador curitiba | 20 | US$ 0,38 | 0,71 (alta) |
| assistencia tecnica de computador curitiba | 0 | — | — |

O volume local dos termos exatos é baixo. A estratégia correta é a que já está
em execução: capturar a cauda longa por sintoma (`/problemas/*`) e por serviço,
não disputar um único head term de 20 buscas/mês.

## 6. Novos instrumentos desta rodada

| Comando | O que faz |
| --- | --- |
| `npm run check:acquisition-attribution` | Gate: taxonomia única de canal, sem UTM falsificada |
| `npm run report:discovery-coverage` | Amostra o sitemap curado no URL Inspection e classifica em coortes (indexada, descoberta, rastreada-não-indexada, desconhecida, bloqueada) |

## 7. Próximo passo recomendado

1. Reforçar links internos de entrada para o cluster `/problemas` a partir das
   páginas já indexadas (Curitiba, serviços core) — atacar a coorte
   "desconhecida".
2. Rodar `npm run report:discovery-coverage` semanalmente e acompanhar a
   migração de "descoberta" para "indexada" ao longo das próximas 3–4 semanas.
3. Não ativar experimentos de CRO: sem aquisição real, qualquer leitura é ruído.
