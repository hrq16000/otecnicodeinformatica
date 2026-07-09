# Política de Poda de Bairros — tecnico.curitiba.br

Objetivo: eliminar *thin content* e canibalização entre as ~230 páginas de bairro
herdadas do remix, mantendo apenas um conjunto enxuto de **bairros-âncora reais**
de Curitiba com demanda de busca e conteúdo distinto.

## Regra quantitativa

- **Máximo de 12 bairros-âncora indexáveis** (apenas Curitiba capital).
- Todo o restante das páginas de bairro permanece `noindex` e **fora do sitemap**
  (estado atual: `BairroTemplate` já aplica `noindex`; `sitemap-bairros.xml` vazio).
- **Não** criar páginas por bairro para cidades da região metropolitana. Essas
  cidades usam somente a página dedicada `/tecnico-informatica-<cidade>`
  (Curitiba, São José dos Pinhais, Pinhais, Colombo, Araucária, Campo Largo,
  Almirante Tamandaré, Fazenda Rio Grande, Piraquara, Campo Magro, Quatro Barras).

## Lista de bairros-âncora (12) — Curitiba

Selecionados por demanda comercial real + densidade populacional + distinção de conteúdo:

1. Centro
2. Batel
3. Água Verde
4. Portão
5. Bigorrilho
6. Cabral
7. Santa Felicidade
8. Boa Vista
9. Cristo Rei
10. Cajuru
11. Boqueirão
12. CIC (Cidade Industrial de Curitiba)

## Critérios para um bairro entrar/sair da lista-âncora

Só é elegível a indexação quando cumpre TODOS:
- Conteúdo único (não é template preenchido por variáveis) com ≥ 300 palavras próprias.
- Sem `aggregateRating`/reviews fictícios (regra de integridade de schema).
- Canonical/@id consistentes com `https://tecnico.curitiba.br`.
- Sem sobreposição de intenção com outra página-âncora (evita canibalização).

Se um bairro não cumprir os critérios, permanece `noindex` e fora do sitemap —
não é excluído (SEO evolutivo: não removemos URLs existentes).

## Estado atual

- Páginas de bairro herdadas: `noindex` ativo, ausentes do sitemap.
- `sitemap-bairros.xml`: vazio (apenas `<urlset>`).
- Promoção de um bairro a âncora exige reescrita de conteúdo antes de remover o
  `noindex` e incluir no sitemap.
