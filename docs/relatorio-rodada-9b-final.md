# Rodada 9B — Fundação Nacional de Autoridade (relatório final)

Data: 2026-08-15

## Escopo entregue

Três pilares nacionais de fundamentos, escritos do zero, com escopo estritamente
nacional (sem localidade), autoria institucional e sem conteúdo de preenchimento.

| URL | Intenção | Palavras úteis | Capa |
| --- | --- | --- | --- |
| `/blog/o-que-e-informatica` | DEFINITION | ~1.812 | foto real CC BY 2.0 |
| `/blog/informatica-basica` | LEARNING | ~2.278 | foto real CC BY 2.0 |
| `/blog/como-aprender-informatica` | COURSE | ~1.950 | foto real CC BY-SA 2.0 |

## Conteúdo

- Resposta curta no topo (candidata a featured snippet) em cada pilar.
- Tabelas comparativas (hardware × software, informática × computação × TI,
  básico × avançado), glossário, roteiro de estudo em 4 fases, checklists de
  competências, mini-exercícios práticos e seções de erros comuns.
- Interlinking completo entre os três pilares e para os guias já existentes
  (Windows 11, Wi-Fi, backup, golpes, computador lento).
- Ponte comercial mantida genérica e fora do corpo editorial.

## FAQ e dados estruturados

As FAQs saíram do corpo do artigo e passaram a viver no componente
`BlogPostFAQ`, com overrides próprios por slug. Isso garante:

- FAQ visível e `FAQPage` sempre idênticos (sem divergência schema × HTML);
- nenhuma pergunta comercial (preço, prazo, localidade) nos pilares nacionais;
- perguntas distintas entre os três artigos, sem canibalização.

## Imagens

Regra 16 respeitada: **zero imagens de IA**. As três capas foram substituídas por
fotografias reais do Wikimedia Commons, recortadas em 1200×630, com licença e
atribuição registradas em `src/lib/blogEditorialRegistry.ts`
(`imageOrigin: "licensed"`).

## Observação (coorte)

`src/lib/nationalFoundationCohort.ts` — coorte `national_foundations_9b` com as
três URLs, veredito por URL e a regra de que **expansão editorial só é liberada
com clique real** registrado no Search Console. Ausência de dado permanece
`UNKNOWN`, nunca "falhou".

## Gate de CI

`npm run check:national-foundation-pillars` valida, por pilar:

1. presença no conteúdo e aprovação no registro editorial;
2. capa licenciada (bloqueia `imageOrigin: "generated"`) com atribuição;
3. existência do arquivo de capa em `public/blog/`;
4. FAQ própria (override não comercial);
5. ausência total de menções a localidades;
6. interlinking obrigatório entre os três pilares;
7. presença na coorte 9B e profundidade mínima de 900 palavras.

Resultado atual: **3/3 conformes, 0 falhas**.

## Não executado (e por quê)

- Sumário (TOC) automático nos artigos longos: fica para a próxima rodada, por
  exigir ajuste de renderização/SSR no template do blog.
- Métricas de descoberta da coorte 9B: dependem do próximo ciclo de coleta do
  Search Console; hoje o estado correto é `UNKNOWN`.
