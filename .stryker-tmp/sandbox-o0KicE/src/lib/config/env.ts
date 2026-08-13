// @ts-nocheck
// Leitura tipada e segura de variáveis de ambiente (camada central de config).
const raw = import.meta.env as unknown as Record<string, string | undefined>;

/** Retorna a string limpa ou `undefined` quando vazia/ausente. */
export const envStr = (key: string): string | undefined => {
  const v = raw[key];
  const t = typeof v === "string" ? v.trim() : "";
  return t.length > 0 ? t : undefined;
};

/** Lista separada por vírgula (vazia quando não configurada). */
export const envList = (key: string): string[] =>
  (envStr(key) ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

/** Flag booleana explícita ("true"). */
export const envFlag = (key: string): boolean => (envStr(key) ?? "").toLowerCase() === "true";

/** Número finito ou `undefined`. */
export const envNum = (key: string): number | undefined => {
  const n = Number(envStr(key));
  return Number.isFinite(n) ? n : undefined;
};
