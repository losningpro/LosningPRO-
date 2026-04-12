import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useSession } from "./useSession";

export type DashboardRole =
  | "master"
  | "tenant"
  | "medarbejder"
  | "samarbejder"
  | "partner"
  | "kunde";

type ProfileRow = {
  id: string;
  email: string | null;
  role: DashboardRole | null;
  status?: string | null;
  is_platform_admin?: boolean | null;
  tenant_id_uuid?: string | null;
};

export function useProfile() {
  const { session } = useSession();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!session?.user?.email) {
        if (active) {
          setProfile(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from("user")
        .select("id,email,role,status,is_platform_admin,tenant_id_uuid")
        .or(
          `auth_user_id.eq.${session.user.id},email.ilike.${session.user.email}`
        )
        .limit(1)
        .maybeSingle();

      if (!active) return;

      if (error) {
        setProfile(null);
        setLoading(false);
        return;
      }

      setProfile((data as ProfileRow | null) ?? null);
      setLoading(false);
    }

    void load();

    return () => {
      active = false;
    };
  }, [session?.user?.id, session?.user?.email]);

  return { profile, loading };
}
