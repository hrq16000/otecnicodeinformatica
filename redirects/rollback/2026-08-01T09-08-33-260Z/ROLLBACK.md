# Pacote de rollback — 2026-08-01T09-08-33-260Z

- Mapa: redirects/tecnicocuritiba.map.json
- published anterior: false
- Regras: 612
- Origem: https://tecnicocuritiba.com.br → Destino: https://tecnico.curitiba.br
- Commit anterior: ff9d8e3f Changes
- Lista de aprovação: docs/migracao/aprovacao-urls.txt

## Como reverter

```bash
node scripts/publish-redirects.mjs --rollback=redirects/rollback/2026-08-01T09-08-33-260Z
```

Após o rollback, republicar a configuração de redirects na camada de edge/hospedagem
com o mapa restaurado. O domínio antigo deve permanecer ativo.
