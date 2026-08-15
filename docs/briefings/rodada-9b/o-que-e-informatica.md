# Briefing Editorial — Rodada 9B

## O que é informática?

**URL:** `/blog/o-que-e-informatica`  
**Canonical:** `https://otecnicodeinformatica.com.br/blog/o-que-e-informatica`  
**H1:** O que é informática?  
**Meta title:** O que é Informática? Definição Completa em Português | O Técnico de Informática  
**Meta description:** Entenda o que é informática, para que serve, onde é aplicada e qual a diferença entre informática, computação e TI. Guia nacional em português.

---

## Intenção

- **Principal:** DEFINITION
- **Secundária:** LEARNING
- **Escopo:** NATIONAL_INFORMATIONAL
- **Tipo de conteúdo:** Artigo pilar (pillar page)
- **Owner:** `/blog/o-que-e-informatica`

---

## Público-alvo

- Brasileiros que pesquisam o significado de informática.
- Estudantes de cursos técnicos, concursos ou ensino médio.
- Iniciantes em tecnologia que querem uma base antes de aprender prática.

---

## Perguntas que a página deve responder

1. O que é informática?
2. O que significa informática?
3. O que a informática estuda?
4. Para que serve a informática?
5. Onde a informática é aplicada?
6. Qual a diferença entre informática, computação e TI?
7. Informática é ciência?
8. Quando surgiu a informática?
9. Informática é exatas?

---

## Estrutura sugerida

### 1. Resposta curta (40-60 palavras)
Logo após o H1, uma definição direta que possa ser usada como featured snippet.

### 2. Explicação completa
- Origem da palavra (informação + automática).
- Definição formal e atual.
- O que a informática abrange (hardware, software, redes, dados).

### 3. Áreas da informática
Lista com breve explicação de cada uma:
- Hardware
- Software
- Redes e internet
- Banco de dados
- Segurança da informação
- Inteligência artificial
- Desenvolvimento de sistemas

### 4. Informática vs Computação vs TI
Tabela comparativa simples.

### 5. Onde a informática é aplicada
Exemplos: empresas, educação, saúde, governo, casa.

### 6. Informática é exatas?
Explicação objetiva: envolve lógica, matemática e resolução de problemas, mas não é apenas números.

### 7. História resumida
Linha do tempo curta: ábaco, computadores mecânicos, computadores eletrônicos, era pessoal, internet, computação em nuvem.

### 8. FAQ
- Informática e computação são a mesma coisa?
- Quem trabalha com informática faz o quê?
- Informática básica ensina o quê?

### 9. Links relacionados
- [Informática básica](/blog/informatica-basica)
- [Como aprender informática](/blog/como-aprender-informatica)
- [Computador lento: causas e soluções](/blog/computador-lento-causas-solucoes)
- [O que é memória RAM?](/blog/o-que-e-memoria-ram) *(futuro)*

---

## Entidades principais

- Informática
- Computação
- Tecnologia da informação (TI)
- Hardware
- Software
- Rede de computadores
- Internet
- Dados

---

## Links internos obrigatórios

- `/blog/informatica-basica`
- `/blog/como-aprender-informatica`
- `/blog/computador-lento-causas-solucoes`
- `/blog/como-melhorar-sinal-wifi-em-casa`
- `/blog/como-instalar-windows-11-do-zero`

---

## Fontes e referências

- UNESCO — definição de informática na educação
- Ministério da Educação (MEC) — referências curriculares
- IEEE Computer Society
- Microsoft — glossário de computação
- Wikipédia (em português) — como ponto de partida, não como fonte final

---

## Tom de voz

- Direto, didático e acessível.
- Sem jargão desnecessário. Quando usar termo técnico, explique.
- Autoria institucional: "O Técnico de Informática".
- Não usar superlativos como "maior referência" ou "líder nacional".

---

## Regras de separação nacional × local

- **NÃO mencionar** Curitiba, São José dos Pinhais, Paraná ou qualquer localidade.
- **NÃO** transformar o artigo em página de venda de serviço.
- A ponte comercial, se existir, fica em um boxe curto no final: "Se precisar de atendimento técnico em Curitiba ou região, veja nossos serviços."

---

## Requisitos técnicos

- Schema: `TechArticle` + `BreadcrumbList` + `FAQPage` (se houver FAQ visível)
- Canonical: self-canonical
- Index: yes
- Incluir no `sitemap-editorial.xml`
- Adicionar ao registro editorial (`src/lib/blogEditorialRegistry.ts`)
- Atualizar `llms.txt` e `llms-full.txt` com a nova URL

---

## Critérios de aprovação

- [ ] Responde diretamente "o que é informática" no início.
- [ ] Cobre as 9 perguntas listadas.
- [ ] Contém tabela comparativa informática/computação/TI.
- [ ] Possui FAQ real (mínimo 3 itens).
- [ ] Links internos para os outros 2 pilares da 9B.
- [ ] Zero menções a localidades.
- [ ] Schema implementado corretamente.
- [ ] Revisado por gate `check:national-authority-map`.

---

## Notas

- Este é o primeiro pilar de fundamentos. Ele deve ser a página mais genérica e abrangente sobre o tema.
- Palavras-chave seed: "o que é informática", "o que significa informática", "o que informática estuda", "informática é ciência".
- Volume estimado seed: ~5.400 para "o que é informática".
