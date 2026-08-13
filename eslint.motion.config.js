/**
 * Config isolada do gate de movimento — roda no CI como etapa BLOQUEANTE,
 * sem depender do backlog de lint geral (any/no-escape) que ainda existe.
 * As regras vêm do mesmo arquivo raiz para não divergirem.
 */
import { restricoesMotion } from "./eslint.config.js";

export default [
  { ignores: ["dist", "node_modules", "src/components/ui/**"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: { "no-restricted-syntax": ["error", ...restricoesMotion] },
  },
];
