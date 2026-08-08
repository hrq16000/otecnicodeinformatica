# Rodada 4E.4 — Gate de entrada da governança de telemetria

Status: **IMPLEMENTAÇÃO BLOQUEADA POR GATE DE GOVERNANÇA**
Data: 2026-08-08 (UTC)

> Formulário de decisão para desbloqueio: [`docs/rodada-4e4-gov-pacote-decisao.md`](./rodada-4e4-gov-pacote-decisao.md) (Rodada 4E.4-GOV).


## 1. Verificação do gate de entrada

| Item obrigatório | Evidência documental exigida | Situação |
|---|---|---|
| Hipótese legal aprovada pelo responsável/jurídico | decisão assinada/registrada | **AUSENTE** |
| Prazo de retenção raw aprovado (`RAW_RETENTION_DAYS`) | decisão registrada | **AUSENTE** |
| Teste de balanceamento aprovado (se legítimo interesse) | documento interno aprovado | **AUSENTE** |
| Política de agregados aprovada (dimensões, supressão) | decisão registrada | **AUSENTE** |

Nenhum dos quatro itens existe no repositório. A Rodada 4E.3 foi executada em
modo somente leitura e encerrou com o status "governança pronta para decisão
humana/jurídica" — recomendação técnica, não aprovação.

Parâmetros apenas **propostos** (não aprovados):
- `RAW_RETENTION_DAYS = 90`
- `LEGAL_BASIS_CANDIDATE = legítimo interesse — art. 7º, IX`

## 2. Estado do repositório

- `git status --short`: limpo (nenhuma alteração).
- `git diff --stat`: vazio.
- Nenhum arquivo de produto, banco, tracking, painel ou política pública foi
  modificado nesta rodada.

## 3. Consequências (regra do gate)

Não executados, por decisão do próprio gate:
- Fase 2 (minimização de `viewport_width`, `bairro`/`cidade`)
- Fase 3 (tabela de agregados)
- Fase 4 (consolidação)
- Fase 5 (expurgo) e Fase 6 (agendamento)
- Fase 7 (fronteira raw/agregado nos painéis)
- Fase 9 (ROPA) e Fase 10 (teste de balanceamento)
- Fase 11 (atualização da política pública)
- Fase 12 (gate `check:telemetry-retention-governance`)
- Dry-run e testes de retenção

Preservados sem alteração: funil, CTAs, SEO, páginas comerciais, T1
(2026-08-08T00:05:45Z), exclusão de QA, Consent Mode, eventos existentes, RLS e
grants públicos. A política pública mantém retenção "em definição pela
governança interna" — factualmente correta enquanto não houver decisão.

## 4. Itens faltantes para desbloquear

1. Decisão registrada da hipótese legal aplicável ao tratamento de
   `click_events` (legítimo interesse ou outra), com responsável e data.
2. Prazo de retenção raw aprovado em dias (valor único, para uso no código e na
   política pública).
3. Se legítimo interesse: teste de balanceamento aprovado (finalidade,
   necessidade, expectativa do titular, impacto, salvaguardas, revisão).
4. Política de agregados aprovada: dimensões permitidas, regra de supressão ou
   generalização de baixa frequência e prazo de guarda dos agregados.

Ao receber os quatro itens, a Rodada 4E.4 pode ser reaberta e executada
integralmente, com o prazo do código igual ao prazo aprovado.

## 5. Decisão

**IMPLEMENTAÇÃO BLOQUEADA POR GATE DE GOVERNANÇA**

Próximo passo: não executar expurgo nem alterar política pública. Resolver
exclusivamente os itens de governança faltantes acima e permanecer no regime de
observação comercial pós-4D.1.
