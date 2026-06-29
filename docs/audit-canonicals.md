# Consolidação de Cidade — Canônicos (Curitiba)

Data: 2026-06-29

## Hub principal por cidade

- **Curitiba**: `/tecnico-informatica-curitiba`
- **São José dos Pinhais**: `/tecnico-informatica-sao-jose-pinhais`
- **Pinhais**: `/tecnico-informatica-pinhais`
- **Araucária**: `/tecnico-informatica-araucaria`
- **Campo Largo**: `/tecnico-informatica-campo-largo`
- **Colombo**: `/tecnico-informatica-colombo`
- **Demais cidades**: rota dedicada `/tecnico-informatica-<cidade>`

## Estratégia de Canonical

- Cada hub de cidade é **autocanonical** (canonical aponta para a própria URL).
- Páginas de variação (`/arrumar-pc/curitiba`, `/hubs/<categoria>-curitiba`, `/servico-bairro/...`) mantêm `<link rel="canonical">` para a própria URL, pois cada uma cobre uma **intenção distinta** (problema específico, serviço local, bairro).
- O hub `/tecnico-informatica-curitiba` deve ser o destino de links internos de marca "Curitiba" sem qualificador (footer, breadcrumbs raiz, NAP).

## Sem redirects destrutivos

- Não criar 301 entre variações: cada URL ranqueia para queries diferentes (cauda longa). A consolidação se dá via canonical autoreferenciado + arquitetura de links internos.
- Se uma URL antiga for de fato duplicada (mesmo H1, mesma intent), reapontar canonical para o hub correspondente — só após validação manual.

## Risco de canibalização identificado

| URL A | URL B | Veredito |
|---|---|---|
| `/tecnico-informatica-curitiba` | `/arrumar-pc/curitiba` | OK — intents distintas (técnico vs. "arrumar PC"). Manter canonicals próprios. |
| `/tecnico-informatica-curitiba` | `/assistencia-tecnica-curitiba` | OK — sinônimos. Manter, monitorar GSC. |
| `/cftv/curitiba` | `/tecnico-informatica-curitiba` | OK — nicho específico. |

## Próximos passos manuais

1. Validar no Google Search Console (Cobertura) se há queries onde duas URLs do site competem.
2. Se sim, definir canonical único e adicionar link interno do "perdedor" para o "vencedor".
