# Relatório — RODADA 3D (terceira onda editorial)

Data: 2026-08-06 · Domínio: https://tecnico.curitiba.br

## 1. Descoberta de rotas (antes de editar)

| Tema | Rota real encontrada | Decisão |
|---|---|---|
| Redes / Wi-Fi / infraestrutura | `/servicos/redes-e-wifi` | Já existia → aprofundada, canonical preservado |
| Suporte empresarial | `/servicos/suporte-tecnico-empresarial` | Já existia → aprofundada, canonical preservado |
| Hub empresarial | `/empresa-de-ti-curitiba` | Já existia → interlinking e FAQ ampliados |
| Suporte remoto | `/atendimento-remoto` | Existe, apenas linkada (não editada) |
| Manutenção preventiva empresarial | não existia | **Nova rota** `/servicos/manutencao-preventiva-empresas` |
| Backup empresarial | não existia | **Nova rota** `/servicos/backup-para-empresas` |

Total de novas rotas na rodada: **2** (limite respeitado). Nenhuma página de bairro, cidade, marca ou segmento foi criada.

## 2. Páginas trabalhadas (5)

| Página | Palavras no HTML servido | H1 | H2 |
|---|---|---|---|
| `/servicos/redes-e-wifi` | 1164 | 1 | 7 |
| `/servicos/suporte-tecnico-empresarial` | 1005 | 1 | 6 |
| `/servicos/manutencao-preventiva-empresas` | 989 | 1 | 6 |
| `/servicos/backup-para-empresas` | 1087 | 1 | 6 |
| `/empresa-de-ti-curitiba` (hub) | 466 | 1 | 3 |

O hub permanece propositalmente curto: papel de distribuição de autoridade, não de página de execução.

## 3. Diferenciação semântica (anti-canibalização)

- Preventiva = rotina planejada (inventário, inspeção, refrigeração, atualizações, relatório de riscos priorizado).
- Manutenção de computador = reparo corretivo de máquina com defeito.
- Backup = prevenção de perda (cópia local + externa + nuvem, retenção, versionamento, teste de restauração).
- Recuperação de dados = tentativa após a perda, sem resultado assegurado.
- Suporte empresarial = execução de chamados e atendimento contínuo.
- Hub = orientação e roteamento entre os serviços acima.

Matriz registrada em `scripts/check-cannibalization.mjs`. Gate: aprovado (apenas aviso de descrição a 0,50 entre suporte empresarial e hub, abaixo do limite).

## 4. Interlinking

Contrato de saídas obrigatórias implementado no gerador de HTML estático (`SERVICO_LINKS` em `scripts/curated-static-body.mjs`), garantindo os links no HTML servido — não só no React.

- suporte empresarial → hub, preventiva, backup, redes, remoto, preços
- preventiva → suporte, backup, manutenção de computador, hub, como funciona, preços
- backup → recuperação de dados, suporte, preventiva, hub, como funciona, preços
- redes → suporte, hub, preventiva, domicílio, preços, serviços
- hub → suporte, preventiva, backup, redes, remoto, preços

## 5. Limites honestos declarados nas páginas

Sem promessa de: cobertura Wi-Fi perfeita, disponibilidade ininterrupta, zero falhas, proteção absoluta, recuperação assegurada, conformidade automática com a LGPD, armazenamento ilimitado, certificação de cabeamento ou administração corporativa fora do escopo suportado.

## 6. Gates executados

| Gate | Resultado |
|---|---|
| build + prerender (48 rotas curadas) | ✔ |
| check:seo / check:seo:curated | ✔ |
| check:internal-links | ✔ (0 quebrados) |
| check:sitemap-source | ✔ 55 URLs indexáveis |
| check:cannibalization | ✔ |
| check:jsonld-parity | ✔ 316 páginas, 200 FAQ |
| check:jsonld-references | ✔ |
| check:trust-claims | ✔ (após reescrita de 3 claims) |
| check:forbidden-copy | ✔ (após remoção de 1 ocorrência) |
| check:soft404 | ✔ 218 verificações |
| check:orphan-pages | ✔ |
| check:editorial-governance | ✗ falha pré-existente: `sitemap-problemas.xml` contém páginas de problemas (herdada da onda 3C, fora do escopo desta rodada) |

## 7. Correções de copy aplicadas

- "sigilo absoluto" → descrição factual do tratamento de informações.
- "recuperação garantida" (2x) → "resultado assegurado" negado explicitamente.
- "orçamento" → "verba disponível para infraestrutura" (vocabulário oficial: agendar / solicitar atendimento / valor).

## 8. Sitemap

55 URLs indexáveis (era 53). As duas novas rotas entraram via `scripts/lib/curated-urls.mjs`, com `lastmod` derivado do conteúdo.

## 9. Próximo passo

Quarta onda editorial: segurança de dados, suporte remoto, home office e casos técnicos reais — sem escalar páginas locais.
