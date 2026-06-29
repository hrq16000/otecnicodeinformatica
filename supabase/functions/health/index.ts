// Edge function leve para health-check. Retorna 200 com timestamp.
// Usada pelo front para detectar "portal instável" quando API/back falha.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  return new Response(
    JSON.stringify({ ok: true, ts: new Date().toISOString() }),
    {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    },
  );
});
