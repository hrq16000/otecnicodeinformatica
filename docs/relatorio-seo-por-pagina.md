# Relatório SEO por página — rotas curadas

Gerado automaticamente por `scripts/report-seo-por-pagina.mjs` a partir do HTML servido em `dist/`.
Base: https://otecnicodeinformatica.com.br — 82 rotas curadas.

## Checklist de gates

| Gate | Comando |
| --- | --- |
| SEO básico das rotas curadas | `bun scripts/check-seo-basics.ts --curated dist` |
| Referências e unicidade de JSON-LD | `node scripts/check-jsonld-references.mjs dist` |
| Malha semântica de links internos | `node scripts/check-malha-interna.mjs` |
| Links internos e sitemap | `node scripts/check-internal-links.mjs` |
| Canibalização P0 | `node scripts/check-cannibalization.mjs` |
| Similaridade programática | `node scripts/check-programmatic-similarity.mjs` |
| Ficha comercial dos serviços | `node scripts/check-ficha-comercial.mjs` |
| Soft-404 e aliases | `node scripts/check-soft-404.mjs` |
| Sitemap de imagens | `node scripts/check-image-sitemap.mjs dist` |
| Isolamento de marca | `npm run check:brand-isolation` |

## Páginas

| Rota | Title (nº car.) | H1 | Desc. | Robots | Schemas | Links curados | Sitemap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | O Técnico de Informática \| Assistência Técnica e Suporte Local (62) | O Técnico de Informática — Assistência Técnica e Suporte Local | 147 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 5 | sim |
| `/servicos` | Serviços de Informática em Curitiba \| PC e Notebook (51) | Serviços de Informática em Curitiba | 137 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 9 | sim |
| `/como-funciona` | Como Funciona o Atendimento \| O Técnico de Informática (54) | Como Funciona o Atendimento | 198 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 5 | sim |
| `/precos-e-politicas` | Preços e Políticas \| O Técnico de Informática (45) | Preços e Políticas — O Técnico de Informática | 161 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 5 | sim |
| `/sobre` | Sobre O Técnico de Informática \| PC, Notebook e Redes (53) | Sobre O Técnico de Informática | 164 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 5 | sim |
| `/contato` | Contato \| O Técnico de Informática \| Atendimento a partir de R$ 99,99 (69) | Contato — O Técnico de Informática \| Atendimento a partir de R$ 99,99 | 140 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 5 | sim |
| `/faq` | FAQ O Técnico de Informática \| Preço, Prazo e Garantia (54) | FAQ O Técnico de Informática | 134 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 5 | sim |
| `/anuncie` | Anuncie e Patrocine \| Mídia Kit do Técnico de Informática (57) | Anuncie e Patrocine — Mídia Kit do Técnico de Informática | 156 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/atendimento-domicilio` | Atendimento de Informática em Domicílio em Curitiba (51) | Atendimento de Informática em Domicílio em Curitiba | 163 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/atendimento-remoto` | Atendimento Remoto de Informática em Curitiba (45) | Atendimento Remoto de Informática em Curitiba | 140 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/equipamentos-atendidos` | Equipamentos Atendidos \| O Técnico de Informática (49) | Equipamentos Atendidos — O Técnico de Informática | 145 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 10 | sim |
| `/areas-atendidas` | Áreas Atendidas em Curitiba e Região \| Bairros e Cidades (56) | Áreas Atendidas em Curitiba e Região | 143 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/diagnostico-tecnico` | Diagnóstico Técnico de Computador e Notebook em Curitiba (56) | Diagnóstico Técnico de Computador e Notebook em Curitiba | 125 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/coleta-e-entrega` | Coleta e Entrega de Computador e Notebook em Curitiba (53) | Coleta e Entrega de Computador e Notebook em Curitiba | 126 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/quando-nao-compensa` | Quando NÃO Compensa Reparar \| Guia Técnico - Curitiba (53) | Quando NÃO Compensa Reparar | 163 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/seguranca-dos-dados` | Segurança dos Dados na Assistência Técnica \| Curitiba (53) | Segurança dos Dados na Assistência Técnica | 150 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 9 | sim |
| `/politica-de-pecas-do-cliente` | Política de Peças do Cliente \| Montagem em Curitiba (51) | Política de Peças do Cliente | 135 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/empresa-de-ti-curitiba` | Empresa de TI em Curitiba \| Soluções para Pequenas Empresas (59) | Empresa de TI em Curitiba — Soluções para Pequenas Empresas | 141 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/guia-tecnico-informatica` | Guia Técnico: Manutenção de PC e Notebook Passo a Passo (55) | Guia técnico de informática: manutenção de PC e notebook | 133 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 9 | sim |
| `/servicos/formatacao` | Formatação de PC e Notebook em Curitiba \| Windows (49) | Formatação de PC e Notebook em Curitiba | 161 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 9 | sim |
| `/servicos/manutencao-de-notebook` | Assistência Técnica de Notebook em Curitiba \| Diagnóstico (57) | Assistência Técnica de Notebook em Curitiba | 126 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/servicos/manutencao-de-computador` | Assistência Técnica de Computador em Curitiba \| PC (50) | Assistência Técnica de Computador em Curitiba | 111 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 7 | sim |
| `/servicos/upgrade-ssd-ram` | Instalação de SSD e Upgrade de Memória em Curitiba (50) | Instalação de SSD e Upgrade de Memória em Curitiba | 158 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 10 | sim |
| `/servicos/remocao-de-virus` | Remoção de Vírus e Malware em Curitiba \| PC e Notebook (54) | Remoção de Vírus e Malware em Curitiba | 163 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 10 | sim |
| `/servicos/recuperacao-de-dados` | Recuperação de Dados em Curitiba \| HD, SSD e Pendrive (53) | Recuperação de Dados em Curitiba | 116 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 10 | sim |
| `/servicos/redes-e-wifi` | Configuração de Redes e Wi-Fi em Curitiba \| Roteadores (54) | Configuração de Redes e Wi-Fi em Curitiba | 153 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 10 | sim |
| `/servicos/suporte-tecnico-empresarial` | Suporte Técnico para Empresas em Curitiba \| Informática (55) | Suporte Técnico para Empresas em Curitiba | 146 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 9 | sim |
| `/servicos/manutencao-preventiva-empresas` | Manutenção Preventiva de Computadores em Curitiba \| Empresas (60) | Manutenção Preventiva de Computadores em Curitiba | 148 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 9 | sim |
| `/servicos/backup-para-empresas` | Backup para Empresas em Curitiba \| Proteção de Arquivos (55) | Backup para Empresas em Curitiba | 146 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 9 | sim |
| `/servicos/suporte-home-office` | Suporte Técnico para Home Office em Curitiba (44) | Suporte Técnico para Home Office em Curitiba | 129 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 9 | sim |
| `/servicos/montagem-de-pc` | Montagem de PC e PC Gamer em Curitiba \| Testes Inclusos (55) | Montagem de PC e PC Gamer em Curitiba | 127 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 9 | sim |
| `/servicos/pc-gamer` | Manutenção de PC Gamer em Curitiba \| Desempenho e Upgrade (57) | Manutenção de PC Gamer em Curitiba | 169 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 9 | sim |
| `/servicos/conserto-tv` | Conserto de TV e Smart TV em Curitiba \| Bancada e Coleta (56) | Conserto de TV e Smart TV em Curitiba | 132 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 9 | sim |
| `/servicos/conserto-placa` | Reparo de Placa Eletrônica em Curitiba \| Nível de Componente (60) | Reparo de Placa Eletrônica em Curitiba | 157 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 9 | sim |
| `/servicos/conserto-monitor` | Conserto de Monitor em Curitiba \| Bancada, Coleta e Entrega (59) | Conserto de Monitor em Curitiba | 178 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 9 | sim |
| `/servicos/formatacao-computador/cic` | Formatação de Computador — CIC, Curitiba (40) | Formatação de Computador e Notebook no CIC | 154 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/servicos/formatacao-computador/batel` | Formatação de Computador — Batel, Curitiba (42) | Formatação de Computador e Notebook no Batel | 156 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/servicos/formatacao-computador/agua-verde` | Formatação de Computador — Água Verde, Curitiba (47) | Formatação de Computador e Notebook no Água Verde | 161 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/servicos/remocao-virus/cic` | Remoção de Vírus e Malware — CIC, Curitiba (42) | Remoção de Vírus e Malware no CIC | 156 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/servicos/remocao-virus/agua-verde` | Remoção de Vírus e Malware — Água Verde, Curitiba (49) | Remoção de Vírus e Malware no Água Verde | 163 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/servicos/conserto-pc-notebook/centro` | Conserto de PC e Notebook — Centro de Curitiba (46) | Conserto de PC e Notebook no Centro de Curitiba | 170 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/servicos/conserto-pc-notebook/agua-verde` | Conserto de PC e Notebook — Água Verde, Curitiba (48) | Conserto de PC e Notebook no Água Verde | 162 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/servicos/upgrade-ssd-memoria/cic` | Upgrade de SSD e Memória — CIC, Curitiba (40) | Upgrade de SSD e Memória RAM no CIC | 154 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/servicos/upgrade-ssd-memoria/centro` | Upgrade de SSD e Memória — Centro de Curitiba (45) | Upgrade de SSD e Memória RAM no Centro de Curitiba | 169 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/servicos/upgrade-ssd-memoria/agua-verde` | Upgrade de SSD e Memória — Água Verde, Curitiba (47) | Upgrade de SSD e Memória RAM no Água Verde | 161 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/servicos/upgrade-ssd-memoria/portao` | Upgrade de SSD e Memória — Portão, Curitiba (43) | Upgrade de SSD e Memória RAM no Portão | 157 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/tecnico-informatica-curitiba` | Técnico de Informática em Curitiba \| PC e Notebook (50) | Técnico de Informática em Curitiba | 135 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 9 | sim |
| `/tecnico-informatica-sao-jose-pinhais` | Técnico em São José dos Pinhais para Notebook e PC (50) | Técnico em São José dos Pinhais para Notebook e PC | 130 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/tecnico-informatica-pinhais` | Técnico em Pinhais para Notebook, PC e Redes (44) | Técnico em Pinhais para Notebook, PC e Redes | 136 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/tecnico-informatica-colombo` | Técnico em Colombo para Notebook, PC e Informática (50) | Técnico em Colombo para Notebook, PC e Informática | 136 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/tecnico-informatica-araucaria` | Técnico em Araucária para Notebook, PC e Empresas (49) | Técnico em Araucária para Notebook, PC e Empresas | 120 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/tecnico-informatica-campo-largo` | Técnico em Campo Largo para Notebook, PC e Redes (48) | Técnico em Campo Largo para Notebook, PC e Redes | 140 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/bairros/cic` | Técnico de Informática no CIC (Curitiba) \| Notebook e PC (56) | Técnico de Informática no CIC (Curitiba) | 158 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/bairros/batel` | Técnico de Informática no Batel (Curitiba) \| Notebook e PC (58) | Técnico de Informática no Batel (Curitiba) | 167 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/bairros/agua-verde` | Técnico de Informática no Água Verde \| Notebook e PC (52) | Técnico de Informática no Água Verde | 158 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/bairros/centro` | Técnico de Informática no Centro de Curitiba \| Notebook e PC (60) | Técnico de Informática no Centro de Curitiba | 132 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/bairros/portao` | Técnico de Informática no Portão (Curitiba) \| Notebook e PC (59) | Técnico de Informática no Portão (Curitiba) | 120 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/problemas/notebook-nao-liga` | Notebook Não Liga? Assistência Técnica em Curitiba (50) | Notebook não liga: o que pode estar acontecendo e como é feito o diagnóstico | 155 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 8 | sim |
| `/problemas/computador-lento` | Computador Lento? Diagnóstico \| O Técnico de Informática (56) | Computador lento: sintomas, causas possíveis e o que realmente resolve | 129 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 10 | sim |
| `/problemas` | Problemas comuns de computador, rede e dados \| O Técnico de Informática (71) | Comece pelo que está acontecendo | 173 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/problemas/wifi-instavel` | Wi-Fi caindo ou lento: causas e o que checar \| O Técnico de Informática (71) | Wi-Fi caindo ou lento em parte da casa ou do escritório | 164 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 7 | sim |
| `/problemas/tela-azul` | Tela azul no Windows: causas, o que anotar e como resolver \| O Técnico de Informática (85) | Tela azul no Windows: o que o erro está dizendo | 166 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 7 | sim |
| `/problemas/arquivos-apagados` | Arquivos apagados ou HD que não abre: primeiros passos \| O Técnico de Informática (81) | Arquivos apagados ou disco que não abre: o que fazer agora | 171 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 7 | sim |
| `/equipamentos` | Equipamentos atendidos: notebook, PC, impressora e roteador \| O Técnico de Informática (86) | Escolha o equipamento e veja o que costuma acontecer | 167 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/equipamentos/notebook` | Notebook com problema: sintomas e reparos \| O Técnico de Informática (68) | Notebook: sintomas mais comuns e como cada um é resolvido | 154 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/equipamentos/desktop` | Desktop com problema: falhas e upgrades \| O Técnico de Informática (66) | Desktop e PC: falhas frequentes, upgrades e o que checar | 155 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/equipamentos/impressora` | Impressora com problema: instalação e rede \| O Técnico de Informática (69) | Impressora: instalação, rede e falhas que travam o trabalho | 148 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/equipamentos/roteador` | Roteador e Wi-Fi: cobertura e quedas \| O Técnico de Informática (63) | Roteador e rede Wi-Fi: cobertura, quedas e configuração | 155 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/solucoes` | Soluções técnicas: diagnóstico, formatação, SSD, backup e dados \| O Técnico de Informática (90) | Escolha o procedimento e veja como ele é executado | 166 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/solucoes/diagnostico` | Diagnóstico técnico de computador e notebook \| O Técnico de Informática (71) | Diagnóstico técnico: descobrir a causa antes de trocar qualquer peça | 165 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/solucoes/formatacao` | Formatação e reinstalação de Windows com backup \| O Técnico de Informática (74) | Formatação e reinstalação de sistema sem perder o que importa | 172 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/solucoes/ssd` | Instalação e troca de SSD com clonagem \| O Técnico de Informática (65) | Troca por SSD: o upgrade que realmente muda o tempo de resposta | 161 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/solucoes/backup` | Backup de arquivos e rotina de cópia segura \| O Técnico de Informática (70) | Backup: cópia conferida, não pasta copiada às pressas | 157 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/solucoes/recuperacao-de-dados` | Recuperação de dados de HD, SSD e pen drive \| O Técnico de Informática (70) | Recuperação de dados: o que dá para salvar e o que não dá | 162 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | — | 6 | sim |
| `/blog` | Guias de Informática \| O Técnico de Informática (47) | Guias de Informática | 122 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | CollectionPage | 12 | sim |
| `/blog/quando-trocar-hd-por-ssd` | Vale a pena trocar o HD por SSD? Como avaliar o upgrade (55) | Vale a pena trocar o HD por SSD? Como avaliar o upgrade | 95 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | Article, BlogPosting, BreadcrumbList, TechArticle | 9 | sim |
| `/blog/como-saber-se-pc-tem-virus-malware` | Como saber se o computador está com vírus ou malware (52) | Como saber se o computador está com vírus ou malware | 99 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | Article, BlogPosting, BreadcrumbList, TechArticle | 9 | sim |
| `/blog/backup-como-proteger-seus-arquivos` | Como evitar perder arquivos: guia de backup preventivo (54) | Como evitar perder arquivos: guia de backup preventivo | 103 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | Article, BlogPosting, BreadcrumbList, TechArticle | 9 | sim |
| `/blog/como-melhorar-sinal-wifi-em-casa` | Wi-Fi caindo ou com sinal fraco: como diagnosticar (50) | Wi-Fi caindo ou com sinal fraco: como diagnosticar | 120 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | Article, BlogPosting, BreadcrumbList, TechArticle | 9 | sim |
| `/blog/notebook-superaquecendo-o-que-fazer` | Notebook superaquecendo: sinais, prevenção e o que fazer (56) | Notebook superaquecendo: sinais, prevenção e o que fazer | 158 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | Article, BlogPosting, BreadcrumbList, TechArticle | 9 | sim |
| `/blog/organizacao-de-ti-para-pequenos-escritorios` | Organização de TI para pequenos escritórios: o guia prático (59) | Organização de TI para pequenos escritórios: o guia prático | 150 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | Article, BlogPosting, BreadcrumbList, TechArticle | 9 | sim |
| `/blog/como-escolher-uma-workstation` | Como escolher uma workstation: checklist de requisitos (54) | Como escolher uma workstation: checklist de requisitos | 110 | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 | Article, BlogPosting, BreadcrumbList, TechArticle | 9 | sim |

## Alertas

- Nenhum alerta: todas as rotas curadas passaram nas verificações do relatório.
