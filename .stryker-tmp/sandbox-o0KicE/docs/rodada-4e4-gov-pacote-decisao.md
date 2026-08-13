# RODADA 4E.4-GOV — Pacote de decisão de governança

**Objeto:** telemetria first-party do funil (`click_events`)
**Natureza deste documento:** formulário para decisão humana/jurídica
**Status técnico:** NENHUMA alteração de código, migration, tracking ou política pública foi realizada nesta rodada
**Emitido em:** 2026-08-08
**Bloqueia:** RODADA 4E.4 — Implementação da governança de telemetria

---

## 0. Contexto executivo (verificado no projeto)

`click_events` mede: abertura do funil, avanço/abandono por etapa, conclusão, conversão para WhatsApp/ligação, origem/campanha e contexto técnico (CTA, rota, viewport).

Comportamento atual confirmado por auditoria (4E.1 / 4E.2):

| Característica | Situação |
| --- | --- |
| Depende de cookies opcionais | Não |
| Funciona após recusa de cookies opcionais | Sim |
| Identificador | `session_id` pseudônimo por aba (`sessionStorage`) |
| IP | Não persistido |
| Nome / telefone / e-mail / endereço / GPS | Não persistidos |
| Texto livre | Não persistido |
| Fingerprint | Inexistente |
| Correlação entre abas/dispositivos | Inexistente |
| Leitura | Restrita a administradores (RLS) |
| Envio automático a Google Analytics/Ads | Inexistente |
| Transparência pública | Corrigida na Rodada 4E.2 |

**Pendências que este pacote resolve:** hipótese legal, retenção raw, teste de balanceamento, política de agregados, minimização de `viewport_width` e autorização de ROPA.

---

## DECISÃO 1 — Hipótese legal

**Recomendação técnica submetida:** Legítimo interesse — art. 7º, IX da LGPD.

Fundamentos técnicos: finalidade própria e específica; medição do funcionamento do canal de atendimento; dataset pseudônimo de baixo risco relativo; ausência de PII direta; ausência de correlação entre visitas; minimização relevante; RLS e controle de acesso; transparência pública implementada.

**Alternativa:** Consentimento — art. 7º, I.
Consequências técnicas conhecidas: quem recusar sai da mensuração first-party; análise de abandono fica incompleta; a implementação precisa mudar; revogação e tratamento de registros anteriores precisam ser definidos.

**Considerada inadequada como principal pela auditoria técnica:** execução de contrato / procedimentos preliminares — o atendimento funciona integralmente sem a telemetria.

```text
HIPÓTESE LEGAL APROVADA:
[ ] Legítimo interesse — art. 7º, IX
[ ] Consentimento — art. 7º, I
[ ] Outra: ______________________________________
[ ] Nenhuma aprovada neste momento

Justificativa:
__________________________________________________
__________________________________________________
__________________________________________________

Responsável:
Nome: ____________________________________________
Função: __________________________________________
Data: ____/____/______
```

---

## DECISÃO 2 — Retenção dos eventos raw

**Situação atual:** retenção INDEFINIDA · expurgo INEXISTENTE.
Nenhuma finalidade técnica identificada exige histórico individual indefinido.

**Recomendação técnica:** 90 dias para eventos raw.
Observação obrigatória: 90 dias é recomendação de governança técnica deste projeto, **não** prazo legal universal.

Justificativa: cobre ~1 trimestre; permite formar baseline; permite comparar antes/depois de uma rodada de otimização; permite investigar regressões recentes; reduz armazenamento prolongado de sequências pseudônimas; análises de longo prazo podem usar dados consolidados.

```text
RAW_RETENTION_DAYS:
[ ] 90 dias
[ ] Outro prazo: ______ dias
[ ] Não aprovado

Justificativa:
__________________________________________________
__________________________________________________

Responsável:
Nome: ____________________________________________
Função: __________________________________________
Data: ____/____/______
```

---

## DECISÃO 3 — Teste de balanceamento

> Preencher **somente** se a Decisão 1 resultar em legítimo interesse.

### A. Finalidade

Interesse pretendido: medir o funcionamento e a conversão do próprio funil de atendimento do site para identificar problemas de abertura, abandono e encaminhamento aos canais de contato.

```text
[ ] finalidade legítima e específica
[ ] necessita revisão
```

### B. Necessidade

Dados essenciais identificados: evento; estágio; sessão; rota; CTA; serviço/equipamento; data; atribuição.

Minimização proposta:

```text
viewport_width exato   → deixar de persistir
viewport_bucket        → manter
```

```text
[ ] tratamento necessário e proporcional
[ ] necessita minimização adicional

Comentários:
__________________________________________________
```

### C. Expectativa do titular

Fatores existentes: banner explica o registro técnico; a política possui seção específica (5.2); `session_id` é por aba; não há identificação direta; não há perfil entre visitas; a finalidade está ligada à interação realizada pelo próprio visitante.

```text
[ ] expectativa razoável considerada compatível
[ ] necessita revisão
```

### D. Impacto

```text
dados pseudônimos · sem IP · sem identificação direta · sem texto livre
sem enriquecimento externo · sem publicidade derivada de click_events · sem SELECT público
```

```text
[ ] impacto residual aceitável com salvaguardas
[ ] necessita salvaguardas adicionais
[ ] incompatível
```

### E. Salvaguardas

Propostas/atuais: RLS; leitura somente administrativa; `session_id` por aba; bloqueio de PII; retenção limitada; expurgo; minimização de `viewport_width`; transparência; revisão periódica.

```text
[ ] suficientes para prosseguir
[ ] exigem complemento

Complementos:
__________________________________________________
```

### Resultado do balanceamento

```text
[ ] APROVADO PARA USO DE LEGÍTIMO INTERESSE
[ ] APROVADO COM CONDIÇÕES
[ ] NÃO APROVADO

Condições, se houver:
__________________________________________________
__________________________________________________

Responsável:
Nome: ____________________________________________
Função: __________________________________________
Data: ____/____/______
```

---

## DECISÃO 4 — Política dos agregados

Fluxo proposto:

```text
raw → consolidação → validação → exclusão do raw expirado
```

O agregado histórico **não** deverá conter: `session_id`; `viewport_width` exato; timestamp individual fino.

### Dimensões candidatas (avaliar uma a uma)

Não aprovar dimensão apenas porque já existe no raw.

```text
[ ] data agregada
[ ] path
[ ] route_type
[ ] servico
[ ] customer_type
[ ] funnel_stage
[ ] cta_location
[ ] attribution_channel
[ ] viewport_bucket
```

### Baixa frequência (regra obrigatória)

Combinações com baixa cardinalidade devem ser agrupadas ou suprimidas antes que o dataset seja tratado como anonimizado.

```text
[ ] Suprimir células abaixo do limiar aprovado
[ ] Generalizar dimensões
[ ] Ambas

Limiar/regra:
__________________________________________________
```

### Retenção dos agregados

Não escolher automaticamente INDEFINIDO.

```text
[ ] prazo específico: ______________________________
[ ] revisão periódica: _____________________________
[ ] retenção prolongada somente se anonimização for validada
[ ] outra: _________________________________________
```

### Status do agregado

Até existir validação suficiente, usar o termo **DADOS AGREGADOS** — nunca "dados anonimizados".

```text
APROVAÇÃO DA POLÍTICA DE AGREGADOS
[ ] APROVADA
[ ] APROVADA COM CONDIÇÕES
[ ] NÃO APROVADA

Responsável:
Nome: ____________________________________________
Função: __________________________________________
Data: ____/____/______
```

---

## Decisões acessórias

### `viewport_width`

Recomendação: **parar de persistir** — `viewport_bucket` satisfaz o uso atualmente demonstrado.

```text
[ ] aprovado
[ ] manter por justificativa documentada: _________________________
```

### `bairro` / `cidade`

A auditoria identificou que esses valores representam **contexto da rota**, não geolocalização persistida do visitante. Não remover sem análise técnica.

```text
[ ] manter
[ ] reavaliar redundância com path
```

---

## ROPA — Registro da Operação de Tratamento

Após as decisões acima, autorizar a criação do registro contendo: controlador; operador; titulares; categorias de dados; finalidades; hipótese legal; retenção; compartilhamento; acesso; salvaguardas; responsável; revisão.

```text
[ ] AUTORIZADO
[ ] PENDENTE
```

---

## Resumo final de aprovação

| Gate | Decisão | Responsável | Data |
| --- | --- | --- | --- |
| Hipótese legal | | | |
| Prazo raw | | | |
| Balanceamento (quando aplicável) | | | |
| Política de agregados | | | |
| Minimização `viewport_width` | | | |
| ROPA | | | |

```text
RESULTADO (selecionar exatamente um):
[ ] GOVERNANÇA APROVADA PARA IMPLEMENTAÇÃO
[ ] GOVERNANÇA AINDA PENDENTE
```

**Estado no momento da emissão deste documento: GOVERNANÇA AINDA PENDENTE** — nenhum campo acima está preenchido.

---

## Regra de execução

A RODADA 4E.4 — Implementação da governança de telemetria só pode ser reaberta após o resultado **GOVERNANÇA APROVADA PARA IMPLEMENTAÇÃO**, com o quadro acima completo e assinado.

Até lá permanecem proibidos:

- nenhum expurgo;
- nenhuma migration;
- nenhuma alteração em tracking;
- nenhuma base legal nova na política pública;
- nenhum prazo novo na política pública;
- nenhum agregado chamado de "anonimizado";
- regime comercial continua congelado (pós-4D.1).

---

## Como devolver a decisão

Preencher os campos deste arquivo (ou responder no chat item a item, citando "DECISÃO 1", "DECISÃO 2", etc., com nome, função e data do responsável). Com o quadro completo, a implementação técnica é reaberta na 4E.4.
