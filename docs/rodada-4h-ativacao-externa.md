# Rodada 4H — Pacote de ativação externa da entidade local

Data: 2026-08-08 · Escopo: **somente documentação** · Regra Zero respeitada.

Documentos produzidos nesta rodada:
- `docs/gbp-pacote-canonico.md` (Partes 1–8 e 25)
- `docs/plano-fotografico-operacao-real.md` (Partes 9–13)
- `docs/processo-reviews-google.md` (Partes 14–16)
- este relatório (Partes 17–29)

---

## 1. Resumo executivo

A 4G concluiu que a entidade existe operacionalmente, mas não é verificável externamente:
sem GBP, sem foto própria, sem review, sem citation, sem link local. A 4H não resolve isso por
código — nada disso é criável de dentro do repositório. O que a 4H entrega é o **pacote executável**:
copy canônica, categorias validadas, áreas conservadoras, shot list com gate de privacidade,
processo neutro de reviews, 18 oportunidades de citation classificadas e um plano de 90 dias com
separação explícita do que é Lovable e do que é manual.

Decisão: a ativação externa pode começar. O único campo pendente (horário) não bloqueia a criação
do perfil, e o bloqueio real — fotos — é de captura, não de autorização.

## 2. Entidade

| Elemento | Situação |
| --- | --- |
| Nome | Técnico em Curitiba — consistente em site, schema e pacote GBP |
| URL canônica | https://tecnico.curitiba.br |
| Contato | WhatsApp +55 41 99708-6380, canal único |
| Endereço/CEP/CNPJ | Não autorizados para exposição (governança 4G) |
| Modelo | Service Area Business |
| Prova externa | Inexistente até esta data |

## 3. GBP

`PACOTE GBP PRONTO PARA EXECUÇÃO MANUAL`. Ver `docs/gbp-pacote-canonico.md`.
Nada foi criado, reivindicado ou verificado — essas ações são exclusivamente manuais.

## 4. Categorias

Principal: **Serviço de reparo de computadores**.
Secundárias: Serviço de reparo de eletrônicos · Serviço de reparo de televisores · Serviço de TI.
Excluídas por estarem fora da expansão autorizada: áudio, videogame, celular, eletrodomésticos,
loja de informática. Nomes devem ser reconferidos no catálogo no momento da criação.

## 5. Áreas

Publicar apenas **Curitiba (A)** e **São José dos Pinhais (B)**. Demais cidades da RMC ficam em
`NÃO PUBLICAR` até haver atendimento real registrado. Sem raio artificial, sem lista longa.

## 6. Serviços

12 itens, todos lastreados em rota publicada, sem preço. Escopo negativo explícito para monitor
(sem troca de painel), placas (viabilidade avaliada) e recuperação de dados (resultado não garantido).

## 7. Descrição

Duas versões redigidas: completa (877 caracteres, para mídia) e a do campo do GBP (701 caracteres,
dentro do limite de 750). Sem superlativo, sem "todas as marcas", sem "desde 1998".

## 8. Horários

```text
HORÁRIO GBP = PENDENTE DE CONFIRMAÇÃO OPERACIONAL
```
Campo fica vazio até o responsável confirmar faixa por dia. Não presumir 24h nem comercial.

## 9. Fotos

`SHOT LIST PRONTA — AGUARDANDO CAPTURA`. 6 prioridades, 19 tomadas planejadas.
Manifesto `src/lib/provasBancada.ts` continua vazio; a seção do site não renderiza (fail-closed).

## 10. Privacidade

Gate de 15 itens de descarte automático + remoção de EXIF/GPS + revisão em 100% de zoom.
Em dúvida, não publica.

## 11. Manifesto

`docs/registro-provas-visuais.md` só é alterado depois que a foto existir e passar no gate.
Formato de linha definido no plano fotográfico. Nenhuma linha nova nesta rodada — não há foto.

## 12. Reviews

`PROCESSO DE REVIEWS PRONTO`. Gatilho = atendimento concluído, uma solicitação por OS,
mensagem neutra, proibição explícita de indução de nota, contrapartida e *review gating*.

## 13. Respostas a reviews

Protocolo por tipo (positiva/neutra/negativa) com resposta-modelo, prazo de 48h úteis e
proibição de expor OS, valor ou dado do cliente. Denúncia oficial reservada a review que viole
política do Google.

## 14. Citations

`CITATIONS LEGÍTIMAS MAPEADAS` — 18 oportunidades. Critério: relevância local, legitimidade,
perfil empresarial real e baixo risco de spam. Autoridade de domínio **não** foi critério de corte.

| # | Fonte | Tipo | Relevância Curitiba | Exige endereço público | Prioridade |
| --- | --- | --- | --- | --- | --- |
| 1 | Google Business Profile | Mapa/perfil | Alta | Não (SAB oculta) | **A** |
| 2 | Bing Places for Business | Mapa/perfil | Média | Não (SAB oculta) | **A** |
| 3 | Apple Business Connect | Mapa/perfil | Média | Não (área de serviço) | **A** |
| 4 | Instagram Business (perfil oficial) | Social/perfil | Alta | Não | **A** |
| 5 | Facebook Página (categoria serviço local) | Social/perfil | Alta | Não (SAB) | **A** |
| 6 | LinkedIn Página da empresa | Social/perfil | Média | Não (cidade basta) | **A** |
| 7 | YouTube canal oficial | Vídeo/perfil | Média | Não | **A** |
| 8 | WhatsApp Business (catálogo + perfil) | Canal/perfil | Alta | Não | **A** |
| 9 | GetNinjas | Marketplace de serviço | Alta | Não (atende por região) | **B** |
| 10 | Habitissimo / Solicite Orçamento | Marketplace de serviço | Média | Não | **B** |
| 11 | Sympla/Meetup — presença em evento tech local | Evento | Média | Não | **B** |
| 12 | Associação comercial / entidade de bairro | Institucional | Alta | Geralmente sim | **B** (verificar) |
| 13 | Portal de notícias local (matéria/coluna) | Editorial | Alta | Não | **B** |
| 14 | Blog/newsletter de parceiro (fornecedor de peças) | Editorial | Média | Não | **B** |
| 15 | Diretórios genéricos de "empresas do Brasil" (agregadores de CNPJ) | Diretório | Baixa | Sim | **DESCARTAR** |
| 16 | Guias pagos de "1ª página garantida" | Diretório | Baixa | Sim | **DESCARTAR** |
| 17 | Listas de links / "parceiros" sem curadoria | Link farm | Nula | Não | **DESCARTAR** |
| 18 | Diretórios internacionais sem tráfego BR | Diretório | Nula | Sim | **DESCARTAR** |

Ordem de execução: 1 → 8 (fundação), depois 9 → 14 conforme houver prova real publicada.

## 15. NAP parcial

Padrão único, idêntico em toda plataforma:

```text
Nome:  Técnico em Curitiba
Fone:  +55 41 99708-6380
Site:  https://tecnico.curitiba.br
Área:  Curitiba e São José dos Pinhais (PR)
```

Endereço não é preenchido. Se a plataforma exigir endereço **visível**:
`DESCARTAR POR ENQUANTO`. Jamais inventar endereço, usar coworking não contratado, endereço
residencial de terceiro ou "Curitiba, PR" em campo de logradouro.

## 16. Links locais (link building legítimo)

Oportunidades legítimas, sem spam e sem troca paga:

| Tipo | Caminho | Condição |
| --- | --- | --- |
| Fornecedor de peças/componentes | Página "onde nos encontrar"/clientes do fornecedor | Relação comercial real |
| Cliente empresarial | Case/menção com autorização escrita | Serviço prestado e comprovado |
| Portal de notícias local | Contribuição técnica (golpes, descarte de eletrônico, LGPD) | Pauta de interesse público |
| Associação/entidade de bairro | Associação regular | Pode exigir endereço — verificar |
| Evento tech/maker de Curitiba | Participação ou apoio técnico | Participação real |
| Conteúdo colaborativo | Guia conjunto com profissional de área adjacente | Conteúdo próprio, sem PBN |

Proibido: compra de link, troca recíproca em massa, guest post em rede de blogs, comentário
com link, PBN, diretório pago de link.

## 17. Parcerias

Perfis de parceiro que fazem sentido sem criar produto novo: fornecedor de componentes,
loja de informática sem bancada própria, prestador de TI que não faz eletrônica,
suporte de condomínio/escritório, integrador de rede.

## 18. B2B (reparo de placas para terceiros)

Mapeamento **apenas de tipos de parceiro** — sem landing, sem tabela de preço, sem programa,
sem atacado, conforme a instrução:

| Tipo | Interesse | Observação |
| --- | --- | --- |
| Assistência de informática sem bancada de microssolda | Alto | Envia placa, recebe laudo |
| Assistência de TV sem instrumentação | Alto | Depende de capacidade real de fila |
| Loja de manutenção de notebook | Médio | Volume irregular |
| Prestador de TI corporativo | Médio | Demanda de continuidade, não de reparo |
| Recondicionador / refurbisher | Médio | Volume alto, margem baixa |
| Técnico autônomo | Baixo | Volume baixo, alto custo de coordenação |

Nada disso vira página, oferta ou preço nesta rodada.

## 19. Vídeo

Seis primeiros vídeos, foco em processo e critério — não em técnica de risco:

| # | Título de trabalho | Mensagem |
| --- | --- | --- |
| 1 | Como um equipamento é recebido | Registro, conferência, expectativa de prazo |
| 2 | Como uma placa é identificada | Modelo, revisão, o que muda no diagnóstico |
| 3 | O que é diagnóstico em bancada | Diferença entre "olhar" e medir |
| 4 | Reparo de placa × troca de placa | Critério de decisão e custo |
| 5 | Como ocorre o teste final | Por que o teste é parte do serviço |
| 6 | Quando um reparo pode ser recusado | Transparência: nem tudo compensa |

Regra de segurança: **não** ensinar passo a passo de alta tensão, BGA, reballing,
injeção de tensão ou qualquer procedimento perigoso. Sem PII em tela. Sem claim comercial novo.

## 20. Redes sociais — auditoria

| Canal | Existe | Controlado | Nome consistente | URL correta |
| --- | --- | --- | --- | --- |
| Instagram | Não identificado | — | — | — |
| Facebook | Não identificado | — | — | — |
| YouTube | Não identificado | — | — | — |
| LinkedIn | Não identificado | — | — | — |
| WhatsApp Business | Sim (número oficial) | Sim | Sim | wa.me/5541997086380 |

Nenhum perfil foi criado nesta rodada. Criação é ação manual e deliberada.

## 21. SameAs

Nenhuma URL entra em `sameAs` enquanto o controle do perfil não for comprovado.
**Schema não foi alterado nesta rodada.**

## 22. "Desde 1998"

```text
USO EXTERNO = PROIBIDO (GBP, citations, vídeo, mídia kit, release, parceiros, schema externo)
USO NO SITE = MANTIDO EXATAMENTE COMO ESTÁ
```
O rascunho anterior (`docs/gbp-service-area-business.md`) trazia o claim na descrição do GBP;
foi corrigido nesta rodada e marcado como substituído.

## 23. Score de prova

Baseline mantido: **6 / 50**. Documentação, planejamento e configuração administrativa **não**
somam ponto. Critérios objetivos para evolução:

| Evidência | Pontos possíveis | Como pontua |
| --- | --- | --- |
| GBP criado e verificado | 10 | 5 ao criar · +5 na verificação concluída |
| Fotos reais publicadas | 10 | 2 por foto aprovada no manifesto, até 5 fotos |
| Reviews reais | 10 | 1 por review real recebida, até 10 |
| Vídeos publicados | 5 | 1 por vídeo real, até 5 |
| Citations reais ativas | 8 | 1 por citation prioridade A/B publicada, até 8 |
| Backlinks locais reais | 7 | 2 por link editorial local legítimo, até 7 |
| **Total** | **50** | — |

Proibido pontuar por: documento escrito, plano, intenção, perfil criado e não verificado,
foto de banco de imagens, review solicitada mas não recebida.

## 24. Plano 90 dias

**0–30 dias** — GBP criado, verificado e configurado · captura das prioridades 1–3 · NAP replicado em
Bing e Apple · primeiras solicitações de review após atendimentos concluídos.

**31–60 dias** — citations B (marketplaces e perfis sociais controlados) · vídeos 1–3 ·
primeiras conversas de parceria com fornecedor e prestadores de TI.

**61–90 dias** — links locais editoriais · aproximação B2B de reparo de placa ·
conteúdo apoiado em prova real já capturada.

## 25. Manual × Lovable

| Ação | Lovable | Manual |
| --- | --- | --- |
| Preparar copy do GBP | ✅ | |
| Criar/reivindicar GBP | | ✅ |
| Verificar GBP | | ✅ |
| Fotografar a operação | | ✅ |
| Editar/otimizar fotos | possível depois | ✅ |
| Publicar fotos no GBP | | ✅ |
| Solicitar reviews | | ✅ |
| Responder reviews | rascunho possível | ✅ |
| Criar citations | | ✅ |
| Criar perfis sociais | | ✅ |
| Gravar/publicar vídeos | | ✅ |
| Criar e manter documentação | ✅ | |
| Inserir fotos aprovadas no manifesto do site | ✅ | |
| Alterar páginas congeladas (TV/placa/monitor) | ❌ | ❌ |

## 26. Arquivos alterados

```text
docs/gbp-pacote-canonico.md              (novo)
docs/plano-fotografico-operacao-real.md  (novo)
docs/processo-reviews-google.md          (novo)
docs/rodada-4h-ativacao-externa.md       (novo)
docs/gbp-service-area-business.md        (marcado como substituído; claim "desde 1998" removido)
```

Nenhum arquivo de aplicação foi tocado.

## 27. Git final e validações

```text
rg -n "conserto-tv|conserto-placa|conserto-monitor" src   → inalterado (sem diff)
npm run check:trust-claims          → PASS
npm run check:copy                  → PASS
npm run check:telemetry-governance  → PASS
```

Confirmação da Parte 29:

```text
TV       = 0 alterações
PLACAS   = 0 alterações
MONITOR  = 0 alterações
TRIAGEM  = 0 alterações
TRACKING = 0 alterações
BANCO    = 0 alterações
```

Build não executado: apenas documentação foi alterada.

## 28. DECISÃO

```text
ATIVAÇÃO EXTERNA PODE COMEÇAR
```

## 29. Próximo passo

Executar manualmente o GBP como Service Area Business (Curitiba + São José dos Pinhais, endereço
oculto, horário em branco até confirmação), iniciar a captura das provas reais conforme a shot list,
criar as primeiras citations legítimas da prioridade A e ativar o processo neutro de reviews após
atendimentos concluídos. As três verticais permanecem congeladas.

Dado factual pendente, sem bloquear o início: **faixa de horário de atendimento por dia da semana**.
