# Inventário das páginas de serviço (A–E)

Gerado por `npm run inventory:servicos` a partir do build estático. Rotas: **16**.

Distribuição: **A** 16 · **B** 0 · **C** 0 · **D** 0 · **E** 0

| Rota | H1 | Palavras | Similaridade herdada (par) | Intenção | Indexável | Sitemap | Nota |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/servicos/backup-para-empresas` | Backup para Empresas em Curitiba | 1624 | 0.236 (`/servicos/suporte-tecnico-empresarial`) | Comercial B2B | sim | não | **A** |
| `/servicos/conserto-monitor` | Conserto de Monitor em Curitiba | 2629 | 0.32 (`/servicos/conserto-tv`) | Transacional — reparo | sim | não | **A** |
| `/servicos/conserto-placa` | Reparo de Placa Eletrônica em Curitiba | 2343 | 0.304 (`/servicos/conserto-tv`) | Transacional — reparo | sim | não | **A** |
| `/servicos/conserto-tv` | Conserto de TV e Smart TV em Curitiba | 3119 | 0.32 (`/servicos/conserto-monitor`) | Transacional — reparo | sim | não | **A** |
| `/servicos/formatacao` | Formatação de PC e Notebook em Curitiba | 1283 | 0.25 (`/servicos/manutencao-de-computador`) | Transacional — serviço | sim | não | **A** |
| `/servicos/manutencao-de-computador` | Assistência Técnica de Computador em Curitiba | 1252 | 0.305 (`/servicos/manutencao-de-notebook`) | Transacional — serviço | sim | não | **A** |
| `/servicos/manutencao-de-notebook` | Assistência Técnica de Notebook em Curitiba | 1239 | 0.305 (`/servicos/manutencao-de-computador`) | Transacional — serviço | sim | não | **A** |
| `/servicos/manutencao-preventiva-empresas` | Manutenção Preventiva de Computadores em Curitiba | 1443 | 0.257 (`/servicos/suporte-tecnico-empresarial`) | Comercial B2B | sim | não | **A** |
| `/servicos/montagem-de-pc` | Montagem de PC e PC Gamer em Curitiba | 2445 | 0.233 (`/servicos/pc-gamer`) | Comercial — projeto/upgrade | sim | não | **A** |
| `/servicos/pc-gamer` | Manutenção de PC Gamer em Curitiba | 1038 | 0.292 (`/servicos/manutencao-de-computador`) | Comercial — projeto/upgrade | sim | não | **A** |
| `/servicos/recuperacao-de-dados` | Recuperação de Dados em Curitiba | 1078 | 0.238 (`/servicos/manutencao-de-notebook`) | Transacional — serviço | sim | não | **A** |
| `/servicos/redes-e-wifi` | Configuração de Redes e Wi-Fi em Curitiba | 2316 | 0.231 (`/servicos/suporte-tecnico-empresarial`) | Comercial — projeto/upgrade | sim | não | **A** |
| `/servicos/remocao-de-virus` | Remoção de Vírus e Malware em Curitiba | 1398 | 0.228 (`/servicos/suporte-home-office`) | Transacional — serviço | sim | não | **A** |
| `/servicos/suporte-home-office` | Suporte Técnico para Home Office em Curitiba | 1857 | 0.236 (`/servicos/suporte-tecnico-empresarial`) | Comercial B2B | sim | não | **A** |
| `/servicos/suporte-tecnico-empresarial` | Suporte Técnico para Empresas em Curitiba | 1877 | 0.257 (`/servicos/manutencao-preventiva-empresas`) | Comercial B2B | sim | não | **A** |
| `/servicos/upgrade-ssd-ram` | Instalação de SSD e Upgrade de Memória em Curitiba | 1460 | 0.268 (`/servicos/pc-gamer`) | Comercial — projeto/upgrade | sim | não | **A** |

## Critério das notas

- **A** — conteúdo próprio denso (≥ 900 palavras no estático) e similaridade < 0,42.
- **B** — conteúdo próprio com similaridade moderada (0,42–0,49).
- **C** — sobreposição relevante (0,50–0,59): diferenciar blocos comuns.
- **D** — sobreposição alta (≥ 0,60) ou conteúdo raso (< 400 palavras) ainda indexável: risco de canibalização, prioridade de reescrita.
- **E** — `noindex` por decisão editorial (vertical consolidada em outra canônica).

Regra fixa: nenhuma URL é removida. A saída do índice é sempre por `noindex` + retirada do sitemap.
