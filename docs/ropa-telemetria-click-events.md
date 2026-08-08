# ROPA — Registro da Operação de Tratamento

**Operação:** Telemetria first-party do funil (`click_events`)
**Status:** AUTORIZADO — decisão de governança de 07/08/2026 (referência UTC 08/08/2026)
**Responsável pela decisão:** Henrique Rodrigues — responsável pelo projeto tecnico.curitiba.br
**Rodada de implementação:** 4E.4
**Revisão obrigatória:** anual (GOVERNANCE_REVIEW_MONTHS = 12) — próxima revisão até 07/08/2027

> Decisão interna de governança do projeto. Não constitui parecer jurídico profissional externo.

## 1. Controlador e operador

| Papel | Identificação |
| --- | --- |
| Controlador | Operação tecnico.curitiba.br (Henrique Rodrigues) |
| Operador (infraestrutura) | Provedor de backend gerenciado do portal (banco de dados e funções) |
| Encarregado / contato | Canal público de contato do portal (WhatsApp e página de privacidade) |

## 2. Categorias de titulares

Visitantes do portal tecnico.curitiba.br que interagem com o funil de atendimento
(cliques em CTA, abertura de triagem, envio de agendamento, encaminhamento a WhatsApp).

## 3. Categorias de dados tratados

**Coletados (allowlist fechada):** `event_type`, `path`, `route_type`, `servico`,
`bairro`, `cidade`, `cta_location`, `cta_position`, `funnel_stage`, `customer_type`,
`modalidade`, `equipamento`, `problema`, `variant`, `attribution_channel`,
`utm_source`, `utm_medium`, `utm_campaign`, `viewport_bucket`, `session_id`, `created_at`.

**Não coletados:** IP, nome, telefone, e-mail, endereço, coordenadas GPS, texto livre,
user-agent, fingerprint, cookies de identificação persistente entre visitas.

**Descontinuado nesta rodada:** `viewport_width` exato — novos eventos não preenchem
mais o campo (`PERSIST_VIEWPORT_WIDTH = false`). A coluna física permanece no schema
apenas durante a migração segura.

`bairro` e `cidade` representam contexto semântico da rota, não geolocalização do
visitante; ficam registrados para reavaliação futura de redundância com `path`.

## 4. Identificador de sessão

`session_id` é gerado no navegador e limitado à aba/sessão (`sessionStorage`).
Não foi projetado para correlação entre visitas, dispositivos ou pessoas, e não é
exposto em nenhum agregado histórico.

## 5. Finalidade

Medir o funcionamento e a conversão do próprio funil de atendimento — abertura,
avanço, abandono, conclusão e encaminhamento aos canais de contato — e comparar
origem, CTA e contexto técnico. Nenhuma finalidade publicitária de terceiros,
nenhum enriquecimento externo, nenhuma revenda ou compartilhamento comercial.

## 6. Hipótese legal

`LEGAL_BASIS = LEGITIMATE_INTEREST` — legítimo interesse (art. 7º, IX da LGPD).
Teste de balanceamento registrado em `docs/rodada-4e4-teste-balanceamento.md`,
com resultado **aprovado com condições**. Consentimento permanece alternativa
possível, mas não é a base adotada.

## 7. Retenção

| Dataset | Prazo | Regra |
| --- | --- | --- |
| Eventos raw (`click_events`) | 90 dias | `RAW_RETENTION_DAYS = 90`; expurgo só após consolidação validada |
| Agregados (`click_events_daily`) | 24 meses | `AGGREGATE_RETENTION_MONTHS = 24`; expurgo após o prazo |
| Histórico de execuções (`telemetry_retention_runs`) | mantido | trilha de auditoria do processo de expurgo |

## 8. Processo de expurgo (fail-closed)

```text
RAW → CONSOLIDAÇÃO → VALIDAÇÃO → EXPURGO DO RAW EXPIRADO
```

1. `consolidate_click_events(p_until)` agrega os dias fechados nas dimensões aprovadas.
2. Células com menos de 5 ocorrências (`LOW_COUNT_THRESHOLD = 5`) são generalizadas na
   ordem `cta_location → customer_type → viewport_bucket → path`; se ainda ficarem
   abaixo de 5, a célula é suprimida do histórico.
3. `purge_click_events_raw(true)` roda em dry-run obrigatório antes do primeiro expurgo real.
4. `purge_click_events_raw(false)` aborta se existir qualquer dia expirado sem agregado
   correspondente ou se nenhum dry-run tiver sido registrado. Nunca apaga antes de consolidar.
5. `purge_click_events_aggregates()` aplica o prazo de 24 meses aos agregados.

Toda execução grava um registro em `telemetry_retention_runs` com modo, período,
quantidades e resultado (`ok`, `dry_run`, `blocked`, `noop`).

## 9. Dimensões permitidas no agregado

`event_date`, `path`, `route_type`, `servico`, `customer_type`, `funnel_stage`,
`cta_location`, `attribution_channel`, `viewport_bucket`, `event_type`.

**Proibidos no agregado histórico:** `session_id`, `viewport_width`, `created_at`
individual, identificadores de sessão, texto livre e qualquer PII.

O dataset consolidado é descrito como **DADOS AGREGADOS**. Não é declarado como
dado anonimizado — qualquer declaração de anonimização exigirá avaliação própria.

## 10. Acesso e compartilhamento

- `anon` e `authenticated`: apenas inserção de eventos no funil; nenhuma leitura pública.
- Leitura de `click_events`, `click_events_daily` e `telemetry_retention_runs`:
  exclusiva de administradores autenticados, via RLS (`has_role(auth.uid(), 'admin')`).
- Rotinas de consolidação e expurgo: executáveis apenas pelo backend (`service_role`);
  execução revogada de `PUBLIC`, `anon` e `authenticated`.
- Sem compartilhamento com terceiros. Google Analytics/Ads operam em fluxo separado,
  sujeito ao Consent Mode v2 e ao banner de cookies.

## 11. Salvaguardas

RLS; leitura apenas administrativa; `anon` limitado a inserção; allowlist de campos;
bloqueio de PII; `session_id` por aba; transparência pública (Rodada 4E.2);
retenção raw de 90 dias; expurgo fail-closed; consolidação antes do delete;
remoção de `viewport_width`; supressão de células com k < 5; revisão anual;
este ROPA; registro formal do teste de balanceamento.

## 12. Limites da autorização

Não estão autorizados por esta decisão: ampliação de campos, novas finalidades,
enriquecimento externo, correlação entre visitas, leitura pública, ampliação de
grants públicos, redefinição do marco T1 ou alteração do funil comercial.
Qualquer nova finalidade exige nova avaliação de governança.
