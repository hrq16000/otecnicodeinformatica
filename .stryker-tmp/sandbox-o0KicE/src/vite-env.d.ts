// @ts-nocheck
/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

// vite-imagetools: importações com "&as=srcset" resolvem para string (srcset).
declare module "*&as=srcset" {
  const src: string;
  export default src;
}




declare const __APP_VERSION__: string;
declare const __APP_BUILD_TIME__: string;
