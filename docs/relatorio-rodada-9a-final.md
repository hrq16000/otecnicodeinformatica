# Relatório Final — Rodada 9A: Arquitetura Nacional de Autoridade

**Projeto:** otecnicodeinformatica.com.br — O Técnico de Informática
**Data:** 2026-08-15T01:43:57.221Z
**Objetivo:** separar camada editorial nacional da camada comercial local e preparar os primeiros pilares nacionais.

---

## 1. Estado editorial atual

- **Total de posts em src/data/blogPostsContent.tsx:** 141 manuais + 19 programáticos = **160**.
- **Hub editorial:** /blog
- **Aprovados para indexação (registro editorial):** 32
- **No sitemap editorial:** 33 URLs (incluindo /blog)
- **Posts programáticos:** 19 (todos sem categoria; atualmente noindex por padrão)

## 2. Quantidade real de conteúdo existente

- **Fundamentos:** 3 artigo(s) aprovado(s)
- **Hardware:** 8 artigo(s) aprovado(s)
- **Windows:** 5 artigo(s) aprovado(s)
- **Manutenção/Notebook:** 5 artigo(s) aprovado(s)
- **Redes/Wi-Fi:** 4 artigo(s) aprovado(s)
- **Segurança:** 4 artigo(s) aprovado(s)
- **Backup/Dados:** 3 artigo(s) aprovado(s)
- **Empresas:** 1 artigo(s) aprovado(s)
- **Impressora:** 1 artigo(s) aprovado(s)
- **Comercial híbrido:** 1 artigo(s) aprovado(s)

## 3. Famílias atuais

As famílias já cobertas por conteúdo aprovado são: Hardware, Windows, Manutenção/Notebook, Redes/Wi-Fi, Segurança, Backup/Dados, Empresas e Impressora.
A família **Fundamentos** (o que é informática, informática básica, como aprender) **não possui owner aprovado**.

## 4. AnswerThePublic — seeds utilizados

Termos identificados nos anexos e usados como seed para o mapa:

| Termo / família | Volume (quando disponível) | Intenção |
|---|---|---|
| informática básica | ~12.100 | DEFINITION/LEARNING |
| informática básica curso | ~5.400 | LEARNING/COURSE |
| informática básica para concurso | ~590 | LEARNING/COURSE |
| o que é informática | ~5.400 | DEFINITION |
| o que significa informática | ~390 | DEFINITION |
| o que é informática para internet | ~140 | DEFINITION |
| como aprender informática | UNKNOWN | LEARNING |
| como aprender informática em casa | UNKNOWN | LEARNING |
| informática para iniciantes | UNKNOWN | LEARNING |
| informática para idosos | UNKNOWN | LEARNING |
| informática para concurso | UNKNOWN | LEARNING/COURSE |

## 5. Taxonomia nacional

Raiz: **Informática**.
Primeiro nível: Fundamentos, Informática básica, Aprender informática, Hardware, Software, Sistemas operacionais, Internet e redes, Segurança digital, Dados e backup, Manutenção e diagnóstico, Empresas, Carreira e formação, Glossário.

Fonte: `config/national-authority-map.json`.

## 6. Intents

Modelo adaptado: DEFINITION, LEARNING, HOW_TO, DIAGNOSTIC, COMPARISON, REFERENCE, CAREER, COURSE, COMMERCIAL, LOCAL_COMMERCIAL.

## 7. Owner URL por intenção

| Tópico | Intenção | Owner URL | Decisão | Status |
|---|---|---|---|---|
| o-que-e-informatica | DEFINITION | A definir | NEW_CONTENT | candidate |
| informatica-basica | DEFINITION/LEARNING | A definir | NEW_CONTENT | candidate |
| como-aprender-informatica | LEARNING | A definir | NEW_CONTENT | candidate |
| computador-lento-causas-solucoes | DIAGNOSTIC/HOW_TO | /blog/computador-lento-causas-solucoes | EXISTING_OWNER | approved |
| como-melhorar-sinal-wifi-em-casa | HOW_TO | /blog/como-melhorar-sinal-wifi-em-casa | EXISTING_OWNER | approved |
| quando-trocar-hd-por-ssd | COMPARISON | /blog/quando-trocar-hd-por-ssd | EXISTING_OWNER | approved |
| backup-como-proteger-seus-arquivos | HOW_TO | /blog/backup-como-proteger-seus-arquivos | EXISTING_OWNER | approved |
| como-saber-se-pc-tem-virus-malware | DIAGNOSTIC | /blog/como-saber-se-pc-tem-virus-malware | EXISTING_OWNER | approved |
| notebook-superaquecendo-o-que-fazer | DIAGNOSTIC/HOW_TO | /blog/notebook-superaquecendo-o-que-fazer | EXISTING_OWNER | approved |

## 8. Conteúdo existente aproveitável

Os 32 artigos aprovados cobrem bem as intenções HOW_TO, DIAGNOSTIC e COMPARISON nas áreas técnicas. Podem servir de base para links internos dos novos pilares de fundamentos.

## 9. Conteúdo que precisa ser expandido

- /blog/computador-lento-causas-solucoes: pode receber definição de "computador lento" como entidade e linkar para /problemas/computador-lento.
- /blog/como-melhorar-sinal-wifi-em-casa: já é nacional; cluster /problemas/wifi-instavel deve linkar para cá.

## 10. Conteúdo novo justificável

Três pilares candidatos para Rodada 9B:

1. **/blog/o-que-e-informatica** — intenção DEFINITION; nenhum owner atual.
2. **/blog/informatica-basica** — intenção DEFINITION/LEARNING; volume identificado.
3. **/blog/como-aprender-informatica** — intenção LEARNING; família de perguntas identificadas.

## 11. Conteúdo que NÃO deve virar página

- Variações como "o que é informática básica", "o que informática ensina", "para que serve informática básica" devem pertencer ao pilar /blog/informatica-basica, não a URLs separadas.
- Cidades, bairros e marcas sem relação editorial real: OFF_SCOPE.
- Posts programáticos duplicados (como-saber-se-pc-tem-virus, como-clonar-hd-para-ssd-passo-a-passo, como-instalar-windows-11-do-zero-2026) devem ser consolidados ou removidos, não indexados.

## 12. Canibalização

- **Não há canibalização estrutural** entre /blog e /problemas.
- Existem 109 pares com termos compartilhados, mas as intenções são distintas: /problemas = diagnóstico local; /blog = informacional nacional.
- Decisão: **BRIDGE** — linkar mutuamente como aprofundamento, não competir.

## 13. Nacional × local

| Camada | Exemplo | Escopo |
|---|---|---|
| Nacional editorial | /blog/o-que-e-informatica | NATIONAL_INFORMATIONAL |
| Nacional editorial | /blog/como-melhorar-sinal-wifi-em-casa | NATIONAL_INFORMATIONAL |
| Local comercial | /problemas/wifi-instavel | LOCAL_COMMERCIAL |
| Local comercial | /servicos/redes-e-wifi/curitiba | LOCAL_COMMERCIAL |

## 14. Hub editorial

**Decisão: /blog continua sendo o hub editorial nacional.**
Não há justificativa para criar /guias ou /aprender separado. /blog já é o hub existente, com rota, página e sitemap próprios.

## 15. Programmatic content

- 19 posts programáticos em `src/data/blogProgrammaticPosts.tsx`.
- Risco: **MÉDIO**. Vários repetem temas dos aprovados (HD→SSD, Windows 11, vírus).
- Recomendação: manter noindex até revisão; consolidar duplicatas; não gerar novos em massa.

## 16. Autoria

- Autoria institucional: **O Técnico de Informática**.
- Não há pessoas fictícias.
- Schema emite `author` e `publisher` como Organization.
- Revisão técnica por pessoa real só deve ser declarada quando existir.

## 17. Fontes/referências

Política para Rodada 9B:
- Priorizar fontes primárias: Microsoft, Apple, Google, Mozilla, NIST, CERT.br, fabricantes.
- Distinguir orientação técnica baseada em prática de fato externo documentado.
- Não inventar estatísticas.

## 18. Schema

- Posts aprovados: `BlogPosting` + `Article` + `TechArticle`, BreadcrumbList.
- Posts não aprovados: `WebPage` apenas.
- FAQPage só quando houver FAQ visível real.
- Não há uso de `Service` em páginas educacionais.

## 19. Sitemap

- `sitemap-index.xml` referencia 8 sitemaps.
- `sitemap-editorial.xml` contém 33 URLs.
- **Problema:** 7 URLs do sitemap editorial não estão no registro de aprovação atual:
  - quando-trocar-hd-por-ssd
  - como-saber-se-pc-tem-virus-malware
  - backup-como-proteger-seus-arquivos
  - como-melhorar-sinal-wifi-em-casa
  - notebook-superaquecendo-o-que-fazer
  - organizacao-de-ti-para-pequenos-escritorios
  - como-escolher-uma-workstation

  Esses slugs estão em `FIRST_WAVE_SLUGS` mas aparentemente foram removidos do array de aprovação ativa. Isso precisa ser corrigido na Rodada 9B (reaprovar ou remover do sitemap).

## 20. llms.txt

- Está 100% focado em atendimento local (Curitiba/RM).
- Não menciona /blog nem conteúdo editorial nacional.
- Não faz claims exagerados ("maior referência", "líder nacional").
- Inclui sitemap e link para llms-full.txt.

## 21. llms-full.txt

- Versão completa, também local-comercial.
- Zero links para /blog/.
- Precisa ser expandido na Rodada 9B com seção "Conteúdo educacional" apontando para os pilares nacionais.

## 22. robots/crawlers

- `robots.txt` permite os principais crawlers (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Applebot, etc.).
- Bloqueia apenas /admin, /debug/, /status-os, /funil-indisponivel.
- Páginas editoriais nacionais não estão bloqueadas.

## 23. Gate nacional

Criado `scripts/check-national-authority-map.mjs` e script `npm run check:national-authority-map`.
Valida: IDs únicos, parents válidos, owner nacional não apontar para rota local, NEW_CONTENT com sourceRequirements, EXISTING_OWNER com ownerUrl.

## 24. Build

A ser verificado.

## 25. Testes

A ser verificado.

## 26. Três páginas da próxima rodada

1. **/blog/o-que-e-informatica** — DEFINITION — resposta direta + explicação completa.
2. **/blog/informatica-basica** — DEFINITION/LEARNING — pilar para variações de "informática básica".
3. **/blog/como-aprender-informatica** — LEARNING — caminho de estudo para iniciantes.

---

## Veredictos

### Veredicto 1 — A arquitetura atual suporta expansão nacional sem misturar autoridade editorial com atendimento comercial local?
**SIM, COM AJUSTES.** O mecanismo de separação já existe (/blog vs /problemas, /servicos, /bairros), mas `llms.txt`/`llms-full.txt` precisam refletir a camada editorial e o sitemap editorial precisa estar alinhado com o registro de aprovação.

### Veredicto 2 — Existe canibalização estrutural a corrigir ANTES dos novos pilares?
**NÃO.** Não há canibalização direta; há overlap semântico saudável que deve ser tratado como ponte.

### Veredicto 3 — Qual hub deve ser o centro da autoridade editorial?
**/blog**. Já é o hub real do projeto; não criar /guias ou /aprender.

### Veredicto 4 — Quais são exatamente as 3 URLs autorizadas para o primeiro lote de conteúdo nacional profundo?
1. `https://otecnicodeinformatica.com.br/blog/o-que-e-informatica`
2. `https://otecnicodeinformatica.com.br/blog/informatica-basica`
3. `https://otecnicodeinformatica.com.br/blog/como-aprender-informatica`

### Veredicto 5 — `llms.txt` e `llms-full.txt` representam corretamente a diferença entre autoridade editorial nacional e operação comercial local?
**NÃO — CORRIGIR.** Ambos estão 100% local-comerciais. Na Rodada 9B devem incluir uma seção clara sobre conteúdo educacional nacional e as 3 URLs de pilares, sem alterar a precisão das informações locais.
