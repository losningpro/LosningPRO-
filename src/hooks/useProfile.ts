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
  rawUserRow?: Record<string, unknown> | null;
};

function normalizeProfile(
  row: Record<string, unknown> | null,
  authUser: { id: string; email?: string | null }
): UserProfile {
  const lowerRole = String(
    row?.role ?? row?.user_role ?? row?.type ?? row?.account_type ?? ""
  )
    .toLowerCase()
    .trim();

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
    user_id: String(row?.user_id ?? row?.id ?? authUser.id),
    email: authUser.email ?? (typeof row?.email === "string" ? row.email : null),
    tenant_id: typeof row?.tenant_id === "string" ? row.tenant_id : null,
    role,
    is_platform_admin: isAdmin,
    rawUserRow: row,
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

      const authUser = {
        id: session.user.id,
        email: session.user.email ?? null,
      };

      try {
        const queries = [
          supabase.from("user").select("*").eq("id", authUser.id).maybeSingle(),
          authUser.email
            ? supabase.from("user").select("*").eq("email", authUser.email).maybeSingle()
            : Promise.resolve({ data: null, error: null }),
          supabase.from("profiles").select("*").eq("id", authUser.id).maybeSingle(),
        ];

        const results = await Promise.allSettled(queries);
        const firstMatch = results
          .filter(
            (r): r is PromiseFulfilledResult<{ data: unknown; error: unknown }> =>
              r.status === "fulfilled"
          )
          .map((r) => r.value)
          .find((entry) => !entry.error && entry.data);

        const row = (firstMatch?.data ?? null) as Record<string, unknown> | null;

        if (!cancelled) {
          setProfile(normalizeProfile(row, authUser));
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          setProfile(normalizeProfile(null, authUser));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [session, sessionLoading]);

  return { profile, loading };
}
