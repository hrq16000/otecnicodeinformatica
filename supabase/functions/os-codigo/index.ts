import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { normalizePhone, sha256, signOsToken } from "../_shared/osToken.ts";

/**
 * Confirmação por código para liberar fotos da triagem e descrição dos sintomas.
 *
 * action=request  -> gera código de 6 dígitos, válido por 10 minutos.
 * action=verify   -> valida o código e devolve uma sessão assinada de 30 minutos.
 *
 * O código é entregue pelo técnico no WhatsApp (não há API oficial conectada),
 * por isso ele fica visível apenas no painel administrativo.
 */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const CODE_TTL_MIN = 10;
const MAX_CODES_PER_HOUR = 3;
const MAX_CODES_PER_IP_HOUR = 8;
const MAX_ATTEMPTS = 5;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const mask = (tel: string) => `(${tel.slice(0, 2)}) *****-${tel.slice(-4)}`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const telefone = normalizePhone(payload.telefone);
  if (!telefone) return json({ error: "invalid_phone" }, 400);

  const action = payload.action === "verify" ? "verify" : "request";
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    "desconhecido";
  const ipHash = await sha256(`ip:${ip}`);
  const telHash = await sha256(`tel:${telefone}`);

  if (action === "request") {
    const since = new Date(Date.now() - 60 * 60_000).toISOString();
    const [{ count: porTel }, { count: porIp }] = await Promise.all([
      supabase
        .from("os_verification_codes")
        .select("id", { count: "exact", head: true })
        .eq("telefone_hash", telHash)
        .gte("created_at", since),
      supabase
        .from("os_verification_codes")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("created_at", since),
    ]);

    if ((porTel ?? 0) >= MAX_CODES_PER_HOUR || (porIp ?? 0) >= MAX_CODES_PER_IP_HOUR) {
      return json(
        {
          error: "rate_limited",
          message: "Você já pediu vários códigos na última hora. Fale com o atendimento no WhatsApp.",
        },
        429,
      );
    }

    const codigo = String(Math.floor(100000 + Math.random() * 900000));
    const { error } = await supabase.from("os_verification_codes").insert({
      telefone_hash: telHash,
      ip_hash: ipHash,
      code_hash: await sha256(`code:${telefone}:${codigo}`),
      code_plain: codigo,
      telefone_masked: mask(telefone),
      expires_at: new Date(Date.now() + CODE_TTL_MIN * 60_000).toISOString(),
    });

    if (error) {
      console.error("os-codigo request falhou:", error.message);
      return json({ error: "request_failed" }, 500);
    }

    return json({
      ok: true,
      expiraEmMinutos: CODE_TTL_MIN,
      telefoneMascarado: mask(telefone),
      entrega: "whatsapp_manual",
    });
  }

  // action === "verify"
  const codigo = typeof payload.codigo === "string" ? payload.codigo.replace(/\D/g, "") : "";
  if (codigo.length !== 6) return json({ error: "invalid_code_format" }, 400);

  const { data: registro, error: readError } = await supabase
    .from("os_verification_codes")
    .select("id, code_hash, expires_at, attempts, consumed_at")
    .eq("telefone_hash", telHash)
    .is("consumed_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (readError) {
    console.error("os-codigo verify falhou:", readError.message);
    return json({ error: "verify_failed" }, 500);
  }

  if (!registro) return json({ error: "code_not_found", message: "Peça um novo código." }, 400);
  if (new Date(registro.expires_at).getTime() < Date.now()) {
    return json({ error: "code_expired", message: "Código expirado. Peça um novo." }, 400);
  }
  if ((registro.attempts ?? 0) >= MAX_ATTEMPTS) {
    return json({ error: "too_many_attempts", message: "Muitas tentativas. Peça um novo código." }, 429);
  }

  const esperado = await sha256(`code:${telefone}:${codigo}`);
  if (esperado !== registro.code_hash) {
    await supabase
      .from("os_verification_codes")
      .update({ attempts: (registro.attempts ?? 0) + 1 })
      .eq("id", registro.id);
    return json(
      { error: "code_mismatch", message: "Código incorreto.", tentativasRestantes: MAX_ATTEMPTS - (registro.attempts ?? 0) - 1 },
      400,
    );
  }

  await supabase
    .from("os_verification_codes")
    .update({ consumed_at: new Date().toISOString(), code_plain: null })
    .eq("id", registro.id);

  return json({
    ok: true,
    sessionToken: await signOsToken(telefone, "session", 30 * 60),
    expiraEmMinutos: 30,
  });
});
