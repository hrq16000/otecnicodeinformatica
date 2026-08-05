# Rodada 4D — SEO local de bairros e cidades

Data: 2026-08-05 · Branch base: `24f0aeda` (`git status --short` limpo antes da rodada)

## 1. Inventário local (deduplicado)

| Item | Quantidade | Observação |
|---|---|---|
| Componentes em `src/pages/bairros/` | 222 | maioria podada (noindex / fora do sitemap) |
| Bairros com dados curados (`src/lib/bairrosData.ts`) | 5 | CIC, Batel, Água Verde, Centro, Portão |
| Bairros no `sitemap-bairros.xml` | 5 | idênticos aos curados |
| Cidades com dados curados (`src/lib/cidadesData.ts`) | 6 | Curitiba, SJP, Pinhais, Colombo, Araucária, Campo Largo |
| Cidades no `sitemap-regioes.xml` | 6 | idênticas às curadas |
| Serviço+bairro Wi-Fi/TV indexáveis | 13 → **11** | Ecoville e Alto da XV demovidos nesta rodada |
| Rotas canônicas no router | 375 | |
| Rotas de redirect (`<Navigate>`) | 22 | nenhuma no sitemap |
| Rotas com `PageSEO noindex` | 15 | inclui Fazenda Rio Grande |

Verificação por rota (title, description, canonical, H1, robots, links para a
página-mãe, contagem de palavras) executada em navegador — resultados na secção 9.

## 2. Hierarquia local formalizada

- **Página-mãe:** `/tecnico-informatica-curitiba` — única dona da intenção genérica
  "técnico de informática Curitiba".
- **Bairros (`/bairros/<slug>`):** intenção hiperlocal (atendimento no bairro,
  modalidades, logística, serviços prioritários). Sempre linkam para a página-mãe.
- **Cidades (`/tecnico-informatica-<cidade>`):** cobertura, modalidades e limites
  fora de Curitiba.
- **Serviços (`/servicos/<slug>`):** dominantes para a intenção técnica específica.
- **Empresarial:** `/empresa-de-ti-curitiba` e `/servicos/suporte-tecnico-empresarial`.

## 3. Matriz de dominância

| Consulta | Localidade | URL dominante | Concorrentes internas | Decisão |
|---|---|---|---|---|
| técnico de informática Curitiba | Curitiba | `/tecnico-informatica-curitiba` | home, `/servicos` | mantida; home passou a linkar para a página-mãe |
| técnico no Batel | Batel | `/bairros/batel` | serviço+bairro Wi-Fi/TV | bairro domina |
| técnico no Água Verde | Água Verde | `/bairros/agua-verde` | serviço+bairro | bairro domina |
| técnico no Centro | Centro | `/bairros/centro` | serviço+bairro | bairro domina |
| técnico no Portão | Portão | `/bairros/portao` | serviço+bairro | bairro domina |
| técnico na CIC | CIC | `/bairros/cic` | serviço+bairro | bairro domina |
| técnico em São José dos Pinhais | SJP | `/tecnico-informatica-sao-jose-pinhais` | serviço+cidade | cidade domina |
| técnico em Pinhais | Pinhais | `/tecnico-informatica-pinhais` | serviço+cidade | cidade domina |
| técnico em Colombo | Colombo | `/tecnico-informatica-colombo` | — | cidade domina |
| técnico em Araucária | Araucária | `/tecnico-informatica-araucaria` | — | cidade domina |
| técnico em Fazenda Rio Grande | FRG | `/tecnico-informatica-fazenda-rio-grande` | — | **noindex** (secção 5) |
| atendimento domiciliar + localidade | Curitiba/RMC | `/atendimento-domicilio` | bairros/cidades | modalidade domina |
| conserto de notebook + localidade | Curitiba | `/servicos/manutencao-de-notebook` | serviço+bairro | serviço domina |
| suporte empresarial + localidade | Curitiba | `/servicos/suporte-tecnico-empresarial` | `/empresa-de-ti-curitiba` | serviço para a intenção técnica, hub para a institucional |

Nenhuma consulta tem duas URLs declaradas dominantes.

## 4. Bairros-âncora

Os cinco bairros já possuíam conteúdo próprio produzido em rodada anterior
(introdução, operação local, atendimento local, coleta/bancada, serviços
prioritários e FAQ distintos). Auditoria confirmou: 733–784 palavras cada,
H1 único, canonical self-referente, três links para a página-mãe e CTA com
bairro preservado. **Nenhuma reescrita foi necessária e nenhuma página nova foi criada.**

### Bairros mantidos fora do índice
As demais 217 páginas de bairro seguem `noindex` e fora do sitemap.
Classificação: A (manter noindex) para a grande maioria; B (aprofundar
futuramente) para a fila abaixo; nenhuma remoção de rota nesta rodada.

### Fila futura (máx. 10 candidatos)
Bigorrilho, Cabral, Santa Felicidade, Boa Vista, Jardim das Américas, Rebouças,
Cristo Rei, Cajuru, Campo Comprido, Boqueirão — a promover só com operação
confirmada, conteúdo próprio e links contextuais.

## 5. Cidades

- **São José dos Pinhais, Pinhais, Colombo, Araucária, Campo Largo:** presentes em
  `siteConfig.serviceArea` (operação declarada), conteúdo próprio de 895–966
  palavras, canonical self-referente, sem cópia de Curitiba. **Mantidas indexáveis.**
- **Fazenda Rio Grande:** **não promovida.** A cidade não consta de
  `siteConfig.serviceArea`, portanto não há operação documentada no projeto.
  A página permanece `noindex, follow` e fora do sitemap. Nesta rodada a copy foi
  saneada: removidas as afirmações de "40 a 60 minutos de deslocamento",
  "atendemos todos os bairros" e o encaixe prioritário no mesmo dia.
  Registrado como **decisão operacional pendente** — promover apenas mediante
  confirmação de atendimento real.

## 6. Interlinking implementado

- **Home** → página-mãe, dois bairros-âncora e duas cidades, em bloco controlado
  ("Cobertura local") dentro da seção distribuidora de autoridade.
- **Página-mãe Curitiba** → nova seção "Atendimento por bairro e nas cidades
  vizinhas": 5 bairros-âncora + 5 cidades indexáveis, com anchors variadas.
- **Bairro** → página-mãe, serviços prioritários, atendimento domiciliar e
  preços (já existente no `BairroLocalLayout`).
- **Cidade** → serviços P0, suporte empresarial, atendimento domiciliar e página-mãe.

Nenhum rodapé com lista massiva de bairros; nenhum link para rota de redirect ou noindex.

## 7. Anchors

Fórmula "Técnico de Informática em X" abandonada nos blocos locais. Em uso:
"Atendimento técnico no Batel", "Suporte de informática no Água Verde",
"Técnico para computador no Centro", "Assistência em informática no Portão",
"Atendimento na CIC (Cidade Industrial)", "Suporte técnico em São José dos
Pinhais", "Manutenção de computador em Pinhais", "Atendimento de informática em
Colombo", "Assistência técnica em Araucária", "Técnico para notebook em Campo Largo".
O gate falha se >50% das anchors locais de um arquivo usarem a fórmula genérica.

## 8. Correções de conformidade

- Removidas **16 promessas de "atendimento no mesmo dia"** em
  `src/pages/servico-bairro/wifiTvBairroData.ts` (afetavam subtítulo e FAQ gerados).
- Ecoville e Alto da XV: `indexable: false` — indexáveis porém órfãos (zero links
  internos) e fora do sitemap; não cumpriam o princípio de indexação.
- Fazenda Rio Grande: copy saneada (ver secção 5).

## 9. Gates e validações

| Comando | Resultado |
|---|---|
| `npx tsgo --noEmit` | ✔ |
| `check:orphan-pages` | ✔ |
| `check:cannibalization` | ✔ 10 páginas P0 |
| `check:bairro-copy` | ✔ 11 bairros indexáveis |
| `check:internal-links` | ✔ 346 destinos, 0 quebrados |
| `check:cta-funnel` | ✔ |
| `check:recurring-language` | ✔ |
| `check:aggregate-rating` | ✔ 519 arquivos, nenhum rating |
| **`check:local-hierarchy` (novo)** | ✔ |
| `check:nap -- --confirm=…` | ✖ pré-existente: falhas apenas no domínio legado `tecnicocuritiba.com.br` (fora do nosso controle) |
| `check:jsonld-refs` | parcial — exige `dist/` gerado |

### Novo gate: `npm run check:local-hierarchy`
Falha quando: URL noindex ou de redirect entra no sitemap; URL do sitemap não tem
componente canônico; duas páginas locais compartilham title ou description;
bairro/cidade disputa a intenção genérica da página-mãe; anchor repetida para
destinos diferentes; excesso de anchors formulaicas; link local aponta para
redirect ou noindex; `BairroLocalLayout` deixa de referenciar a página-mãe.

## 10. Inspeção em navegador (desktop 1280px)

Todas as 11 rotas locais renderizaram sem `pageerror`, com H1 único, canonical
self-referente e robots coerente:

- `/tecnico-informatica-curitiba` — 1623 palavras, index
- `/bairros/{cic,batel,agua-verde,centro,portao}` — 733–784 palavras, index, 3 links para a página-mãe
- `/tecnico-informatica-{sao-jose-pinhais,pinhais,colombo,araucaria}` — 895–966 palavras, index
- `/tecnico-informatica-fazenda-rio-grande` — 1145 palavras, **noindex, follow**

## 11. Sitemap — antes e depois

| | Antes | Depois | Motivo |
|---|---|---|---|
| Bairros | 5 | 5 | sem expansão; âncoras mantidas |
| Cidades | 6 | 6 | todas com operação declarada |
| URLs adicionadas | — | 0 | nenhuma promoção aprovada |
| URLs removidas | — | 0 | nenhuma âncora perdeu os critérios |

Fazenda Rio Grande permanece ausente. Nenhuma URL noindex, redirect ou alias no sitemap.

## 12. Confirmações

Sem expansão em massa · sem endereço, filial ou geo fictício · sem
`LocalBusiness` por bairro · sem rating, review, SLA ou depoimento inventado ·
sem alteração de preços, funil PF/PJ, banco ou dashboard · sem migration ·
sem publicação de redirects · sem alteração de DNS.

## 13. Riscos remanescentes

1. `check:nap` continua vermelho por conta do domínio legado — depende de acesso
   à hospedagem antiga.
2. `verify:cf:strict` segue bloqueado (0/41) por falta de `CLOUDFLARE_API_TOKEN`.
3. 217 páginas de bairro noindex continuam no código; custo de manutenção.
4. Fazenda Rio Grande retém sinal orgânico histórico que não será capturado
   enquanto a operação não for confirmada.

## 14. Próximo passo recomendado

Confirmar operacionalmente Fazenda Rio Grande (e, se positivo, promovê-la com
`serviceArea` atualizada) antes de iniciar a Rodada 4E (autoridade e E-E-A-T).
