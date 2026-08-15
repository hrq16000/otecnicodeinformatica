# Rodada 8E — GBP + conteúdo de demanda + ponte para conversão local

Data: 2026-08-14. Escopo executado: **cluster editorial piloto de aquisição orgânica**.
Fora de escopo (não iniciado, conforme instrução): Google Ads, expansão geográfica e Experimento 1.

## 1. O que foi publicado

| URL | Intenção | Situação | Observação |
| --- | --- | --- | --- |
| `/blog/como-formatar-pc-sem-perder-arquivos` | informacional | reescrita, indexável | rota já existente (era rascunho programático noindex); nenhuma URL nova criada |
| `/blog/quanto-custa-formatar-um-computador` | comercial (custo) | nova, indexável | única URL nova da rodada |
| `/servicos/formatacao` | comercial local | inalterada | recebeu links de saída para os dois guias |
| `/problemas/computador-lento` | diagnóstica | inalterada | ganhou uma ponte contextual para o guia |

Total de artigos editoriais indexáveis: **32** (era 30).

## 2. Decisões de intenção

- Uma intenção por URL. O guia informacional não vende e a página de custo
  não ensina a instalar. A política está declarada em `src/lib/contentIntentMap.ts`,
  que é a fonte única da rodada.
- O rascunho programático homônimo foi **removido** de `src/data/blogProgrammaticPosts.tsx`
  para não existirem duas versões do mesmo slug. A URL é a mesma de antes —
  nenhum redirecionamento foi necessário.
- Nenhuma rota editorial recebeu cidade no slug. A localização continua sendo
  função das páginas locais; o conteúdo faz a ponte por link, não por repetição.

## 3. Preço e veracidade

Todos os valores citados na página comercial vêm de `src/lib/precosConfig.ts`:
visita de inspeção a partir de R$ 99,99 a cada 30 minutos, pacote de até 2 horas
por R$ 279,99 e mínimo pré-aprovado de R$ 299,99 com coleta e entrega inclusas.
Peças, componentes e licenças declarados como não inclusos. Nenhuma média de
mercado, estimativa ou comparação com concorrente foi inventada.

## 4. Imagens

Duas capas novas, ambas **fotografia real licenciada** (sem IA):

- `como-formatar-pc-sem-perder-arquivos` — Hamed Saber, CC BY 2.0 (Wikimedia Commons).
- `quanto-custa-formatar-um-computador` — Airman 1st Class Jordyn Fetter, USAF, domínio público (Wikimedia Commons).

Créditos registrados em `blogEditorialRegistry.ts` e exibidos na página.

## 5. Governança e gates

- Novo gate bloqueante `check:content-intent` (rodando no prebuild e no CI semanal):
  unicidade de intenção, paridade com o registro editorial, existência real das
  pontes no corpo do artigo, proibição de repetir o tutorial na página comercial
  e conferência de todo valor contra a fonte única de preços.
- `check-editorial-governance.mjs` passou a reconhecer qualquer bloco
  `WAVE_XX` automaticamente — não precisa mais ser editado a cada onda.
- Novo relatório `report:content-intent` → `reports/content-intent-8e.md`.

## 6. Verificações executadas

- `npm run build` (prebuild + postbuild completos): verde.
- `check:editorial-governance`: 32 aprovados em paridade, sitemap principal com 142 URLs.
- `check:geo`, `check:internal-links`, `check:cannibalization`, `check:real-images`,
  `check:image-credits`: verdes (avisos pré-existentes mantidos).
- Vitest: 649 testes, 27 arquivos — todos passando.

## 7. Desempenho

Sem evidência de tráfego orgânico para as URLs novas até a primeira coleta no
Search Console após a publicação. Nenhuma projeção foi gerada. A próxima leitura
deve comparar impressões e cliques por URL antes de decidir expandir o cluster.
