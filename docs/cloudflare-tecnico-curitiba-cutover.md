# Cutover Cloudflare — tecnico.curitiba.br

> **Documento somente leitura.** Atualizado na **Rodada 2A.3**.
> Nenhum nameserver, zona, credencial, registro DNS de produção ou deploy foi
> alterado. A criação da zona Cloudflare e a obtenção do CNAME do Lovable
> dependem de acesso manual aos painéis (indisponível ao ambiente do projeto).

Última verificação pública: **06/08/2026 (UTC)** — resolvedores `1.1.1.1` e `8.8.8.8`.

## 0. Baseline de produção (pré-cutover)

| URL | Status atual | Observação |
| --- | --- | --- |
| `https://tecnico.curitiba.br/` | 200 | portal operacional |
| `https://tecnico.curitiba.br/servicos` | 200 | rota válida |
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

## 3. Zona Cloudflare (Fase 3 — pendente de execução manual)

| Item | Estado |
| --- | --- |
| Zona `tecnico.curitiba.br` | **NÃO CRIADA** — exige `Websites → Add a domain` no painel |
| Plano | Free (suficiente para a zona) |
| Account ID / Zone ID | a preencher (mascarados) após criação |
| Nameservers atribuídos | a preencher após criação |
| Status esperado | **Pending** (sem troca de NS no Registro.br) |

Não adicionar `curitiba.br` nem `www.tecnico.curitiba.br` como zona.

Registros a recriar na zona Pending, um a um, conferidos contra a tabela §1:
web (`@`, `www`) **proxied**; e-mail (`MX`, `mail`, `webmail`, `cpanel`,
`autodiscover`, SPF, DKIM, DMARC, SRV) **DNS-only**; `_lovable` TXT DNS-only.
Critério: **ZERO REGISTRO CRÍTICO AUSENTE**.

## 4. Lovable — modo de proxy avançado (Fase 5 — pendente)

`Project Settings → Domains → tecnico.curitiba.br → Advanced →
"Domain uses Cloudflare or a similar proxy"`.

O **CNAME oficial ainda não foi obtido** (sem acesso ao painel). Não presumir
`tecnicocuritibabr.lovable.app`. Copiar literalmente e cadastrar **apenas** na
zona Pending da Cloudflare (apex via CNAME com flattening + `www`), proxied.
Não remover a conexão atual antes de confirmar o procedimento na interface.

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

## 6. Worker — bundle e manifesto (Fase 7)

`npm run cf:edge:bundle` (gate novo, limite = plano):

- manifesto embutido: **1032 rotas exatas, 35 aliases, 700 assets**;
- bundle bruto ≈ **102 KiB**; comprimido estimado ≈ **29 KiB**;
- limite com margem (Workers Free, 80 % de 3 MiB) = 2457 KiB → **APTO**;
- `npx wrangler deploy --dry-run` não executa neste ambiente (wrangler não
  instalado / sem rede npm). Repetir o dry-run real em CI antes do deploy;
  o gate cai automaticamente para estimativa local quando o wrangler falta.

`npm run cf:edge:test` → 12/12. `npm run cf:edge:dry` → APTO (zona correta,
rota `tecnico.curitiba.br/*` declarada, Worker Route **não publicada**).

## 7. Estimativa de uso (Fase 8)

Com `ORIGIN_MODE = "dns"`, **toda** requisição do hostname proxied passa pelo
Worker (documento + assets + probes de bots). Medição de navegação real não
pôde ser executada neste ambiente (Chromium sem bibliotecas de sistema).

Ordem de grandeza a partir do build: ~25–45 requisições por carregamento
(1 documento, JS/CSS com hash, fontes, imagens). A 300 visitas/dia + bots:
~15–20 mil req/dia → dentro dos 100 mil/dia do plano Free, mas com margem
apertada em picos de crawler.

Recomendação preliminar: **WORKERS FREE É SUFICIENTE** para o cutover inicial,
com monitoramento diário; migrar para Paid se as requisições diárias
ultrapassarem ~60 mil de forma sustentada. Reconfirmar após a Fase 8 real.

## 8. Gate de navegador (Fase 9)

`npm run test:e2e` continua indisponível: `playwright.config.ts` depende do
pacote privado `lovable-agent-playwright-config`, que não está em
`package.json` nem no lockfile (é injetado pelo ambiente Lovable).

Substituto criado, sem dependências novas:

```
npm run test:cutover-browser
CUTOVER_BASE_URL=http://localhost:8080 npm run test:cutover-browser
```

Cobre home, serviços, rota profunda, cidade, FAQ, preços, refresh de deep
link, assets, CTA de triagem, alias e 404, capturando erros de console e
falhas de rede. Saídas: `0` apto, `1` falha real, `2` ambiente sem navegador.
Neste sandbox retorna `2` (Chromium sem `libglib-2.0`); **executar em CI ou
máquina com as libs antes de qualquer troca de nameservers**.

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

## 12. Limitações conhecidas desta rodada

- Zona Cloudflare **não criada**: exige acesso manual ao painel.
- CNAME de origem do Lovable **não obtido**: exige acesso manual ao painel.
- `wrangler deploy --dry-run` real não executável neste ambiente.
- Navegação real (Fase 8) e gate de navegador não executáveis neste sandbox.
- MX/`mail` continuam apontando para o IP web — corrigir **antes** do proxy.
