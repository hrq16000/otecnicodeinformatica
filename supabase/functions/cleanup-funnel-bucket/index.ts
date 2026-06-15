// Temporary one-off function: empties and deletes the legacy `funnel-uploads`
// storage bucket. Safe to delete after running once.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const url = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  const bucket = "funnel-uploads";
  const log: Record<string, unknown> = {};

  const { error: emptyErr } = await admin.storage.emptyBucket(bucket);
  log.empty = emptyErr ? emptyErr.message : "ok";

  const { error: delErr } = await admin.storage.deleteBucket(bucket);
  log.delete = delErr ? delErr.message : "ok";

  const { data: buckets, error: listErr } = await admin.storage.listBuckets();
  log.remaining = listErr ? listErr.message : buckets?.map((b) => b.id);

  return new Response(JSON.stringify(log, null, 2), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
