/**
 * Config isolada do gate de movimento — roda no CI como etapa BLOQUEANTE,
 * sem depender do backlog de lint geral (any/no-escape) que ainda existe.
 * As regras vêm do mesmo arquivo raiz para não divergirem.
 */
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { restricoesMotion } from "./eslint.config.js";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "src/components/ui/**"] },
  { linterOptions: { reportUnusedDisableDirectives: "off" } },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { parser: tseslint.parser, ecmaVersion: 2020 },
    // Plugins registrados apenas para que comentários eslint-disable existentes
    // no código não virem erro de "rule not found" nesta config reduzida.
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: { "no-restricted-syntax": ["error", ...restricoesMotion] },
  },
);
