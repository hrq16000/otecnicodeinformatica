# Rodada 4E.2 — Correção de transparência da telemetria first-party

Data: 2026-08-08 · Escopo: banner + política de privacidade + testes
Regra: ZERO alteração em tracking, banco, funil, RLS, Consent Mode ou baseline.

## 1. Resumo
As divergências factuais apontadas na 4E.1 entre implementação, banner e política
pública foram corrigidas **apenas em texto**. Nenhum arquivo de tracking, migração,
policy de banco ou componente do funil foi modificado.

## 2. Git inicial
`git status --short` e `git diff --stat` sem saída (working tree gerenciado pela
plataforma). Arquivos efetivamente tocados nesta rodada estão no item 19.

## 3. Banner — antes/depois
- **Antes:** "Usamos cookies de análise e de anúncios. Registros técnicos próprios
  (sem cookies e sem dados pessoais) continuam ativos para o funcionamento do site."
  → não explicava que existe medição first-party do funil independente dos cookies.
- **Depois:** "Usamos **cookies opcionais** de análise e anúncios. Mesmo sem
  aceitá-los, o site registra diretamente dados técnicos mínimos das interações no
  funil de atendimento para medir etapas e conversões, sem armazenar IP, nome,
  telefone ou texto livre."
- Botões mantidos: Recusar · Só análise · Aceitar tudo.

## 4. Link — antes/depois
- Antes: "Política de Cookies e Anúncios" → `/politica-de-cookies-e-anuncios`
  (o histórico 4E.1 registrava `/termos-e-condicoes`).
- Depois: **"Saiba mais" → `/politica-de-privacidade#telemetria-funil`**, com link
  secundário para `/politica-de-cookies-e-anuncios`. Nenhum link de cookies/telemetria
  aponta para `/termos-e-condicoes`.

## 5. Política — antes/depois
- §5 (Cookies): passou a distinguir cookies opcionais externos × registro próprio, e
  a esclarecer que recusar não significa ausência absoluta de registro técnico.
- **§5.2 nova — "Telemetria técnica do funil de atendimento"** (`#telemetria-funil`).
- §7 (Retenção): novo item declarando prazo **em definição pela governança interna**.
- FAQ: nova pergunta "Se eu recusar os cookies opcionais, o site deixa de registrar
  qualquer coisa?" (entra também no FAQPage JSON-LD).

## 6. Telemetria descrita
Tipo de evento, etapa do atendimento, página, posição do CTA, categoria de
serviço/equipamento, faixa de viewport, parâmetros de campanha/origem e identificador
técnico de sessão. Lista apresentada como "pode registrar" (não como schema imutável).

## 7. Cookies × first-party
Texto explícito: a recusa mantém as ferramentas externas sob Consent Mode sem
autorização de armazenamento não essencial; o registro first-party opera separadamente.

## 8. Session ID
Descrito como identificador técnico aleatório em `sessionStorage`, limitado à
sessão/aba, **pseudônimo**, não projetado para identificar diretamente uma pessoa
entre visitas. Termo "anônimo" evitado.

## 9. Dados não coletados nesse fluxo
IP, nome, telefone, e-mail, endereço, CEP, GPS, fotos, texto livre, user-agent e
fingerprint — com a formulação "A telemetria descrita nesta seção não registra…",
sem afirmar nada sobre outros fluxos do site.

## 10. Finalidade
Abertura do funil, avanço/abandono por etapa, conversões nos canais de atendimento,
origem da visita/campanha e diferenças por contexto técnico. Sem segurança, fraude,
personalização, perfil comportamental ou publicidade.

## 11. Acesso
"Infraestrutura utilizada pelo site, leitura restrita a usuários administrativos
autorizados." Sem citar RLS, policies, schema ou chaves.

## 12. Compartilhamento
Declarado que os registros não são enviados automaticamente ao Google Analytics ou
Google Ads, que possuem fluxo próprio sob o mecanismo de consentimento.

## 13. Retenção
**P1 — PENDENTE DE POLÍTICA + IMPLEMENTAÇÃO.** Nenhum prazo numérico publicado.
Texto usado: prazo "em definição pela governança interna", sem inventar 90/180/365 dias.

## 14. Base legal
**P1 — PENDENTE DE DECISÃO DE GOVERNANÇA/JURÍDICA.** Nenhuma hipótese da LGPD foi
vinculada especificamente à telemetria do funil.

## 15. Tracking — INALTERADO
`src/lib/funnelAnalytics.ts` não foi tocado. Validado em navegador: após "Recusar",
Consent Mode envia `denied` para ad_storage/ad_user_data/ad_personalization/
analytics_storage, o script do AdSense **não** é injetado, e a persistência
first-party continua ocorrendo (2 requisições a `click_events` no fluxo de teste) —
exatamente o comportamento agora descrito ao visitante.

## 16. Banco — INALTERADO
Nenhuma migração, grant, policy ou alteração de schema.

## 17. Baseline comercial — INALTERADO
Marco T1 = 2026-08-08T00:05:45Z preservado; regras de exclusão de QA intactas.

## 18. Testes
- Novo gate `npm run check:telemetry-transparency` (18 verificações) incluído no
  `prebuild`: cobre menção a cookies opcionais, registro próprio, destino do
  "Saiba mais", subseção de telemetria, sessionStorage, ausência de IP/PII,
  separação Google × first-party, e **bloqueia** prazo de retenção ou base legal
  inventados dentro do bloco de telemetria.
- Regressão: `npm run build` (exit 0), `check:seo`, `check:seo:curated` (55 rotas),
  `check:internal-links`, `check:jsonld-parity` (325 páginas), `check:trust-claims`,
  `check:copy`, `check:analytics-parity`, `check:policy-jsonld` — todos OK.
- `npx vitest run`: 10 arquivos / 90 testes aprovados.

## 19. Arquivos alterados
- `src/components/ConsentBanner.tsx` (texto + link)
- `src/pages/PoliticaPrivacidade.tsx` (§5, §5.2 nova, §7, FAQ)
- `scripts/check-telemetry-transparency.mjs` (novo gate)
- `scripts/check-internal-links.mjs` (arquivos estáticos de `public/`)
- `package.json` (registro do gate)
- `docs/rodada-4e2-transparencia-telemetria.md` (este relatório)

## 20. P0
Nenhum.

## 21. P1 remanescentes
1. Retenção da telemetria — definir política e rotina de expurgo, depois publicar prazo.
2. Base legal específica da telemetria — decisão de governança/jurídica.

## 22. Decisão
**TRANSPARÊNCIA FACTUAL DA TELEMETRIA CORRIGIDA** (retenção e base legal seguem
como P1 de governança).

## 23. Próximo passo
Não alterar tracking. Definir separadamente a política de retenção e validar a
hipótese legal adequada ao tratamento; somente depois alinhar implementação e
política pública.
