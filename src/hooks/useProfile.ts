import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useSession } from "./useSession";
import type { User, UserRole } from "../types/domain";
import { ROLES } from "../lib/roles";

export type DashboardRole = UserRole;

export type UserProfile = User & {
  is_platform_admin: boolean;
  rawUserRow?: Record<string, unknown> | null;
};

function normalizeRole(value: unknown): UserRole {
  const lower = String(value ?? "").toLowerCase().trim();

  if (["master_admin", "master", "platform_admin", "admin"].includes(lower)) {
    return ROLES.MASTER_ADMIN;
  }

  if (["tenant_admin", "tenant", "owner"].includes(lower)) {
    return ROLES.TENANT_ADMIN;
  }

  if (["staff", "employee", "medarbejder", "partner", "samarbejder"].includes(lower)) {
    return ROLES.STAFF;
  }

  return ROLES.VIEWER;
}

function normalizeProfile(
  row: Record<string, unknown> | null,
  authUser: { id: string; email?: string | null }
): UserProfile {
  const role = normalizeRole(
    row?.role ?? row?.user_role ?? row?.type ?? row?.account_type
  );

  return {
    id: String(row?.id ?? row?.user_id ?? authUser.id),
    email: authUser.email ?? (typeof row?.email === "string" ? row.email : null),
    role,
    tenant_id: typeof row?.tenant_id === "string" ? row.tenant_id : null,
    status:
      typeof row?.status === "string"
        ? (row.status as User["status"])
        : "active",
    created_at: typeof row?.created_at === "string" ? row.created_at : null,
    is_platform_admin: role === ROLES.MASTER_ADMIN,
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
      const authUser = { id: session.user.id, email: session.user.email ?? null };

      const queries = [
        supabase.from("user").select("*").eq("id", authUser.id).maybeSingle(),
        authUser.email
          ? supabase.from("user").select("*").eq("email", authUser.email).maybeSingle()
          : Promise.resolve({ data: null, error: null }),
        supabase.from("profiles").select("*").eq("id", authUser.id).maybeSingle(),
      ];

      const results = await Promise.allSettled(queries);
      const firstMatch = results
        .filter((r): r is PromiseFulfilledResult<{ data: unknown; error: unknown }> => r.status === "fulfilled")
        .map((r) => r.value)
        .find((entry) => !entry.error && entry.data);

      const row = (firstMatch?.data ?? null) as Record<string, unknown> | null;
      const normalized = normalizeProfile(row, authUser);

      if (!cancelled) {
        setProfile(normalized);
        setLoading(false);
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [session, sessionLoading]);

  return { profile, loading };
}
