# Rodada 3B — Primeira onda editorial controlada

Data: 06/08/2026 · Escopo: conteúdo, interlinking e paridade estática. Nenhuma
alteração de infraestrutura, roteamento de borda, sitemap manual ou tracking.

## 1. Entregas

| URL | Situação | Palavras no HTML servido |
| --- | --- | --- |
| `/servicos/manutencao-de-notebook` | aprofundada | 907 |
| `/servicos/manutencao-de-computador` | aprofundada | 846 |
| `/servicos/formatacao` | aprofundada | 856 |
| `/como-funciona` | aprofundada | 509 |
| `/problemas/notebook-nao-liga` | **nova rota** | 808 |

O DOM hidratado das páginas de serviço e do piloto de sintoma é maior que o HTML
inicial (blocos visuais, CTAs e componentes). A tabela mede apenas o HTML servido,
que é o pior caso para rastreamento.

## 2. Diferenciação semântica (anticanibalização)

- **Manutenção de notebook** — falha física e térmica do equipamento portátil:
  aquecimento, tela, teclado, bateria, conector de energia, dobradiça.
- **Manutenção de computador** — desktop e o que depende de montagem, fonte,
  refrigeração, armazenamento e periféricos.
- **Formatação** — camada de software: sistema corrompido, infecção persistente,
  reinstalação limpa, preservação de arquivos e licença. Explicita que nem todo
  computador lento precisa de formatação.
- **Notebook não liga** — intenção de sintoma, não de serviço. Separa "não liga"
  de "liga sem imagem", lista verificações seguras e encaminha para o serviço
  correspondente após o diagnóstico.

Gate `check:cannibalization`: nenhuma canibalização entre as P0 (um aviso
informativo de similaridade de description entre suporte empresarial e o hub de
TI, pré-existente e fora do escopo desta rodada).

## 3. Interlinking

- `/servicos` passa a ter entrada explícita para o piloto de sintoma.
- `/como-funciona` recebeu bloco final com preços e políticas, FAQ, contato,
  serviços e as três páginas aprofundadas + o piloto.
- As três páginas de serviço se referenciam entre si e agora incluem
  recuperação de dados no bloco de relacionados da formatação.
- O piloto aponta para manutenção de notebook, diagnóstico técnico, coleta e
  entrega e preços e políticas.

Gate `check:internal-links`: 340 destinos internos, nenhum link quebrado.

## 4. Paridade HTML × DOM

`scripts/curated-static-body.mjs` passou a renderizar blocos de conteúdo
(`blocos`) no corpo estático. Para as páginas de serviço os blocos são lidos
diretamente de `src/lib/servicosCore.ts` via `scripts/lib/servico-blocos.mjs`
(fonte única, sem duplicação manual). O piloto e `/como-funciona` declaram os
blocos no espelho curado.

## 5. Vocabulário e conformidade

- Termo "orçamento" eliminado das páginas desta rodada em favor de "valor"
  (gate `check:forbidden-copy` verde).
- Sem promessa de prazo fixo, sem preço inventado, sem avaliação ou depoimento.
- Contato exclusivamente por WhatsApp; nenhum telefone visível.

## 6. Gates executados

`build` + `postbuild` (seo-check curated, jsonld-refs, route-manifest, soft-404),
`check:sitemap-source`, `check:internal-links`, `check:cannibalization`,
`check:jsonld-parity`, `check:trust-claims`, `check:forbidden-copy`,
`check:recurring-language`, `validate:jsonld`, `vitest` (73 testes). Todos verdes.

## 7. Próxima onda sugerida

Sintomas de maior volume comercial, um por vez, com o mesmo contrato:
`pc-nao-liga`, `notebook-desliga-sozinho`, `tela-azul`, `computador-muito-lento`.
