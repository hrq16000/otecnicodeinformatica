/**
 * Tokens assinados (HMAC-SHA256) usados pelas funções públicas de OS.
 *
 * Dois usos:
 *  • sessão verificada — libera sintomas e fotos depois da confirmação por código;
 *  • stream — autentica o EventSource do SSE, que não permite cabeçalhos.
 *
 * O segredo nunca sai do servidor e o payload carrega apenas o telefone
 * normalizado e a expiração, o mínimo necessário para reconsultar.
 */
// @ts-nocheck


const SECRET = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

export type OsTokenScope = "session" | "stream";

interface Payload {
  tel: string;
  scope: OsTokenScope;
  exp: number;
}

const enc = new TextEncoder();

const b64url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const fromB64url = (value: string) => {
  const pad = value.replace(/-/g, "+").replace(/_/g, "/");
  const str = atob(pad + "=".repeat((4 - (pad.length % 4)) % 4));
  return Uint8Array.from(str, (c) => c.charCodeAt(0));
};

async function key() {
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function signOsToken(tel: string, scope: OsTokenScope, ttlSeconds: number) {
  const payload: Payload = { tel, scope, exp: Date.now() + ttlSeconds * 1000 };
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await key(), enc.encode(body)));
  return `${body}.${b64url(sig)}`;
}

export async function verifyOsToken(token: unknown, scope: OsTokenScope): Promise<string | null> {
  if (typeof token !== "string" || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  let ok = false;
  try {
    ok = await crypto.subtle.verify("HMAC", await key(), fromB64url(sig), enc.encode(body));
  } catch {
    return null;
  }
  if (!ok) return null;
  try {
    const payload = JSON.parse(new TextDecoder().decode(fromB64url(body))) as Payload;
    if (payload.scope !== scope) return null;
    if (!payload.exp || payload.exp < Date.now()) return null;
    if (!/^\d{11}$/.test(payload.tel)) return null;
    return payload.tel;
  } catch {
    return null;
  }
}

export async function sha256(value: string) {
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(value));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function normalizePhone(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("55") && d.length > 11) d = d.slice(2);
  if (d.length !== 11) return null;
  if (d[2] !== "9") return null;
  return d;
}
