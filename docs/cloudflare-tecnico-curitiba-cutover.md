# Cutover Cloudflare — tecnico.curitiba.br

> **Documento somente leitura.** Nada aqui foi executado na Rodada 2A.2.
> Nenhum nameserver, registro DNS, zona, credencial ou deploy foi alterado.

## 1. Estado atual (leitura pública via DoH, 06/08/2026)

| Registro | Nome | Valor |
| --- | --- | --- |
| NS (delegação) | `tecnico.curitiba.br` | `ns1.gdns.com.br`, `ns2.gdns.com.br` |
| NS (pai) | `curitiba.br` | `a.dns.br` … `f.dns.br` (Registro.br) |
| A | `tecnico.curitiba.br` | `185.158.133.1` (hospedagem Lovable) |
| A | `www.tecnico.curitiba.br` | `185.158.133.1` |
| AAAA | — | ausente |
| CNAME | — | ausente (apex e www usam A) |
| MX | `tecnico.curitiba.br` | `0 tecnico.curitiba.br` (auto-apontado) |
| TXT/SPF | `tecnico.curitiba.br` | `v=spf1 +a +mx +ip4:… include:spf.enterprise.gdns.com.br ~all` |
| DKIM | — | não publicado em seletor público conhecido |
| DMARC | `_dmarc.tecnico.curitiba.br` | `v=DMARC1; p=none;` |
| CAA | — | ausente |
| Verificação de propriedade | `_lovable` TXT | gerenciado pelo Lovable — **valor não reproduzido aqui** |

**Fato relevante:** `tecnico.curitiba.br` é um domínio delegado no Registro.br
com NS próprios. Portanto **pode** ser adicionado como zona na Cloudflare — a
restrição anterior valia apenas para `curitiba.br`.

Nenhum valor secreto (tokens, chaves DKIM privadas, códigos de verificação) é
exibido neste documento.

## 2. Estado futuro pretendido

- Zona Cloudflare: **`tecnico.curitiba.br`** (criada manualmente, plano Free basta).
- Origem: **CNAME fornecido pelo Lovable** ao ativar, nas configurações de
  domínio, a opção *"Domain uses Cloudflare or a similar proxy"*.
  Até obtê-lo, o Worker mantém `LOVABLE_ORIGIN = LOVABLE_ORIGIN_NOT_CONFIGURED`
  e **recusa publicar/servir**. O hostname de origem não deve ser inventado.
- Worker: `tecnico-curitiba-route-guard`, rota `tecnico.curitiba.br/*`
  (`www.tecnico.curitiba.br/*` só se o hostname continuar em uso).
- E-mail: MX/SPF/DMARC atuais precisam ser recriados **idênticos** na zona
  Cloudflare, com proxy DESLIGADO nos registros de e-mail.

## 3. Ordem futura do corte (não executar agora)

1. Adicionar `tecnico.curitiba.br` como site na Cloudflare (plano Free).
2. Revisar o import automático de DNS registro a registro (A, MX, TXT/SPF,
   DMARC, verificação `_lovable`, `www`).
3. Ativar no Lovable o modo avançado de proxy e **obter o CNAME exato**.
4. Configurar apex e `www` apontando para esse CNAME (proxied, laranja).
5. Validar a origem **sem Worker** (site 100% no ar via Cloudflare).
6. Cadastrar os secrets de publicação (Token B) no GitHub.
7. `npm run cf:edge:dry` → `npm run check:cf-zone -- --enforce`.
8. Publicar o Worker em rota de teste ou em janela controlada.
9. Só então alterar nameservers no Registro.br para os da Cloudflare.
10. Validar propagação (NS, A/CNAME, e-mail, TLS).
11. Rodar gates: `check:soft-404`, `verify:prod-status`, `check:redirects:critical`.
12. Manter rollback pronto durante 72 h.

## 4. Rollback futuro

| Item | Valor/ação de retorno |
| --- | --- |
| Nameservers anteriores | `ns1.gdns.com.br`, `ns2.gdns.com.br` |
| DNS anterior | A apex e www = `185.158.133.1`; MX/SPF/DMARC conforme tabela §1 |
| Worker Route | remover a rota `tecnico.curitiba.br/*` (efeito imediato) |
| Worker | `wrangler rollback` para a versão anterior |
| Domínio no Lovable | reconectar/revalidar o domínio no painel do projeto |
| Critério de rollback | 404 em rota válida, erro TLS, e-mail parando, ou queda >20 % de tráfego orgânico em 24 h |
| Tempo alvo | remoção de rota < 5 min; reversão de NS até 24–48 h de propagação |

## 5. Tokens (dois, nunca compartilhados)

**Token A — domínio antigo (Bulk Redirects)**
- Account · Account Filter Lists: **Edit**
- Account · Account Rulesets: **Edit**
- Escopo: apenas a conta que hospeda `tecnicocuritiba.com.br`
- **Sem** qualquer permissão de Workers.

**Token B — `tecnico.curitiba.br` (Worker)**
- Account · Workers Scripts: **Edit**
- Zone · Workers Routes: **Edit** (somente a zona `tecnico.curitiba.br`)
- Zone · Zone: **Read** (somente essa zona)
- **Sem** permissão de Lists, Rulesets de conta, DNS ou Purge global.

Os valores não são solicitados nem armazenados nesta rodada.

## 6. Limitações conhecidas

- Sem credenciais, o dry-run de Bulk Redirects é 100 % local (não há diff remoto real).
- O CNAME de origem do Lovable é desconhecido até o passo 3 acima.
- A hospedagem Lovable ignora `dist/_redirects`; o 404 real depende do Worker.
