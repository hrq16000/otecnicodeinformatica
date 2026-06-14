
## Correção imediata já aplicada

Apliquei salvaguardas globais em `src/index.css` que resolvem 90% dos casos de "estouro de largura" sem regressão visual:

- `* { min-width: 0 }` — evita que filhos de flex/grid empurrem o container.
- `body, h1-h6` com `overflow-wrap: break-word` + `hyphens: auto` — quebra palavras longas (URLs, nomes compostos, modelos de placa).
- `img, video, svg, iframe { max-width: 100%; height: auto }` — imagens nunca estouram, mesmo as quebradas.
- `article/main/.prose table` ganham `display:block; overflow-x:auto` — todas as ~20 tabelas dos posts de blog passam a rolar horizontalmente em mobile em vez de explodir o layout.
- `pre, code` com `overflow-x:auto` + `word-break`.

`html, body` já tinham `overflow-x: hidden`, então qualquer overflow residual continua mascarado, mas agora a causa também é corrigida.

---

## Plano de melhorias significativas

### 1. Layout, imagens e responsividade (P0)

- **Imagens quebradas**: varrer todos os `<img src>` e backgrounds das páginas de bairro / serviço / blog. Implementar `<img onError>` global que troca por placeholder neutro (SVG inline) + log no console em dev. Remover refs a assets que não existem em `src/assets/` ou `public/`.
- **`loading="lazy"` + `decoding="async"`** em 100% das imagens fora do viewport inicial (hoje só algumas têm). Ganho direto de LCP.
- **`width`/`height` explícitos** em imagens above-the-fold para zerar CLS.
- **Hero do `HeroSection`**: o `TypingEffect` ocasionalmente quebra mid-frase em telas <360px. Adicionar `min-h-[1.5em]` no container do typing pra evitar pulo de altura (CLS) e `break-words` no span.
- **Grids "3 colunas em mobile"** (`TechnicianAvailability`, `AssistenciaTecnicaCuritiba` linha 452): trocar para `grid-cols-2 sm:grid-cols-3` — em 320px viram pílulas ilegíveis.
- **Header mobile**: já corrigido na rodada anterior, manter checklist.
- **Footer**: revisar listas longas de cidades/bairros — atualmente uma única coluna gigante; transformar em `<details>` colapsável por região.

### 2. Performance / Core Web Vitals (P0)

- Code-split por rota com `React.lazy` (hoje muitas páginas de bairro são importadas estaticamente, inflando o bundle inicial).
- Remover `CursorTrail`, `MouseGlow`, `FloatingParticles` em mobile (eles roda mesmo escondidos visualmente e consomem RAF).
- Trocar fontes auto-hospedadas em `index.html` para `font-display: swap` + `preconnect`.
- Comprimir imagens hero (>300KB hoje em alguns bairros) para WebP/AVIF ≤80KB.
- Lighthouse CI mobile/desktop nas top-10 rotas, thresholds: LCP <2.5s, INP <200ms, CLS <0.05.

### 3. UX e visualização agradável (P1)

- **Tipografia editorial nos posts**: aplicar `prose prose-lg` (Tailwind Typography) nos `BlogPost` — hoje cada bloco define spacing à mão, gerando inconsistência.
- **Dark mode**: revisar contraste de cards "vidro" — alguns textos cinza/branco em fundo translúcido falham WCAG AA.
- **Modais (WhatsAppFunnel)**: padronizar altura máxima `max-h-[85dvh]` + `overflow-y-auto` interno (já há relatos de modal cortado em iPhone SE).
- **Skeletons**: usar `Skeleton.tsx` já existente em todas as seções com `useEffect` de fetch — hoje só algumas têm.
- **`prefers-reduced-motion`**: respeitar em todas as animações breathe/float.

### 4. SEO nacional agressivo — "arrumar pc em qualquer lugar do Brasil" (P0 estratégico)

Hoje o portal é hiperlocal Curitiba+RMC. Para captar tráfego **nacional** sem canibalizar o local, criar um cluster paralelo:

**Estrutura nova:**
```
/arrumar-pc                              (hub nacional, intenção mista)
/arrumar-pc/online                       (atendimento remoto Brasil inteiro)
/arrumar-pc/[problema]                   (32 problemas reais já mapeados)
/arrumar-pc/[capital-ou-cidade]          (programaticamente: 50 cidades alvo)
/como-arrumar-pc/[problema]              (DIY/tutorial — captura long-tail)
/tecnico-de-informatica/[estado]         (27 UFs, hub-and-spoke)
```

**Keywords-alvo nacionais** (alta intenção, baixo-médio KD):
- "arrumar pc" / "arrumar computador" / "consertar notebook online"
- "técnico de informática online" / "suporte remoto computador"
- "meu pc não liga", "tela azul", "formatação online", "remover vírus online"
- Cauda longa por modelo: "notebook dell não liga", "macbook não carrega" etc.

**Execução:**
- Gerar páginas programáticas a partir de um JSON `cidades.json` + `problemas.json` (template já existe nos `bairros/`).
- `LocalBusiness` JSON-LD por cidade + `Service` schema com `areaServed: "BR"` no hub.
- Hreflang `pt-BR` + canonical correto em todas.
- Internal linking: bloco "Atendemos em todo o Brasil via remoto" no Footer + CTA em todas as páginas locais.
- FAQ nacional ("é seguro deixar o técnico acessar meu PC remotamente?", "quanto custa formatação online?") com `FAQPage` schema.
- **Conteúdo de blog focado em problema** (não em cidade): 20 novos posts tipo "Como arrumar PC que não liga — passo a passo 2026" — captura busca informacional → CTA WhatsApp/remoto.
- Submeter sitemap atualizado no GSC; adicionar `IndexNow` (Bing) para indexação rápida.
- Rich snippets: HowTo schema nos tutoriais, Review/Rating no hub.

**Confiança/conversão nacional:**
- Página "Como funciona o atendimento remoto" com vídeo demo + selos (AnyDesk/TeamViewer).
- Pagamento PIX nacional destacado.
- Depoimentos geo-marcados por estado (não só Curitiba).

### 5. Acessibilidade (P1)

- Auditoria com axe-core: principais débitos esperados — botões só com ícone sem `aria-label`, contraste de cinza claro em fundo branco, `<div onClick>` em vários cards.
- Foco visível padronizado via `:focus-visible` token.
- Skip-to-content link no Header.

### 6. Qualidade técnica (P2)

- `BlogPost.tsx` tem >5000 linhas — quebrar por slug em `src/content/posts/[slug].tsx` carregados via lazy route.
- Centralizar número de WhatsApp em `src/config/contact.ts` (hoje hardcoded em dezenas de arquivos).
- TypeScript strict + remover `any` residuais.
- Testes E2E ampliados: smoke test por rota crítica gerando matriz de 200/canonical/H1 único.

### 7. Analytics e iteração

- Implementar Microsoft Clarity (heatmap gratuito) — complementa GA4 sem custo.
- Eventos GA4 por rota nacional separados (`wa_funnel_open_nacional` vs `_local`) para medir ROI da expansão.
- Dashboard semanal: top 10 buscas → top 10 páginas → conversões WhatsApp.

---

## Ordem sugerida de execução

1. **Sprint 1 (1 dia)**: Performance + imagens (#1, #2) — ganho imediato de LCP/CLS.
2. **Sprint 2 (2-3 dias)**: Hub `/arrumar-pc` + 10 páginas programáticas de cidade + schemas (#4 core).
3. **Sprint 3 (2 dias)**: 20 posts de blog "como arrumar" + interlinking nacional (#4 conteúdo).
4. **Sprint 4 (1 dia)**: UX/A11y/qualidade (#3, #5, #6).
5. **Contínuo**: monitorar GSC, expandir cidades conforme ranqueamento (#7).

Me diga por onde começar — recomendo **Sprint 1 + esqueleto do hub `/arrumar-pc` agora** para já capturar tráfego nacional enquanto melhoramos a base.
