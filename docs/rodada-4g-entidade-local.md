# Rodada 4G — Entidade local + prova operacional + autoridade legítima

**Modo:** SOMENTE LEITURA. Nenhuma alteração de código, funil, CTA, preço, schema, SEO ou verticais congeladas (TV · Placas · Monitor).
**Data:** 2026-08-08 · Escopo: GBP · NAP · fotografia real · reviews reais · citations.

---

## 1. Resumo executivo

O portal é tecnicamente superior aos concorrentes locais (conteúdo, schema, governança, telemetria), mas **não é hoje uma entidade local verificável**: não há endereço público, CNPJ publicado, perfil Google Business Profile controlado, foto própria de bancada, review real, citation local ou `sameAs` de perfil oficial. Todo o material visual publicado é banco licenciado rotulado como ilustração — correto e honesto, porém sem valor de prova.

Consequência: o gap da 4F-PRE (PROVA + PRESENÇA LOCAL + AUTORIDADE EXTERNA) permanece **integralmente aberto** e só pode ser fechado por ação externa (fotografar, verificar GBP, coletar reviews reais), não por código.

Nenhum P0 de entidade foi encontrado: não há informação factual incorreta publicada. Há **omissão**, não **erro** — e omissão não autoriza correção automática.

## 2. Git

```
git status --short   → (vazio, working tree limpo)
git diff --stat      → (sem alterações)
```
Estado final idêntico ao inicial (ver §32).

## 3. Entidade canônica

| Campo | Valor atual | Fonte | Público | Conflito |
| --- | --- | --- | --- | --- |
| Nome comercial | Técnico em Curitiba | `src/lib/siteConfig.ts` | Sim | Não |
| Razão social | "Técnico em Curitiba — Assistência Técnica em Informática" (`legalName`) | `siteConfig.legalName` | Usado só em schema | Não publicado como razão social jurídica |
| CNPJ | **ausente** | — | Não | Não (omissão) |
| Telefone | +5541997086380 | `siteConfig.phoneE164` | Só em JSON-LD `telephone` | Não |
| WhatsApp | 5541997086380 | `siteConfig.whatsappNumber` | Só em `wa.me` | Não |
| E-mail | **ausente** | — | Não | Não |
| Endereço | **ausente** (`PostalAddress` só com localidade/UF) | `localBusinessJsonLd.ts` | Parcial | Não |
| Cidade / UF | Curitiba / PR | `siteConfig` | Sim | Não |
| CEP | **ausente** | — | Não | Não |
| Horário | Seg–Sex 08:00–18:00 · Sáb 09:00–13:00 | `OPENING_HOURS` | Sim (schema) | Não verificado externamente |
| Área de atendimento | Curitiba, SJP, Pinhais, Colombo, Araucária, Campo Largo, RMC | `siteConfig.serviceArea` | Sim | Não |
| URL canônica | https://tecnico.curitiba.br | `siteConfig.baseUrl` | Sim | Não |
| Logo | og-image / logo do portal | `siteConfig.defaultOgImage` | Sim | Não |
| Ano de início | 1998 | `siteConfig.foundedYear` | Sim | **Não comprovado documentalmente** |

Fonte única confirmada: `src/lib/siteConfig.ts` → `src/lib/localBusinessJsonLd.ts` → páginas. Não há telefone/endereço hardcoded fora dessa cadeia.

## 4. NAP

**NAP CONSISTENTE (internamente) — porém INCOMPLETO e não verificado externamente.**

- Consistência interna: 100% (fonte única, sem divergência entre páginas).
- Address: sem `streetAddress` e sem `postalCode`.
- Sem GBP, Facebook, Instagram ou diretórios sob controle conhecido → nada para cruzar.
- Não há divergência a corrigir. Não houve correção automática (regra NAP respeitada).

## 5. Modelo operacional

**INDETERMINADO.** Não há evidência documental no repositório sobre atendimento presencial, bancada com endereço, ou operação exclusivamente por coleta/domicílio. O site opera com coleta/atendimento e WhatsApp como único canal, o que **sugere** SERVICE AREA BUSINESS ou HÍBRIDO, mas sugestão não é evidência.

Classificação: **não classificável nesta rodada**. Requer confirmação do operador:
1. Recebe cliente no endereço? (sim/não/só agendado)
2. Existe bancada com endereço fixo?
3. O endereço pode ser público?

## 6. GBP

**GBP — AÇÃO EXTERNA NECESSÁRIA.** Não há acesso, credencial ou perfil identificado. O único `sameAs` presente é uma URL de *busca* no Google Maps (`/maps/search/?...`), não um perfil verificado — ou seja, o portal hoje **não possui entidade no Google Maps**.

Não foi configurado nada. Não há como configurar por código.

## 7. Categorias GBP (pacote factual proposto — não aplicado)

- **Principal:** Serviço de reparo de computadores (*Computer repair service*).
- **Secundárias (apenas atividades realmente exercidas):** Serviço de reparo de eletrônicos; Serviço de reparo de televisores; Serviço de TI / suporte a empresas.
- **Não incluir:** áudio (recusado na 4Z), loja de informática, venda de peças, reparo de celular.

## 8. Serviços GBP (baseados apenas em rotas publicadas)

- Informática: diagnóstico, manutenção, formatação, upgrade SSD/RAM, backup e recuperação de dados, redes Wi-Fi, montagem de PC.
- TV: diagnóstico e reparo em bancada (`/servicos/conserto-tv`).
- Monitor: diagnóstico e reparo, sem troca de painel (`/servicos/conserto-monitor`).
- Placas eletrônicas: diagnóstico e reparo em nível de componente (`/servicos/conserto-placa`).
- Empresas: suporte de TI, manutenção preventiva, backup.

Excluído: áudio e qualquer serviço não publicado.

## 9. Descrição GBP (rascunho factual — não publicado)

> Assistência técnica em informática e eletrônica em Curitiba e região metropolitana. Diagnóstico em bancada de computadores, notebooks, monitores, TVs e placas eletrônicas, com coleta quando aplicável. Atendimento residencial e empresarial, com triagem prévia, escopo definido e autorização do cliente antes de qualquer execução. Valor mínimo de atendimento informado antes da aprovação.

Sem superlativos, sem "melhor", sem "todas as marcas", sem número de clientes.

## 10. Provas existentes

Segundo `docs/registro-provas-visuais.md`: **zero** fotografias próprias. 7 assets em uso, todos banco licenciado (Unsplash/Pexels), rotulados como ilustração de contexto, com crédito visível (gate `check:image-credits`). Nenhuma imagem de IA publicada. Nenhuma galeria de "prova de bancada" publicada.

## 11. Fotos faltantes

Todas. Grupos A (identidade/local), B (bancada e instrumentação), C (TV), D (placas), E (monitor), F (processo) estão 0/0.

## 12. Shot list operacional

- **A — Identidade:** local de operação, entrada, área de atendimento, logo física (só se existir).
- **B — Bancada:** visão geral organizada, microscópio, osciloscópio, fonte de bancada, estação de solda/rework, área ESD, estação BGA. Fotografar somente o que existe de fato.
- **C — TV:** equipamento identificado · inspeção · placa em bancada · instrumentação · teste final.
- **D — Placas:** placa identificada · microscopia · medição · retrabalho (só quando ocorrer) · validação.
- **E — Monitor:** recebido · fonte/placa · bancada · teste final (2 entradas).
- **F — Processo:** etiqueta de recebimento sem PII · embalagem · proteção ESD · preparação de coleta/devolução · acessórios.

Privacidade obrigatória antes da aprovação: sem nome, telefone, endereço, WhatsApp, OS identificável, serial desnecessário, documentos, arquivos pessoais, tela do cliente, dados de rede ou QR code sensível. Metadados EXIF removidos.

## 13. Manifesto de provas (estrutura a preencher por foto)

| arquivo | data | origem | equipamento | etapa | responsável | privacidade revisada | aprovada | canais permitidos | legenda factual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| (vazio — nenhuma foto própria capturada) | | | | | | | | | |

Regra fail-closed já vigente: sem linha aprovada no manifesto, a foto não pode ser rotulada como prova.

## 14. Reviews

Nenhum review real, nenhum `aggregateRating` publicado (correto). Processo proposto, sem execução:

1. Gatilho: OS/atendimento **concluído** e equipamento entregue.
2. Confirmar encerramento com o cliente.
3. Pedido neutro, uma vez só, sem insistência.
4. Enviar link oficial do GBP (inexistente hoje → bloqueio).

Texto: *"Obrigado por confiar o serviço à gente. Se puder, conte como foi sua experiência — leva menos de um minuto: [link]"*. Proibido pedir 5 estrelas ou oferecer desconto/brinde/benefício.

Reviews negativos: ler → identificar OS → investigar internamente → responder factual e educado em até 48h → resolver quando possível. Nunca expor dados da OS, nunca atacar, nunca compensar com review comprado.

## 15. Citations locais

| Fonte | Tipo | Autoridade | Relevância local | Custo | Risco | Prioridade |
| --- | --- | --- | --- | --- | --- | --- |
| Google Business Profile | Mapa | Alta | Máxima | 0 | Baixo | **A** |
| Bing Places | Mapa | Média | Alta | 0 | Baixo | **A** |
| Apple Business Connect | Mapa | Média | Média | 0 | Baixo | **A** |
| Facebook Page (perfil oficial) | Rede | Média | Alta | 0 | Baixo | **A** |
| Instagram Business | Rede | Média | Alta | 0 | Baixo | **A** |
| LinkedIn Company | Rede | Média | Média | 0 | Baixo | B |
| ACIC / associações empresariais de Curitiba | Entidade | Média | Alta | Pago | Baixo | B |
| Portais/guias locais de Curitiba legítimos | Diretório | Baixa-média | Alta | Variável | Médio | B |
| Fornecedores/distribuidores (página de parceiros) | Parceria | Média | Média | 0 | Baixo | B |
| Pacotes de links, PBN, Fiverr, diretório spam, guest post sem relação, links internacionais | — | — | — | — | Alto | **DESCARTAR** |

## 16. Backlinks locais

Perfil externo praticamente inexistente (4F-PRE: concorrentes líderes com Authority Score ~9). Ausência de backlink é **P2**, não P0. Caminho legítimo: citations A → parcerias reais → menções editoriais locais.

## 17. Parcerias

Alvos naturais para menção/link sem manipulação: fornecedores de peças, empresas efetivamente atendidas (com autorização), coworkings, escritórios contábeis/advocacia, integradores, lojas de informática sem bancada, empresas de TI sem reparo próprio, síndicos/condomínios, associações empresariais.

## 18. B2B

Hipótese mapeada, **sem oferta e sem página**: reparo de placas em nível de componente para outras assistências e técnicos autônomos que não possuem microscopia/rework. É o serviço com maior barreira técnica e menor concorrência local. Apenas registrado.

## 19. Vídeo

Nenhum material real disponível → nada a publicar. Formatos planejados: (1) diagnóstico — equipamento → sintoma → bancada → diagnóstico; (2) processo — recebimento → registro → bancada → autorização → teste; (3) placa — placa real → microscopia → instrumentação → validação. Versões curtas (≤60s) para GBP/Instagram/Facebook/Shorts. Não expor procedimento perigoso em detalhe.

## 20. Redes sociais

Nenhum perfil oficial identificado no código ou no `sameAs`. Não há inconsistência de entidade porque não há entidade externa. Nada iniciado.

**YouTube:** NÃO EXISTE (nenhuma referência no repositório). Não criado automaticamente.

## 21. E-E-A-T / entidade

| Sinal | Status |
| --- | --- |
| Responsável técnico nomeado | **AUSENTE** (`GESTOR.nome` vazio → autoria institucional, correto) |
| Certificações | AUSENTE (lista vazia — correto, não inventadas) |
| Empresa / razão social | Parcial (nome comercial publicado, razão social jurídica não) |
| CNPJ | AUSENTE |
| Localização | Parcial (cidade/UF, sem endereço) |
| Histórico "desde 1998" | **PUBLICADO, NÃO COMPROVADO** → risco de credibilidade; exige documento ou remoção |
| Contato | PUBLICADO (WhatsApp) |
| Políticas (preço, garantia, privacidade, recusa) | PUBLICADO — maior ativo E-E-A-T atual |
| Processo (triagem, autorização, provas) | PUBLICADO |

## 22. Structured data

Auditado, **não alterado**. `Organization` (`#organization`), `LocalBusiness`/`ProfessionalService`/`ComputerRepairService` (`#localbusiness` por rota, com `parentOrganization`), `Service`, `PostalAddress` (só locality/region/country), `areaServed` (7 cidades), `OpeningHoursSpecification`, `BreadcrumbList`, `FAQPage`. Sem `aggregateRating` (correto).

Recomendação (bloqueada): só especializar `PostalAddress` com `streetAddress`/`postalCode` e escolher `@type` definitivo depois que nome, endereço, modelo operacional e telefone público estiverem comprovados.

## 23. sameAs

Atual: 1 entrada — URL de **busca** do Google Maps. Não é perfil oficial controlado. Recomendação: substituir por perfis reais (GBP, Instagram, Facebook, YouTube, LinkedIn) somente quando existirem e forem controlados. Não adicionar diretórios como `sameAs`.

## 24. Score de prova

| Dimensão | 0–5 atual | Alvo 90d |
| --- | --- | --- |
| Existência local verificável | 0 | 4 |
| Bancada | 0 | 4 |
| Equipamentos | 0 | 3 |
| Processo | 3 | 4 |
| Reviews | 0 | 2 |
| Fotos | 0 | 4 |
| Vídeos | 0 | 2 |
| Citations | 0 | 3 |
| Backlinks locais | 0 | 2 |
| Consistência NAP | 3 | 5 |

**SCORE ATUAL: 6/50** · **ALVO 90 DIAS: 33/50** (meta operacional, não garantia de resultado de ranking).

## 25. Plano 90 dias (não executado)

- **Mês 1:** definir modelo operacional → verificar GBP → NAP completo → capturar Grupos A/B/F → primeiros reviews reais.
- **Mês 2:** citations prioridade A → perfis sociais oficiais → primeiros vídeos curtos → Grupos C/D/E.
- **Mês 3:** menções locais e parcerias → hipótese B2B de placas → autoridade editorial.

## 26. Ações externas (fora do Lovable)

Fotografar bancada · verificar/criar GBP · subir fotos no GBP · solicitar reviews · criar citations · abrir perfis sociais · obter documento do "desde 1998" · decidir publicidade do endereço/CNPJ.

## 27. Ações Lovable (futuras, não executadas)

Editar/otimizar imagens já capturadas · registrar manifesto de provas no repositório · publicar galerias fail-closed · atualizar `siteConfig`/`sameAs`/`PostalAddress` após comprovação · publicar bloco de gestor responsável quando houver nome real.

| Ação | Site/Lovable | Externa/manual |
| --- | --- | --- |
| Fotografar bancada | — | X |
| Editar imagem | X | — |
| Registrar manifesto | X | — |
| Criar GBP | — | X |
| Subir fotos no GBP | — | X |
| Pedir reviews | — | X |
| Criar citations | — | X |
| Schema | X | — |
| sameAs | X (após existirem) | X (criar perfis) |

## 28. P0

**Nenhum.** Não há telefone errado, CNPJ errado, NAP conflitante, link oficial quebrado nem perfil apontando para domínio errado. Nada foi alterado.

Observação de vigilância (P1, não P0): "desde 1998" é afirmação factual publicada sem lastro documental no repositório. Se não houver documento, deve ser comprovada ou retirada em rodada futura.

## 29. P1

Definir modelo operacional · verificar GBP · completar NAP (endereço/CEP/e-mail quando publicáveis) · capturar provas reais · iniciar reviews reais · citations prioridade A · comprovar "desde 1998".

## 30. P2

Vídeo curto · LinkedIn · associações pagas · hipótese B2B de placas · backlinks editoriais · especialização de schema.

## 31. Arquivos alterados

Apenas este documento (`docs/rodada-4g-entidade-local.md`). Nenhum arquivo de código, schema, funil, tracking ou conteúdo.

## 32. Git final

Working tree contém somente a adição de `docs/rodada-4g-entidade-local.md`.
Diff das verticais congeladas: TV = 0 · Placas = 0 · Monitor = 0 · triagem = 0 · tracking = 0.

## 33. DECISÃO

**ENTIDADE LOCAL EXIGE CORREÇÕES ANTES DA EXPOSIÇÃO**

- A: **GBP BLOQUEADO POR DADOS OPERACIONAIS** (modelo operacional e endereço não determinados)
- B: **PROVAS REAIS AINDA PRECISAM SER CAPTURADAS**
- C: **NAP EXIGE CORREÇÃO** (consistente internamente, porém incompleto e não verificado externamente)
- D: **AUTORIDADE LOCAL BLOQUEADA** (depende de GBP + provas)

## 34. Próximo passo

Corrigir exclusivamente identidade/NAP antes de ampliar exposição externa: (1) responder se a operação recebe clientes no endereço, (2) definir se endereço/CEP/CNPJ podem ser públicos, (3) comprovar ou retirar "desde 1998". Só depois configurar GBP, capturar fotos reais e iniciar citations. Não modificar TV, placas ou monitor até o gatilho da 4F.
