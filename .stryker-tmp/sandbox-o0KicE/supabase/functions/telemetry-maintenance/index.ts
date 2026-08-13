// @ts-nocheck
// Operação das rotinas de governança de telemetria (Rodada 4E.4/4E.5).
//
// Executa, com service_role, as funções aprovadas na decisão de governança:
//   - consolidate_click_events  → agregados diários (k=5)
//   - purge_click_events_raw    → expurgo raw (90 dias, fail-closed, dry-run)
//   - purge_click_events_aggregates → expurgo agregado (24 meses, dry-run)
//
// Regras:
//   - Somente administradores autenticados podem chamar.
//   - Expurgo real exige `dry_run: false` explícito no corpo da requisição.
//   - Nenhum parâmetro de retenção é configurável por aqui: 90 dias, 24 meses
//     e k=5 vivem dentro das funções do banco.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

type Action = "consolidate" | "purge_raw" | "purge_aggregates" | "status" | "selftest";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!url || !serviceKey || !anonKey) {
    return json({ error: "backend não configurado" }, 500);
  }

  // 1) Autenticação: JWT de administrador OU chamada de máquina com a chave
  //    de serviço (usada pelo agendador das rotinas de retenção).
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "não autenticado" }, 401);

  const admin = createClient(url, serviceKey);
  // Credencial de máquina: chave de serviço do projeto (o formato do segredo
  // varia entre ambientes). A sonda lê click_events, que exige contornar RLS:
  // a chave publicável recebe erro de permissão e um usuário comum recebe
  // zero linhas. Qualquer resultado ambíguo mantém a chamada bloqueada.
  let machineCall = token === serviceKey;
  if (!machineCall) {
    const probe = createClient(url, token);
    const { data: probeRows, error: probeErr } = await probe
      .from("click_events")
      .select("id")
      .limit(1);
    machineCall = !probeErr && (probeRows?.length ?? 0) > 0;
  }

  if (!machineCall) {
    const asUser = createClient(url, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: userData, error: userErr } = await asUser.auth.getUser();
    if (userErr || !userData?.user) return json({ error: "não autenticado" }, 401);

    const { data: isAdmin, error: roleErr } = await admin.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    if (roleErr) return json({ error: "falha ao verificar permissão" }, 500);
    if (!isAdmin) return json({ error: "acesso restrito a administradores" }, 403);
  }

  // 2) Ação.
  let body: Record<string, unknown> = {};
  try {
    body = req.method === "POST" ? await req.json() : {};
  } catch {
    body = {};
  }
  const action = (body.action as Action) ?? "status";
  const dryRun = body.dry_run === false ? false : true;

  try {
    if (action === "status") {
      const { data, error } = await admin
        .from("telemetry_retention_runs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return json({ action, runs: data });
    }

    if (action === "consolidate") {
      const until = typeof body.until === "string" ? body.until : null;
      const { data, error } = await admin.rpc(
        "consolidate_click_events",
        until ? { p_until: until } : {},
      );
      if (error) throw error;
      return json({ action, result: data });
    }

    if (action === "purge_raw") {
      const { data, error } = await admin.rpc("purge_click_events_raw", { p_dry_run: dryRun });
      if (error) throw error;
      return json({ action, dry_run: dryRun, result: data });
    }

    if (action === "purge_aggregates") {
      const { data, error } = await admin.rpc("purge_click_events_aggregates", { p_dry_run: dryRun });
      if (error) throw error;
      return json({ action, dry_run: dryRun, result: data });
    }

    if (action === "selftest") {
      // Autoteste fail-closed: roda em transação descartável no banco
      // (rollback interno garantido) — nenhum dado real é removido.
      const { data, error } = await admin.rpc("telemetry_guard_selftest");
      if (error) throw error;
      return json({ action, result: data });
    }

    return json({ error: `ação desconhecida: ${String(action)}` }, 400);
  } catch (e) {
    const message = (e as Error)?.message ?? String(e);
    console.error("[telemetry-maintenance]", action, message);
    return json({ error: "falha ao executar rotina de governança", details: message }, 500);
  }
});
