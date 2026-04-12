import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useSession } from "./useSession";
import type { DashboardRole } from "../modules/access-control";

export type ProfileRow = {
  id: string;
  auth_user_id?: string | null;
  email: string | null;
  role: DashboardRole | null;
  status?: string | null;
  is_platform_admin?: boolean | null;
  tenant_id_uuid?: string | null;
};

export function useProfile() {
  const { session, loading: sessionLoading } = useSession();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      if (sessionLoading) return;

      if (!session?.user) {
        if (active) {
          setProfile(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);

      const userId = session.user.id;
      const userEmail = session.user.email?.trim().toLowerCase() ?? "";

      const { data, error } = await supabase
        .from("user")
        .select("id, auth_user_id, email, role, status, is_platform_admin, tenant_id_uuid, created_at")
        .or(`auth_user_id.eq.${userId},email.ilike.${userEmail}`)
        .order("created_at", { ascending: true })
        .limit(10);

      if (!active) return;

      if (error) {
        console.error("useProfile error:", error);
        setProfile(null);
        setLoading(false);
        return;
      }

      const first = (data?.[0] ?? null) as ProfileRow | null;
      setProfile(first);
      setLoading(false);
    }

    void load();

    return () => {
      active = false;
    };
  }, [session?.user?.id, session?.user?.email, sessionLoading]);

  return {
    profile,
    loading: loading || sessionLoading,
  };
}
