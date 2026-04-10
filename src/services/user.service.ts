import type { Role, User, UserProfile } from "../types";
import { supabase } from "../lib/supabase";
import { normalizeAppRole } from "../modules/access-control";

type ProfileRpcRow = {
  entity_uuid: string | null;
  legacy_id: string | null;
  auth_user_id: string | null;
  email: string | null;
  name: string | null;
  lastname: string | null;
  phone_number: string | null;
  role: string | null;
  status: string | null;
  is_platform_admin: boolean | null;
  tenant_id: string | null;
  tenant_name: string | null;
  company_name: string | null;
  tenant_status: string | null;
};

function toDashboardRole(row: ProfileRpcRow | null): Role {
  const lowerRole = String(row?.role ?? "").toLowerCase().trim();

  if (row?.is_platform_admin === true || lowerRole === "master") {
    return "master_admin";
  }

  return normalizeAppRole(lowerRole) as Role;
}

function normalizeUser(row: ProfileRpcRow | null, email?: string | null): UserProfile {
  const role = toDashboardRole(row);
  const isPlatformAdmin =
    row?.is_platform_admin === true ||
    row?.role === "master" ||
    role === "master_admin";

  const userId = String(row?.entity_uuid ?? row?.legacy_id ?? "");
  const normalizedEmail = row?.email ?? email ?? null;
  const tenantId = row?.tenant_id ?? null;
  const status = row?.status ?? "active";

  const baseUser: User = {
    id: userId,
    email: normalizedEmail,
    role,
    tenant_id: tenantId,
    status,
    is_platform_admin: isPlatformAdmin,
  };

  return {
    ...baseUser,
    user_id: userId,
    rawUserRow: row as unknown as Record<string, unknown>,
  };
}

async function getProfileViaRpc(
  authUserId: string,
  authEmail?: string | null
): Promise<UserProfile | null> {
  const { data, error } = await supabase.rpc("get_current_user_profile", {
    p_auth_user_id: authUserId,
    p_email: authEmail ?? null,
  });

  if (error) {
    console.error("[userService.getProfileViaRpc] RPC error:", error);
    return null;
  }

  const row = Array.isArray(data) ? (data[0] as ProfileRpcRow | undefined) : undefined;
  if (!row) {
    return null;
  }

  return normalizeUser(row, authEmail ?? null);
}

async function fallbackProfileByEmail(authEmail?: string | null): Promise<UserProfile> {
  if (!authEmail) {
    return normalizeUser(null, null);
  }

  const { data, error } = await supabase
    .from("user")
    .select("*")
    .ilike("email", authEmail)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return normalizeUser(null, authEmail);
  }

  const row: ProfileRpcRow = {
    entity_uuid: typeof data.entity_uuid === "string" ? data.entity_uuid : null,
    legacy_id: data.id != null ? String(data.id) : null,
    auth_user_id: typeof data.auth_user_id === "string" ? data.auth_user_id : null,
    email: typeof data.email === "string" ? data.email : authEmail,
    name: typeof data.name === "string" ? data.name : null,
    lastname: typeof data.lastname === "string" ? data.lastname : null,
    phone_number: typeof data.phone_number === "string" ? data.phone_number : null,
    role: data.role != null ? String(data.role) : null,
    status: data.status != null ? String(data.status) : "active",
    is_platform_admin: data.is_platform_admin === true,
    tenant_id: typeof data.tenant_id_uuid === "string"
      ? data.tenant_id_uuid
      : typeof data.tenant_id === "string"
        ? data.tenant_id
        : null,
    tenant_name: null,
    company_name: null,
    tenant_status: null,
  };

  return normalizeUser(row, authEmail);
}

export const userService = {
  async getProfileByAuthUser(
    authUserId: string,
    authEmail?: string | null
  ): Promise<UserProfile> {
    const rpcProfile = await getProfileViaRpc(authUserId, authEmail ?? null);
    if (rpcProfile) {
      return rpcProfile;
    }

    return fallbackProfileByEmail(authEmail ?? null);
  },
};

export type { UserProfile };
