## Plano de Execução — Fase Cirúrgica (sem inventar dados)

Sem regressões. Sem números falsos. Mobile-first. Foco em WhatsApp.

### Bloco 1 — Resiliência e Performance (alto ROI, baixo risco)
1. **Fallback estático sem JS** no `index.html`: além do shell pulsante, adicionar `<noscript>` com CTA WhatsApp + texto essencial. Manter o emergency bar atual.
2. **Fontes**: adicionar `font-display: swap` global, `preconnect` para Google Fonts e `preload` para a fonte WOFF2 primária.
3. **Preload crítico**: garantir `preconnect` para WhatsApp/Supabase e `preload as=image` para a logo (já existe — revisar `fetchpriority`).
4. **Web Vitals**: já existe `src/lib/webVitals.ts`. Validar envio de LCP/INP/CLS ao GA4 com `app_version` e logar no console quando `?debug=vitals`.

### Bloco 2 — Cache busting OG/Favicon
5. Bumpar `OG_VERSION` em `src/lib/ogCacheBust.ts` para `20260629-1`.
6. Forçar `?v=20260629-1` no favicon do `index.html` e revalidar paths absolutos do OG (`https://tecnicocuritiba.com.br/og-image.png?v=...`).
7. Garantir `<meta property="og:image:width/height">` presentes.

### Bloco 3 — Consolidação de cidade (Curitiba)
8. **Canônicos**: confirmar canonical `/tecnico-informatica-curitiba` como hub principal de Curitiba; variações (`/arrumar-pc/curitiba`, `/hubs/*-curitiba`) apontam canonical para o hub apropriado quando há sobreposição direta.
9. **Sem redirects destrutivos**: manter URLs vivas, ajustar apenas `<link rel=canonical>` para reduzir canibalização. Documentar em `docs/audit-canonicals.md`.

### Bloco 4 — Blog (CTA + FAQ)
10. Em `src/pages/BlogPost.tsx`: já existe CTA WhatsApp. Adicionar bloco **FAQ contextual** (3-5 perguntas genéricas por categoria) com `FAQPage` JSON-LD por post.
11. Padronizar `click_location="blog_post_cta"` com `app_version` no analytics — já existe, validar.

### Bloco 5 — Tracking padronizado por posição
12. Em todos os CTAs principais, garantir `click_location` consistente: `hero`, `top_banner`, `services`, `social_proof`, `faq`, `final_cta`, `float`, `blog_post_cta`. Auditar e corrigir onde divergir.

### Bloco 6 — Testes E2E
13. `e2e/mobile-ctas.spec.ts`: viewport 390x844, validar visibilidade de "Agendar" e botão WhatsApp clicável na home.
14. Rodar suíte (sanity) localmente — ignorar regressões pré-existentes não relacionadas.

### O que NÃO farei nesta fase
- Não tocarei copy de provas sociais sem dado real.
- Não reescreverei Services/Header (já reestruturados em fases anteriores).
- Não criarei redirects 301 server-side (sem backend de hosting customizável aqui).
- Não inventarei depoimentos, ratings, contadores.

### Detalhes técnicos
- Arquivos tocados (estimado): `index.html`, `src/lib/ogCacheBust.ts`, `src/pages/Index.tsx`, `src/pages/BlogPost.tsx`, `src/lib/webVitals.ts`, novos `e2e/mobile-ctas.spec.ts`, `docs/audit-canonicals.md`, possivelmente `src/components/BlogPostFAQ.tsx`.
- Validação: `npm run build` ao final.

Executando agora.