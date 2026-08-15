# Rodada 9B.1 — Navegabilidade e recuperabilidade dos pilares

Escopo: apenas os três pilares nacionais publicados na Rodada 9B. Nenhuma página
nova, nenhuma mudança de intenção, Rodada 9C segue **bloqueada**.

## O que foi implementado

### 1. Índice do artigo (TOC real, sem JS de estado)
- `src/lib/articleToc.tsx`: percorre a árvore de conteúdo do artigo durante o
  render, extrai `h2`/`h3`, gera IDs estáveis (slug sem acento, com desempate
  numérico em colisão) e injeta `id` + `scroll-mt-28` nos próprios headings.
- `src/components/editorial/ArticleToc.tsx`: `<nav aria-label="Índice do artigo">`
  com `<details>` nativo — recolhível no mobile, sempre aberto no desktop via CSS.
- Renderizado apenas quando o artigo tem **6 ou mais H2** (`shouldRenderToc`),
  então artigos curtos não ganham índice desnecessário.
- Nada de `useEffect`, `useState` ou leitura de DOM: o mesmo HTML sai do SSR e da
  hidratação (verificado sem warnings de hydration no console).

### 2. Âncoras estáveis
- IDs derivados do texto do heading, determinísticos entre build, SSR e cliente.
- `scroll-mt-28` em todos os headings compensa o header fixo: o título nunca fica
  escondido atrás da barra ao abrir um link com hash.
- `scroll-behavior: smooth` já existente respeita `prefers-reduced-motion`.

### 3. Acessibilidade
- Navegação semântica (`nav` + `ol` + `a`), rótulo acessível explícito.
- Foco visível em todos os links do índice (`focus-visible:ring-accent`).
- Contraste dentro dos tokens do design system (sem cores arbitrárias).

### 4. Mobile
- Índice recolhível abaixo de 768px, aberto em desktop.
- Tabelas editoriais passam a rolar horizontalmente em telas ≤640px sem cortar
  conteúdo nem reduzir a fonte a níveis ilegíveis.

### 5. Blog hub
- `/blog` ganhou o bloco **Fundamentos de informática**, apontando para os três
  pilares. O bloco é fail-closed: só aparece para os slugs efetivamente aprovados
  no registro editorial.

### 6. Recuperabilidade por LLMs
- `scripts/generate-llms.mjs` passou a derivar a seção **Guias editoriais** do
  registro editorial (somente `status: "approved"`), com os títulos reais dos
  artigos. Os três pilares agora constam em `public/llms.txt` e `llms-full.txt`
  com URLs corretas — antes o arquivo só listava rotas curadas.

### 7. Testes
- `src/__tests__/article-toc.test.tsx`: IDs estáveis, colisão de títulos,
  determinismo SSR/cliente, limiar de renderização.
- Verificação em navegador a 360/390/430/1280px: índice presente, link do índice
  navega para a âncora correta, zero erro de hidratação.

## Vereditos

1. **A navegação em páginas longas melhorou?** Sim. Os três pilares (1.8k–2.4k
   palavras) passam a expor um índice real com 6+ seções, e cada heading tem
   âncora compartilhável com offset de header correto.
2. **O SSR entrega o índice pronto?** Sim. O HTML do servidor já contém
   `nav[aria-label="Índice do artigo"]`, os links com hash e os `id` nos headings —
   sem JS o índice funciona.
3. **A semântica e a recuperabilidade melhoraram?** Sim. Seções com IDs estáveis
   permitem citação por trecho, e os pilares agora aparecem no `llms.txt` com
   título e URL corretos.
4. **Houve regressão?** Não. Tipagem limpa, gates `check:national-foundation-pillars`
   (3/3) e `check:content-intent` passando; as 4 falhas remanescentes do Vitest são
   pré-existentes no funil de WhatsApp e não têm relação com esta rodada.
5. **Já há clique real no Search Console?** Não. **A Rodada 9C permanece bloqueada**
   até que os pilares registrem clique orgânico verificável no GSC.
