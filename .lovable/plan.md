
# Plano: Interlinking CFTV, Sitemap e Novas Cidades

## Verificacao Realizada

Todas as paginas estao renderizando corretamente:
- /cftv/guaratuba - Hero, bairros, depoimento e CTA funcionando
- /cftv/litoral - Hero, bairros, depoimento e CTA funcionando  
- /blog - 5 artigos de CFTV aparecendo com categoria e filtros

---

## 1. Links internos entre paginas CFTV e artigos do blog

**No CFTVCityTemplate.tsx** - Adicionar nova secao "Artigos Relacionados" antes do CTA final com links para os 3 artigos de blog mais relevantes sobre CFTV:
- "Camera Wi-Fi ou DVR: Qual Escolher?"
- "Seguranca em Casas de Praia" (para paginas do litoral)
- "Como Escolher o Melhor Kit de Cameras"
- "Monitoramento 24 Horas"

**Na pagina principal /cftv (CFTV.tsx)** - Adicionar secao "Atendemos na Sua Cidade" com links diretos para cada pagina por cidade (/cftv/curitiba, /cftv/sao-jose-dos-pinhais, etc.) e secao de artigos relacionados do blog.

**Nos artigos de blog (BlogPost.tsx)** - Adicionar CTA contextual nos artigos de CFTV linkando para as paginas de servico por cidade mais relevantes.

---

## 2. Novas paginas CFTV por cidade

Criar 3 novas paginas seguindo o CFTVCityTemplate existente:

**CFTVAraucaria.tsx** (/cftv/araucaria)
- Bairros: Centro, Capela Velha, Thomaz Coelho, Iguacu, Cachoeira, Costeira, Vila Nova
- Depoimento contextualizado para comercio/industria

**CFTVCampoLargo.tsx** (/cftv/campo-largo)
- Bairros: Centro, Ferraria, Jardim Guilhermina, Vila Pompeia, Sao Marcos, Rondinha
- Depoimento contextualizado para residencia/chacara

**CFTVPinhais.tsx** (/cftv/pinhais)
- Bairros: Centro, Weissopolis, Pineville, Emiliano Perneta, Palmital, Maria Antonieta
- Depoimento contextualizado para comercio local

Registrar as 3 novas rotas no App.tsx.

---

## 3. Atualizar sitemap.xml

Adicionar todas as URLs novas:

**Paginas CFTV:**
- /cftv (prioridade 0.9)
- /cftv/curitiba (0.8)
- /cftv/sao-jose-dos-pinhais (0.8)
- /cftv/litoral (0.8)
- /cftv/guaratuba (0.8)
- /cftv/araucaria (0.8)
- /cftv/campo-largo (0.8)
- /cftv/pinhais (0.8)

**Artigos CFTV:**
- /blog/diferenca-camera-wifi-dvr-qual-escolher (0.6)
- /blog/seguranca-casas-praia-itapoa-guaratuba (0.6)
- /blog/como-escolher-melhor-kit-cameras-seguranca (0.6)
- /blog/monitoramento-24-horas-como-funciona (0.6)
- /blog/equipe-especializada-cftv-litoral-parana (0.6)
- /blog/windows-11-atualizacao-kb5074105-novidades (0.6)

**Paginas Servico+Bairro:**
- /servicos/formatacao-computador/centro (0.7)
- /servicos/conserto-pc-notebook/batel (0.7)
- /servicos/remocao-virus/portao (0.7)
- /servicos/upgrade-ssd-memoria/santa-felicidade (0.7)
- /servicos/formatacao-computador/sao-jose-dos-pinhais (0.7)
- /servicos/conserto-pc-notebook/cic (0.7)
- /servicos/redes-wifi/araucaria (0.7)

---

## Resumo de arquivos

| Arquivo | Acao |
|---------|------|
| src/pages/cftv/CFTVAraucaria.tsx | Criar |
| src/pages/cftv/CFTVCampoLargo.tsx | Criar |
| src/pages/cftv/CFTVPinhais.tsx | Criar |
| src/pages/cftv/CFTVCityTemplate.tsx | Editar - adicionar secao artigos relacionados |
| src/pages/CFTV.tsx | Editar - adicionar secao cidades e artigos |
| src/pages/BlogPost.tsx | Editar - adicionar CTAs CFTV nos artigos |
| src/App.tsx | Editar - 3 novas rotas |
| public/sitemap.xml | Editar - adicionar todas URLs novas |
