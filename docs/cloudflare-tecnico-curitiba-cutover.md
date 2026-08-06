# Cutover Cloudflare — tecnico.curitiba.br

> **Documento somente leitura.** Atualizado na **Rodada 2A.3.1**.
> Nenhum nameserver, zona, credencial, registro DNS de produção ou deploy foi
> alterado. A criação da zona Cloudflare e a obtenção do CNAME do Lovable
> dependem de acesso manual aos painéis (indisponível ao ambiente do projeto).

Última verificação pública: **06/08/2026 (UTC)** — resolvedores `1.1.1.1` e `8.8.8.8`.

## 0. Baseline de produção (pré-cutover)

| URL | Status atual | Observação |
| --- | --- | --- |
| `https://tecnico.curitiba.br/` | 200 | portal operacional |
| `https://tecnico.curitiba.br/servicos` | 200 | rota válida |
| `https://tecnico.curitiba.br/faq` | 200 | rota válida |
| `https://tecnico.curitiba.br/rota-inexistente-pre-cutover` | **200** | soft-404 — só será resolvido pelo Worker de borda |

## 1. Inventário DNS autoritativo (dois resolvedores, sem divergência)

Autoritativo atual: `ns1.gdns.com.br`, `ns2.gdns.com.br` (TTL 86400).
SOA: `ns1.gdns.com.br. contato.wils.com.br. 2026070914`.

| Tipo | Nome | Valor/destino | TTL | Proxied hoje | Finalidade |
| --- | --- | --- | --- | --- | --- |
| NS | apex | `ns1.gdns.com.br`, `ns2.gdns.com.br` | 86400 | n/a | delegação atual |
| A | apex | `185.158.133.1` | 14400 | não | web (origem Lovable) |
| A | `www` | `185.158.133.1` | 14400 | não | web |
| AAAA | — | ausente | — | — | — |
| MX | apex | `0 tecnico.curitiba.br` ⚠️ aponta para o IP web | 14400 | não | e-mail (incorreto) |
| CNAME | `mail` | `tecnico.curitiba.br` → `185.158.133.1` ⚠️ | 14400 | não | e-mail (incorreto) |
| A | `webmail` | `181.214.95.10` | 14400 | não | webmail HostEG |
| A | `cpanel` | `181.214.95.10` | 14400 | não | painel HostEG |
| A | `autodiscover` | `181.214.95.10` | 14400 | não | autoconfig de e-mail |
| TXT (SPF) | apex | `v=spf1 +a +mx +ip4:181.214.95.10 include:spf.enterprise.gdns.com.br ~all` | 14400 | n/a | autenticação |
| TXT (DKIM) | `default._domainkey` | `v=DKIM1; k=rsa; p=…` (selector `default`, RSA 2048) | 14400 | n/a | autenticação |
| TXT (DMARC) | `_dmarc` | `v=DMARC1; p=none;` | 14400 | n/a | política |
| TXT | `_lovable` | verificação de propriedade do Lovable (valor não reproduzido) | 14400 | n/a | validação de domínio |
| SRV | `_autodiscover._tcp` | `0 0 443 cpanelemaildiscovery.cpanel.net` | 14400 | n/a | autodiscover |
| CAA | apex / `www` | **ausente** | — | — | qualquer CA pode emitir |
| `smtp` / `imap` / `pop` | — | NXDOMAIN | — | — | não usados |

Nenhum valor secreto (token, chave DKIM privada, código de verificação) consta aqui.

## 2. DNSSEC

**DNSSEC NÃO ESTÁ ATIVO** para `tecnico.curitiba.br` — não há registro DS
publicado no pai. (O DS observado pertence à zona `curitiba.br`, gerida pelo
Registro.br, e não afeta a delegação do subdomínio.)

Ação no cutover: nenhuma desativação necessária. DNSSEC poderá ser ativado
pela Cloudflare **após** a zona ficar Active e o e-mail validado.

## 3. Zona Cloudflare (Fase 1 — BLOQUEANTE)

| Item | Estado em 06/08/2026 |
| --- | --- |
| Zona `tecnico.curitiba.br` | **não comprovada** — nenhuma evidência de criação foi fornecida |
| Plano | a informar |
| Account ID (mascarado) | `BLOQUEANTE — não fornecido` |
| Zone ID (mascarado) | `BLOQUEANTE — não fornecido` |
| `CLOUDFLARE_NAMESERVER_1/2` | `BLOQUEANTE — não fornecidos` |
| Nameservers no Registro.br | `ns1.gdns.com.br`, `ns2.gdns.com.br` — **inalterados** (verificado por DoH) |
| DNSSEC | **sem DS** para `tecnico.curitiba.br` (o DS observado é da zona pai `curitiba.br`) |
| Worker publicado / Worker Route | **nenhum** |

Nenhum valor foi inferido. Zonas proibidas: `curitiba.br` e
`www.tecnico.curitiba.br`. A zona correta é exclusivamente
`tecnico.curitiba.br`.

Registros a recriar na zona Pending, um a um, conferidos contra a tabela §1:
web (`@`, `www`) **proxied**; e-mail (`MX`, `mail`, `webmail`, `cpanel`,
`autodiscover`, SPF, DKIM, DMARC, SRV) **DNS-only**; `_lovable` TXT DNS-only.
Critério: **ZERO REGISTRO CRÍTICO AUSENTE**.

### 3.1 DNS atual × zona Pending (Fase 2)

Comparação executada em 06/08/2026 contra `1.1.1.1` e `8.8.8.8` (sem divergência).

| Tipo | Nome | DNS atual | Cloudflare Pending | Proxy planejado | Status |
| --- | --- | --- | --- | --- | --- |
| NS | @ | ns1/ns2.gdns.com.br | (a atribuir) | n/a | BLOQUEANTE (zona não comprovada) |
| SOA | @ | `2026070914` | — | n/a | IDÊNTICO (origem inalterada) |
| A | @ | 185.158.133.1 | CNAME → `LOVABLE_PROXY_CNAME` | Proxied | DIVERGENTE JUSTIFICADO (flattening) |
| A | www | 185.158.133.1 | conforme política §4.1 | Proxied | DIVERGENTE JUSTIFICADO |
| AAAA | — | ausente | ausente | n/a | IDÊNTICO |
| MX | @ | `0 tecnico.curitiba.br` | não copiar ainda | DNS only | BLOQUEANTE (§5) |
| CNAME | mail | → `tecnico.curitiba.br` (185.158.133.1) | não copiar ainda | DNS only | BLOQUEANTE (§5) |
| A | webmail | 181.214.95.10 | igual | DNS only | AUSENTE (a criar) |
| A | cpanel | 181.214.95.10 | igual | DNS only | AUSENTE (a criar) |
| A | autodiscover | 181.214.95.10 | igual | DNS only | AUSENTE (a criar) |
| TXT | @ (SPF) | `v=spf1 +a +mx +ip4:181.214.95.10 include:spf.enterprise.gdns.com.br ~all` | igual | DNS only | AUSENTE (a criar) |
| TXT | `default._domainkey` | DKIM RSA (valor não reproduzido) | igual | DNS only | AUSENTE (a criar) |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | igual | DNS only | AUSENTE (a criar) |
| TXT | `_lovable` | verificação (valor não reproduzido) | igual | DNS only | AUSENTE (a criar) |
| SRV | `_autodiscover._tcp` | `0 0 443 cpanelemaildiscovery.cpanel.net` | igual | DNS only | AUSENTE (a criar) |
| CAA | @ / www | ausente | ausente | n/a | IDÊNTICO |
| A | smtp / imap / pop | NXDOMAIN | não criar | n/a | IDÊNTICO |

Nenhum registro do DNS autoritativo atual foi alterado nesta rodada.

## 4. Lovable — origem oficial (Fase 3 — BLOQUEANTE)

| Item | Estado |
| --- | --- |
| `LOVABLE_PROXY_CNAME` | **BLOQUEANTE — não fornecido** |
| Registro de destino | apex (`@`) via CNAME com flattening |
| Proxy | Proxied (obrigatório no modo avançado) |
| Registro de verificação adicional | `_lovable` TXT (já existente, manter DNS-only) |
| Estado da conexão no Lovable | **preservado** — nada desconectado ou removido |

O hostname **não** pode ser inferido do DNS atual (`185.158.133.1`), de
documentação antiga ou do domínio de preview. Só vale o valor literal exibido
em `Project Settings → Domains → tecnico.curitiba.br → Advanced → "Domain uses
Cloudflare or a similar proxy"`.

### 4.1 Política de `www`

Política vigente do projeto (memória de marca): **domínio canônico é
`https://tecnico.curitiba.br` sem `www`**. Logo:

```
www → redirect permanente (301) para o apex
```

O `www` **não** recebe Worker Route; o redirect é feito por Redirect Rule da
zona. A rota `www.tecnico.curitiba.br/*` permanece comentada em
`cloudflare/wrangler.toml`.

## 5. Modelo de origem do Worker (Fase 6 — DECIDIDO)

**Escolhido: Modelo B — Worker Route + DNS CNAME proxied + `fetch(request)`**
(`ORIGIN_MODE = "dns"` em `cloudflare/wrangler.toml`).

| Critério | Modelo A `fetch(LOVABLE_ORIGIN)` | Modelo B `fetch(request)` |
| --- | --- | --- |
| Hostname inventado | necessário | **não** |
| Host header / SNI | reescrito manualmente | preservado |
| Cookies / auth | risco de divergência | preservados |
| POST/PUT/upload | reconstrução do Request | preservados |
| Recursão | possível se origem = hostname público | evitada (route roda antes da origem) |
| CORS / CSP | risco de origem cruzada | inalterados |
| Exposição de origem interna | sim | não |

Modelo A permanece no código como caminho `explicit`, bloqueado pelo
placeholder `LOVABLE_ORIGIN_NOT_CONFIGURED`; só usar com evidência concreta.

## 6. Worker — bundle e manifesto (Rodada 2A.3.1, Fase 6)

`npx wrangler deploy --dry-run` executado de verdade (wrangler 4.119.0):

```
Total Upload: 99.27 KiB / gzip: 24.63 KiB
env.ORIGIN_MODE ("dns") · env.LOVABLE_ORIGIN ("LOVABLE_ORIGIN_NOT_CONFIGURED")
--dry-run: exiting now.
```

- 0 erros, 0 warnings, 1 módulo de entrada (`cloudflare/worker.js`) + manifesto
  e `404.html` embutidos; manifesto: **1032 rotas exatas, 35 aliases, 700 assets**;
- limite com margem (Workers Free, 80 % de 3 MiB) = 2457 KiB → **APTO**;
- zona planejada: `tecnico.curitiba.br` (nenhuma referência a `curitiba.br`);
- rota planejada: `tecnico.curitiba.br/*`; rota `www` **comentada** (sem decisão ativa);
- `[build]` removido de `wrangler.toml`: o build do site é gate anterior e o
  bloco tornava o dry-run dependente do diretório de execução;
- **nenhuma publicação** — dry-run puro, nenhuma chamada de escrita.

`npm run cf:edge:bundle` agora lê o número real do wrangler (`Total Upload`)
em vez de estimar. `npm run cf:edge:test` → 12/12. `npm run cf:edge:dry` → APTO.

Modelo de origem confirmado: `ORIGIN_MODE = "dns"` → `fetch(request)`, com
Host, método, query, cookies, headers e body preservados; sem hostname
inventado e sem recursão (a Worker Route roda antes da origem). Ordem de
decisão coberta pelos testes: host permitido → alias 301 → asset válido →
rota válida (origem) → 404 real.

## 7. Gate de navegador (Rodada 2A.3.1, Fase 7) — EXIT CODE 0

Ambiente: sandbox do projeto com Chromium de sistema
(`CUTOVER_CHROMIUM_PATH`), alvo = servidor de paridade `scripts/serve-dist.mjs`
sobre o `dist/` recém-buildado.

```
CUTOVER_CHROMIUM_PATH=<chromium do sistema> \
CUTOVER_BASE_URL=http://localhost:4190 npm run test:cutover-browser
```

| Verificação | Resultado |
| --- | --- |
| home / serviços / rota profunda / cidade / bairro / FAQ / preços | 200 com H1 único |
| refresh de deep link `/servicos/formatacao` | 200 |
| assets JS/CSS/imagens (MIME e status) | 6 auditados, 0 inválidos |
| triagem | CTA visível, modal abre, avança 1 passo |
| erros críticos de console | 0 |
| falhas de rede de origem própria | 0 |
| alias `/servicos/formatacao-computador` | 301 de salto único → `/servicos/formatacao` |
| `/rota-inexistente-cutover-gate` | **404 real** |
| exit code | **0** |

Ruído de terceiros (GA4, Google Ads, função `aggregate-rating`) é classificado
como não bloqueante — o gate só falha por recursos do próprio host.

## 8. Plano Workers — Free × Paid (Fase 8, medido)

Requisições **de mesma origem** por visita (as que atravessariam o Worker),
medidas no gate:

| Página | mesma origem | total (com terceiros) |
| --- | --- | --- |
| `/` | 47 | 56 |
| `/servicos` | 51 | 59 |
| `/bairros/batel` | 54 | 62 |

Média ≈ **50 req/visita**.

- cenário normal: 300 visitas/dia × 50 = 15 000 + ~5 000 de bots ≈ **20 mil/dia**;
- cenário de pico (3×, recrawl amplo): ≈ **60 mil/dia**;
- limite Workers Free: **100 mil/dia** → margem de 40 % mesmo no pico.

Decisão: **WORKERS FREE É ADEQUADO PARA O CUTOVER INICIAL**.
Condição de upgrade: média diária sustentada acima de 60 mil requisições por
7 dias, ou latência p95 do Worker acima de 50 ms. Plano não alterado aqui.

## 8.1 Auditoria de e-mail (Fase 4)

Evidências coletadas sem autenticação e sem enviar mensagens:

| Verificação | Resultado |
| --- | --- |
| `MX tecnico.curitiba.br` | `0 tecnico.curitiba.br` → 185.158.133.1 (IP **web**, não é servidor de e-mail) |
| `mail.tecnico.curitiba.br` | CNAME → apex → 185.158.133.1 |
| `webmail` / `cpanel` / `autodiscover` | 181.214.95.10 (host cPanel do HostEG/GDNS) |
| SPF | `v=spf1 +a +mx +ip4:181.214.95.10 include:spf.enterprise.gdns.com.br ~all` |
| DKIM (`default._domainkey`) | presente, RSA (valor não reproduzido) |
| DMARC | `v=DMARC1; p=none;` |
| SRV `_autodiscover._tcp` | `cpanelemaildiscovery.cpanel.net` |
| SMTP 25 em 185.158.133.1 | fechado/filtrado (egress da máquina de teste comprovadamente livre: `aspmx.l.google.com:25` respondeu) |
| SMTP 587 em 181.214.95.10 | **aberto** — banner `220 enterprise.gdns.com.br ESMTP Exim 4.99.5` |
| SMTP 25 / 465 em 181.214.95.10 | sem resposta no tempo limite |

Leitura: existe **infraestrutura de e-mail cPanel/Exim** associada ao domínio
(submission 587 ativa, DKIM publicado, autodiscover configurado), mas o **MX
aponta para o IP web**, ou seja, o recebimento externo hoje não chega a um
servidor de e-mail. Não há, no repositório nem na configuração da aplicação,
nenhum envio ou recebimento por este domínio (o app usa apenas WhatsApp).

Conclusão: **CONFIGURAÇÃO DE E-MAIL INCONCLUSIVA**.

Consequência: o cutover permanece **bloqueado** até que o titular confirme no
painel do provedor (a) se há caixas postais em uso e (b) qual é o host MX
correto. Nada de MX, `mail`, SPF, DKIM ou DMARC foi alterado — nem em produção
nem por suposição. Quando confirmado, todos os registros de e-mail entram na
zona Pending **DNS only**, nunca proxied.

## 9. Token B (Fase 10 — não criado)

Nome sugerido: `tecnico-curitiba-worker-deploy`.

- Account · Workers Scripts: **Edit**
- Zone (`tecnico.curitiba.br`) · Workers Routes: **Edit**
- Zone (`tecnico.curitiba.br`) · Zone: **Read**

Sem DNS Edit, Cache Purge, Config Rules, Lists, Bulk Redirects, outras zonas
ou contas. Armazenar somente em GitHub Actions Secrets. Nunca em `.env`
commitado, frontend, `VITE_*`, prompt, documentação ou screenshot.
Token A (Bulk Redirects do domínio antigo) permanece separado.

## 10. Ordem exata do cutover (Rodada 2A.4 — não executar agora)

1. Criar a zona `tecnico.curitiba.br` (Free) e registrar Account/Zone ID.
2. Recriar todos os registros da §1 na zona Pending (web proxied, e-mail DNS-only).
3. Diff registro a registro contra a §1 → zero ausente.
4. Corrigir `MX`/`mail` para o host de e-mail real do HostEG (confirmado no painel).
5. Ativar o modo avançado no Lovable e obter o CNAME literal.
6. Cadastrar apex + `www` apontando para esse CNAME, proxied.
7. `npm run build && npm run cf:edge:test && npm run cf:edge:dry && npm run cf:edge:bundle`.
8. `npm run test:cutover-browser` em ambiente com navegador → apto.
9. Cadastrar Token B no GitHub Actions Secrets.
10. Trocar nameservers no Registro.br → aguardar zona Active.
11. SSL/TLS Full (strict); validar site e e-mail.
12. Publicar o Worker e a Worker Route `tecnico.curitiba.br/*`.
13. Rodar `check:soft-404`, `verify:prod-status`, `check:redirects:critical`.
14. Manter rollback pronto por 72 h.

## 11. Rollback

| Item | Ação de retorno |
| --- | --- |
| Nameservers | `ns1.gdns.com.br`, `ns2.gdns.com.br` |
| DNS web | apex e `www` A = `185.158.133.1` |
| E-mail | MX/SPF/DKIM/DMARC conforme §1 |
| Worker Route | remover a rota `tecnico.curitiba.br/*` (efeito imediato) |
| Worker | `wrangler rollback` |
| Domínio no Lovable | reconectar/revalidar no painel |
| Gatilhos | 404 em rota válida, erro TLS, e-mail parando, queda >20 % de orgânico em 24 h |
| Tempo alvo | remoção de rota < 5 min; reversão de NS 24–48 h |

## 12. Decisão da Rodada 2A.3.1

**NÃO PRONTO PARA CUTOVER DE NAMESERVERS.**

Bloqueantes remanescentes: (1) zona Pending não comprovada (Account ID, Zone ID
e nameservers Cloudflare ausentes); (2) `LOVABLE_PROXY_CNAME` não obtido;
(3) configuração de e-mail inconclusiva (MX apontando para o IP web).

Já fechados nesta rodada: wrangler dry-run real (24,63 KiB gzip, 0 erros),
gate de navegador com **exit code 0**, dimensionamento medido (Workers Free
adequado), DNS reinventariado sem divergência entre resolvedores.

## 13. Limitações conhecidas desta rodada

- Zona Cloudflare **não comprovada**: exige acesso manual ao painel (Account ID,
  Zone ID e nameservers atribuídos continuam ausentes).
- CNAME de origem do Lovable **não obtido**: exige acesso manual ao painel.
- Situação de e-mail **inconclusiva**: MX aponta para o IP web; confirmar com o
  provedor antes de copiar qualquer registro de e-mail para a zona Pending.
- Gate de navegador e wrangler dry-run: **executados com sucesso** nesta rodada
  (exit 0 / 24,63 KiB gzip); repetir em CI imediatamente antes do cutover.

## 14. Rodada 2A.3.2 — validação dos dados manuais (06/08/2026)

Entrada recebida: **somente placeholders** (`<VALOR_REAL>`). Nenhum dado real de
Cloudflare, Lovable ou provedor de e-mail foi fornecido. Conforme a regra
"não inventar valores ausentes", as Fases 1–4 **não puderam ser executadas**.

Executado (somente leitura, nada publicado):

| Gate | Resultado |
| --- | --- |
| `npm run cf:edge:test` | 12/12 ok |
| `npm run cf:edge:dry` | APTO — worker `tecnico-curitiba-route-guard`, zona `tecnico.curitiba.br`, rota `tecnico.curitiba.br/*`, `ORIGIN_MODE=dns` (`fetch(request)`), manifesto 1032 rotas / 35 aliases / 700 assets |
| `www` | sem Worker Route (permanece comentada); redirect 301 → apex será Redirect Rule da zona |
| DNS autoritativo / NS / MX / Worker | **inalterados** |

Bloqueantes externos remanescentes (dados a obter nos painéis):
`CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_ZONE_ID`, `CLOUDFLARE_NAMESERVER_1/2`,
`LOVABLE_PROXY_RECORD_NAME`, `LOVABLE_PROXY_CNAME`, `LOVABLE_PROXY_REQUIRED`,
e a confirmação de e-mail (`EMAIL_IN_USE`, `EMAIL_PROVIDER`, `EMAIL_MX_TARGET`,
`EMAIL_MAIL_HOST`, `EMAIL_SMTP_HOST`, `EMAIL_IMAP_HOST`).

**Decisão: NÃO PRONTO PARA CUTOVER DE NAMESERVERS.**

