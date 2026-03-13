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

export type UserProfile = {
  user_id: string;
  email: string | null;
  tenant_id: string | null;
  role: DashboardRole;
  is_platform_admin: boolean;
  rawUserRow?: Record<string, any> | null;
};

function normalizeRole(row: Record<string, any> | null, email?: string | null): UserProfile {
  const lowerRole = String(
    row?.role ??
      row?.user_role ??
      row?.type ??
      row?.account_type ??
      ""
  ).toLowerCase();

  const isAdmin =
    row?.is_platform_admin === true ||
    row?.is_master === true ||
    lowerRole === "master" ||
    lowerRole === "admin";

  let role: DashboardRole = "kunde";

  if (isAdmin) role = "master";
  else if (lowerRole.includes("tenant")) role = "tenant";
  else if (lowerRole.includes("medarbejder") || lowerRole.includes("employee")) role = "medarbejder";
  else if (lowerRole.includes("samarbejder")) role = "samarbejder";
  else if (lowerRole.includes("partner")) role = "partner";
  else if (lowerRole.includes("kunde") || lowerRole.includes("customer")) role = "kunde";

  return {
    user_id: String(row?.id ?? row?.user_id ?? ""),
    email: email ?? row?.email ?? null,
    tenant_id: row?.tenant_id ?? null,
    role,
    is_platform_admin: isAdmin,
    rawUserRow: row ?? null,
  };
}

export function useProfile() {
  const { session, loading: sessionLoading } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (sessionLoading) return;

      if (!session?.user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      const authUserId = session.user.id;
      const authEmail = session.user.email ?? null;

      let userRow: Record<string, any> | null = null;

      const byId = await supabase.from("user").select("*").eq("id", authUserId).maybeSingle();
      if (!byId.error && byId.data) {
        userRow = byId.data as Record<string, any>;
      }

      if (!userRow && authEmail) {
        const byEmail = await supabase.from("user").select("*").eq("email", authEmail).maybeSingle();
        if (!byEmail.error && byEmail.data) {
          userRow = byEmail.data as Record<string, any>;
        }
      }

      const normalized = normalizeRole(userRow, authEmail);

      if (!cancelled) {
        setProfile(normalized);
        setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [session, sessionLoading]);

  return { profile, loading };
}
