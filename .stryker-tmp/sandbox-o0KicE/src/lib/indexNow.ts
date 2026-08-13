// @ts-nocheck
// Frontend helper: pings IndexNow via edge function.
// Use after publishing/updating a review, landing, post, etc.
import { supabase } from "@/integrations/supabase/client";

export async function pingIndexNow(urls: string | string[]) {
  const list = Array.isArray(urls) ? urls : [urls];
  if (list.length === 0) return { ok: false, error: "empty" } as const;
  try {
    const { data, error } = await supabase.functions.invoke("indexnow-ping", {
      body: { urls: list },
    });
    if (error) return { ok: false, error: error.message } as const;
    return { ok: true, data } as const;
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "unknown" } as const;
  }
}
