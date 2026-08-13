// @ts-nocheck
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

interface AdminAuthState {
  loading: boolean;
  session: Session | null;
  isAdmin: boolean;
}

/**
 * Hook de autenticação + verificação de papel admin.
 * Listener síncrono primeiro, depois consulta has_role().
 */
export function useAdminAuth(): AdminAuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      if (!mounted) return;
      setSession(sess);
      // checa role async (sem await dentro do listener)
      if (sess?.user) {
        setTimeout(() => void checkRole(sess.user.id), 0);
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      if (data.session?.user) {
        void checkRole(data.session.user.id);
      } else {
        setLoading(false);
      }
    });

    async function checkRole(userId: string) {
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .eq("role", "admin")
          .maybeSingle();
        if (!mounted) return;
        setIsAdmin(!!data && !error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { loading, session, isAdmin };
}
