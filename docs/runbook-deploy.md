# Runbook de deploy — tecnico.curitiba.br

Documento curto e operacional. Usar em toda rodada de publicação.

## 1. Pré-deploy (obrigatório)

```bash
rm -rf dist
npm run build
npm run check:soft404
npm run check:sitemap-source
npm run check:internal-links
npm run check:jsonld-parity
npm run check:priority-urls:dist
npm test
```

Todos precisam sair com código 0. Qualquer falha bloqueia o deploy.

## 2. Publicação

1. Publicar o frontend pelo Lovable (Publish → Update).
2. Executar o workflow **Cloudflare edge** (aliases 301 + 404 real).
   Só informar a frase de aprovação quando também for publicar a matriz de
   redirects do domínio antigo.

## 3. Evidências pós-deploy (colar no PR/registro da rodada)

| Evidência | Comando / origem |
| --- | --- |
| Status HTTP 200/301/404 | `npm run verify:prod-status` |
| Headers das P0 | `curl -sSI https://tecnico.curitiba.br/` |
| Assets carregando | `curl -sSI https://tecnico.curitiba.br/assets/<hash>.js` |
| Console do navegador limpo | abrir home + 1 rota profunda |
| Triagem WhatsApp funcional | abrir modal, avançar PF e PJ |
| Rich results | `npm run report:post-deploy` |

## 4. Critérios objetivos de rollback

Reverter imediatamente se **qualquer** item ocorrer:

- Home (`/`) não retorna HTTP 200.
- Qualquer rota P0 retorna 404 ou 5xx.
- Assets (`/assets/*`) retornam 404 → build quebrado no edge.
- Alias conhecido deixa de retornar 301 → destino 200.
- URL válida passa a retornar 404 no worker (falso positivo de manifesto).
- Modal de triagem não abre ou não gera link do WhatsApp.
- Erro de JavaScript não tratado no console da home.

## 5. Como reverter

```bash
# Worker de borda
npx wrangler rollback --config cloudflare/wrangler.toml

# Matriz de redirects (ruleset dinâmico)
node scripts/publish-cloudflare-redirects.mjs --rollback=redirects/rollback/cloudflare/<stamp>.json

# Frontend
# Lovable → histórico de versões → restaurar a versão anterior publicada
```

Depois do rollback: rodar `npm run verify:prod-status` e registrar a causa
nesta pasta (`docs/rodada-*.md`).

## 6. Alertas contínuos

- Job semanal `SEO weekly monitoring`: indexação, Web Vitals, rank WoW.
- `scripts/notify-seo-alerts.mjs` envia Slack (`SLACK_WEBHOOK_URL`) e/ou
  e-mail (`ALERT_EMAIL_TO` + `RESEND_API_KEY`) com link para os artefatos.
