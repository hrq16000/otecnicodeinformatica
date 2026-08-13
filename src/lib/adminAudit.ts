import { supabase } from "@/integrations/supabase/client";

export type AuditRow = {
  id: string;
  actor_email: string | null;
  area: string;
  action: string;
  target: string | null;
  details: Record<string, unknown>;
  created_at: string;
};

/**
 * Registra "quem alterou o quê e quando" nos painéis internos.
 * Fail-soft: se a gravação falhar, a ação do painel não é bloqueada.
 */
export async function registrarAuditoria(entrada: {
  area: string;
  action: string;
  target?: string | null;
  details?: Record<string, unknown>;
}): Promise<void> {
  try {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) return;
    await supabase.from("admin_audit_log").insert({
      actor_id: user.id,
      actor_email: user.email ?? null,
      area: entrada.area,
      action: entrada.action,
      target: entrada.target ?? null,
      details: entrada.details ?? {},
    });
  } catch {
    /* auditoria nunca derruba o fluxo do painel */
  }
}

export async function lerAuditoria(area: string, limite = 50): Promise<AuditRow[]> {
  const { data } = await supabase
    .from("admin_audit_log")
    .select("id,actor_email,area,action,target,details,created_at")
    .eq("area", area)
    .order("created_at", { ascending: false })
    .limit(limite);
  return (data as AuditRow[]) ?? [];
}
