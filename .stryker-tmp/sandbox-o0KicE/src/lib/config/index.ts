// @ts-nocheck
// ── CAMADA CENTRAL DE CONFIGURAÇÃO ───────────────────────────
// Ponto de entrada único: `import { brandConfig, domainConfig, ... } from "@/lib/config"`.
export * from "./env";
export * from "./brand";
export * from "./domain";
export * from "./contact";
export * from "./analytics";
export * from "./geography";
export * from "./commercial";
export * from "./eeat";

export { default as brandConfig } from "./brand";
export { default as domainConfig } from "./domain";
export { default as contactConfig } from "./contact";
export { default as analyticsConfig } from "./analytics";
export { default as geographyConfig } from "./geography";
export { default as commercialConfig } from "./commercial";
export { default as eeatConfig } from "./eeat";
