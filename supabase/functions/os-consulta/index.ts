import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { normalizePhone, sha256, signOsToken, verifyOsToken } from "../_shared/osToken.ts";

/**
 * Consulta pública de Ordens de Serviço pelo celular do cliente.
 *
 * Segurança:
 *  - só aceita celular brasileiro válido (11 dígitos, 9 na frente);
 *  - limite de tentativas por IP (12 / 10 min) e por telefone (8 / 10 min);
 *  - resposta genérica quando nada é encontrado (não confirma cadastro);
 *  - sintomas e fotos só saem com sessão confirmada por código (os-codigo);
 *  - fotos sempre como URL assinada de curta duração;
 *  - toda consulta é auditada com rota, desfecho e latência.
 */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const WINDOW_MIN = 10;
const MAX_PER_IP = 12;
const MAX_PER_PHONE = 8;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const iniciado = Date.now();

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const telefone = normalizePhone(payload.telefone);
  if (!telefone) {
    return json(
      { error: "invalid_phone", message: "Informe o celular com DDD, no formato (41) 99999-9999." },
      400,
    );
  }

  const path = typeof payload.path === "string" ? payload.path.slice(0, 120) : null;

  // Sessão confirmada por código libera sintomas e fotos.
  const telVerificado = await verifyOsToken(payload.sessionToken, "session");
  const verificado = telVerificado === telefone;

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    "desconhecido";
  const ipHash = await sha256(`ip:${ip}`);
  const telHash = await sha256(`tel:${telefone}`);
  const since = new Date(Date.now() - WINDOW_MIN * 60_000).toISOString();

  const auditar = (outcome: string, found: boolean) =>
    supabase.from("os_lookup_attempts").insert({
      ip_hash: ipHash,
      telefone_hash: telHash,
      found,
      path,
      outcome,
      latency_ms: Date.now() - iniciado,
    });

  const [{ count: ipCount }, { count: telCount }] = await Promise.all([
    supabase
      .from("os_lookup_attempts")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since),
    supabase
      .from("os_lookup_attempts")
      .select("id", { count: "exact", head: true })
      .eq("telefone_hash", telHash)
      .gte("created_at", since),
  ]);

  if ((ipCount ?? 0) >= MAX_PER_IP || (telCount ?? 0) >= MAX_PER_PHONE) {
    await auditar("rate_limited", false);
    return json(
      {
        error: "rate_limited",
        message: `Muitas consultas seguidas. Tente novamente em ${WINDOW_MIN} minutos ou fale com o atendimento.`,
      },
      429,
    );
  }

  const { data, error } = await supabase
    .from("ordens_servico")
    .select(
      "protocolo, cliente_nome, equipamento, marca_modelo, sintomas, fotos, modalidade, status, etapas, previsao_conclusao, observacoes_publicas, created_at, updated_at",
    )
    .eq("telefone", telefone)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("os-consulta falhou:", error.message);
    await auditar("lookup_failed", false);
    return json({ error: "lookup_failed", message: "Não foi possível consultar agora." }, 500);
  }

  await auditar(verificado ? "ok_verificado" : "ok_restrito", (data?.length ?? 0) > 0);

  const ordens = await Promise.all(
    (data ?? []).map(async (os) => {
      const paths = Array.isArray(os.fotos) ? (os.fotos as unknown[]).filter((p) => typeof p === "string") : [];
      let fotos: string[] = [];
      if (verificado && paths.length) {
        const { data: signed } = await supabase.storage
          .from("os-midias")
          .createSignedUrls(paths as string[], 600);
        fotos = (signed ?? []).map((s) => s.signedUrl).filter(Boolean);
      }
      const primeiroNome = (os.cliente_nome ?? "").trim().split(/\s+/)[0] ?? "";
      return {
        ...os,
        cliente_nome: primeiroNome,
        // Dados sensíveis da triagem ficam ocultos até a confirmação por código.
        sintomas: verificado ? os.sintomas : null,
        fotos,
        fotos_count: paths.length,
        tem_sintomas: Boolean((os.sintomas ?? "").trim()),
      };
    }),
  );

  return json({
    ordens,
    verificado,
    consultadoEm: new Date().toISOString(),
    // Token curto só para autenticar o stream SSE (EventSource não envia cabeçalhos).
    streamToken: await signOsToken(telefone, "stream", 15 * 60),
  });
});
