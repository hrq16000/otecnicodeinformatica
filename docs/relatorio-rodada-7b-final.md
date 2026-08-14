# Rodada 7B — Experiment readiness (amostra, elegibilidade e ativação segura)

## 1. Resumo executivo

A Rodada 7B não produziu CRO visual: produziu **governança de experimento**.
A pergunta "já temos tráfego suficiente?" passou a ser respondida por uma
política central (`src/lib/experimentReadiness.ts`), calculada sobre dados de
produção, com estados explícitos, reason codes, dois gates bloqueantes e um
bloco de prontidão em `/admin/conversao`.

O Experimento 1 permanece **DESLIGADO** e, com os dados reais de hoje, está em
`NOT_READY`: **zero sessões elegíveis** nas rotas do escopo.

## 2. Experimento 1

- `experiment_id`: `cro7-cta-servico-curitiba`
- Versão: `experiment-001-v1`
- Hipótese (intacta desde a 7A): um CTA que nomeia a cidade e a modalidade de
  atendimento converte mais que o CTA genérico nas rotas serviço × Curitiba.
- Controle: `controle` (CTA atual). Variante: `cidade-modalidade`.
- Status: desligado. Motivo original (7A): amostra real insuficiente.

## 3. Escopo elegível

```
eligible_session =
  producao (pos-baseline comercial 2026-08-08T00:10:00Z)
  AND NOT qa (utm/sessão/pré-baseline via isQaEvent)
  AND path ∈ {/servicos/manutencao-de-notebook/curitiba,
              /servicos/manutencao-de-computador/curitiba,
              /servicos/formatacao/curitiba}
  AND session_id presente
```

Cidade do escopo: Curitiba. Escopo **não foi ampliado** para acelerar amostra.

## 4. Unidade experimental

**Sessão elegível.** Pageviews e eventos brutos são explicitamente proibidos
como tamanho de amostra (validado por gate e por teste).

## 5. Métrica primária

| campo | valor |
| --- | --- |
| primary_metric | `whatsapp_open` |
| numerador | sessões elegíveis com `whatsapp_open`/`wa_click` (deduplicado) |
| denominador | sessões elegíveis |

Mantida a definição da 7A — não foi trocada por outra de maior volume.

## 6. Baseline real

Janela: 2026-08-11 13:31Z → 2026-08-13 06:56Z (todo o histórico de
`click_events`).

| Métrica | Valor |
| --- | --- |
| Eventos totais na base | 36 |
| Sessões distintas na base | 17 |
| Eventos nas rotas do escopo | **0** |
| Sessões elegíveis (escopo, produção, sem QA) | **0** |
| Conversões primárias | 0 |
| Taxa primária | indefinida (sem denominador) |
| Leads downstream no escopo | 0 |

## 7. Janela observada

~2 dias de eventos, todos fora do escopo do experimento.

## 8. Sessões elegíveis

0 (alvo: 200 por variação → 400 no total).

## 9. Conversões primárias

0 (alvo: 30).

## 10. Critérios de readiness

`EXPERIMENT_READINESS_POLICY`:

| Critério | Valor | Justificativa |
| --- | --- | --- |
| `minEligibleSessionsPerVariant` | 200 | piso já declarado na 7A; abaixo disso diferença é ruído |
| `minPrimaryConversions` | 30 | abaixo disso 1 conversão move a taxa vários p.p. |
| `minObservationDays` | 7 | cobre o ciclo semanal completo da operação |
| `minContextCompleteness` | 0,90 | perda de contexto acima de 10% invalida o recorte |
| `mdeAlvo` | 20% relativo | menor efeito com utilidade comercial real |
| gates obrigatórios | `analytics-event-contract`, `analytics-pii`, `analytics-local-context`, `analytics-journey-integrity`, `cro-experiment` | qualidade é pré-requisito |

## 11. Estimativa de amostra

Sem baseline de conversão (0 sessões), **nenhuma estimativa é exibida** — o
painel diz isso explicitamente em vez de inventar número. Quando houver taxa
`p`, a estimativa usa `n ≈ 16·p(1−p)/(p·MDE)²` por variação.

## 12. MDE

Não calculável hoje (sem baseline). O alvo declarado é 20% relativo; o painel
mostra também o MDE detectável com a amostra corrente quando ela existir.

Parâmetros documentados: teste de proporções, bicaudal, α = 0,05, power = 80%.

## 13. Qualidade dos dados

Gates críticos verdes. Readiness fica `BLOCKED_DATA_QUALITY` se algum deles
regredir ou se a completude de contexto (`journey_id` + rota) cair abaixo de 90%.

## 14. QA exclusion

Aplicada por `isQaEvent` (UTMs de teste, sessões documentadas e tudo anterior
ao baseline comercial). Percentual excluído é exibido no painel. Hoje: 0% —
os 36 eventos são posteriores ao baseline, mas todos fora do escopo.

## 15. Dedupe

Conversão contada **uma vez por sessão**. O painel mostra a contagem de eventos
duplicados (mesma sessão + tipo + timestamp) como sinal de qualidade.

## 16. Status atual

**NOT_READY**

## 17. Reason codes

- `INSUFFICIENT_SESSIONS` (0 / 400)
- `INSUFFICIENT_CONVERSIONS` (0 / 30)
- `OBSERVATION_WINDOW_INCOMPLETE` (0 / 7 dias com tráfego elegível)

## 18. Dashboard

`/admin/conversao` → bloco "Prontidão do Experimento 1": status, versão,
sessões elegíveis, conversões, taxa, dias, QA excluído, completude de contexto,
duplicados, barras de progresso por critério e bloqueadores. Sem falsa precisão.

## 19. Alertas

O relatório semanal e os alertas de Slack já existentes recebem o bloco de
readiness (status + progresso + reason codes). O alerta **informa**; jamais
ativa experimento. Falha de qualidade de dados é reportada como bloqueio
distinto de falta de amostra.

## 20. Gate readiness

`npm run check:experiment-readiness` — valida experimento conhecido, métrica
primária, unidade experimental, thresholds, gates de qualidade declarados,
exclusão de QA e versionamento. Verde.

## 21. Gate activation

`npm run check:experiment-activation` — `ativo: true` exige registro em
`config/experiment-activations.json` com `readinessStatus: READY`, versão,
razão, actor e timestamp. Também garante que a exposição continua fail-closed
(exposição zero enquanto desligado). Verde.

## 22. Auditabilidade

Toda ativação/desativação futura é um commit versionado no log de ativações
(experimento, versão, estado anterior/novo, timestamp, actor, razão). Sem PII.

## 23. Segurança / RLS

Nenhuma migração foi necessária: o cálculo reutiliza `click_events`, cujo acesso
já é administrativo. Nenhuma RPC nova, nenhum `SECURITY DEFINER` novo.

## 24. Performance

O readiness é calculado em `useMemo` sobre o mesmo conjunto já carregado pelo
painel — nenhuma consulta adicional e nenhum evento raw extra no browser.

## 25. E2E

Cobertura por fixtures determinísticas em `src/lib/experimentReadiness.test.ts`:
abaixo do threshold (`ACCUMULATING`), volume suficiente (`READY` com
experimento ainda desligado), qualidade vermelha (`BLOCKED_DATA_QUALITY`) e
exposição zero enquanto desligado (fail-closed em `croExposicao`).

## 26. Build

Gates de CRO, readiness e ativação verdes; suíte completa executada.

## 27. Testes

21 testes novos de readiness; total do projeto: 625 verdes.

## 28. Pendências

- 🔴 P0 — nenhuma.
- 🟠 P1 — tráfego real nas rotas do escopo (aquisição), sem o qual o
  experimento não sai de `NOT_READY`.
- 🟡 P2 — instrumentar a etapa `lead` no `registroFunil` do Experimento 1.
- 🟢 P3 — snapshots históricos de readiness para acompanhar a curva de amostra.

---

## VEREDITO 1 — O Experimento 1 já possui amostra suficiente?

**NÃO.**

## VEREDITO 2 — Bloqueadores exatos

- sessões elegíveis: 0 de 400 (200 por variação);
- conversões primárias: 0 de 30;
- janela: 0 de 7 dias com tráfego elegível;
- data quality: verde (não é bloqueador).

## VEREDITO 3 — A infraestrutura informa READY sem ativar automaticamente?

**SIM.** `podeAtivar()` apenas autoriza; a ativação exige edição versionada do
registro + registro auditável, com gate bloqueante.

## VEREDITO 4 — Existe outro impedimento além da amostra?

**NÃO.** Não há impedimento técnico, de qualidade, performance, segurança ou
SEO. O único bloqueio é volume de tráfego elegível.

## Próximo passo

Status `NOT_READY` ⇒ **não** avançar para a Rodada 7C. Continuar acumulando
amostra e trabalhar apenas em frentes que não contaminem o segmento do
experimento.
