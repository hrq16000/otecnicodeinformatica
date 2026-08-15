// Declarações ambient portadas do antigo src/vite-env.d.ts (migração TanStack Start).

// vite-imagetools — imports com query string (?w=...&format=...&as=srcset)
declare module "*&as=srcset" {
  const srcset: string;
  export default srcset;
}
declare module "*?w=*" {
  const src: string;
  export default src;
}

// Módulos .mjs compartilhados com os scripts de build (sem tipos próprios)
declare module "*.mjs";

// react-helmet não distribui tipos
declare module "react-helmet" {
  import type { Component, ReactNode } from "react";
  export interface HelmetProps {
    children?: ReactNode;
    title?: string;
    defer?: boolean;
    encodeSpecialCharacters?: boolean;
    htmlAttributes?: Record<string, unknown>;
    bodyAttributes?: Record<string, unknown>;
    titleTemplate?: string;
    defaultTitle?: string;
    onChangeClientState?: (...args: unknown[]) => void;
  }
  export class Helmet extends Component<HelmetProps> {
    static renderStatic(): Record<string, { toString(): string; toComponent(): unknown }>;
  }
  export default Helmet;
}

declare const __APP_VERSION__: string;
declare const __APP_BUILD_TIME__: string;
