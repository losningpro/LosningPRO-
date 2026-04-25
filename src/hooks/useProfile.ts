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
  tenant_id?: string | null;
  created_at?: string | null;
  name?: string | null;
  lastname?: string | null;
  phone_number?: string | null;
};

type ProfileRpcRow = {
  legacy_id?: string | null;
  auth_user_id?: string | null;
  email?: string | null;
  name?: string | null;
  lastname?: string | null;
  phone_number?: string | null;
  role?: DashboardRole | string | null;
  status?: string | null;
  is_platform_admin?: boolean | null;
  tenant_id?: string | null;
};

function normalizeProfileRow(row: ProfileRpcRow | null): ProfileRow | null {
  if (!row) return null;

  const id = row.legacy_id ?? row.auth_user_id ?? row.email ?? null;
  if (!id) return null;

  return {
    id,
    auth_user_id: row.auth_user_id ?? null,
    email: row.email ?? null,
    name: row.name ?? null,
    lastname: row.lastname ?? null,
    phone_number: row.phone_number ?? null,
    role: (row.role as DashboardRole | null) ?? null,
    status: row.status ?? "active",
    is_platform_admin: row.is_platform_admin ?? false,
    tenant_id: row.tenant_id ?? null,
  };
}

async function loadProfileFromRpc(authUserId: string, email?: string | null) {
  const { data, error } = await supabase.rpc("get_current_user_profile", {
    p_auth_user_id: authUserId,
    p_email: email ?? null,
  });

  if (error) {
    console.warn("get_current_user_profile failed, using fallback.", error.message);
    return null;
  }

  const row = Array.isArray(data) ? ((data[0] ?? null) as ProfileRpcRow | null) : null;
  return normalizeProfileRow(row);
}

async function loadProfileFallback(authUserId: string, email?: string | null) {
  const normalizedEmail = email?.trim().toLowerCase() ?? "";

  const byAuth = await supabase
    .from("user")
    .select("id, auth_user_id, email, role, status, is_platform_admin, tenant_id, created_at, name, lastname, phone_number")
    .eq("auth_user_id", authUserId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (byAuth.data) {
    return normalizeProfileRow({
      ...byAuth.data,
      legacy_id: byAuth.data.id != null ? String(byAuth.data.id) : null,
    });
  }

  if (!normalizedEmail) return null;

  const byEmail = await supabase
    .from("user")
    .select("id, auth_user_id, email, role, status, is_platform_admin, tenant_id, created_at, name, lastname, phone_number")
    .ilike("email", normalizedEmail)
    .order("created_at", { ascending: true })
    .limit(10);

  if (byEmail.error) {
    console.error("useProfile fallback error:", byEmail.error);
    return null;
  }

  const first = (byEmail.data ?? []).sort((a, b) => {
    const aPriority = a.is_platform_admin || a.role === "master" ? 0 : 1;
    const bPriority = b.is_platform_admin || b.role === "master" ? 0 : 1;
    return aPriority - bPriority;
  })[0];

  if (!first) return null;

  if (!first.auth_user_id) {
    const patch = await supabase
      .from("user")
      .update({ auth_user_id: authUserId })
      .eq("id", first.id);

    if (patch.error) {
      console.warn("Could not backfill auth_user_id from client:", patch.error.message);
    }
  }

  return normalizeProfileRow({
    ...first,
    legacy_id: first.id != null ? String(first.id) : null,
  });
}

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

      const authUserId = session.user.id;
      const authEmail = session.user.email?.trim().toLowerCase() ?? null;

      const resolved =
        (await loadProfileFromRpc(authUserId, authEmail)) ??
        (await loadProfileFallback(authUserId, authEmail));

      if (!active) return;

      setProfile(resolved);
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
