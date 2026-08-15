# Rodada 4K — decisão de estratégia: TV, CFTV e celular

Data da decisão: registrada na rodada 4K (malha semântica + PC Gamer).

## Decisão por vertical

| Vertical | Rota canônica | Status de indexação | Justificativa |
| --- | --- | --- | --- |
| TV | `/servicos/conserto-tv` | indexável, no sitemap | Demanda real, conteúdo próprio (bancada, microssolda, escopo de garantia) e provas visuais. |
| TV (rota herdada) | `/servicos/manutencao-tv` | `noindex, follow`, fora do sitemap | Mesma intenção da canônica; mantida viva por SEO evolutivo, mas sem competir. Links internos apontam só para a canônica. |
| Placa / microssolda | `/servicos/conserto-placa` | indexável | Serviço distinto (nível de componente), sustenta TV, monitor e notebook. |
| Monitor | `/servicos/conserto-monitor` | indexável | Rota única já aprovada, com recusa de painel e garantia delimitada. |
| CFTV | `/cftv` | `noindex, follow` | Não há operação declarada nem provas visuais próprias; manter indexável criaria página fina fora do núcleo. |
| Celular | `/servicos/conserto-celular` | `noindex, follow` | Vertical adjacente sem processo próprio documentado; concorre com a autoridade de informática. |
| Áudio | sem rota própria | — | Mantido sem página, conforme política vigente. |

## Regras operacionais

1. Nenhuma página de serviço curada pode linkar para `/servicos/manutencao-tv`,
   `/servicos/conserto-celular` ou `/cftv` — validado pelo gate
   `npm run check:malha-interna`.
2. Buscas internas (`SmartSearch`) e blocos de dor (`PainSection`) apontam para
   as rotas canônicas.
3. Reabrir qualquer vertical `noindex` exige, antes: operação declarada,
   processo próprio documentado e provas visuais reais (sem imagem de IA).

## PC Gamer

`/servicos/pc-gamer` foi criada como página indexável separada de
`/servicos/montagem-de-pc`: a montagem trata de máquina nova; o PC Gamer trata
de desempenho, gargalo térmico e upgrade de máquina existente. As duas se
linkam de forma recíproca (validado pelo gate) e a triagem pré-seleciona
equipamento/sintoma correspondentes.
