# Rodada 4F — Cluster editorial, interlinking e crescimento orgânico

Última grande rodada estrutural do plano de ataque SEO. Foco: transformar o acervo
editorial em apoio real às páginas comerciais, sem produção massiva de conteúdo.

## 1. Estado inicial

- 157 artigos no acervo (137 manuais em `src/data/blogPostsContent.tsx`, 20 programáticos).
- 0 artigos aprovados para indexação — o registro `src/lib/blogEditorialRegistry.ts` é
  fail-closed: sem aprovação explícita, o artigo é `noindex` e fica fora do sitemap.
- 0 artigos no sitemap (o sitemap contém apenas rotas curadas).
- 50 conteúdos classificados como fora do core (TV, celular, CFTV, IA, Linux/infra, outra marca).
- CTAs de artigo abriam WhatsApp diretamente e prometiam "diagnóstico grátis".

Inventário completo e atualizável: `reports/editorial-inventory.md`
(`npm run report:editorial`).

## 2. Clusters e pilares

Definidos em `src/lib/editorialClusters.ts` (fonte única). Cada cluster tem um pilar
comercial canônico e um ramo de CTA (PF ou PJ):

| Cluster | Pilar | Ramo |
| --- | --- | --- |
| Defeito de hardware | /servicos/manutencao-de-computador | PF |
| Lentidão e desempenho | /servicos/manutencao-de-computador | PF |
| SSD, memória e upgrade | /servicos/upgrade-ssd-memoria | PF |
| Formatação, sistema e vírus | /servicos/formatacao-windows | PF |
| Backup e recuperação | /servicos/recuperacao-de-dados | PF |
| Redes e Wi-Fi | /servicos/redes-wifi | PF |
| Atendimento no endereço | /atendimento-domicilio | PF |
| Suporte remoto | /servicos/suporte-remoto | PF |
| Suporte de TI para empresas | /empresa-de-ti-curitiba | PJ |
| Decisão de reparo e custo-benefício | /tecnico-informatica-curitiba | PF |

Regra: artigo nunca disputa a intenção transacional do pilar. Artigo responde dúvida;
pilar vende o serviço.

## 3. Primeira onda (limites da rodada respeitados)

- 8 conteúdos para aprofundamento;
- 4 consolidações de intenção duplicada;
- 4 conteúdos mantidos noindex / fora de foco;
- 0 artigos novos publicados nesta rodada (não havia lacuna sem equivalente no acervo;
  as 4 vagas de conteúdo novo ficam reservadas para o calendário).

A tabela detalhada (consulta, ação, pilar, CTA) está em `src/lib/editorialClusters.ts`
e é validada pelo gate.

## 4. Interlinking implementado

- `ARTIGO → PILAR`: `EditorialCta` sempre exibe o pilar do cluster.
- `ARTIGO → ARTIGO`: `EditorialRelatedLinks` mostra no máximo 3 relacionados, com
  progressão lógica e anchors variadas (título real do conteúdo).
- `PILAR → ARTIGOS`: `PilarEditorialLinks` nas páginas P0
  (`/tecnico-informatica-curitiba`, `/atendimento-domicilio`, `/empresa-de-ti-curitiba`),
  renderizando apenas conteúdos com aprovação editorial — enquanto nada estiver
  aprovado, o bloco não aparece e nenhuma página comercial aponta para rascunho.
- Conteúdo fora de foco nunca recebe link a partir do core (bloqueado pelo gate).

## 5. CTAs PF × PJ

Nenhum CTA editorial abre WhatsApp diretamente. O botão dispara `wa-funnel:open`
com a origem (`blog/<slug>`) e o contexto do artigo; a triagem PF/PJ decide o ramo,
preserva cidade/bairro e permite alteração. Clusters empresariais abrem o ramo PJ.

## 6. Gates

`npm run check:editorial-cluster` falha quando:

- a primeira onda excede 8/4/4 conteúdos;
- artigo prioritário não tem cluster, pilar válido ou link editorial relacionado;
- relacionado não existe no acervo, é auto-link, ou é conteúdo fora de foco/noindex;
- consolidação sem destino, com destino inexistente ou circular;
- consulta duplicada entre conteúdos prioritários;
- CTA editorial com `wa.me`/`api.whatsapp` ou sem o evento de triagem;
- claim proibido no CTA ou no conteúdo (diagnóstico grátis, garantido, solução
  definitiva, "no mesmo dia", "paga apenas se");
- rating/review no runtime editorial;
- pilar P0 sem bloco de conteúdos de apoio;
- `PilarEditorialLinks` sem filtro de aprovação (fail-closed).

Integrado ao CI antes do build, junto aos gates de copy proibida e claims.

## 7. Correções aplicadas

- Removido o bloco de WhatsApp direto do rodapé dos artigos (`src/pages/BlogPost.tsx`).
- Removida a constante `WA` e o CTA direto dos artigos programáticos.
- Substituída a promessa "diagnóstico grátis" pela política real: o valor é informado
  após a avaliação técnica e nada é executado sem aprovação.
- Removidos claims "no mesmo dia" e "solução definitiva" do acervo manual.

## 8. Calendário editorial — 12 semanas

Ritmo: uma ação profunda por semana. Nada de publicação em lote.

| Sem. | Conteúdo | Cluster | Ação | Pilar | CTA | Prova necessária |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | notebook não liga | Defeito de hardware | aprofundar | manutenção | PF avaliação | fluxo de testes seguros revisado |
| 2 | computador lento | Lentidão | aprofundar | manutenção | PF avaliação | cenários software × hardware |
| 3 | quando trocar HD por SSD | SSD/upgrade | aprofundar | upgrade | PF orientação | limites de compatibilidade |
| 4 | instalar Windows do zero | Formatação | aprofundar | formatação | PF orientação | aviso de backup obrigatório |
| 5 | consolidação de duplicadas (1/2) | vários | consolidar | conforme cluster | — | mapa de equivalência |
| 6 | recuperação × backup | Backup | aprofundar | recuperação de dados | PF avaliação | limites, sem percentuais |
| 7 | Wi-Fi fraco em casa | Redes | aprofundar | redes e Wi-Fi | PF modalidade | sem exposição de credenciais |
| 8 | consolidação de duplicadas (2/2) | vários | consolidar | conforme cluster | — | mapa de equivalência |
| 9 | atendimento avulso × recorrente | Empresas | aprofundar | empresa de TI | PJ | sem SLA e sem preço mensal |
| 10 | vale a pena consertar notebook antigo | Custo-benefício | aprofundar | técnico Curitiba | PF avaliação | sem preço fechado |
| 11 | novo: preparar o equipamento para atendimento | Atendimento | novo | atendimento domicílio | PF modalidade | fluxo real de atendimento |
| 12 | revisão trimestral das P0 + links | — | revisão | todas | — | rodar todos os gates |

Revisões fixas: P0 a cada trimestre; consultas e links internos mensalmente.

## 9. Métricas

Search Console permanece **pendente de conexão** — nenhum baseline de impressões,
cliques, CTR ou posição foi inventado. Até lá, os critérios são técnicos: indexação,
crawl, links internos e integridade dos gates.

Conversão já instrumentada: abertura do funil por artigo (`blog/<slug>`), início e
conclusão da triagem, ramo PF/PJ e serviço. Nenhuma descrição livre ou PII é enviada.

## 10. Confirmações

Sem migration, sem alteração de banco, sem publicação de redirects, sem DNS, sem novo
preço, sem SLA, sem rating, sem produção massiva de artigos e sem alteração das páginas
P0 além dos blocos de links editoriais.

## 11. Riscos remanescentes e próximo passo

- Registro editorial ainda vazio: nenhum artigo é indexável até revisão técnica com
  autoria e data de modificação reais.
- 50 conteúdos fora do core continuam noindex, aguardando decisão de transferência,
  consolidação ou arquivamento.
- Próximo passo: executar a semana 1 do calendário e conectar o Search Console.
