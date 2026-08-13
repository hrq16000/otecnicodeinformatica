import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

/**
 * Motion System Global — classes legadas proibidas.
 * O feedback de superfície usa `.motion-surface`; placeholders usam `.skel`
 * ou os componentes de `@/components/Skeleton`; o único movimento contínuo
 * permitido é `.motion-status-live`.
 */
const CLASSES_LEGADAS =
  "hover-streak|animated-border|card-shine|ring-pulse|elastic-click|animate-pulse-soft|cta-pulse|hover-scale";
const HOVER_SCALE = "(hover|group-hover|focus|active):scale-";

const MSG_LEGADO =
  "Classe de animação legada proibida (Motion System Global). Use .motion-surface, .skel/Skeleton ou .motion-status-live.";
const MSG_SCALE =
  "Hover/scale ad-hoc proibido. Use .motion-surface para feedback de superfície.";
const MSG_PULSE =
  "animate-pulse ad-hoc proibido. Use .skel ou os componentes de @/components/Skeleton; para status ao vivo use .motion-status-live.";

export const restricoesMotion = [
  { selector: `Literal[value=/${CLASSES_LEGADAS}/]`, message: MSG_LEGADO },
  { selector: `TemplateElement[value.raw=/${CLASSES_LEGADAS}/]`, message: MSG_LEGADO },
  { selector: `Literal[value=/${HOVER_SCALE}/]`, message: MSG_SCALE },
  { selector: `TemplateElement[value.raw=/${HOVER_SCALE}/]`, message: MSG_SCALE },
  { selector: "Literal[value=/animate-pulse(?![a-z-])/]", message: MSG_PULSE },
  { selector: "TemplateElement[value.raw=/animate-pulse(?![a-z-])/]", message: MSG_PULSE },
];

export default tseslint.config(
  { ignores: ["dist", "supabase/functions"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    // Gate de movimento: vale para o código de interface do portal.
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/ui/**"],
    rules: {
      "no-restricted-syntax": ["error", ...restricoesMotion],
    },
  },
);
