# Rodada 8B — Discovery, Edge 404 e contato canônico

## 1. Resumo executivo

Três frentes atacadas: descoberta interna do cluster `/problemas`, unificação do
contato oficial e refatoração da busca da Home. Nenhuma cidade, bairro ou página
nova foi criada. Nenhum parâmetro de CRO foi alterado.

## 2. Contato oficial

- Número canônico: **5541997086380** — formato humano `(41) 99708-6380`.
- Fonte única: `VITE_WHATSAPP_NUMBER` (.env) → `src/lib/config/contact.ts`
  (`whatsappLink()`, `WHATSAPP_PHONE_E164`). Nenhum URL wa.me hardcoded.
- `scripts/lib/migration-critical.mjs`: `OFFICIAL_WA = 5541997086380`,
  `LEGACY_WA = 5541997452053`.
- E2E atualizados (`mobile-ctas`, `smoke-buttons`, `whatsapp-funnel`,
  `localbusiness-jsonld`, `assistencia-tecnica-curitiba`).

### Inventário de telefones

`reports/contact-number-inventory.md` (gerado). Resultado atual: **0 números
literais divergentes** em `src/`, `public/` e `index.html`.

### Gate novo

`npm run check:canonical-contact` — reprova o build se qualquer superfície de
produção contiver `wa.me`, `tel:` ou `"telephone"` com dígitos diferentes do
número oficial. JSON-LD (Organization/LocalBusiness/ContactPoint) deriva do
mesmo helper, portanto está coberto.

## 3. Busca da Home ("Diagnosticar meu problema")

- Novo módulo `src/lib/buscaInteligente.ts`: normalização, dicionário de
  sinônimos/gírias, casamento por frase/token/prefixo, Levenshtein tolerante a
  erro de digitação e desempate por peso de frequência real.
- O botão passou a ser o **submit real** da caixa de pesquisa: interpreta o
  texto digitado e navega para o cluster correto; sem confiança mínima cai em
  `/diagnostico-tecnico` (nunca rota inexistente).
- Evento `home_busca_sintoma` com `intencao` e `confianca` (sem PII).
- 6 testes unitários novos (`buscaInteligente.test.ts`).

## 4. Discovery do cluster /problemas

`/problemas/computador-lento` já recebia links de `clusterProblemas`,
`clusterSolucoes`, `clusterEquipamentos` e dos chips da Home. O que faltava era
um caminho a partir de página **já indexada**.

Adicionado em `/tecnico-informatica-curitiba` (única URL confirmada como
indexada no GSC) um bloco contextual "Sintomas que mais chegam à bancada" com
anchors descritivos e variados para:

| Destino | Anchor |
| --- | --- |
| `/problemas/computador-lento` | quando a máquina demora para abrir tudo |
| `/problemas/notebook-nao-liga` | notebook sem reação ao apertar o botão |
| `/problemas/tela-azul` | erros e telas azuis que reiniciam o Windows |
| `/problemas/wifi-instavel` | internet que cai em parte do imóvel |

Sem link artificial em massa (A4) e sem alterar canonical, intent ou schema (A9).
Click depth de `/problemas/computador-lento` a partir de página indexada: **1**.

## 5. HTTP 404 na borda

`cloudflare/worker.js` + `dist/route-manifest.json` já implementam a decisão
correta (asset → rota válida → alias 301 → 404 real), sem heurística por
prefixo. Publicação depende do secret `CLOUDFLARE_API_TOKEN` no workflow
`cloudflare-edge.yml`.

Estado: **READY_TO_DEPLOY** — não foi publicado nesta rodada.

## 6. Testes

- Vitest: **636 testes verdes** (26 arquivos).
- `check:canonical-contact`: verde (0 violações).

## 7. Vereditos

1. `/problemas/computador-lento` tem caminhos internos suficientes? **SIM**
   (Home + hubs + página indexada de Curitiba, profundidade 1).
2. Rotas inexistentes retornam 404 real em produção? **NÃO — EDGE AINDA
   PENDENTE** (worker pronto, falta publicação com credencial).
3. Todas as superfícies públicas usam 5541997086380? **SIM**.
4. A mensuração distingue aquisição, tráfego interno e QA? **SIM** (canal
   `internal` da Rodada 8A preservado).
5. Bloqueio técnico relevante ao crescimento orgânico? **NÃO** — a variável
   principal agora é tempo/discovery/autoridade; o único P0 aberto é o 404 real
   na borda.

## 8. Pendências

- 🔴 P0 — publicar o worker de borda (404 real) quando o token estiver disponível.
- 🟠 P1 — matriz `reports/problem-discovery-coverage.*` com status real do GSC.
- 🟡 P2 — expansão editorial dos bairros citados na Home.
- 🟢 P3 — painel `/admin` com alerta visual por família de URL (service_city,
  neighborhood, problem).
