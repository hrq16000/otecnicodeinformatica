# Escopo — Terceira onda editorial (Rodada 3D)

Status: planejado (não implementado). Sem novas páginas de bairro ou cidade.

## Princípios da onda

- Foco em intenção **empresarial, preventiva e de proteção de dados** — território onde a
  concorrência local publica apenas texto raso de vitrine.
- Nenhuma rota geográfica nova: a onda reforça o cluster temático, não a matriz local.
- 800–1100 palavras úteis por página, contratos semânticos idênticos aos das ondas 3B/3C
  (H1 único, 4–7 H2, FAQ visível com paridade JSON-LD, CTA central com contexto).
- Sem preço inventado, sem prazo fechado antes de diagnóstico, sem rating/depoimento fabricado.

## Páginas propostas (ordem de execução)

| # | Rota | Intenção alvo | Pilar de destino |
| --- | --- | --- | --- |
| 1 | `/servicos/suporte-tecnico-empresarial` (aprofundar) | suporte de TI recorrente para PME em Curitiba | `/empresa-de-ti-curitiba` |
| 2 | `/manutencao-preventiva` (aprofundar ou criar conforme rota vigente) | rotina preventiva, limpeza, checkup periódico | `/servicos` |
| 3 | `/servicos/backup-e-protecao-de-dados` (nova) | backup, cópia externa, nuvem, continuidade | `/servicos/recuperacao-de-dados` |
| 4 | `/problemas/computador-com-virus` (nova, sintoma) | infecção, lentidão por malware, sequestro de arquivos | `/servicos/remocao-de-virus` |

## Contrato de conteúdo por página

1. Definição do problema/necessidade em linguagem do cliente (sem jargão).
2. Cenários concretos — quando o serviço se aplica e quando não se aplica.
3. Etapas do atendimento com critérios objetivos (processo, tempo estimado, garantia de 90 dias sobre mão de obra).
4. Limites declarados: o que não é prometido.
5. Interlinking obrigatório: 1 link para o pilar, 2 para serviços correlatos, 1 para `/precos-e-politicas`.
6. FAQ visível com 8–10 perguntas, espelhada em `FAQPage`.
7. CTA único de triagem via WhatsApp, com contexto da página.

## Gates de liberação

- `check:jsonld-parity`, `check:cannibalization`, `check:index-health`, `check:priority-urls`, `smoke:edge`.
- Word count validado antes do merge; entrada em `scripts/lib/lastmod.mjs` e no sitemap curado.
- Inclusão no monitoramento: `scripts/lib/priority-urls.mjs` (grupo próprio da onda).

## Riscos

- Canibalização entre `/servicos/suporte-tecnico-empresarial` e `/empresa-de-ti-curitiba`
  (o gate já acusa proximidade de 0,50 na description) — resolver diferenciando ângulo:
  pilar = empresa/contrato, serviço = execução pontual.
- `/servicos/backup-e-protecao-de-dados` precisa se separar claramente de
  `/servicos/recuperacao-de-dados`: prevenção × perda já ocorrida.
