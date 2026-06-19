# Plano SEO Competitivo — "técnico Curitiba"

Objetivo: ranquear em **TOP 3** do Google para o cluster *técnico de informática Curitiba* e variações geo/serviço em até **6 meses**, superando os 5 maiores concorrentes locais.

---

## 1. Concorrentes-alvo (Curitiba e RMC)

| # | Domínio                          | Força principal                           | Fraqueza explorável                          |
|---|----------------------------------|-------------------------------------------|----------------------------------------------|
| 1 | doutoresdainformatica.com.br     | Autoridade antiga + Google Business       | Conteúdo raso, sem cluster por bairro        |
| 2 | tecnoponta.com.br                | Loja física + reviews                     | Site lento, sem blog ativo                   |
| 3 | meupcnostrinta.com.br            | Marca forte em "formatação"               | Cobertura geo limitada                       |
| 4 | infortec-curitiba.com.br         | Bom para B2B                              | UX ruim mobile, sem schema                   |
| 5 | assistencia-tecnica-curitiba.com | Long-tail agressiva                       | Conteúdo duplicado, EEAT fraco               |

> Validar mensalmente com `semrush--competitive_analysis` e `semrush--compare_domains`.

---

## 2. Clusters de keywords (pillar → cluster → long-tail)

### Pillar A — Técnico de informática Curitiba (transacional)
- técnico de informática curitiba · técnico de computador curitiba · assistência técnica notebook curitiba
- **Long-tail**: técnico de informática a domicílio curitiba · técnico 24h curitiba · técnico de computador urgente curitiba

### Pillar B — Por serviço
- formatação de computador curitiba · remoção de vírus curitiba · upgrade de SSD curitiba · configuração wi-fi/rede curitiba · conserto de placa-mãe curitiba

### Pillar C — Por bairro / cidade RMC
- batel · água verde · cabral · santa felicidade · boqueirão · cic · pinhais · são josé dos pinhais · araucária · colombo · campo largo · campo magro · fazenda rio grande · piraquara · quatro barras · almirante tamandaré

### Pillar D — Por equipamento / marca
- dell · lenovo · acer · samsung · positivo · macbook · gamer · all-in-one

### Pillar E — Informacional (topo de funil para EEAT/AdSense)
- "como saber se a fonte do PC está com defeito" · "pc liga e desliga sozinho" · "tela azul windows 11" · "notebook não carrega"

---

## 3. Estrutura de páginas (arquitetura)

```text
/                                  (home, pillar A)
/servicos                          (hub de serviços)
  /servicos/formatacao             ◀ landing one-page
  /servicos/remocao-virus          ◀ landing one-page
  /servicos/upgrade-ssd-memoria    ◀ landing one-page
  /servicos/redes-wifi             ◀ landing one-page
  /servicos/conserto-placa-mae     ◀ landing one-page
/bairros/<bairro>                  (já existe — expandir 25 → 60)
/tecnico-informatica-<cidade>      (já existe — 10 cidades)
/marcas/<marca>                    (dell, lenovo, acer, samsung, macbook, positivo)
/problemas/<slug>                  (informacional — já existe)
/blog/<slug>                       (EEAT + AdSense)
```

**Interlink obrigatório**: home → 5 serviços → bairros → problemas → blog → CTA WhatsApp.

---

## 4. Roadmap de publicação (12 semanas)

| Semana | Entregável                                                                 |
|--------|-----------------------------------------------------------------------------|
| 1      | 5 landings de serviço (formatação, vírus, upgrade, redes, placa)            |
| 2      | Schema LocalBusiness + Service + FAQPage em todas as landings               |
| 3      | Revisar title/meta/H1/OG das 10 páginas de cidade                           |
| 4      | +15 páginas de bairro (Curitiba)                                            |
| 5      | 5 páginas de marca (Dell, Lenovo, Acer, Samsung, MacBook)                   |
| 6      | 10 posts informacionais (cluster E) com schema Article                      |
| 7      | Otimizar Top Pages do Semrush (CTR + intent match)                          |
| 8      | Link building local — parcerias + Google Business Profile posts semanais    |
| 9      | +10 problemas reais (cluster E) + vídeos curtos                             |
| 10     | Auditoria backlinks (`semrush--backlink_analysis`) + disavow                |
| 11     | +20 bairros RMC + reviews schema                                            |
| 12     | Comparativo Lighthouse + relatório `semrush--seo_trend`                     |

---

## 5. On-page — checklist por página

- [ ] `<title>` ≤ 60 chars, keyword + cidade/bairro + diferencial ("a partir de R$ 99,99")
- [ ] `<meta description>` ≤ 160 chars com CTA ("Atendimento em 30 min · WhatsApp")
- [ ] Único H1 com keyword principal
- [ ] H2/H3 cobrindo intenções relacionadas (preço, prazo, garantia, área atendida)
- [ ] Schema.org: `LocalBusiness` + `Service` + `FAQPage` + `BreadcrumbList`
- [ ] OG/Twitter image dedicada (1200×630)
- [ ] Canonical self-reference
- [ ] CTA WhatsApp acima da dobra (interceptado pelo `WhatsAppFunnel`)
- [ ] Imagem hero com `width`/`height` (CLS = 0)
- [ ] Link interno para 3 páginas correlatas

---

## 6. Schema.org — templates a aplicar

**LocalBusiness** (sitewide, em `index.html` ou layout):

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://tecnicocuritiba.com.br/#business",
  "name": "Técnico Curitiba",
  "image": "https://tecnicocuritiba.com.br/og.jpg",
  "telephone": "+5541999999999",
  "priceRange": "R$ 99,99+",
  "areaServed": ["Curitiba","Pinhais","São José dos Pinhais","Araucária","Colombo","Campo Largo"],
  "address": {"@type":"PostalAddress","addressLocality":"Curitiba","addressRegion":"PR","addressCountry":"BR"},
  "openingHours": "Mo-Sa 08:00-20:00",
  "aggregateRating": {"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"180"}
}
```

**Service** (por landing):

```json
{
  "@context":"https://schema.org","@type":"Service",
  "serviceType":"Formatação de computador",
  "provider":{"@id":"https://tecnicocuritiba.com.br/#business"},
  "areaServed":"Curitiba",
  "offers":{"@type":"Offer","price":"99.99","priceCurrency":"BRL"}
}
```

---

## 7. Landing one-page por serviço — template

```text
Hero        : H1 + sub + CTA WhatsApp + "a partir de R$ 99,99 · 30 min"
Prova       : selo CNPJ + estrelas Google + foto técnico
Como funciona: 3 passos (chama → diagnóstico → conserta)
Preço       : tabela transparente
FAQ         : 6 perguntas (schema FAQPage)
Áreas       : lista de bairros (link)
CTA final   : WhatsApp + ligação fallback (apenas se memory permitir — neste projeto: só WhatsApp)
```

---

## 8. Off-page

1. **Google Business Profile** — 1 post/semana, fotos de antes/depois, responder 100% reviews em < 24h.
2. **Citações locais** — Apontador, Solutudo, GuiaMais, TeleListas (NAP consistente).
3. **Parcerias** — lojas de informática locais, escritórios de contabilidade (B2B), condomínios.
4. **PR digital** — guest posts em portais locais (Bem Paraná, Tribuna).

---

## 9. KPIs e cadência de medição

| Métrica                              | Ferramenta            | Frequência |
|--------------------------------------|-----------------------|------------|
| Posição "técnico curitiba"           | semrush--serp_analysis| Semanal    |
| Tráfego orgânico estimado            | semrush--seo_trend    | Mensal     |
| Top pages                            | semrush--top_pages    | Mensal     |
| Backlinks novos                      | semrush--backlink_analysis | Mensal |
| Conversão WhatsApp                   | Analytics interno     | Semanal    |
| Core Web Vitals                      | Lighthouse + CrUX     | Quinzenal  |

---

## 10. Próximas ações imediatas (prontas para implementação)

1. Criar 5 rotas `/servicos/<slug>` com template landing one-page.
2. Componente `<LocalBusinessSchema />` e `<ServiceSchema service="..." />` reutilizáveis.
3. Hook `useSeo({title, description, canonical, og})` baseado em `react-helmet-async`.
4. Atualizar `scripts/generate-sitemap.ts` com as novas rotas.
5. Rodar `seo_chat--trigger_scan` ao final.
