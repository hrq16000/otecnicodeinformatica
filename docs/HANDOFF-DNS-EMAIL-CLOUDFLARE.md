# Handoff Operacional — DNS, E-mail e Cloudflare · tecnico.curitiba.br

> Documento único de encerramento e handoff. Descreve tudo o que precisa ser
> executado **manualmente** fora do ambiente do projeto (HostEG/cPanel, GDNS,
> painel de domínios do Lovable, Cloudflare, Registro.br). Nenhuma dessas ações
> pode ser executada pelo projeto React/Lovable.
>
> **Última validação:** 2026-07-11 (UTC)
> **Responsável pelas próximas ações manuais:** proprietário do domínio / admin com acesso aos painéis externos.
> **Regra de ouro:** corrigir e validar o e-mail na zona GDNS **antes** de qualquer migração de nameservers ou proxy Cloudflare.

---

## 1. Estado atual do projeto

| Área | Estado |
|---|---|
| Aplicação (identidade visual, homepage, componentes) | **CONCLUÍDA E APROVADA** |
| SEO (canonical, OG pré-hidratação, sitemap curado, robots) | **CONCLUÍDO E PUBLICADO** |
| 8 serviços canônicos + 6 cidades âncora + páginas institucionais | **CONCLUÍDOS** |
| Funil WhatsApp | **CONCLUÍDO** |
| Banco / RLS / grants / exposição de dados | **CONCLUÍDOS E VALIDADOS** |
| Gates de segurança (exposição pública + headers file) | **PASSAM** |
| CSP/headers no repositório (`public/_headers`) | **PREPARADOS E VALIDADOS (Report-Only, inerte na hospedagem atual)** |
| CSP/headers em produção | **PENDENTES DE CONFIGURAÇÃO EXTERNA (Cloudflare)** |
| Cloudflare própria | **PENDENTE DE ACESSO AOS PAINÉIS** |
| E-mail | **REQUER CORREÇÃO/CONFIRMAÇÃO EXTERNA ANTES DO PROXY** |

Validação técnica desta rodada (somente leitura, sem publicação):

- `git status --short` → limpo (nenhuma alteração de aplicação).
- `npm run build` → OK (100 rotas pré-renderizadas + `seo-check` OK).
- `npx tsgo --noEmit` → OK (exit 0).
- `npm run check:public-data-exposure` → PASS (R2, R3, O1, O2 → 401).
- `npm run check:security-headers:file` → PASS (CSP Report-Only limpa).
- `npm run check:security-headers` (runtime prod) → baseline OK; XFO / Permissions-Policy / CSP-RO marcados **WARN** (esperado — hospedagem atual não serve `_headers`).

---

## 2. Estado atual da produção

- Site online: `https://tecnico.curitiba.br/` → HTTP 200.
- `/robots.txt` → HTTP 200. `/sitemap-index.xml` → HTTP 200.
- Canonical na home: `<link rel="canonical" href="https://tecnico.curitiba.br/" />`.
- Domínio antigo (`tecnicocuritiba.com.br`) ausente do canonical/sitemap.
- Servido atrás do Cloudflare **interno do Lovable** (`server: cloudflare`, `cf-ray`), fora do controle do proprietário.
- Nenhuma migration pendente. CSP enforcement ausente.

### Headers atualmente ATIVOS em produção
- `strict-transport-security: max-age=31536000; includeSubDomains`
- `x-content-type-options: nosniff`
- `referrer-policy: strict-origin-when-cross-origin`

### Headers PREPARADOS no repositório mas ainda INATIVOS em produção
Definidos em `public/_headers` (ignorado pela hospedagem gerenciada atual):
- `X-Frame-Options: DENY`
- `Permissions-Policy: ...`
- `Content-Security-Policy-Report-Only: ...` (validada, limpa, sem enforcement)

Ativação real depende de Cloudflare própria + Transform Rule (Fase 6/12).

---

## 3. Inventário DNS atual (confirmado via DoH — Cloudflare)

DNS autoritativo atual (NS, TTL 86400):
- `ns1.gdns.com.br`
- `ns2.gdns.com.br`

| Tipo | Nome | Valor atual | TTL |
|---|---|---|---|
| A | apex `tecnico.curitiba.br` | `185.158.133.1` (origem Lovable/web) | 14400 |
| A | `www` | `185.158.133.1` | 14400 |
| MX | apex | `0 tecnico.curitiba.br` ⚠️ aponta para o IP web | 14400 |
| CNAME | `mail` | `tecnico.curitiba.br` → resolve `185.158.133.1` ⚠️ | 14400 |
| A | `webmail` | `181.214.95.10` (HostEG) | 14400 |
| A | `cpanel` | `181.214.95.10` (HostEG) | 14400 |
| TXT (SPF) | apex | `v=spf1 +a +mx +ip4:181.214.95.10 include:spf.enterprise.gdns.com.br ~all` | 14400 |
| TXT (DKIM) | `default._domainkey` | `v=DKIM1; k=rsa; p=MIIBIj…QAB;` (selector `default`) | 14400 |
| TXT (DMARC) | `_dmarc` | `v=DMARC1; p=none;` | 14400 |
| SRV | `_autodiscover._tcp` | `0 0 443 cpanelemaildiscovery.cpanel.net` | 14400 |
| DNSSEC | — | **inativo** | — |
| CAA | — | **ausente** | — |

---

## 4. Diagnóstico do e-mail (bloqueador crítico pré-existente)

- O `MX 0 tecnico.curitiba.br` e o `mail CNAME tecnico.curitiba.br` **resolvem para `185.158.133.1`**, que é o IP **web** do Lovable — **não** o servidor de e-mail.
- O servidor de e-mail real provável é **HostEG/cPanel**:
  - IP identificado: `181.214.95.10`
  - PTR/hostname reverso: `enterprise.hosteg.net`
  - webmail e cpanel já apontam para esse IP
  - DKIM selector: `default` (chave RSA pública presente)
- **Consequência:** o recebimento de e-mail pode já estar mal direcionado, independentemente da Cloudflare.
- ⚠️ **Não declarar `enterprise.hosteg.net` como MX definitivo sem confirmação no painel/provedor.**

---

## 5. Bloqueadores externos comprovados

Nenhuma alteração segura de DNS/nameservers pode ser feita sem estes acessos, indisponíveis ao ambiente do projeto:
1. HostEG/cPanel (caixas de e-mail, host SMTP/IMAP oficial, portas, DKIM).
2. Painel GDNS (edição da zona atual).
3. Painel de domínios do Lovable (CNAME de origem para modo proxy).
4. Conta Cloudflare (criação de zona, registros, SSL, Transform Rule).
5. Registro.br (troca de nameservers).

O **CNAME oficial do modo proxy do Lovable ainda não foi obtido**. Não presumir `tecnicocuritibabr.lovable.app` — copiar literalmente do painel.

---

## 6. Dados confirmados vs. pendentes

### Confirmados
- NS atuais: `ns1.gdns.com.br`, `ns2.gdns.com.br`.
- apex/www A → `185.158.133.1`.
- MX/mail apontando para o apex (incorreto para e-mail).
- webmail/cpanel A → `181.214.95.10`.
- SPF, DKIM (selector `default`), DMARC (`p=none`), SRV autodiscover presentes.
- DNSSEC inativo; CAA ausente.

### Pendentes (só obteníveis nos painéis)
- Caixas de e-mail ativas no HostEG/cPanel.
- Hostname SMTP/IMAP oficial e portas (SMTP 465/587; IMAP 993).
- MX recomendado oficialmente pelo HostEG.
- Confirmação do valor DKIM no painel vs. DNS público.
- CNAME de origem literal do Lovable + eventuais TXT de validação.
- Nameservers atribuídos pela Cloudflare (após criar a zona).

---

## 7. Ordem manual definitiva de execução (sem atalhos)

1. Entrar no HostEG/cPanel.
2. Confirmar caixas e servidor de e-mail.
3. Confirmar MX e DKIM.
4. Fazer backup completo da zona GDNS.
5. Corrigir `mail` para o host/IP de e-mail real (DNS only).
6. Corrigir `MX` para host **não proxyado**.
7. Testar recebimento.
8. Testar envio.
9. Confirmar SPF / DKIM / DMARC (via "Mostrar original").
10. Reduzir TTL (~300s) se apropriado.
11. Abrir Lovable → Settings → Domains → Advanced.
12. Ativar modo Cloudflare/proxy.
13. Copiar CNAME e TXT **literalmente**.
14. Criar zona `tecnico.curitiba.br` na Cloudflare.
15. Recriar todos os registros.
16. Manter e-mail como **DNS only**.
17. Configurar web como **Proxied**.
18. Conferir registro por registro contra o backup GDNS.
19. Trocar nameservers no Registro.br.
20. Esperar a Cloudflare ficar **Active**.
21. Configurar SSL **Full (strict)**.
22. Validar site e e-mail.
23. Criar a Transform Rule.
24. Validar headers.
25. Rodar os gates.
26. Iniciar a janela CSP Report-Only de 14 dias.

### Correção de e-mail preferencial na GDNS (usar só valores confirmados pelo HostEG)
- `mail` A → `181.214.95.10` (substitui o CNAME atual) — **DNS only**
- `MX` → `0 mail.tecnico.curitiba.br` (host não proxyado)
- Preservar sem alterações: SPF, DKIM, DMARC, webmail, cpanel, `_autodiscover._tcp`.
- Nunca apontar MX para: apex proxyado, IP da Cloudflare, host proxyado, `*.lovable.app`.

---

## 8. Configuração futura da Cloudflare

**Web — Proxied (nuvem laranja):**
- apex: CNAME → alvo exato fornecido pelo Lovable (usar CNAME flattening), Proxied.
- `www`: CNAME → apex ou alvo indicado pelo Lovable, Proxied.

**E-mail — DNS only (nuvem cinza):**
- `mail` A → IP de e-mail confirmado.
- `webmail` A → `181.214.95.10`.
- `cpanel` A → `181.214.95.10`.
- MX → hostname de e-mail confirmado (nunca host proxyado).
- SPF / DKIM / DMARC / SRV → valores integrais preservados.
- Nunca proxyar: `mail`, `smtp`, `imap`, `pop`, `webmail`, `cpanel`, `autodiscover`, hosts usados por MX.

**SSL/TLS:** Full (strict). Nunca Flexible. Manter HTTP → HTTPS sem regras concorrentes.

**DNSSEC:** manter inativo nesta rodada.

---

## 9. Transform Rule planejada (Response Headers)

- **Condição:** `http.host in {"tecnico.curitiba.br" "www.tecnico.curitiba.br"}`
- **Operação:** `Set static` (nunca `Add`).
- **Headers:**
  - `X-Frame-Options` → `DENY`
  - `Permissions-Policy` → `camera=(), microphone=(), geolocation=(self), payment=(), usb=(), interest-cohort=()`
  - `Content-Security-Policy-Report-Only` → **copiar o valor exato de `public/_headers` no momento da execução.**

> ⚠️ Fonte única de verdade para a CSP: `public/_headers` no repositório. Não duplicar a política inteira aqui para evitar divergência. Copiar literalmente o valor do arquivo validado na hora de aplicar.

**Proibido:** CSP enforcing, `unsafe-eval`, wildcard amplo (`*`), origem `http:`, `report-uri`, `report-to`.

**Verificar duplicidade** em: Transform Rules, Workers, Snippets, Page Shield, Client-Side Security, regras antigas, headers de origem. Resultado obrigatório: 1 CSP Report-Only, 0 CSP enforcing, 1 X-Frame-Options, 1 Permissions-Policy. Preservar HSTS, nosniff, Referrer-Policy.

---

## 10. Plano de testes

**Site (após cutover):** `/`, `/servicos`, `/servicos/formatacao`, `/servicos/redes-e-wifi`, `/servicos/suporte-tecnico-empresarial`, `/contato`, `/tecnico-informatica-curitiba`, `/admin/login`, `/robots.txt`, `/sitemap-index.xml` — status, CSS, fontes, hero, imagens, menu, footer, canonical, og:url, sem erro crítico de console.

**Funcional:** slideshow, imagens responsivas, menu mobile, teclado/ARIA, funil WhatsApp, Supabase REST + WebSocket, edge functions, ReviewsGrid, aggregate rating, mapa/geolocation, login admin, GTM/GA/Google Ads, service worker/PWA. Registrar violações CSP Report-Only.

**E-mail (antes e depois da Cloudflare):** recebimento externo, envio autenticado, SPF PASS, DKIM PASS, DMARC alinhado, webmail, SMTP, IMAP. **Critério bloqueante:** e-mail não pode parar de enviar/receber.

**Gates pós-cutover:**
```
npm run check:security-headers
npm run check:security-headers:file
npm run check:public-data-exposure
npm run build
npx tsgo --noEmit
```
Somente **após** os headers estarem ativos, o responsável poderá endurecer o gate de runtime (`scripts/check-security-headers.mjs`) para **falhar** quando: X-Frame-Options faltar, Permissions-Policy faltar, CSP Report-Only faltar, CSP enforcement aparecer, CSP duplicada, `unsafe-eval`, wildcard perigoso ou origem `http:`. **Não endurecer nesta rodada** (headers ainda inativos). Se alterar apenas o script de gate, não publicar novo bundle da aplicação.

---

## 11. Plano de rollback

**Nameservers de rollback:** `ns1.gdns.com.br`, `ns2.gdns.com.br`
**Web de rollback:** apex A → `185.158.133.1`; www A → `185.158.133.1`

**Procedimento:**
1. Desativar a Transform Rule.
2. Colocar registros web como DNS only.
3. Restaurar A antigo (apex/www → `185.158.133.1`) se necessário.
4. Restaurar MX/mail anteriores **apenas** se a correção nova for a causa da falha.
5. Restaurar nameservers GDNS no Registro.br.
6. Confirmar site.
7. Confirmar e-mail.
8. Manter zonas antigas até estabilidade.

**Gatilhos:** site indisponível, erro SSL, loop de redirect, e-mail quebrado, Supabase quebrado, assets quebrados, domínio inválido no Lovable.

---

## 12. Janela CSP Report-Only

Quando tudo estiver estável e os headers ativos: registrar data/hora inicial, manter CSP **Report-Only por 14 dias**, não ativar enforcement, não remover `unsafe-inline`, não restringir `img-src https:` nesta rodada. Reavaliar enforcement **somente após 14 dias de dados reais**.

---

## 13. Critérios para considerar a migração concluída

- E-mail corrigido e validado (recebimento + envio) **antes** da Cloudflare.
- SPF PASS, DKIM PASS, DMARC preservado.
- CNAME oficial do Lovable usado (literal, não presumido).
- Zona Cloudflare Active; Lovable permanece como origem.
- apex/www Proxied; hosts de e-mail DNS only.
- SSL Full (strict), sem loop.
- X-Frame-Options ativo, Permissions-Policy ativa, CSP **somente** Report-Only, sem duplicação, sem enforcing.
- Site, Supabase/WebSocket, funil, admin, analytics, sitemap e robots funcionais.
- Gates, build e typecheck passam.
- Nenhuma migration criada; nenhuma reforma da aplicação.
- Rollback disponível.

---

## 14. Estado formal de encerramento

| Área | Estado |
|---|---|
| Aplicação | CONCLUÍDA E APROVADA |
| SEO | CONCLUÍDO E PUBLICADO |
| Banco e segurança de dados | CONCLUÍDOS E VALIDADOS |
| CSP/headers no repositório | PREPARADOS E VALIDADOS |
| CSP/headers em produção | PENDENTES DE CONFIGURAÇÃO EXTERNA |
| Cloudflare própria | PENDENTE DE ACESSO AOS PAINÉIS |
| E-mail | REQUER CORREÇÃO/CONFIRMAÇÃO EXTERNA ANTES DO PROXY |

A pendência externa **não impede a divulgação do site**, mas deve ser resolvida **antes** de migrar DNS ou ativar proxy próprio.

**Veredito: SEÇÃO ENCERRADA** — aplicação concluída; hardening externo documentado e pendente de acesso manual.
