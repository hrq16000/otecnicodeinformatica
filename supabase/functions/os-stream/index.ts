import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { verifyOsToken } from "../_shared/osToken.ts";

/**
 * Stream SSE em tempo quase real do status da OS.
 *
 * O EventSource não envia cabeçalhos, então a autenticação vem por um token
 * assinado de 15 minutos emitido pelo os-consulta. O stream envia heartbeat a
 * cada 15s e um evento "update" quando a assinatura do estado muda; o cliente
 * cai automaticamente para polling se o stream falhar ou expirar.
 */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const POLL_MS = 10_000;
const HEARTBEAT_MS = 15_000;
const MAX_DURATION_MS = 5 * 60_000;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = new URL(req.url);
  const telefone = await verifyOsToken(url.searchParams.get("t"), "stream");
  if (!telefone) {
    return new Response(JSON.stringify({ error: "invalid_token" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });
  const encoder = new TextEncoder();

  const assinatura = async () => {
    const { data, error } = await supabase
      .from("ordens_servico")
      .select("protocolo, status, updated_at")
      .eq("telefone", telefone)
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) throw new Error(error.message);
    return (data ?? []).map((o) => `${o.protocolo}:${o.status}:${o.updated_at}`).join("|");
  };

  let timerPoll: number | undefined;
  let timerBeat: number | undefined;
  let timerFim: number | undefined;

  const stream = new ReadableStream({
    async start(controller) {
      let fechado = false;
      const send = (event: string, data: unknown) => {
        if (fechado) return;
        try {
          controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
        } catch {
          fechado = true;
        }
      };
      const encerrar = (motivo: string) => {
        if (fechado) return;
        send("bye", { motivo });
        fechado = true;
        clearInterval(timerPoll);
        clearInterval(timerBeat);
        clearTimeout(timerFim);
        try {
          controller.close();
        } catch {
          /* já fechado */
        }
      };

      let ultima = "";
      try {
        ultima = await assinatura();
      } catch (e) {
        console.error("os-stream leitura inicial:", (e as Error).message);
      }
      send("ready", { ok: true, intervaloMs: POLL_MS });

      timerBeat = setInterval(() => send("ping", { t: Date.now() }), HEARTBEAT_MS);

      timerPoll = setInterval(async () => {
        try {
          const atual = await assinatura();
          if (atual !== ultima) {
            ultima = atual;
            send("update", { t: Date.now() });
          }
        } catch (e) {
          console.error("os-stream poll:", (e as Error).message);
          encerrar("erro_consulta");
        }
      }, POLL_MS);

      // Conexões longas em edge são encerradas de forma limpa; o cliente reconecta.
      timerFim = setTimeout(() => encerrar("tempo_maximo"), MAX_DURATION_MS);

      req.signal?.addEventListener("abort", () => encerrar("cliente_desconectou"));
    },
    cancel() {
      clearInterval(timerPoll);
      clearInterval(timerBeat);
      clearTimeout(timerFim);
    },
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
});
