/** Gera um ID de sessão estável por aba do navegador. */
export function getSessionId(): string {
  try {
    let id = sessionStorage.getItem("funnel_session_id");
    if (!id) {
      id = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem("funnel_session_id", id);
    }
    return id;
  } catch {
    return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

export async function recordSubmission(payload: {
  sessionId: string;
  equipamento?: string;
  marca?: string;
  sintoma?: string;
  requiresColeta?: boolean;
  minimumAccepted?: boolean;
  ctaLocation?: string;
  waMessage: string;
}): Promise<void> {
  const sp = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const utm = {
    utm_source: sp.get("utm_source") || undefined,
    utm_medium: sp.get("utm_medium") || undefined,
    utm_campaign: sp.get("utm_campaign") || undefined,
    utm_term: sp.get("utm_term") || undefined,
    utm_content: sp.get("utm_content") || undefined,
    gclid: sp.get("gclid") || undefined,
  };
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.from("funnel_submissions").insert({
      session_id: payload.sessionId,
      equipamento: payload.equipamento?.slice(0, 80),
      marca: payload.marca?.slice(0, 120),
      sintoma: payload.sintoma?.slice(0, 120),
      requires_coleta: !!payload.requiresColeta,
      media_paths: [],
      wa_message: [
        payload.waMessage,
        `\n\n[tracking] cta_location=${payload.ctaLocation || "unknown"}; minimum_accepted=${payload.minimumAccepted ? "true" : "false"}`,
      ].join("").slice(0, 4000),
      ...utm,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[funnel] failed to record submission", err);
  }
}
