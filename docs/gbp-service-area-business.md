# Google Business Profile — Service Area Business (pacote pronto)

Fonte: decisão de governança da Rodada 4G. Modelo aprovado: **SERVICE AREA BUSINESS**
(área de atendimento, **endereço oculto**). Proibido apresentar unidade física aberta ao público.
Endereço, CEP e CNPJ **não** entram em nenhum campo público.

---

## 1. Configuração base

| Campo | Valor a usar |
| --- | --- |
| Nome do perfil | `Técnico em Curitiba` (sem keywords artificiais) |
| Tipo de negócio | Atendo clientes no endereço deles → **sim** · Tenho local que clientes visitam → **não** |
| Endereço | Informar apenas para verificação; marcar **"Ocultar endereço"** |
| Áreas atendidas | Curitiba · São José dos Pinhais · Pinhais · Colombo · Araucária · Campo Largo · Almirante Tamandaré · Fazenda Rio Grande · Piraquara · Quatro Barras |
| Categoria principal | Serviço de reparo de computadores |
| Categorias secundárias | Serviço de reparo de eletrônicos · Serviço de reparo de televisores · Serviço de TI |
| Telefone | +55 41 99708-6380 (WhatsApp) |
| Site | https://tecnico.curitiba.br |
| Horário | Seg–Sex 08:00–18:00 · Sáb 09:00–13:00 · Dom fechado |
| Atributos | Atendimento no local · Atendimento remoto · Retirada e entrega · Orçamento online |
| Mensagens | Ativar (encaminha para o mesmo número do WhatsApp) |

Não usar: "melhor", "nº 1", "mais avaliada", "todas as marcas", "todos os equipamentos".

## 2. Descrição (750 caracteres — copiar e colar)

```
Assistência técnica em informática e eletrônica em Curitiba e Região Metropolitana, com atuação em informática desde 1998. Atendimento por agendamento: no endereço do cliente, remoto ou com coleta e entrega para reparo em bancada.

Serviços: manutenção de computadores e notebooks, formatação e instalação de sistema, remoção de vírus, upgrade de SSD e memória, backup e recuperação de dados, redes e Wi-Fi, montagem de PC, suporte técnico para empresas, além de reparo de TVs, monitores e placas eletrônicas em nível de componente.

O processo é sempre o mesmo: triagem pelo WhatsApp, diagnóstico, escopo e valor informados antes da execução. Nada é executado sem a autorização do cliente. Quando o reparo não compensa, isso é dito de forma clara.
```

Variação curta (para bio de redes sociais, até 160 caracteres):

```
Assistência técnica em informática e eletrônica em Curitiba e região. Atendimento no local, remoto ou com coleta. Diagnóstico e valor antes de executar.
```

## 3. Serviços a cadastrar no perfil

**Informática**
- Manutenção de computador
- Manutenção de notebook
- Formatação e instalação de sistema
- Remoção de vírus e malware
- Upgrade de SSD e memória RAM
- Backup e recuperação de dados
- Montagem de PC
- Redes e Wi-Fi

**Eletrônica**
- Conserto de TV
- Conserto de monitor (sem troca de painel)
- Reparo de placas eletrônicas em nível de componente

**Empresas**
- Suporte técnico empresarial
- Manutenção preventiva
- Backup corporativo

Não cadastrar: áudio, venda de peças, reparo de celular, serviços não publicados no site.

## 4. Checklist de configuração

- [ ] Criar/reivindicar o perfil com a conta oficial do negócio
- [ ] Selecionar "atendo clientes no endereço deles" e **ocultar o endereço**
- [ ] Cadastrar as 10 áreas de atendimento
- [ ] Definir categoria principal e até 3 secundárias
- [ ] Telefone e site conforme a tabela acima
- [ ] Horário de funcionamento e feriados
- [ ] Colar a descrição da seção 2
- [ ] Cadastrar a lista de serviços da seção 3 (com descrição curta em cada um)
- [ ] Ativar mensagens e definir resposta automática
- [ ] Concluir a verificação (vídeo ou cartão) — só o Google vê o endereço
- [ ] Adicionar logo e foto de capa
- [ ] Publicar as primeiras fotos (ver seção 5)
- [ ] Configurar o link curto de avaliação e guardá-lo para o pós-atendimento
- [ ] Repetir nome, telefone, site e áreas idênticos em Bing Places e Apple Business Connect

## 5. Fotos — calendário gradual

Não subir tudo de uma vez. Nunca publicar fachada, número, placa de rua ou qualquer PII.

| Semana | Publicar | Quantidade |
| --- | --- | --- |
| 1 | Logo, capa, bancada geral | 3 |
| 2 | Instrumentação (microscópio, estação de solda, fonte) | 3 |
| 3 | Técnico identificado / uniforme em atendimento | 2 |
| 4 | Processo: recebimento etiquetado, ESD, embalagem para coleta | 3 |
| 5+ | Equipamentos em bancada (TV, monitor, placa), 2 por semana | 2/semana |

Toda foto passa antes pelo manifesto de provas (`src/lib/provasBancada.ts` e `docs/registro-provas-visuais.md`).

## 6. Reviews — texto de solicitação

Enviar **só depois** do atendimento concluído e do equipamento entregue, uma única vez:

```
Olá, [nome]! O atendimento foi finalizado. Se puder, conte como foi sua experiência — leva menos de um minuto: [link do Google]
Obrigado por confiar o serviço à gente.
```

Proibido: pedir 5 estrelas, oferecer desconto, brinde, dinheiro ou qualquer benefício em troca; criar avaliação.

Resposta a review negativo: agradecer → identificar a OS internamente → responder de forma factual e educada em até 48h → oferecer solução. Nunca expor dados da OS, nunca confrontar publicamente.

## 7. Posts do perfil (frequência mínima)

1 post a cada 7–14 dias, alternando: serviço específico · processo (diagnóstico e autorização) · área atendida · caso técnico sem PII. Sempre com CTA "Enviar mensagem".

## 8. Limites de governança

- "Atuação em informática desde 1998" é **declaração do responsável**, autorizada para uso comercial/GBP. Não apresentar como certificação, credenciamento ou documento auditado.
- Não publicar endereço, CEP ou CNPJ.
- Não usar autorização de fabricante, número de clientes, nota média ou prêmio que não existam.
