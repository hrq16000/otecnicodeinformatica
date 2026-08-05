# Governança de E-E-A-T e claims de confiança

Documento normativo da Rodada 4E. Vale para todo copy publicado no site.

## 1. Fontes únicas de verdade

| Assunto | Arquivo | Nunca duplicar em página |
| --- | --- | --- |
| Garantia, nota fiscal, dados, processo, área | `src/lib/politicaComercial.ts` | sim |
| Identidade legal, CNPJ, domínio, WhatsApp | `src/lib/siteConfig.ts` | sim |
| Responsabilidade técnica / autoria | `src/lib/gestorResponsavel.ts` | sim |
| Provas verificáveis (bancada, equipe, casos) | `src/lib/eeatProofs.ts` | sim |

Qualquer texto sobre garantia, NF, prazo, área ou autoria deve **importar** desses módulos.
Copy literal duplicada é bug: ela desincroniza e derruba o gate.

## 2. Claims proibidos (bloqueados no CI)

`scripts/check-trust-claims.mjs` falha o build quando encontra:

- nota, estrela, `aggregateRating`, % de satisfação ou nº de clientes atendidos;
- depoimento sem origem verificável;
- "atendimento no mesmo dia", SLA em horas, prazo garantido de chegada;
- plano mensal / mensalidade como produto ativo;
- "autorizado", "credenciado", certificação sem emissor;
- filial, loja ou unidade física fora da sede;
- garantia divergente da regra central (`GARANTIA` em `politicaComercial.ts`);
- ano de fundação diferente de 1998.

Exceções vivem em `scripts/trust-claims-allowlist.json`, sempre com `file`, `rule` e `why`.
Exceção sem justificativa técnica deve ser rejeitada em review.

## 3. Padrão de prova verificável

Um item só entra em `src/lib/eeatProofs.ts` se atender aos quatro critérios:

1. **Origem** — documento, registro público, foto real ou registro interno do atendimento.
2. **Verificabilidade** — o campo `fonte` descreve onde o dado pode ser conferido.
3. **Anonimização** — casos reais nunca identificam o cliente (bairro/cidade no máximo).
4. **Autorização** — nomes de equipe só entram com autorização de publicação.

Bloco sem dado real permanece com array vazio: o componente
`EeatProofsSection` simplesmente não renderiza. Placeholder é proibido.

## 4. Onde as provas aparecem

- `/sobre` — dados verificáveis + responsabilidade técnica.
- `/gestor-responsavel` — autoria e escopo técnico.
- Páginas P0 (home, `/tecnico-informatica-curitiba`, `/atendimento-domicilio`,
  `/empresa-de-ti-curitiba`) — bloco de E-E-A-T exigido pelo gate
  `scripts/check-eeat-coverage.mjs`.

## 5. Rotina de atualização

1. Coletou uma prova nova (foto de bancada, caso concluído, documento)?
   Registre em `src/lib/eeatProofs.ts` com `fonte` preenchida.
2. Mudou garantia, NF ou processo? Altere **apenas** `politicaComercial.ts`.
3. Rode `node scripts/check-trust-claims.mjs` e os gates de E-E-A-T antes do publish.
4. Nunca "resolva" um achado do gate criando exceção — só quando o claim for
   verdadeiro, específico e explicável em uma frase.
