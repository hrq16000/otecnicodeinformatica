import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export type PerfilAdmin = "admin" | "revisor" | null;

interface AdminRolesState {
  loading: boolean;
  session: Session | null;
  isAdmin: boolean;
  /** Revisor = papel `moderator` no banco. Admin também é revisor. */
  isRevisor: boolean;
  perfil: PerfilAdmin;
}

/**
 * Autenticação + permissões por perfil dos painéis internos.
 * Admin tem tudo; revisor pode mover status e registrar auditoria,
 * mas não faz aprovação em lote nem publica.
 */
export function useAdminRoles(): AdminRolesState {
  const [session, setSession] = useState<Session | null>(null);
  const [perfil, setPerfil] = useState<PerfilAdmin>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkRoles(userId: string) {
      try {
        const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
        if (!mounted) return;
        const roles = (data ?? []).map((r) => r.role as string);
        setPerfil(roles.includes("admin") ? "admin" : roles.includes("moderator") ? "revisor" : null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => {
      if (!mounted) return;
      setSession(sess);
      if (sess?.user) {
        setTimeout(() => void checkRoles(sess.user.id), 0);
      } else {
        setPerfil(null);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      if (data.session?.user) void checkRoles(data.session.user.id);
      else setLoading(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return {
    loading,
    session,
    isAdmin: perfil === "admin",
    isRevisor: perfil === "admin" || perfil === "revisor",
    perfil,
  };
}
