# Pacote canônico GBP — Service Area Business (Rodada 4H)

Fonte de governança: `docs/rodada-4g-entidade-local.md` (Anexo 4G-G) e `mem://features/governanca-entidade-4g`.
Este documento é **o único pacote canônico** para configuração externa do Google Business Profile.
Substitui, para uso externo, o rascunho `docs/gbp-service-area-business.md`.

Regra do pacote: **campo sem fonte comprovada não é preenchido**. Onde falta dado, o valor é
`PENDENTE DE CONFIRMAÇÃO OPERACIONAL` — nunca uma suposição.

---

## PARTE 1 — Tabela canônica

| Campo | Valor | Fonte | Autorizado |
| --- | --- | --- | --- |
| Nome | Técnico em Curitiba | `src/lib/siteConfig.ts` · memória Core | Sim |
| Site | https://tecnico.curitiba.br | `siteConfig.url` · domínio canônico | Sim |
| WhatsApp / telefone | +55 41 99708-6380 | `siteConfig.whatsappNumber` | Sim (canal único) |
| Modelo operacional | Service Area Business | Governança 4G (resposta do responsável) | Sim |
| Endereço público | Oculto | Governança 4G | Não publicar |
| CEP público | Não informado | Governança 4G | Não publicar |
| CNPJ público | Não informado | Governança 4G | Não publicar |
| Área principal | Curitiba (PR) | Operação atual | Sim |
| Outras áreas | Ver Parte 3 | Operação atual | Parcial |
| Categoria principal | Ver Parte 4 | Catálogo GBP | Sim |
| Categorias secundárias | Ver Parte 5 | Catálogo GBP | Sim |
| Serviços | Ver Parte 6 | Rotas publicadas no site | Sim |
| Descrição | Ver Parte 7 | Redigida nesta rodada | Sim |
| Horário de funcionamento | Seg–Sex 08:30–18:00 · Sáb 09:00–13:00 · Dom fechado | Confirmação do responsável (Rodada 4I) | Sim |
| Ano de início ("desde 1998") | Bloqueado para uso externo | Governança 4G / Parte 25 | Não |
| Logo / capa | Existe logo da marca | Repositório | Sim |
| Fotos da operação | Inexistentes até a captura | `src/lib/provasBancada.ts` (manifesto vazio) | Não |
| Perfis sociais (sameAs) | Nenhum comprovadamente controlado | Parte 23 | Não |
| Atributos | Atendimento no local · Atendimento remoto · Retirada e entrega · Orçamento online | Operação atual | Sim |
| Mensagens do perfil | Ativar, apontando para o mesmo WhatsApp | Canal único de contato | Sim |

Campos ausentes propositalmente: endereço, CEP, CNPJ, número de funcionários, área de estacionamento,
formas de pagamento, faixa de preço. Nenhum deles tem fonte autorizada nesta fase.

---

## PARTE 2 — Modelo operacional declarado

```text
MODELO GBP = SERVICE AREA BUSINESS
ENDEREÇO PÚBLICO = OCULTO
ATENDIMENTO PRESENCIAL EM ENDEREÇO PÚBLICO = NÃO EXISTE
```

O endereço é informado ao Google **apenas para verificação** e marcado como oculto.
Nenhum texto do perfil, post, foto ou resposta pode sugerir loja, recepção, balcão ou oficina aberta.

Expressões proibidas no perfil e em qualquer canal externo:

```text
Visite nossa loja
Venha até nossa assistência
Atendimento em nossa unidade
Loja em Curitiba
Nossa oficina fica em ...
Recepção / balcão / showroom
```

Substitutos autorizados: "atendimento no seu endereço", "atendimento remoto",
"coleta e entrega para reparo em bancada", "atendimento por agendamento".

---

## PARTE 3 — Áreas de cobertura (proposta operacional)

Critério: só entra área com atendimento efetivamente realizável hoje. Sem raio artificial,
sem lista extensa para keyword stuffing. O GBP permite até 20 áreas; usamos 2 — o mínimo verificável.

| Área | Atendimento comprovado | Prioridade |
| --- | --- | --- |
| Curitiba (PR) | Sim — base operacional da atividade | **A — principal** |
| São José dos Pinhais (PR) | Sim — cobertura já praticada | **B — secundária** |
| Pinhais | Não confirmado nesta rodada | NÃO PUBLICAR |
| Colombo | Não confirmado nesta rodada | NÃO PUBLICAR |
| Araucária | Não confirmado nesta rodada | NÃO PUBLICAR |
| Campo Largo | Não confirmado nesta rodada | NÃO PUBLICAR |
| Almirante Tamandaré | Não confirmado nesta rodada | NÃO PUBLICAR |
| Fazenda Rio Grande | Não confirmado nesta rodada | NÃO PUBLICAR |
| Piraquara | Não confirmado nesta rodada | NÃO PUBLICAR |
| Quatro Barras | Não confirmado nesta rodada | NÃO PUBLICAR |

Observação de coerência: o site descreve cobertura mais ampla na Região Metropolitana.
Isso **não** é contradição — o GBP declara a área de deslocamento priorizada e verificável;
cada nova cidade só entra no perfil depois de atendimento real registrado.

Regra de promoção: cidade sai de `NÃO PUBLICAR` para `B` quando houver **pelo menos um atendimento
concluído** naquela cidade, registrado internamente com data.

---

## PARTE 4 — Categoria principal

Categorias verificadas no catálogo público do Google Business Profile (pt-BR):

| Categoria (nome real no catálogo) | Existe | Aderência |
| --- | --- | --- |
| Serviço de reparo de computadores | Sim | Alta — atividade predominante |
| Loja de informática | Sim | Baixa — implica ponto de venda |
| Serviço de reparo de eletrônicos | Sim | Média — cobre TV/monitor/placa |
| Serviço de reparo de televisores | Sim | Média — vertical específica |
| Serviço de TI | Sim | Média — suporte empresarial |
| Consultor em informática | Sim | Baixa — não é a atividade central |

```text
CATEGORIA PRINCIPAL = Serviço de reparo de computadores
```

Justificativa: a atividade predominante e a maior parte das rotas publicadas são manutenção de
computador e notebook. Escolha por aderência real, não por volume de busca.

**Confirmação manual obrigatória:** o catálogo do GBP muda sem aviso. Ao criar o perfil, digitar
"reparo de computadores" e selecionar o item exatamente como o Google apresentar. Se o nome divergir
do registrado aqui, atualizar este documento com o nome real — nunca criar categoria inexistente.

---

## PARTE 5 — Categorias secundárias

Máximo recomendado: 3 (o GBP permite até 9; excesso dilui a relevância).

| Categoria | Motivo | Status |
| --- | --- | --- |
| Serviço de reparo de eletrônicos | Cobre monitor e placa em nível de componente | Incluir |
| Serviço de reparo de televisores | Vertical publicada em `/servicos/conserto-tv` | Incluir |
| Serviço de TI | Suporte empresarial já publicado | Incluir |

Proibido incluir (fora da expansão autorizada): reparo de áudio, reparo de videogame,
reparo de celular, reparo de eletrodomésticos, loja de informática, venda de peças.

---

## PARTE 6 — Serviços do perfil

Lista concisa, toda lastreada em rota publicada. Sem preço nesta rodada.

**Informática**
1. Manutenção de computador
2. Manutenção de notebook
3. Formatação e instalação de sistema
4. Remoção de vírus e malware
5. Upgrade de SSD e memória RAM
6. Backup e recuperação de dados
7. Montagem de PC
8. Redes e Wi-Fi

**Eletrônica**
9. Conserto de TV / Smart TV
10. Conserto de monitor
11. Reparo de placas eletrônicas

**Empresas**
12. Suporte técnico empresarial

Escopos que precisam aparecer na descrição curta de cada serviço, para não gerar expectativa falsa:
- Conserto de monitor: **não** inclui troca de painel/tela de LCD.
- Reparo de placas: reparo em nível de componente, sujeito a avaliação de viabilidade.
- Recuperação de dados: sujeita a avaliação; resultado não é garantido.

Não cadastrar: reparo de celular, áudio, videogame, eletrodoméstico, venda de peças.

---

## PARTE 7 — Descrição do perfil (colar como está)

```
Assistência técnica em informática e eletrônica atuando em Curitiba e São José dos Pinhais. O atendimento é por agendamento: no endereço do cliente, de forma remota ou com coleta e entrega para reparo em bancada.

Informática: manutenção de computadores e notebooks, formatação e instalação de sistema, remoção de vírus, upgrade de SSD e memória, backup e recuperação de dados, redes e Wi-Fi, montagem de PC e suporte técnico para empresas.

Eletrônica: conserto de TV e Smart TV, conserto de monitor e reparo de placas eletrônicas em nível de componente, com diagnóstico feito em bancada e instrumentação adequada.

O processo é sempre o mesmo: triagem, diagnóstico, escopo, prazo e valor informados antes da execução. Nada é executado sem autorização do cliente. Quando o reparo não compensa ou não é viável, isso é dito de forma clara. Atendimento residencial e empresarial.
```

Contagem: 877 caracteres (limite do GBP: 750 caracteres).
**Ação manual:** usar a versão reduzida abaixo no campo do perfil e manter a completa para site/mídia.

Versão para o campo do GBP (701 caracteres):

```
Assistência técnica em informática e eletrônica em Curitiba e São José dos Pinhais. Atendimento por agendamento: no endereço do cliente, remoto ou com coleta e entrega para reparo em bancada.

Informática: manutenção de computadores e notebooks, formatação, remoção de vírus, upgrade de SSD e memória, backup e recuperação de dados, redes e Wi-Fi, montagem de PC e suporte para empresas.

Eletrônica: conserto de TV e Smart TV, conserto de monitor e reparo de placas eletrônicas em nível de componente, com diagnóstico em bancada.

Triagem, diagnóstico, escopo, prazo e valor são informados antes da execução. Nada é executado sem autorização. Quando o reparo não é viável, isso é dito de forma clara.
```

Proibido na descrição: "melhor de Curitiba", "nº 1", "mais avaliada", "líder", "todas as marcas",
"todos os equipamentos", "desde 1998", "assistência autorizada", "parceiro oficial", nota/estrelas,
número de clientes, prazo fixo sem lastro.

---

## PARTE 8 — Horários

```text
HORÁRIO GBP = APROVADO
```

Origem: confirmação escrita do responsável na Rodada 4I (2026-08-08).

| Dia | Horário |
| --- | --- |
| Segunda-feira | 08:30–18:00 |
| Terça-feira | 08:30–18:00 |
| Quarta-feira | 08:30–18:00 |
| Quinta-feira | 08:30–18:00 |
| Sexta-feira | 08:30–18:00 |
| Sábado | 09:00–13:00 |
| Domingo | Fechado |

Proibido publicar no perfil: "24 horas", "atendimento imediato", "plantão", "sempre disponível".
Feriado sem confirmação: não declarar horário especial. Alteração de faixa só com nova
confirmação escrita registrada aqui, com data.

---

## PARTE 25 (referência) — Claim "desde 1998"

```text
DESDE 1998 = DECLARAÇÃO DO RESPONSÁVEL
USO EXTERNO = PROIBIDO
```

Não usar em GBP, citations, vídeo institucional, mídia kit, release, material de parceiros ou
schema externo. Permanece no site exatamente como já está — sem alteração nesta rodada.

---

## Checklist de execução manual (GBP)

- [ ] Criar/reivindicar o perfil com a conta oficial do negócio
- [ ] Marcar "atendo clientes no endereço deles" e **ocultar o endereço**
- [ ] Cadastrar as áreas: Curitiba e São José dos Pinhais (somente estas)
- [ ] Categoria principal: confirmar o nome real no catálogo e selecionar
- [ ] Categorias secundárias: no máximo as 3 da Parte 5
- [ ] Telefone: +55 41 99708-6380 · Site: https://tecnico.curitiba.br
- [ ] Descrição: colar a versão de 701 caracteres
- [ ] Serviços: cadastrar os 12 itens com escopo explícito onde indicado
- [ ] Horário: deixar em branco até a confirmação operacional
- [ ] Ativar mensagens e definir resposta inicial
- [ ] Concluir a verificação (vídeo/cartão) — endereço visível só para o Google
- [ ] Logo e capa
- [ ] Fotos: **não publicar nada** até existir captura real aprovada (Parte 9–13)
- [ ] Guardar o link curto de avaliação para o processo de reviews
- [ ] Não preencher: endereço público, CEP, CNPJ, ano de fundação, faixa de preço

---

## STATUS

```text
PACOTE GBP PRONTO PARA EXECUÇÃO MANUAL
```

Pendências que **não** bloqueiam a criação do perfil: horário (campo pode ficar vazio) e fotos
(publicação gradual posterior). Pendência que bloqueia a *publicação de fotos*: captura real.
